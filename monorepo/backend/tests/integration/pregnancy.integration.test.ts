import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, clearStore, seedStore } from './helpers';

describe('Pregnancy API Integration', () => {
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
    seedPet('pet-1', 'user-1', { species: 'dog', gender: 'female' });
    token = generateToken('user-1', 'john@test.com');
  });

  describe('POST /api/v1/pets/:petId/pregnancy', () => {
    it('starts pregnancy tracking', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/pregnancy',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          matingDate: '2024-03-01',
          expectedDueDate: '2024-05-03',
          notes: 'Bred with champion Golden',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.petId).toBe('pet-1');
      expect(body.matingDate).toBe('2024-03-01');
    });

    it('returns 404 for unowned pet', async () => {
      seedPet('pet-2', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-2/pregnancy',
        headers: { authorization: `Bearer ${token}` },
        payload: { matingDate: '2024-03-01' },
      });

      expect(res.statusCode).toBe(404);
    });

    it('validates required matingDate', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/pregnancy',
        headers: { authorization: `Bearer ${token}` },
        payload: {},
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/pets/:petId/pregnancy', () => {
    it('returns active pregnancy', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        expectedDueDate: '2024-05-03',
        status: 'active',
        species: 'dog',
        weightLog: [],
        createdAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/pregnancy',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 when no active pregnancy', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/pregnancy',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('GET /api/v1/pets/:petId/pregnancy/:pregId', () => {
    it('returns specific pregnancy by id', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        status: 'active',
        species: 'dog',
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 for pregnancy owned by another user', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-2',
        matingDate: '2024-03-01',
        status: 'active',
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/pets/:petId/pregnancy/:pregId', () => {
    it('updates pregnancy details', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        status: 'active',
        species: 'dog',
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { notes: 'Ultrasound confirmed 6 puppies', status: 'active' },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /api/v1/pets/:petId/pregnancy/:pregId/weight', () => {
    it('adds a weight entry', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        status: 'active',
        species: 'dog',
        weightLog: [],
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1/weight',
        headers: { authorization: `Bearer ${token}` },
        payload: { weight: 35.5 },
      });

      expect(res.statusCode).toBe(200);
    });

    it('validates weight is positive number', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        status: 'active',
        weightLog: [],
      });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1/weight',
        headers: { authorization: `Bearer ${token}` },
        payload: { weight: -5 },
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/pets/:petId/pregnancy/:pregId/milestones', () => {
    it('returns milestones for pregnancy', async () => {
      seedStore('pregnancies', 'preg-1', {
        petId: 'pet-1',
        ownerId: 'user-1',
        matingDate: '2024-03-01',
        status: 'active',
        species: 'dog',
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/pregnancy/preg-1/milestones',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });
});
