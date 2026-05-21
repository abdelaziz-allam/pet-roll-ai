import { describe, it, expect, vi } from 'vitest';
import { createHealthRecordSchema, updateHealthRecordSchema } from '../src/modules/health/health.schema';

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

describe('Health Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid health record', () => {
      const input = {
        type: 'checkup',
        date: '2024-01-15',
        title: 'Annual checkup',
        description: 'Routine annual examination',
        veterinarian: 'Dr. Smith',
        clinic: 'PetCare Clinic',
        weight: 28.5,
      };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid type', () => {
      const input = { type: 'invalid_type', date: '2024-01-15', title: 'Test' };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept all valid types', () => {
      const types = ['checkup', 'illness', 'injury', 'surgery', 'dental', 'other'];
      types.forEach((type) => {
        const input = { type, date: '2024-01-15', title: 'Test record' };
        const result = createHealthRecordSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    it('should reject missing title', () => {
      const input = { type: 'checkup', date: '2024-01-15' };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject title longer than 100 chars', () => {
      const input = { type: 'checkup', date: '2024-01-15', title: 'A'.repeat(101) };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject description longer than 1000 chars', () => {
      const input = { type: 'checkup', date: '2024-01-15', title: 'Test', description: 'A'.repeat(1001) };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject negative weight', () => {
      const input = { type: 'checkup', date: '2024-01-15', title: 'Test', weight: -1 };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should allow partial update', () => {
      const input = { weight: 30.2 };
      const result = updateHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate attachment URLs', () => {
      const input = { type: 'checkup', date: '2024-01-15', title: 'Test', attachments: ['https://example.com/xray.jpg'] };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid attachment URLs', () => {
      const input = { type: 'checkup', date: '2024-01-15', title: 'Test', attachments: ['not-a-url'] };
      const result = createHealthRecordSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
