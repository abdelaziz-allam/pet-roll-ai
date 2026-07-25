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

import { AuthService } from '../../src/modules/auth/auth.service';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'test-secret-minimum-16-chars';

describe('AuthService', () => {
  let service: AuthService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AuthService();
    mockCollection = (db.collection as any)('users');
  });

  describe('register', () => {
    it('should throw 409 if user already exists', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ email: 'existing@test.com' }),
      });

      await expect(
        service.register({ displayName: 'John' }, 'uid-1', 'john@test.com')
      ).rejects.toMatchObject({ message: 'User already registered', statusCode: 409 });
    });

    it('should create user and return tokens', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      const result = await service.register(
        { displayName: 'Jane', phone: '+123', timezone: 'Europe/Berlin' },
        'uid-2',
        'jane@test.com'
      );

      expect(mockCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'jane@test.com',
          displayName: 'Jane',
          phone: '+123',
          timezone: 'Europe/Berlin',
          country: 'Germany',
          role: 'user',
          status: 'active',
        })
      );
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user.id).toBe('uid-2');
    });

    it('should resolve country from timezone', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      await service.register(
        { displayName: 'Test', timezone: 'Asia/Tokyo' },
        'uid-3',
        'test@test.com'
      );

      expect(mockCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({ country: 'Japan', timezone: 'Asia/Tokyo' })
      );
    });

    it('should handle registration without timezone/country', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      const result = await service.register(
        { displayName: 'Minimal' },
        'uid-4',
        'min@test.com'
      );

      expect(result.user.displayName).toBe('Minimal');
    });
  });

  describe('login', () => {
    it('should throw 404 if user not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      await expect(
        service.login('missing-uid', 'test@test.com')
      ).rejects.toMatchObject({ message: 'User not found', statusCode: 404 });
    });

    it('should throw 403 if user is banned', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ status: 'banned', email: 'banned@test.com' }),
      });

      await expect(
        service.login('uid-banned', 'banned@test.com')
      ).rejects.toMatchObject({ message: 'Account has been banned', statusCode: 403 });
    });

    it('should throw 410 if user is deleted', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ status: 'deleted', email: 'deleted@test.com' }),
      });

      await expect(
        service.login('uid-deleted', 'deleted@test.com')
      ).rejects.toMatchObject({ message: 'Account has been deleted', statusCode: 410 });
    });

    it('should return user data and tokens on successful login', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ email: 'user@test.com', status: 'active', displayName: 'User' }),
      });

      const result = await service.login('uid-1', 'user@test.com');

      expect(result.user.id).toBe('uid-1');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ lastLoginAt: 'SERVER_TIMESTAMP' })
      );
    });
  });

  describe('getProfile', () => {
    it('should throw 404 if user not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      await expect(service.getProfile('missing')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });

    it('should return user profile', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ displayName: 'John', email: 'john@test.com' }),
      });

      const result = await service.getProfile('uid-1');
      expect(result).toEqual({ id: 'uid-1', displayName: 'John', email: 'john@test.com' });
    });
  });

  describe('updateProfile', () => {
    it('should update user fields', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ displayName: 'Updated', email: 'test@test.com' }),
      });

      await service.updateProfile('uid-1', { displayName: 'Updated' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ displayName: 'Updated', updatedAt: 'SERVER_TIMESTAMP' })
      );
    });

    it('should resolve timezone from country update', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ displayName: 'Test', country: 'France' }),
      });

      await service.updateProfile('uid-1', { country: 'France' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ country: 'France', timezone: 'Europe/Paris' })
      );
    });

    it('should flatten settings into dot-notation fields', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ displayName: 'Test' }),
      });

      await service.updateProfile('uid-1', { settings: { notifications: false, theme: 'dark' } } as any);

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          'settings.notifications': false,
          'settings.theme': 'dark',
        })
      );
    });
  });

  describe('deleteAccount', () => {
    it('should mark account as deleted and remove PII', async () => {
      await service.deleteAccount('uid-1');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'deleted',
          displayName: 'Deleted User',
        })
      );
    });
  });

  describe('refreshToken', () => {
    it('should throw 404 if user not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, data: () => null });

      await expect(service.refreshToken('missing')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });

    it('should return new tokens', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        data: () => ({ email: 'test@test.com' }),
      });

      const result = await service.refreshToken('uid-1');
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });
  });

  describe('generateTokens', () => {
    it('should generate valid JWT access and refresh tokens', () => {
      const tokens = service.generateTokens('uid-1', 'test@test.com');

      const decoded = jwt.verify(tokens.accessToken, JWT_SECRET) as any;
      expect(decoded.uid).toBe('uid-1');
      expect(decoded.email).toBe('test@test.com');

      const refreshDecoded = jwt.verify(tokens.refreshToken, JWT_SECRET) as any;
      expect(refreshDecoded.uid).toBe('uid-1');
      expect(refreshDecoded.type).toBe('refresh');
    });
  });
});
