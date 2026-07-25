import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/admin-auth/admin-auth.service', () => ({
  adminAuthService: {
    login: vi.fn().mockResolvedValue({ accessToken: 'admin-token', refreshToken: 'admin-refresh', user: { uid: 'admin-1', email: 'admin@test.com' } }),
    forgotPassword: vi.fn().mockResolvedValue({ message: 'Reset link sent' }),
    resetPassword: vi.fn().mockResolvedValue({ message: 'Password reset successful' }),
    seedSuperAdmin: vi.fn().mockResolvedValue({ message: 'Super admin seeded' }),
    getMe: vi.fn().mockResolvedValue({ uid: 'admin-1', email: 'admin@test.com', role: 'super_admin' }),
    changePassword: vi.fn().mockResolvedValue({ message: 'Password changed' }),
    refreshToken: vi.fn().mockResolvedValue({ accessToken: 'new-admin-token', refreshToken: 'new-admin-refresh' }),
    listAdminUsers: vi.fn().mockResolvedValue({ data: [{ uid: 'admin-1', email: 'admin@test.com' }], total: 1 }),
    getAdminUser: vi.fn().mockResolvedValue({ uid: 'admin-1', email: 'admin@test.com' }),
    createAdminUser: vi.fn().mockResolvedValue({ uid: 'admin-new', email: 'new@admin.com' }),
    updateAdminUser: vi.fn().mockResolvedValue({ uid: 'admin-1', email: 'admin@test.com' }),
    deleteAdminUser: vi.fn().mockResolvedValue({ message: 'Admin user deleted' }),
  },
}));

vi.mock('../../src/modules/admin-auth/admin-auth.schema', () => ({
  adminLoginSchema: { parse: vi.fn((body: any) => body) },
  adminForgotPasswordSchema: { parse: vi.fn((body: any) => body) },
  adminResetPasswordSchema: { parse: vi.fn((body: any) => body) },
  adminChangePasswordSchema: { parse: vi.fn((body: any) => body) },
  createAdminUserSchema: { parse: vi.fn((body: any) => body) },
  updateAdminUserSchema: { parse: vi.fn((body: any) => body) },
  ADMIN_PAGES: ['dashboard', 'users', 'pets', 'admin_users'],
  PAGE_ACTIONS: ['view', 'create', 'edit', 'delete'],
}));

vi.mock('../../src/middleware/require-admin-auth', () => ({
  requireAdminAuth: vi.fn().mockImplementation(async (req: any) => {
    req.adminUser = { uid: 'admin-1', email: 'admin@test.com', role: 'super_admin', permissions: {} };
  }),
}));

vi.mock('../../src/middleware/require-admin-permission', () => ({
  requireAdminPermission: vi.fn().mockImplementation(() => async () => {}),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

vi.mock('../../src/config/firebase', () => ({
  db: { collection: vi.fn() },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: { serverTimestamp: vi.fn(), increment: vi.fn() },
}));

import { adminAuthRoutes } from '../../src/modules/admin-auth/admin-auth.routes';

describe('Admin Auth Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(adminAuthRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('POST /login', () => {
    it('logs in admin and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/login',
        payload: { email: 'admin@test.com', password: 'password123' },
      });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.accessToken).toBeDefined();
    });
  });

  describe('POST /forgot-password', () => {
    it('sends reset link and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/forgot-password',
        payload: { email: 'admin@test.com' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /reset-password', () => {
    it('resets password and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/reset-password',
        payload: { token: 'reset-token', newPassword: 'newpassword123' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /seed', () => {
    it('seeds super admin and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/seed' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /permissions-config', () => {
    it('returns permissions config with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/permissions-config' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.pages).toBeDefined();
      expect(body.actions).toBeDefined();
    });
  });

  describe('GET /me', () => {
    it('returns admin profile with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/me' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.email).toBe('admin@test.com');
    });
  });

  describe('POST /change-password', () => {
    it('changes password and returns 200', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/change-password',
        payload: { currentPassword: 'old-pass', newPassword: 'new-pass' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /refresh', () => {
    it('returns 400 when refresh token is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/refresh',
        payload: {},
      });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /users', () => {
    it('returns admin users with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /users/:id', () => {
    it('returns admin user by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/users/admin-1' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /users', () => {
    it('creates admin user and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: { email: 'new@admin.com', name: 'New Admin', password: 'pass123', role: 'admin' },
      });
      expect(res.statusCode).toBe(201);
    });
  });

  describe('PUT /users/:id', () => {
    it('updates admin user and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/users/admin-1',
        payload: { name: 'Updated Admin' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes admin user and returns 200', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/users/admin-1' });
      expect(res.statusCode).toBe(200);
    });
  });
});
