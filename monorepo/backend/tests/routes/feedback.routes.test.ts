import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/feedback/feedback.service', () => ({
  createFeedback: vi.fn().mockResolvedValue({ id: 'fb-1', type: 'bug', message: 'Found a bug', status: 'open' }),
  getUserFeedback: vi.fn().mockResolvedValue({ data: [{ id: 'fb-1', type: 'bug' }], total: 1, page: 1, limit: 20 }),
  listAllFeedback: vi.fn().mockResolvedValue({ data: [{ id: 'fb-1' }], total: 1, page: 1, limit: 20 }),
  replyToFeedback: vi.fn().mockResolvedValue({ id: 'fb-1', adminReply: 'Thanks for reporting' }),
  updateFeedbackStatus: vi.fn().mockResolvedValue({ id: 'fb-1', status: 'closed' }),
  toggleTodo: vi.fn().mockResolvedValue({ id: 'fb-1', isTodo: true }),
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', name: 'Test User', role: 'user' };
  }),
}));

vi.mock('../../src/middleware/require-admin-auth', () => ({
  requireAdminAuth: vi.fn().mockImplementation(async (req: any) => {
    req.adminUser = { uid: 'admin-1', email: 'admin@test.com', role: 'super_admin', permissions: {} };
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

import { feedbackRoutes } from '../../src/modules/feedback/feedback.routes';

describe('Feedback Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(feedbackRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /', () => {
    it('creates feedback and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: { type: 'bug', message: 'Found a bug' },
      });
      expect(res.statusCode).toBe(201);
    });

    it('returns 400 when type is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: { message: 'Found a bug' },
      });
      expect(res.statusCode).toBe(400);
    });

    it('returns 400 when message is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: { type: 'bug' },
      });
      expect(res.statusCode).toBe(400);
    });

    it('returns 400 with invalid type', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: { type: 'invalid', message: 'test' },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /', () => {
    it('returns user feedback with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /admin', () => {
    it('returns all feedback for admin with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/admin' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /admin/:id/reply', () => {
    it('replies to feedback and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/reply',
        payload: { reply: 'Thanks for reporting' },
      });
      expect(res.statusCode).toBe(200);
    });

    it('returns 400 when reply is missing', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/reply',
        payload: {},
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /admin/:id/status', () => {
    it('updates status and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/status',
        payload: { status: 'closed' },
      });
      expect(res.statusCode).toBe(200);
    });

    it('returns 400 with invalid status', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/status',
        payload: { status: 'invalid' },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /admin/:id/todo', () => {
    it('toggles todo and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/todo',
        payload: { isTodo: true },
      });
      expect(res.statusCode).toBe(200);
    });

    it('returns 400 when isTodo is not boolean', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/fb-1/todo',
        payload: { isTodo: 'yes' },
      });
      expect(res.statusCode).toBe(400);
    });
  });
});
