import { FastifyRequest, FastifyReply } from 'fastify';

export function requireAdminPermission(page: string, action: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.adminUser) {
      return reply.code(401).send({ error: 'Unauthorized' });
    }

    // super_admin bypasses all permission checks
    if (request.adminUser.role === 'super_admin') {
      return;
    }

    const pagePermissions = request.adminUser.permissions[page];
    if (!pagePermissions || !pagePermissions.access) {
      return reply.code(403).send({
        error: 'Forbidden',
        message: `You do not have access to ${page}`,
      });
    }

    if (!pagePermissions.actions.includes(action)) {
      return reply.code(403).send({
        error: 'Forbidden',
        message: `You do not have permission to perform '${action}' on ${page}`,
      });
    }
  };
}
