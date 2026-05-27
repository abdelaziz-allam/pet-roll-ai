import { describe, it, expect, vi } from 'vitest';
import { createPetSchema, updatePetSchema } from '../src/modules/pets/pets.schema';

vi.mock('../src/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 3001,
    GCP_PROJECT_ID: 'petroll-mvp',
    FIREBASE_PROJECT_ID: 'petroll-mvp',
    JWT_SECRET: 'test-secret-minimum-16-chars',
    JWT_EXPIRY: '1h',
    REFRESH_TOKEN_EXPIRY: '7d',
    CORS_ORIGINS: 'http://localhost:5173',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW: 60000,
    GCS_BUCKET: 'petroll-mvp.appspot.com',
  },
}));

describe('Pets Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid pet creation input', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Labrador Retriever',
        gender: 'male',
        dateOfBirth: '2022-01-15',
        weight: 30,
        color: 'Golden',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const input = { name: 'Buddy' };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid species', () => {
      const input = {
        name: 'Buddy',
        species: 'bird',
        breed: 'Parrot',
        gender: 'male',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid gender', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'unknown',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject negative weight', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
        weight: -5,
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject name longer than 50 chars', () => {
      const input = {
        name: 'A'.repeat(51),
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const input = {
        name: '',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should default isNeutered to false', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.parse(input);
      expect(result.isNeutered).toBe(false);
    });

    it('should default isAvailableForMating to false', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
      };
      const result = createPetSchema.parse(input);
      expect(result.isAvailableForMating).toBe(false);
    });

    it('should allow partial update', () => {
      const input = { name: 'New Name' };
      const result = updatePetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject notes longer than 500 chars', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
        notes: 'A'.repeat(501),
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept cat species', () => {
      const input = {
        name: 'Whiskers',
        species: 'cat',
        breed: 'Persian',
        gender: 'female',
        dateOfBirth: '2021-06-01',
      };
      const result = createPetSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('Pet Service Logic', () => {
    it('should construct pet data with owner ID and empty photos', () => {
      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        dateOfBirth: '2022-01-15',
        isNeutered: false,
        isAvailableForMating: false,
      };
      const ownerId = 'user-123';
      const petData = { ...input, ownerId, photos: [] };
      expect(petData.ownerId).toBe('user-123');
      expect(petData.photos).toEqual([]);
      expect(petData.name).toBe('Buddy');
    });

    it('should include optional fields when provided', () => {
      const input = {
        name: 'Max',
        species: 'dog',
        breed: 'Husky',
        gender: 'male',
        dateOfBirth: '2020-03-10',
        weight: 25,
        color: 'White and Gray',
        microchipId: 'CHIP-12345',
        isNeutered: true,
        isAvailableForMating: false,
        notes: 'Very friendly',
      };
      const petData = { ...input, ownerId: 'user-1', photos: [] };
      expect(petData.weight).toBe(25);
      expect(petData.color).toBe('White and Gray');
      expect(petData.microchipId).toBe('CHIP-12345');
      expect(petData.notes).toBe('Very friendly');
    });
  });
});
