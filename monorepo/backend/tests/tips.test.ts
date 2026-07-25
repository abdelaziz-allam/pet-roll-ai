import { describe, it, expect, vi } from 'vitest';
import { createTipSchema, updateTipSchema } from '../src/modules/tips/tips.schema';

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

describe('Tips Module', () => {
  describe('createTipSchema', () => {
    it('should validate a valid tip', () => {
      const input = { title: 'Keep Water Fresh', body: 'Change your pet water bowl daily for better hydration.', category: 'health' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should accept all valid categories', () => {
      for (const category of ['health', 'nutrition', 'grooming', 'training', 'safety', 'general']) {
        const input = { title: 'Tip Title', body: 'Tip body content here', category };
        const result = createTipSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid category', () => {
      const input = { title: 'Tip', body: 'Tip body content', category: 'random' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject title shorter than 2 chars', () => {
      const input = { title: 'A', body: 'Tip body content', category: 'health' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject title longer than 100 chars', () => {
      const input = { title: 'A'.repeat(101), body: 'Tip body content', category: 'health' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject body shorter than 5 chars', () => {
      const input = { title: 'Tip Title', body: 'Tip', category: 'health' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject body longer than 500 chars', () => {
      const input = { title: 'Tip Title', body: 'A'.repeat(501), category: 'health' };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should default active to true', () => {
      const input = { title: 'Tip Title', body: 'Tip body content here', category: 'health' };
      const result = createTipSchema.parse(input);
      expect(result.active).toBe(true);
    });

    it('should accept optional species array', () => {
      const input = { title: 'Tip Title', body: 'Tip body content here', category: 'health', species: ['dog', 'cat'] };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(true);
      expect(result.data!.species).toEqual(['dog', 'cat']);
    });

    it('should accept empty species array', () => {
      const input = { title: 'Tip Title', body: 'Tip body content here', category: 'health', species: [] };
      const result = createTipSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('updateTipSchema', () => {
    it('should allow partial update with title only', () => {
      const result = updateTipSchema.safeParse({ title: 'New Title' });
      expect(result.success).toBe(true);
    });

    it('should allow partial update with active toggle', () => {
      const result = updateTipSchema.safeParse({ active: false });
      expect(result.success).toBe(true);
    });

    it('should allow empty update', () => {
      const result = updateTipSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should still validate constraints on partial', () => {
      const result = updateTipSchema.safeParse({ title: 'A' });
      expect(result.success).toBe(false);
    });
  });
});
