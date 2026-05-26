import type { FastifyInstance } from 'fastify';
import { createHealthRecordSchema, updateHealthRecordSchema } from './health.schema.js';
import { paginationSchema } from '../../types/common.js';
import * as healthService from './health.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function healthRoutes(app: FastifyInstance) {
  app.post('/pets/:petId/health', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createHealthRecordSchema.parse({ ...(request.body as object), petId });
    const record = await healthService.createRecord(request.user!.uid, body);
    return reply.status(201).send(record);
  });

  app.get('/pets/:petId/health', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const pagination = paginationSchema.parse(request.query);
    const result = await healthService.getRecords(petId, request.user!.uid, pagination);
    return reply.send(result);
  });

  app.get('/pets/:petId/health/:recordId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    const record = await healthService.getRecordById(recordId, request.user!.uid);
    return reply.send(record);
  });

  app.put('/pets/:petId/health/:recordId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    const body = updateHealthRecordSchema.parse(request.body);
    const record = await healthService.updateRecord(recordId, request.user!.uid, body);
    return reply.send(record);
  });

  app.delete('/pets/:petId/health/:recordId', { preHandler: [requireAuth] }, async (request, reply) => {
    const { recordId } = request.params as { petId: string; recordId: string };
    await healthService.deleteRecord(recordId, request.user!.uid);
    return reply.status(204).send();
  });
}
