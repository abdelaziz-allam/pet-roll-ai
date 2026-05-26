import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth.js';
import { requireMinRole } from '../../middleware/require-role.js';
import { createTipSchema, updateTipSchema } from './tips.schema.js';
import * as tipsService from './tips.service.js';
import { paginationSchema } from '../../types/common.js';
import { z } from 'zod';

const tipListQuerySchema = paginationSchema.extend({
  category: z.string().optional(),
  active: z.enum(['true', 'false']).optional(),
});

export async function tipsRoutes(app: FastifyInstance) {
  // GET /daily - get today's tip (any authenticated user)
  app.get('/daily', { preHandler: [requireAuth] }, async (request, reply) => {
    const { species } = request.query as { species?: string };
    const tip = await tipsService.getDailyTip(species);
    return reply.send(tip);
  });

  // GET / - list all tips (admin: support+)
  app.get('/', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const query = tipListQuerySchema.parse(request.query);
    const result = await tipsService.listTips(query);
    return reply.send(result);
  });

  // GET /:id - get tip by id (admin: support+)
  app.get('/:id', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const tip = await tipsService.getTipById(id);
    return reply.send(tip);
  });

  // POST / - create tip (moderator+)
  app.post('/', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const body = createTipSchema.parse(request.body);
    const tip = await tipsService.createTip(body, request.user!.uid);
    return reply.status(201).send(tip);
  });

  // PUT /:id - update tip (moderator+)
  app.put('/:id', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateTipSchema.parse(request.body);
    const tip = await tipsService.updateTip(id, body);
    return reply.send(tip);
  });

  // DELETE /:id - delete tip (admin+)
  app.delete('/:id', { preHandler: [requireAuth, requireMinRole('admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await tipsService.deleteTip(id);
    return reply.send(result);
  });
}
