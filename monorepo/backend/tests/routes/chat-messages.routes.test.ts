import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const { store, currentUser } = vi.hoisted(() => ({
  store: {} as Record<string, Record<string, any>>,
  currentUser: { uid: 'user-1' },
}));

// Minimal in-memory Firestore: enough for rooms, their messages subcollection and ordering.
vi.mock('../../src/config/firebase', () => {
  let seq = 0;
  const collection = (path: string): any => ({
    doc: (id: string) => ({
      id,
      get: async () => ({ exists: !!store[path]?.[id], id, data: () => store[path]?.[id] }),
      update: async (data: any) => Object.assign(store[path][id], data),
      collection: (name: string) => collection(`${path}/${id}/${name}`),
    }),
    add: async (data: any) => {
      const id = `m${++seq}`;
      (store[path] ??= {})[id] = { ...data, createdAt: data.createdAt === 'TS' ? seq : data.createdAt };
      return collection(path).doc(id);
    },
    orderBy: (field: string, dir: string) => ({
      limit: (n: number) => ({
        get: async () => {
          const docs = Object.entries(store[path] ?? {})
            .sort(([, a]: any, [, b]: any) => (dir === 'desc' ? b[field] - a[field] : a[field] - b[field]))
            .slice(0, n)
            .map(([id, data]) => ({ id, data: () => data }));
          return { docs };
        },
      }),
    }),
  });
  return { db: { collection }, FieldValue: { serverTimestamp: () => 'TS' } };
});

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn(async (req: any) => {
    req.user = { uid: currentUser.uid, email: 'u@test.com', role: 'user' };
  }),
}));

import { chatRoutes } from '../../src/modules/chat/chat.routes';
import errorHandler from '../../src/plugins/error-handler';

describe('chat messages', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    app.decorateRequest('user', null);
    await app.register(errorHandler);
    await app.register(chatRoutes);
    await app.ready();
  });
  afterAll(() => app.close());

  beforeEach(() => {
    for (const k of Object.keys(store)) delete store[k];
    store.chat_rooms = { r1: { participants: ['user-1', 'user-2'], lastMessage: null } };
    currentUser.uid = 'user-1';
  });

  it('sends a text message as the signed-in user and updates the room summary', async () => {
    const res = await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: { text: '  hello  ', senderId: 'someone-else' } });
    expect(res.statusCode).toBe(201);
    const msg = res.json();
    expect(msg).toMatchObject({ roomId: 'r1', senderId: 'user-1', text: 'hello', imageUrl: null, type: 'text' });
    expect(store.chat_rooms.r1).toMatchObject({ lastMessage: 'hello', lastSenderId: 'user-1' });
  });

  it('sends an image message', async () => {
    const res = await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: { imageUrl: 'https://example.com/a.jpg' } });
    expect(res.statusCode).toBe(201);
    expect(res.json()).toMatchObject({ type: 'image', text: null });
    expect(store.chat_rooms.r1.lastMessage).toBe('Photo');
  });

  it('lists messages newest first, limited', async () => {
    for (const text of ['one', 'two', 'three']) {
      await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: { text } });
    }
    const res = await app.inject({ method: 'GET', url: '/rooms/r1/messages?limit=2' });
    expect(res.statusCode).toBe(200);
    expect(res.json().map((m: any) => m.text)).toEqual(['three', 'two']);
  });

  it('keeps people outside the room out, for reading and sending', async () => {
    currentUser.uid = 'intruder';
    expect((await app.inject({ method: 'GET', url: '/rooms/r1/messages' })).statusCode).toBe(403);
    expect((await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: { text: 'hi' } })).statusCode).toBe(403);
    expect(store['chat_rooms/r1/messages']).toBeUndefined();
  });

  it('returns 404 for an unknown room', async () => {
    expect((await app.inject({ method: 'GET', url: '/rooms/nope/messages' })).statusCode).toBe(404);
  });

  it('rejects an empty message with 400', async () => {
    expect((await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: { text: '   ' } })).statusCode).toBe(400);
    expect((await app.inject({ method: 'POST', url: '/rooms/r1/messages', payload: {} })).statusCode).toBe(400);
  });
});
