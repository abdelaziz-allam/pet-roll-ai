import { FastifyInstance } from 'fastify';
import { adminAuthService } from './admin-auth.service';
import {
  adminLoginSchema,
  adminForgotPasswordSchema,
  adminResetPasswordSchema,
  adminChangePasswordSchema,
  createAdminUserSchema,
  updateAdminUserSchema,
  ADMIN_PAGES,
  PAGE_ACTIONS,
} from './admin-auth.schema';
import { requireAdminAuth } from '../../middleware/require-admin-auth';
import { requireAdminPermission } from '../../middleware/require-admin-permission';

export async function adminAuthRoutes(fastify: FastifyInstance) {
  // --- Public routes (no auth required) ---

  fastify.post('/login', async (request, reply) => {
    const body = adminLoginSchema.parse(request.body);
    const result = await adminAuthService.login(body);
    return reply.code(200).send(result);
  });

  fastify.post('/forgot-password', async (request, reply) => {
    const body = adminForgotPasswordSchema.parse(request.body);
    const result = await adminAuthService.forgotPassword(body);
    return reply.code(200).send(result);
  });

  fastify.post('/reset-password', async (request, reply) => {
    const body = adminResetPasswordSchema.parse(request.body);
    const result = await adminAuthService.resetPassword(body);
    return reply.code(200).send(result);
  });

  fastify.post('/seed', async (request, reply) => {
    const result = await adminAuthService.seedSuperAdmin();
    return reply.code(200).send(result);
  });

  // Returns permission config for the frontend
  fastify.get('/permissions-config', async (_request, reply) => {
    return reply.code(200).send({ pages: ADMIN_PAGES, actions: PAGE_ACTIONS });
  });

  // --- Protected routes (admin auth required) ---

  fastify.get('/me', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const profile = await adminAuthService.getMe(request.adminUser!.uid);
    return reply.code(200).send(profile);
  });

  fastify.post('/change-password', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const body = adminChangePasswordSchema.parse(request.body);
    const result = await adminAuthService.changePassword(request.adminUser!.uid, body);
    return reply.code(200).send(result);
  });

  fastify.post('/refresh', async (request, reply) => {
    const { refreshToken } = request.body as { refreshToken: string };
    if (!refreshToken) {
      return reply.code(400).send({ error: 'Refresh token required' });
    }

    const jwtLib = await import('jsonwebtoken');
    const { env } = await import('../../config/env.js');
    const decoded = jwtLib.default.verify(refreshToken, env.JWT_SECRET) as { uid: string; type: string };
    if (decoded.type !== 'admin_refresh') {
      return reply.code(400).send({ error: 'Invalid token type' });
    }

    const tokens = await adminAuthService.refreshToken(decoded.uid);
    return reply.code(200).send(tokens);
  });

  // --- Admin User Management (requires admin_users page access) ---

  fastify.get(
    '/users',
    { preHandler: [requireAdminAuth, requireAdminPermission('admin_users', 'view')] },
    async (request, reply) => {
      const { page = 1, limit = 20 } = request.query as any;
      const result = await adminAuthService.listAdminUsers(+page, +limit);
      return reply.code(200).send(result);
    }
  );

  fastify.get(
    '/users/:id',
    { preHandler: [requireAdminAuth, requireAdminPermission('admin_users', 'view')] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const user = await adminAuthService.getAdminUser(id);
      return reply.code(200).send(user);
    }
  );

  fastify.post(
    '/users',
    { preHandler: [requireAdminAuth, requireAdminPermission('admin_users', 'create')] },
    async (request, reply) => {
      const body = createAdminUserSchema.parse(request.body);
      const result = await adminAuthService.createAdminUser(body, request.adminUser!.uid);
      return reply.code(201).send(result);
    }
  );

  fastify.put(
    '/users/:id',
    { preHandler: [requireAdminAuth, requireAdminPermission('admin_users', 'edit')] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const body = updateAdminUserSchema.parse(request.body);
      const result = await adminAuthService.updateAdminUser(id, body, request.adminUser!.uid);
      return reply.code(200).send(result);
    }
  );

  fastify.delete(
    '/users/:id',
    { preHandler: [requireAdminAuth, requireAdminPermission('admin_users', 'delete')] },
    async (request, reply) => {
      const { id } = request.params as { id: string };
      const result = await adminAuthService.deleteAdminUser(id, request.adminUser!.uid);
      return reply.code(200).send(result);
    }
  );
}
