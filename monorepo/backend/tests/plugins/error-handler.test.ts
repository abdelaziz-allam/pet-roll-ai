import { describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';

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

describe('error-handler plugin', () => {
  async function buildApp() {
    const app = Fastify();
    const errorHandlerPlugin = (await import('../../src/plugins/error-handler')).default;
    await app.register(errorHandlerPlugin);
    return app;
  }

  it('should return 400 with client error message', async () => {
    const app = await buildApp();
    app.get('/bad-request', async () => {
      const err: any = new Error('Invalid input');
      err.statusCode = 400;
      err.name = 'BadRequestError';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/bad-request' });
    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body).toEqual({
      error: 'BadRequestError',
      message: 'Invalid input',
      statusCode: 400,
    });
    await app.close();
  });

  it('should return 404 with the error message for not found', async () => {
    const app = await buildApp();
    app.get('/not-found', async () => {
      const err: any = new Error('Resource not found');
      err.statusCode = 404;
      err.name = 'NotFoundError';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/not-found' });
    expect(response.statusCode).toBe(404);
    const body = JSON.parse(response.body);
    expect(body).toEqual({
      error: 'NotFoundError',
      message: 'Resource not found',
      statusCode: 404,
    });
    await app.close();
  });

  it('should return 500 with generic message for server errors', async () => {
    const app = await buildApp();
    app.get('/server-error', async () => {
      const err: any = new Error('Database connection failed');
      err.statusCode = 500;
      err.name = 'InternalServerError';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/server-error' });
    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body).toEqual({
      error: 'InternalServerError',
      message: 'Internal server error',
      statusCode: 500,
    });
    await app.close();
  });

  it('should default to 500 when statusCode not set', async () => {
    const app = await buildApp();
    app.get('/unknown-error', async () => {
      throw new Error('Something went wrong');
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/unknown-error' });
    expect(response.statusCode).toBe(500);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Internal server error');
    expect(body.statusCode).toBe(500);
    await app.close();
  });

  it('should use error name or default to InternalServerError', async () => {
    const app = await buildApp();
    app.get('/no-name', async () => {
      const err: any = new Error('oops');
      err.statusCode = 422;
      err.name = '';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/no-name' });
    expect(response.statusCode).toBe(422);
    const body = JSON.parse(response.body);
    // Empty name falls through to 'InternalServerError' due to || operator
    expect(body.error).toBe('InternalServerError');
    expect(body.message).toBe('oops');
    await app.close();
  });

  it('should return client message for 4xx errors (403, 409, etc)', async () => {
    const app = await buildApp();
    app.get('/forbidden', async () => {
      const err: any = new Error('Access denied');
      err.statusCode = 403;
      err.name = 'ForbiddenError';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/forbidden' });
    expect(response.statusCode).toBe(403);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Access denied');
    await app.close();
  });

  it('should mask message for 502 and 503 errors', async () => {
    const app = await buildApp();
    app.get('/bad-gateway', async () => {
      const err: any = new Error('Upstream timeout');
      err.statusCode = 502;
      err.name = 'BadGatewayError';
      throw err;
    });
    await app.ready();

    const response = await app.inject({ method: 'GET', url: '/bad-gateway' });
    expect(response.statusCode).toBe(502);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('Internal server error');
    await app.close();
  });
});
