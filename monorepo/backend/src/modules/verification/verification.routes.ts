import type { FastifyInstance } from 'fastify';

export async function verificationRoutes(app: FastifyInstance) {
  app.get('/requests', async () => ({ requests: [] }));
}
