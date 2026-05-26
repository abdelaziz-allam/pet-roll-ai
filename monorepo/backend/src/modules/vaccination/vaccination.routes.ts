import type { FastifyInstance } from 'fastify';
import { createVaccinationSchema, updateVaccinationSchema } from './vaccination.schema.js';
import * as vaccinationService from './vaccination.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function vaccinationRoutes(app: FastifyInstance) {
  app.post('/pets/:petId/vaccinations', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = createVaccinationSchema.parse({ ...(request.body as object), petId });
    const record = await vaccinationService.logVaccination(request.user!.uid, body);
    return reply.status(201).send(record);
  });

  app.get('/pets/:petId/vaccinations', { preHandler: [requireAuth] }, async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const records = await vaccinationService.getVaccinations(petId, request.user!.uid);
    return reply.send(records);
  });

  app.get('/pets/:petId/vaccinations/upcoming', { preHandler: [requireAuth] }, async (request, reply) => {
    const upcoming = await vaccinationService.getUpcoming(request.user!.uid);
    return reply.send(upcoming);
  });

  app.put('/pets/:petId/vaccinations/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    const body = updateVaccinationSchema.parse(request.body);
    const record = await vaccinationService.updateVaccination(id, request.user!.uid, body);
    return reply.send(record);
  });

  app.delete('/pets/:petId/vaccinations/:id', { preHandler: [requireAuth] }, async (request, reply) => {
    const { id } = request.params as { petId: string; id: string };
    await vaccinationService.deleteVaccination(id, request.user!.uid);
    return reply.status(204).send();
  });
}
