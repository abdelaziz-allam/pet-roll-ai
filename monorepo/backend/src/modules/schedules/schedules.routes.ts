import { FastifyInstance } from 'fastify';
import { schedulesService } from './schedules.service';
import { createScheduleSchema, updateScheduleSchema } from './schedules.schema';
import { requireAuth } from '../../middleware/require-auth';

export async function schedulesRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/pets/:petId/schedules', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createScheduleSchema.parse(request.body);
    const schedule = await schedulesService.createSchedule(petId, request.user!.uid, body);
    return reply.code(201).send(schedule);
  });

  fastify.get('/pets/:petId/schedules', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { page = 1, limit = 20 } = request.query as any;
    const result = await schedulesService.getSchedules(petId, request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.put('/pets/:petId/schedules/:scheduleId', async (request, reply) => {
    const { scheduleId } = request.params as { petId: string; scheduleId: string };
    const body = updateScheduleSchema.parse(request.body);
    const schedule = await schedulesService.updateSchedule(scheduleId, request.user!.uid, body);
    return reply.code(200).send(schedule);
  });

  fastify.delete('/pets/:petId/schedules/:scheduleId', async (request, reply) => {
    const { scheduleId } = request.params as { petId: string; scheduleId: string };
    await schedulesService.deleteSchedule(scheduleId, request.user!.uid);
    return reply.code(204).send();
  });

  fastify.post('/pets/:petId/schedules/:scheduleId/log', async (request, reply) => {
    const { scheduleId } = request.params as { petId: string; scheduleId: string };
    const result = await schedulesService.logCompletion(scheduleId, request.user!.uid);
    return reply.code(200).send(result);
  });
}
