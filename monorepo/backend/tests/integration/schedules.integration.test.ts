import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, seedSchedule, clearStore } from './helpers';

describe('Schedules API Integration', () => {
  let app: FastifyInstance;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
    seedUser('user-1', { email: 'john@test.com' });
    seedPet('pet-1', 'user-1');
    token = generateToken('user-1', 'john@test.com');
  });

  describe('POST /api/v1/pets/:petId/schedules', () => {
    it('creates a feeding schedule', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'feeding',
          title: 'Morning Feed',
          frequency: 'daily',
          nextDue: '2024-03-16T08:00:00Z',
          time: '08:00',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.type).toBe('feeding');
      expect(body.title).toBe('Morning Feed');
      expect(body.enabled).toBe(true);
      expect(body.reminderMinutesBefore).toBe(30);
    });

    it('creates a medication schedule', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'medication',
          title: 'Heartworm Prevention',
          frequency: 'monthly',
          nextDue: '2024-04-15T09:00:00Z',
          time: '09:00',
          reminderMinutesBefore: 60,
        },
      });

      expect(res.statusCode).toBe(201);
      expect(res.json().type).toBe('medication');
    });

    it('creates an exercise schedule', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'exercise',
          title: 'Evening Walk',
          frequency: 'daily',
          nextDue: '2024-03-16T18:00:00Z',
          time: '18:00',
        },
      });

      expect(res.statusCode).toBe(201);
      expect(res.json().type).toBe('exercise');
    });

    it('returns 404 for unowned pet', async () => {
      seedPet('pet-2', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-2/schedules',
        headers: { authorization: `Bearer ${token}` },
        payload: { type: 'feeding', title: 'Feed', frequency: 'daily', nextDue: '2024-03-16T08:00:00Z' },
      });

      expect(res.statusCode).toBe(404);
    });

    it('validates schedule type', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules',
        headers: { authorization: `Bearer ${token}` },
        payload: { type: 'invalid', title: 'Bad', frequency: 'daily', time: '08:00' },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/pets/:petId/schedules', () => {
    it('returns paginated schedules', async () => {
      seedSchedule('sched-1', 'pet-1', 'user-1', { title: 'Morning Feed' });
      seedSchedule('sched-2', 'pet-1', 'user-1', { title: 'Evening Walk', type: 'exercise' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/schedules',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.data).toBeDefined();
      expect(body.total).toBeDefined();
    });
  });

  describe('PUT /api/v1/pets/:petId/schedules/:scheduleId', () => {
    it('updates a schedule', async () => {
      seedSchedule('sched-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/schedules/sched-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { time: '09:00', enabled: false },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 for schedule owned by another user', async () => {
      seedSchedule('sched-1', 'pet-1', 'user-2');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/schedules/sched-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { enabled: false },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/pets/:petId/schedules/:scheduleId', () => {
    it('deletes a schedule', async () => {
      seedSchedule('sched-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1/schedules/sched-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });

  describe('POST /api/v1/pets/:petId/schedules/:scheduleId/log', () => {
    it('logs a schedule completion', async () => {
      seedSchedule('sched-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules/sched-1/log',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 for non-existent schedule', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/schedules/fake-id/log',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
