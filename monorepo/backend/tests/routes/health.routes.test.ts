import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/health/health.service', () => ({
  healthService: {
    createRecord: vi.fn().mockResolvedValue({ id: 'rec-1', type: 'checkup', title: 'Annual checkup' }),
    getRecords: vi.fn().mockResolvedValue({ data: [{ id: 'rec-1', type: 'checkup' }], total: 1, page: 1, limit: 20 }),
    getRecordById: vi.fn().mockResolvedValue({ id: 'rec-1', type: 'checkup', title: 'Annual checkup' }),
    updateRecord: vi.fn().mockResolvedValue({ id: 'rec-1', title: 'Updated checkup' }),
    deleteRecord: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('../../src/modules/health/health.schema', () => ({
  createHealthRecordSchema: { parse: vi.fn((body: any) => body) },
  updateHealthRecordSchema: { parse: vi.fn((body: any) => body) },
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

import { healthRoutes } from '../../src/modules/health/health.routes';

describe('Health Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(healthRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /pets/:petId/health', () => {
    it('creates a health record and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/health',
        payload: { type: 'checkup', title: 'Annual checkup', date: '2024-01-01' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('rec-1');
    });
  });

  describe('GET /pets/:petId/health', () => {
    it('returns health records with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/health' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
    });

    it('accepts page and limit params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/health?page=2&limit=5' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /pets/:petId/health/:recordId', () => {
    it('returns a health record by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/health/rec-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('rec-1');
    });
  });

  describe('PUT /pets/:petId/health/:recordId', () => {
    it('updates a health record and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/health/rec-1',
        payload: { title: 'Updated checkup' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /pets/:petId/health/:recordId', () => {
    it('deletes a health record and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/pets/pet-1/health/rec-1' });
      expect(res.statusCode).toBe(204);
    });
  });
});
