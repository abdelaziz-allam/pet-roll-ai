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

import { requireAdminPermission } from '../../src/middleware/require-admin-permission';

function createRequest(adminUser: any) {
  return { adminUser };
}

function createReply() {
  return {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
}

describe('requireAdminPermission', () => {
  describe('no adminUser on request', () => {
    it('should return 401 when adminUser is null', async () => {
      const middleware = requireAdminPermission('users', 'read');
      const request = createRequest(null);
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 when adminUser is undefined', async () => {
      const middleware = requireAdminPermission('dashboard', 'view');
      const request = createRequest(undefined);
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('super_admin bypass', () => {
    it('should allow super_admin regardless of permissions', async () => {
      const middleware = requireAdminPermission('users', 'delete');
      const request = createRequest({
        uid: 'admin-1',
        email: 'super@test.com',
        role: 'super_admin',
        permissions: {},
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
      expect(reply.send).not.toHaveBeenCalled();
    });

    it('should allow super_admin even with no permissions object', async () => {
      const middleware = requireAdminPermission('settings', 'write');
      const request = createRequest({
        uid: 'admin-1',
        email: 'super@test.com',
        role: 'super_admin',
        permissions: {},
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });

    it('should allow super_admin for any page and action combination', async () => {
      const middleware = requireAdminPermission('nonexistent_page', 'dangerous_action');
      const request = createRequest({
        uid: 'admin-1',
        email: 'super@test.com',
        role: 'super_admin',
        permissions: {},
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });
  });

  describe('page access denied', () => {
    it('should return 403 when page is not in permissions', async () => {
      const middleware = requireAdminPermission('users', 'read');
      const request = createRequest({
        uid: 'admin-2',
        email: 'editor@test.com',
        role: 'editor',
        permissions: {
          dashboard: { access: true, actions: ['view'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'You do not have access to users',
      });
    });

    it('should return 403 when page access is false', async () => {
      const middleware = requireAdminPermission('reports', 'export');
      const request = createRequest({
        uid: 'admin-3',
        email: 'viewer@test.com',
        role: 'viewer',
        permissions: {
          reports: { access: false, actions: ['export'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'You do not have access to reports',
      });
    });

    it('should return 403 when permissions object is empty', async () => {
      const middleware = requireAdminPermission('analytics', 'view');
      const request = createRequest({
        uid: 'admin-4',
        email: 'empty@test.com',
        role: 'editor',
        permissions: {},
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'You do not have access to analytics',
      });
    });
  });

  describe('action permission denied', () => {
    it('should return 403 when action is not in page actions list', async () => {
      const middleware = requireAdminPermission('users', 'delete');
      const request = createRequest({
        uid: 'admin-5',
        email: 'limited@test.com',
        role: 'editor',
        permissions: {
          users: { access: true, actions: ['read', 'write'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: "You do not have permission to perform 'delete' on users",
      });
    });

    it('should return 403 when actions list is empty', async () => {
      const middleware = requireAdminPermission('pets', 'create');
      const request = createRequest({
        uid: 'admin-6',
        email: 'noaccess@test.com',
        role: 'viewer',
        permissions: {
          pets: { access: true, actions: [] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: "You do not have permission to perform 'create' on pets",
      });
    });
  });

  describe('permission granted', () => {
    it('should allow when user has access and action', async () => {
      const middleware = requireAdminPermission('users', 'read');
      const request = createRequest({
        uid: 'admin-7',
        email: 'allowed@test.com',
        role: 'editor',
        permissions: {
          users: { access: true, actions: ['read', 'write', 'delete'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
      expect(reply.send).not.toHaveBeenCalled();
    });

    it('should allow when user has the exact action needed', async () => {
      const middleware = requireAdminPermission('blog', 'publish');
      const request = createRequest({
        uid: 'admin-8',
        email: 'blogger@test.com',
        role: 'content_manager',
        permissions: {
          blog: { access: true, actions: ['publish'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });

    it('should allow access to one page while denying another', async () => {
      const request = createRequest({
        uid: 'admin-9',
        email: 'partial@test.com',
        role: 'editor',
        permissions: {
          blog: { access: true, actions: ['read', 'write'] },
          users: { access: false, actions: [] },
        },
      });
      const reply1 = createReply();
      const reply2 = createReply();

      const blogMiddleware = requireAdminPermission('blog', 'read');
      await blogMiddleware(request as any, reply1 as any);
      expect(reply1.code).not.toHaveBeenCalled();

      const usersMiddleware = requireAdminPermission('users', 'read');
      await usersMiddleware(request as any, reply2 as any);
      expect(reply2.code).toHaveBeenCalledWith(403);
    });
  });

  describe('edge cases', () => {
    it('should be case-sensitive for action matching', async () => {
      const middleware = requireAdminPermission('users', 'Read');
      const request = createRequest({
        uid: 'admin-10',
        email: 'case@test.com',
        role: 'editor',
        permissions: {
          users: { access: true, actions: ['read'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      // 'Read' !== 'read', so should be denied
      expect(reply.code).toHaveBeenCalledWith(403);
    });

    it('should be case-sensitive for page matching', async () => {
      const middleware = requireAdminPermission('Users', 'read');
      const request = createRequest({
        uid: 'admin-11',
        email: 'case2@test.com',
        role: 'editor',
        permissions: {
          users: { access: true, actions: ['read'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      // 'Users' !== 'users', so no page found
      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'You do not have access to Users',
      });
    });

    it('should handle non-super_admin role string correctly', async () => {
      const middleware = requireAdminPermission('data', 'export');
      const request = createRequest({
        uid: 'admin-12',
        email: 'admin@test.com',
        role: 'admin', // not super_admin
        permissions: {
          data: { access: true, actions: ['read'] },
        },
      });
      const reply = createReply();

      await middleware(request as any, reply as any);

      // role is 'admin' not 'super_admin', so must check permissions
      // 'export' not in ['read'], so denied
      expect(reply.code).toHaveBeenCalledWith(403);
    });
  });
});
