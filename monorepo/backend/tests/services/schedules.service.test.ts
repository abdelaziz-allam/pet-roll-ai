import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SchedulesService } from '../../src/modules/schedules/schedules.service';
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

describe('SchedulesService', () => {
  let service: SchedulesService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new SchedulesService();

    // db.collection returns the same mock object for all collection names
    mockCollection = (db.collection as any)('schedules');
  });

  // --- verifyPetOwnership ---

  describe('verifyPetOwnership', () => {
    it('should resolve when pet exists and belongs to owner', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1')).resolves.toBeUndefined();
      expect(mockCollection.doc).toHaveBeenCalledWith('pet-1');
    });

    it('should throw 404 if pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'pet-1',
        data: () => null,
      });

      await expect(service.verifyPetOwnership('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to a different owner', async () => {
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

  // --- createSchedule ---

  describe('createSchedule', () => {
    it('should create a schedule after verifying pet ownership', async () => {
      // First .get() call is for verifyPetOwnership (petsRef.doc(petId).get())
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'schedule-1' });

      const input = {
        type: 'feeding',
        frequency: 'daily',
        nextDue: '2026-08-01T08:00:00Z',
      };

      const result = await service.createSchedule('pet-1', 'owner-1', input);

      expect(result.id).toBe('schedule-1');
      expect(result.petId).toBe('pet-1');
      expect(result.ownerId).toBe('owner-1');
      expect(result.type).toBe('feeding');
      expect(result.completionLog).toEqual([]);
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'feeding',
          frequency: 'daily',
          nextDue: '2026-08-01T08:00:00Z',
          petId: 'pet-1',
          ownerId: 'owner-1',
          completionLog: [],
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 if pet not found during creation', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'pet-1',
        data: () => null,
      });

      const input = { type: 'feeding', frequency: 'daily' };

      await expect(service.createSchedule('pet-1', 'owner-1', input)).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });

      expect(mockCollection.add).not.toHaveBeenCalled();
    });

    it('should throw 404 if pet belongs to different owner during creation', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'other-owner' }),
      });

      const input = { type: 'walking', frequency: 'daily' };

      await expect(service.createSchedule('pet-1', 'owner-1', input)).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });

      expect(mockCollection.add).not.toHaveBeenCalled();
    });
  });

  // --- getSchedules ---

  describe('getSchedules', () => {
    it('should return paginated schedules for a pet', async () => {
      // First .get() for verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      // count().get() returns count data
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 25 }) }),
      });

      // The final .get() for the query results
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'sched-1', data: () => ({ type: 'feeding', nextDue: '2026-08-01' }) },
          { id: 'sched-2', data: () => ({ type: 'walking', nextDue: '2026-08-02' }) },
        ],
      });

      const result = await service.getSchedules('pet-1', 'owner-1', 2, 10);

      expect(result.total).toBe(25);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(3);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: 'sched-1', type: 'feeding', nextDue: '2026-08-01' });
      expect(result.data[1]).toEqual({ id: 'sched-2', type: 'walking', nextDue: '2026-08-02' });

      expect(mockCollection.where).toHaveBeenCalledWith('petId', '==', 'pet-1');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('nextDue', 'asc');
      expect(mockCollection.offset).toHaveBeenCalledWith(10);
      expect(mockCollection.limit).toHaveBeenCalledWith(10);
    });

    it('should use default pagination values (page=1, limit=20)', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });

      mockCollection.get.mockResolvedValueOnce({ docs: [] });

      const result = await service.getSchedules('pet-1', 'owner-1');

      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.data).toEqual([]);
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(20);
    });

    it('should throw 404 if pet not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'pet-1',
        data: () => null,
      });

      await expect(service.getSchedules('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'other-owner' }),
      });

      await expect(service.getSchedules('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- updateSchedule ---

  describe('updateSchedule', () => {
    it('should update schedule fields and return updated document', async () => {
      // First .get() to verify ownership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'owner-1', petId: 'pet-1' }),
      });

      mockCollection.update.mockResolvedValue(undefined);

      // Second .get() to return updated doc
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', frequency: 'twice-daily', ownerId: 'owner-1', petId: 'pet-1' }),
      });

      const result = await service.updateSchedule('sched-1', 'owner-1', { frequency: 'twice-daily' });

      expect(result).toEqual({
        id: 'sched-1',
        type: 'feeding',
        frequency: 'twice-daily',
        ownerId: 'owner-1',
        petId: 'pet-1',
      });
      expect(mockCollection.doc).toHaveBeenCalledWith('sched-1');
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          frequency: 'twice-daily',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 if schedule does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'sched-1',
        data: () => null,
      });

      await expect(service.updateSchedule('sched-1', 'owner-1', { frequency: 'weekly' })).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });

    it('should throw 404 if schedule belongs to different owner', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'other-owner', petId: 'pet-1' }),
      });

      await expect(service.updateSchedule('sched-1', 'owner-1', { frequency: 'weekly' })).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });
  });

  // --- deleteSchedule ---

  describe('deleteSchedule', () => {
    it('should delete the schedule', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'owner-1', petId: 'pet-1' }),
      });

      mockCollection.delete.mockResolvedValue(undefined);

      await expect(service.deleteSchedule('sched-1', 'owner-1')).resolves.toBeUndefined();

      expect(mockCollection.doc).toHaveBeenCalledWith('sched-1');
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 if schedule does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'sched-1',
        data: () => null,
      });

      await expect(service.deleteSchedule('sched-1', 'owner-1')).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.delete).not.toHaveBeenCalled();
    });

    it('should throw 404 if schedule belongs to different owner', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'other-owner', petId: 'pet-1' }),
      });

      await expect(service.deleteSchedule('sched-1', 'owner-1')).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.delete).not.toHaveBeenCalled();
    });
  });

  // --- logCompletion ---

  describe('logCompletion', () => {
    it('should log completion and return updated schedule', async () => {
      // First .get() to verify ownership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'owner-1', petId: 'pet-1', completionLog: [] }),
      });

      mockCollection.update.mockResolvedValue(undefined);

      // Second .get() to return updated doc
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({
          type: 'feeding',
          ownerId: 'owner-1',
          petId: 'pet-1',
          completionLog: [{ completedAt: '2026-07-25T10:00:00.000Z' }],
          lastCompleted: '2026-07-25T10:00:00.000Z',
        }),
      });

      const result = await service.logCompletion('sched-1', 'owner-1');

      expect(result.id).toBe('sched-1');
      expect(result.completionLog).toHaveLength(1);
      expect(mockCollection.doc).toHaveBeenCalledWith('sched-1');
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          completionLog: expect.anything(),
          lastCompleted: expect.any(String),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );

      // Verify FieldValue.arrayUnion was called with an object containing completedAt
      expect(FieldValue.arrayUnion).toHaveBeenCalledWith(
        expect.objectContaining({ completedAt: expect.any(String) })
      );
    });

    it('should throw 404 if schedule does not exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'sched-1',
        data: () => null,
      });

      await expect(service.logCompletion('sched-1', 'owner-1')).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });

    it('should throw 404 if schedule belongs to different owner', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'sched-1',
        data: () => ({ type: 'feeding', ownerId: 'other-owner', petId: 'pet-1' }),
      });

      await expect(service.logCompletion('sched-1', 'owner-1')).rejects.toMatchObject({
        message: 'Schedule not found',
        statusCode: 404,
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });
  });
});
