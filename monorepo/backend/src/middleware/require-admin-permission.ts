import type { FastifyRequest, FastifyReply } from 'fastify';

export function requireAdminPermission(_permission: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(403).send({ message: 'Forbidden' });
    }
  };
}
