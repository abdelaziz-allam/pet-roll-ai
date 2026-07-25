import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/mating/mating.service', () => ({
  matingService: {
    createListing: vi.fn().mockResolvedValue({ id: 'listing-1', petName: 'Rex', status: 'active' }),
    browseListings: vi.fn().mockResolvedValue({ data: [{ id: 'listing-1', petName: 'Rex' }], total: 1, page: 1, limit: 20 }),
    browseSmartListings: vi.fn().mockResolvedValue({ data: [{ id: 'listing-1', petName: 'Rex' }], total: 1 }),
    getListingById: vi.fn().mockResolvedValue({ id: 'listing-1', petName: 'Rex', status: 'active' }),
    getPetProfile: vi.fn().mockResolvedValue({ id: 'pet-1', name: 'Rex', species: 'dog' }),
    updateListing: vi.fn().mockResolvedValue({ id: 'listing-1', description: 'Updated' }),
    deleteListing: vi.fn().mockResolvedValue(undefined),
    sendRequest: vi.fn().mockResolvedValue({ id: 'req-1', status: 'pending' }),
    getSentRequests: vi.fn().mockResolvedValue([{ id: 'req-1', status: 'pending' }]),
    getReceivedRequests: vi.fn().mockResolvedValue([{ id: 'req-2', status: 'pending' }]),
    respondToRequest: vi.fn().mockResolvedValue({ id: 'req-1', status: 'accepted' }),
    getWeddingCards: vi.fn().mockResolvedValue([{ id: 'card-1' }]),
    getWeddingCard: vi.fn().mockResolvedValue({ id: 'card-1', matchId: 'match-1' }),
  },
}));

vi.mock('../../src/modules/mating/mating.schema', () => ({
  createListingSchema: { parse: vi.fn((body: any) => body) },
  updateListingSchema: { parse: vi.fn((body: any) => body) },
  sendRequestSchema: { parse: vi.fn((body: any) => body) },
  respondRequestSchema: { parse: vi.fn((body: any) => body) },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

const mockPetDoc = {
  exists: true,
  data: () => ({ ownerId: 'user-1', isAvailableForMating: true }),
};

const mockEmptySnap = {
  empty: true,
  docs: [],
};

const mockPetsSnap = {
  docs: [{ id: 'pet-1', data: () => ({ ownerId: 'user-1', isAvailableForMating: true, name: 'Rex' }) }],
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn((name: string) => {
      if (name === 'pets') {
        return {
          doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue(mockPetDoc),
          })),
          where: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue(mockPetsSnap),
        };
      }
      if (name === 'pregnancies') {
        return {
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue(mockEmptySnap),
        };
      }
      return {
        doc: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ empty: true, docs: [] }),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
      };
    }),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: { serverTimestamp: vi.fn(), increment: vi.fn() },
}));

import { matingRoutes } from '../../src/modules/mating/mating.routes';

describe('Mating Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(matingRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /listings', () => {
    it('creates a listing and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/listings',
        payload: { petId: 'pet-1', description: 'Great dog for mating' },
      });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('GET /eligible-pets', () => {
    it('returns eligible pets with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/eligible-pets' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /listings', () => {
    it('returns listings with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/listings' });
      expect(res.statusCode).toBe(200);
    });

    it('accepts filter params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/listings?species=dog&breed=GSD&city=Berlin' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /listings/smart', () => {
    it('returns smart listings with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/listings/smart' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /listings/:id', () => {
    it('returns a listing by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/listings/listing-1' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /pets/:petId/profile', () => {
    it('returns a pet profile with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/pets/pet-1/profile' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /listings/:id', () => {
    it('updates a listing and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/listings/listing-1',
        payload: { description: 'Updated description' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /listings/:id', () => {
    it('deletes a listing and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/listings/listing-1' });
      expect(res.statusCode).toBe(204);
    });
  });

  describe('POST /requests', () => {
    it('sends a mating request and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/requests',
        payload: { petId: 'pet-1', listingId: 'listing-1', message: 'Interested' },
      });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('GET /requests/sent', () => {
    it('returns sent requests with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/requests/sent' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /requests/received', () => {
    it('returns received requests with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/requests/received' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /requests/:id', () => {
    it('responds to a request and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/requests/req-1',
        payload: { status: 'accepted' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /requests/:id/respond', () => {
    it('responds to a request via respond endpoint and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/requests/req-1/respond',
        payload: { status: 'accepted' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /wedding-cards', () => {
    it('returns wedding cards with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/wedding-cards' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /wedding-cards/:id', () => {
    it('returns a wedding card by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/wedding-cards/card-1' });
      expect(res.statusCode).toBe(200);
    });
  });
});
