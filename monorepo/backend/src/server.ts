import { env } from './config/env';

async function start() {
  try {
    const { buildApp } = await import('./app');
    const app = await buildApp();
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(`PET Roll API running on port ${env.PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
