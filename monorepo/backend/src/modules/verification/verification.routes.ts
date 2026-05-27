import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { verificationService } from './verification.service';

export async function verificationRoutes(fastify: FastifyInstance) {
  // Require authenticated user for all routes in this module
  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.code(401).send({ error: 'Unauthorized', message: 'Authentication required' });
    }
  });

  // POST /verification/submit — Submit a new verification request
  fastify.post('/submit', async (request: FastifyRequest, reply: FastifyReply) => {
    const { kennelName, breedExperience, documents } = request.body as {
      kennelName: string;
      breedExperience: string;
      documents: Array<{ url: string; path: string; name: string; type: string }>;
    };

    if (!kennelName || !breedExperience || !documents || !Array.isArray(documents) || documents.length === 0) {
      return reply.code(400).send({
        error: 'Bad Request',
        message: 'kennelName, breedExperience, and at least one document are required',
      });
    }

    const user = request.user!;
    const result = await verificationService.submitVerification(
      user.uid,
      user.email, // userName fallback to email (displayName not on token)
      user.email,
      { kennelName, breedExperience, documents }
    );

    return reply.code(201).send(result);
  });

  // GET /verification/status — Get current verification status for the logged-in user
  fastify.get('/status', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getStatus(user.uid);

    if (!result) {
      return reply.code(200).send({ status: 'none', message: 'No verification request found' });
    }

    return reply.code(200).send(result);
  });

  // GET /verification/history — Get ALL historical submissions for the logged-in user
  fastify.get('/history', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user!;
    const result = await verificationService.getHistory(user.uid);
    return reply.code(200).send(result);
  });
}
