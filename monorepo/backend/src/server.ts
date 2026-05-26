import Fastify from 'fastify';
import cors from '@fastify/cors';

const port = Number(process.env.PORT) || 8080;

async function start() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: true, credentials: true });

  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  try {
    const { registerRoutes } = await import('./app');
    await registerRoutes(app);
    console.log('All application routes registered');
  } catch (err) {
    console.error('Failed to load application routes (health endpoint still works):', err);
    app.get('/api/v1/status', async () => ({
      status: 'degraded',
      error: 'Application failed to initialize',
    }));
  }

  await app.listen({ port, host: '0.0.0.0' });
  console.log(`PET Roll API listening on port ${port}`);
}

start().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
