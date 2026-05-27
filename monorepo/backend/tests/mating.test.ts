import { describe, it, expect, vi } from 'vitest';
import { createListingSchema, sendRequestSchema, respondRequestSchema } from '../src/modules/mating/mating.schema';

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

describe('Mating Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid listing creation', () => {
      const input = {
        petId: 'pet-123',
        species: 'dog',
        breed: 'Labrador',
        gender: 'male',
        age: 3,
        description: 'Healthy and friendly',
        healthCertified: true,
        location: { city: 'Cairo', country: 'Egypt' },
      };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should require petId', () => {
      const input = { species: 'dog', breed: 'Lab', gender: 'male', age: 2 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require species', () => {
      const input = { petId: 'pet-1', breed: 'Lab', gender: 'male', age: 2 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid species', () => {
      const input = { petId: 'pet-1', species: 'fish', breed: 'Goldfish', gender: 'male', age: 1 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject negative age', () => {
      const input = { petId: 'pet-1', species: 'dog', breed: 'Lab', gender: 'male', age: -1 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject description longer than 1000 chars', () => {
      const input = { petId: 'pet-1', species: 'dog', breed: 'Lab', gender: 'male', age: 2, description: 'A'.repeat(1001) };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should validate location with coordinates', () => {
      const input = {
        petId: 'pet-1',
        species: 'dog',
        breed: 'Lab',
        gender: 'male',
        age: 2,
        location: { city: 'Cairo', country: 'Egypt', coordinates: { lat: 30.0444, lng: 31.2357 } },
      };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate send request input', () => {
      const input = { listingId: 'listing-1', petId: 'pet-1', message: 'Interested in mating' };
      const result = sendRequestSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should require listingId for request', () => {
      const input = { petId: 'pet-1' };
      const result = sendRequestSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require petId for request', () => {
      const input = { listingId: 'listing-1' };
      const result = sendRequestSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should validate respond with accepted status', () => {
      const result = respondRequestSchema.safeParse({ status: 'accepted' });
      expect(result.success).toBe(true);
    });

    it('should validate respond with rejected status', () => {
      const result = respondRequestSchema.safeParse({ status: 'rejected' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid response status', () => {
      const result = respondRequestSchema.safeParse({ status: 'maybe' });
      expect(result.success).toBe(false);
    });

    it('should default healthCertified to false', () => {
      const input = { petId: 'pet-1', species: 'dog', breed: 'Lab', gender: 'male', age: 2 };
      const result = createListingSchema.parse(input);
      expect(result.healthCertified).toBe(false);
    });

    it('should reject negative price', () => {
      const input = { petId: 'pet-1', species: 'dog', breed: 'Lab', gender: 'male', age: 2, price: -100 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept zero price (free)', () => {
      const input = { petId: 'pet-1', species: 'dog', breed: 'Lab', gender: 'male', age: 2, price: 0 };
      const result = createListingSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});
