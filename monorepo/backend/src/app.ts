import type { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';

export async function registerRoutes(app: FastifyInstance) {
  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(rateLimit, { max: 100, timeWindow: 60000 });
  await app.register(multipart, { limits: { fileSize: 10 * 1024 * 1024 } });

  try {
    const errorHandler = await import('./plugins/error-handler');
    await app.register(errorHandler.default);
  } catch (e) { console.warn('Error handler plugin skipped:', (e as Error).message); }

  try {
    const authPlugin = await import('./plugins/auth');
    await app.register(authPlugin.default);
  } catch (e) { console.warn('Auth plugin skipped (Firebase may be unavailable):', (e as Error).message); }

  await app.register(async (api) => {
    const routes = [
      { path: './modules/auth/auth.routes', prefix: '/auth', name: 'authRoutes' },
      { path: './modules/pets/pets.routes', prefix: '/pets', name: 'petsRoutes' },
      { path: './modules/health/health.routes', prefix: '/health-records', name: 'healthRoutes' },
      { path: './modules/vaccination/vaccination.routes', prefix: '/vaccinations', name: 'vaccinationRoutes' },
      { path: './modules/pregnancy/pregnancy.routes', prefix: '/pregnancy', name: 'pregnancyRoutes' },
      { path: './modules/schedules/schedules.routes', prefix: '/schedules', name: 'schedulesRoutes' },
      { path: './modules/mating/mating.routes', prefix: '/mating', name: 'matingRoutes' },
      { path: './modules/chat/chat.routes', prefix: '/chat', name: 'chatRoutes' },
      { path: './modules/notifications/notifications.routes', prefix: '/notifications', name: 'notificationsRoutes' },
      { path: './modules/reports/reports.routes', prefix: '/reports', name: 'reportsRoutes' },
      { path: './modules/tips/tips.routes', prefix: '/tips', name: 'tipsRoutes' },
      { path: './modules/admin/admin.routes', prefix: '/admin', name: 'adminRoutes' },
      { path: './modules/admin-auth/admin-auth.routes', prefix: '/admin-auth', name: 'adminAuthRoutes' },
      { path: './modules/cron/cron.routes', prefix: '/cron', name: 'cronRoutes' },
      { path: './modules/verification/verification.routes', prefix: '/verification', name: 'verificationRoutes' },
    ];

    for (const route of routes) {
      try {
        const mod = await import(route.path);
        const routeFn = mod[route.name] || mod.default;
        if (routeFn) {
          await api.register(routeFn, { prefix: route.prefix });
        }
      } catch (e) {
        console.warn(`Route ${route.prefix} skipped:`, (e as Error).message);
      }
    }
  }, { prefix: '/api/v1' });
}

export async function buildApp() {
  const Fastify = (await import('fastify')).default;
  const cors = (await import('@fastify/cors')).default;
  const app = Fastify({ logger: true });
  await app.register(cors, { origin: true, credentials: true });
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));
  await registerRoutes(app);
  return app;
}
