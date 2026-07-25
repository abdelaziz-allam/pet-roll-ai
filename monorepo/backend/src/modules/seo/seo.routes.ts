import { FastifyInstance } from 'fastify';
import { SeoService } from './seo.service';
import { requireAdminAuth } from '../../middleware/require-admin-auth';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '';

export async function seoRoutes(fastify: FastifyInstance): Promise<void> {
  const seoService = new SeoService(fastify.log);

  fastify.get('/indexnow-key.txt', async (_request, reply) => {
    if (!INDEXNOW_KEY) {
      return reply.status(404).send('Not configured');
    }
    return reply.type('text/plain').send(INDEXNOW_KEY);
  });

  fastify.post(
    '/ping-search-engines',
    { preHandler: [requireAdminAuth] },
    async (request, reply) => {
      const { urls } = request.body as { urls?: string[] };
      await seoService.pingSearchEngines(urls);
      return reply.send({ success: true, message: 'Search engines notified' });
    }
  );
}
