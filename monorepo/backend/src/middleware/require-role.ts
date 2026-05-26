import type { FastifyRequest, FastifyReply } from 'fastify';

type Role = 'super_admin' | 'admin' | 'moderator' | 'support' | 'viewer' | 'breeder' | 'user';

const ROLE_HIERARCHY: Record<string, number> = {
  super_admin: 100,
  admin: 80,
  moderator: 60,
  support: 40,
  viewer: 20,
  breeder: 10,
  user: 0,
};

export function requireRole(...allowedRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    const userRole = request.user.role;
    if (!allowedRoles.includes(userRole as Role)) {
      return reply.status(403).send({
        statusCode: 403,
        error: 'Forbidden',
        message: `Requires one of: ${allowedRoles.join(', ')}`,
      });
    }
  };
}

export function requireMinRole(minRole: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.user) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Authentication required',
      });
    }

    const userLevel = ROLE_HIERARCHY[request.user.role] ?? 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] ?? 0;

    if (userLevel < requiredLevel) {
      return reply.status(403).send({
        statusCode: 403,
        error: 'Forbidden',
        message: `Requires minimum role: ${minRole}`,
      });
    }
  };
}
