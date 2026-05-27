import { FastifyInstance } from 'fastify';
import { authService } from './auth.service';
import { registerSchema, updateProfileSchema } from './auth.schema';
import { requireAuth } from '../../middleware/require-auth';
import { auth, db } from '../../config/firebase';
import { env } from '../../config/env';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const firebaseToken = request.headers['x-firebase-token'] as string;
    if (!firebaseToken) {
      return reply.code(400).send({ error: 'Firebase token required' });
    }

    const decoded = await auth.verifyIdToken(firebaseToken);
    const body = registerSchema.parse(request.body);
    const result = await authService.register(body, decoded.uid, decoded.email!);
    return reply.code(201).send(result);
  });

  fastify.post('/login', async (request, reply) => {
    const firebaseToken = request.headers['x-firebase-token'] as string;
    if (!firebaseToken) {
      return reply.code(400).send({ error: 'Firebase token required' });
    }

    const decoded = await auth.verifyIdToken(firebaseToken);
    const result = await authService.login(decoded.uid, decoded.email!);
    return reply.code(200).send(result);
  });

  fastify.post('/dev-login', async (request, reply) => {
    if (env.NODE_ENV !== 'development' && env.NODE_ENV !== 'test') {
      return reply.code(403).send({ error: 'Only available in development' });
    }
    const { email } = request.body as { email: string };
    if (!email) {
      return reply.code(400).send({ error: 'Email is required' });
    }
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      return reply.code(404).send({ error: 'User not found' });
    }
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const tokens = authService.generateTokens(userDoc.id, userData.email);
    return reply.code(200).send({ user: { id: userDoc.id, ...userData }, ...tokens });
  });

  fastify.post('/test-login', async (request, reply) => {
    const { email, secret } = request.body as { email: string; secret: string };
    if (!email || !secret) {
      return reply.code(400).send({ error: 'Email and secret required' });
    }
    if (secret !== env.JWT_SECRET) {
      return reply.code(403).send({ error: 'Invalid secret' });
    }
    const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
    if (snapshot.empty) {
      return reply.code(404).send({ error: 'User not found. Use /auth/test-register first.' });
    }
    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    const tokens = authService.generateTokens(userDoc.id, userData.email);
    return reply.code(200).send({ user: { id: userDoc.id, ...userData }, ...tokens });
  });

  fastify.post('/test-register', async (request, reply) => {
    const { email, displayName, secret } = request.body as { email: string; displayName: string; secret: string };
    if (!email || !displayName || !secret) {
      return reply.code(400).send({ error: 'Email, displayName and secret required' });
    }
    if (secret !== env.JWT_SECRET) {
      return reply.code(403).send({ error: 'Invalid secret' });
    }
    const existing = await db.collection('users').where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      const userDoc = existing.docs[0];
      const userData = userDoc.data();
      const tokens = authService.generateTokens(userDoc.id, userData.email);
      return reply.code(200).send({ user: { id: userDoc.id, ...userData }, ...tokens });
    }
    const { FieldValue } = await import('../../config/firebase.js');
    const userData = {
      email,
      displayName,
      phone: null,
      timezone: 'Europe/Stockholm',
      role: 'user',
      status: 'active',
      isVerifiedBreeder: false,
      fcmTokens: [],
      settings: { notifications: true, language: 'en', theme: 'light' },
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('users').add(userData);
    const tokens = authService.generateTokens(docRef.id, email);
    return reply.code(201).send({ user: { id: docRef.id, ...userData }, ...tokens });
  });

  fastify.post('/refresh', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string };
    if (!refreshToken) {
      return reply.code(400).send({ error: 'Refresh token required' });
    }

    const jwt = await import('jsonwebtoken');
    const { env } = await import('../../config/env.js');
    const decoded = jwt.default.verify(refreshToken, env.JWT_SECRET) as { uid: string; type: string };
    if (decoded.type !== 'refresh') {
      return reply.code(400).send({ error: 'Invalid token type' });
    }

    const tokens = await authService.refreshToken(decoded.uid);
    return reply.code(200).send(tokens);
  });

  fastify.get('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    const profile = await authService.getProfile(request.user!.uid);
    return reply.code(200).send(profile);
  });

  fastify.put('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = updateProfileSchema.parse(request.body);
    const profile = await authService.updateProfile(request.user!.uid, body);
    return reply.code(200).send(profile);
  });

  fastify.delete('/me', { preHandler: [requireAuth] }, async (request, reply) => {
    await authService.deleteAccount(request.user!.uid);
    return reply.code(204).send();
  });
}
