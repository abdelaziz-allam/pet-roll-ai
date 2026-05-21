import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, generateExpiredToken, seedUser, clearStore } from './helpers';

describe('Auth API Integration', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
  });

  describe('POST /api/v1/auth/register', () => {
    it('registers a new user with valid firebase token', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: {
          displayName: 'John Doe',
          phone: '+1234567890',
          timezone: 'America/New_York',
        },
      });

      expect(res.statusCode).toBe(201);
      const body = res.json();
      expect(body.user).toBeDefined();
      expect(body.user.displayName).toBe('John Doe');
      expect(body.user.email).toBe('john@test.com');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 without firebase token', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: { displayName: 'John Doe', timezone: 'UTC' },
      });

      expect(res.statusCode).toBe(400);
      expect(res.json().error).toBe('Firebase token required');
    });

    it('returns 409 for duplicate registration', async () => {
      seedUser('user-1');

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
        payload: { displayName: 'John Doe', timezone: 'UTC' },
      });

      expect(res.statusCode).toBe(409);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('logs in an existing active user', async () => {
      seedUser('user-1', { email: 'john@test.com' });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.user.id).toBe('user-1');
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 404 for non-existent user', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 403 for banned user', async () => {
      seedUser('user-1', { status: 'banned', email: 'john@test.com' });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
      });

      expect(res.statusCode).toBe(403);
    });

    it('returns 410 for deleted user', async () => {
      seedUser('user-1', { status: 'deleted', email: 'john@test.com' });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        headers: { 'x-firebase-token': 'valid-firebase-token' },
      });

      expect(res.statusCode).toBe(410);
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    it('refreshes tokens with valid refresh token', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      const jwt = await import('jsonwebtoken');
      const refreshToken = jwt.default.sign({ uid: 'user-1', type: 'refresh' }, process.env.JWT_SECRET!, { expiresIn: '7d' });

      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/refresh',
        payload: { refreshToken },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.accessToken).toBeDefined();
      expect(body.refreshToken).toBeDefined();
    });

    it('returns 400 without refresh token', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/refresh',
        payload: {},
      });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/v1/auth/me', () => {
    it('returns user profile with valid JWT', async () => {
      seedUser('user-1', { email: 'john@test.com', displayName: 'John Doe' });
      const token = generateToken('user-1', 'john@test.com');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.id).toBe('user-1');
      expect(body.displayName).toBe('John Doe');
    });

    it('returns 401 without auth header', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
      });

      expect(res.statusCode).toBe(401);
    });

    it('returns 401 with expired token', async () => {
      seedUser('user-1');
      const token = generateExpiredToken('user-1', 'john@test.com');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(401);
    });

    it('returns 401 with invalid token format', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: { authorization: 'Bearer invalid-token' },
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v1/auth/me', () => {
    it('updates user profile', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      const token = generateToken('user-1', 'john@test.com');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
        payload: { displayName: 'John Updated' },
      });

      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /api/v1/auth/me', () => {
    it('soft-deletes user account', async () => {
      seedUser('user-1', { email: 'john@test.com' });
      const token = generateToken('user-1', 'john@test.com');

      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/auth/me',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });
});
