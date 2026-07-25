import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';

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

const mockGet = vi.fn();
const mockDoc = vi.fn().mockReturnValue({ get: mockGet });
const mockCollection = vi.fn().mockReturnValue({ doc: mockDoc });

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: (...args: any[]) => mockCollection(...args),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  messaging: { send: vi.fn() },
  FieldValue: {
    serverTimestamp: vi.fn(),
    arrayUnion: vi.fn(),
    arrayRemove: vi.fn(),
    increment: vi.fn(),
    delete: vi.fn(),
  },
  Timestamp: { now: vi.fn() },
}));

import { requireAdminAuth } from '../../src/middleware/require-admin-auth';

const JWT_SECRET = 'test-secret-minimum-16-chars';

function createToken(payload: object, options?: jwt.SignOptions): string {
  return jwt.sign(payload, JWT_SECRET, options);
}

function createRequest(authHeader?: string) {
  return {
    headers: { authorization: authHeader },
    adminUser: null as any,
  };
}

function createReply() {
  const reply = {
    code: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
  };
  return reply;
}

describe('requireAdminAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('missing or invalid authorization header', () => {
    it('should return 401 when authorization header is missing', async () => {
      const request = createRequest(undefined);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Admin authentication required',
      });
    });

    it('should return 401 when authorization header is empty string', async () => {
      const request = createRequest('');
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Admin authentication required',
      });
    });

    it('should return 401 when authorization header does not start with Bearer', async () => {
      const request = createRequest('Basic abc123');
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Admin authentication required',
      });
    });

    it('should return 401 when authorization header is "Bearer" without token', async () => {
      const request = createRequest('Bearer');
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Admin authentication required',
      });
    });
  });

  describe('invalid token', () => {
    it('should return 401 when token is malformed', async () => {
      const request = createRequest('Bearer invalid-token-garbage');
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    });

    it('should return 401 when token is expired', async () => {
      const token = createToken(
        { uid: 'admin-1', email: 'admin@test.com', type: 'admin' },
        { expiresIn: '0s' }
      );
      // Wait a tiny bit to ensure expiration
      await new Promise((resolve) => setTimeout(resolve, 10));

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    });

    it('should return 401 when token is signed with wrong secret', async () => {
      const token = jwt.sign(
        { uid: 'admin-1', email: 'admin@test.com', type: 'admin' },
        'wrong-secret-key-here!'
      );
      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    });
  });

  describe('token type validation', () => {
    it('should return 401 when token type is not admin', async () => {
      const token = createToken({ uid: 'user-1', email: 'user@test.com', type: 'user' });
      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid token type for admin',
      });
    });

    it('should return 401 when token type is empty string', async () => {
      const token = createToken({ uid: 'user-1', email: 'user@test.com', type: '' });
      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid token type for admin',
      });
    });
  });

  describe('admin user document validation', () => {
    it('should return 401 when admin document does not exist', async () => {
      const token = createToken({ uid: 'admin-1', email: 'admin@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({ exists: false, data: () => null });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(mockCollection).toHaveBeenCalledWith('admin_users');
      expect(mockDoc).toHaveBeenCalledWith('admin-1');
      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Admin user not found',
      });
    });

    it('should return 403 when admin account is suspended', async () => {
      const token = createToken({ uid: 'admin-2', email: 'suspended@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          status: 'suspended',
          role: 'admin',
          permissions: {},
        }),
      });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'Admin account is suspended',
      });
    });

    it('should return 403 when admin status is inactive', async () => {
      const token = createToken({ uid: 'admin-3', email: 'inactive@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          status: 'inactive',
          role: 'admin',
          permissions: {},
        }),
      });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(403);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Forbidden',
        message: 'Admin account is suspended',
      });
    });
  });

  describe('successful authentication', () => {
    it('should set adminUser on request for active admin', async () => {
      const token = createToken({ uid: 'admin-1', email: 'admin@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          status: 'active',
          role: 'super_admin',
          permissions: { users: { access: true, actions: ['read', 'write'] } },
        }),
      });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
      expect(request.adminUser).toEqual({
        uid: 'admin-1',
        email: 'admin@test.com',
        role: 'super_admin',
        permissions: { users: { access: true, actions: ['read', 'write'] } },
      });
    });

    it('should default permissions to empty object when not present in document', async () => {
      const token = createToken({ uid: 'admin-5', email: 'new@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          status: 'active',
          role: 'editor',
          // no permissions field
        }),
      });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
      expect(request.adminUser).toEqual({
        uid: 'admin-5',
        email: 'new@test.com',
        role: 'editor',
        permissions: {},
      });
    });

    it('should not call reply.code or reply.send on success', async () => {
      const token = createToken({ uid: 'admin-1', email: 'admin@test.com', type: 'admin' });
      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => ({
          status: 'active',
          role: 'admin',
          permissions: {},
        }),
      });

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).not.toHaveBeenCalled();
      expect(reply.send).not.toHaveBeenCalled();
    });
  });

  describe('Firestore errors', () => {
    it('should return 401 when Firestore throws an error', async () => {
      const token = createToken({ uid: 'admin-1', email: 'admin@test.com', type: 'admin' });
      mockGet.mockRejectedValueOnce(new Error('Firestore unavailable'));

      const request = createRequest(`Bearer ${token}`);
      const reply = createReply();

      await requireAdminAuth(request as any, reply as any);

      expect(reply.code).toHaveBeenCalledWith(401);
      expect(reply.send).toHaveBeenCalledWith({
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    });
  });
});
