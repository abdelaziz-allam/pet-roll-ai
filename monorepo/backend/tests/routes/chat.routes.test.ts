import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

const mockRoomDoc = {
  exists: true,
  id: 'room-1',
  data: () => ({ participants: ['user-1', 'user-2'], lastMessage: 'Hello', lastMessageAt: '2024-01-01' }),
};

const mockMessagesSnap = {
  docs: [
    { id: 'msg-1', data: () => ({ senderId: 'user-1', text: 'Hello', createdAt: '2024-01-01' }) },
    { id: 'msg-2', data: () => ({ senderId: 'user-2', text: 'Hi there', createdAt: '2024-01-01' }) },
  ],
};

vi.mock('../../src/config/firebase', () => ({
  db: {
    collection: vi.fn((name: string) => {
      if (name === 'chat_rooms') {
        return {
          where: vi.fn().mockReturnThis(),
          orderBy: vi.fn().mockReturnThis(),
          get: vi.fn().mockResolvedValue({
            docs: [
              { id: 'room-1', data: () => ({ participants: ['user-1', 'user-2'], lastMessage: 'Hello' }) },
            ],
          }),
          doc: vi.fn(() => ({
            get: vi.fn().mockResolvedValue(mockRoomDoc),
            collection: vi.fn(() => ({
              orderBy: vi.fn().mockReturnThis(),
              limit: vi.fn().mockReturnThis(),
              get: vi.fn().mockResolvedValue(mockMessagesSnap),
            })),
          })),
        };
      }
      return {
        where: vi.fn().mockReturnThis(),
        get: vi.fn().mockResolvedValue({ docs: [] }),
      };
    }),
  },
  auth: { verifyIdToken: vi.fn() },
  storage: { bucket: vi.fn() },
  FieldValue: { serverTimestamp: vi.fn(), increment: vi.fn() },
}));

vi.mock('../../src/middleware/require-auth', () => ({
  requireAuth: vi.fn().mockImplementation(async (req: any) => {
    req.user = { uid: 'user-1', email: 'test@example.com', role: 'user' };
  }),
}));

vi.mock('../../src/config/env', () => ({
  env: { NODE_ENV: 'test', PORT: 3001, GCP_PROJECT_ID: 'petroll-mvp', FIREBASE_PROJECT_ID: 'petroll-mvp', JWT_SECRET: 'test-secret-minimum-16-chars', JWT_EXPIRY: '1h', REFRESH_TOKEN_EXPIRY: '7d', CORS_ORIGINS: 'http://localhost:5173', RATE_LIMIT_MAX: 100, RATE_LIMIT_WINDOW: 60000, GCS_BUCKET: 'petroll-mvp.appspot.com' },
}));

import { chatRoutes } from '../../src/modules/chat/chat.routes';

describe('Chat Routes', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.decorateRequest('user', null);
    fastify.decorateRequest('adminUser', null);
    await fastify.register(chatRoutes);
    await fastify.ready();
  });

  afterAll(() => fastify.close());

  describe('GET /rooms', () => {
    it('returns chat rooms with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/rooms' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /rooms/:roomId', () => {
    it('returns room with messages with 200', async () => {
      const res = await fastify.inject({ method: 'GET', url: '/rooms/room-1' });
      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.payload);
      expect(body.room).toBeDefined();
      expect(body.messages).toBeDefined();
    });
  });
});
