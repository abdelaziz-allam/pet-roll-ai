import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockNotifDoc = {
  exists: true,
  data: () => ({ userId: 'user-1', title: 'Test', read: false }),
};

const mockBatch = {
  update: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn((name: string) => {
      if (name === 'notifications') {
        return {
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          offset: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            docs: [
              { id: 'notif-1', data: () => ({ userId: 'user-1', title: 'Vaccination due', read: false }), ref: { id: 'notif-1' } },
            ],
            size: 1,
          }),
          doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue(mockNotifDoc),
            update: vi.fn().mockResolvedValue(undefined),
          })),
        };
      }
      if (name === 'users') {
        return {
          doc: vi.fn(() => ({
            update: vi.fn().mockResolvedValue(undefined),
          })),
        };
      }
      return {
        where: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: [], size: 0 }),
      };
    }),
    batch: vi.fn(() => mockBatch),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn(),
  },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

import { notificationsRoutes } from '../../src/modules/notifications/notifications.routes';

describe('Notifications Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(notificationsRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('GET /', () => {
    it('returns notifications with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('accepts page and limit params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/?page=1&limit=10' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /:id/read', () => {
    it('marks notification as read and returns 200', async () => {
      const res = await fastify.inject({ method: 'PUT', url: '/notif-1/read' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
    });
  });

  describe('PUT /read-all', () => {
    it('marks all notifications as read and returns 200', async () => {
      const res = await fastify.inject({ method: 'PUT', url: '/read-all' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
    });
  });

  describe('POST /devices', () => {
    it('registers device token and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/devices',
        payload: { token: 'fcm-token-123' },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
    });
  });

  describe('DELETE /devices/:token', () => {
    it('removes device token and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/devices/fcm-token-123' });
      expect(res.statusCode).toBe(204);
    });
  });
});
