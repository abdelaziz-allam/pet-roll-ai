import { FastifyInstance, FastifyError } from 'fastify';
import fp from 'fastify-plugin';
import { ZodError } from 'zod';

async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    // Routes validate bodies with schema.parse(); a rejected body is the caller's mistake.
    if (error instanceof ZodError) {
      return reply.code(400).send({
        error: 'ValidationError',
        message: 'Invalid request',
        statusCode: 400,
        issues: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      });
    }

    const statusCode = error.statusCode || 500;

    if (statusCode >= 500) {
      request.log.error(error);
    }

    reply.code(statusCode).send({
      error: error.name || 'InternalServerError',
      message: statusCode >= 500 ? 'Internal server error' : error.message,
      statusCode,
    });
  });
}

export default fp(errorHandler, { name: 'error-handler' });
