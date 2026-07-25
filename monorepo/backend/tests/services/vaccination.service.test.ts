import { describe, it, expect, vi, beforeEach } from 'vitest';
import { VaccinationService } from '../../src/modules/vaccination/vaccination.service';
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

describe('VaccinationService', () => {
  let service: VaccinationService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new VaccinationService();
    mockCollection = (db.collection as any)('vaccinations');
  });

  // --- verifyPetOwnership ---

  describe('verifyPetOwnership', () => {
    it('should resolve if pet exists and belongs to owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1')).resolves.toBeUndefined();
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
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- logVaccination ---

  describe('logVaccination', () => {
    it('should create a vaccination record with normalized fields', async () => {
      // verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'vac-1' });

      const input = {
        name: 'Rabies',
        dateAdministered: '2024-03-15',
        veterinarian: 'Dr. Smith',
        nextDueDate: '2025-03-15',
        notes: 'Annual shot',
      };

      const result = await service.logVaccination('pet-1', 'owner-1', input);

      expect(result.id).toBe('vac-1');
      expect(result.petId).toBe('pet-1');
      expect(result.ownerId).toBe('owner-1');
      expect(result.name).toBe('Rabies');
      expect(result.vaccineName).toBe('Rabies');
      expect(result.dateAdministered).toBe('2024-03-15');
      expect(result.administeredDate).toBe('2024-03-15');
      expect(result.veterinarian).toBe('Dr. Smith');
    });

    it('should normalize vaccineName to name', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'vac-2' });

      const input = {
        vaccineName: 'Distemper',
        administeredDate: '2024-06-01',
        vetName: 'Dr. Jones',
      };

      const result = await service.logVaccination('pet-1', 'owner-1', input);

      expect(result.name).toBe('Distemper');
      expect(result.vaccineName).toBe('Distemper');
      expect(result.dateAdministered).toBe('2024-06-01');
      expect(result.administeredDate).toBe('2024-06-01');
      expect(result.veterinarian).toBe('Dr. Jones');
    });

    it('should add timestamps', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'vac-3' });

      const result = await service.logVaccination('pet-1', 'owner-1', { name: 'FVRCP' });

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 if pet ownership check fails', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(
        service.logVaccination('missing', 'owner-1', { name: 'Rabies' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(
        service.logVaccination('pet-1', 'owner-1', { name: 'Rabies' })
      ).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- getVaccinations ---

  describe('getVaccinations', () => {
    it('should return paginated vaccination records', async () => {
      // verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 12 }) }),
      });

      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'vac-1', data: () => ({ name: 'Rabies', dateAdministered: '2024-03-15' }) },
          { id: 'vac-2', data: () => ({ name: 'FVRCP', dateAdministered: '2024-02-01' }) },
        ],
      });

      const result = await service.getVaccinations('pet-1', 'owner-1', 1, 10);

      expect(result.total).toBe(12);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: 'vac-1', name: 'Rabies', dateAdministered: '2024-03-15' });
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

      const result = await service.getVaccinations('pet-1', 'owner-1');

      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(20);
    });

    it('should calculate correct offset for page 3', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 60 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getVaccinations('pet-1', 'owner-1', 3, 10);

      expect(mockCollection.offset).toHaveBeenCalledWith(20);
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

      await service.getVaccinations('pet-1', 'owner-1');

      expect(mockCollection.where).toHaveBeenCalledWith('petId', '==', 'pet-1');
    });

    it('should order by dateAdministered descending', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getVaccinations('pet-1', 'owner-1');

      expect(mockCollection.orderBy).toHaveBeenCalledWith('dateAdministered', 'desc');
    });

    it('should throw 404 if pet ownership fails', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getVaccinations('missing', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- getUpcoming ---

  describe('getUpcoming', () => {
    it('should return upcoming vaccinations', async () => {
      // verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });

      // upcoming query
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'vac-1', data: () => ({ name: 'Rabies', nextDueDate: '2025-06-01' }) },
          { id: 'vac-2', data: () => ({ name: 'FVRCP', nextDueDate: '2025-08-15' }) },
        ],
      });

      const result = await service.getUpcoming('pet-1', 'owner-1');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'vac-1', name: 'Rabies', nextDueDate: '2025-06-01' });
    });

    it('should filter by nextDueDate >= now', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getUpcoming('pet-1', 'owner-1');

      expect(mockCollection.where).toHaveBeenCalledWith('petId', '==', 'pet-1');
      expect(mockCollection.where).toHaveBeenCalledWith('nextDueDate', '>=', expect.any(String));
    });

    it('should order by nextDueDate ascending', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getUpcoming('pet-1', 'owner-1');

      expect(mockCollection.orderBy).toHaveBeenCalledWith('nextDueDate', 'asc');
    });

    it('should limit results to 10', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      await service.getUpcoming('pet-1', 'owner-1');

      expect(mockCollection.limit).toHaveBeenCalledWith(10);
    });

    it('should return empty array if no upcoming vaccinations', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'owner-1' }),
      });
      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      const result = await service.getUpcoming('pet-1', 'owner-1');

      expect(result).toEqual([]);
    });

    it('should throw 404 if pet ownership fails', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getUpcoming('missing', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- updateVaccination ---

  describe('updateVaccination', () => {
    it('should update a vaccination record', async () => {
      // First get: verify ownership
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'vac-1',
          data: () => ({ name: 'Rabies', ownerId: 'owner-1', petId: 'pet-1' }),
        })
        // Second get: return updated record
        .mockResolvedValueOnce({
          exists: true,
          id: 'vac-1',
          data: () => ({ name: 'Rabies Booster', ownerId: 'owner-1', petId: 'pet-1', nextDueDate: '2026-03-15' }),
        });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.updateVaccination('vac-1', 'owner-1', {
        name: 'Rabies Booster',
        nextDueDate: '2026-03-15',
      });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Rabies Booster',
          nextDueDate: '2026-03-15',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.name).toBe('Rabies Booster');
    });

    it('should throw 404 if vaccination record does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(
        service.updateVaccination('missing', 'owner-1', { name: 'Updated' })
      ).rejects.toMatchObject({
        message: 'Vaccination record not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if vaccination belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'vac-1',
        data: () => ({ name: 'Rabies', ownerId: 'other-owner' }),
      });

      await expect(
        service.updateVaccination('vac-1', 'owner-1', { name: 'Updated' })
      ).rejects.toMatchObject({
        message: 'Vaccination record not found',
        statusCode: 404,
      });
    });
  });

  // --- deleteVaccination ---

  describe('deleteVaccination', () => {
    it('should delete a vaccination record', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'vac-1',
        data: () => ({ name: 'Rabies', ownerId: 'owner-1' }),
      });
      mockCollection.delete.mockResolvedValue(undefined);

      await service.deleteVaccination('vac-1', 'owner-1');

      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 if vaccination does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.deleteVaccination('missing', 'owner-1')).rejects.toMatchObject({
        message: 'Vaccination record not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if vaccination belongs to different owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'vac-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(service.deleteVaccination('vac-1', 'owner-1')).rejects.toMatchObject({
        message: 'Vaccination record not found',
        statusCode: 404,
      });
    });
  });
});
