import Fastify, { FastifyInstance } from 'fastify';
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
      servers: env.NODE_ENV === 'production'
        ? [{ url: '/api/v1', description: 'Production' }]
        : [{ url: `http://localhost:${env.PORT}/api/v1`, description: 'Local development' }],
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
        { name: 'Health Records', description: 'Pet health records management' },
        { name: 'Vaccinations', description: 'Pet vaccination tracking' },
        { name: 'Pregnancy', description: 'Pet pregnancy tracking' },
        { name: 'Schedules', description: 'Pet care schedules' },
        { name: 'Mating', description: 'Mating listings and matches' },
        { name: 'Chat', description: 'In-app messaging' },
        { name: 'Notifications', description: 'Push notifications' },
        { name: 'Reports', description: 'Reports and analytics' },
        { name: 'Verification', description: 'Breeder verification requests' },
        { name: 'Cron', description: 'Scheduled tasks' },
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

  function withTag(tag: string) {
    return async (instance: FastifyInstance) => {
      instance.addHook('onRoute', (routeOptions) => {
        if (!routeOptions.schema) routeOptions.schema = {};
        if (!(routeOptions.schema as any).tags) (routeOptions.schema as any).tags = [tag];
      });
    };
  }

  await app.register(async (api) => {
    await api.register(withTag('Auth'));
    await api.register(authRoutes, { prefix: '/auth' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Pets'));
    await api.register(petsRoutes, { prefix: '/pets' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Health Records'));
    await api.register(healthRoutes, { prefix: '' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Vaccinations'));
    await api.register(vaccinationRoutes, { prefix: '' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Pregnancy'));
    await api.register(pregnancyRoutes, { prefix: '' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Schedules'));
    await api.register(schedulesRoutes, { prefix: '' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Mating'));
    await api.register(matingRoutes, { prefix: '/mating' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Chat'));
    await api.register(chatRoutes, { prefix: '/chat' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Notifications'));
    await api.register(notificationsRoutes, { prefix: '/notifications' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Reports'));
    await api.register(reportsRoutes, { prefix: '' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Admin'));
    await api.register(adminRoutes, { prefix: '/admin' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Admin Auth'));
    await api.register(adminAuthRoutes, { prefix: '/admin-auth' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Cron'));
    await api.register(cronRoutes, { prefix: '/cron' });
  }, { prefix: '/api/v1' });

  await app.register(async (api) => {
    await api.register(withTag('Verification'));
    await api.register(verificationRoutes, { prefix: '/verification' });
  }, { prefix: '/api/v1' });

  await seedInitialData();

  return app;
}
