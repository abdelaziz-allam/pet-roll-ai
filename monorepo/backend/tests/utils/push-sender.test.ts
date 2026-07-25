import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db, FieldValue } from '../../src/config/firebase';

vi.mock('../../src/config/env', () => ({
  env: {
    NODE_ENV: 'test',
    PORT: 3001,
    GCP_PROJECT_ID: 'petroll-mvp',
    FIREBASE_PROJECT_ID: 'petroll-mvp',
    JWT_SECRET: 'test-secret-minimum-16-chars',
    JWT_EXPIRY: '1h',
    REFRESH_TOKEN_EXPIRY: '7d',
    CORS_ORIGINS: 'http://localhost:5173',
    RATE_LIMIT_MAX: 100,
    RATE_LIMIT_WINDOW: 60000,
    GCS_BUCKET: 'petroll-mvp.appspot.com',
  },
}));

const mockSendEachForMulticast = vi.fn();
vi.mock('firebase-admin/messaging', () => ({
  getMessaging: () => ({
    sendEachForMulticast: mockSendEachForMulticast,
  }),
}));

vi.mock('firebase-admin/app', () => ({
  getApps: () => [{ name: 'test-app' }],
}));

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayRemove: vi.fn((...args: any[]) => ({ _arrayRemove: args })),
  },
}));

import { sendPushNotification, createNotificationRecord } from '../../src/utils/push-sender';

describe('push-sender', () => {
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = (db.collection as any)('users');
  });

  describe('sendPushNotification', () => {
    it('should return early if user not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        data: () => null,
      });

      await sendPushNotification({
        userId: 'nonexistent',
        title: 'Hello',
        body: 'World',
      });

      expect(mockSendEachForMulticast).not.toHaveBeenCalled();
    });

    it('should return early if user has no fcm tokens', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: [] }),
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Hello',
        body: 'World',
      });

      expect(mockSendEachForMulticast).not.toHaveBeenCalled();
    });

    it('should return early if fcmTokens field is missing', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({}),
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Hello',
        body: 'World',
      });

      expect(mockSendEachForMulticast).not.toHaveBeenCalled();
    });

    it('should send multicast message to all tokens', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['token-a', 'token-b'] }),
      });

      mockSendEachForMulticast.mockResolvedValue({
        responses: [
          { success: true },
          { success: true },
        ],
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Test Title',
        body: 'Test Body',
        data: { key: 'value' },
      });

      expect(mockSendEachForMulticast).toHaveBeenCalledWith({
        notification: { title: 'Test Title', body: 'Test Body' },
        data: { key: 'value' },
        tokens: ['token-a', 'token-b'],
      });
    });

    it('should use empty data object when no data provided', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['token-a'] }),
      });

      mockSendEachForMulticast.mockResolvedValue({
        responses: [{ success: true }],
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Title',
        body: 'Body',
      });

      expect(mockSendEachForMulticast).toHaveBeenCalledWith(
        expect.objectContaining({ data: {} })
      );
    });

    it('should remove invalid tokens after send', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['valid-token', 'invalid-token'] }),
      });

      mockSendEachForMulticast.mockResolvedValue({
        responses: [
          { success: true },
          { success: false, error: { code: 'messaging/registration-token-not-registered' } },
        ],
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Title',
        body: 'Body',
      });

      expect(mockCollection.update).toHaveBeenCalled();
    });

    it('should not update tokens if all sends succeed', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['token-a', 'token-b'] }),
      });

      mockSendEachForMulticast.mockResolvedValue({
        responses: [
          { success: true },
          { success: true },
        ],
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Title',
        body: 'Body',
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });

    it('should not remove tokens with other error codes', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['token-a'] }),
      });

      mockSendEachForMulticast.mockResolvedValue({
        responses: [
          { success: false, error: { code: 'messaging/internal-error' } },
        ],
      });

      await sendPushNotification({
        userId: 'user-1',
        title: 'Title',
        body: 'Body',
      });

      expect(mockCollection.update).not.toHaveBeenCalled();
    });

    it('should catch and log messaging errors', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ fcmTokens: ['token-a'] }),
      });

      mockSendEachForMulticast.mockRejectedValue(new Error('Network error'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await sendPushNotification({
        userId: 'user-1',
        title: 'Title',
        body: 'Body',
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Push notification failed:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('createNotificationRecord', () => {
    it('should create notification with all fields', async () => {
      await createNotificationRecord('user-1', 'match', 'New Match', 'You have a match!', { petId: 'pet-1' });

      expect(db.collection).toHaveBeenCalledWith('notifications');
      expect(mockCollection.add).toHaveBeenCalledWith({
        userId: 'user-1',
        type: 'match',
        title: 'New Match',
        body: 'You have a match!',
        data: { petId: 'pet-1' },
        read: false,
        createdAt: 'SERVER_TIMESTAMP',
      });
    });

    it('should use empty data object when no data provided', async () => {
      await createNotificationRecord('user-1', 'alert', 'Alert', 'Something happened');

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({ data: {} })
      );
    });
  });
});
