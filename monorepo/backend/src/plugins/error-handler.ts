import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Validation Error',
        message: 'Request validation failed',
        details: error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    if (error.statusCode) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name || 'Error',
        message: error.message,
      });
    }

    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
    });
  });
}
