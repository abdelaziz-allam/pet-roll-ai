import { describe, it, expect, vi, beforeEach } from 'vitest';
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

import { healthCertificationService } from '../../src/modules/pets/health-certification.service';

describe('HealthCertificationService', () => {
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = (db.collection as any)('health_certifications');
  });

  const validInput = {
    vetName: 'Dr. Smith',
    vetClinic: 'Happy Paws Clinic',
    certDate: '2024-01-15',
    expiryDate: '2025-01-15',
    notes: 'All clear',
    documents: [{ url: 'https://example.com/doc.pdf', name: 'report.pdf' }],
  };

  describe('submitCertification', () => {
    it('should throw 404 if pet not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      await expect(
        healthCertificationService.submitCertification('owner-1', 'pet-x', validInput)
      ).rejects.toMatchObject({ message: 'Pet not found', statusCode: 404 });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ ownerId: 'other-owner', name: 'Rex', species: 'dog', breed: 'Beagle' }),
      });

      await expect(
        healthCertificationService.submitCertification('owner-1', 'pet-1', validInput)
      ).rejects.toMatchObject({ message: 'Pet not found', statusCode: 404 });
    });

    it('should throw 400 if pending certification already exists', async () => {
      // First call: petsRef.doc(petId).get() => pet exists with correct owner
      // Second call: certRef.where().where().get() => not empty
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ ownerId: 'owner-1', name: 'Rex', species: 'dog', breed: 'Beagle' }),
        })
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ id: 'cert-1', data: () => ({ status: 'pending' }) }],
        });

      await expect(
        healthCertificationService.submitCertification('owner-1', 'pet-1', validInput)
      ).rejects.toMatchObject({
        message: 'A pending certification request already exists for this pet',
        statusCode: 400,
      });
    });

    it('should create certification successfully', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ ownerId: 'owner-1', name: 'Buddy', species: 'dog', breed: 'Labrador' }),
        })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      mockCollection.add.mockResolvedValue({ id: 'cert-new' });

      const result = await healthCertificationService.submitCertification('owner-1', 'pet-1', validInput);

      expect(result.id).toBe('cert-new');
      expect(result.status).toBe('pending');
      expect(result.petName).toBe('Buddy');
      expect(result.vetName).toBe('Dr. Smith');
      expect(mockCollection.add).toHaveBeenCalled();
    });

    it('should handle optional expiryDate and notes', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          data: () => ({ ownerId: 'owner-1', name: 'Rex', species: 'cat', breed: 'Siamese' }),
        })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      mockCollection.add.mockResolvedValue({ id: 'cert-2' });

      const result = await healthCertificationService.submitCertification('owner-1', 'pet-1', {
        vetName: 'Dr. Jones',
        vetClinic: 'Vet Plus',
        certDate: '2024-03-01',
        documents: [{ url: 'https://example.com/cert.pdf', name: 'cert.pdf' }],
      });

      expect(result.expiryDate).toBeNull();
      expect(result.notes).toBeNull();
    });
  });

  describe('getMyCertifications', () => {
    it('should return all certifications for owner', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petName: 'Buddy', status: 'approved' }) },
          { id: 'cert-2', data: () => ({ petName: 'Luna', status: 'pending' }) },
        ],
      });

      const result = await healthCertificationService.getMyCertifications('owner-1');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'cert-1', petName: 'Buddy', status: 'approved' });
      expect(result[1]).toEqual({ id: 'cert-2', petName: 'Luna', status: 'pending' });
    });

    it('should return empty array when no certifications', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

      const result = await healthCertificationService.getMyCertifications('owner-1');
      expect(result).toEqual([]);
    });
  });

  describe('getPetCertification', () => {
    it('should return null if no certifications exist for pet', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

      const result = await healthCertificationService.getPetCertification('pet-1');
      expect(result).toBeNull();
    });

    it('should return the first (latest) certification', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-latest', data: () => ({ status: 'approved', petName: 'Rex' }) },
          { id: 'cert-old', data: () => ({ status: 'expired' }) },
        ],
      });

      const result = await healthCertificationService.getPetCertification('pet-1');
      expect(result).toEqual({ id: 'cert-latest', status: 'approved', petName: 'Rex' });
    });
  });

  describe('getCertificationById', () => {
    it('should throw 404 if certification not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null, id: 'x' });

      await expect(
        healthCertificationService.getCertificationById('missing')
      ).rejects.toMatchObject({ message: 'Certification not found', statusCode: 404 });
    });

    it('should return certification by id', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ status: 'approved', petName: 'Buddy' }),
      });

      const result = await healthCertificationService.getCertificationById('cert-1');
      expect(result).toEqual({ id: 'cert-1', status: 'approved', petName: 'Buddy' });
    });
  });

  describe('processCertification', () => {
    it('should throw 404 if certification not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null, id: 'x' });

      await expect(
        healthCertificationService.processCertification('missing', true, 'admin-1')
      ).rejects.toMatchObject({ message: 'Certification not found', statusCode: 404 });
    });

    it('should throw 400 if certification is not pending', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ status: 'approved', petId: 'pet-1' }),
      });

      await expect(
        healthCertificationService.processCertification('cert-1', true, 'admin-1')
      ).rejects.toMatchObject({ message: 'Certification already processed', statusCode: 400 });
    });

    it('should approve certification and update pet', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'pending', petId: 'pet-1' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'approved', petId: 'pet-1', processedBy: 'admin-1' }),
        });

      const result = await healthCertificationService.processCertification('cert-1', true, 'admin-1');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'approved', processedBy: 'admin-1' })
      );
      expect(result.status).toBe('approved');
    });

    it('should reject certification with reason', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'pending', petId: 'pet-1' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'rejected', rejectionReason: 'Documents unclear' }),
        });

      const result = await healthCertificationService.processCertification('cert-1', false, 'admin-1', 'Documents unclear');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'rejected', rejectionReason: 'Documents unclear' })
      );
    });

    it('should use default rejection reason when none provided', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'pending', petId: 'pet-1' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'cert-1',
          data: () => ({ status: 'rejected', rejectionReason: 'Not approved' }),
        });

      await healthCertificationService.processCertification('cert-1', false, 'admin-1');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ rejectionReason: 'Not approved' })
      );
    });
  });

  describe('revokeCertification', () => {
    it('should revoke pet certification and update approved certs', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ status: 'approved' }) },
        ],
      });

      const result = await healthCertificationService.revokeCertification('pet-1', 'admin-1', 'Failed re-inspection');

      expect(result).toEqual({ message: 'Certification revoked' });
      // Update should be called for the pet and for each approved cert
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('should handle case with no approved certifications', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

      const result = await healthCertificationService.revokeCertification('pet-1', 'admin-1', 'Revoked');

      expect(result).toEqual({ message: 'Certification revoked' });
    });
  });

  describe('getAllCertifications', () => {
    it('should return all certifications with location data', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', species: 'dog', status: 'pending' }) },
        ],
      });

      const result = await healthCertificationService.getAllCertifications();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('cert-1');
    });

    it('should filter by status', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', status: 'pending' }) },
        ],
      });

      await healthCertificationService.getAllCertifications({ status: 'pending' });

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'pending');
    });

    it('should filter by species', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', species: 'cat' }) },
        ],
      });

      await healthCertificationService.getAllCertifications({ species: 'cat' });

      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'cat');
    });
  });

  describe('getCertificationFilters', () => {
    it('should return unique species, countries, and cities', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', species: 'dog' }) },
          { id: 'cert-2', data: () => ({ petId: 'pet-2', species: 'cat' }) },
          { id: 'cert-3', data: () => ({ petId: 'pet-1', species: 'dog' }) },
        ],
      });

      const result = await healthCertificationService.getCertificationFilters();

      expect(result.species).toContain('dog');
      expect(result.species).toContain('cat');
    });
  });
});
