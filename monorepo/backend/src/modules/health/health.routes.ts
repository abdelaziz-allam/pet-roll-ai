import { FastifyInstance } from 'fastify';
import { healthService } from './health.service';
import { createHealthRecordSchema, updateHealthRecordSchema } from './health.schema';
import { requireAuth } from '../../middleware/require-auth';

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/pets/:petId/health', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createHealthRecordSchema.parse(request.body);
    const record = await healthService.createRecord(petId, request.user!.uid, body);
    return reply.code(201).send(record);
  });

  fastify.get('/pets/:petId/health', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { page = 1, limit = 20 } = request.query as any;
    const result = await healthService.getRecords(petId, request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:petId/health/:recordId', async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    const record = await healthService.getRecordById(recordId, request.user!.uid);
    return reply.code(200).send(record);
  });

  fastify.put('/pets/:petId/health/:recordId', async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    const body = updateHealthRecordSchema.parse(request.body);
    const record = await healthService.updateRecord(recordId, request.user!.uid, body);
    return reply.code(200).send(record);
  });

  fastify.delete('/pets/:petId/health/:recordId', async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    await healthService.deleteRecord(recordId, request.user!.uid);
    return reply.code(204).send();
  });
}
