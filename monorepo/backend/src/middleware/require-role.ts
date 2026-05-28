import { FastifyRequest, FastifyReply } from 'fastify';

const ROLE_HIERARCHY = ['user', 'support', 'moderator', 'admin'];

export function requireRole(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }
    const userLevel = ROLE_HIERARCHY.indexOf(request.user.role);
    const minRequired = Math.min(...roles.map(r => ROLE_HIERARCHY.indexOf(r)).filter(i => i >= 0));
    if (userLevel < minRequired) {
      return reply.code(403).send({ error: 'Forbidden', message: 'Insufficient permissions' });
    }
  };
}
