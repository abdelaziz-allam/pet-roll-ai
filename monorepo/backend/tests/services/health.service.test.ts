import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HealthService } from '../../src/modules/health/health.service';
import { db, FieldValue } from '../../src/config/firebase';

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

describe('HealthService', () => {
  let service: HealthService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new HealthService();
    mockCollection = (db.collection as any)('health_records');
  });

  // --- verifyPetOwnership ---

  describe('verifyPetOwnership', () => {
    it('should resolve if pet exists and belongs to owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      const result = await service.verifyPetOwnership('pet-1', 'owner-1');

      expect(result.exists).toBe(true);
    });

    it('should throw 404 if pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.verifyPetOwnership('missing', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'other-owner' }),
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- createRecord ---

  describe('createRecord', () => {
    it('should create a health record', async () => {
      // First call: verifyPetOwnership (pets collection doc get)
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'record-1' });

      const input = {
        type: 'checkup',
        date: '2024-03-15',
        description: 'Annual checkup',
        veterinarian: 'Dr. Smith',
        cost: 150,
      };

      const result = await service.createRecord('pet-1', 'owner-1', input);

      expect(result.id).toBe('record-1');
      expect(result.petId).toBe('pet-1');
      expect(result.ownerId).toBe('owner-1');
      expect(result.type).toBe('checkup');
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          petId: 'pet-1',
          ownerId: 'owner-1',
          type: 'checkup',
          date: '2024-03-15',
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 if pet does not belong to owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(
        service.createRecord('pet-1', 'owner-1', { type: 'checkup' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw 404 if pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(
        service.createRecord('missing', 'owner-1', { type: 'checkup' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- getRecords ---

  describe('getRecords', () => {
    it('should return paginated health records', async () => {
      // verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 25 }) }),
      });

      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'rec-1', data: () => ({ type: 'checkup', date: '2024-03-15' }) },
          { id: 'rec-2', data: () => ({ type: 'surgery', date: '2024-02-10' }) },
        ],
      });

      const result = await service.getRecords('pet-1', 'owner-1', 1, 10);

      expect(result.total).toBe(25);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(3);
      expect(result.data).toHaveLength(2);
    });

    it('should use default pagination', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      const result = await service.getRecords('pet-1', 'owner-1');

      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(20);
    });

    it('should calculate correct offset for page 2', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 30 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getRecords('pet-1', 'owner-1', 2, 10);

      expect(mockCollection.offset).toHaveBeenCalledWith(10);
    });

    it('should filter by petId', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getRecords('pet-1', 'owner-1');

      expect(mockCollection.where).toHaveBeenCalledWith('petId', '==', 'pet-1');
    });

    it('should order by date descending', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getRecords('pet-1', 'owner-1');

      expect(mockCollection.orderBy).toHaveBeenCalledWith('date', 'desc');
    });

    it('should throw 404 if pet ownership verification fails', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getRecords('missing', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- getRecordById ---

  describe('getRecordById', () => {
    it('should return record if it belongs to owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'rec-1',
        data: () => ({ type: 'checkup', petId: 'pet-1', ownerId: 'owner-1' }),
      });

      const result = await service.getRecordById('rec-1', 'owner-1');

      expect(result).toEqual({
        id: 'rec-1',
        type: 'checkup',
        petId: 'pet-1',
        ownerId: 'owner-1',
      });
    });

    it('should throw 404 if record does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getRecordById('missing', 'owner-1')).rejects.toMatchObject({
        message: 'Record not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if record belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'rec-1',
        data: () => ({ type: 'checkup', ownerId: 'other-owner' }),
      });

      await expect(service.getRecordById('rec-1', 'owner-1')).rejects.toMatchObject({
        message: 'Record not found',
        statusCode: 404,
      });
    });
  });

  // --- updateRecord ---

  describe('updateRecord', () => {
    it('should update a health record', async () => {
      // First getRecordById (validation)
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'rec-1',
          data: () => ({ type: 'checkup', ownerId: 'owner-1', petId: 'pet-1' }),
        })
        // After update, getRecordById again
        .mockResolvedValueOnce({
          exists: true,
          id: 'rec-1',
          data: () => ({ type: 'surgery', ownerId: 'owner-1', petId: 'pet-1', description: 'Updated' }),
        });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.updateRecord('rec-1', 'owner-1', {
        type: 'surgery',
        description: 'Updated',
      });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'surgery',
          description: 'Updated',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.type).toBe('surgery');
    });

    it('should throw 404 if record not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(
        service.updateRecord('missing', 'owner-1', { type: 'surgery' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw 404 if record belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'rec-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(
        service.updateRecord('rec-1', 'owner-1', { type: 'surgery' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- deleteRecord ---

  describe('deleteRecord', () => {
    it('should delete a health record', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'rec-1',
        data: () => ({ type: 'checkup', ownerId: 'owner-1' }),
      });
      mockCollection.delete.mockResolvedValue(undefined);

      await service.deleteRecord('rec-1', 'owner-1');

      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 if record does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.deleteRecord('missing', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw 404 if record belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'rec-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(service.deleteRecord('rec-1', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });
});
