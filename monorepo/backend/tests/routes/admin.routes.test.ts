import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

// Firebase mock - must be hoisted so vi.mock factories can reference it
const mockCollection = vi.hoisted(() => ({
  doc: vi.fn().mockReturnThis(),
  add: vi.fn().mockResolvedValue({ id: 'new-doc-id' }),
  get: vi.fn().mockResolvedValue({
    exists: true,
    id: 'mock-id',
    data: () => ({}),
    empty: false,
    size: 1,
    docs: [{ id: 'mock-id', data: () => ({}), ref: { id: 'mock-id' } }],
  }),
  set: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnValue({
    get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
  }),
}));

// Mock middleware
vi.mock('../../src/middleware/require-admin-auth', () => ({
  requireAdminAuth: vi.fn().mockImplementation(async (req: any) => {
    req.adminUser = { uid: 'admin-1', email: 'admin@test.com', role: 'super_admin', permissions: {} };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

vi.mock('../../src/services/email.service', () => ({
  emailService: {
    sendVerificationApproved: vi.fn(),
    sendVerificationRejected: vi.fn(),
    sendEmail: vi.fn(),
    sendMatchWeddingCard: vi.fn().mockResolvedValue(undefined),
    buildWeddingCardTemplate: vi.fn().mockReturnValue('<html><body>Wedding Card</body></html>'),
  },
}));

vi.mock('../../src/data/countries', () => ({
  countries: [
    { name: 'Egypt', code: 'EG', cities: ['Cairo', 'Alexandria'] },
    { name: 'United States', code: 'US', cities: ['New York', 'Los Angeles'] },
  ],
}));

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({
      delete: vi.fn(),
      update: vi.fn(),
      set: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    })),
  },
  auth: { verifyIdToken: vi.fn().mockResolvedValue({ uid: 'test-uid', email: 'test@example.com' }) },
  storage: {
    bucket: vi.fn(() => ({
      file: vi.fn(() => ({
        delete: vi.fn().mockResolvedValue(undefined),
        getSignedUrl: vi.fn().mockResolvedValue(['https://signed-url.example.com']),
      })),
      deleteFiles: vi.fn().mockResolvedValue(undefined),
    })),
  },
  messaging: { send: vi.fn().mockResolvedValue('message-id') },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

import { adminRoutes } from '../../src/modules/admin/admin.routes';

describe('Admin Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(adminRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the default mock behavior
    mockCollection.get.mockResolvedValue({
      exists: true,
      id: 'mock-id',
      data: () => ({}),
      empty: false,
      size: 1,
      docs: [{ id: 'mock-id', data: () => ({}), ref: { id: 'mock-id' } }],
    });
    mockCollection.add.mockResolvedValue({ id: 'new-doc-id' });
    mockCollection.doc.mockReturnThis();
    mockCollection.where.mockReturnThis();
    mockCollection.orderBy.mockReturnThis();
    mockCollection.offset.mockReturnThis();
    mockCollection.limit.mockReturnThis();
    mockCollection.update.mockResolvedValue(undefined);
    mockCollection.delete.mockResolvedValue(undefined);
    mockCollection.set.mockResolvedValue(undefined);
    mockCollection.count.mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
    });
  });

  // --- Stats ---

  describe('GET /stats', () => {
    it('returns stats with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/stats' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual({ totalUsers: 5, totalPets: 5, activeListings: 5 });
    });
  });

  describe('GET /stats/growth', () => {
    it('returns growth stats for default period (month)', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/stats/growth' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.newUsers).toBe(1);
      expect(body.period).toBe('month');
    });

    it('accepts period query parameter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/stats/growth?period=week' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.period).toBe('week');
    });
  });

  // --- Users ---

  describe('GET /users', () => {
    it('returns paginated users list with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
      expect(body.total).toBe(5);
      expect(body.page).toBe(1);
      expect(body.limit).toBe(20);
      expect(body.totalPages).toBe(1);
    });

    it('supports page and limit query params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users?page=2&limit=10' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.page).toBe(2);
      expect(body.limit).toBe(10);
    });

    it('supports status filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users?status=active' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'active');
    });
  });

  describe('GET /users/:id', () => {
    it('returns user by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users/user-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('mock-id');
    });

    it('returns 404 when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'user-1',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'GET', url: '/users/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /users', () => {
    it('creates a user and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: { displayName: 'New User', email: 'new@example.com' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('new-doc-id');
      expect(body.displayName).toBe('New User');
      expect(body.email).toBe('new@example.com');
      expect(body.role).toBe('user');
      expect(body.status).toBe('active');
    });

    it('creates a user with custom role', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: { displayName: 'Admin User', email: 'admin2@example.com', role: 'admin' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.role).toBe('admin');
    });
  });

  describe('PUT /users/:id', () => {
    it('updates a user and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/users/user-1',
        payload: { displayName: 'Updated Name' },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  describe('PUT /users/:id/role', () => {
    it('updates user role and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/users/user-1/role',
        payload: { role: 'admin' },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  describe('PUT /users/:id/ban', () => {
    it('bans a user and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/users/user-1/ban',
        payload: { reason: 'Spam' },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('bans a user without reason', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/users/user-1/ban',
        payload: {},
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /users/:id/unban', () => {
    it('unbans a user and returns 200', async () => {
      const res = await fastify.inject({ method: 'PUT', url: '/users/user-1/unban' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes a user and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/users/user-1' });
      expect(res.statusCode).toBe(204);
      expect(mockCollection.delete).toHaveBeenCalled();
    });
  });

  // --- Pet Management ---

  describe('GET /pets', () => {
    it('returns paginated pets list with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
      expect(body.total).toBe(5);
      expect(body.page).toBe(1);
    });

    it('supports species filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets?species=dog' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'dog');
    });

    it('supports status filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets?status=banned' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'banned');
    });

    it('supports country and city filters', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets?country=Egypt&city=Cairo' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('location.country', '==', 'Egypt');
      expect(mockCollection.where).toHaveBeenCalledWith('location.city', '==', 'Cairo');
    });
  });

  describe('GET /pets/:id', () => {
    it('returns pet by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('mock-id');
      expect(body.ownerName).toBe('Unknown');
    });

    it('returns 404 when pet not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'pet-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'GET', url: '/pets/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /pets/:id/ban', () => {
    it('bans a pet and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/pets/pet-1/ban',
        payload: { reason: 'Inappropriate content' },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  describe('PUT /pets/:id/unban', () => {
    it('unbans a pet and returns 200', async () => {
      const res = await fastify.inject({ method: 'PUT', url: '/pets/pet-1/unban' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  // --- Pet Categories ---

  describe('GET /categories', () => {
    it('returns categories with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/categories' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe('POST /categories', () => {
    it('creates a category and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/categories',
        payload: { name: 'Bird', label: 'Bird', icon: 'bird-icon', description: 'Pet birds' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('new-doc-id');
      expect(body.name).toBe('bird');
      expect(body.isActive).toBe(true);
    });
  });

  describe('PUT /categories/:id', () => {
    it('updates a category and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/categories/cat-1',
        payload: { label: 'Updated Label' },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 404 when category not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'cat-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/categories/nonexistent',
        payload: { label: 'Something' },
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /categories/:id', () => {
    it('deletes a category and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/categories/cat-1' });
      expect(res.statusCode).toBe(204);
    });

    it('returns 404 when category not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'cat-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'DELETE', url: '/categories/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /categories/seed', () => {
    it('returns already-exist message when categories exist (non-empty)', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/categories/seed' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.seeded).toBe(false);
      expect(body.message).toContain('already exist');
    });

    it('seeds default categories when collection is empty', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'POST', url: '/categories/seed' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.seeded).toBe(true);
      expect(body.count).toBe(9);
      expect(mockCollection.add).toHaveBeenCalled();
    });
  });

  // --- Verifications ---

  describe('GET /verifications', () => {
    it('returns verifications with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/verifications' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('supports status filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/verifications?status=pending' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'pending');
    });
  });

  describe('GET /verifications/user/:userId', () => {
    it('returns verification history with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/verifications/user/user-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe('GET /verifications/:id', () => {
    it('returns verification by id with 200', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', userName: 'Test User', userEmail: 'test@test.com', status: 'pending' }),
        empty: false,
        size: 1,
        docs: [{ id: 'ver-1', data: () => ({ userId: 'user-1', status: 'pending' }), ref: { id: 'ver-1' } }],
      });
      const res = await fastify.inject({ method: 'GET', url: '/verifications/ver-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('ver-1');
      expect(body.history).toBeDefined();
    });
  });

  describe('PUT /verifications/:id', () => {
    it('processes verification (approve) and returns 200', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
        empty: false,
        size: 1,
        docs: [{ id: 'ver-1', data: () => ({}), ref: { id: 'ver-1' } }],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1',
        payload: { approved: true },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('approved');
    });

    it('processes verification (reject) with reason', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
        empty: false,
        size: 1,
        docs: [{ id: 'ver-1', data: () => ({}), ref: { id: 'ver-1' } }],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1',
        payload: { approved: false, rejectionReason: 'Documents expired' },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('rejected');
      expect(body.rejectionReason).toBe('Documents expired');
    });
  });

  describe('PUT /verifications/:id/revoke', () => {
    it('returns 400 when reason is empty', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1/revoke',
        payload: { reason: '' },
      });
      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toContain('Reason is required');
    });

    it('returns 400 when reason is whitespace only', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1/revoke',
        payload: { reason: '   ' },
      });
      expect(res.statusCode).toBe(400);
    });

    it('revokes verification and returns 200 when valid', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'approved' }),
        empty: false,
        size: 1,
        docs: [{ id: 'ver-1', data: () => ({ status: 'approved', userId: 'user-1' }), ref: { id: 'ver-1' } }],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1/revoke',
        payload: { reason: 'Expired documents' },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.status).toBe('revoked');
      expect(body.revokeReason).toBe('Expired documents');
    });

    it('returns 400 when verification is not in approved state', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'ver-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
        empty: false,
        size: 1,
        docs: [],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/verifications/ver-1/revoke',
        payload: { reason: 'Some reason' },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  // --- Mating Management ---

  describe('GET /mating/listings', () => {
    it('returns mating listings with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/listings' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('supports status and species filters', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/listings?status=active&species=dog' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'active');
      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'dog');
    });
  });

  describe('GET /mating/stats', () => {
    it('returns mating stats with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/stats' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.totalListings).toBeDefined();
      expect(body.totalRequests).toBeDefined();
      expect(body.activeListings).toBeDefined();
    });
  });

  describe('GET /mating/breeders', () => {
    it('returns breeder rankings with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/breeders' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.rankings).toBeDefined();
      expect(body.filters).toBeDefined();
    });

    it('supports country, city, and species filters', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/breeders?country=Egypt&species=dog' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /mating/breeders/:id', () => {
    it('returns breeder detail with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/breeders/user-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.stats).toBeDefined();
      expect(body.listings).toBeDefined();
      expect(body.requests).toBeDefined();
    });

    it('returns 404 when breeder not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'user-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'GET', url: '/mating/breeders/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /mating/matches', () => {
    it('returns mating matches with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/matches' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('supports status filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/mating/matches?status=accepted' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'accepted');
    });
  });

  describe('POST /mating/matches/:id/wedding-card', () => {
    it('sends wedding card and returns 200 for accepted match', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'match-1',
        data: () => ({ status: 'accepted', senderId: 'user-1', receiverId: 'user-2', listingId: 'listing-1', petId: 'pet-1' }),
        empty: false,
        size: 1,
        docs: [{ id: 'match-1', data: () => ({}), ref: { id: 'match-1' } }],
      });
      const res = await fastify.inject({ method: 'POST', url: '/mating/matches/match-1/wedding-card' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.message).toContain('Wedding card sent');
    });

    it('returns 400 when match is not accepted', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'match-1',
        data: () => ({ status: 'pending', senderId: 'user-1', receiverId: 'user-2', listingId: 'listing-1' }),
        empty: false,
        size: 1,
        docs: [],
      });
      const res = await fastify.inject({ method: 'POST', url: '/mating/matches/match-1/wedding-card' });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /mating/matches/:id/wedding-card-preview', () => {
    it('returns wedding card preview HTML with 200', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'match-1',
        data: () => ({ senderId: 'user-1', receiverId: 'user-2', listingId: 'listing-1', petId: 'pet-1', respondedAt: '2024-01-01' }),
        empty: false,
        size: 1,
        docs: [{ id: 'match-1', data: () => ({}), ref: { id: 'match-1' } }],
      });
      const res = await fastify.inject({ method: 'GET', url: '/mating/matches/match-1/wedding-card-preview' });
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toContain('text/html');
      expect(res.payload).toContain('Wedding Card');
    });
  });

  describe('DELETE /mating/listings/:id', () => {
    it('deletes a mating listing and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/mating/listings/l-1' });
      expect(res.statusCode).toBe(204);
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('returns 404 when listing not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'l-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'DELETE', url: '/mating/listings/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  // --- App Settings ---

  describe('GET /settings', () => {
    it('returns settings with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/settings' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.general).toBeDefined();
      expect(body.notifications).toBeDefined();
      expect(body.security).toBeDefined();
    });

    it('returns default settings when doc data is empty', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/settings' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.general.appName).toBe('PET Roll');
      expect(body.notifications.vaccinationReminders).toBe(true);
      expect(body.security.rateLimitPerMinute).toBe(100);
    });
  });

  describe('PUT /settings/:section', () => {
    it('updates general settings and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/settings/general',
        payload: { appName: 'PetFolio Updated', maintenanceMode: true },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('updates notifications settings and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/settings/notifications',
        payload: { vaccinationReminders: false },
      });
      expect(res.statusCode).toBe(200);
    });

    it('updates security settings and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/settings/security',
        payload: { rateLimitPerMinute: 200 },
      });
      expect(res.statusCode).toBe(200);
    });

    it('returns 400 for invalid section', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/settings/invalid_section',
        payload: { key: 'value' },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  // --- Health Certifications ---

  describe('GET /health-certifications', () => {
    it('returns all certifications with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('returns certifications for specific pet when petId provided', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ petId: 'pet-1', status: 'approved' }),
        empty: false,
        size: 1,
        docs: [{ id: 'cert-1', data: () => ({ petId: 'pet-1', status: 'approved' }), ref: { id: 'cert-1' } }],
      });
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications?petId=pet-1' });
      expect(res.statusCode).toBe(200);
    });

    it('returns empty array when pet has no certification', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications?petId=pet-no-cert' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });

    it('supports status and species filters', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications?status=pending&species=dog' });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'pending');
      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'dog');
    });
  });

  describe('GET /health-certifications/filters', () => {
    it('returns certification filters with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications/filters' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.species).toBeDefined();
      expect(body.countries).toBeDefined();
      expect(body.cities).toBeDefined();
    });
  });

  describe('GET /health-certifications/:id', () => {
    it('returns certification by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications/cert-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('mock-id');
    });

    it('returns 404 when certification not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'cert-x',
        data: () => null,
        empty: true,
        size: 0,
        docs: [],
      });
      const res = await fastify.inject({ method: 'GET', url: '/health-certifications/nonexistent' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /health-certifications/:id', () => {
    it('approves a certification and returns 200', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ status: 'pending', petId: 'pet-1', ownerId: 'user-1' }),
        empty: false,
        size: 1,
        docs: [{ id: 'cert-1', data: () => ({ status: 'pending', petId: 'pet-1' }), ref: { id: 'cert-1' } }],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/health-certifications/cert-1',
        payload: { approved: true },
      });
      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('rejects a certification with reason', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ status: 'pending', petId: 'pet-1', ownerId: 'user-1' }),
        empty: false,
        size: 1,
        docs: [{ id: 'cert-1', data: () => ({ status: 'pending', petId: 'pet-1' }), ref: { id: 'cert-1' } }],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/health-certifications/cert-1',
        payload: { approved: false, rejectionReason: 'Incomplete documents' },
      });
      expect(res.statusCode).toBe(200);
    });

    it('returns 400 when certification already processed', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'cert-1',
        data: () => ({ status: 'approved', petId: 'pet-1' }),
        empty: false,
        size: 1,
        docs: [],
      });
      const res = await fastify.inject({
        method: 'PUT',
        url: '/health-certifications/cert-1',
        payload: { approved: true },
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /pets/:petId/revoke-health-certification', () => {
    it('revokes health certification and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/pets/pet-1/revoke-health-certification',
        payload: { reason: 'Expired' },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.message).toContain('revoked');
    });
  });

  // --- Vaccination Analytics ---

  describe('GET /vaccination-analytics', () => {
    it('returns vaccination analytics with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/vaccination-analytics' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.topVaccines).toBeDefined();
      expect(body.summary).toBeDefined();
      expect(body.filters).toBeDefined();
    });

    it('supports period filter', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/vaccination-analytics?period=30d' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.summary.period).toBe('30d');
    });

    it('supports species and country filters', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/vaccination-analytics?species=dog&country=Egypt' });
      expect(res.statusCode).toBe(200);
    });
  });

  // --- Locations ---

  describe('GET /locations/countries', () => {
    it('returns countries with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/locations/countries' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  describe('GET /locations/cities', () => {
    it('returns empty array when no country specified', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/locations/cities' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });

    it('queries for cities when country specified', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'loc-1',
        data: () => ({ name: 'Egypt', code: 'EG', cities: ['Cairo', 'Alexandria'] }),
        empty: false,
        size: 1,
        docs: [{ id: 'loc-1', data: () => ({ name: 'Egypt', code: 'EG', cities: ['Cairo', 'Alexandria'] }), ref: { id: 'loc-1' } }],
      });
      const res = await fastify.inject({ method: 'GET', url: '/locations/cities?country=Egypt' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /locations/seed', () => {
    it('seeds locations and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/locations/seed' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.message).toContain('Seeded');
      expect(body.count).toBe(2);
      expect(mockCollection.set).toHaveBeenCalled();
    });
  });

  // --- Seed Data (dev-only endpoints) ---

  describe('POST /seed-mating', () => {
    it('returns 403 when NODE_ENV is not development', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/seed-mating' });
      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toContain('Only available in development');
    });
  });

  describe('POST /seed-data', () => {
    it('returns 403 when NODE_ENV is not development', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/seed-data' });
      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toContain('Only available in development');
    });
  });

  describe('POST /seed-verifications', () => {
    it('returns 403 when NODE_ENV is not development', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/seed-verifications' });
      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toContain('Only available in development');
    });
  });

  describe('POST /seed-all-extra', () => {
    it('returns 403 when NODE_ENV is not development', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/seed-all-extra' });
      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toContain('Only available in development');
    });
  });
});
