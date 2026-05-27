import { FastifyInstance } from 'fastify';
import { vaccinationService } from './vaccination.service';
import { logVaccinationSchema, updateVaccinationSchema } from './vaccination.schema';
import { requireAuth } from '../../middleware/require-auth';

export async function vaccinationRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', requireAuth);

  fastify.post('/pets/:petId/vaccinations', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const body = logVaccinationSchema.parse(request.body);
    const record = await vaccinationService.logVaccination(petId, request.user!.uid, body);
    return reply.code(201).send(record);
  });

  fastify.get('/pets/:petId/vaccinations', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const { page = 1, limit = 20 } = request.query as any;
    const result = await vaccinationService.getVaccinations(petId, request.user!.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  fastify.get('/pets/:petId/vaccinations/upcoming', async (request, reply) => {
    const { petId } = request.params as { petId: string };
    const result = await vaccinationService.getUpcoming(petId, request.user!.uid);
    return reply.code(200).send(result);
  });

  fastify.put('/pets/:petId/vaccinations/:vacId', async (request, reply) => {
    const { vacId } = request.params as { petId: string; vacId: string };
    const body = updateVaccinationSchema.parse(request.body);
    const record = await vaccinationService.updateVaccination(vacId, request.user!.uid, body);
    return reply.code(200).send(record);
  });

  fastify.delete('/pets/:petId/vaccinations/:vacId', async (request, reply) => {
    const { vacId } = request.params as { petId: string; vacId: string };
    await vaccinationService.deleteVaccination(vacId, request.user!.uid);
    return reply.code(204).send();
  });
}
