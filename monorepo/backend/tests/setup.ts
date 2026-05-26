import { beforeAll } from 'vitest';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-minimum-16-chars';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
  process.env.GCP_PROJECT_ID = 'petroll-mvp';
  process.env.FIREBASE_PROJECT_ID = 'petroll-mvp';
  process.env.FIREBASE_STORAGE_BUCKET = 'petroll-mvp-assets';
  process.env.ALLOWED_ORIGINS = 'http://localhost:3001';
});
