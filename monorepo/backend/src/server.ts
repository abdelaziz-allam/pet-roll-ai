import { buildApp } from './app.js';
import { env } from './config/env.js';

async function start() {
  const app = await buildApp();

  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(`PET Roll API running at http://0.0.0.0:${env.PORT}`);
    app.log.info(`Swagger docs at http://0.0.0.0:${env.PORT}/docs`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
// pipeline trigger
