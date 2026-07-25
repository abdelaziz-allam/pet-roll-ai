import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VerificationService } from '../../src/modules/verification/verification.service';
import { db } from '../../src/config/firebase';

vi.mock('../../src/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 3001,
    GCP_PROJECT_ID: 'petroll-mvp',
    FIREBASE_PROJECT_ID: 'petroll-mvp',
    JWT_SECRET: 'test-secret-minimum-16-chars',
    JWT_EXPIRY: '1h',
    REFRESH_TOKEN_EXPIRY: '7d',
    CORS_ORIGINS: 'http://localhost:5173',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW: 60000,
    GCS_BUCKET: 'petroll-mvp.appspot.com',
  },
}));

describe('VerificationService', () => {
  let service: VerificationService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new VerificationService();
    mockCollection = (db.collection as any)('verification_requests');
  });

  // --- submitVerification ---

  describe('submitVerification', () => {
    it('should submit a verification request successfully', async () => {
      // First .get() call: check for pending requests -> empty
      // Second .get() call: count user submissions -> size 2
      mockCollection.get
        .mockResolvedValueOnce({ empty: true, size: 0, docs: [] })
        .mockResolvedValueOnce({ empty: false, size: 2, docs: [{}, {}] });

      mockCollection.add.mockResolvedValue({ id: 'new-verification-id' });

      const input = {
        kennelName: 'Happy Paws',
        breedExperience: '5 years breeding Golden Retrievers',
        documents: [
          { url: 'https://storage.example.com/doc1.pdf', path: 'docs/doc1.pdf', name: 'license.pdf', type: 'application/pdf' },
        ],
      };

      const result = await service.submitVerification('user-1', 'John Doe', 'john@example.com', input);

      expect(result.id).toBe('new-verification-id');
      expect(result.userId).toBe('user-1');
      expect(result.userName).toBe('John Doe');
      expect(result.userEmail).toBe('john@example.com');
      expect(result.kennelName).toBe('Happy Paws');
      expect(result.breedExperience).toBe('5 years breeding Golden Retrievers');
      expect(result.status).toBe('pending');
      expect(result.submissionNumber).toBe(3); // 2 existing + 1
      expect(result.rejectionReason).toBeNull();
      expect(result.processedBy).toBeNull();
      expect(result.processedAt).toBeNull();
      expect(result.expiryDate).toBeNull();
      expect(result.revokedAt).toBeNull();
      expect(result.revokedBy).toBeNull();
      expect(result.revokeReason).toBeNull();
      expect(result.documents).toHaveLength(1);
      expect(result.documents[0]).toMatchObject({
        url: 'https://storage.example.com/doc1.pdf',
        path: 'docs/doc1.pdf',
        name: 'license.pdf',
        type: 'application/pdf',
      });
      expect(result.documents[0].uploadedAt).toBeDefined();
      expect(result.createdAt).toBeDefined();

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          kennelName: 'Happy Paws',
          status: 'pending',
          submissionNumber: 3,
        })
      );
    });

    it('should throw 400 if user already has a pending verification request', async () => {
      // First .get() call: check for pending requests -> NOT empty
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'existing-pending', data: () => ({ status: 'pending' }) }],
      });

      const input = {
        kennelName: 'Happy Paws',
        breedExperience: '5 years',
        documents: [],
      };

      await expect(
        service.submitVerification('user-1', 'John Doe', 'john@example.com', input)
      ).rejects.toMatchObject({
        message: 'You already have a pending verification request',
        statusCode: 400,
      });

      expect(mockCollection.add).not.toHaveBeenCalled();
    });
  });

  // --- getStatus ---

  describe('getStatus', () => {
    it('should return the latest verification status for a user', async () => {
      const mockData = {
        id: 'req-1',
        userId: 'user-1',
        status: 'approved',
        kennelName: 'Happy Paws',
        createdAt: '2024-01-15T10:00:00.000Z',
      };

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [{ id: 'req-1', data: () => mockData }],
      });

      const result = await service.getStatus('user-1');

      expect(result).toEqual({ id: 'req-1', ...mockData });
      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.limit).toHaveBeenCalledWith(1);
    });

    it('should return null when no verification requests exist for the user', async () => {
      mockCollection.get.mockResolvedValue({
        empty: true,
        size: 0,
        docs: [],
      });

      const result = await service.getStatus('user-no-requests');

      expect(result).toBeNull();
    });
  });

  // --- getHistory ---

  describe('getHistory', () => {
    it('should return all verification requests for a user ordered by date', async () => {
      const docs = [
        { id: 'req-2', userId: 'user-1', status: 'approved', createdAt: '2024-02-01T10:00:00.000Z' },
        { id: 'req-1', userId: 'user-1', status: 'rejected', createdAt: '2024-01-01T10:00:00.000Z' },
      ];

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 2,
        docs: docs.map((d) => ({ id: d.id, data: () => d })),
      });

      const result = await service.getHistory('user-1');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'req-2', ...docs[0] });
      expect(result[1]).toEqual({ id: 'req-1', ...docs[1] });
      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });

    it('should fallback to unordered query when error code is 9 (index not ready)', async () => {
      const indexError: any = new Error('Index not ready');
      indexError.code = 9;

      const docs = [
        { id: 'req-1', userId: 'user-1', status: 'pending', createdAt: '2024-01-01T10:00:00.000Z' },
      ];

      // First call (with orderBy) throws code 9 error
      mockCollection.get
        .mockRejectedValueOnce(indexError)
        // Second call (without orderBy) succeeds
        .mockResolvedValueOnce({
          empty: false,
          size: 1,
          docs: docs.map((d) => ({ id: d.id, data: () => d })),
        });

      const result = await service.getHistory('user-1');

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ id: 'req-1', ...docs[0] });
    });

    it('should rethrow errors that are not code 9', async () => {
      const otherError: any = new Error('Permission denied');
      otherError.code = 7;

      mockCollection.get.mockRejectedValue(otherError);

      await expect(service.getHistory('user-1')).rejects.toMatchObject({
        message: 'Permission denied',
        code: 7,
      });
    });
  });

  // --- updateStatus ---

  describe('updateStatus', () => {
    it('should approve a request and set expiryDate and update user isVerifiedBreeder', async () => {
      const existingData = {
        userId: 'user-1',
        status: 'pending',
        kennelName: 'Happy Paws',
      };

      const updatedData = {
        ...existingData,
        status: 'approved',
        processedAt: '2024-03-01T10:00:00.000Z',
        processedBy: 'system',
        expiryDate: '2025-03-01',
      };

      // First .get() via .doc().get() -> existing doc
      // After update, second .get() via .doc().get() -> updated doc
      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => existingData })
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => updatedData });

      const result = await service.updateStatus('req-1', 'approved', undefined, '2025-03-01');

      expect(result).toEqual({ id: 'req-1', ...updatedData });
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'approved',
          processedBy: 'system',
          expiryDate: '2025-03-01',
        })
      );
      // Should also update the user's isVerifiedBreeder flag
      expect(mockCollection.update).toHaveBeenCalledWith({ isVerifiedBreeder: true });
    });

    it('should reject a request with a rejection reason', async () => {
      const existingData = {
        userId: 'user-1',
        status: 'pending',
        kennelName: 'Happy Paws',
      };

      const updatedData = {
        ...existingData,
        status: 'rejected',
        processedAt: '2024-03-01T10:00:00.000Z',
        processedBy: 'system',
        rejectionReason: 'Incomplete documentation',
      };

      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => existingData })
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => updatedData });

      const result = await service.updateStatus('req-1', 'rejected', 'Incomplete documentation');

      expect(result).toEqual({ id: 'req-1', ...updatedData });
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'rejected',
          processedBy: 'system',
          rejectionReason: 'Incomplete documentation',
        })
      );
      // Should NOT update user for rejection
      expect(mockCollection.update).not.toHaveBeenCalledWith({ isVerifiedBreeder: true });
    });

    it('should throw 404 if request not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'nonexistent', data: () => null });

      await expect(
        service.updateStatus('nonexistent', 'approved')
      ).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });
  });

  // --- revokeVerification ---

  describe('revokeVerification', () => {
    it('should revoke an approved verification and update user isVerifiedBreeder to false', async () => {
      const existingData = {
        userId: 'user-1',
        status: 'approved',
        kennelName: 'Happy Paws',
      };

      const revokedData = {
        ...existingData,
        status: 'revoked',
        revokedAt: '2024-04-01T10:00:00.000Z',
        revokedBy: 'admin-1',
        revokeReason: 'Violation of terms',
      };

      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => existingData })
        .mockResolvedValueOnce({ exists: true, id: 'req-1', data: () => revokedData });

      const result = await service.revokeVerification('req-1', 'admin-1', 'Violation of terms');

      expect(result).toEqual({ id: 'req-1', ...revokedData });
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'revoked',
          revokedBy: 'admin-1',
          revokeReason: 'Violation of terms',
        })
      );
      // Should update user's isVerifiedBreeder to false
      expect(mockCollection.update).toHaveBeenCalledWith({ isVerifiedBreeder: false });
    });

    it('should throw 404 if request not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'nonexistent', data: () => null });

      await expect(
        service.revokeVerification('nonexistent', 'admin-1', 'Some reason')
      ).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });

    it('should throw 400 if verification is not in approved status', async () => {
      const existingData = {
        userId: 'user-1',
        status: 'pending',
        kennelName: 'Happy Paws',
      };

      mockCollection.get.mockResolvedValue({ exists: true, id: 'req-1', data: () => existingData });

      await expect(
        service.revokeVerification('req-1', 'admin-1', 'Some reason')
      ).rejects.toMatchObject({
        message: 'Can only revoke approved verifications',
        statusCode: 400,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });
  });

  // --- getCertificate ---

  describe('getCertificate', () => {
    it('should return certificate data for an approved verification', async () => {
      const certData = {
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        kennelName: 'Happy Paws',
        breedExperience: '5 years',
        status: 'approved',
        submissionNumber: 1,
        processedAt: '2024-02-15T10:00:00.000Z',
        expiryDate: '2025-02-15',
      };

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [{ id: 'abcdef12-rest-of-id', data: () => certData }],
      });

      const result = await service.getCertificate('user-1');

      expect(result).toEqual({
        id: 'abcdef12-rest-of-id',
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        kennelName: 'Happy Paws',
        breedExperience: '5 years',
        status: 'approved',
        submissionNumber: 1,
        approvedAt: '2024-02-15T10:00:00.000Z',
        expiryDate: '2025-02-15',
        certificateNumber: 'PF-BV-ABCDEF12',
      });

      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'approved');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.limit).toHaveBeenCalledWith(1);
    });

    it('should return null when no approved certificate exists', async () => {
      mockCollection.get.mockResolvedValue({
        empty: true,
        size: 0,
        docs: [],
      });

      const result = await service.getCertificate('user-no-cert');

      expect(result).toBeNull();
    });

    it('should return expiryDate as null when not set', async () => {
      const certData = {
        userId: 'user-1',
        userName: 'John Doe',
        userEmail: 'john@example.com',
        kennelName: 'Happy Paws',
        breedExperience: '5 years',
        status: 'approved',
        submissionNumber: 1,
        processedAt: '2024-02-15T10:00:00.000Z',
        expiryDate: null,
      };

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [{ id: 'abcdef12-rest-of-id', data: () => certData }],
      });

      const result = await service.getCertificate('user-1');

      expect(result!.expiryDate).toBeNull();
    });
  });

  // --- getLastRejected ---

  describe('getLastRejected', () => {
    it('should return the last rejected verification request', async () => {
      const rejectedData = {
        id: 'req-3',
        userId: 'user-1',
        status: 'rejected',
        rejectionReason: 'Documents expired',
        kennelName: 'Happy Paws',
        createdAt: '2024-03-01T10:00:00.000Z',
      };

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [{ id: 'req-3', data: () => rejectedData }],
      });

      const result = await service.getLastRejected('user-1');

      expect(result).toEqual({ id: 'req-3', ...rejectedData });
      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'rejected');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.limit).toHaveBeenCalledWith(1);
    });

    it('should return null when no rejected requests exist', async () => {
      mockCollection.get.mockResolvedValue({
        empty: true,
        size: 0,
        docs: [],
      });

      const result = await service.getLastRejected('user-1');

      expect(result).toBeNull();
    });
  });
});
