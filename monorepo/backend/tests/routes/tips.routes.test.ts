import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/tips/tips.service', () => ({
  getDailyTip: vi.fn().mockResolvedValue({ id: 'tip-1', title: 'Keep your pet hydrated', category: 'health' }),
  listTips: vi.fn().mockResolvedValue({ data: [{ id: 'tip-1', title: 'Keep your pet hydrated' }], total: 1, page: 1, limit: 20 }),
  getTipById: vi.fn().mockResolvedValue({ id: 'tip-1', title: 'Keep your pet hydrated' }),
  createTip: vi.fn().mockResolvedValue({ id: 'tip-new', title: 'New Tip' }),
  updateTip: vi.fn().mockResolvedValue({ id: 'tip-1', title: 'Updated Tip' }),
  deleteTip: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock('../../src/modules/tips/tips.schema', () => ({
  createTipSchema: { parse: vi.fn((body: any) => body) },
  updateTipSchema: { parse: vi.fn((body: any) => body) },
}));

vi.mock('../../src/types/common', () => ({
  paginationSchema: {
    extend: vi.fn().mockReturnValue({ parse: vi.fn((query: any) => query) }),
  },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'super_admin' };
  }),
}));

vi.mock('../../src/middleware/require-role', () => ({
  requireRole: vi.fn().mockImplementation(() => async () => {}),
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

import { tipsRoutes } from '../../src/modules/tips/tips.routes';

describe('Tips Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(tipsRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('GET /daily', () => {
    it('returns daily tip with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/daily' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.title).toBeDefined();
    });

    it('accepts species query param', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/daily?species=dog' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /', () => {
    it('returns all tips with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('returns a tip by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/tip-1' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /', () => {
    it('creates a tip and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: { title: 'New Tip', content: 'Tip content', category: 'health' },
      });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('PUT /:id', () => {
    it('updates a tip and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/tip-1',
        payload: { title: 'Updated Tip' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /:id', () => {
    it('deletes a tip and returns 200', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/tip-1' });
      expect(res.statusCode).toBe(200);
    });
  });
});
