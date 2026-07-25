import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockPetDoc = {
  exists: true,
  data: () => ({ ownerId: 'user-1', name: 'Buddy' }),
};

const mockReportDoc = {
  exists: true,
  data: () => ({ ownerId: 'user-1', petId: 'pet-1', type: 'health_summary' }),
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn((name: string) => {
      if (name === 'pets') {
        return {
          doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue(mockPetDoc),
          })),
        };
      }
      if (name === 'health_records') {
        return {
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({ size: 5, docs: [] }),
        };
      }
      if (name === 'vaccinations') {
        return {
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({ size: 3, docs: [] }),
        };
      }
      if (name === 'reports') {
        return {
          add: vi.fn().mockResolvedValue({ id: 'report-1' }),
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            docs: [{ id: 'report-1', data: () => ({ petId: 'pet-1', type: 'health_summary' }) }],
          }),
          doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue(mockReportDoc),
          })),
        };
      }
      return {
        where: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: [], size: 0 }),
      };
    }),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: {
    bucket: vi.fn(() => ({
      file: vi.fn(() => ({
        getSignedUrl: vi.fn().mockResolvedValue(['https://signed-url.example.com/report.pdf']),
      })),
    })),
  },
  FieldValue: { serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'), increment: vi.fn() },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

import { reportsRoutes } from '../../src/modules/reports/reports.routes';

describe('Reports Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(reportsRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /pets/:petId/reports/health', () => {
    it('generates health report and returns 201', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/pets/pet-1/reports/health' });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBeDefined();
      expect(body.type).toBe('health_summary');
    });
  });

  describe('GET /pets/:petId/reports', () => {
    it('returns pet reports with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/reports' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe('GET /reports/:reportId/download', () => {
    it('returns download URL with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/reports/report-1/download' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.downloadUrl).toBeDefined();
    });
  });
});
