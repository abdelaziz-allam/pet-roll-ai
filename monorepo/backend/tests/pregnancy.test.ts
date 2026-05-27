import { describe, it, expect, vi } from 'vitest';
import { startPregnancySchema, updatePregnancySchema, addWeightSchema } from '../src/modules/pregnancy/pregnancy.schema';

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

describe('Pregnancy Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid pregnancy start input', () => {
      const input = {
        matingDate: '2024-01-15',
        mateInfo: { name: 'Rex', breed: 'German Shepherd' },
        notes: 'First pregnancy',
      };
      const result = startPregnancySchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should require mating date', () => {
      const input = { mateInfo: { name: 'Rex' } };
      const result = startPregnancySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should allow mateInfo to be optional', () => {
      const input = { matingDate: '2024-01-15' };
      const result = startPregnancySchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject notes longer than 500 chars', () => {
      const input = { matingDate: '2024-01-15', notes: 'A'.repeat(501) };
      const result = startPregnancySchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should validate pregnancy update with valid status', () => {
      const statuses = ['active', 'completed', 'miscarriage', 'false_alarm'];
      statuses.forEach((status) => {
        const result = updatePregnancySchema.safeParse({ status });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid status', () => {
      const result = updatePregnancySchema.safeParse({ status: 'unknown' });
      expect(result.success).toBe(false);
    });

    it('should validate litter size as positive integer', () => {
      const result = updatePregnancySchema.safeParse({ litterSize: 5 });
      expect(result.success).toBe(true);
    });

    it('should reject negative litter size', () => {
      const result = updatePregnancySchema.safeParse({ litterSize: -1 });
      expect(result.success).toBe(false);
    });

    it('should reject zero litter size', () => {
      const result = updatePregnancySchema.safeParse({ litterSize: 0 });
      expect(result.success).toBe(false);
    });

    it('should validate weight entry', () => {
      const result = addWeightSchema.safeParse({ weight: 32.5 });
      expect(result.success).toBe(true);
    });

    it('should reject negative weight', () => {
      const result = addWeightSchema.safeParse({ weight: -1 });
      expect(result.success).toBe(false);
    });

    it('should reject zero weight', () => {
      const result = addWeightSchema.safeParse({ weight: 0 });
      expect(result.success).toBe(false);
    });
  });

  describe('Gestation Calculation', () => {
    it('should calculate dog due date as 63 days after mating', () => {
      const matingDate = new Date('2024-01-15');
      const expectedDue = new Date(matingDate.getTime() + 63 * 24 * 60 * 60 * 1000);
      expect(expectedDue.toISOString().split('T')[0]).toBe('2024-03-18');
    });

    it('should calculate cat due date as 65 days after mating', () => {
      const matingDate = new Date('2024-01-15');
      const expectedDue = new Date(matingDate.getTime() + 65 * 24 * 60 * 60 * 1000);
      expect(expectedDue.toISOString().split('T')[0]).toBe('2024-03-20');
    });
  });
});
