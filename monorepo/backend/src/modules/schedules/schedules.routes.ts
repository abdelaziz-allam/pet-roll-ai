import type { FastifyInstance } from 'fastify';
import {
  createScheduleSchema,
  updateScheduleSchema,
  logCompletionSchema,
} from './schedules.schema.js';
import * as schedulesService from './schedules.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function schedulesRoutes(app: FastifyInstance) {
  // Create schedule
  app.post('/pets/:petId/schedules', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createScheduleSchema.parse({ ...request.body as object, petId });
    const result = await schedulesService.createSchedule(request.user!.uid, body);
    return reply.status(201).send(result);
  });

  // List active schedules for pet
  app.get('/pets/:petId/schedules', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const result = await schedulesService.getSchedules(petId, request.user!.uid);
    return reply.send(result);
  });

  // Update schedule
  app.put('/pets/:petId/schedules/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const body = updateScheduleSchema.parse(request.body);
    const result = await schedulesService.updateSchedule(id, request.user!.uid, body);
    return reply.send(result);
  });

  // Delete schedule
  app.delete('/pets/:petId/schedules/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    await schedulesService.deleteSchedule(id, request.user!.uid);
    return reply.status(204).send();
  });

  // Log completion
  app.post('/pets/:petId/schedules/:id/log', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const body = logCompletionSchema.parse(request.body);
    const result = await schedulesService.logCompletion(id, request.user!.uid, body);
    return reply.status(201).send(result);
  });
}
