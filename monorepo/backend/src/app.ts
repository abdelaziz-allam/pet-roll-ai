import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { env } from './config/env.js';
import { errorHandler } from './plugins/error-handler.js';
import authPlugin from './plugins/auth.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { petsRoutes } from './modules/pets/pets.routes.js';
import { healthRoutes } from './modules/health/health.routes.js';
import { vaccinationRoutes } from './modules/vaccination/vaccination.routes.js';
import { pregnancyRoutes } from './modules/pregnancy/pregnancy.routes.js';
import { schedulesRoutes } from './modules/schedules/schedules.routes.js';
import { matingRoutes } from './modules/mating/mating.routes.js';
import { chatRoutes } from './modules/chat/chat.routes.js';
import { notificationRoutes } from './modules/notifications/notifications.routes.js';
import { reportsRoutes } from './modules/reports/reports.routes.js';
import { adminRoutes } from './modules/admin/admin.routes.js';
import { cronRoutes } from './modules/cron/cron.routes.js';
import { tipsRoutes } from './modules/tips/tips.routes.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  // Global plugins
  await app.register(helmet);
  await app.register(cors, {
    origin: env.ALLOWED_ORIGINS.split(','),
    credentials: true,
  });
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
  });
  await app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 },
  });
  await app.register(errorHandler);
  await app.register(authPlugin);

  // Swagger documentation
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'PET Roll API',
        version: '1.0.0',
        description: 'Pet health management platform API',
      },
      servers: [
        { url: 'https://api.petfolioo.com', description: 'Production' },
        { url: 'http://localhost:3000', description: 'Local Development' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });
  await app.register(swaggerUI, { routePrefix: '/docs' });

  // Health check (outside versioned prefix)
  app.get('/api/v1/health', async () => ({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    services: {
      firestore: 'connected',
      storage: 'connected',
      fcm: 'ready',
    },
  }));

  app.get('/api/v1/ping', async () => 'pong');

  // App config (public)
  app.get('/api/v1/config', async () => {
    const { db } = await import('./config/firebase.js');
    const doc = await db.collection('app_config').doc('current').get();
    if (!doc.exists) {
      return {
        minAppVersion: '1.0.0',
        latestAppVersion: '1.0.0',
        maintenanceMode: false,
        featureFlags: { matingEnabled: true },
      };
    }
    return doc.data();
  });

  // API v1 routes
  await app.register(async (v1) => {
    v1.register(authRoutes, { prefix: '/auth' });
    v1.register(petsRoutes, { prefix: '/pets' });
    v1.register(healthRoutes, { prefix: '' });
    v1.register(vaccinationRoutes, { prefix: '' });
    v1.register(pregnancyRoutes, { prefix: '' });
    v1.register(schedulesRoutes, { prefix: '' });
    v1.register(matingRoutes, { prefix: '/mating' });
    v1.register(chatRoutes, { prefix: '/chat' });
    v1.register(notificationRoutes, { prefix: '/notifications' });
    v1.register(reportsRoutes, { prefix: '' });
    v1.register(adminRoutes, { prefix: '/admin' });
    v1.register(cronRoutes, { prefix: '/cron' });
    v1.register(tipsRoutes, { prefix: '/tips' });
  }, { prefix: '/api/v1' });

  return app;
}
