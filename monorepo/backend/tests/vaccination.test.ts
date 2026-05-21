import { describe, it, expect, vi } from 'vitest';
import { logVaccinationSchema, updateVaccinationSchema } from '../src/modules/vaccination/vaccination.schema';

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

describe('Vaccination Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid vaccination input', () => {
      const input = {
        vaccineName: 'Rabies',
        dateAdministered: '2024-03-15',
        nextDueDate: '2025-03-15',
        batchNumber: 'BATCH-001',
        veterinarian: 'Dr. Johnson',
        clinic: 'Animal Hospital',
      };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should require vaccine name', () => {
      const input = { dateAdministered: '2024-03-15' };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require dateAdministered', () => {
      const input = { vaccineName: 'Rabies' };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty vaccine name', () => {
      const input = { vaccineName: '', dateAdministered: '2024-03-15' };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject vaccine name longer than 100 chars', () => {
      const input = { vaccineName: 'A'.repeat(101), dateAdministered: '2024-03-15' };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject notes longer than 500 chars', () => {
      const input = { vaccineName: 'Rabies', dateAdministered: '2024-03-15', notes: 'A'.repeat(501) };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should allow optional fields to be omitted', () => {
      const input = { vaccineName: 'DHPP', dateAdministered: '2024-01-01' };
      const result = logVaccinationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate partial update', () => {
      const input = { veterinarian: 'Dr. New Vet' };
      const result = updateVaccinationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should allow empty update object', () => {
      const result = updateVaccinationSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
