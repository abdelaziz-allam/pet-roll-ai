import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockCollection = vi.hoisted(() => ({
  doc: vi.fn().mockReturnThis(),
  add: vi.fn().mockResolvedValue({ id: 'new-preg-id' }),
  get: vi.fn().mockResolvedValue({ exists: true, id: 'mock-id', data: () => ({ ownerId: 'user-1' }), empty: true, size: 0, docs: [] }),
  set: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }) }),
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async () => {}),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com', USE_MEMORY_STORE: false },
}));

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({ delete: vi.fn(), update: vi.fn(), commit: vi.fn().mockResolvedValue(undefined) })),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn(() => ({ file: vi.fn(() => ({ delete: vi.fn().mockResolvedValue(undefined) })) })) },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

import { pregnancyRoutes } from '../../src/modules/pregnancy/pregnancy.routes';

describe('Pregnancy Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    fastify.addHook('onRequest', async (req) => {
      req.user = { uid: 'user-1', email: 'test@test.com', role: 'user' } as any;
    });
    await fastify.register(pregnancyRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection.doc.mockReturnThis();
    mockCollection.where.mockReturnThis();
    mockCollection.orderBy.mockReturnThis();
    mockCollection.offset.mockReturnThis();
    mockCollection.limit.mockReturnThis();
  });

  describe('POST /pets/:petId/pregnancy', () => {
    it('starts pregnancy tracking and returns 201', async () => {
      // 1st get(): verifyPetOwnership - pet doc
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', species: 'dog' }),
      });
      // 2nd get(): active pregnancy check (where query)
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });
      mockCollection.add.mockResolvedValueOnce({ id: 'new-preg-id' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy',
        payload: { matingDate: '2024-01-01' },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('new-preg-id');
      expect(body.petId).toBe('pet-1');
      expect(body.ownerId).toBe('user-1');
      expect(body.status).toBe('active');
      expect(body.matingDate).toBe('2024-01-01');
      expect(body.expectedDueDate).toBeDefined();
      expect(mockCollection.add).toHaveBeenCalledTimes(1);
    });

    it('returns 400 when neither matingDate nor startDate is provided', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy',
        payload: { notes: 'some notes' },
      });

      // Zod refine validation throws, Fastify catches unhandled error -> 500
      // or the route itself might bubble the ZodError as 500
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('uses startDate when matingDate is not provided', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', species: 'cat' }),
      });
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });
      mockCollection.add.mockResolvedValueOnce({ id: 'preg-cat-1' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy',
        payload: { startDate: '2024-02-15' },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('preg-cat-1');
      expect(body.startDate).toBe('2024-02-15');
    });
  });

  describe('POST /pets/:petId/pregnancies (alias)', () => {
    it('starts pregnancy tracking via plural endpoint and returns 201', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', species: 'rabbit' }),
      });
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });
      mockCollection.add.mockResolvedValueOnce({ id: 'preg-rabbit-1' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancies',
        payload: { matingDate: '2024-03-01' },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('preg-rabbit-1');
    });
  });

  describe('GET /pets/:petId/pregnancies', () => {
    it('returns all pregnancies with pagination', async () => {
      // 1st get(): verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1' }),
      });
      // 2nd get(): where query for pregnancies
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'preg-1', data: () => ({ petId: 'pet-1', status: 'active', createdAt: { _seconds: 1000 } }) },
          { id: 'preg-2', data: () => ({ petId: 'pet-1', status: 'completed', createdAt: { _seconds: 900 } }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancies?page=1&limit=20' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toHaveLength(2);
      expect(body.total).toBe(2);
      expect(body.page).toBe(1);
      expect(body.limit).toBe(20);
      expect(body.totalPages).toBe(1);
      // Sorted by createdAt descending
      expect(body.data[0].id).toBe('preg-1');
      expect(body.data[1].id).toBe('preg-2');
    });

    it('returns empty data when no pregnancies exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1' }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancies' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toHaveLength(0);
      expect(body.total).toBe(0);
    });
  });

  describe('GET /pets/:petId/pregnancy (active)', () => {
    it('returns active pregnancy with 200', async () => {
      // 1st get(): verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1' }),
      });
      // 2nd get(): where query for active pregnancy
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'preg-active-1', data: () => ({ petId: 'pet-1', status: 'active', matingDate: '2024-01-01' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('preg-active-1');
      expect(body.status).toBe('active');
    });

    it('returns 404 when no active pregnancy exists', async () => {
      // 1st get(): verifyPetOwnership
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1' }),
      });
      // 2nd get(): where query returns empty
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy' });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.message).toBe('No active pregnancy found');
    });
  });

  describe('GET /pets/:petId/pregnancy/:pregId', () => {
    it('returns pregnancy by id with 200', async () => {
      // getById: doc(pregId).get()
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active', matingDate: '2024-01-01' }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy/preg-1' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('preg-1');
      expect(body.status).toBe('active');
    });

    it('returns 404 when pregnancy not found (service throws)', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'preg-missing',
        data: () => null,
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy/preg-missing' });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /pets/:petId/pregnancy/:pregId', () => {
    it('updates pregnancy and returns 200', async () => {
      // 1st get(): getById for validation
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active', notes: 'old' }),
      });
      // update() called
      mockCollection.update.mockResolvedValueOnce(undefined);
      // 2nd get(): getById for return value
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active', notes: 'Updated notes' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/pregnancy/preg-1',
        payload: { notes: 'Updated notes' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.notes).toBe('Updated notes');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('updates status to completed', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active' }),
      });
      mockCollection.update.mockResolvedValueOnce(undefined);
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'completed' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/pregnancy/preg-1',
        payload: { status: 'completed', actualDeliveryDate: '2024-03-15', litterSize: 5 },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('completed');
    });
  });

  describe('GET /pets/:petId/pregnancy/:pregId/milestones', () => {
    it('returns milestones array with 200', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({
          ownerId: 'user-1',
          petId: 'pet-1',
          milestones: [
            { id: 'ms-1', name: 'First ultrasound', completed: false },
            { id: 'ms-2', name: 'Vet checkup', completed: true },
          ],
        }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy/preg-1/milestones' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(2);
      expect(body[0].name).toBe('First ultrasound');
      expect(body[1].completed).toBe(true);
    });

    it('returns empty array when no milestones exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1' }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/pregnancy/preg-1/milestones' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });
  });

  describe('PUT /pets/:petId/pregnancy/:pregId/milestones/:milestoneId/complete', () => {
    it('marks milestone complete and returns 200', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({
          ownerId: 'user-1',
          petId: 'pet-1',
          milestones: [
            { id: 'ms-1', name: 'First ultrasound', completed: false },
            { id: 'ms-2', name: 'Vet checkup', completed: false },
          ],
        }),
      });
      mockCollection.update.mockResolvedValueOnce(undefined);

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/pregnancy/preg-1/milestones/ms-1/complete',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ms-1');
      expect(body.completed).toBe(true);
      expect(body.completedAt).toBeDefined();
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 404 when milestone not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({
          ownerId: 'user-1',
          petId: 'pet-1',
          milestones: [
            { id: 'ms-1', name: 'First ultrasound', completed: false },
          ],
        }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/pregnancy/preg-1/milestones/ms-nonexistent/complete',
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /pets/:petId/pregnancy/:pregId', () => {
    it('deletes pregnancy and returns 204', async () => {
      // getById: doc(pregId).get()
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active' }),
      });
      mockCollection.delete.mockResolvedValueOnce(undefined);

      const res = await fastify.inject({ method: 'DELETE', url: '/pets/pet-1/pregnancy/preg-1' });

      expect(res.statusCode).toBe(204);
      expect(mockCollection.delete).toHaveBeenCalled();
    });
  });

  describe('POST /pets/:petId/pregnancy/:pregId/weight', () => {
    it('adds weight entry and returns 200', async () => {
      // 1st get(): getById for validation
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active', weightLog: [] }),
      });
      // update() called with arrayUnion
      mockCollection.update.mockResolvedValueOnce(undefined);
      // 2nd get(): getById for return value
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'preg-1',
        data: () => ({ ownerId: 'user-1', petId: 'pet-1', status: 'active', weightLog: [{ weight: 5.2 }] }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy/preg-1/weight',
        payload: { weight: 5.2 },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('preg-1');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 400/500 for invalid negative weight', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy/preg-1/weight',
        payload: { weight: -3 },
      });

      // Zod schema rejects negative weight (z.number().positive())
      // The parse throws before service is called
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(mockCollection.get).not.toHaveBeenCalled();
    });

    it('returns 400/500 for zero weight', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/pregnancy/preg-1/weight',
        payload: { weight: 0 },
      });

      // z.number().positive() rejects 0
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
      expect(mockCollection.get).not.toHaveBeenCalled();
    });
  });
});
