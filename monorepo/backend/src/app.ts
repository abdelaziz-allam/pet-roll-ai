import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
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
import { tipsRoutes } from './modules/tips/tips.routes';

export async function buildApp() {
  const app = Fastify({
    logger: env.NODE_ENV !== 'test',
  });

  await app.register(helmet, { contentSecurityPolicy: false });
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

  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  await app.register(async (api) => {
    await api.register(authRoutes, { prefix: '/auth' });
    await api.register(petsRoutes, { prefix: '/pets' });
    await api.register(healthRoutes, { prefix: '/health-records' });
    await api.register(vaccinationRoutes, { prefix: '/vaccinations' });
    await api.register(pregnancyRoutes, { prefix: '/pregnancy' });
    await api.register(schedulesRoutes, { prefix: '/schedules' });
    await api.register(matingRoutes, { prefix: '/mating' });
    await api.register(chatRoutes, { prefix: '/chat' });
    await api.register(notificationsRoutes, { prefix: '/notifications' });
    await api.register(reportsRoutes, { prefix: '/reports' });
    await api.register(tipsRoutes, { prefix: '/tips' });

    try {
      const { adminRoutes } = await import('./modules/admin/admin.routes');
      await api.register(adminRoutes, { prefix: '/admin' });
    } catch (e) { console.warn('Admin routes skipped:', (e as Error).message); }

    try {
      const { adminAuthRoutes } = await import('./modules/admin-auth/admin-auth.routes');
      await api.register(adminAuthRoutes, { prefix: '/admin-auth' });
    } catch (e) { console.warn('Admin-auth routes skipped:', (e as Error).message); }

    try {
      const { cronRoutes } = await import('./modules/cron/cron.routes');
      await api.register(cronRoutes, { prefix: '/cron' });
    } catch (e) { console.warn('Cron routes skipped:', (e as Error).message); }

    try {
      const { verificationRoutes } = await import('./modules/verification/verification.routes');
      await api.register(verificationRoutes, { prefix: '/verification' });
    } catch (e) { console.warn('Verification routes skipped:', (e as Error).message); }
  }, { prefix: '/api/v1' });

  return app;
}
