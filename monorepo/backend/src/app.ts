import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { env } from './config/env';
import authPlugin from './plugins/auth';
import errorHandler from './plugins/error-handler';
import { authRoutes } from './modules/auth/auth.routes';
import { petsRoutes } from './modules/pets/pets.routes';
import { healthRoutes } from './modules/health/health.routes';
import { vaccinationRoutes } from './modules/vaccination/vaccination.routes';
import { pregnancyRoutes } from './modules/pregnancy/pregnancy.routes';
import { schedulesRoutes } from './modules/schedules/schedules.routes';
import { matingRoutes } from './modules/mating/mating.routes';
import { chatRoutes } from './modules/chat/chat.routes';
import { notificationsRoutes } from './modules/notifications/notifications.routes';
import { reportsRoutes } from './modules/reports/reports.routes';
import { adminRoutes } from './modules/admin/admin.routes';
import { adminAuthRoutes } from './modules/admin-auth/admin-auth.routes';
import { cronRoutes } from './modules/cron/cron.routes';
import { verificationRoutes } from './modules/verification/verification.routes';
import { seedInitialData } from './seed/initial-data';

export async function buildApp() {
  const app = Fastify({
    logger: env.NODE_ENV !== 'test',
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'PET Roll API',
        description: 'Complete API for the PET Roll platform — pet health management, mating, admin portal, and more.',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${env.PORT}`, description: 'Local development' }],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Admin JWT token obtained from POST /api/v1/admin-auth/login, or App user JWT for mobile endpoints.',
          },
        },
      },
      security: [{ BearerAuth: [] }],
      tags: [
        { name: 'Health', description: 'System health check' },
        { name: 'Admin Auth', description: 'Admin portal authentication & user management' },
        { name: 'Admin', description: 'Admin portal — app user & pet management' },
        { name: 'Auth', description: 'Mobile app authentication (Firebase)' },
        { name: 'Pets', description: 'Pet CRUD for mobile app users' },
        { name: 'Mating', description: 'Mating listings and matches' },
        { name: 'Chat', description: 'In-app messaging' },
        { name: 'Notifications', description: 'Push notifications' },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true,
      persistAuthorization: true,
    },
  });

  await app.register(helmet, {
    contentSecurityPolicy: false,
  });
  await app.register(cors, {
    origin: env.CORS_ORIGINS.split(','),
    credentials: true,
  });
  await app.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
  });
  await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } });

  await app.register(errorHandler);
  await app.register(authPlugin);

  app.decorateRequest('adminUser', null);

  app.get('/health', { schema: { tags: ['Health'], security: [] } }, async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  await app.register(async (api) => {
    await api.register(authRoutes, { prefix: '/auth' });
    await api.register(petsRoutes, { prefix: '/pets' });
    await api.register(healthRoutes, { prefix: '' });
    await api.register(vaccinationRoutes, { prefix: '' });
    await api.register(pregnancyRoutes, { prefix: '' });
    await api.register(schedulesRoutes, { prefix: '' });
    await api.register(matingRoutes, { prefix: '/mating' });
    await api.register(chatRoutes, { prefix: '/chat' });
    await api.register(notificationsRoutes, { prefix: '/notifications' });
    await api.register(reportsRoutes, { prefix: '' });
    await api.register(adminRoutes, { prefix: '/admin' });
    await api.register(adminAuthRoutes, { prefix: '/admin-auth' });
    await api.register(cronRoutes, { prefix: '/cron' });
    await api.register(verificationRoutes, { prefix: '/verification' });
  }, { prefix: '/api/v1' });

  await seedInitialData();

  return app;
}
