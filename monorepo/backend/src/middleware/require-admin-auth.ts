import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { db } from '../config/firebase';

declare module 'fastify' {
  interface FastifyRequest {
    adminUser: {
      uid: string;
      email: string;
      role: string;
      permissions: Record<string, { access: boolean; actions: string[] }>;
    } | null;
  }
}

export async function requireAdminAuth(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.code(401).send({ error: 'Unauthorized', message: 'Admin authentication required' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      uid: string;
      email: string;
      type: string;
    };

    if (decoded.type !== 'admin') {
      return reply.code(401).send({ error: 'Unauthorized', message: 'Invalid token type for admin' });
    }

    const adminDoc = await db.collection('admin_users').doc(decoded.uid).get();
    if (!adminDoc.exists) {
      return reply.code(401).send({ error: 'Unauthorized', message: 'Admin user not found' });
    }

    const adminData = adminDoc.data()!;
    if (adminData.status !== 'active') {
      return reply.code(403).send({ error: 'Forbidden', message: 'Admin account is suspended' });
    }

    request.adminUser = {
      uid: decoded.uid,
      email: decoded.email,
      role: adminData.role,
      permissions: adminData.permissions || {},
    };
  } catch {
    return reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
}
