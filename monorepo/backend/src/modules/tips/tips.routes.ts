import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth';
import { requireAdminAuth } from '../../middleware/require-admin-auth';
import { createTipSchema, updateTipSchema } from './tips.schema';
import * as tipsService from './tips.service';

export async function tipsRoutes(app: FastifyInstance) {
  app.get('/daily', { preHandler: [requireAuth] }, async (request, reply) => {
    const { species } = request.query as { species?: string };
    const tip = await tipsService.getDailyTip(species);
    return reply.send(tip);
  });

  app.get('/', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { page, limit, category, active } = request.query as {
      page?: string; limit?: string; category?: string; active?: string;
    };
    const result = await tipsService.listTips({
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 20,
      category,
      active,
    });
    return reply.send(result);
  });

  app.get('/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const tip = await tipsService.getTipById(id);
    return reply.send(tip);
  });

  app.post('/', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const body = createTipSchema.parse(request.body);
    const tip = await tipsService.createTip(body, request.adminUser!.uid);
    return reply.status(201).send(tip);
  });

  app.put('/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateTipSchema.parse(request.body);
    const tip = await tipsService.updateTip(id, body);
    return reply.send(tip);
  });

  app.delete('/:id', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await tipsService.deleteTip(id);
    return reply.send(result);
  });
}
