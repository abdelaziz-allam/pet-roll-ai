import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

vi.mock('../../src/modules/blog/blog.service', () => ({
  BlogService: vi.fn().mockImplementation(() => ({
    getAll: vi.fn().mockResolvedValue({ data: [{ id: '1', title: 'Test Post', slug: 'test-post' }], total: 1, page: 1, limit: 10 }),
    getBySlug: vi.fn().mockResolvedValue({ id: '1', title: 'Test Post', slug: 'test-post', content: 'Hello' }),
    incrementViewCount: vi.fn().mockResolvedValue(undefined),
    getById: vi.fn().mockResolvedValue({ id: '1', title: 'Test Post', slug: 'test-post' }),
    create: vi.fn().mockResolvedValue({ id: 'new-1', title: 'New Post', slug: 'new-post' }),
    update: vi.fn().mockResolvedValue({ id: '1', title: 'Updated Post' }),
    delete: vi.fn().mockResolvedValue(undefined),
    toggleFeatured: vi.fn().mockResolvedValue({ id: '1', featured: true }),
    uploadCoverImage: vi.fn().mockResolvedValue('https://storage.example.com/cover.jpg'),
  })),
}));

vi.mock('../../src/modules/blog/blog.schema', () => ({
  createBlogPostSchema: { parse: vi.fn((body: any) => body) },
  updateBlogPostSchema: { parse: vi.fn((body: any) => body) },
}));

vi.mock('../../src/middleware/require-admin-auth', () => ({
  requireAdminAuth: vi.fn().mockImplementation(async (req: any) => {
    req.adminUser = { uid: 'admin-1', email: 'admin@test.com', name: 'Admin', role: 'super_admin', permissions: {} };
  }),
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

import { blogRoutes } from '../../src/modules/blog/blog.routes';

describe('Blog Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(blogRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('GET /posts', () => {
    it('returns posts list with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/posts' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.data).toBeDefined();
      expect(body.data.length).toBeGreaterThan(0);
    });

    it('accepts page and limit query params', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/posts?page=2&limit=5' });
      expect(res.statusCode).toBe(200);
    });

    it('accepts search query param', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/posts?search=test' });
      expect(res.statusCode).toBe(200);
    });

    it('accepts tag query param', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/posts?tag=health' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /posts/:slug', () => {
    it('returns a post by slug with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/posts/test-post' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.slug).toBe('test-post');
    });
  });

  describe('GET /admin/posts', () => {
    it('returns all posts for admin with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/admin/posts' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /admin/posts/:id', () => {
    it('returns a post by id with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/admin/posts/1' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /admin/posts', () => {
    it('creates a post and returns 201', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: '/admin/posts',
        payload: { title: 'New Post', content: 'Content', slug: 'new-post' },
      });
      expect(res.statusCode).toBe(201);
      const body = JSON.parse(res.payload);
      expect(body.id).toBeDefined();
    });
  });

  describe('PUT /admin/posts/:id', () => {
    it('updates a post and returns 200', async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: '/admin/posts/1',
        payload: { title: 'Updated Post' },
      });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('DELETE /admin/posts/:id', () => {
    it('deletes a post and returns 204', async () => {
      const res = await fastify.inject({ method: 'DELETE', url: '/admin/posts/1' });
      expect(res.statusCode).toBe(204);
    });
  });

  describe('POST /admin/posts/:id/feature', () => {
    it('toggles featured status and returns 200', async () => {
      const res = await fastify.inject({ method: 'POST', url: '/admin/posts/1/feature' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.featured).toBe(true);
    });
  });
});
