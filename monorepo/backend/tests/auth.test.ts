import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import { registerSchema, updateProfileSchema } from '../src/modules/auth/auth.schema';

const JWT_SECRET = 'test-secret-minimum-16-chars';

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

describe('Auth Service', () => {
  describe('Token Generation', () => {
    it('should generate valid access token', () => {
      const token = jwt.sign({ uid: 'user-1', email: 'test@example.com' }, JWT_SECRET, { expiresIn: '1h' });
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      expect(decoded.uid).toBe('user-1');
      expect(decoded.email).toBe('test@example.com');
    });

    it('should generate valid refresh token', () => {
      const token = jwt.sign({ uid: 'user-1', type: 'refresh' }, JWT_SECRET, { expiresIn: '7d' });
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      expect(decoded.uid).toBe('user-1');
      expect(decoded.type).toBe('refresh');
    });

    it('should reject expired tokens', () => {
      const token = jwt.sign({ uid: 'user-1' }, JWT_SECRET, { expiresIn: '-1s' });
      expect(() => jwt.verify(token, JWT_SECRET)).toThrow();
    });

    it('should reject tokens with invalid secret', () => {
      const token = jwt.sign({ uid: 'user-1' }, 'wrong-secret-16-chars-plus');
      expect(() => jwt.verify(token, JWT_SECRET)).toThrow();
    });
  });

  describe('Register Input Validation', () => {
    it('should validate valid registration input', () => {
      const input = { displayName: 'John Doe', phone: '+1234567890', timezone: 'UTC' };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject empty display name', () => {
      const input = { displayName: '', timezone: 'UTC' };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject display name too short', () => {
      const input = { displayName: 'A', timezone: 'UTC' };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject display name too long (>50 chars)', () => {
      const input = { displayName: 'A'.repeat(51), timezone: 'UTC' };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should default timezone to UTC when not provided', () => {
      const input = { displayName: 'John Doe' };
      const result = registerSchema.parse(input);
      expect(result.timezone).toBe('UTC');
    });

    it('should allow optional phone', () => {
      const input = { displayName: 'John Doe' };
      const result = registerSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('Update Profile Validation', () => {
    it('should validate partial update', () => {
      const input = { displayName: 'New Name' };
      const result = updateProfileSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should validate settings update', () => {
      const input = { settings: { notifications: false, theme: 'dark' } };
      const result = updateProfileSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid theme value', () => {
      const input = { settings: { theme: 'blue' } };
      const result = updateProfileSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid avatar URL', () => {
      const input = { avatar: 'not-a-url' };
      const result = updateProfileSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept valid avatar URL', () => {
      const input = { avatar: 'https://example.com/avatar.png' };
      const result = updateProfileSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should allow empty object (no changes)', () => {
      const result = updateProfileSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
