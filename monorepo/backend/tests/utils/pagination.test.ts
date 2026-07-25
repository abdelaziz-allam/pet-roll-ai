import { describe, it, expect, vi } from 'vitest';

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

import { paginate, getOffset } from '../../src/utils/pagination';

describe('pagination', () => {
  describe('paginate', () => {
    it('should return correct pagination structure with default page and limit', () => {
      const data = [1, 2, 3];
      const result = paginate(data, 50, {});
      expect(result).toEqual({
        data: [1, 2, 3],
        total: 50,
        page: 1,
        limit: 20,
        totalPages: 3,
      });
    });

    it('should use provided page and limit', () => {
      const data = ['a', 'b'];
      const result = paginate(data, 100, { page: 3, limit: 10 });
      expect(result).toEqual({
        data: ['a', 'b'],
        total: 100,
        page: 3,
        limit: 10,
        totalPages: 10,
      });
    });

    it('should handle empty data array', () => {
      const result = paginate([], 0, { page: 1, limit: 20 });
      expect(result).toEqual({
        data: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
    });

    it('should calculate totalPages correctly with Math.ceil', () => {
      const data = [1, 2, 3, 4, 5];
      const result = paginate(data, 21, { page: 1, limit: 10 });
      expect(result.totalPages).toBe(3); // ceil(21/10) = 3
    });

    it('should calculate totalPages as 1 when total equals limit', () => {
      const data = Array(10).fill(null);
      const result = paginate(data, 10, { page: 1, limit: 10 });
      expect(result.totalPages).toBe(1);
    });

    it('should calculate totalPages as 1 when total is less than limit', () => {
      const data = [1, 2, 3];
      const result = paginate(data, 3, { page: 1, limit: 20 });
      expect(result.totalPages).toBe(1);
    });

    it('should handle limit of 1', () => {
      const data = [{ id: 'item-1' }];
      const result = paginate(data, 50, { page: 5, limit: 1 });
      expect(result).toEqual({
        data: [{ id: 'item-1' }],
        total: 50,
        page: 5,
        limit: 1,
        totalPages: 50,
      });
    });

    it('should handle large page numbers', () => {
      const data: string[] = [];
      const result = paginate(data, 1000, { page: 999, limit: 10 });
      expect(result.page).toBe(999);
      expect(result.totalPages).toBe(100);
    });

    it('should handle page=0 by defaulting to 1', () => {
      const data = [1];
      const result = paginate(data, 10, { page: 0, limit: 5 });
      // page: 0 is falsy, so query.page || 1 = 1
      expect(result.page).toBe(1);
    });

    it('should handle limit=0 by defaulting to 20', () => {
      const data = [1];
      const result = paginate(data, 100, { page: 2, limit: 0 });
      // limit: 0 is falsy, so query.limit || 20 = 20
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(5);
    });

    it('should preserve data types in generic output', () => {
      interface Item {
        id: string;
        name: string;
      }
      const data: Item[] = [
        { id: '1', name: 'Cat' },
        { id: '2', name: 'Dog' },
      ];
      const result = paginate<Item>(data, 2, { page: 1, limit: 10 });
      expect(result.data).toEqual(data);
      expect(result.data[0].id).toBe('1');
    });
  });

  describe('getOffset', () => {
    it('should return 0 for the first page with defaults', () => {
      expect(getOffset({})).toBe(0);
    });

    it('should return 0 for page 1', () => {
      expect(getOffset({ page: 1, limit: 20 })).toBe(0);
    });

    it('should return correct offset for page 2', () => {
      expect(getOffset({ page: 2, limit: 20 })).toBe(20);
    });

    it('should return correct offset for page 3 with limit 10', () => {
      expect(getOffset({ page: 3, limit: 10 })).toBe(20);
    });

    it('should use default limit of 20 when not provided', () => {
      expect(getOffset({ page: 3 })).toBe(40);
    });

    it('should use default page of 1 when not provided', () => {
      expect(getOffset({ limit: 10 })).toBe(0);
    });

    it('should handle page=0 by defaulting to page 1', () => {
      // page: 0 is falsy -> defaults to 1
      expect(getOffset({ page: 0, limit: 10 })).toBe(0);
    });

    it('should handle limit=0 by defaulting to 20', () => {
      // limit: 0 is falsy -> defaults to 20
      expect(getOffset({ page: 2, limit: 0 })).toBe(20);
    });

    it('should handle large page numbers', () => {
      expect(getOffset({ page: 100, limit: 50 })).toBe(4950);
    });

    it('should handle limit of 1', () => {
      expect(getOffset({ page: 5, limit: 1 })).toBe(4);
    });
  });
});
