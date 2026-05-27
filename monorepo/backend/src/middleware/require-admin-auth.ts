import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export async function requireAdminAuth(request: FastifyRequest, reply: FastifyReply) {
  const header = request.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { uid: string; email: string; type: string };
    if (decoded.type !== 'admin') {
      return reply.status(403).send({ message: 'Forbidden: admin token required' });
    }
    (request as any).user = decoded;
    (request as any).adminUser = decoded;
  } catch {
    return reply.status(401).send({ message: 'Invalid or expired token' });
  }
}
