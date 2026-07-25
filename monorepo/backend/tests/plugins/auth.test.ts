import { describe, it, expect, vi, beforeEach } from 'vitest';
import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import { db } from '../../src/config/firebase';

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

const JWT_SECRET = 'test-secret-minimum-16-chars';

describe('auth plugin', () => {
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = (db.collection as any)('users');
  });

  async function buildApp() {
    const app = Fastify();
    const authPlugin = (await import('../../src/plugins/auth')).default;
    await app.register(authPlugin);

    app.get('/test', async (request, reply) => {
      return { user: request.user };
    });

    await app.ready();
    return app;
  }

  it('should set user to null when no Authorization header', async () => {
    const app = await buildApp();
    const response = await app.inject({ method: 'GET', url: '/test' });
    const body = JSON.parse(response.body);
    expect(body.user).toBeNull();
    await app.close();
  });

  it('should set user to null when Authorization header does not start with Bearer', async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: 'Basic abc123' },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toBeNull();
    await app.close();
  });

  it('should set user to null when token is invalid', async () => {
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: 'Bearer invalid-token' },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toBeNull();
    await app.close();
  });

  it('should set user to null when token is expired', async () => {
    const expiredToken = jwt.sign({ uid: 'user-1', email: 'test@example.com' }, JWT_SECRET, { expiresIn: '-1s' });
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: `Bearer ${expiredToken}` },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toBeNull();
    await app.close();
  });

  it('should set user to null when user doc does not exist', async () => {
    mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

    const token = jwt.sign({ uid: 'nonexistent', email: 'test@example.com' }, JWT_SECRET);
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: `Bearer ${token}` },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toBeNull();
    await app.close();
  });

  it('should set user with uid, email, and role from Firestore', async () => {
    mockCollection.get.mockResolvedValue({
      exists: true,
      data: () => ({ role: 'admin', email: 'test@example.com' }),
    });

    const token = jwt.sign({ uid: 'user-1', email: 'test@example.com' }, JWT_SECRET);
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: `Bearer ${token}` },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toEqual({
      uid: 'user-1',
      email: 'test@example.com',
      role: 'admin',
    });
    await app.close();
  });

  it('should default role to user when not set in Firestore', async () => {
    mockCollection.get.mockResolvedValue({
      exists: true,
      data: () => ({ email: 'test@example.com' }),
    });

    const token = jwt.sign({ uid: 'user-1', email: 'test@example.com' }, JWT_SECRET);
    const app = await buildApp();
    const response = await app.inject({
      method: 'GET',
      url: '/test',
      headers: { authorization: `Bearer ${token}` },
    });
    const body = JSON.parse(response.body);
    expect(body.user).toEqual({
      uid: 'user-1',
      email: 'test@example.com',
      role: 'user',
    });
    await app.close();
  });
});
