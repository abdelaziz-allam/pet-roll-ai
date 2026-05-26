import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { auth } from '../config/firebase.js';
import { env } from '../config/env.js';

export interface UserPayload {
  uid: string;
  email: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserPayload;
  }
}

async function authPlugin(app: FastifyInstance) {
  app.decorateRequest('user', undefined);

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      });
    }

    const token = header.slice(7);
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as UserPayload;
      request.user = decoded;
    } catch {
      return reply.status(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Invalid or expired token',
      });
    }
  });

  app.decorate('verifyFirebaseToken', async (idToken: string) => {
    return auth.verifyIdToken(idToken);
  });
}

export default fp(authPlugin, { name: 'auth' });
