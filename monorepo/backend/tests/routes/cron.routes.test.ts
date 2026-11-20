import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockBatch = {
  delete: vi.fn(),
  update: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn((name: string) => {
      if (name === 'schedules') {
        return {
          where: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            docs: [
              { id: 'sched-1', data: () => ({ ownerId: 'user-1', title: 'Morning feed', petId: 'pet-1' }) },
            ],
          }),
        };
      }
      if (name === 'notifications') {
        return {
          add: vi.fn().mockResolvedValue({ id: 'notif-1' }),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            size: 2,
            docs: [
              { id: 'notif-1', ref: { id: 'notif-1' } },
              { id: 'notif-2', ref: { id: 'notif-2' } },
            ],
          }),
        };
      }
      if (name === 'users') {
        return {
          where: vi.fn().mockReturnThis(),
          count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }) }),
        };
      }
      if (name === 'pets') {
        return {
          count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 30 }) }) }),
        };
      }
      if (name === 'mating_listings') {
        return {
          where: vi.fn().mockReturnThis(),
          count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 10 }) }) }),
        };
      }
      if (name === 'app_stats') {
        return {
          add: vi.fn().mockResolvedValue({ id: 'stat-1' }),
        };
      }
      return {
        where: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: [], size: 0 }),
        add: vi.fn().mockResolvedValue({ id: 'new-doc' }),
      };
    }),
    batch: vi.fn(() => mockBatch),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: { serverTimestamp: vi.fn(), increment: vi.fn() },
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

import { cronRoutes } from '../../src/modules/cron/cron.routes';

describe('Cron Routes', () => {
  let fastify: FastifyInstance;

  const secret = 'test-cron-secret-value';
  const auth = { 'x-cron-secret': secret };

  beforeAll(async () => {
    process.env.CRON_SECRET = secret;
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(cronRoutes);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
    delete process.env.CRON_SECRET;
  });

  describe('GET /ping', () => {
    it('returns ok status with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/ping' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('ok');
      expect(body.timestamp).toBeDefined();
    });
  });

  describe('POST /send-reminders', () => {
    it('sends reminders and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/send-reminders', headers: auth });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.sent).toBeDefined();
      expect(body.processedAt).toBeDefined();
    });
  });

  describe('POST /cleanup', () => {
    it('cleans up old notifications and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/cleanup', headers: auth });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.deleted).toBeDefined();
    });
  });

  describe('POST /compute-stats', () => {
    it('computes stats and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/compute-stats', headers: auth });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.computed).toBe(true);
    });
  });

  // Regression: these jobs were callable by anyone on the internet.
  describe('authorization', () => {
    it.each(['/send-reminders', '/cleanup', '/compute-stats'])('rejects %s without the secret', async (url) => {
      const res = await fastify.inject({ method: 'POST', url });
      expect(res.statusCode).toBe(401);
    });

    it('rejects a wrong secret', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/cleanup', headers: { 'x-cron-secret': 'wrong' } });
      expect(res.statusCode).toBe(401);
    });

    it('rejects every call when CRON_SECRET is unset', async () => {
      delete process.env.CRON_SECRET;
      const res = await fastify.inject({ method: 'POST', url: '/cleanup', headers: auth });
      process.env.CRON_SECRET = secret;
      expect(res.statusCode).toBe(401);
    });
  });
});
