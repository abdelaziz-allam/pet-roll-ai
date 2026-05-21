import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, clearStore } from './helpers';

describe('Pets API Integration', () => {
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
    token = generateToken('user-1', 'john@test.com');
  });

  describe('POST /api/v1/pets', () => {
    it('creates a new pet', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          name: 'Buddy',
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          dateOfBirth: '2022-01-15',
          weight: 30,
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.name).toBe('Buddy');
      expect(body.species).toBe('dog');
      expect(body.ownerId).toBe('user-1');
    });

    it('returns 401 without auth', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        payload: { name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2022-01-01' },
      });

      expect(res.statusCode).toBe(401);
    });

    it('validates required fields', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
        payload: { name: 'Buddy' },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('validates species enum', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          name: 'Buddy',
          species: 'fish',
          breed: 'Goldfish',
          gender: 'male',
          dateOfBirth: '2022-01-01',
        },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/pets', () => {
    it('returns paginated list of user pets', async () => {
      seedPet('pet-1', 'user-1', { name: 'Buddy' });
      seedPet('pet-2', 'user-1', { name: 'Max' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.data).toBeDefined();
      expect(body.total).toBeDefined();
      expect(body.page).toBeDefined();
    });

    it('respects pagination params', async () => {
      seedPet('pet-1', 'user-1');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets?page=1&limit=5',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.page).toBe(1);
      expect(body.limit).toBe(5);
    });
  });

  describe('GET /api/v1/pets/:petId', () => {
    it('returns a specific pet', async () => {
      seedPet('pet-1', 'user-1', { name: 'Buddy' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().name).toBe('Buddy');
    });

    it('returns 404 for non-existent pet', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/non-existent',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 for pet owned by another user', async () => {
      seedPet('pet-1', 'user-2', { name: 'Not Mine' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/pets/:petId', () => {
    it('updates an existing pet', async () => {
      seedPet('pet-1', 'user-1', { name: 'Buddy' });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { name: 'Buddy Jr', weight: 32 },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 when updating another user pet', async () => {
      seedPet('pet-1', 'user-2');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { name: 'Stolen' },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/pets/:petId', () => {
    it('deletes a pet with cascade', async () => {
      seedPet('pet-1', 'user-1');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });

    it('returns 404 when deleting non-existent pet', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/fake-pet',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/v1/pets/:petId/photos', () => {
    it('adds a photo to a pet', async () => {
      seedPet('pet-1', 'user-1');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/photos',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          url: 'https://storage.example.com/photo.jpg',
          path: 'pets/user-1/pet-1/photo.jpg',
        },
      });

      expect(res.statusCode).toBe(200);
    });
  });
});
