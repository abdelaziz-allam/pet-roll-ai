import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, seedVaccination, clearStore } from './helpers';

describe('Vaccination API Integration', () => {
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

  describe('POST /api/v1/pets/:petId/vaccinations', () => {
    it('logs a vaccination for owned pet', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/vaccinations',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          vaccineName: 'Rabies',
          dateAdministered: '2024-03-15',
          nextDueDate: '2025-03-15',
          veterinarian: 'Dr. Smith',
          batchNumber: 'BATCH-001',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.id).toBeDefined();
      expect(body.vaccineName).toBe('Rabies');
      expect(body.petId).toBe('pet-1');
    });

    it('returns 404 for pet not owned by user', async () => {
      seedPet('pet-2', 'user-2');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-2/vaccinations',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          vaccineName: 'Rabies',
          dateAdministered: '2024-03-15',
        },
      });

      expect(res.statusCode).toBe(404);
    });

    it('validates required fields', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/vaccinations',
        headers: { authorization: `Bearer ${token}` },
        payload: {},
      });

      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  describe('GET /api/v1/pets/:petId/vaccinations', () => {
    it('returns vaccination list with pagination', async () => {
      seedVaccination('vac-1', 'pet-1', 'user-1', { vaccineName: 'Rabies' });
      seedVaccination('vac-2', 'pet-1', 'user-1', { vaccineName: 'DHPP' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/vaccinations',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.data).toBeDefined();
      expect(body.total).toBeDefined();
    });
  });

  describe('GET /api/v1/pets/:petId/vaccinations/upcoming', () => {
    it('returns upcoming vaccinations', async () => {
      seedVaccination('vac-1', 'pet-1', 'user-1', {
        vaccineName: 'Rabies',
        nextDueDate: '2025-06-15',
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1/vaccinations/upcoming',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /api/v1/pets/:petId/vaccinations/:vacId', () => {
    it('updates a vaccination record', async () => {
      seedVaccination('vac-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/vaccinations/vac-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { notes: 'No adverse reactions' },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 for vaccination owned by another user', async () => {
      seedVaccination('vac-1', 'pet-1', 'user-2');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1/vaccinations/vac-1',
        headers: { authorization: `Bearer ${token}` },
        payload: { notes: 'Hack attempt' },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/v1/pets/:petId/vaccinations/:vacId', () => {
    it('deletes a vaccination record', async () => {
      seedVaccination('vac-1', 'pet-1', 'user-1');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1/vaccinations/vac-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });
});
