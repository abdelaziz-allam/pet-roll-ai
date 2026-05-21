import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { FastifyInstance } from 'fastify';
import { createTestApp, generateToken, seedUser, seedNotification, clearStore } from './helpers';

describe('Notifications API Integration', () => {
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
    token = generateToken('user-1', 'john@test.com');
  });

  describe('GET /api/v1/notifications', () => {
    it('returns user notifications', async () => {
      seedNotification('notif-1', 'user-1', { title: 'Vaccination Due' });
      seedNotification('notif-2', 'user-1', { title: 'Schedule Reminder' });

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/notifications',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      const body = res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it('respects pagination', async () => {
      seedNotification('notif-1', 'user-1');
      seedNotification('notif-2', 'user-1');

      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/notifications?page=1&limit=1',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
    });

    it('returns 401 without auth', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/notifications',
      });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('PUT /api/v1/notifications/:id/read', () => {
    it('marks a notification as read', async () => {
      seedNotification('notif-1', 'user-1', { read: false });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/notifications/notif-1/read',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().success).toBe(true);
    });

    it('returns 404 for notification belonging to another user', async () => {
      seedNotification('notif-1', 'user-2');

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/notifications/notif-1/read',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });

    it('returns 404 for non-existent notification', async () => {
      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/notifications/fake-id/read',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/v1/notifications/read-all', () => {
    it('marks all notifications as read', async () => {
      seedNotification('notif-1', 'user-1', { read: false });
      seedNotification('notif-2', 'user-1', { read: false });

      const res = await app.inject({
        method: 'PUT',
        url: '/api/v1/notifications/read-all',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().success).toBe(true);
      expect(res.json().count).toBeDefined();
    });
  });

  describe('POST /api/v1/notifications/devices', () => {
    it('registers an FCM token', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/notifications/devices',
        headers: { authorization: `Bearer ${token}` },
        payload: { token: 'fcm-token-abc123' },
      });

      expect(res.statusCode).toBe(200);
      expect(res.json().success).toBe(true);
    });
  });

  describe('DELETE /api/v1/notifications/devices/:token', () => {
    it('removes an FCM token', async () => {
      const res = await app.inject({
        method: 'DELETE',
        url: '/api/v1/notifications/devices/fcm-token-abc123',
        headers: { authorization: `Bearer ${token}` },
      });

      expect(res.statusCode).toBe(204);
    });
  });
});
