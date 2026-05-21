import { FastifyInstance, FastifyError } from 'fastify';
import fp from 'fastify-plugin';

async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
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
