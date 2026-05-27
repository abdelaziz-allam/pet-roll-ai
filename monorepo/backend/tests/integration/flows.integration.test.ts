import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedPet, clearStore, seedStore } from './helpers';

describe('End-to-End User Flows', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
  });

  describe('Flow: Register → Create Pet → Add Health Record → Schedule Vaccination', () => {
    it('completes the full pet onboarding flow', async () => {
      // Step 1: Register
      const registerRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: {
          displayName: 'John Doe',
          phone: '+1234567890',
          timezone: 'America/New_York',
        },
      });

      expect(registerRes.statusCode).toBe(201);
      const { accessToken } = registerRes.json();
      const authHeader = { authorization: `Bearer ${accessToken}` };

      // Step 2: Create Pet
      const petRes = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: authHeader,
        payload: {
          name: 'Buddy',
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          dateOfBirth: '2022-01-15',
          weight: 30,
        },
      });

      expect(petRes.statusCode).toBe(201);
      const pet = petRes.json();
      expect(pet.name).toBe('Buddy');

      // Step 3: Add Health Record
      const healthRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${pet.id}/health`,
        headers: authHeader,
        payload: {
          type: 'checkup',
          date: '2024-03-15',
          title: 'First vet visit',
          notes: 'Healthy puppy, all clear',
          veterinarian: 'Dr. Smith',
          clinic: 'Downtown Vet',
        },
      });

      expect(healthRes.statusCode).toBe(201);
      const healthRecord = healthRes.json();
      expect(healthRecord.petId).toBe(pet.id);

      // Step 4: Log Vaccination
      const vacRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${pet.id}/vaccinations`,
        headers: authHeader,
        payload: {
          vaccineName: 'Rabies',
          dateAdministered: '2024-03-15',
          nextDueDate: '2025-03-15',
          veterinarian: 'Dr. Smith',
          batchNumber: 'RAB-2024-001',
        },
      });

      expect(vacRes.statusCode).toBe(201);
      expect(vacRes.json().vaccineName).toBe('Rabies');

      // Step 5: Create Schedule
      const schedRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${pet.id}/schedules`,
        headers: authHeader,
        payload: {
          type: 'feeding',
          title: 'Morning Feed',
          frequency: 'daily',
          nextDue: '2024-03-16T08:00:00Z',
          time: '08:00',
        },
      });

      expect(schedRes.statusCode).toBe(201);
      expect(schedRes.json().type).toBe('feeding');
    });
  });

  describe('Flow: Mating Marketplace', () => {
    it('completes listing → request → accept flow', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      seedUser('user-2', { email: 'jane@test.com' });
      seedPet('pet-1', 'user-1', { name: 'Buddy', gender: 'male' });
      seedPet('pet-2', 'user-2', { name: 'Bella', gender: 'female' });

      const token1 = generateToken('user-1', 'john@test.com');
      const token2 = generateToken('user-2', 'jane@test.com');

      // User 1 creates a listing
      const listingRes = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/listings',
        headers: { authorization: `Bearer ${token1}` },
        payload: {
          petId: 'pet-1',
          species: 'dog',
          breed: 'Golden Retriever',
          gender: 'male',
          age: 3,
          description: 'Champion bloodline',
          price: 500,
          location: { city: 'Seattle', country: 'US' },
        },
      });

      expect(listingRes.statusCode).toBe(201);
      const listing = listingRes.json();

      // User 2 sends a mating request
      const requestRes = await app.inject({
        method: 'POST',
        url: '/api/v1/mating/requests',
        headers: { authorization: `Bearer ${token2}` },
        payload: {
          listingId: listing.id,
          petId: 'pet-2',
          message: 'Would love to mate my Bella with your Buddy!',
        },
      });

      expect(requestRes.statusCode).toBe(201);
      const matingRequest = requestRes.json();
      expect(matingRequest.status).toBe('pending');

      // User 1 accepts the request
      const acceptRes = await app.inject({
        method: 'PUT',
        url: `/api/v1/mating/requests/${matingRequest.id}`,
        headers: { authorization: `Bearer ${token1}` },
        payload: { status: 'accepted' },
      });

      expect(acceptRes.statusCode).toBe(200);
    });
  });

  describe('Flow: Pregnancy Tracking', () => {
    it('tracks pregnancy from start to weight monitoring', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      seedPet('pet-1', 'user-1', { name: 'Bella', species: 'dog', gender: 'female' });
      const token = generateToken('user-1', 'john@test.com');

      // Start pregnancy tracking
      const startRes = await app.inject({
        method: 'POST',
        url: '/api/v1/pets/pet-1/pregnancy',
        headers: { authorization: `Bearer ${token}` },
        payload: {
          matingDate: '2024-03-01',
          expectedDueDate: '2024-05-03',
          notes: 'First pregnancy',
        },
      });

      expect(startRes.statusCode).toBe(201);
      const pregnancy = startRes.json();

      // Add weight entries
      const weight1Res = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/pet-1/pregnancy/${pregnancy.id}/weight`,
        headers: { authorization: `Bearer ${token}` },
        payload: { weight: 28.5 },
      });
      expect(weight1Res.statusCode).toBe(200);

      const weight2Res = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/pet-1/pregnancy/${pregnancy.id}/weight`,
        headers: { authorization: `Bearer ${token}` },
        payload: { weight: 30.2 },
      });
      expect(weight2Res.statusCode).toBe(200);

      // Get milestones
      const milestonesRes = await app.inject({
        method: 'GET',
        url: `/api/v1/pets/pet-1/pregnancy/${pregnancy.id}/milestones`,
        headers: { authorization: `Bearer ${token}` },
      });
      expect(milestonesRes.statusCode).toBe(200);
    });
  });

  describe('Flow: Multi-pet Management', () => {
    it('manages multiple pets with independent records', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      const token = generateToken('user-1', 'john@test.com');

      // Create dog
      const dogRes = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
        payload: { name: 'Buddy', species: 'dog', breed: 'Golden Retriever', gender: 'male', dateOfBirth: '2022-01-15' },
      });
      expect(dogRes.statusCode).toBe(201);
      const dog = dogRes.json();

      // Create cat
      const catRes = await app.inject({
        method: 'POST',
        url: '/api/v1/pets',
        headers: { authorization: `Bearer ${token}` },
        payload: { name: 'Whiskers', species: 'cat', breed: 'Persian', gender: 'female', dateOfBirth: '2023-06-01' },
      });
      expect(catRes.statusCode).toBe(201);
      const cat = catRes.json();

      // Add health record for dog
      const dogHealthRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${dog.id}/health`,
        headers: { authorization: `Bearer ${token}` },
        payload: { type: 'checkup', date: '2024-03-01', title: 'Dog checkup' },
      });
      expect(dogHealthRes.statusCode).toBe(201);

      // Add health record for cat
      const catHealthRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${cat.id}/health`,
        headers: { authorization: `Bearer ${token}` },
        payload: { type: 'dental', date: '2024-03-02', title: 'Cat dental cleaning' },
      });
      expect(catHealthRes.statusCode).toBe(201);

      // Add vaccination for dog
      const dogVacRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${dog.id}/vaccinations`,
        headers: { authorization: `Bearer ${token}` },
        payload: { vaccineName: 'DHPP', dateAdministered: '2024-03-01', nextDueDate: '2025-03-01' },
      });
      expect(dogVacRes.statusCode).toBe(201);

      // Add vaccination for cat
      const catVacRes = await app.inject({
        method: 'POST',
        url: `/api/v1/pets/${cat.id}/vaccinations`,
        headers: { authorization: `Bearer ${token}` },
        payload: { vaccineName: 'FVRCP', dateAdministered: '2024-03-02', nextDueDate: '2025-03-02' },
      });
      expect(catVacRes.statusCode).toBe(201);
    });
  });

  describe('Flow: User Isolation', () => {
    it('ensures users cannot access each other data', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      seedUser('user-2', { email: 'jane@test.com' });
      seedPet('pet-1', 'user-1', { name: 'Buddy' });

      const token1 = generateToken('user-1', 'john@test.com');
      const token2 = generateToken('user-2', 'jane@test.com');

      // User 1 can access their pet
      const res1 = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token1}` },
      });
      expect(res1.statusCode).toBe(200);

      // User 2 cannot access user 1's pet
      const res2 = await app.inject({
        method: 'GET',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token2}` },
      });
      expect(res2.statusCode).toBe(404);

      // User 2 cannot update user 1's pet
      const res3 = await app.inject({
        method: 'PUT',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token2}` },
        payload: { name: 'Stolen' },
      });
      expect(res3.statusCode).toBe(404);

      // User 2 cannot delete user 1's pet
      const res4 = await app.inject({
        method: 'DELETE',
        url: '/api/v1/pets/pet-1',
        headers: { authorization: `Bearer ${token2}` },
      });
      expect(res4.statusCode).toBe(404);
    });
  });

  describe('Flow: Health Check & Server Status', () => {
    it('returns health check response', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.status).toBe('ok');
      expect(body.timestamp).toBeDefined();
    });
  });

  describe('Flow: Rate Limiting', () => {
    it('accepts requests within rate limit', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      const token = generateToken('user-1', 'john@test.com');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.headers['x-ratelimit-limit']).toBeDefined();
    });
  });

  describe('Flow: Account Lifecycle', () => {
    it('register → login → update profile → delete account', async () => {
      // Register
      const registerRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: { displayName: 'John Doe', timezone: 'UTC' },
      });
      expect(registerRes.statusCode).toBe(201);

      // Login
      const loginRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
      });
      expect(loginRes.statusCode).toBe(200);
      const { accessToken } = loginRes.json();

      // Update profile
      const updateRes = await app.inject({
        method: 'PUT',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${accessToken}` },
        payload: { displayName: 'John Updated', phone: '+9876543210' },
      });
      expect(updateRes.statusCode).toBe(200);

      // Delete account
      const deleteRes = await app.inject({
        method: 'DELETE',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${accessToken}` },
      });
      expect(deleteRes.statusCode).toBe(204);
    });
  });
});
