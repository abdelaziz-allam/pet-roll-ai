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

describe('PregnancyService', () => {
  let service: any;
  let mockCollection: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { PregnancyService } = await import('../../src/modules/pregnancy/pregnancy.service');
    service = new PregnancyService();
    mockCollection = (db.collection as any)('pregnancies');
  });

  // ─── verifyPetOwnership ───────────────────────────────────────────────────────

  describe('verifyPetOwnership', () => {
    it('should return pet data when pet exists and owner matches', async () => {
      const petData = { ownerId: 'owner-1', species: 'dog', name: 'Rex' };
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => petData,
      });

      const result = await service.verifyPetOwnership('pet-1', 'owner-1');
      expect(result).toEqual(petData);
      expect(mockCollection.doc).toHaveBeenCalledWith('pet-1');
    });

    it('should throw 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'pet-1',
        data: () => null,
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1'))
        .rejects.toMatchObject({ message: 'Pet not found', statusCode: 404 });
    });

    it('should throw 404 when ownerId does not match', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'different-owner', species: 'cat' }),
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1'))
        .rejects.toMatchObject({ message: 'Pet not found', statusCode: 404 });
    });
  });

  // ─── startTracking ────────────────────────────────────────────────────────────

  describe('startTracking', () => {
    const petData = { ownerId: 'owner-1', species: 'dog', name: 'Rex' };

    beforeEach(() => {
      // First .get() call is for verifyPetOwnership (via petsRef.doc().get())
      // Second .get() call is for active pregnancy check (via pregRef.where().where().get())
      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'preg-1' });
    });

    it('should create a pregnancy with calculated due date for dog (63 days)', async () => {
      const input = { matingDate: '2024-03-01' };

      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.id).toBe('preg-1');
      expect(result.petId).toBe('pet-1');
      expect(result.ownerId).toBe('owner-1');
      expect(result.matingDate).toBe('2024-03-01');
      expect(result.startDate).toBe('2024-03-01');
      expect(result.status).toBe('active');
      // Dog gestation: 63 days from 2024-03-01 = 2024-05-03
      expect(result.expectedDueDate).toBe('2024-05-03');
      expect(result.weightLog).toEqual([]);
      expect(result.milestones).toEqual([]);
      expect(mockCollection.add).toHaveBeenCalledTimes(1);
    });

    it('should use startDate when matingDate is not provided', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { startDate: '2024-06-15' };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.matingDate).toBe('2024-06-15');
      expect(result.startDate).toBe('2024-06-15');
    });

    it('should use explicit expectedDueDate when provided', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-03-01', expectedDueDate: '2024-05-15' };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.expectedDueDate).toBe('2024-05-15');
    });

    it('should throw 409 when pet already has an active pregnancy', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: false, docs: [{ id: 'existing-preg' }] });

      const input = { matingDate: '2024-03-01' };

      await expect(service.startTracking('pet-1', 'owner-1', input))
        .rejects.toMatchObject({ message: 'Pet already has an active pregnancy', statusCode: 409 });
      expect(mockCollection.add).not.toHaveBeenCalled();
    });

    it('should silently skip active check when index error occurs', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockRejectedValueOnce(new Error('Index not ready'));

      const input = { matingDate: '2024-03-01' };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.id).toBe('preg-1');
      expect(mockCollection.add).toHaveBeenCalledTimes(1);
    });

    it('should calculate correct gestation for cat (65 days)', async () => {
      const catData = { ownerId: 'owner-1', species: 'cat', name: 'Whiskers' };
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-2', data: () => catData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-01-01' };
      const result = await service.startTracking('pet-2', 'owner-1', input);

      // Cat gestation: 65 days from 2024-01-01 = 2024-03-06
      expect(result.expectedDueDate).toBe('2024-03-06');
    });

    it('should calculate correct gestation for rabbit (31 days)', async () => {
      const rabbitData = { ownerId: 'owner-1', species: 'rabbit', name: 'Bunny' };
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-3', data: () => rabbitData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-01-01' };
      const result = await service.startTracking('pet-3', 'owner-1', input);

      // Rabbit gestation: 31 days from 2024-01-01 = 2024-02-01
      expect(result.expectedDueDate).toBe('2024-02-01');
    });

    it('should calculate correct gestation for hamster (16 days)', async () => {
      const hamsterData = { ownerId: 'owner-1', species: 'hamster', name: 'Hammy' };
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-4', data: () => hamsterData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-01-01' };
      const result = await service.startTracking('pet-4', 'owner-1', input);

      // Hamster gestation: 16 days from 2024-01-01 = 2024-01-17
      expect(result.expectedDueDate).toBe('2024-01-17');
    });

    it('should default to 65 days for unknown species', async () => {
      const unknownData = { ownerId: 'owner-1', species: 'parrot', name: 'Polly' };
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-5', data: () => unknownData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-01-01' };
      const result = await service.startTracking('pet-5', 'owner-1', input);

      // Default gestation: 65 days from 2024-01-01 = 2024-03-06
      expect(result.expectedDueDate).toBe('2024-03-06');
    });

    it('should store mateInfo and fatherInfo when provided', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = {
        matingDate: '2024-03-01',
        mateInfo: { name: 'Buddy', breed: 'Labrador' },
        fatherInfo: { name: 'Max', owner: 'John' },
        notes: 'First pregnancy',
      };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.mateInfo).toEqual({ name: 'Buddy', breed: 'Labrador' });
      expect(result.fatherInfo).toEqual({ name: 'Max', owner: 'John' });
      expect(result.notes).toBe('First pregnancy');
    });

    it('should set mateInfo, fatherInfo, and notes to null when not provided', async () => {
      const input = { matingDate: '2024-03-01' };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.mateInfo).toBeNull();
      expect(result.fatherInfo).toBeNull();
      expect(result.notes).toBeNull();
    });

    it('should use provided status instead of default active', async () => {
      mockCollection.get
        .mockReset()
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const input = { matingDate: '2024-03-01', status: 'completed' };
      const result = await service.startTracking('pet-1', 'owner-1', input);

      expect(result.status).toBe('completed');
    });
  });

  // ─── getAll ───────────────────────────────────────────────────────────────────

  describe('getAll', () => {
    const petData = { ownerId: 'owner-1', species: 'dog', name: 'Rex' };

    it('should return paginated pregnancy records sorted by createdAt desc', async () => {
      const docs = [
        { id: 'preg-1', petId: 'pet-1', status: 'active', createdAt: { _seconds: 1000 } },
        { id: 'preg-2', petId: 'pet-1', status: 'completed', createdAt: { _seconds: 3000 } },
        { id: 'preg-3', petId: 'pet-1', status: 'completed', createdAt: { _seconds: 2000 } },
      ];

      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({
          empty: false,
          docs: docs.map((d) => ({ id: d.id, data: () => d })),
        });

      const result = await service.getAll('pet-1', 'owner-1');

      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(1);
      // Should be sorted by createdAt descending
      expect(result.data[0].id).toBe('preg-2');
      expect(result.data[1].id).toBe('preg-3');
      expect(result.data[2].id).toBe('preg-1');
    });

    it('should paginate results correctly', async () => {
      const docs = Array.from({ length: 5 }, (_, i) => ({
        id: `preg-${i}`,
        petId: 'pet-1',
        createdAt: { _seconds: (i + 1) * 1000 },
      }));

      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({
          empty: false,
          docs: docs.map((d) => ({ id: d.id, data: () => d })),
        });

      const result = await service.getAll('pet-1', 'owner-1', 2, 2);

      expect(result.page).toBe(2);
      expect(result.limit).toBe(2);
      expect(result.total).toBe(5);
      expect(result.totalPages).toBe(3);
      // After sorting desc by createdAt: [preg-4, preg-3, preg-2, preg-1, preg-0]
      // Page 2 with limit 2: offset = 2, items [preg-2, preg-1]
      expect(result.data).toHaveLength(2);
    });

    it('should return empty data when no records exist', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const result = await service.getAll('pet-1', 'owner-1');

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });
  });

  // ─── getActive ────────────────────────────────────────────────────────────────

  describe('getActive', () => {
    const petData = { ownerId: 'owner-1', species: 'dog', name: 'Rex' };

    it('should return the active pregnancy when one exists', async () => {
      const activePreg = { petId: 'pet-1', status: 'active', matingDate: '2024-03-01' };

      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ id: 'preg-active', data: () => activePreg }],
        });

      const result = await service.getActive('pet-1', 'owner-1');

      expect(result).toEqual({ id: 'preg-active', ...activePreg });
      expect(mockCollection.where).toHaveBeenCalledWith('petId', '==', 'pet-1');
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'active');
      expect(mockCollection.limit).toHaveBeenCalledWith(1);
    });

    it('should return null when no active pregnancy exists', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ exists: true, id: 'pet-1', data: () => petData })
        .mockResolvedValueOnce({ empty: true, docs: [] });

      const result = await service.getActive('pet-1', 'owner-1');

      expect(result).toBeNull();
    });
  });

  // ─── getById ──────────────────────────────────────────────────────────────────

  describe('getById', () => {
    it('should return pregnancy record when found and owner matches', async () => {
      const pregData = { petId: 'pet-1', ownerId: 'owner-1', status: 'active' };
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => pregData,
      });

      const result = await service.getById('preg-1', 'owner-1');

      expect(result).toEqual({ id: 'preg-1', ...pregData });
      expect(mockCollection.doc).toHaveBeenCalledWith('preg-1');
    });

    it('should throw 404 when pregnancy record does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.getById('preg-1', 'owner-1'))
        .rejects.toMatchObject({ message: 'Pregnancy record not found', statusCode: 404 });
    });

    it('should throw 404 when ownerId does not match', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'different-owner' }),
      });

      await expect(service.getById('preg-1', 'owner-1'))
        .rejects.toMatchObject({ message: 'Pregnancy record not found', statusCode: 404 });
    });
  });

  // ─── update ───────────────────────────────────────────────────────────────────

  describe('update', () => {
    it('should update and return the updated pregnancy record', async () => {
      const pregData = { petId: 'pet-1', ownerId: 'owner-1', status: 'active', notes: null };
      const updatedData = { petId: 'pet-1', ownerId: 'owner-1', status: 'active', notes: 'Updated notes' };

      // First getById call (ownership check)
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => pregData,
      });
      // After update, second getById call
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => updatedData,
      });

      const result = await service.update('preg-1', 'owner-1', { notes: 'Updated notes' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ notes: 'Updated notes', updatedAt: 'SERVER_TIMESTAMP' })
      );
      expect(result).toEqual({ id: 'preg-1', ...updatedData });
    });

    it('should throw 404 when trying to update non-existent record', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.update('preg-1', 'owner-1', { notes: 'test' }))
        .rejects.toMatchObject({ statusCode: 404 });
    });
  });

  // ─── addWeight ────────────────────────────────────────────────────────────────

  describe('addWeight', () => {
    it('should add weight entry and return updated record', async () => {
      const pregData = { petId: 'pet-1', ownerId: 'owner-1', weightLog: [] };
      const updatedData = { petId: 'pet-1', ownerId: 'owner-1', weightLog: [{ weight: 5.2, date: '2024-03-15' }] };

      // First getById (ownership check)
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => pregData,
      });
      // After update, second getById
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => updatedData,
      });

      const result = await service.addWeight('preg-1', 'owner-1', 5.2);

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          weightLog: expect.objectContaining({ _arrayUnion: expect.any(Array) }),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(FieldValue.arrayUnion).toHaveBeenCalledWith(
        expect.objectContaining({ weight: 5.2, date: expect.any(String) })
      );
      expect(result).toEqual({ id: 'preg-1', ...updatedData });
    });

    it('should throw 404 when pregnancy record not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.addWeight('preg-1', 'owner-1', 5.2))
        .rejects.toMatchObject({ statusCode: 404 });
    });
  });

  // ─── getMilestones ────────────────────────────────────────────────────────────

  describe('getMilestones', () => {
    it('should return milestones array when present', async () => {
      const milestones = [
        { id: 'ms-1', name: 'First ultrasound', completed: false },
        { id: 'ms-2', name: 'Vet checkup', completed: true },
      ];
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1', milestones }),
      });

      const result = await service.getMilestones('preg-1', 'owner-1');

      expect(result).toEqual(milestones);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no milestones exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1' }),
      });

      const result = await service.getMilestones('preg-1', 'owner-1');

      expect(result).toEqual([]);
    });

    it('should throw 404 when pregnancy not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.getMilestones('preg-1', 'owner-1'))
        .rejects.toMatchObject({ statusCode: 404 });
    });
  });

  // ─── deletePregnancy ──────────────────────────────────────────────────────────

  describe('deletePregnancy', () => {
    it('should delete the pregnancy record when it exists and owner matches', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1' }),
      });

      await service.deletePregnancy('preg-1', 'owner-1');

      expect(mockCollection.doc).toHaveBeenCalledWith('preg-1');
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 when pregnancy record does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.deletePregnancy('preg-1', 'owner-1'))
        .rejects.toMatchObject({ statusCode: 404 });
    });

    it('should throw 404 when owner does not match', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'other-owner' }),
      });

      await expect(service.deletePregnancy('preg-1', 'owner-1'))
        .rejects.toMatchObject({ statusCode: 404 });
    });
  });

  // ─── completeMilestone ────────────────────────────────────────────────────────

  describe('completeMilestone', () => {
    it('should mark milestone as completed and return it', async () => {
      const milestones = [
        { id: 'ms-1', name: 'First ultrasound', completed: false },
        { id: 'ms-2', name: 'Vet checkup', completed: false },
      ];

      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1', milestones }),
      });

      const result = await service.completeMilestone('preg-1', 'ms-1', 'owner-1');

      expect(result.id).toBe('ms-1');
      expect(result.completed).toBe(true);
      expect(result.completedAt).toBeDefined();
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          milestones: expect.arrayContaining([
            expect.objectContaining({ id: 'ms-1', completed: true }),
          ]),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 when milestone is not found in the array', async () => {
      const milestones = [
        { id: 'ms-1', name: 'First ultrasound', completed: false },
      ];

      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1', milestones }),
      });

      await expect(service.completeMilestone('preg-1', 'ms-nonexistent', 'owner-1'))
        .rejects.toMatchObject({ message: 'Milestone not found', statusCode: 404 });
    });

    it('should throw 404 when pregnancy record not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-1',
        data: () => null,
      });

      await expect(service.completeMilestone('preg-1', 'ms-1', 'owner-1'))
        .rejects.toMatchObject({ statusCode: 404 });
    });

    it('should handle empty milestones array', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ petId: 'pet-1', ownerId: 'owner-1', milestones: [] }),
      });

      await expect(service.completeMilestone('preg-1', 'ms-1', 'owner-1'))
        .rejects.toMatchObject({ message: 'Milestone not found', statusCode: 404 });
    });
  });
});
