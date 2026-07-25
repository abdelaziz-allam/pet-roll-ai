import { describe, it, expect, vi } from 'vitest';
import { chatRoomQuerySchema } from '../src/modules/chat/chat.schema';

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

describe('Chat Module', () => {
  describe('chatRoomQuerySchema', () => {
    it('should validate with default limit', () => {
      const result = chatRoomQuerySchema.safeParse({});
      expect(result.success).toBe(true);
      expect(result.data!.limit).toBe(20);
    });

    it('should accept custom limit', () => {
      const result = chatRoomQuerySchema.safeParse({ limit: 10 });
      expect(result.success).toBe(true);
      expect(result.data!.limit).toBe(10);
    });

    it('should coerce string limit to number', () => {
      const result = chatRoomQuerySchema.safeParse({ limit: '15' });
      expect(result.success).toBe(true);
      expect(result.data!.limit).toBe(15);
    });

    it('should reject limit below 1', () => {
      const result = chatRoomQuerySchema.safeParse({ limit: 0 });
      expect(result.success).toBe(false);
    });

    it('should reject limit above 50', () => {
      const result = chatRoomQuerySchema.safeParse({ limit: 51 });
      expect(result.success).toBe(false);
    });

    it('should accept optional cursor', () => {
      const result = chatRoomQuerySchema.safeParse({ cursor: 'abc123' });
      expect(result.success).toBe(true);
      expect(result.data!.cursor).toBe('abc123');
    });

    it('should accept without cursor', () => {
      const result = chatRoomQuerySchema.safeParse({ limit: 5 });
      expect(result.success).toBe(true);
      expect(result.data!.cursor).toBeUndefined();
    });
  });
});
