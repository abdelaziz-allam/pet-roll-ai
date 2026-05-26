import type { FastifyRequest, FastifyReply } from 'fastify';

export async function requireAdminAuth(request: FastifyRequest, reply: FastifyReply) {
  if (!request.user) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}
