import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  process.env.NODE_ENV = 'test';
  process.env.PORT = '3001';
  process.env.GCP_PROJECT_ID = 'petroll-mvp';
  process.env.FIREBASE_PROJECT_ID = 'petroll-mvp';
  process.env.JWT_SECRET = 'test-secret-minimum-16-chars';
  process.env.JWT_EXPIRY = '1h';
  process.env.REFRESH_TOKEN_EXPIRY = '7d';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
  process.env.CORS_ORIGINS = 'http://localhost:5173';
  process.env.GCS_BUCKET = 'petroll-mvp.appspot.com';
});

vi.mock('../src/config/firebase', () => {
  const mockDoc = (data: any = null, exists = true) => ({
    exists,
    id: 'mock-id',
    data: () => data,
    ref: { id: 'mock-id' },
  });

  const mockSnapshot = (docs: any[] = []) => ({
    empty: docs.length === 0,
    size: docs.length,
    docs: docs.map((d, i) => ({
      id: d.id || `doc-${i}`,
      data: () => d,
      ref: { id: d.id || `doc-${i}` },
    })),
  });

  const mockCollection = {
    doc: vi.fn().mockReturnThis(),
    add: vi.fn().mockResolvedValue({ id: 'new-doc-id' }),
    get: vi.fn().mockResolvedValue(mockDoc()),
    set: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    count: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
    }),
  };

  return {
    db: {
      collection: vi.fn(() => mockCollection),
      batch: vi.fn(() => ({
        delete: vi.fn(),
        update: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      })),
    },
    auth: {
      verifyIdToken: vi.fn().mockResolvedValue({ uid: 'test-uid', email: 'test@example.com' }),
    },
    storage: {
      bucket: vi.fn(() => ({
        file: vi.fn(() => ({
          delete: vi.fn().mockResolvedValue(undefined),
          getSignedUrl: vi.fn().mockResolvedValue(['https://signed-url.example.com']),
        })),
        deleteFiles: vi.fn().mockResolvedValue(undefined),
      })),
    },
    messaging: {
      send: vi.fn().mockResolvedValue('message-id'),
    },
    FieldValue: {
      serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
      arrayUnion: vi.fn((...args) => ({ _arrayUnion: args })),
      arrayRemove: vi.fn((...args) => ({ _arrayRemove: args })),
      increment: vi.fn((n) => ({ _increment: n })),
      delete: vi.fn(() => ({ _delete: true })),
    },
    Timestamp: {
      now: vi.fn(() => ({ toDate: () => new Date() })),
    },
  };
});
