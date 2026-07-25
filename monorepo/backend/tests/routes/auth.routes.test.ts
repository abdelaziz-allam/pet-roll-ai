import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

// Use vi.hoisted so mock references are available when vi.mock factories run (hoisted)
const { mockAuthVerifyIdToken, mockCollection } = vi.hoisted(() => {
  const mockAuthVerifyIdToken = vi.fn().mockResolvedValue({ uid: 'firebase-uid-1', email: 'test@example.com' });

  const mockCollection = {
    doc: vi.fn().mockReturnThis(),
    add: vi.fn().mockResolvedValue({ id: 'new-user-id' }),
    get: vi.fn().mockResolvedValue({
      exists: true,
      id: 'user-1',
      data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }),
      empty: false,
      size: 1,
      docs: [{ id: 'user-1', data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }), ref: { id: 'user-1' } }],
    }),
    set: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    count: vi.fn().mockReturnValue({ get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }) }),
  };

  return { mockAuthVerifyIdToken, mockCollection };
});

// Mock requireAuth to inject user for /me routes
vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async () => {}),
}));

// Mock env
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

// Mock timezone utility (both with and without .js extension for import resolution)
vi.mock('../../src/utils/timezone-country', () => ({
  resolveTimezoneCountrySync: vi.fn().mockReturnValue({ timezone: 'UTC', country: null }),
}));
vi.mock('../../src/utils/timezone-country.js', () => ({
  resolveTimezoneCountrySync: vi.fn().mockReturnValue({ timezone: 'UTC', country: null }),
}));

// Firebase mock
vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({ delete: vi.fn(), update: vi.fn(), commit: vi.fn().mockResolvedValue(undefined) })),
  },
  auth: { verifyIdToken: mockAuthVerifyIdToken },
  storage: { bucket: vi.fn(() => ({ file: vi.fn(() => ({ delete: vi.fn().mockResolvedValue(undefined) })) })) },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

// Also mock the .js import path used in auth.routes.ts dynamic import
vi.mock('../../src/config/firebase.js', () => ({
  db: {
    collection: vi.fn(() => mockCollection),
    batch: vi.fn(() => ({ delete: vi.fn(), update: vi.fn(), commit: vi.fn().mockResolvedValue(undefined) })),
  },
  auth: { verifyIdToken: mockAuthVerifyIdToken },
  storage: { bucket: vi.fn(() => ({ file: vi.fn(() => ({ delete: vi.fn().mockResolvedValue(undefined) })) })) },
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args: any[]) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
    increment: vi.fn((n: number) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
  Timestamp: { now: vi.fn(() => ({ toDate: () => new Date() })) },
}));

// Mock the dynamic import of env.js used in the /refresh route
vi.mock('../../src/config/env.js', () => ({
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

import { authRoutes } from '../../src/modules/auth/auth.routes';

describe('Auth Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    // For /me routes, set user via hook (since requireAuth is mocked to be a no-op)
    fastify.addHook('onRequest', async (req) => {
      if (req.url.startsWith('/me')) {
        (req as any).user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
      }
    });
    await fastify.register(authRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset chainable methods
    mockCollection.doc.mockReturnThis();
    mockCollection.where.mockReturnThis();
    mockCollection.orderBy.mockReturnThis();
    mockCollection.limit.mockReturnThis();
    mockCollection.offset.mockReturnThis();
    // Default mock for auth
    mockAuthVerifyIdToken.mockResolvedValue({ uid: 'firebase-uid-1', email: 'test@example.com' });
  });

  // ─── POST /register ───────────────────────────────────────────────────────────

  describe('POST /register', () => {
    it('returns 201 on successful registration', async () => {
      // Service calls doc(firebaseUid).get() - must return { exists: false } for new user
      mockCollection.get.mockResolvedValueOnce({ exists: false });

      const res = await fastify.inject({
        method: 'POST',
        url: '/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: { displayName: 'Test User', timezone: 'UTC' },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('firebase-uid-1');
      expect(body.user.displayName).toBe('Test User');
      expect(body.user.email).toBe('test@example.com');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
      // Verify auth.verifyIdToken was called with the token
      expect(mockAuthVerifyIdToken).toHaveBeenCalledWith('valid-firebase-token');
      // Verify doc was called with firebaseUid
      expect(mockCollection.doc).toHaveBeenCalledWith('firebase-uid-1');
      // Verify set was called to create the user
      expect(mockCollection.set).toHaveBeenCalled();
    });

    it('returns 400 when firebase token is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/register',
        payload: { displayName: 'Test User' },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Firebase token required');
    });

    it('returns error when displayName is missing (zod validation)', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: { timezone: 'UTC' },
      });

      // Zod parse will throw a ZodError, Fastify returns 500 for unhandled errors
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });

    it('returns error when user already exists', async () => {
      // Service calls doc(firebaseUid).get() - user already exists
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'firebase-uid-1',
        data: () => ({ email: 'test@example.com', displayName: 'Existing', status: 'active' }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: { displayName: 'Test User', timezone: 'UTC' },
      });

      // Service throws 409 error
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  // ─── POST /login ──────────────────────────────────────────────────────────────

  describe('POST /login', () => {
    it('returns 200 on successful login', async () => {
      // Service calls doc(firebaseUid).get() - user exists with active status
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'firebase-uid-1',
        data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: {},
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('firebase-uid-1');
      expect(body.user.email).toBe('test@example.com');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
      expect(mockAuthVerifyIdToken).toHaveBeenCalledWith('valid-firebase-token');
      // Verify update was called for lastLoginAt
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 400 when firebase token is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/login',
        payload: {},
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Firebase token required');
    });

    it('returns error when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({ exists: false });

      const res = await fastify.inject({
        method: 'POST',
        url: '/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: {},
      });

      // Service throws 404 error
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
  });

  // ─── POST /dev-login ──────────────────────────────────────────────────────────

  describe('POST /dev-login', () => {
    it('returns 200 with valid email in test environment', async () => {
      // Route calls db.collection('users').where(...).limit(1).get()
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'user-1', data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }), ref: { id: 'user-1' } }],
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/dev-login',
        payload: { email: 'test@example.com' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('user-1');
      expect(body.user.email).toBe('test@example.com');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 when email is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/dev-login',
        payload: {},
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Email is required');
    });

    it('returns 404 when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/dev-login',
        payload: { email: 'nonexistent@example.com' },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('User not found');
    });
  });

  // ─── POST /test-login ─────────────────────────────────────────────────────────

  describe('POST /test-login', () => {
    it('returns 200 with valid email and secret', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'user-1', data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }), ref: { id: 'user-1' } }],
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/test-login',
        payload: { email: 'test@example.com', secret: 'test-secret-minimum-16-chars' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('user-1');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 when email or secret is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/test-login',
        payload: { email: 'test@example.com' },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Email and secret required');
    });

    it('returns 403 with invalid secret', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/test-login',
        payload: { email: 'test@example.com', secret: 'wrong-secret' },
      });

      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Invalid secret');
    });

    it('returns 404 when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/test-login',
        payload: { email: 'missing@example.com', secret: 'test-secret-minimum-16-chars' },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  // ─── POST /test-register ──────────────────────────────────────────────────────

  describe('POST /test-register', () => {
    it('returns 201 for a new user', async () => {
      // First get() for existing check: user does not exist
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
      });
      mockCollection.add.mockResolvedValueOnce({ id: 'new-user-id' });

      const res = await fastify.inject({
        method: 'POST',
        url: '/test-register',
        payload: { email: 'new@example.com', displayName: 'New User', secret: 'test-secret-minimum-16-chars' },
      });

      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('new-user-id');
      expect(body.user.email).toBe('new@example.com');
      expect(body.user.displayName).toBe('New User');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
      expect(mockCollection.add).toHaveBeenCalled();
    });

    it('returns 200 when user already exists', async () => {
      // First get() for existing check: user exists
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'existing-user-id', data: () => ({ email: 'test@example.com', displayName: 'Existing User', status: 'active' }), ref: { id: 'existing-user-id' } }],
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/test-register',
        payload: { email: 'test@example.com', displayName: 'Test', secret: 'test-secret-minimum-16-chars' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.user).toBeDefined();
      expect(body.user.id).toBe('existing-user-id');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 when fields are missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/test-register',
        payload: { email: 'test@example.com' },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Email, displayName and secret required');
    });

    it('returns 403 with invalid secret', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/test-register',
        payload: { email: 'test@example.com', displayName: 'Test', secret: 'bad-secret' },
      });

      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Invalid secret');
    });
  });

  // ─── POST /refresh ────────────────────────────────────────────────────────────

  describe('POST /refresh', () => {
    it('returns 200 with valid refresh token', async () => {
      // Generate a real refresh token that the route can verify
      const validRefreshToken = jwt.sign(
        { uid: 'user-1', type: 'refresh' },
        'test-secret-minimum-16-chars',
        { expiresIn: '7d' },
      );

      // refreshToken service calls doc(uid).get()
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active' }),
      });

      const res = await fastify.inject({
        method: 'POST',
        url: '/refresh',
        payload: { refreshToken: validRefreshToken },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 when refresh token is missing', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/refresh',
        payload: {},
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Refresh token required');
    });

    it('returns 400 with invalid token type', async () => {
      // Generate a token with type 'access' instead of 'refresh'
      const accessToken = jwt.sign(
        { uid: 'user-1', type: 'access' },
        'test-secret-minimum-16-chars',
        { expiresIn: '1h' },
      );

      const res = await fastify.inject({
        method: 'POST',
        url: '/refresh',
        payload: { refreshToken: accessToken },
      });

      expect(res.statusCode).toBe(400);
      const body = JSON.parse(res.payload);
      expect(body.error).toBe('Invalid token type');
    });

    it('returns error with invalid/expired token', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/refresh',
        payload: { refreshToken: 'invalid-jwt-token' },
      });

      // jwt.verify will throw, Fastify returns 500 for unhandled errors
      expect(res.statusCode).toBe(500);
    });
  });

  // ─── GET /me ──────────────────────────────────────────────────────────────────

  describe('GET /me', () => {
    it('returns 200 with user profile', async () => {
      // getProfile calls doc(uid).get()
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active', timezone: 'UTC' }),
      });

      const res = await fastify.inject({
        method: 'GET',
        url: '/me',
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.id).toBe('user-1');
      expect(body.email).toBe('test@example.com');
      expect(body.displayName).toBe('Test User');
    });
  });

  // ─── PUT /me ──────────────────────────────────────────────────────────────────

  describe('PUT /me', () => {
    it('returns 200 after updating profile', async () => {
      // updateProfile calls doc(uid).update() then getProfile which calls doc(uid).get()
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ email: 'test@example.com', displayName: 'Updated Name', status: 'active', timezone: 'UTC' }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/me',
        payload: { displayName: 'Updated Name' },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.displayName).toBe('Updated Name');
      // Verify update was called
      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('returns 200 after updating settings', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ email: 'test@example.com', displayName: 'Test User', status: 'active', settings: { notifications: false, language: 'en', theme: 'dark' } }),
      });

      const res = await fastify.inject({
        method: 'PUT',
        url: '/me',
        payload: { settings: { notifications: false, theme: 'dark' } },
      });

      expect(res.statusCode).toBe(200);
      expect(mockCollection.update).toHaveBeenCalled();
    });
  });

  // ─── DELETE /me ───────────────────────────────────────────────────────────────

  describe('DELETE /me', () => {
    it('returns 204 after deleting account', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: '/me',
      });

      expect(res.statusCode).toBe(204);
      // Verify update was called with deleted status
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'deleted',
          displayName: 'Deleted User',
        }),
      );
    });
  });
});
