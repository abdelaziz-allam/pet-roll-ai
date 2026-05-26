import type { FastifyInstance } from 'fastify';
import { registerSchema, loginSchema, updateProfileSchema } from './auth.schema.js';
import * as authService from './auth.service.js';
import { requireAuth } from '../../middleware/require-auth.js';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (request, reply) => {
    const body = registerSchema.parse(request.body);
    const decoded = await (app as any).verifyFirebaseToken(body.firebaseToken);
    const result = await authService.register(body, decoded.uid, decoded.email!);
    return reply.status(201).send(result);
  });

  app.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const decoded = await (app as any).verifyFirebaseToken(body.firebaseToken);
    const result = await authService.login(decoded.uid, decoded.email!);
    return reply.send(result);
  });

  app.post('/refresh', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string };
    if (!refreshToken) {
      return reply.status(400).send({ message: 'refreshToken required' });
    }
    const jwt = await import('jsonwebtoken');
    const { env } = await import('../../config/env.js');
    const decoded = jwt.default.verify(refreshToken, env.JWT_SECRET) as { uid: string; type: string };
    if (decoded.type !== 'refresh') {
      return reply.status(400).send({ message: 'Invalid token type' });
    }
    const result = await authService.refreshToken(decoded.uid);
    return reply.send(result);
  });

  app.get('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    const profile = await authService.getProfile(request.user!.uid);
    return reply.send(profile);
  });

  app.put('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = updateProfileSchema.parse(request.body);
    const profile = await authService.updateProfile(request.user!.uid, body);
    return reply.send(profile);
  });

  app.delete('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    await authService.deleteAccount(request.user!.uid);
    return reply.status(202).send({
      message: 'Account scheduled for deletion within 7 days',
    });
  });
}
