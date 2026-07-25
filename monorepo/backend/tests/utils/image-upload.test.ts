import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSave, mockDelete, mockGetSignedUrl, mockFile, mockGetFiles } = vi.hoisted(() => {
  const mockSave = vi.fn().mockResolvedValue(undefined);
  const mockDelete = vi.fn().mockResolvedValue(undefined);
  const mockGetSignedUrl = vi.fn().mockResolvedValue(['https://signed-url.example.com/file']);
  const mockFile = vi.fn().mockImplementation(() => ({
    save: mockSave,
    delete: mockDelete,
    getSignedUrl: mockGetSignedUrl,
  }));
  const mockGetFiles = vi.fn().mockResolvedValue([[]]);
  return { mockSave, mockDelete, mockGetSignedUrl, mockFile, mockGetFiles };
});

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

vi.mock('../../src/config/firebase', () => ({
  db: { collection: vi.fn() },
  auth: { verifyIdToken: vi.fn() },
  storage: {
    bucket: vi.fn(() => ({
      name: 'petroll-mvp.appspot.com',
      file: mockFile,
      getFiles: mockGetFiles,
    })),
  },
  messaging: { send: vi.fn() },
  FieldValue: {
    serverTimestamp: vi.fn(),
    arrayUnion: vi.fn(),
    arrayRemove: vi.fn(),
    increment: vi.fn(),
    delete: vi.fn(),
  },
  Timestamp: { now: vi.fn() },
}));

vi.mock('crypto', () => ({
  randomUUID: vi.fn(() => 'test-uuid-1234'),
}));

import {
  uploadImage,
  deleteFile,
  deleteFolder,
  getSignedUrl,
  MAX_FILE_SIZE,
  ALLOWED_MIME_TYPES,
} from '../../src/utils/image-upload';

describe('image-upload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uploadImage', () => {
    it('should upload an image and return url, path, and fileName', async () => {
      const buffer = Buffer.from('fake-image-data');
      const result = await uploadImage(buffer, 'pets/images', 'image/jpeg');

      expect(result).toEqual({
        url: 'https://storage.googleapis.com/petroll-mvp.appspot.com/pets/images/test-uuid-1234.jpg',
        path: 'pets/images/test-uuid-1234.jpg',
        fileName: 'test-uuid-1234.jpg',
      });
    });

    it('should call file.save with correct buffer and metadata', async () => {
      const buffer = Buffer.from('image-content');
      await uploadImage(buffer, 'uploads', 'image/png');

      expect(mockFile).toHaveBeenCalledWith('uploads/test-uuid-1234.png');
      expect(mockSave).toHaveBeenCalledWith(buffer, {
        metadata: {
          contentType: 'image/png',
          metadata: {},
        },
      });
    });

    it('should include ownerId in metadata when provided', async () => {
      const buffer = Buffer.from('data');
      await uploadImage(buffer, 'avatars', 'image/webp', { ownerId: 'user-123' });

      expect(mockSave).toHaveBeenCalledWith(buffer, {
        metadata: {
          contentType: 'image/webp',
          metadata: { ownerId: 'user-123' },
        },
      });
    });

    it('should not include ownerId in metadata when not provided', async () => {
      const buffer = Buffer.from('data');
      await uploadImage(buffer, 'folder', 'image/gif');

      expect(mockSave).toHaveBeenCalledWith(buffer, {
        metadata: {
          contentType: 'image/gif',
          metadata: {},
        },
      });
    });

    it('should not include ownerId when options is provided but ownerId is undefined', async () => {
      const buffer = Buffer.from('data');
      await uploadImage(buffer, 'folder', 'image/jpeg', {});

      expect(mockSave).toHaveBeenCalledWith(buffer, {
        metadata: {
          contentType: 'image/jpeg',
          metadata: {},
        },
      });
    });

    it('should use correct extension for image/jpeg', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', 'image/jpeg');
      expect(result.fileName).toBe('test-uuid-1234.jpg');
    });

    it('should use correct extension for image/png', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', 'image/png');
      expect(result.fileName).toBe('test-uuid-1234.png');
    });

    it('should use correct extension for image/webp', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', 'image/webp');
      expect(result.fileName).toBe('test-uuid-1234.webp');
    });

    it('should use correct extension for image/gif', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', 'image/gif');
      expect(result.fileName).toBe('test-uuid-1234.gif');
    });

    it('should default to jpg extension for unknown content types', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', 'application/pdf');
      expect(result.fileName).toBe('test-uuid-1234.jpg');
    });

    it('should default to jpg extension for empty content type', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'test', '');
      expect(result.fileName).toBe('test-uuid-1234.jpg');
    });

    it('should construct the correct public URL', async () => {
      const buffer = Buffer.from('data');
      const result = await uploadImage(buffer, 'my/nested/path', 'image/png');
      expect(result.url).toBe(
        'https://storage.googleapis.com/petroll-mvp.appspot.com/my/nested/path/test-uuid-1234.png'
      );
    });
  });

  describe('deleteFile', () => {
    it('should call file.delete for the given path', async () => {
      await deleteFile('pets/images/file.jpg');

      expect(mockFile).toHaveBeenCalledWith('pets/images/file.jpg');
      expect(mockDelete).toHaveBeenCalled();
    });

    it('should not throw when file deletion fails', async () => {
      mockDelete.mockRejectedValueOnce(new Error('File not found'));

      await expect(deleteFile('nonexistent/path.jpg')).resolves.toBeUndefined();
    });

    it('should handle empty path gracefully', async () => {
      await expect(deleteFile('')).resolves.toBeUndefined();
      expect(mockFile).toHaveBeenCalledWith('');
    });
  });

  describe('deleteFolder', () => {
    it('should delete all files with the given prefix', async () => {
      const mockFileObj1 = { delete: vi.fn().mockResolvedValue(undefined) };
      const mockFileObj2 = { delete: vi.fn().mockResolvedValue(undefined) };
      mockGetFiles.mockResolvedValueOnce([[mockFileObj1, mockFileObj2]]);

      await deleteFolder('pets/user-123/');

      expect(mockGetFiles).toHaveBeenCalledWith({ prefix: 'pets/user-123/' });
      expect(mockFileObj1.delete).toHaveBeenCalled();
      expect(mockFileObj2.delete).toHaveBeenCalled();
    });

    it('should handle empty file list gracefully', async () => {
      mockGetFiles.mockResolvedValueOnce([[]]);

      await expect(deleteFolder('empty/prefix/')).resolves.toBeUndefined();
      expect(mockGetFiles).toHaveBeenCalledWith({ prefix: 'empty/prefix/' });
    });

    it('should delete files in parallel using Promise.all', async () => {
      const mockFileObj1 = { delete: vi.fn().mockResolvedValue(undefined) };
      const mockFileObj2 = { delete: vi.fn().mockResolvedValue(undefined) };
      const mockFileObj3 = { delete: vi.fn().mockResolvedValue(undefined) };
      mockGetFiles.mockResolvedValueOnce([[mockFileObj1, mockFileObj2, mockFileObj3]]);

      await deleteFolder('bulk/');

      expect(mockFileObj1.delete).toHaveBeenCalled();
      expect(mockFileObj2.delete).toHaveBeenCalled();
      expect(mockFileObj3.delete).toHaveBeenCalled();
    });
  });

  describe('getSignedUrl', () => {
    it('should return a signed URL for a given path', async () => {
      const result = await getSignedUrl('pets/images/file.jpg');

      expect(result).toBe('https://signed-url.example.com/file');
      expect(mockFile).toHaveBeenCalledWith('pets/images/file.jpg');
    });

    it('should use default 24 hours expiration', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

      await getSignedUrl('file.jpg');

      expect(mockGetSignedUrl).toHaveBeenCalledWith({
        action: 'read',
        expires: Date.now() + 24 * 60 * 60 * 1000,
      });

      vi.useRealTimers();
    });

    it('should use custom expiration when provided', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

      await getSignedUrl('file.jpg', 48);

      expect(mockGetSignedUrl).toHaveBeenCalledWith({
        action: 'read',
        expires: Date.now() + 48 * 60 * 60 * 1000,
      });

      vi.useRealTimers();
    });

    it('should handle 1 hour expiration', async () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));

      await getSignedUrl('file.jpg', 1);

      expect(mockGetSignedUrl).toHaveBeenCalledWith({
        action: 'read',
        expires: Date.now() + 1 * 60 * 60 * 1000,
      });

      vi.useRealTimers();
    });
  });

  describe('constants', () => {
    it('MAX_FILE_SIZE should be 10MB', () => {
      expect(MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
      expect(MAX_FILE_SIZE).toBe(10485760);
    });

    it('ALLOWED_MIME_TYPES should contain expected types', () => {
      expect(ALLOWED_MIME_TYPES).toEqual([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
      ]);
    });

    it('ALLOWED_MIME_TYPES should have 5 entries', () => {
      expect(ALLOWED_MIME_TYPES).toHaveLength(5);
    });
  });
});
