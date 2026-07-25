import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/schedules/schedules.service', () => ({
  schedulesService: {
    createSchedule: vi.fn().mockResolvedValue({ id: 'sched-1', type: 'feeding', title: 'Morning feed' }),
    getSchedules: vi.fn().mockResolvedValue({ data: [{ id: 'sched-1', type: 'feeding' }], total: 1, page: 1, limit: 20 }),
    updateSchedule: vi.fn().mockResolvedValue({ id: 'sched-1', title: 'Updated schedule' }),
    deleteSchedule: vi.fn().mockResolvedValue(undefined),
    logCompletion: vi.fn().mockResolvedValue({ id: 'sched-1', lastCompleted: '2024-01-01T08:00:00Z' }),
  },
}));

vi.mock('../../src/modules/schedules/schedules.schema', () => ({
  createScheduleSchema: { parse: vi.fn((body: any) => body) },
  updateScheduleSchema: { parse: vi.fn((body: any) => body) },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

vi.mock('../../src/config/firebase', () => ({
  db: { collection: vi.fn() },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: { serverTimestamp: vi.fn(), increment: vi.fn() },
}));

import { schedulesRoutes } from '../../src/modules/schedules/schedules.routes';

describe('Schedules Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(schedulesRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /pets/:petId/schedules', () => {
    it('creates a schedule and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/schedules',
        payload: { type: 'feeding', title: 'Morning feed', frequency: 'daily', time: '08:00' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.type).toBe('feeding');
    });
  });

  describe('GET /pets/:petId/schedules', () => {
    it('returns schedules with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/schedules' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
    });

    it('accepts page and limit params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/schedules?page=1&limit=10' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /pets/:petId/schedules/:scheduleId', () => {
    it('updates a schedule and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/schedules/sched-1',
        payload: { title: 'Updated schedule' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /pets/:petId/schedules/:scheduleId', () => {
    it('deletes a schedule and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/pets/pet-1/schedules/sched-1' });
      expect(res.statusCode).toBe(204);
    });
  });

  describe('POST /pets/:petId/schedules/:scheduleId/log', () => {
    it('logs schedule completion and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/schedules/sched-1/log',
      });
      expect(res.statusCode).toBe(200);
    });
  });
});
