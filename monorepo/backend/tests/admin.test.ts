import { describe, it, expect, vi } from 'vitest';
import {
  updateUserRoleSchema,
  banUserSchema,
  updateVerificationSchema,
  createAdminSchema,
  updateConfigSchema,
  createReportSchema,
} from '../src/modules/admin/admin.schema';

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

describe('Admin Module', () => {
  describe('updateUserRoleSchema', () => {
    it('should accept valid roles', () => {
      for (const role of ['user', 'breeder', 'admin', 'moderator', 'support', 'viewer']) {
        const result = updateUserRoleSchema.safeParse({ role });
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid role', () => {
      const result = updateUserRoleSchema.safeParse({ role: 'superuser' });
      expect(result.success).toBe(false);
    });
  });

  describe('banUserSchema', () => {
    it('should validate ban with reason', () => {
      const result = banUserSchema.safeParse({ banned: true, reason: 'Spamming' });
      expect(result.success).toBe(true);
    });

    it('should validate unban without reason', () => {
      const result = banUserSchema.safeParse({ banned: false });
      expect(result.success).toBe(true);
    });

    it('should require banned field', () => {
      const result = banUserSchema.safeParse({ reason: 'Spamming' });
      expect(result.success).toBe(false);
    });
  });

  describe('updateVerificationSchema', () => {
    it('should accept approved status', () => {
      const result = updateVerificationSchema.safeParse({ status: 'approved' });
      expect(result.success).toBe(true);
    });

    it('should accept rejected status with reason', () => {
      const result = updateVerificationSchema.safeParse({ status: 'rejected', reason: 'Blurry photo' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid status', () => {
      const result = updateVerificationSchema.safeParse({ status: 'pending' });
      expect(result.success).toBe(false);
    });
  });

  describe('createAdminSchema', () => {
    it('should validate valid admin creation', () => {
      const input = { email: 'admin@test.com', displayName: 'Admin', role: 'admin', password: 'securePass1' };
      const result = createAdminSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const input = { email: 'bad', displayName: 'Admin', role: 'admin', password: 'securePass1' };
      const result = createAdminSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const input = { email: 'a@b.com', displayName: 'Admin', role: 'admin', password: '1234567' };
      const result = createAdminSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept all valid admin roles', () => {
      for (const role of ['admin', 'moderator', 'support', 'viewer']) {
        const input = { email: 'a@b.com', displayName: 'Admin', role, password: 'securePass1' };
        const result = createAdminSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject non-admin roles', () => {
      const input = { email: 'a@b.com', displayName: 'Admin', role: 'user', password: 'securePass1' };
      const result = createAdminSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('updateConfigSchema', () => {
    it('should validate maintenance mode toggle', () => {
      const result = updateConfigSchema.safeParse({ maintenanceMode: true, maintenanceMessage: 'Back soon' });
      expect(result.success).toBe(true);
    });

    it('should validate version update', () => {
      const result = updateConfigSchema.safeParse({ minAppVersion: '1.2.0', latestAppVersion: '1.3.0' });
      expect(result.success).toBe(true);
    });

    it('should validate feature flags', () => {
      const result = updateConfigSchema.safeParse({ featureFlags: { darkMode: true, chat: false } });
      expect(result.success).toBe(true);
    });

    it('should allow empty config update', () => {
      const result = updateConfigSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });

  describe('createReportSchema', () => {
    it('should validate valid report', () => {
      const input = { targetType: 'user', targetId: 'user-123', reason: 'spam' };
      const result = createReportSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should accept all target types', () => {
      for (const targetType of ['user', 'listing', 'message']) {
        const input = { targetType, targetId: 'id-1', reason: 'abuse' };
        const result = createReportSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should accept all reason types', () => {
      for (const reason of ['spam', 'abuse', 'inappropriate', 'fake', 'other']) {
        const input = { targetType: 'user', targetId: 'id-1', reason };
        const result = createReportSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });

    it('should reject invalid target type', () => {
      const input = { targetType: 'comment', targetId: 'id-1', reason: 'spam' };
      const result = createReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject invalid reason', () => {
      const input = { targetType: 'user', targetId: 'id-1', reason: 'dislike' };
      const result = createReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject description longer than 500 chars', () => {
      const input = { targetType: 'user', targetId: 'id-1', reason: 'spam', description: 'A'.repeat(501) };
      const result = createReportSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });
});
