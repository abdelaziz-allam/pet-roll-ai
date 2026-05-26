import type { FastifyInstance } from 'fastify';
import {
  createPregnancySchema,
  updatePregnancySchema,
  addWeightSchema,
} from './pregnancy.schema.js';
import * as pregnancyService from './pregnancy.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function pregnancyRoutes(app: FastifyInstance) {
  // Start pregnancy tracking
  app.post('/pets/:petId/pregnancy', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createPregnancySchema.parse({ ...request.body as object, petId });
    const result = await pregnancyService.startTracking(request.user!.uid, body);
    return reply.status(201).send(result);
  });

  // Get active pregnancy for pet
  app.get('/pets/:petId/pregnancy', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const result = await pregnancyService.getActivePregnancy(petId, request.user!.uid);
    return reply.send(result);
  });

  // Get pregnancy by id
  app.get('/pets/:petId/pregnancy/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const result = await pregnancyService.getPregnancyById(id, request.user!.uid);
    return reply.send(result);
  });

  // Update pregnancy
  app.put('/pets/:petId/pregnancy/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const body = updatePregnancySchema.parse(request.body);
    const result = await pregnancyService.updatePregnancy(id, request.user!.uid, body);
    return reply.send(result);
  });

  // Get milestones
  app.get('/pets/:petId/pregnancy/:id/milestones', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const result = await pregnancyService.getMilestones(id, request.user!.uid);
    return reply.send(result);
  });

  // Complete a milestone
  app.put('/pets/:petId/pregnancy/:id/milestones/:milestoneId/complete', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id, milestoneId } = request.params as { petId: string; id: string; milestoneId: string };
    const result = await pregnancyService.completeMilestone(id, milestoneId, request.user!.uid);
    return reply.send(result);
  });

  // Add weight entry
  app.post('/pets/:petId/pregnancy/:id/weight', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const body = addWeightSchema.parse(request.body);
    const result = await pregnancyService.addWeight(id, request.user!.uid, body);
    return reply.status(201).send(result);
  });
}
