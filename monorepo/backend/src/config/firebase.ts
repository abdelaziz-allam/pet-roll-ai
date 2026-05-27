import { env } from './env';

const store: Record<string, Record<string, any>> = {};

function createMemoryCollection(collectionName: string) {
  if (!store[collectionName]) store[collectionName] = {};

  return {
    doc(id: string) {
      return {
        get: async () => ({
          exists: !!store[collectionName]?.[id],
          data: () => store[collectionName]?.[id] || null,
          id,
        }),
        set: async (data: any) => {
          if (!store[collectionName]) store[collectionName] = {};
          store[collectionName][id] = { ...data };
        },
        update: async (data: any) => {
          if (!store[collectionName]) store[collectionName] = {};
          if (!store[collectionName][id]) throw Object.assign(new Error('Not found'), { statusCode: 404 });
          store[collectionName][id] = { ...store[collectionName][id], ...data };
        },
        delete: async () => {
          if (store[collectionName]) delete store[collectionName][id];
        },
      };
    },
    async add(data: any) {
      const id = `auto_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      if (!store[collectionName]) store[collectionName] = {};
      store[collectionName][id] = { ...data };
      return { id };
    },
    where(field: string, op: string, value: any) {
      return createQuery(collectionName, [{ field, op, value }]);
    },
    orderBy(field: string, direction?: string) {
      return createQuery(collectionName, [], field, direction);
    },
    async get() {
      const collection = store[collectionName] || {};
      const entries = Object.entries(collection);
      return {
        empty: entries.length === 0,
        size: entries.length,
        docs: entries.map(([id, data]) => ({
          id,
          exists: true,
          data: () => data,
        })),
      };
    },
    count() {
      return {
        get: async () => ({
          data: () => ({ count: Object.keys(store[collectionName] || {}).length }),
        }),
      };
    },
    offset(n: number) {
      return createQuery(collectionName, [], undefined, undefined, n);
    },
    limit(n: number) {
      return createQuery(collectionName, [], undefined, undefined, undefined, n);
    },
  };
}

function createQuery(
  collectionName: string,
  filters: Array<{ field: string; op: string; value: any }> = [],
  orderField?: string,
  orderDir?: string,
  offsetVal?: number,
  limitVal?: number
) {
  const query: any = {
    _filters: filters,
    _orderField: orderField,
    _orderDir: orderDir,
    _offset: offsetVal,
    _limit: limitVal,
  };

  query.where = (field: string, op: string, value: any) => {
    return createQuery(collectionName, [...filters, { field, op, value }], orderField, orderDir, offsetVal, limitVal);
  };

  query.orderBy = (field: string, dir?: string) => {
    return createQuery(collectionName, filters, field, dir, offsetVal, limitVal);
  };

  query.offset = (n: number) => {
    return createQuery(collectionName, filters, orderField, orderDir, n, limitVal);
  };

  query.limit = (n: number) => {
    return createQuery(collectionName, filters, orderField, orderDir, offsetVal, n);
  };

  query.count = () => ({
    get: async () => {
      const results = executeQuery(collectionName, filters);
      return { data: () => ({ count: results.length }) };
    },
  });

  query.get = async () => {
    let results = executeQuery(collectionName, filters);
    if (orderField) {
      results.sort((a: any, b: any) => {
        const aVal = a.data[orderField] || '';
        const bVal = b.data[orderField] || '';
        return orderDir === 'desc' ? (bVal > aVal ? 1 : -1) : (aVal > bVal ? 1 : -1);
      });
    }
    if (offsetVal) results = results.slice(offsetVal);
    if (limitVal) results = results.slice(0, limitVal);
    return {
      empty: results.length === 0,
      size: results.length,
      docs: results.map((r: any) => ({
        id: r.id,
        exists: true,
        data: () => r.data,
      })),
    };
  };

  return query;
}

function getNestedField(obj: any, path: string): any {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}

function executeQuery(collectionName: string, filters: Array<{ field: string; op: string; value: any }>) {
  const collection = store[collectionName] || {};
  return Object.entries(collection)
    .filter(([_, data]) => {
      return filters.every(({ field, op, value }) => {
        const fieldVal = getNestedField(data, field);
        switch (op) {
          case '==': return fieldVal === value;
          case '!=': return fieldVal !== value;
          case '>': return fieldVal > value;
          case '>=': return fieldVal >= value;
          case '<': return fieldVal < value;
          case '<=': return fieldVal <= value;
          case 'in': return Array.isArray(value) && value.includes(fieldVal);
          case 'array-contains': return Array.isArray(fieldVal) && fieldVal.includes(value);
          default: return true;
        }
      });
    })
    .map(([id, data]) => ({ id, data }));
}

function initMemoryStore() {
  console.log('[DEV] Using in-memory Firestore mock');
  const memDb: any = {
    collection: (name: string) => createMemoryCollection(name),
    settings: () => {},
  };
  const memAuth: any = {
    verifyIdToken: async (token: string) => ({ uid: token, email: `${token}@mock.dev` }),
    createUser: async (data: any) => ({ uid: `uid_${Date.now()}`, ...data }),
  };
  const memStorage: any = { bucket: () => ({}) };
  const memMessaging: any = { send: async () => ({}) };
  const memFieldValue: any = {
    serverTimestamp: () => new Date().toISOString(),
    delete: () => undefined,
    arrayUnion: (...items: any[]) => items,
    arrayRemove: (...items: any[]) => items,
    increment: (n: number) => n,
  };
  const memTimestamp: any = {
    now: () => ({ toDate: () => new Date() }),
    fromDate: (d: Date) => ({ toDate: () => d }),
  };
  return { db: memDb, auth: memAuth, storage: memStorage, messaging: memMessaging, FieldValue: memFieldValue, Timestamp: memTimestamp };
}

function initFirebase() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    const options: any = {
      projectId: env.FIREBASE_PROJECT_ID,
      storageBucket: env.GCS_BUCKET,
    };

    if (env.GOOGLE_APPLICATION_CREDENTIALS) {
      const serviceAccount = require(env.GOOGLE_APPLICATION_CREDENTIALS);
      options.credential = admin.credential.cert(serviceAccount);
    } else {
      options.credential = admin.credential.applicationDefault();
    }

    admin.initializeApp(options);
  }

  const fireDb = admin.firestore();
  fireDb.settings({ ignoreUndefinedProperties: true });

  return {
    db: fireDb,
    auth: admin.auth(),
    storage: admin.storage(),
    messaging: admin.messaging(),
    FieldValue: admin.firestore.FieldValue,
    Timestamp: admin.firestore.Timestamp,
  };
}

const firebase = env.USE_MEMORY_STORE ? initMemoryStore() : initFirebase();

export const db = firebase.db;
export const auth = firebase.auth;
export const storage = firebase.storage;
export const messaging = firebase.messaging;
export const FieldValue = firebase.FieldValue;
export const Timestamp = firebase.Timestamp;
