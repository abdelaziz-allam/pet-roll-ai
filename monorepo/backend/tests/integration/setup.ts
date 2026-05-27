import { vi } from 'vitest';

const store: Record<string, any> = {};

function createMockDoc(id: string, data: any | null) {
  return {
    exists: data !== null,
    id,
    data: () => data,
    ref: { id },
  };
}

function createMockSnapshot(docs: Array<{ id: string; data: any }>) {
  return {
    empty: docs.length === 0,
    size: docs.length,
    docs: docs.map((d) => ({
      id: d.id,
      data: () => d.data,
      ref: { id: d.id },
    })),
  };
}

vi.mock('../../src/config/firebase', () => {
  const createCollection = (collectionName: string) => {
    if (!store[collectionName]) store[collectionName] = {};
    let docId: string | null = null;
    let filters: Array<{ field: string; op: string; value: any }> = [];

    const col: any = {
      doc: (id: string) => {
        docId = id;
        return {
          get: vi.fn(async () => {
            const data = store[collectionName]?.[id] || null;
            return createMockDoc(id, data);
          }),
          set: vi.fn(async (data: any) => {
            if (!store[collectionName]) store[collectionName] = {};
            store[collectionName][id] = { ...data };
          }),
          update: vi.fn(async (data: any) => {
            if (!store[collectionName]) store[collectionName] = {};
            if (store[collectionName][id]) {
              store[collectionName][id] = { ...store[collectionName][id], ...data };
            }
          }),
          delete: vi.fn(async () => {
            if (store[collectionName]) delete store[collectionName][id];
          }),
          collection: (subCol: string) => createCollection(`${collectionName}/${id}/${subCol}`),
        };
      },
      add: vi.fn(async (data: any) => {
        if (!store[collectionName]) store[collectionName] = {};
        const newId = `${collectionName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        store[collectionName][newId] = { ...data };
        return { id: newId };
      }),
      get: vi.fn(async () => {
        const allDocs = Object.entries(store[collectionName] || {})
          .filter(([_, data]) => {
            return filters.every((f) => {
              if (f.op === '==') return (data as any)[f.field] === f.value;
              if (f.op === 'array-contains') return Array.isArray((data as any)[f.field]) && (data as any)[f.field].includes(f.value);
              return true;
            });
          })
          .map(([id, data]) => ({ id, data }));
        filters = [];
        return createMockSnapshot(allDocs);
      }),
      where: vi.fn((field: string, op: string, value: any) => {
        filters.push({ field, op, value });
        return col;
      }),
      orderBy: vi.fn(() => col),
      offset: vi.fn(() => col),
      limit: vi.fn(() => col),
      count: vi.fn(() => ({
        get: vi.fn(async () => {
          const count = Object.keys(store[collectionName] || {}).length;
          return { data: () => ({ count }) };
        }),
      })),
    };

    return col;
  };

  return {
    db: {
      collection: vi.fn((name: string) => createCollection(name)),
      batch: vi.fn(() => ({
        delete: vi.fn(),
        update: vi.fn(),
        set: vi.fn(),
        commit: vi.fn(async () => undefined),
      })),
    },
    auth: {
      verifyIdToken: vi.fn(async (token: string) => {
        if (token === 'valid-firebase-token') {
          return { uid: 'user-1', email: 'john@test.com' };
        }
        if (token === 'user2-firebase-token') {
          return { uid: 'user-2', email: 'jane@test.com' };
        }
        if (token === 'admin-firebase-token') {
          return { uid: 'admin-1', email: 'admin@test.com' };
        }
        throw new Error('Invalid token');
      }),
    },
    storage: {
      bucket: vi.fn(() => ({
        file: vi.fn(() => ({
          delete: vi.fn(async () => undefined),
          getSignedUrl: vi.fn(async () => ['https://signed-url.example.com/report.pdf']),
        })),
        deleteFiles: vi.fn(async () => undefined),
      })),
    },
    messaging: {
      send: vi.fn(async () => 'message-id'),
    },
    FieldValue: {
      serverTimestamp: vi.fn(() => new Date().toISOString()),
      arrayUnion: vi.fn((...args: any[]) => args),
      arrayRemove: vi.fn((...args: any[]) => ({ _remove: args })),
      increment: vi.fn((n: number) => ({ _increment: n })),
      delete: vi.fn(() => ({ _delete: true })),
    },
    Timestamp: {
      now: vi.fn(() => ({ toDate: () => new Date() })),
    },
  };
});

export function getStore() {
  return store;
}

export function clearStore() {
  Object.keys(store).forEach((key) => delete store[key]);
}

export function seedStore(collection: string, id: string, data: any) {
  if (!store[collection]) store[collection] = {};
  store[collection][id] = data;
}
