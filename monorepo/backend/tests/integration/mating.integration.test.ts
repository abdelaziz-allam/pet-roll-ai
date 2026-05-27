import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, seedMatingListing, clearStore, seedStore } from './helpers';

describe('Mating API Integration', () => {
  let app: FastifyInstance;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
    seedUser('user-1', { email: 'john@test.com' });
    seedUser('user-2', { email: 'jane@test.com' });
    seedPet('pet-1', 'user-1', { name: 'Buddy', species: 'dog', breed: 'Golden Retriever' });
    seedPet('pet-2', 'user-2', { name: 'Bella', species: 'dog', breed: 'Golden Retriever', gender: 'female' });
    token = generateToken('user-1', 'john@test.com');
  });

  describe('POST /api/v1/mating/listings', () => {
    it('creates a mating listing', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/listings',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          petId: 'pet-1',
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          age: 3,
          description: 'Champion bloodline golden retriever',
          price: 500,
          location: { city: 'Seattle', country: 'US' },
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.species).toBe('dog');
      expect(body.status).toBe('active');
    });

    it('validates required listing fields', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/listings',
        headers: { authorization: `Bearer ${token}` },
        payload: { petId: 'pet-1' },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('validates price is non-negative', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/listings',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          petId: 'pet-1',
          petName: 'Buddy',
          species: 'dog',
          breed: 'Golden',
          gender: 'male',
          age: 3,
          description: 'Good dog',
          price: -100,
          location: { city: 'Seattle', country: 'US' },
        },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/mating/listings', () => {
    it('returns all active listings', async () => {
      seedMatingListing('listing-1', 'user-1', { petName: 'Buddy' });
      seedMatingListing('listing-2', 'user-2', { petName: 'Bella', gender: 'female' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/listings',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.data).toBeDefined();
      expect(body.total).toBeDefined();
    });

    it('filters by species', async () => {
      seedMatingListing('listing-1', 'user-1', { species: 'dog' });
      seedMatingListing('listing-2', 'user-2', { species: 'cat' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/listings?species=dog',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/v1/mating/listings/:id', () => {
    it('returns a specific listing', async () => {
      seedMatingListing('listing-1', 'user-1', { petName: 'Buddy' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/listings/listing-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().petName).toBe('Buddy');
    });

    it('returns 404 for non-existent listing', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/listings/fake-id',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/mating/listings/:id', () => {
    it('updates own listing', async () => {
      seedMatingListing('listing-1', 'user-1');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/mating/listings/listing-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { price: 600, description: 'Updated description' },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 when updating another user listing', async () => {
      seedMatingListing('listing-1', 'user-2');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/mating/listings/listing-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { price: 0 },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/mating/listings/:id', () => {
    it('deletes own listing', async () => {
      seedMatingListing('listing-1', 'user-1');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/mating/listings/listing-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });

  describe('GET /api/v1/mating/eligible-pets', () => {
    it('returns pets marked as available for mating', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/eligible-pets',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(1);
      expect(body[0].id).toBe('pet-1');
    });

    it('excludes pets not marked as available for mating', async () => {
      seedPet('pet-3', 'user-1', { name: 'Rex', isAvailableForMating: false });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/eligible-pets',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      const ids = body.map((p: any) => p.id);
      expect(ids).not.toContain('pet-3');
    });

    it('excludes pregnant pets', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        status: 'active',
        matingDate: '2024-01-01',
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/eligible-pets',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      const ids = body.map((p: any) => p.id);
      expect(ids).not.toContain('pet-1');
    });

    it('returns empty list when no pets are available', async () => {
      clearStore();
      seedUser('user-1', { email: 'john@test.com' });
      seedPet('pet-1', 'user-1', { isAvailableForMating: false });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/eligible-pets',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.length).toBe(0);
    });
  });

  describe('POST /api/v1/mating/requests', () => {
    it('sends a mating request', async () => {
      seedMatingListing('listing-1', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/requests',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          listingId: 'listing-1',
          petId: 'pet-1',
          message: 'Interested in mating my golden retriever',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.status).toBe('pending');
    });

    it('rejects request when pet is not marked as available for mating', async () => {
      seedPet('pet-unavailable', 'user-1', { name: 'Shadow', isAvailableForMating: false });
      seedMatingListing('listing-1', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/requests',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          listingId: 'listing-1',
          petId: 'pet-unavailable',
        },
      });

      expect(res.statusCode).toBe(400);
      expect(res.json().error).toContain('available for mating');
    });

    it('rejects request when pet is pregnant', async () => {
      seedMatingListing('listing-1', 'user-2');
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        status: 'active',
        matingDate: '2024-01-01',
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/requests',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          listingId: 'listing-1',
          petId: 'pet-1',
        },
      });

      expect(res.statusCode).toBe(400);
      expect(res.json().error).toContain('pregnant');
    });

    it('rejects request with pet not owned by sender', async () => {
      seedMatingListing('listing-1', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/requests',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          listingId: 'listing-1',
          petId: 'pet-2',
        },
      });

      expect(res.statusCode).toBe(404);
      expect(res.json().error).toContain('Pet not found');
    });
  });

  describe('GET /api/v1/mating/requests/sent', () => {
    it('returns sent requests', async () => {
      seedStore('mating_requests', 'req-1', {
        senderId: 'user-1',
        listingId: 'listing-1',
        petId: 'pet-1',
        status: 'pending',
        message: 'Hello',
        createdAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/requests/sent',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/v1/mating/requests/received', () => {
    it('returns received requests', async () => {
      seedStore('mating_requests', 'req-1', {
        receiverId: 'user-1',
        senderId: 'user-2',
        listingId: 'listing-1',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/mating/requests/received',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /api/v1/mating/requests/:id', () => {
    it('accepts a mating request', async () => {
      seedStore('mating_requests', 'req-1', {
        receiverId: 'user-1',
        senderId: 'user-2',
        listingId: 'listing-1',
        status: 'pending',
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/mating/requests/req-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { status: 'accepted' },
      });

      expect(res.statusCode).toBe(200);
    });

    it('rejects a mating request', async () => {
      seedStore('mating_requests', 'req-1', {
        receiverId: 'user-1',
        senderId: 'user-2',
        listingId: 'listing-1',
        status: 'pending',
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/mating/requests/req-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { status: 'rejected' },
      });

      expect(res.statusCode).toBe(200);
    });
  });
});
