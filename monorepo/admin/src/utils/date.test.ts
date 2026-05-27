import { describe, it, expect } from 'vitest';
import { relativeTime, formatDateRange, checkIsToday, isThisWeek, isThisMonth } from './date';

describe('date utilities', () => {
  describe('relativeTime', () => {
    it('returns relative time for recent dates', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const result = relativeTime(fiveMinutesAgo);
      expect(result).toContain('minutes ago');
    });

    it('returns relative time for hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      const result = relativeTime(twoHoursAgo);
      expect(result).toContain('hours ago');
    });
  });

  describe('formatDateRange', () => {
    it('formats same-month range', () => {
      const result = formatDateRange('2024-03-10', '2024-03-20');
      expect(result).toContain('Mar');
      expect(result).toContain('10');
      expect(result).toContain('20');
    });

    it('formats different-month same-year range', () => {
      const result = formatDateRange('2024-01-15', '2024-03-20');
      expect(result).toContain('Jan');
      expect(result).toContain('Mar');
    });

    it('formats different-year range', () => {
      const result = formatDateRange('2023-12-01', '2024-01-15');
      expect(result).toContain('2023');
      expect(result).toContain('2024');
    });
  });

  describe('checkIsToday', () => {
    it('returns true for today', () => {
      expect(checkIsToday(new Date())).toBe(true);
    });

    it('returns false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(checkIsToday(yesterday)).toBe(false);
    });

    it('handles string dates', () => {
      const today = new Date().toISOString();
      expect(checkIsToday(today)).toBe(true);
    });
  });

  describe('isThisWeek', () => {
    it('returns true for today', () => {
      expect(isThisWeek(new Date())).toBe(true);
    });

    it('returns false for dates far in the past', () => {
      const longAgo = new Date('2020-01-01');
      expect(isThisWeek(longAgo)).toBe(false);
    });
  });

  describe('isThisMonth', () => {
    it('returns true for today', () => {
      expect(isThisMonth(new Date())).toBe(true);
    });

    it('returns false for different month', () => {
      const differentMonth = new Date();
      differentMonth.setMonth(differentMonth.getMonth() - 2);
      expect(isThisMonth(differentMonth)).toBe(false);
    });

    it('returns false for different year same month number', () => {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      expect(isThisMonth(lastYear)).toBe(false);
    });
  });
});
