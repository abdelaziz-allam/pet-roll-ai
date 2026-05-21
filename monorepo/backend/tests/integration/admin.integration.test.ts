import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedAdminUser, seedSuperAdmin, clearStore, seedStore } from './helpers';

describe('Admin API Integration', () => {
  let app: FastifyInstance;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
    seedAdminUser('admin-1');
    seedUser('user-1', { email: 'john@test.com' });
    adminToken = generateToken('admin-1', 'admin-1@admin.com');
    userToken = generateToken('user-1', 'john@test.com');
  });

  describe('GET /api/v1/admin/stats', () => {
    it('returns stats for admin user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 403 for regular user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats',
        headers: { authorization: `Bearer ${userToken}` },
      });

      expect(res.statusCode).toBe(403);
    });

    it('returns 401 without auth', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats',
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/v1/admin/stats/growth', () => {
    it('returns growth stats with default period', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats/growth',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('accepts period query parameter', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats/growth?period=week',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /api/v1/admin/users', () => {
    it('returns paginated user list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/users',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('filters by status', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/users?status=active',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 403 for regular user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/users',
        headers: { authorization: `Bearer ${userToken}` },
      });

      expect(res.statusCode).toBe(403);
    });
  });

  describe('GET /api/v1/admin/users/:id', () => {
    it('returns a specific user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/users/user-1',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 404 for non-existent user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/users/fake-user',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/admin/users/:id/role', () => {
    it('updates user role', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/admin/users/user-1/role',
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { role: 'moderator' },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /api/v1/admin/users/:id/ban', () => {
    it('bans a user with reason', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/admin/users/user-1/ban',
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { reason: 'Violation of community guidelines' },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /api/v1/admin/users/:id', () => {
    it('deletes a user', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/admin/users/user-1',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });

  describe('GET /api/v1/admin/verifications', () => {
    it('returns pending verifications', async () => {
      seedStore('verification_requests', 'vr-1', {
        userId: 'user-1',
        status: 'pending',
        documents: ['doc1.pdf'],
        createdAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/verifications',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('filters by status', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/verifications?status=approved',
        headers: { authorization: `Bearer ${adminToken}` },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /api/v1/admin/verifications/:id', () => {
    it('approves a verification request', async () => {
      seedStore('verification_requests', 'vr-1', {
        userId: 'user-1',
        status: 'pending',
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/admin/verifications/vr-1',
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { approved: true },
      });

      expect(res.statusCode).toBe(200);
    });

    it('rejects a verification request', async () => {
      seedStore('verification_requests', 'vr-1', {
        userId: 'user-1',
        status: 'pending',
      });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/admin/verifications/vr-1',
        headers: { authorization: `Bearer ${adminToken}` },
        payload: { approved: false },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('Role-based access control', () => {
    it('allows super_admin access', async () => {
      seedSuperAdmin('sa-1');
      const saToken = generateToken('sa-1', 'sa-1@admin.com');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats',
        headers: { authorization: `Bearer ${saToken}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('blocks moderator from admin routes', async () => {
      seedUser('mod-1', { role: 'moderator', email: 'mod@test.com' });
      const modToken = generateToken('mod-1', 'mod@test.com');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/stats',
        headers: { authorization: `Bearer ${modToken}` },
      });

      expect(res.statusCode).toBe(403);
    });
  });
});
