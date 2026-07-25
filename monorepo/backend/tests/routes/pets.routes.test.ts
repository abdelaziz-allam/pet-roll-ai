import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockCollection = vi.hoisted(() => ({
  doc: vi.fn().mockReturnThis(),
  add: vi.fn().mockResolvedValue({ id: 'new-pet-id' }),
  get: vi.fn().mockResolvedValue({
    exists: true,
    id: 'mock-id',
    data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', photos: [] }),
    empty: false,
    size: 1,
    docs: [{ id: 'pet-1', data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', photos: [] }), ref: { id: 'pet-1' } }],
  }),
  set: vi.fn().mockResolvedValue(undefined),
  update: vi.fn().mockResolvedValue(undefined),
  delete: vi.fn().mockResolvedValue(undefined),
  where: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }) }),
}));

const mockBatch = vi.hoisted(() => ({
  delete: vi.fn(),
  update: vi.fn(),
  commit: vi.fn().mockResolvedValue(undefined),
}));

const mockStorage = vi.hoisted(() => ({
  bucket: vi.fn(() => ({
    file: vi.fn(() => ({
      delete: vi.fn().mockResolvedValue(undefined),
      getSignedUrl: vi.fn().mockResolvedValue(['https://signed-url.example.com']),
    })),
    deleteFiles: vi.fn().mockResolvedValue(undefined),
  })),
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async () => {}),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com', USE_MEMORY_STORE: false },
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
    batch: vi.fn(() => mockBatch),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: mockStorage,
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

import { petsRoutes } from '../../src/modules/pets/pets.routes';
import { db } from '../../src/config/firebase';

describe('Pets Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    fastify.addHook('onRequest', async (req) => {
      req.user = { uid: 'user-1', email: 'test@test.com', role: 'user' } as any;
    });
    fastify.setErrorHandler((error: any, _request, reply) => {
      const statusCode = error.statusCode || (error.name === 'ZodError' ? 400 : 500);
      reply.code(statusCode).send({
        error: error.name || 'InternalServerError',
        message: error.message,
        statusCode,
      });
    });
    await fastify.register(petsRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset chain methods
    mockCollection.doc.mockReturnThis();
    mockCollection.where.mockReturnThis();
    mockCollection.orderBy.mockReturnThis();
    mockCollection.offset.mockReturnThis();
    mockCollection.limit.mockReturnThis();
    mockCollection.count.mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }) });
    // Default get() returns a valid pet document
    mockCollection.get.mockResolvedValue({
      exists: true,
      id: 'pet-1',
      data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', photos: [] }),
      empty: false,
      size: 1,
      docs: [{ id: 'pet-1', data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever', photos: [] }), ref: { id: 'pet-1' } }],
    });
    mockCollection.add.mockResolvedValue({ id: 'new-pet-id' });
    mockCollection.update.mockResolvedValue(undefined);
    mockCollection.delete.mockResolvedValue(undefined);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // POST / - Create Pet
  // ──────────────────────────────────────────────────────────────────────────

  describe('POST / - create pet', () => {
    const validPetPayload = {
      name: 'Buddy',
      species: 'dog',
      breed: 'Golden Retriever',
      gender: 'male',
      dateOfBirth: '2020-01-15',
      weight: 30,
      color: 'golden',
      isNeutered: true,
      isAvailableForMating: false,
    };

    it('creates a pet with valid data and returns 201', async () => {
      // First get() call: user doc lookup for location auto-fill
      // Second call: add() for creating the pet
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ country: 'Egypt', city: 'Cairo' }),
      });
      mockCollection.add.mockResolvedValue({ id: 'new-pet-id' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: validPetPayload,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('new-pet-id');
      expect(body.name).toBe('Buddy');
      expect(body.ownerId).toBe('user-1');
      expect(body.photos).toEqual([]);
      // Verify db.collection was called for users (location auto-fill)
      expect(db.collection).toHaveBeenCalledWith('users');
      // pets collection is accessed via petsRef (set at module init), so add() is the key assertion
      expect(mockCollection.add).toHaveBeenCalled();
    });

    it('auto-fills location from user profile when not provided', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ country: 'Egypt', city: 'Cairo' }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: validPetPayload,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.location).toEqual({ country: 'Egypt', city: 'Cairo' });
    });

    it('uses provided location instead of auto-fill', async () => {
      const payloadWithLocation = {
        ...validPetPayload,
        location: { country: 'United States', city: 'New York' },
      };

      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: payloadWithLocation,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.location).toEqual({ country: 'United States', city: 'New York' });
    });

    it('returns 400 when name is missing (validation error)', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: {
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          dateOfBirth: '2020-01-15',
        },
      });

      expect(res.statusCode).toBe(400);
    });

    it('returns 400 when species is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: {
          name: 'Buddy',
          breed: 'Golden Retriever',
          gender: 'male',
          dateOfBirth: '2020-01-15',
        },
      });

      expect(res.statusCode).toBe(400);
    });

    it('returns 400 when gender has invalid value', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: {
          name: 'Buddy',
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'unknown',
          dateOfBirth: '2020-01-15',
        },
      });

      expect(res.statusCode).toBe(400);
    });

    it('returns 400 when name exceeds 50 characters', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/',
        payload: {
          name: 'A'.repeat(51),
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          dateOfBirth: '2020-01-15',
        },
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET / - Get User Pets
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET / - get user pets', () => {
    it('returns paginated pets with 200', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        empty: false,
        size: 1,
        docs: [
          { id: 'pet-1', data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog' }) },
          { id: 'pet-2', data: () => ({ ownerId: 'user-1', name: 'Max', species: 'cat' }) },
        ],
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 2 }) }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
      expect(body.total).toBe(2);
      expect(body.page).toBe(1);
      expect(body.limit).toBe(20);
      expect(body.totalPages).toBe(1);
    });

    it('respects page and limit query params', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [{ id: 'pet-3', data: () => ({ ownerId: 'user-1', name: 'Rex', species: 'dog' }) }],
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 10 }) }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/?page=2&limit=5' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.page).toBe(2);
      expect(body.limit).toBe(5);
      expect(body.totalPages).toBe(2);
      // Verify offset was called correctly: (page-1)*limit = 5
      expect(mockCollection.offset).toHaveBeenCalledWith(5);
      expect(mockCollection.limit).toHaveBeenCalledWith(5);
    });

    it('filters by ownerId', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, size: 0, docs: [] });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/' });

      expect(res.statusCode).toBe(200);
      expect(mockCollection.where).toHaveBeenCalledWith('ownerId', '==', 'user-1');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /breeds
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /breeds', () => {
    it('returns all breeds with 200', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'breed-1', data: () => ({ name: 'Golden Retriever', species: 'dog' }) },
          { id: 'breed-2', data: () => ({ name: 'Persian', species: 'cat' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/breeds' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toHaveLength(2);
      expect(body[0]).toEqual({ id: 'breed-1', name: 'Golden Retriever', species: 'dog' });
    });

    it('filters by species query param', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'breed-1', data: () => ({ name: 'Golden Retriever', species: 'dog' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/breeds?species=dog' });

      expect(res.statusCode).toBe(200);
      expect(db.collection).toHaveBeenCalledWith('breeds');
      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'dog');
    });

    it('filters by search term (client-side filtering)', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'breed-1', data: () => ({ name: 'Golden Retriever', species: 'dog' }) },
          { id: 'breed-2', data: () => ({ name: 'Labrador', species: 'dog' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/breeds?search=golden' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toHaveLength(1);
      expect(body[0].name).toBe('Golden Retriever');
    });

    it('returns empty array when no breeds match search', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'breed-1', data: () => ({ name: 'Golden Retriever', species: 'dog' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/breeds?search=nonexistent' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toHaveLength(0);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /:petId - Get Pet by ID
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /:petId - get pet by id', () => {
    it('returns pet when it exists and belongs to user', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever' }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/pet-1' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('pet-1');
      expect(body.name).toBe('Buddy');
      expect(mockCollection.doc).toHaveBeenCalledWith('pet-1');
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({ method: 'GET', url: '/nonexistent-pet' });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 when pet belongs to another user', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-99',
        data: () => ({ ownerId: 'other-user', name: 'NotMyPet', species: 'cat' }),
      });

      const res = await fastify.inject({ method: 'GET', url: '/pet-99' });

      expect(res.statusCode).toBe(404);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // PUT /:petId - Update Pet
  // ──────────────────────────────────────────────────────────────────────────

  describe('PUT /:petId - update pet', () => {
    it('updates pet and returns 200', async () => {
      // First get: ownership check in getPetById
      // Then update()
      // Second get: return updated data in getPetById
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy Updated', species: 'dog', breed: 'Golden Retriever' }),
        });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pet-1',
        payload: { name: 'Buddy Updated' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.name).toBe('Buddy Updated');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('allows partial updates (only weight)', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', weight: 25 }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', weight: 32 }),
        });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pet-1',
        payload: { weight: 32 },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.weight).toBe(32);
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/nonexistent',
        payload: { name: 'Ghost' },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 when pet belongs to another user', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-99',
        data: () => ({ ownerId: 'other-user', name: 'NotMine', species: 'cat' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/pet-99',
        payload: { name: 'Stolen' },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DELETE /:petId - Delete Pet
  // ──────────────────────────────────────────────────────────────────────────

  describe('DELETE /:petId - delete pet', () => {
    it('deletes pet and returns 204', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', photos: [{ url: 'http://photo.jpg', path: 'pets/user-1/pet-1/photo.jpg' }] }),
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({ method: 'DELETE', url: '/pet-1' });

      expect(res.statusCode).toBe(204);
      expect(res.payload).toBe('');
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({ method: 'DELETE', url: '/nonexistent' });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 when pet belongs to another user', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-99',
        data: () => ({ ownerId: 'other-user', name: 'NotMine', species: 'cat', photos: [] }),
      });

      const res = await fastify.inject({ method: 'DELETE', url: '/pet-99' });

      expect(res.statusCode).toBe(404);
    });

    it('cleans up related collections via batch delete', async () => {
      const mockBatchDelete = vi.fn();
      const mockBatchCommit = vi.fn().mockResolvedValue(undefined);
      (db.batch as any).mockReturnValue({ delete: mockBatchDelete, commit: mockBatchCommit });

      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', photos: [] }),
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({ method: 'DELETE', url: '/pet-1' });

      expect(res.statusCode).toBe(204);
      expect(db.batch).toHaveBeenCalled();
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // POST /:petId/photos - Add Photo
  // ──────────────────────────────────────────────────────────────────────────

  describe('POST /:petId/photos - add photo', () => {
    it('adds a photo and returns 200 with updated pet', async () => {
      // First get: ownership check
      // update: add photo
      // Second get: return updated pet
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', photos: [] }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({
            ownerId: 'user-1',
            name: 'Buddy',
            species: 'dog',
            photos: [{ url: 'https://example.com/photo.jpg', path: 'pets/user-1/pet-1/photo.jpg' }],
          }),
        });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pet-1/photos',
        payload: { url: 'https://example.com/photo.jpg', path: 'pets/user-1/pet-1/photo.jpg' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.photos).toHaveLength(1);
      expect(body.photos[0].url).toBe('https://example.com/photo.jpg');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/nonexistent/photos',
        payload: { url: 'https://example.com/photo.jpg', path: 'pets/user-1/x/photo.jpg' },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 400 when max photos (50) reached', async () => {
      const fiftyPhotos = Array.from({ length: 50 }, (_, i) => ({
        url: `https://example.com/photo-${i}.jpg`,
        path: `pets/user-1/pet-1/photo-${i}.jpg`,
      }));

      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', photos: fiftyPhotos }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pet-1/photos',
        payload: { url: 'https://example.com/photo-51.jpg', path: 'pets/user-1/pet-1/photo-51.jpg' },
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // DELETE /:petId/photos/:photoId - Remove Photo
  // ──────────────────────────────────────────────────────────────────────────

  describe('DELETE /:petId/photos/:photoId - remove photo', () => {
    it('removes photo and returns 204', async () => {
      const photoPath = 'pets/user-1/pet-1/photo.jpg';
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({
          ownerId: 'user-1',
          name: 'Buddy',
          species: 'dog',
          photos: [{ url: 'https://example.com/photo.jpg', path: photoPath }],
        }),
      });

      const res = await fastify.inject({
        method: 'DELETE',
        url: `/pet-1/photos/${encodeURIComponent(photoPath)}`,
      });

      expect(res.statusCode).toBe(204);
      expect(res.payload).toBe('');
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({
        method: 'DELETE',
        url: '/nonexistent/photos/some-path',
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 when photo path not found in pet photos', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({
          ownerId: 'user-1',
          name: 'Buddy',
          species: 'dog',
          photos: [{ url: 'https://example.com/photo.jpg', path: 'pets/user-1/pet-1/photo.jpg' }],
        }),
      });

      const res = await fastify.inject({
        method: 'DELETE',
        url: `/pet-1/photos/${encodeURIComponent('nonexistent/path.jpg')}`,
      });

      expect(res.statusCode).toBe(404);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /locations/countries
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /locations/countries', () => {
    it('returns countries list with 200', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'EG', data: () => ({ code: 'EG', name: 'Egypt', cities: ['Cairo', 'Alexandria'] }) },
          { id: 'US', data: () => ({ code: 'US', name: 'United States', cities: ['New York', 'Los Angeles'] }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/locations/countries' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(2);
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('code');
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /locations/cities
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /locations/cities', () => {
    it('returns cities for a given country with 200', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [{ id: 'EG', data: () => ({ code: 'EG', name: 'Egypt', cities: ['Cairo', 'Alexandria'] }) }],
      });

      const res = await fastify.inject({ method: 'GET', url: '/locations/cities?country=Egypt' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
    });

    it('returns empty array when no country param provided', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/locations/cities' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // POST /:petId/health-certification - Submit Certification
  // ──────────────────────────────────────────────────────────────────────────

  describe('POST /:petId/health-certification - submit certification', () => {
    const certPayload = {
      vetName: 'Dr. Smith',
      vetClinic: 'PetCare Clinic',
      certDate: '2024-06-15',
      expiryDate: '2025-06-15',
      notes: 'All vaccines up to date',
      documents: [{ url: 'https://example.com/cert.pdf', name: 'cert.pdf' }],
    };

    it('submits health certification and returns 201', async () => {
      // First get: pet ownership check
      // Second get (where query): check for existing pending cert
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever' }),
        })
        .mockResolvedValueOnce({
          empty: true,
          docs: [],
        });
      mockCollection.add.mockResolvedValue({ id: 'cert-new' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pet-1/health-certification',
        payload: certPayload,
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('cert-new');
      expect(body.status).toBe('pending');
      expect(body.vetName).toBe('Dr. Smith');
      expect(body.petId).toBe('pet-1');
      expect(body.ownerId).toBe('user-1');
    });

    it('returns 404 when pet does not exist', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/nonexistent/health-certification',
        payload: certPayload,
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 400 when pending certification already exists', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ ownerId: 'user-1', name: 'Buddy', species: 'dog', breed: 'Golden Retriever' }),
        })
        .mockResolvedValueOnce({
          empty: false,
          docs: [{ id: 'existing-cert', data: () => ({ status: 'pending' }) }],
        });

      const res = await fastify.inject({
        method: 'POST',
        url: '/pet-1/health-certification',
        payload: certPayload,
      });

      expect(res.statusCode).toBe(400);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /health-certifications - Get My Certifications
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /health-certifications - get my certifications', () => {
    it('returns list of user certifications with 200', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', ownerId: 'user-1', status: 'pending', vetName: 'Dr. Smith' }) },
          { id: 'cert-2', data: () => ({ petId: 'pet-2', ownerId: 'user-1', status: 'approved', vetName: 'Dr. Jones' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/health-certifications' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body).toHaveLength(2);
      expect(body[0].id).toBe('cert-1');
      expect(body[0].status).toBe('pending');
    });

    it('returns empty array when user has no certifications', async () => {
      mockCollection.get.mockResolvedValue({
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({ method: 'GET', url: '/health-certifications' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toEqual([]);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // GET /:petId/health-certification - Get Pet Certification
  // ──────────────────────────────────────────────────────────────────────────

  describe('GET /:petId/health-certification - get pet certification', () => {
    it('returns latest certification for pet with 200', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'cert-1', data: () => ({ petId: 'pet-1', ownerId: 'user-1', status: 'approved', vetName: 'Dr. Smith' }) },
        ],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pet-1/health-certification' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('cert-1');
      expect(body.status).toBe('approved');
    });

    it('returns null when pet has no certifications', async () => {
      mockCollection.get.mockResolvedValue({
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({ method: 'GET', url: '/pet-1/health-certification' });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body).toBeNull();
    });
  });
});
