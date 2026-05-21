import { describe, it, expect } from 'vitest';
import { formatDate, formatNumber, formatPercent, getRoleBadgeColor, getStatusBadgeColor, truncate } from './format';

describe('format utilities', () => {
  describe('formatDate', () => {
    it('formats date with default format', () => {
      const result = formatDate('2024-03-15');
      expect(result).toBe('Mar 15, 2024');
    });

    it('formats date with custom format', () => {
      const result = formatDate('2024-03-15', 'YYYY-MM-DD');
      expect(result).toBe('2024-03-15');
    });

    it('handles Date objects', () => {
      const result = formatDate(new Date(2024, 2, 15));
      expect(result).toBe('Mar 15, 2024');
    });

    it('handles timestamps', () => {
      const result = formatDate(1710460800000);
      expect(result).toContain('2024');
    });
  });

  describe('formatNumber', () => {
    it('formats small numbers', () => {
      expect(formatNumber(42)).toBe('42');
    });

    it('formats large numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
    });

    it('formats zero', () => {
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatPercent', () => {
    it('formats decimal to percent', () => {
      expect(formatPercent(0.856)).toBe('85.6%');
    });

    it('formats 1 as 100%', () => {
      expect(formatPercent(1)).toBe('100.0%');
    });

    it('formats 0 as 0.0%', () => {
      expect(formatPercent(0)).toBe('0.0%');
    });

    it('formats small decimals', () => {
      expect(formatPercent(0.003)).toBe('0.3%');
    });
  });

  describe('getRoleBadgeColor', () => {
    it('returns gold for super_admin', () => {
      expect(getRoleBadgeColor('super_admin')).toBe('gold');
    });

    it('returns purple for admin', () => {
      expect(getRoleBadgeColor('admin')).toBe('purple');
    });

    it('returns blue for moderator', () => {
      expect(getRoleBadgeColor('moderator')).toBe('blue');
    });

    it('returns green for support', () => {
      expect(getRoleBadgeColor('support')).toBe('green');
    });

    it('returns default for unknown role', () => {
      expect(getRoleBadgeColor('unknown')).toBe('default');
    });
  });

  describe('getStatusBadgeColor', () => {
    it('returns green for active', () => {
      expect(getStatusBadgeColor('active')).toBe('green');
    });

    it('returns red for banned', () => {
      expect(getStatusBadgeColor('banned')).toBe('red');
    });

    it('returns grey for deleted', () => {
      expect(getStatusBadgeColor('deleted')).toBe('grey');
    });

    it('returns default for unknown status', () => {
      expect(getStatusBadgeColor('pending')).toBe('default');
    });
  });

  describe('truncate', () => {
    it('returns original string if within limit', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('truncates long strings with ellipsis', () => {
      expect(truncate('hello world this is a long string', 10)).toBe('hello worl...');
    });

    it('handles exact length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });

    it('handles empty string', () => {
      expect(truncate('', 10)).toBe('');
    });
  });
});
