import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth';
import { requireRole } from '../../middleware/require-role';
import { createTipSchema, updateTipSchema } from './tips.schema';
import * as tipsService from './tips.service';

export async function tipsRoutes(app: FastifyInstance) {
  // GET /daily - get today's tip (any authenticated user)
  app.get('/daily', { preHandler: [requireAuth] }, async (request, reply) => {
    const { species } = request.query as { species?: string };
    const tip = await tipsService.getDailyTip(species);
    return reply.send(tip);
  });

  // GET / - list all tips (admin: support+)
  app.get('/', { preHandler: [requireAuth, requireRole('support', 'moderator', 'admin', 'super_admin')] }, async (request, reply) => {
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

  // GET /:id - get tip by id (admin: support+)
  app.get('/:id', { preHandler: [requireAuth, requireRole('support', 'moderator', 'admin', 'super_admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const tip = await tipsService.getTipById(id);
    return reply.send(tip);
  });

  // POST / - create tip (moderator+)
  app.post('/', { preHandler: [requireAuth, requireRole('moderator', 'admin', 'super_admin')] }, async (request, reply) => {
    const body = createTipSchema.parse(request.body);
    const tip = await tipsService.createTip(body, request.user!.uid);
    return reply.status(201).send(tip);
  });

  // PUT /:id - update tip (moderator+)
  app.put('/:id', { preHandler: [requireAuth, requireRole('moderator', 'admin', 'super_admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateTipSchema.parse(request.body);
    const tip = await tipsService.updateTip(id, body);
    return reply.send(tip);
  });

  // DELETE /:id - delete tip (admin+)
  app.delete('/:id', { preHandler: [requireAuth, requireRole('admin', 'super_admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await tipsService.deleteTip(id);
    return reply.send(result);
  });
}
