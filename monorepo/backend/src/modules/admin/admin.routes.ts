import type { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth.js';
import { requireMinRole } from '../../middleware/require-role.js';
import {
  updateUserRoleSchema,
  banUserSchema,
  updateVerificationSchema,
  createAdminSchema,
  updateConfigSchema,
  createReportSchema,
} from './admin.schema.js';
import * as adminService from './admin.service.js';
import { paginationSchema } from '../../types/common.js';
import { z } from 'zod';

const userListQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
});

export async function adminRoutes(app: FastifyInstance) {
  // ─── Dashboard Stats ────────────────────────────────────────────────────

  // GET /stats - dashboard stats (support+)
  app.get('/stats', { preHandler: [requireAuth, requireMinRole('support')] }, async (_request, reply) => {
    const stats = await adminService.getStats();
    return reply.send(stats);
  });

  // GET /stats/growth - growth chart data (support+)
  app.get('/stats/growth', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const { period, days } = request.query as { period?: string; days?: string };
    // Accept ?period=30d (frontend) or ?days=30 (legacy)
    const raw = period?.replace('d', '') ?? days ?? '30';
    const stats = await adminService.getGrowthStats(raw);
    return reply.send(stats);
  });

  // GET /stats/health - system health (support+)
  app.get('/stats/health', { preHandler: [requireAuth, requireMinRole('support')] }, async (_request, reply) => {
    const health = await adminService.getSystemHealth();
    return reply.send(health);
  });

  // GET /stats/activity - recent activity feed (support+)
  app.get('/stats/activity', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const { limit } = request.query as { limit?: string };
    const activity = await adminService.getRecentActivity(limit ? parseInt(limit, 10) : 20);
    return reply.send(activity);
  });

  // ─── User Management ──────────────────────────────────────────────────────

  // GET /users - list users (support+)
  app.get('/users', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const query = userListQuerySchema.parse(request.query);
    const result = await adminService.listUsers(query);
    return reply.send(result);
  });

  // GET /users/:id - user detail (support+)
  app.get('/users/:id', { preHandler: [requireAuth, requireMinRole('support')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = await adminService.getUserById(id);
    return reply.send(user);
  });

  // PUT /users/:id - update user profile (admin+)
  app.put('/users/:id', { preHandler: [requireAuth, requireMinRole('admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as { displayName?: string; phone?: string; timezone?: string; country?: string; city?: string };
    const result = await adminService.updateUser(id, body);
    return reply.send(result);
  });

  // PUT /users/:id/role - change role (admin+)
  app.put('/users/:id/role', { preHandler: [requireAuth, requireMinRole('admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateUserRoleSchema.parse(request.body);
    const result = await adminService.updateUserRole(id, body);
    return reply.send(result);
  });

  // PUT /users/:id/ban - ban/unban (moderator+)
  app.put('/users/:id/ban', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = banUserSchema.parse(request.body);
    const result = await adminService.banUser(id, body);
    return reply.send(result);
  });

  // DELETE /users/:id - delete user (super_admin only)
  app.delete('/users/:id', { preHandler: [requireAuth, requireMinRole('super_admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await adminService.deleteUser(id);
    return reply.send(result);
  });

  // ─── Verifications ────────────────────────────────────────────────────────

  // GET /verifications - list pending (moderator+)
  app.get('/verifications', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { status } = request.query as { status?: string };
    const result = await adminService.listVerifications(status);
    return reply.send(result);
  });

  // PUT /verifications/:id - approve/reject (moderator+)
  app.put('/verifications/:id', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = updateVerificationSchema.parse(request.body);
    const result = await adminService.updateVerification(id, body, request.user!.uid);
    return reply.send(result);
  });

  // POST /verifications/:userId/revoke - revoke badge (admin+)
  app.post('/verifications/:userId/revoke', { preHandler: [requireAuth, requireMinRole('admin')] }, async (request, reply) => {
    const { userId } = request.params as { userId: string };
    const result = await adminService.revokeVerification(userId, request.user!.uid);
    return reply.send(result);
  });

  // ─── Team Management ──────────────────────────────────────────────────────

  // POST /team - create sub-admin (super_admin only)
  app.post('/team', { preHandler: [requireAuth, requireMinRole('super_admin')] }, async (request, reply) => {
    const body = createAdminSchema.parse(request.body);
    const result = await adminService.createSubAdmin(body, request.user!.uid);
    return reply.status(201).send(result);
  });

  // GET /team - list team (admin+)
  app.get('/team', { preHandler: [requireAuth, requireMinRole('admin')] }, async (_request, reply) => {
    const result = await adminService.listTeam();
    return reply.send(result);
  });

  // DELETE /team/:id - remove sub-admin (super_admin only)
  app.delete('/team/:id', { preHandler: [requireAuth, requireMinRole('super_admin')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const result = await adminService.deleteUser(id);
    return reply.send(result);
  });

  // ─── App Config ───────────────────────────────────────────────────────────

  // GET /config - get app config (admin+)
  app.get('/config', { preHandler: [requireAuth, requireMinRole('admin')] }, async (_request, reply) => {
    const config = await adminService.getConfig();
    return reply.send(config);
  });

  // PUT /config - update app config (super_admin only)
  app.put('/config', { preHandler: [requireAuth, requireMinRole('super_admin')] }, async (request, reply) => {
    const body = updateConfigSchema.parse(request.body);
    const result = await adminService.updateConfig(body);
    return reply.send(result);
  });

  // ─── Reports ──────────────────────────────────────────────────────────────

  // GET /reports - list content reports (moderator+)
  app.get('/reports', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { status } = request.query as { status?: string };
    const result = await adminService.listReports(status);
    return reply.send(result);
  });

  // PUT /reports/:id - update report (moderator+)
  app.put('/reports/:id', { preHandler: [requireAuth, requireMinRole('moderator')] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status, actionTaken } = request.body as { status: string; actionTaken: string };
    const result = await adminService.updateReport(id, status, actionTaken, request.user!.uid);
    return reply.send(result);
  });

  // POST /reports - submit content report (any authenticated user)
  app.post('/reports', { preHandler: [requireAuth] }, async (request, reply) => {
    const body = createReportSchema.parse(request.body);
    const result = await adminService.createReport(body, request.user!.uid);
    return reply.status(201).send(result);
  });
}
