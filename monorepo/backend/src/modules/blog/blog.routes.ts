import { FastifyInstance } from 'fastify';
import { BlogService } from './blog.service';
import { createBlogPostSchema, updateBlogPostSchema } from './blog.schema';
import { requireAdminAuth } from '../../middleware/require-admin-auth';

export async function blogRoutes(fastify: FastifyInstance) {
  const blogService = new BlogService(fastify.log);

  // Public routes
  fastify.get('/posts', async (request, reply) => {
    const { page, limit, search, tag } = request.query as any;
    const searchTerm = tag || search;
    const result = await blogService.getAll({
      page: page ? +page : 1,
      limit: limit ? +limit : 10,
      search: searchTerm,
      publishedOnly: true,
    });
    return reply.send(result);
  });

  fastify.get('/posts/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const post = await blogService.getBySlug(slug);
    await blogService.incrementViewCount(slug);
    return reply.send(post);
  });

  // Admin routes
  fastify.get('/admin/posts', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { page, limit, search } = request.query as any;
    const result = await blogService.getAll({
      page: page ? +page : 1,
      limit: limit ? +limit : 50,
      search,
      publishedOnly: false,
    });
    return reply.send(result);
  });

  fastify.get('/admin/posts/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const post = await blogService.getById(id);
    return reply.send(post);
  });

  fastify.post('/admin/posts', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const body = createBlogPostSchema.parse(request.body);
    const author = (request as any).adminUser?.name || 'Admin';
    const post = await blogService.create(body, author);
    return reply.code(201).send(post);
  });

  fastify.put('/admin/posts/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateBlogPostSchema.parse(request.body);
    const post = await blogService.update(id, body);
    return reply.send(post);
  });

  fastify.delete('/admin/posts/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    await blogService.delete(id);
    return reply.code(204).send();
  });

  fastify.post('/admin/posts/:id/feature', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await blogService.toggleFeatured(id);
    return reply.send(result);
  });

  fastify.post('/admin/posts/:id/upload-cover', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const file = await request.file();
    if (!file) {
      return reply.code(400).send({ message: 'No file uploaded' });
    }

    const buffer = await file.toBuffer();
    const url = await blogService.uploadCoverImage(buffer, file.filename);
    await blogService.update(id, { coverImageUrl: url });
    return reply.send({ url });
  });
}
