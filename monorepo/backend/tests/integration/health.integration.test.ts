import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, seedHealthRecord, clearStore } from './helpers';

describe('Health Records API Integration', () => {
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
    seedPet('pet-1', 'user-1');
    token = generateToken('user-1', 'john@test.com');
  });

  describe('POST /api/v1/pets/:petId/health', () => {
    it('creates a health record for owned pet', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/health',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'checkup',
          date: '2024-03-15',
          title: 'Annual checkup',
          notes: 'Everything looks great',
          veterinarian: 'Dr. Smith',
          clinic: 'Pet Clinic',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.type).toBe('checkup');
      expect(body.petId).toBe('pet-1');
      expect(body.ownerId).toBe('user-1');
    });

    it('returns 404 for unowned pet', async () => {
      seedPet('pet-2', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-2/health',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'checkup',
          date: '2024-03-15',
          title: 'Sneaky record',
        },
      });

      expect(res.statusCode).toBe(404);
    });

    it('validates record type', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/health',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          type: 'invalid_type',
          date: '2024-03-15',
          title: 'Bad type',
        },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('creates records of different types', async () => {
      const types = ['checkup', 'surgery', 'illness', 'injury', 'dental', 'other'];

      for (const type of types) {
        const res = await app.inject({
          method: 'POST',
          url: '/api/v1/pets/pet-1/health',
          headers: { authorization: `Bearer ${token}` },
          payload: {
            type,
            date: '2024-03-15',
            title: `${type} record`,
          },
        });

        expect(res.statusCode).toBe(201);
      }
    });
  });

  describe('GET /api/v1/pets/:petId/health', () => {
    it('returns paginated health records', async () => {
      seedHealthRecord('hr-1', 'pet-1', 'user-1', { title: 'First' });
      seedHealthRecord('hr-2', 'pet-1', 'user-1', { title: 'Second' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/health',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.data).toBeDefined();
      expect(body.total).toBeDefined();
      expect(body.page).toBe(1);
    });

    it('returns 404 for unowned pet', async () => {
      seedPet('pet-2', 'user-2');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-2/health',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /api/v1/pets/:petId/health/:recordId', () => {
    it('returns a specific record', async () => {
      seedHealthRecord('hr-1', 'pet-1', 'user-1', { title: 'Annual checkup' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/health/hr-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().title).toBe('Annual checkup');
    });

    it('returns 404 for record owned by another user', async () => {
      seedHealthRecord('hr-1', 'pet-1', 'user-2');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/health/hr-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/pets/:petId/health/:recordId', () => {
    it('updates a health record', async () => {
      seedHealthRecord('hr-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/health/hr-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { notes: 'Updated notes' },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /api/v1/pets/:petId/health/:recordId', () => {
    it('deletes a health record', async () => {
      seedHealthRecord('hr-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1/health/hr-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });

    it('returns 404 for non-existent record', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1/health/fake-id',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });
});
