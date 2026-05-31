import { FastifyInstance } from 'fastify';
import { requireAuth } from '../../middleware/require-auth';
import { requireAdminAuth } from '../../middleware/require-admin-auth';
import * as feedbackService from './feedback.service';

export async function feedbackRoutes(fastify: FastifyInstance) {
  // === User routes ===

  fastify.post('/', { preHandler: [requireAuth] }, async (request, reply) => {
    const { type, message } = request.body as { type: 'bug' | 'suggestion' | 'general'; message: string };

    if (!type || !message) {
      return reply.code(400).send({ error: 'Bad Request', message: 'type and message are required' });
    }

    if (!['bug', 'suggestion', 'general'].includes(type)) {
      return reply.code(400).send({ error: 'Bad Request', message: 'type must be bug, suggestion, or general' });
    }

    const user = request.user!;
    const result = await feedbackService.createFeedback(
      user.uid,
      (user as any).name || user.email,
      user.email,
      { type, message }
    );

    return reply.code(201).send(result);
  });

  fastify.get('/', { preHandler: [requireAuth] }, async (request, reply) => {
    const { page = 1, limit = 20 } = request.query as { page?: number; limit?: number };
    const user = request.user!;
    const result = await feedbackService.getUserFeedback(user.uid, +page, +limit);
    return reply.code(200).send(result);
  });

  // === Admin routes ===

  fastify.get('/admin', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { page = 1, limit = 20, status, type, isTodo, dateFrom, dateTo } = request.query as {
      page?: number;
      limit?: number;
      status?: string;
      type?: string;
      isTodo?: string;
      dateFrom?: string;
      dateTo?: string;
    };

    try {
      const result = await feedbackService.listAllFeedback({
        page: +page,
        limit: +limit,
        status,
        type,
        isTodo,
        dateFrom,
        dateTo,
      });

      return reply.code(200).send(result);
    } catch (err: any) {
      request.log.error({ err, query: request.query }, 'Failed to list feedback');
      return reply.code(500).send({
        error: 'Error',
        message: err.message || 'Internal server error',
        statusCode: 500,
      });
    }
  });

  fastify.put('/admin/:id/reply', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { reply: adminReply } = request.body as { reply: string };

    if (!adminReply) {
      return reply.code(400).send({ error: 'Bad Request', message: 'reply is required' });
    }

    const admin = request.adminUser!;
    const result = await feedbackService.replyToFeedback(id, adminReply, admin.email);
    return reply.code(200).send(result);
  });

  fastify.put('/admin/:id/status', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status } = request.body as { status: 'open' | 'replied' | 'closed' };

    if (!status || !['open', 'replied', 'closed'].includes(status)) {
      return reply.code(400).send({ error: 'Bad Request', message: 'status must be open, replied, or closed' });
    }

    const result = await feedbackService.updateFeedbackStatus(id, status);
    return reply.code(200).send(result);
  });

  fastify.put('/admin/:id/todo', { preHandler: [requireAdminAuth] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { isTodo } = request.body as { isTodo: boolean };

    if (typeof isTodo !== 'boolean') {
      return reply.code(400).send({ error: 'Bad Request', message: 'isTodo must be a boolean' });
    }

    const result = await feedbackService.toggleTodo(id, isTodo);
    return reply.code(200).send(result);
  });
}
