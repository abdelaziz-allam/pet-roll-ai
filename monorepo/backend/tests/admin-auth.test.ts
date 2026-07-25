import { describe, it, expect, vi } from 'vitest';
import {
  adminLoginSchema,
  adminForgotPasswordSchema,
  adminResetPasswordSchema,
  adminChangePasswordSchema,
  createAdminUserSchema,
  updateAdminUserSchema,
} from '../src/modules/admin-auth/admin-auth.schema';

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

describe('Admin Auth Module', () => {
  describe('adminLoginSchema', () => {
    it('should validate valid login', () => {
      const result = adminLoginSchema.safeParse({ email: 'admin@petfolioo.com', password: 'securePass123' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = adminLoginSchema.safeParse({ email: 'not-an-email', password: 'securePass123' });
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const result = adminLoginSchema.safeParse({ email: 'admin@petfolioo.com', password: '12345' });
      expect(result.success).toBe(false);
    });

    it('should reject missing email', () => {
      const result = adminLoginSchema.safeParse({ password: 'securePass123' });
      expect(result.success).toBe(false);
    });

    it('should reject missing password', () => {
      const result = adminLoginSchema.safeParse({ email: 'admin@petfolioo.com' });
      expect(result.success).toBe(false);
    });
  });

  describe('adminForgotPasswordSchema', () => {
    it('should validate valid email', () => {
      const result = adminForgotPasswordSchema.safeParse({ email: 'user@example.com' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = adminForgotPasswordSchema.safeParse({ email: 'bad' });
      expect(result.success).toBe(false);
    });
  });

  describe('adminResetPasswordSchema', () => {
    it('should validate valid reset input', () => {
      const result = adminResetPasswordSchema.safeParse({ token: 'abc123', newPassword: 'newPass123' });
      expect(result.success).toBe(true);
    });

    it('should reject empty token', () => {
      const result = adminResetPasswordSchema.safeParse({ token: '', newPassword: 'newPass123' });
      expect(result.success).toBe(false);
    });

    it('should reject short new password', () => {
      const result = adminResetPasswordSchema.safeParse({ token: 'abc123', newPassword: '1234567' });
      expect(result.success).toBe(false);
    });
  });

  describe('adminChangePasswordSchema', () => {
    it('should validate valid change password input', () => {
      const result = adminChangePasswordSchema.safeParse({ currentPassword: 'oldPass', newPassword: 'newPass123' });
      expect(result.success).toBe(true);
    });

    it('should reject empty current password', () => {
      const result = adminChangePasswordSchema.safeParse({ currentPassword: '', newPassword: 'newPass123' });
      expect(result.success).toBe(false);
    });

    it('should reject short new password', () => {
      const result = adminChangePasswordSchema.safeParse({ currentPassword: 'oldPass', newPassword: '1234567' });
      expect(result.success).toBe(false);
    });
  });

  describe('createAdminUserSchema', () => {
    it('should validate valid admin user creation', () => {
      const input = {
        email: 'new-admin@petfolioo.com',
        password: 'strongPass1',
        displayName: 'John Admin',
        role: 'admin',
        permissions: {
          dashboard: { access: true, actions: ['view'] },
          pets: { access: true, actions: ['view', 'edit'] },
        },
      };
      const result = createAdminUserSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject invalid role', () => {
      const input = {
        email: 'new@test.com',
        password: 'strongPass1',
        displayName: 'Test',
        role: 'user',
        permissions: {},
      };
      const result = createAdminUserSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject short displayName', () => {
      const input = {
        email: 'new@test.com',
        password: 'strongPass1',
        displayName: 'A',
        role: 'admin',
        permissions: {},
      };
      const result = createAdminUserSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject displayName longer than 50 chars', () => {
      const input = {
        email: 'new@test.com',
        password: 'strongPass1',
        displayName: 'A'.repeat(51),
        role: 'admin',
        permissions: {},
      };
      const result = createAdminUserSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept all valid roles', () => {
      for (const role of ['super_admin', 'admin', 'moderator', 'viewer']) {
        const input = {
          email: 'test@test.com',
          password: 'strongPass1',
          displayName: 'Test User',
          role,
          permissions: {},
        };
        const result = createAdminUserSchema.safeParse(input);
        expect(result.success).toBe(true);
      }
    });
  });

  describe('updateAdminUserSchema', () => {
    it('should allow partial update with role only', () => {
      const result = updateAdminUserSchema.safeParse({ role: 'moderator' });
      expect(result.success).toBe(true);
    });

    it('should allow partial update with status', () => {
      const result = updateAdminUserSchema.safeParse({ status: 'suspended' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid status', () => {
      const result = updateAdminUserSchema.safeParse({ status: 'deleted' });
      expect(result.success).toBe(false);
    });

    it('should allow empty update', () => {
      const result = updateAdminUserSchema.safeParse({});
      expect(result.success).toBe(true);
    });
  });
});
