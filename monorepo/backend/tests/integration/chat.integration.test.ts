import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, clearStore, seedStore } from './helpers';

describe('Chat API Integration', () => {
  let app: FastifyInstance;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    clearStore();
    seedUser('user-1', { email: 'john@test.com' });
    seedUser('user-2', { email: 'jane@test.com' });
    token = generateToken('user-1', 'john@test.com');
  });

  describe('GET /api/v1/chat/rooms', () => {
    it('returns chat rooms for authenticated user', async () => {
      seedStore('chat_rooms', 'room-1', {
        participants: ['user-1', 'user-2'],
        lastMessage: 'Hello!',
        lastMessageAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it('only returns rooms user participates in', async () => {
      seedStore('chat_rooms', 'room-1', {
        participants: ['user-2', 'user-3'],
        lastMessageAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.length).toBe(0);
    });

    it('returns 401 without auth', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms',
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('GET /api/v1/chat/rooms/:roomId', () => {
    it('returns room with messages for participant', async () => {
      seedStore('chat_rooms', 'room-1', {
        participants: ['user-1', 'user-2'],
        lastMessage: 'Hello!',
        lastMessageAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms/room-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(body.room).toBeDefined();
      expect(body.messages).toBeDefined();
    });

    it('returns 404 for non-existent room', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms/fake-room',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 403 for non-participant', async () => {
      seedStore('chat_rooms', 'room-1', {
        participants: ['user-2', 'user-3'],
        lastMessageAt: new Date().toISOString(),
      });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/chat/rooms/room-1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(403);
    });
  });
});
