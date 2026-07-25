import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/vaccination/vaccination.service', () => ({
  vaccinationService: {
    logVaccination: vi.fn().mockResolvedValue({ id: 'vac-1', name: 'Rabies', status: 'completed' }),
    getVaccinations: vi.fn().mockResolvedValue({ data: [{ id: 'vac-1', name: 'Rabies' }], total: 1, page: 1, limit: 20 }),
    getUpcoming: vi.fn().mockResolvedValue([{ id: 'vac-2', name: 'DHPP', nextDueDate: '2025-06-01' }]),
    updateVaccination: vi.fn().mockResolvedValue({ id: 'vac-1', name: 'Rabies Updated' }),
    deleteVaccination: vi.fn().mockResolvedValue(undefined),
  },
}));

vi.mock('../../src/modules/vaccination/vaccination.schema', () => ({
  logVaccinationSchema: { parse: vi.fn((body: any) => body) },
  updateVaccinationSchema: { parse: vi.fn((body: any) => body) },
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

import { vaccinationRoutes } from '../../src/modules/vaccination/vaccination.routes';

describe('Vaccination Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(vaccinationRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /pets/:petId/vaccinations', () => {
    it('logs a vaccination and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/vaccinations',
        payload: { name: 'Rabies', administeredDate: '2024-01-01', vetName: 'Dr. Smith' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.name).toBe('Rabies');
    });
  });

  describe('GET /pets/:petId/vaccinations', () => {
    it('returns vaccinations with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/vaccinations' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
    });

    it('accepts page and limit params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/vaccinations?page=1&limit=10' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /pets/:petId/vaccinations/upcoming', () => {
    it('returns upcoming vaccinations with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/vaccinations/upcoming' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe('PUT /pets/:petId/vaccinations/:vacId', () => {
    it('updates a vaccination and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/vaccinations/vac-1',
        payload: { name: 'Rabies Updated' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /pets/:petId/vaccinations/:vacId', () => {
    it('deletes a vaccination and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/pets/pet-1/vaccinations/vac-1' });
      expect(res.statusCode).toBe(204);
    });
  });
});
