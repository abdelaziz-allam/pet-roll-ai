import { describe, it, expect, vi } from 'vitest';
import { createScheduleSchema, updateScheduleSchema } from '../src/modules/schedules/schedules.schema';

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

describe('Schedules Module', () => {
  describe('Schema Validation', () => {
    it('should validate valid schedule input', () => {
      const input = {
        title: 'Morning feeding',
        type: 'feeding',
        frequency: 'daily',
        nextDue: '2024-03-15T08:00:00Z',
        time: '08:00',
        reminderMinutesBefore: 15,
      };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should accept all valid types', () => {
      const types = ['feeding', 'medication', 'grooming', 'exercise', 'vet_visit', 'other'];
      types.forEach((type) => {
        const input = { title: 'Test', type, frequency: 'daily', nextDue: '2024-03-15' };
        const result = createScheduleSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    it('should accept all valid frequencies', () => {
      const frequencies = ['daily', 'weekly', 'biweekly', 'monthly', 'custom'];
      frequencies.forEach((frequency) => {
        const input = { title: 'Test', type: 'feeding', frequency, nextDue: '2024-03-15' };
        const result = createScheduleSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid type', () => {
      const input = { title: 'Test', type: 'swimming', frequency: 'daily', nextDue: '2024-03-15' };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid frequency', () => {
      const input = { title: 'Test', type: 'feeding', frequency: 'yearly', nextDue: '2024-03-15' };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require title', () => {
      const input = { type: 'feeding', frequency: 'daily', nextDue: '2024-03-15' };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject title longer than 100 chars', () => {
      const input = { title: 'A'.repeat(101), type: 'feeding', frequency: 'daily', nextDue: '2024-03-15' };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should default reminderMinutesBefore to 30', () => {
      const input = { title: 'Test', type: 'feeding', frequency: 'daily', nextDue: '2024-03-15' };
      const result = createScheduleSchema.parse(input);
      expect(result.reminderMinutesBefore).toBe(30);
    });

    it('should default enabled to true', () => {
      const input = { title: 'Test', type: 'feeding', frequency: 'daily', nextDue: '2024-03-15' };
      const result = createScheduleSchema.parse(input);
      expect(result.enabled).toBe(true);
    });

    it('should validate partial update', () => {
      const input = { title: 'Updated title', enabled: false };
      const result = updateScheduleSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should accept custom interval days for custom frequency', () => {
      const input = {
        title: 'Custom task',
        type: 'other',
        frequency: 'custom',
        nextDue: '2024-03-15',
        customIntervalDays: 3,
      };
      const result = createScheduleSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });
});
