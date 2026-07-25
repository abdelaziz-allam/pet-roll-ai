import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async () => {}),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com', USE_MEMORY_STORE: false },
}));

const mockCollection = {
  doc: vi.fn().mockReturnThis(),
  add: vi.fn().mockResolvedValue({ id: 'new-ver-id' }),
  get: vi.fn().mockResolvedValue({ exists: true, id: 'mock-id', data: () => ({ userId: 'user-1', status: 'pending' }), empty: false, size: 1, docs: [{ id: 'ver-1', data: () => ({ userId: 'user-1', status: 'pending', kennelName: 'Test Kennel', documents: [] }), ref: { id: 'ver-1' } }] }),
  set: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }) }),
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({ delete: vi.fn(), update: vi.fn(), commit: vi.fn().mockResolvedValue(undefined) })),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn(() => ({ file: vi.fn(() => ({ delete: vi.fn().mockResolvedValue(undefined), createWriteStream: vi.fn() })) })) },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

import { verificationRoutes } from '../../src/modules/verification/verification.routes';

describe('Verification Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    fastify.addHook('onRequest', async (req) => {
      req.user = { uid: 'user-1', email: 'test@test.com', role: 'user' } as any;
    });
    await fastify.register(verificationRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection.doc.mockReturnThis();
    mockCollection.where.mockReturnThis();
    mockCollection.orderBy.mockReturnThis();
    mockCollection.limit.mockReturnThis();
    mockCollection.offset.mockReturnThis();
  });

  describe('POST /submit', () => {
    it('creates a new verification request when no pending exists', async () => {
      // First get(): pending check - no pending found
      mockCollection.get.mockResolvedValueOnce({ empty: true, size: 0, docs: [] });
      // Second get(): submission count
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 2,
        docs: [
          { id: 'old-1', data: () => ({ status: 'rejected' }) },
          { id: 'old-2', data: () => ({ status: 'approved' }) },
        ],
      });
      // add() returns new doc ref
      mockCollection.add.mockResolvedValueOnce({ id: 'new-ver-id' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/submit',
        payload: {
          kennelName: 'Golden Kennel',
          breedExperience: '5 years breeding Golden Retrievers',
          documents: [
            { url: 'https://storage.example.com/doc1.pdf', path: 'ver/doc1.pdf', name: 'license.pdf', type: 'application/pdf' },
          ],
        },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('new-ver-id');
      expect(body.status).toBe('pending');
      expect(body.kennelName).toBe('Golden Kennel');
      expect(body.submissionNumber).toBe(3); // size 2 + 1
      expect(body.documents).toHaveLength(1);
      expect(body.documents[0].url).toBe('https://storage.example.com/doc1.pdf');
      expect(mockCollection.add).toHaveBeenCalledTimes(1);
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/submit',
        payload: { breedExperience: '5 years', documents: [{ url: 'x', path: 'y', name: 'z', type: 'pdf' }] },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Bad Request');
      expect(body.message).toContain('kennelName');
    });

    it('returns 400 when documents array is empty', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/submit',
        payload: { kennelName: 'Test Kennel', breedExperience: '3 years', documents: [] },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Bad Request');
    });

    it('returns 400 when more than 10 documents are provided', async () => {
      const docs = Array.from({ length: 11 }, (_, i) => ({
        url: `https://storage.example.com/doc${i}.pdf`,
        path: `ver/doc${i}.pdf`,
        name: `doc${i}.pdf`,
        type: 'application/pdf',
      }));

      const res = await fastify.inject({
        method: 'POST',
        url: '/submit',
        payload: { kennelName: 'Golden Kennel', breedExperience: '5 years', documents: docs },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.message).toContain('Maximum 10 documents');
    });
  });

  describe('GET /status', () => {
    it('returns the latest submission when one exists', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{
          id: 'ver-99',
          data: () => ({
            userId: 'user-1',
            status: 'pending',
            kennelName: 'Happy Paws',
            breedExperience: '10 years',
            documents: [{ url: 'https://example.com/doc.pdf', name: 'doc.pdf' }],
            createdAt: '2025-06-01T00:00:00.000Z',
          }),
        }],
      });

      const res = await fastify.inject({ method: 'GET', url: '/status' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-99');
      expect(body.status).toBe('pending');
      expect(body.kennelName).toBe('Happy Paws');
    });

    it('returns status none when no submission exists', async () => {
      mockCollection.get.mockResolvedValueOnce({ empty: true, docs: [] });

      const res = await fastify.inject({ method: 'GET', url: '/status' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('none');
      expect(body.message).toBe('No verification request found');
    });
  });

  describe('GET /history', () => {
    it('returns all historical submissions', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'ver-3', data: () => ({ status: 'pending', kennelName: 'Kennel C', createdAt: '2025-06-03' }) },
          { id: 'ver-2', data: () => ({ status: 'rejected', kennelName: 'Kennel B', createdAt: '2025-05-01' }) },
          { id: 'ver-1', data: () => ({ status: 'approved', kennelName: 'Kennel A', createdAt: '2025-01-01' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/history' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toHaveLength(3);
      expect(body[0].id).toBe('ver-3');
      expect(body[1].status).toBe('rejected');
      expect(body[2].status).toBe('approved');
    });
  });

  describe('GET /documents', () => {
    it('returns documents array when a submission exists', async () => {
      const docs = [
        { url: 'https://storage.example.com/doc1.pdf', name: 'license.pdf', type: 'application/pdf' },
        { url: 'https://storage.example.com/doc2.png', name: 'photo.png', type: 'image/png' },
      ];

      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{
          id: 'ver-5',
          data: () => ({
            userId: 'user-1',
            status: 'pending',
            documents: docs,
          }),
        }],
      });

      const res = await fastify.inject({ method: 'GET', url: '/documents' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toHaveLength(2);
      expect(body[0].name).toBe('license.pdf');
      expect(body[1].name).toBe('photo.png');
    });

    it('returns empty array when no submission exists', async () => {
      mockCollection.get.mockResolvedValueOnce({ empty: true, docs: [] });

      const res = await fastify.inject({ method: 'GET', url: '/documents' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });
  });

  describe('GET /certificate', () => {
    it('returns formatted certificate when an approved verification exists', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{
          id: 'ver-abc12345-rest',
          data: () => ({
            userId: 'user-1',
            userName: 'John Breeder',
            userEmail: 'john@example.com',
            kennelName: 'Royal Paws',
            breedExperience: '15 years',
            status: 'approved',
            submissionNumber: 1,
            processedAt: '2025-03-15T10:00:00.000Z',
            expiryDate: '2026-03-15',
          }),
        }],
      });

      const res = await fastify.inject({ method: 'GET', url: '/certificate' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-abc12345-rest');
      expect(body.userId).toBe('user-1');
      expect(body.userName).toBe('John Breeder');
      expect(body.kennelName).toBe('Royal Paws');
      expect(body.status).toBe('approved');
      expect(body.approvedAt).toBe('2025-03-15T10:00:00.000Z');
      expect(body.expiryDate).toBe('2026-03-15');
      expect(body.certificateNumber).toBe('PF-BV-VER-ABC1');
    });

    it('returns 404 when no approved verification exists', async () => {
      mockCollection.get.mockResolvedValueOnce({ empty: true, docs: [] });

      const res = await fastify.inject({ method: 'GET', url: '/certificate' });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('No approved verification found');
    });
  });

  describe('GET /last-rejected', () => {
    it('returns the last rejected submission', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{
          id: 'ver-rejected-1',
          data: () => ({
            userId: 'user-1',
            status: 'rejected',
            kennelName: 'Failed Kennel',
            rejectionReason: 'Documents are expired',
            createdAt: '2025-04-01T00:00:00.000Z',
          }),
        }],
      });

      const res = await fastify.inject({ method: 'GET', url: '/last-rejected' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-rejected-1');
      expect(body.status).toBe('rejected');
      expect(body.rejectionReason).toBe('Documents are expired');
    });

    it('returns null when no rejected submission exists', async () => {
      mockCollection.get.mockResolvedValueOnce({ empty: true, docs: [] });

      const res = await fastify.inject({ method: 'GET', url: '/last-rejected' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toBeNull();
    });
  });

  describe('PUT /:id/status', () => {
    it('approves a verification request and updates user', async () => {
      // First get(): doc lookup for the request
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'pending', kennelName: 'Test Kennel' }),
      });
      // update() resolves (verification_requests update)
      mockCollection.update.mockResolvedValueOnce(undefined);
      // update() resolves (users collection update for isVerifiedBreeder)
      mockCollection.update.mockResolvedValueOnce(undefined);
      // Final get(): return updated doc
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'approved', kennelName: 'Test Kennel', processedAt: '2025-06-01T00:00:00.000Z', processedBy: 'system' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/ver-1/status',
        payload: { status: 'approved', expiryDate: '2026-06-01' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-1');
      expect(body.status).toBe('approved');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('rejects a verification request with a reason', async () => {
      // First get(): doc lookup
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'ver-2',
        data: () => ({ userId: 'user-1', status: 'pending', kennelName: 'Bad Kennel' }),
      });
      // update() resolves
      mockCollection.update.mockResolvedValueOnce(undefined);
      // Final get(): return updated doc
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'ver-2',
        data: () => ({ userId: 'user-1', status: 'rejected', kennelName: 'Bad Kennel', rejectionReason: 'Documents unclear', processedAt: '2025-06-02T00:00:00.000Z', processedBy: 'system' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/ver-2/status',
        payload: { status: 'rejected', rejectionReason: 'Documents unclear' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-2');
      expect(body.status).toBe('rejected');
      expect(body.rejectionReason).toBe('Documents unclear');
    });
  });
});
