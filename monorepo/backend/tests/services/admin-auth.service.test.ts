import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db, FieldValue } from '../../src/config/firebase';
import crypto from 'crypto';

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

describe('AdminAuthService', () => {
  let service: any;
  let mockAdminUsersCollection: any;
  let mockResetTokensCollection: any;

  // Helper to create real password hashes for test data
  const testSalt = crypto.randomBytes(16).toString('hex');
  const testPassword = 'testpass123';
  const testHash = crypto.pbkdf2Sync(testPassword, testSalt, 10000, 64, 'sha512').toString('hex');

  beforeEach(async () => {
    vi.clearAllMocks();

    // We need fresh mocks for each collection
    const mockAdminDoc = vi.fn().mockReturnThis();
    const mockAdminAdd = vi.fn().mockResolvedValue({ id: 'new-doc-id' });
    const mockAdminGet = vi.fn().mockResolvedValue({ exists: true, id: 'mock-id', data: () => ({}), ref: { id: 'mock-id' } });
    const mockAdminSet = vi.fn().mockResolvedValue(undefined);
    const mockAdminUpdate = vi.fn().mockResolvedValue(undefined);
    const mockAdminDelete = vi.fn().mockResolvedValue(undefined);
    const mockAdminWhere = vi.fn().mockReturnThis();
    const mockAdminOrderBy = vi.fn().mockReturnThis();
    const mockAdminOffset = vi.fn().mockReturnThis();
    const mockAdminLimit = vi.fn().mockReturnThis();
    const mockAdminCount = vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
    });

    mockAdminUsersCollection = {
      doc: mockAdminDoc,
      add: mockAdminAdd,
      get: mockAdminGet,
      set: mockAdminSet,
      update: mockAdminUpdate,
      delete: mockAdminDelete,
      where: mockAdminWhere,
      orderBy: mockAdminOrderBy,
      offset: mockAdminOffset,
      limit: mockAdminLimit,
      count: mockAdminCount,
    };

    const mockResetDoc = vi.fn().mockReturnThis();
    const mockResetAdd = vi.fn().mockResolvedValue({ id: 'new-token-id' });
    const mockResetGet = vi.fn().mockResolvedValue({ exists: true, id: 'mock-token-id', data: () => ({}), ref: { id: 'mock-token-id' } });
    const mockResetSet = vi.fn().mockResolvedValue(undefined);
    const mockResetUpdate = vi.fn().mockResolvedValue(undefined);
    const mockResetDelete = vi.fn().mockResolvedValue(undefined);
    const mockResetWhere = vi.fn().mockReturnThis();
    const mockResetOrderBy = vi.fn().mockReturnThis();
    const mockResetOffset = vi.fn().mockReturnThis();
    const mockResetLimit = vi.fn().mockReturnThis();

    mockResetTokensCollection = {
      doc: mockResetDoc,
      add: mockResetAdd,
      get: mockResetGet,
      set: mockResetSet,
      update: mockResetUpdate,
      delete: mockResetDelete,
      where: mockResetWhere,
      orderBy: mockResetOrderBy,
      offset: mockResetOffset,
      limit: mockResetLimit,
    };

    (db.collection as any).mockImplementation((name: string) => {
      if (name === 'admin_users') return mockAdminUsersCollection;
      if (name === 'admin_reset_tokens') return mockResetTokensCollection;
      return mockAdminUsersCollection;
    });

    // Re-import to get fresh instance with our mocks
    const mod = await import('../../src/modules/admin-auth/admin-auth.service');
    service = new mod.AdminAuthService();
  });

  // --- login ---

  describe('login', () => {
    it('should login successfully in test mode (localLogin)', async () => {
      const adminUser = {
        email: 'admin@test.com',
        displayName: 'Test Admin',
        role: 'admin',
        status: 'active',
        passwordHash: testHash,
        salt: testSalt,
        permissions: {},
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-1', data: () => adminUser, ref: { id: 'admin-1' } }],
      });

      const result = await service.login({ email: 'admin@test.com', password: testPassword });

      expect(result.user.id).toBe('admin-1');
      expect(result.user.email).toBe('admin@test.com');
      expect(result.user.displayName).toBe('Test Admin');
      expect(result.user.passwordHash).toBeUndefined();
      expect(result.user.salt).toBeUndefined();
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(mockAdminUsersCollection.doc).toHaveBeenCalledWith('admin-1');
      expect(mockAdminUsersCollection.update).toHaveBeenCalledWith({
        lastLoginAt: FieldValue.serverTimestamp(),
      });
    });

    it('should throw 401 when user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });

      await expect(service.login({ email: 'nonexistent@test.com', password: 'any' }))
        .rejects.toMatchObject({ message: 'Invalid email or password', statusCode: 401 });
    });

    it('should throw 403 when account is suspended', async () => {
      const adminUser = {
        email: 'suspended@test.com',
        displayName: 'Suspended Admin',
        role: 'admin',
        status: 'suspended',
        passwordHash: testHash,
        salt: testSalt,
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-2', data: () => adminUser, ref: { id: 'admin-2' } }],
      });

      await expect(service.login({ email: 'suspended@test.com', password: testPassword }))
        .rejects.toMatchObject({ message: 'Account has been suspended', statusCode: 403 });
    });

    it('should throw 401 when password is incorrect', async () => {
      const adminUser = {
        email: 'admin@test.com',
        displayName: 'Test Admin',
        role: 'admin',
        status: 'active',
        passwordHash: testHash,
        salt: testSalt,
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-1', data: () => adminUser, ref: { id: 'admin-1' } }],
      });

      await expect(service.login({ email: 'admin@test.com', password: 'wrongpassword' }))
        .rejects.toMatchObject({ message: 'Invalid email or password', statusCode: 401 });
    });
  });

  // --- forgotPassword ---

  describe('forgotPassword', () => {
    it('should create reset token and store it when email exists', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-1', data: () => ({ email: 'admin@test.com' }), ref: { id: 'admin-1' } }],
      });

      const result = await service.forgotPassword({ email: 'admin@test.com' });

      expect(result.message).toBe('If the email exists, a reset link has been sent');
      // devToken is only returned in 'development' mode, not 'test'
      expect(result.devToken).toBeUndefined();
      expect(mockResetTokensCollection.doc).toHaveBeenCalled();
      expect(mockResetTokensCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({
          adminUserId: 'admin-1',
          email: 'admin@test.com',
          used: false,
        })
      );
    });

    it('should return devToken when NODE_ENV is development', async () => {
      // Temporarily override the env mock for this test
      const envMod = await import('../../src/config/env');
      const originalEnv = (envMod as any).env.NODE_ENV;
      (envMod as any).env.NODE_ENV = 'development';

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-1', data: () => ({ email: 'admin@test.com' }), ref: { id: 'admin-1' } }],
      });

      const result = await service.forgotPassword({ email: 'admin@test.com' });

      expect(result.message).toBe('If the email exists, a reset link has been sent');
      expect(result.devToken).toBeDefined();
      expect(typeof result.devToken).toBe('string');

      // Restore
      (envMod as any).env.NODE_ENV = originalEnv;
    });

    it('should return success message when email does not exist (no leak)', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });

      const result = await service.forgotPassword({ email: 'nonexistent@test.com' });

      expect(result.message).toBe('If the email exists, a reset link has been sent');
      expect(result.devToken).toBeUndefined();
      expect(mockResetTokensCollection.set).not.toHaveBeenCalled();
    });
  });

  // --- resetPassword ---

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const futureDate = new Date(Date.now() + 3600000).toISOString();
      mockResetTokensCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'valid-token',
        data: () => ({
          adminUserId: 'admin-1',
          email: 'admin@test.com',
          expiresAt: futureDate,
          used: false,
        }),
      });

      const result = await service.resetPassword({ token: 'valid-token', newPassword: 'newpass123' });

      expect(result.message).toBe('Password has been reset successfully');
      expect(mockAdminUsersCollection.doc).toHaveBeenCalledWith('admin-1');
      expect(mockAdminUsersCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          passwordHash: expect.any(String),
          salt: expect.any(String),
        })
      );
      expect(mockResetTokensCollection.doc).toHaveBeenCalledWith('valid-token');
      expect(mockResetTokensCollection.update).toHaveBeenCalledWith({ used: true });
    });

    it('should throw 400 when token not found', async () => {
      mockResetTokensCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'invalid-token',
        data: () => null,
      });

      await expect(service.resetPassword({ token: 'invalid-token', newPassword: 'newpass123' }))
        .rejects.toMatchObject({ message: 'Invalid or expired reset token', statusCode: 400 });
    });

    it('should throw 400 when token already used', async () => {
      mockResetTokensCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'used-token',
        data: () => ({
          adminUserId: 'admin-1',
          email: 'admin@test.com',
          expiresAt: new Date(Date.now() + 3600000).toISOString(),
          used: true,
        }),
      });

      await expect(service.resetPassword({ token: 'used-token', newPassword: 'newpass123' }))
        .rejects.toMatchObject({ message: 'Reset token has already been used', statusCode: 400 });
    });

    it('should throw 400 when token has expired', async () => {
      const pastDate = new Date(Date.now() - 3600000).toISOString();
      mockResetTokensCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'expired-token',
        data: () => ({
          adminUserId: 'admin-1',
          email: 'admin@test.com',
          expiresAt: pastDate,
          used: false,
        }),
      });

      await expect(service.resetPassword({ token: 'expired-token', newPassword: 'newpass123' }))
        .rejects.toMatchObject({ message: 'Reset token has expired', statusCode: 400 });
    });
  });

  // --- changePassword ---

  describe('changePassword', () => {
    it('should change password successfully', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          passwordHash: testHash,
          salt: testSalt,
        }),
      });

      const result = await service.changePassword('admin-1', {
        currentPassword: testPassword,
        newPassword: 'newSecurePass456',
      });

      expect(result.message).toBe('Password changed successfully');
      expect(mockAdminUsersCollection.doc).toHaveBeenCalledWith('admin-1');
      expect(mockAdminUsersCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          passwordHash: expect.any(String),
          salt: expect.any(String),
        })
      );
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.changePassword('nonexistent', {
        currentPassword: 'any',
        newPassword: 'newpass',
      })).rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });

    it('should throw 401 when current password is incorrect', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          passwordHash: testHash,
          salt: testSalt,
        }),
      });

      await expect(service.changePassword('admin-1', {
        currentPassword: 'wrongCurrentPassword',
        newPassword: 'newpass',
      })).rejects.toMatchObject({ message: 'Current password is incorrect', statusCode: 401 });
    });
  });

  // --- getMe ---

  describe('getMe', () => {
    it('should return admin user without sensitive fields', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          displayName: 'Admin User',
          role: 'admin',
          status: 'active',
          passwordHash: 'should-be-removed',
          salt: 'should-be-removed',
        }),
      });

      const result = await service.getMe('admin-1');

      expect(result.id).toBe('admin-1');
      expect(result.email).toBe('admin@test.com');
      expect(result.displayName).toBe('Admin User');
      expect(result.passwordHash).toBeUndefined();
      expect(result.salt).toBeUndefined();
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getMe('nonexistent'))
        .rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });
  });

  // --- refreshToken ---

  describe('refreshToken', () => {
    it('should return new tokens successfully', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          role: 'admin',
        }),
      });

      const result = await service.refreshToken('admin-1');

      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(typeof result.accessToken).toBe('string');
      expect(typeof result.refreshToken).toBe('string');
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.refreshToken('nonexistent'))
        .rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });
  });

  // --- createAdminUser ---

  describe('createAdminUser', () => {
    it('should create admin user successfully', async () => {
      // First call: check for existing email -> empty
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });
      mockAdminUsersCollection.add.mockResolvedValueOnce({ id: 'new-admin-id' });

      const input = {
        email: 'newadmin@test.com',
        displayName: 'New Admin',
        password: 'securepass123',
        role: 'admin' as const,
        permissions: { dashboard: { access: true, actions: ['view'] } },
      };

      const result = await service.createAdminUser(input, 'creator-id');

      expect(result.id).toBe('new-admin-id');
      expect(result.email).toBe('newadmin@test.com');
      expect(result.displayName).toBe('New Admin');
      expect(result.role).toBe('admin');
      expect(result.status).toBe('active');
      expect(result.passwordHash).toBeUndefined();
      expect(result.salt).toBeUndefined();
      expect(mockAdminUsersCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'newadmin@test.com',
          displayName: 'New Admin',
          role: 'admin',
          status: 'active',
          createdBy: 'creator-id',
        })
      );
    });

    it('should assign full permissions for super_admin role', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });
      mockAdminUsersCollection.add.mockResolvedValueOnce({ id: 'new-super-id' });

      const input = {
        email: 'superadmin@test.com',
        displayName: 'Super Admin',
        password: 'securepass123',
        role: 'super_admin' as const,
        permissions: {}, // Should be overridden for super_admin
      };

      const result = await service.createAdminUser(input, 'creator-id');

      expect(result.id).toBe('new-super-id');
      expect(result.role).toBe('super_admin');
      // Verify super admin permissions are applied
      expect(mockAdminUsersCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'super_admin',
          permissions: expect.objectContaining({
            dashboard: { access: true, actions: ['view'] },
            app_users: { access: true, actions: ['view', 'create', 'edit', 'ban', 'delete', 'export'] },
            admin_users: { access: true, actions: ['view', 'create', 'edit', 'delete', 'manage_permissions'] },
          }),
        })
      );
    });

    it('should throw 409 when email already exists', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'existing-id', data: () => ({ email: 'existing@test.com' }) }],
      });

      const input = {
        email: 'existing@test.com',
        displayName: 'Duplicate',
        password: 'securepass123',
        role: 'admin' as const,
        permissions: {},
      };

      await expect(service.createAdminUser(input, 'creator-id'))
        .rejects.toMatchObject({ message: 'An admin user with this email already exists', statusCode: 409 });
    });
  });

  // --- updateAdminUser ---

  describe('updateAdminUser', () => {
    it('should update admin user successfully', async () => {
      // First get: check if user exists
      mockAdminUsersCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'admin-1',
          data: () => ({
            email: 'admin@test.com',
            displayName: 'Old Name',
            role: 'admin',
            status: 'active',
          }),
        })
        // Second get: fetch updated user
        .mockResolvedValueOnce({
          exists: true,
          id: 'admin-1',
          data: () => ({
            email: 'admin@test.com',
            displayName: 'New Name',
            role: 'admin',
            status: 'active',
            passwordHash: 'hidden',
            salt: 'hidden',
          }),
        });

      const result = await service.updateAdminUser('admin-1', { displayName: 'New Name' }, 'updater-id');

      expect(result.id).toBe('admin-1');
      expect(result.displayName).toBe('New Name');
      expect(result.passwordHash).toBeUndefined();
      expect(result.salt).toBeUndefined();
      expect(mockAdminUsersCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'New Name',
          updatedBy: 'updater-id',
        })
      );
    });

    it('should override permissions when role is set to super_admin', async () => {
      mockAdminUsersCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'admin-1',
          data: () => ({
            email: 'admin@test.com',
            displayName: 'Admin',
            role: 'admin',
            status: 'active',
          }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'admin-1',
          data: () => ({
            email: 'admin@test.com',
            displayName: 'Admin',
            role: 'super_admin',
            status: 'active',
            passwordHash: 'hidden',
            salt: 'hidden',
          }),
        });

      const result = await service.updateAdminUser('admin-1', { role: 'super_admin' }, 'updater-id');

      expect(result.role).toBe('super_admin');
      expect(mockAdminUsersCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'super_admin',
          permissions: expect.objectContaining({
            dashboard: { access: true, actions: ['view'] },
            admin_users: { access: true, actions: ['view', 'create', 'edit', 'delete', 'manage_permissions'] },
          }),
        })
      );
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.updateAdminUser('nonexistent', { displayName: 'X' }, 'updater-id'))
        .rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });
  });

  // --- deleteAdminUser ---

  describe('deleteAdminUser', () => {
    it('should delete a non-super_admin user successfully', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          role: 'admin',
          status: 'active',
        }),
      });

      const result = await service.deleteAdminUser('admin-1', 'deleter-id');

      expect(result.message).toBe('Admin user deleted');
      expect(mockAdminUsersCollection.doc).toHaveBeenCalledWith('admin-1');
      expect(mockAdminUsersCollection.delete).toHaveBeenCalled();
    });

    it('should delete a super_admin when other super admins exist', async () => {
      // First get: check if user exists and is super_admin
      mockAdminUsersCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'super-1',
          data: () => ({
            email: 'super1@test.com',
            role: 'super_admin',
            status: 'active',
          }),
        })
        // Second get: count super admins -> more than 1
        .mockResolvedValueOnce({
          empty: false,
          size: 2,
          docs: [
            { id: 'super-1', data: () => ({ role: 'super_admin', status: 'active' }) },
            { id: 'super-2', data: () => ({ role: 'super_admin', status: 'active' }) },
          ],
        });

      const result = await service.deleteAdminUser('super-1', 'deleter-id');

      expect(result.message).toBe('Admin user deleted');
      expect(mockAdminUsersCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.deleteAdminUser('nonexistent', 'deleter-id'))
        .rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });

    it('should throw 400 when trying to delete the last super admin', async () => {
      // First get: check if user exists and is super_admin
      mockAdminUsersCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'super-1',
          data: () => ({
            email: 'super1@test.com',
            role: 'super_admin',
            status: 'active',
          }),
        })
        // Second get: count super admins -> only 1
        .mockResolvedValueOnce({
          empty: false,
          size: 1,
          docs: [
            { id: 'super-1', data: () => ({ role: 'super_admin', status: 'active' }) },
          ],
        });

      await expect(service.deleteAdminUser('super-1', 'deleter-id'))
        .rejects.toMatchObject({ message: 'Cannot delete the last super admin', statusCode: 400 });
    });
  });

  // --- listAdminUsers ---

  describe('listAdminUsers', () => {
    it('should list admin users with pagination', async () => {
      mockAdminUsersCollection.count.mockReturnValueOnce({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 25 }) }),
      });

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 2,
        docs: [
          {
            id: 'admin-1',
            data: () => ({
              email: 'admin1@test.com',
              displayName: 'Admin 1',
              role: 'admin',
              status: 'active',
              passwordHash: 'hidden',
              salt: 'hidden',
            }),
          },
          {
            id: 'admin-2',
            data: () => ({
              email: 'admin2@test.com',
              displayName: 'Admin 2',
              role: 'super_admin',
              status: 'active',
              passwordHash: 'hidden',
              salt: 'hidden',
            }),
          },
        ],
      });

      const result = await service.listAdminUsers(2, 10);

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(25);
      expect(result.page).toBe(2);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(3);
      expect(result.data[0].passwordHash).toBeUndefined();
      expect(result.data[0].salt).toBeUndefined();
      expect(result.data[0].id).toBe('admin-1');
      expect(result.data[1].id).toBe('admin-2');
      expect(mockAdminUsersCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockAdminUsersCollection.offset).toHaveBeenCalledWith(10);
      expect(mockAdminUsersCollection.limit).toHaveBeenCalledWith(10);
    });
  });

  // --- getAdminUser ---

  describe('getAdminUser', () => {
    it('should return admin user without sensitive fields', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'admin-1',
        data: () => ({
          email: 'admin@test.com',
          displayName: 'Admin User',
          role: 'admin',
          status: 'active',
          passwordHash: 'should-be-removed',
          salt: 'should-be-removed',
          permissions: { dashboard: { access: true, actions: ['view'] } },
        }),
      });

      const result = await service.getAdminUser('admin-1');

      expect(result.id).toBe('admin-1');
      expect(result.email).toBe('admin@test.com');
      expect(result.displayName).toBe('Admin User');
      expect(result.role).toBe('admin');
      expect(result.permissions).toEqual({ dashboard: { access: true, actions: ['view'] } });
      expect(result.passwordHash).toBeUndefined();
      expect(result.salt).toBeUndefined();
    });

    it('should throw 404 when admin user not found', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getAdminUser('nonexistent'))
        .rejects.toMatchObject({ message: 'Admin user not found', statusCode: 404 });
    });
  });

  // --- seedSuperAdmin ---

  describe('seedSuperAdmin', () => {
    it('should seed a new super admin when none exists', async () => {
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });
      mockAdminUsersCollection.add.mockResolvedValueOnce({ id: 'seeded-admin-id' });

      const result = await service.seedSuperAdmin();

      expect(result.message).toBe('Super admin seeded: admin@petroll.com');
      expect(result.seeded).toBe(true);
      expect(mockAdminUsersCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'admin@petroll.com',
          displayName: 'Super Admin',
          role: 'super_admin',
          status: 'active',
          createdBy: 'system',
        })
      );
    });

    it('should reset password of existing super admin', async () => {
      const mockRef = { update: vi.fn().mockResolvedValue(undefined) };
      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{
          id: 'existing-super-id',
          data: () => ({
            email: 'admin@petroll.com',
            role: 'super_admin',
          }),
          ref: mockRef,
        }],
      });

      const result = await service.seedSuperAdmin();

      expect(result.message).toBe('Super admin password reset');
      expect(result.seeded).toBe(false);
      expect(mockRef.update).toHaveBeenCalledWith(
        expect.objectContaining({
          passwordHash: expect.any(String),
          salt: expect.any(String),
        })
      );
      expect(mockAdminUsersCollection.add).not.toHaveBeenCalled();
    });
  });

  describe('gcpLogin (production mode)', () => {
    it('should use gcpLogin when NODE_ENV is production', async () => {
      const { env } = await import('../../src/config/env');
      const originalEnv = env.NODE_ENV;
      (env as any).NODE_ENV = 'production';

      const adminUser = {
        email: 'admin@test.com',
        displayName: 'Prod Admin',
        role: 'admin',
        status: 'active',
        passwordHash: testHash,
        salt: testSalt,
        permissions: {},
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-prod', data: () => adminUser, ref: { id: 'admin-prod' } }],
      });

      const result = await service.login({ email: 'admin@test.com', password: testPassword });
      expect(result.user.id).toBe('admin-prod');
      expect(result.accessToken).toBeDefined();

      (env as any).NODE_ENV = originalEnv;
    });

    it('should throw 401 on wrong password in production mode', async () => {
      const { env } = await import('../../src/config/env');
      const originalEnv = env.NODE_ENV;
      (env as any).NODE_ENV = 'production';

      const adminUser = {
        email: 'admin@test.com',
        displayName: 'Prod Admin',
        role: 'admin',
        status: 'active',
        passwordHash: testHash,
        salt: testSalt,
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-prod', data: () => adminUser, ref: { id: 'admin-prod' } }],
      });

      await expect(service.login({ email: 'admin@test.com', password: 'wrong' }))
        .rejects.toMatchObject({ statusCode: 401 });

      (env as any).NODE_ENV = originalEnv;
    });

    it('should throw 403 for suspended account in production mode', async () => {
      const { env } = await import('../../src/config/env');
      const originalEnv = env.NODE_ENV;
      (env as any).NODE_ENV = 'production';

      const adminUser = {
        email: 'admin@test.com',
        role: 'admin',
        status: 'suspended',
        passwordHash: testHash,
        salt: testSalt,
      };

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: false,
        size: 1,
        docs: [{ id: 'admin-prod', data: () => adminUser, ref: { id: 'admin-prod' } }],
      });

      await expect(service.login({ email: 'admin@test.com', password: testPassword }))
        .rejects.toMatchObject({ statusCode: 403 });

      (env as any).NODE_ENV = originalEnv;
    });

    it('should throw 401 for non-existent user in production mode', async () => {
      const { env } = await import('../../src/config/env');
      const originalEnv = env.NODE_ENV;
      (env as any).NODE_ENV = 'production';

      mockAdminUsersCollection.get.mockResolvedValueOnce({
        empty: true,
        size: 0,
        docs: [],
      });

      await expect(service.login({ email: 'nobody@test.com', password: 'any' }))
        .rejects.toMatchObject({ statusCode: 401 });

      (env as any).NODE_ENV = originalEnv;
    });
  });
});
