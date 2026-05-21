import { describe, it, expect, vi } from 'vitest';
import { requireAuth } from '../src/middleware/require-auth';
import { requireRole } from '../src/middleware/require-role';

describe('Middleware', () => {
  describe('requireAuth', () => {
    it('should call reply with 401 when user is null', async () => {
      const request = { user: null };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await requireAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    });

    it('should not call reply when user exists', async () => {
      const request = { user: { uid: 'user-1', email: 'test@test.com', role: 'user' } };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await requireAuth(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });
  });

  describe('requireRole', () => {
    it('should return 401 when user is null', async () => {
      const middleware = requireRole('admin');
      const request = { user: null };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
    });

    it('should return 403 when user lacks required role', async () => {
      const middleware = requireRole('admin', 'super_admin');
      const request = { user: { uid: 'user-1', role: 'user' } };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await middleware(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'Insufficient permissions',
      });
    });

    it('should pass when user has admin role', async () => {
      const middleware = requireRole('admin', 'super_admin');
      const request = { user: { uid: 'user-1', role: 'admin' } };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });

    it('should pass when user has super_admin role', async () => {
      const middleware = requireRole('admin', 'super_admin');
      const request = { user: { uid: 'user-1', role: 'super_admin' } };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });

    it('should check single role correctly', async () => {
      const middleware = requireRole('moderator');
      const request = { user: { uid: 'user-1', role: 'moderator' } };
      const reply = { code: vi.fn().mockReturnThis(), send: vi.fn() };

      await middleware(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
    });
  });
});
