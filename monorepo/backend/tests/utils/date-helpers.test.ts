import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../src/config/env', () => ({
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

import {
  addDays,
  addWeeks,
  isOverdue,
  daysUntil,
  toISODate,
  getUserLocalHour,
} from '../../src/utils/date-helpers';

describe('date-helpers', () => {
  describe('addDays', () => {
    it('should add positive days to a date', () => {
      const date = new Date('2024-01-01');
      const result = addDays(date, 5);
      expect(result.toISOString().split('T')[0]).toBe('2024-01-06');
    });

    it('should subtract days when given negative value', () => {
      const date = new Date('2024-01-10');
      const result = addDays(date, -3);
      expect(result.toISOString().split('T')[0]).toBe('2024-01-07');
    });

    it('should return the same date when adding 0 days', () => {
      const date = new Date('2024-06-15');
      const result = addDays(date, 0);
      expect(result.toISOString().split('T')[0]).toBe('2024-06-15');
    });

    it('should not mutate the original date', () => {
      const date = new Date('2024-01-01');
      const originalTime = date.getTime();
      addDays(date, 10);
      expect(date.getTime()).toBe(originalTime);
    });

    it('should handle month boundary crossings', () => {
      const date = new Date('2024-01-30');
      const result = addDays(date, 3);
      expect(result.toISOString().split('T')[0]).toBe('2024-02-02');
    });

    it('should handle year boundary crossings', () => {
      const date = new Date('2024-12-30');
      const result = addDays(date, 5);
      expect(result.toISOString().split('T')[0]).toBe('2025-01-04');
    });

    it('should handle leap year (Feb 28 + 1 in leap year)', () => {
      const date = new Date('2024-02-28');
      const result = addDays(date, 1);
      expect(result.toISOString().split('T')[0]).toBe('2024-02-29');
    });

    it('should handle leap year (Feb 28 + 1 in non-leap year)', () => {
      const date = new Date('2023-02-28');
      const result = addDays(date, 1);
      expect(result.toISOString().split('T')[0]).toBe('2023-03-01');
    });

    it('should handle large positive day values', () => {
      const date = new Date('2024-01-01');
      const result = addDays(date, 365);
      expect(result.toISOString().split('T')[0]).toBe('2024-12-31');
    });

    it('should handle large negative day values', () => {
      const date = new Date('2024-06-01');
      const result = addDays(date, -366);
      expect(result.toISOString().split('T')[0]).toBe('2023-06-01');
    });
  });

  describe('addWeeks', () => {
    it('should add positive weeks to a date', () => {
      const date = new Date('2024-01-01');
      const result = addWeeks(date, 2);
      expect(result.toISOString().split('T')[0]).toBe('2024-01-15');
    });

    it('should subtract weeks when given negative value', () => {
      const date = new Date('2024-01-15');
      const result = addWeeks(date, -1);
      expect(result.toISOString().split('T')[0]).toBe('2024-01-08');
    });

    it('should return the same date when adding 0 weeks', () => {
      const date = new Date('2024-03-10');
      const result = addWeeks(date, 0);
      expect(result.toISOString().split('T')[0]).toBe('2024-03-10');
    });

    it('should not mutate the original date', () => {
      const date = new Date('2024-01-01');
      const originalTime = date.getTime();
      addWeeks(date, 4);
      expect(date.getTime()).toBe(originalTime);
    });

    it('should handle month boundary crossings', () => {
      const date = new Date('2024-01-25');
      const result = addWeeks(date, 2);
      expect(result.toISOString().split('T')[0]).toBe('2024-02-08');
    });

    it('should correctly compute 1 week as 7 days', () => {
      const date = new Date('2024-05-01');
      const result = addWeeks(date, 1);
      expect(result.toISOString().split('T')[0]).toBe('2024-05-08');
    });
  });

  describe('isOverdue', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return true for a past date', () => {
      expect(isOverdue('2024-06-14')).toBe(true);
    });

    it('should return true for a date far in the past', () => {
      expect(isOverdue('2020-01-01')).toBe(true);
    });

    it('should return false for a future date', () => {
      expect(isOverdue('2024-06-16')).toBe(false);
    });

    it('should return false for a date far in the future', () => {
      expect(isOverdue('2030-12-31')).toBe(false);
    });

    it('should handle ISO datetime strings', () => {
      expect(isOverdue('2024-06-15T11:00:00Z')).toBe(true);
      expect(isOverdue('2024-06-15T13:00:00Z')).toBe(false);
    });
  });

  describe('daysUntil', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-15T00:00:00Z'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should return positive days for a future date', () => {
      const result = daysUntil('2024-06-20T00:00:00Z');
      expect(result).toBe(5);
    });

    it('should return negative days for a past date', () => {
      const result = daysUntil('2024-06-10T00:00:00Z');
      expect(result).toBe(-5);
    });

    it('should return 0 for the current date', () => {
      const result = daysUntil('2024-06-15T00:00:00Z');
      expect(result).toBe(0);
    });

    it('should round up partial days (uses Math.ceil)', () => {
      // 1 hour into the future = ceil(1/24) = 1
      const result = daysUntil('2024-06-15T01:00:00Z');
      expect(result).toBe(1);
    });

    it('should handle a date one year in the future', () => {
      const result = daysUntil('2025-06-15T00:00:00Z');
      expect(result).toBe(365);
    });
  });

  describe('toISODate', () => {
    it('should return YYYY-MM-DD format', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      expect(toISODate(date)).toBe('2024-03-15');
    });

    it('should handle start of year', () => {
      const date = new Date('2024-01-01T00:00:00Z');
      expect(toISODate(date)).toBe('2024-01-01');
    });

    it('should handle end of year', () => {
      const date = new Date('2024-12-31T23:59:59Z');
      expect(toISODate(date)).toBe('2024-12-31');
    });

    it('should handle single-digit month and day with zero padding', () => {
      const date = new Date('2024-02-05T00:00:00Z');
      expect(toISODate(date)).toBe('2024-02-05');
    });
  });

  describe('getUserLocalHour', () => {
    it('should return correct hour with positive timezone offset', () => {
      // UTC 10 + offset 3 = 13
      expect(getUserLocalHour(10, 3)).toBe(13);
    });

    it('should return correct hour with negative timezone offset', () => {
      // UTC 10 + offset -5 = 5
      expect(getUserLocalHour(10, -5)).toBe(5);
    });

    it('should wrap around for positive overflow (past 24)', () => {
      // UTC 22 + offset 5 = 27 -> (27 + 24) % 24 = 3
      expect(getUserLocalHour(22, 5)).toBe(3);
    });

    it('should wrap around for negative underflow (below 0)', () => {
      // UTC 2 + offset -5 = -3 -> (-3 + 24) % 24 = 21
      expect(getUserLocalHour(2, -5)).toBe(21);
    });

    it('should return 0 when UTC hour is 0 and offset is 0', () => {
      expect(getUserLocalHour(0, 0)).toBe(0);
    });

    it('should handle offset of 0', () => {
      expect(getUserLocalHour(15, 0)).toBe(15);
    });

    it('should handle UTC hour 0 with large positive offset', () => {
      // UTC 0 + offset 12 = 12
      expect(getUserLocalHour(0, 12)).toBe(12);
    });

    it('should handle UTC hour 23 with offset 1 (wraps to 0)', () => {
      // UTC 23 + offset 1 = 24 -> (24 + 24) % 24 = 0
      expect(getUserLocalHour(23, 1)).toBe(0);
    });

    it('should handle UTC hour 0 with offset -12', () => {
      // UTC 0 + offset -12 = -12 -> (-12 + 24) % 24 = 12
      expect(getUserLocalHour(0, -12)).toBe(12);
    });

    it('should handle half-hour timezone simulation (offset as integer approximation)', () => {
      // For offset +5 (like IST rounded down from 5.5)
      expect(getUserLocalHour(8, 5)).toBe(13);
    });
  });
});
