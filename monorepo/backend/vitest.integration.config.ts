import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/integration/**/*.test.ts'],
    setupFiles: ['./tests/integration/setup.ts'],
    env: {
      NODE_ENV: 'test',
      PORT: '3001',
      GCP_PROJECT_ID: 'petroll-mvp',
      FIREBASE_PROJECT_ID: 'petroll-mvp',
      JWT_SECRET: 'test-secret-minimum-16-chars',
      JWT_EXPIRY: '1h',
      REFRESH_TOKEN_EXPIRY: '7d',
      FIRESTORE_EMULATOR_HOST: 'localhost:8080',
      FIREBASE_AUTH_EMULATOR_HOST: 'localhost:9099',
      FIREBASE_STORAGE_EMULATOR_HOST: 'localhost:9199',
      CORS_ORIGINS: 'http://localhost:5173',
      GCS_BUCKET: 'petroll-mvp.appspot.com',
      RATE_LIMIT_MAX: '1000',
      RATE_LIMIT_WINDOW: '60000',
    },
  },
});
