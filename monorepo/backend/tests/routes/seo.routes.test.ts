import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/seo/seo.service', () => ({
  SeoService: vi.fn().mockImplementation(() => ({
    pingSearchEngines: vi.fn().mockResolvedValue(undefined),
  })),
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

import { seoRoutes } from '../../src/modules/seo/seo.routes';

describe('SEO Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(seoRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('GET /indexnow-key.txt', () => {
    it('returns 404 when INDEXNOW_KEY is not configured', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/indexnow-key.txt' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /ping-search-engines', () => {
    it('pings search engines and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/ping-search-engines',
        payload: { urls: ['https://petfolio.com/blog/test'] },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.success).toBe(true);
    });

    it('works without urls payload', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/ping-search-engines',
        payload: {},
      });
      expect(res.statusCode).toBe(200);
    });
  });
});
