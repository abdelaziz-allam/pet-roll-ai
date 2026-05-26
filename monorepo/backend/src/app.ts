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
import { tipsRoutes } from './modules/tips/tips.routes';
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
        { name: 'Tips', description: 'Daily tips for pet owners' },
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

  function taggedRoutes(routes: (fastify: FastifyInstance) => Promise<void>, tag: string) {
    return async (instance: FastifyInstance) => {
      instance.addHook('onRoute', (routeOptions) => {
        if (!routeOptions.schema) routeOptions.schema = {};
        if (!(routeOptions.schema as any).tags) (routeOptions.schema as any).tags = [tag];
      });
      await routes(instance);
    };
  }

  await app.register(async (api) => {
    await api.register(taggedRoutes(authRoutes, 'Auth'), { prefix: '/auth' });
    await api.register(taggedRoutes(petsRoutes, 'Pets'), { prefix: '/pets' });
    await api.register(taggedRoutes(healthRoutes, 'Health Records'), { prefix: '' });
    await api.register(taggedRoutes(vaccinationRoutes, 'Vaccinations'), { prefix: '' });
    await api.register(taggedRoutes(pregnancyRoutes, 'Pregnancy'), { prefix: '' });
    await api.register(taggedRoutes(schedulesRoutes, 'Schedules'), { prefix: '' });
    await api.register(taggedRoutes(matingRoutes, 'Mating'), { prefix: '/mating' });
    await api.register(taggedRoutes(chatRoutes, 'Chat'), { prefix: '/chat' });
    await api.register(taggedRoutes(notificationsRoutes, 'Notifications'), { prefix: '/notifications' });
    await api.register(taggedRoutes(reportsRoutes, 'Reports'), { prefix: '' });
    await api.register(taggedRoutes(adminRoutes, 'Admin'), { prefix: '/admin' });
    await api.register(taggedRoutes(adminAuthRoutes, 'Admin Auth'), { prefix: '/admin-auth' });
    await api.register(taggedRoutes(cronRoutes, 'Cron'), { prefix: '/cron' });
    await api.register(taggedRoutes(verificationRoutes, 'Verification'), { prefix: '/verification' });
    await api.register(taggedRoutes(tipsRoutes, 'Tips'), { prefix: '/tips' });
  }, { prefix: '/api/v1' });

  await seedInitialData();

  return app;
}
