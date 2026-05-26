import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(8080),

  GCP_PROJECT_ID: z.string().default('petroll-production'),
  GCP_REGION: z.string().default('europe-north1'),

  FIREBASE_PROJECT_ID: z.string().default('petroll-production'),
  FIREBASE_STORAGE_BUCKET: z.string().default('petroll-production-assets'),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

  FIRESTORE_EMULATOR_HOST: z.string().optional(),
  FIREBASE_AUTH_EMULATOR_HOST: z.string().optional(),
  FIREBASE_STORAGE_EMULATOR_HOST: z.string().optional(),

  JWT_SECRET: z.string().min(16),
  JWT_EXPIRY: z.string().default('7d'),
  REFRESH_TOKEN_EXPIRY: z.string().default('30d'),

  FCM_SERVER_KEY: z.string().optional(),

  CORS_ORIGINS: z.string().default('http://localhost:3001,http://localhost:3002,https://petfolioo.com,https://admin.petfolioo.com'),

  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW: z.coerce.number().default(60000),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('Invalid environment variables:', result.error.flatten().fieldErrors);
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();
