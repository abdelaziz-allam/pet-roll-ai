import { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { db } from '../config/firebase';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      uid: string;
      email: string;
      role: string;
    } | null;
  }
}

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorateRequest('user', null);

  fastify.addHook('onRequest', async (request: FastifyRequest) => {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      request.user = null;
      return;
    }

    const token = authHeader.slice(7);
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { uid: string; email: string };
      const userDoc = await db.collection('users').doc(decoded.uid).get();
      if (!userDoc.exists) {
        request.user = null;
        return;
      }
      const userData = userDoc.data()!;
      request.user = {
        uid: decoded.uid,
        email: decoded.email,
        role: userData.role || 'user',
      };
    } catch {
      request.user = null;
    }
  });
}

export default fp(authPlugin, { name: 'auth' });
