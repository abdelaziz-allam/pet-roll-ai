import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminService } from '../../src/modules/admin/admin.service';
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

vi.mock('../../src/services/email.service', () => ({
  emailService: {
    sendMatchWeddingCard: vi.fn().mockResolvedValue(undefined),
    buildWeddingCardTemplate: vi.fn().mockReturnValue('<html>card</html>'),
  },
}));

vi.mock('../../src/data/countries', () => ({
  countries: [
    { code: 'US', name: 'United States', cities: ['New York', 'Los Angeles'] },
    { code: 'UK', name: 'United Kingdom', cities: ['London', 'Manchester'] },
  ],
}));

describe('AdminService', () => {
  let service: AdminService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AdminService();
    mockCollection = (db.collection as any)('users');
  });

  // --- getStats ---

  describe('getStats', () => {
    it('should return stats from all collections', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn()
          .mockResolvedValueOnce({ data: () => ({ count: 10 }) })
          .mockResolvedValueOnce({ data: () => ({ count: 25 }) })
          .mockResolvedValueOnce({ data: () => ({ count: 3 }) }),
      });

      const result = await service.getStats();

      expect(result).toEqual({
        totalUsers: 10,
        totalPets: 25,
        activeListings: 3,
      });
      expect(db.collection).toHaveBeenCalledWith('users');
      expect(db.collection).toHaveBeenCalledWith('pets');
      expect(db.collection).toHaveBeenCalledWith('mating_listings');
    });
  });

  // --- getGrowthStats ---

  describe('getGrowthStats', () => {
    it('should return growth stats for week period', async () => {
      mockCollection.get.mockResolvedValueOnce({
        size: 12,
        docs: [],
        empty: false,
      });

      const result = await service.getGrowthStats('week');

      expect(result).toEqual({ newUsers: 12, period: 'week' });
      expect(mockCollection.where).toHaveBeenCalledWith('createdAt', '>=', expect.any(Date));
    });

    it('should return growth stats for month period', async () => {
      mockCollection.get.mockResolvedValueOnce({
        size: 45,
        docs: [],
        empty: false,
      });

      const result = await service.getGrowthStats('month');

      expect(result).toEqual({ newUsers: 45, period: 'month' });
    });

    it('should default to 90 days (quarter) for unknown period', async () => {
      mockCollection.get.mockResolvedValueOnce({
        size: 100,
        docs: [],
        empty: false,
      });

      const result = await service.getGrowthStats('quarter');

      expect(result).toEqual({ newUsers: 100, period: 'quarter' });
    });
  });

  // --- getUsers ---

  describe('getUsers', () => {
    it('should return paginated users without status filter', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'user-1', data: () => ({ displayName: 'Alice', email: 'alice@test.com' }) },
          { id: 'user-2', data: () => ({ displayName: 'Bob', email: 'bob@test.com' }) },
        ],
        empty: false,
        size: 2,
      });

      const result = await service.getUsers(1, 20);

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(50);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(3);
      expect(result.data[0]).toEqual({ id: 'user-1', displayName: 'Alice', email: 'alice@test.com' });
    });

    it('should apply status filter when provided', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'user-3', data: () => ({ displayName: 'Charlie', status: 'banned' }) },
        ],
        empty: false,
        size: 1,
      });

      const result = await service.getUsers(1, 10, 'banned');

      expect(result.total).toBe(5);
      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'banned');
    });

    it('should calculate correct offset for pagination', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 100 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      const result = await service.getUsers(3, 10);

      expect(mockCollection.offset).toHaveBeenCalledWith(20);
      expect(mockCollection.limit).toHaveBeenCalledWith(10);
      expect(result.totalPages).toBe(10);
    });
  });

  // --- getUserById ---

  describe('getUserById', () => {
    it('should return user when found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ displayName: 'Alice', email: 'alice@test.com', role: 'user' }),
      });

      const result = await service.getUserById('user-1');

      expect(result).toEqual({ id: 'user-1', displayName: 'Alice', email: 'alice@test.com', role: 'user' });
      expect(mockCollection.doc).toHaveBeenCalledWith('user-1');
    });

    it('should throw 404 when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getUserById('nonexistent')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });

  // --- createUser ---

  describe('createUser', () => {
    it('should create a user with all fields', async () => {
      mockCollection.add.mockResolvedValueOnce({ id: 'new-user-id' });

      const result = await service.createUser({
        displayName: 'Test User',
        email: 'test@example.com',
        role: 'admin',
        phone: '+1234567890',
        timezone: 'America/New_York',
      });

      expect(result).toEqual({
        id: 'new-user-id',
        displayName: 'Test User',
        email: 'test@example.com',
        role: 'admin',
        phone: '+1234567890',
        timezone: 'America/New_York',
        status: 'active',
        isVerifiedBreeder: false,
        petsCount: 0,
      });
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Test User',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          isVerifiedBreeder: false,
          petsCount: 0,
          phone: '+1234567890',
          timezone: 'America/New_York',
        })
      );
    });

    it('should use defaults for optional fields', async () => {
      mockCollection.add.mockResolvedValueOnce({ id: 'new-user-id' });

      const result = await service.createUser({
        displayName: 'Minimal User',
        email: 'minimal@example.com',
      });

      expect(result.role).toBe('user');
      expect(result.status).toBe('active');
      expect(result.isVerifiedBreeder).toBe(false);
      expect(result.petsCount).toBe(0);
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'user',
          phone: null,
          timezone: null,
        })
      );
    });
  });

  // --- updateUser ---

  describe('updateUser', () => {
    it('should update user and return updated data', async () => {
      // First call: getUserById check, second call: getUserById return after update
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', email: 'alice@test.com' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice Updated', email: 'alice@test.com', phone: '+999' }),
        });

      const result = await service.updateUser('user-1', { displayName: 'Alice Updated', phone: '+999' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Alice Updated',
          phone: '+999',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.displayName).toBe('Alice Updated');
    });

    it('should throw 404 if user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.updateUser('nonexistent', { displayName: 'X' })).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });

  // --- updateUserRole ---

  describe('updateUserRole', () => {
    it('should update user role', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', role: 'user' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', role: 'admin' }),
        });

      const result = await service.updateUserRole('user-1', 'admin');

      expect(mockCollection.update).toHaveBeenCalledWith({
        role: 'admin',
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result.role).toBe('admin');
    });
  });

  // --- banUser ---

  describe('banUser', () => {
    it('should ban a user with reason', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', status: 'active' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', status: 'banned', banReason: 'Spam' }),
        });

      const result = await service.banUser('user-1', 'Spam');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'banned',
          banReason: 'Spam',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.status).toBe('banned');
    });
  });

  // --- unbanUser ---

  describe('unbanUser', () => {
    it('should unban a user', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', status: 'banned' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', status: 'active', banReason: null, bannedAt: null }),
        });

      const result = await service.unbanUser('user-1');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'active',
          banReason: null,
          bannedAt: null,
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.status).toBe('active');
    });
  });

  // --- deleteUser ---

  describe('deleteUser', () => {
    it('should delete an existing user', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'user-1',
        data: () => ({ displayName: 'Alice' }),
      });

      await service.deleteUser('user-1');

      expect(mockCollection.doc).toHaveBeenCalledWith('user-1');
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 if user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.deleteUser('nonexistent')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });

  // --- getPetById ---

  describe('getPetById', () => {
    it('should return pet with owner name when found', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({
            name: 'Buddy',
            species: 'dog',
            ownerId: 'owner-1',
            location: { country: 'US', city: 'New York' },
          }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'owner-1',
          data: () => ({ displayName: 'John' }),
        });

      const result = await service.getPetById('pet-1');

      expect(result).toEqual({
        id: 'pet-1',
        name: 'Buddy',
        species: 'dog',
        ownerId: 'owner-1',
        country: 'US',
        city: 'New York',
        ownerName: 'John',
      });
    });

    it('should throw 404 when pet not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getPetById('nonexistent')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should set ownerName to Unknown when owner not found', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({
            name: 'Buddy',
            species: 'dog',
            ownerId: 'missing-owner',
            location: { country: 'US', city: 'LA' },
          }),
        })
        .mockResolvedValueOnce({
          exists: false,
          id: 'missing-owner',
          data: () => null,
        });

      const result = await service.getPetById('pet-1');

      expect(result.ownerName).toBe('Unknown');
    });

    it('should handle pet without ownerId', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'pet-1',
        data: () => ({
          name: 'Stray',
          species: 'cat',
          location: null,
        }),
      });

      const result = await service.getPetById('pet-1');

      expect(result.ownerName).toBe('Unknown');
      expect(result.country).toBeNull();
      expect(result.city).toBeNull();
    });
  });

  // --- banPet ---

  describe('banPet', () => {
    it('should ban an existing pet', async () => {
      // First get: existence check in banPet
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', status: 'active', location: { country: 'US', city: 'NY' } }),
        })
        // Second get: getPetById after ban (pet doc)
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', status: 'banned', banReason: 'Violation', location: { country: 'US', city: 'NY' } }),
        });

      const result = await service.banPet('pet-1', 'Violation');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'banned',
          banReason: 'Violation',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.status).toBe('banned');
    });

    it('should throw 404 when pet not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.banPet('nonexistent', 'reason')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- unbanPet ---

  describe('unbanPet', () => {
    it('should unban an existing pet', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', status: 'banned', location: { country: 'US', city: 'NY' } }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', status: 'active', banReason: null, location: { country: 'US', city: 'NY' } }),
        });

      const result = await service.unbanPet('pet-1');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'active',
          banReason: null,
          bannedAt: null,
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.status).toBe('active');
    });

    it('should throw 404 when pet not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.unbanPet('nonexistent')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- processVerification ---

  describe('processVerification', () => {
    it('should approve verification with expiry date', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'req-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
      });

      const result = await service.processVerification('req-1', true, 'admin-1', undefined, '2025-12-31');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'approved',
          processedBy: 'admin-1',
          expiryDate: '2025-12-31',
        })
      );
      // Should also update user's isVerifiedBreeder
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          isVerifiedBreeder: true,
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result).toEqual({
        id: 'req-1',
        status: 'approved',
        expiryDate: '2025-12-31',
        rejectionReason: null,
      });
    });

    it('should reject verification with reason', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'req-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
      });

      const result = await service.processVerification('req-1', false, 'admin-1', 'Insufficient docs');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'rejected',
          processedBy: 'admin-1',
          rejectionReason: 'Insufficient docs',
        })
      );
      expect(result).toEqual({
        id: 'req-1',
        status: 'rejected',
        expiryDate: null,
        rejectionReason: 'Insufficient docs',
      });
    });

    it('should throw 404 when verification request not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.processVerification('nonexistent', true, 'admin-1')).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });
    });
  });

  // --- revokeVerification ---

  describe('revokeVerification', () => {
    it('should revoke an approved verification', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'req-1',
        data: () => ({ userId: 'user-1', status: 'approved' }),
      });

      const result = await service.revokeVerification('req-1', 'admin-1', 'Fraud detected');

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'revoked',
          revokedBy: 'admin-1',
          revokeReason: 'Fraud detected',
        })
      );
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          isVerifiedBreeder: false,
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result).toEqual({
        id: 'req-1',
        status: 'revoked',
        revokeReason: 'Fraud detected',
      });
    });

    it('should throw 404 when verification request not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.revokeVerification('nonexistent', 'admin-1', 'reason')).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });
    });

    it('should throw 400 when verification is not approved', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'req-1',
        data: () => ({ userId: 'user-1', status: 'pending' }),
      });

      await expect(service.revokeVerification('req-1', 'admin-1', 'reason')).rejects.toMatchObject({
        message: 'Can only revoke approved verifications',
        statusCode: 400,
      });
    });
  });

  // --- getCategories ---

  describe('getCategories', () => {
    it('should return categories ordered by name', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'cat-1', data: () => ({ name: 'bird', label: 'Bird', icon: 'bird-icon' }) },
          { id: 'cat-2', data: () => ({ name: 'cat', label: 'Cat', icon: 'cat-icon' }) },
          { id: 'cat-3', data: () => ({ name: 'dog', label: 'Dog', icon: 'dog-icon' }) },
        ],
        empty: false,
        size: 3,
      });

      const result = await service.getCategories();

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ id: 'cat-1', name: 'bird', label: 'Bird', icon: 'bird-icon' });
      expect(mockCollection.orderBy).toHaveBeenCalledWith('name', 'asc');
    });
  });

  // --- createCategory ---

  describe('createCategory', () => {
    it('should create a category and lowercase the name', async () => {
      mockCollection.add.mockResolvedValueOnce({ id: 'new-cat-id' });

      const result = await service.createCategory({
        name: 'DOG',
        label: 'Dog',
        icon: 'dog-icon',
        description: 'All dog breeds',
      });

      expect(result).toEqual({
        id: 'new-cat-id',
        name: 'dog',
        label: 'Dog',
        icon: 'dog-icon',
        description: 'All dog breeds',
        isActive: true,
      });
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'dog',
          label: 'Dog',
          isActive: true,
        })
      );
    });

    it('should handle category without optional fields', async () => {
      mockCollection.add.mockResolvedValueOnce({ id: 'new-cat-id' });

      const result = await service.createCategory({
        name: 'Fish',
        label: 'Fish',
      });

      expect(result.name).toBe('fish');
      expect(result.isActive).toBe(true);
    });
  });

  // --- updateCategory ---

  describe('updateCategory', () => {
    it('should update a category and return updated data', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'cat-1',
          data: () => ({ name: 'dog', label: 'Dog', isActive: true }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'cat-1',
          data: () => ({ name: 'dog', label: 'Dogs', isActive: false }),
        });

      const result = await service.updateCategory('cat-1', { label: 'Dogs', isActive: false });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'Dogs',
          isActive: false,
        })
      );
      expect(result).toEqual({ id: 'cat-1', name: 'dog', label: 'Dogs', isActive: false });
    });

    it('should throw 404 when category not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.updateCategory('nonexistent', { label: 'X' })).rejects.toMatchObject({
        message: 'Category not found',
        statusCode: 404,
      });
    });
  });

  // --- deleteCategory ---

  describe('deleteCategory', () => {
    it('should delete an existing category', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'cat-1',
        data: () => ({ name: 'dog', label: 'Dog' }),
      });

      await service.deleteCategory('cat-1');

      expect(mockCollection.doc).toHaveBeenCalledWith('cat-1');
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 when category not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.deleteCategory('nonexistent')).rejects.toMatchObject({
        message: 'Category not found',
        statusCode: 404,
      });
    });
  });

  // --- seedDefaultCategories ---

  describe('seedDefaultCategories', () => {
    it('should return early if categories already exist', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'cat-1', data: () => ({ name: 'dog' }) }],
        size: 1,
      });

      const result = await service.seedDefaultCategories();

      expect(result).toEqual({ message: 'Categories already exist', seeded: false });
      expect(mockCollection.add).not.toHaveBeenCalled();
    });

    it('should seed default categories when collection is empty', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: true,
        docs: [],
        size: 0,
      });
      mockCollection.add.mockResolvedValue({ id: 'new-id' });

      const result = await service.seedDefaultCategories();

      expect(result).toEqual({
        message: 'Default categories seeded',
        seeded: true,
        count: 9,
      });
      expect(mockCollection.add).toHaveBeenCalledTimes(9);
    });
  });

  // --- getSettings ---

  describe('getSettings', () => {
    it('should return existing settings', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'global',
        data: () => ({
          general: { appName: 'PET Roll', maintenanceMode: false },
          notifications: { vaccinationReminders: true },
          security: { rateLimitPerMinute: 100 },
        }),
      });

      const result = await service.getSettings();

      expect(result.general).toEqual({ appName: 'PET Roll', maintenanceMode: false });
      expect(result.notifications).toEqual({ vaccinationReminders: true });
      expect(result.security).toEqual({ rateLimitPerMinute: 100 });
    });

    it('should create default settings when not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'global',
        data: () => null,
      });

      const result = await service.getSettings();

      expect(mockCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({
          general: expect.objectContaining({ appName: 'PET Roll' }),
          notifications: expect.objectContaining({ vaccinationReminders: true }),
          security: expect.objectContaining({ rateLimitPerMinute: 100 }),
        })
      );
      expect(result.general.appName).toBe('PET Roll');
    });
  });

  // --- updateSettings ---

  describe('updateSettings', () => {
    it('should update a valid settings section when doc exists', async () => {
      // First get: check if doc exists
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'global',
          data: () => ({
            general: { appName: 'PET Roll' },
            notifications: { vaccinationReminders: true },
            security: { rateLimitPerMinute: 100 },
          }),
        })
        // Second get: getSettings call at the end
        .mockResolvedValueOnce({
          exists: true,
          id: 'global',
          data: () => ({
            general: { appName: 'Updated App' },
            notifications: { vaccinationReminders: true },
            security: { rateLimitPerMinute: 100 },
          }),
        });

      const result = await service.updateSettings('general', { appName: 'Updated App' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          general: { appName: 'Updated App' },
        })
      );
      expect(result.general.appName).toBe('Updated App');
    });

    it('should create settings doc when it does not exist', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: false,
          id: 'global',
          data: () => null,
        })
        // getSettings call at the end: now it exists
        .mockResolvedValueOnce({
          exists: true,
          id: 'global',
          data: () => ({
            general: { appName: 'PET Roll' },
            notifications: { vaccinationReminders: false },
            security: { rateLimitPerMinute: 100 },
          }),
        });

      const result = await service.updateSettings('notifications', { vaccinationReminders: false });

      expect(mockCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({
          notifications: { vaccinationReminders: false },
        })
      );
      expect(result.notifications.vaccinationReminders).toBe(false);
    });

    it('should throw 400 for invalid settings section', async () => {
      await expect(service.updateSettings('invalid', { key: 'value' })).rejects.toMatchObject({
        message: 'Invalid settings section: invalid',
        statusCode: 400,
      });
    });
  });

  // --- deleteMatingListing ---

  describe('deleteMatingListing', () => {
    it('should delete an existing mating listing', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'listing-1',
        data: () => ({ species: 'dog', status: 'active' }),
      });

      await service.deleteMatingListing('listing-1');

      expect(db.collection).toHaveBeenCalledWith('mating_listings');
      expect(mockCollection.doc).toHaveBeenCalledWith('listing-1');
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 when listing not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.deleteMatingListing('nonexistent')).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });
  });

  // --- getPets ---

  describe('getPets', () => {
    it('should return paginated pets with owner names', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 2 }) }),
      });
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'pet-1',
              data: () => ({
                name: 'Buddy',
                species: 'dog',
                ownerId: 'owner-1',
                location: { country: 'US', city: 'New York' },
              }),
            },
            {
              id: 'pet-2',
              data: () => ({
                name: 'Kitty',
                species: 'cat',
                ownerId: 'owner-2',
                location: { country: 'UK', city: 'London' },
              }),
            },
          ],
          empty: false,
          size: 2,
        })
        // Owner lookups
        .mockResolvedValueOnce({
          exists: true,
          id: 'owner-1',
          data: () => ({ displayName: 'Alice' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'owner-2',
          data: () => ({ displayName: 'Bob' }),
        });

      const result = await service.getPets(1, 20);

      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].ownerName).toBe('Alice');
      expect(result.data[0].country).toBe('US');
      expect(result.data[0].city).toBe('New York');
    });

    it('should apply species filter', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          {
            id: 'pet-1',
            data: () => ({
              name: 'Buddy',
              species: 'dog',
              ownerId: null,
              location: null,
            }),
          },
        ],
        empty: false,
        size: 1,
      });

      const result = await service.getPets(1, 20, 'dog');

      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'dog');
      expect(result.data[0].ownerName).toBe('Unknown');
    });

    it('should apply status filter', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getPets(1, 20, undefined, 'banned');

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'banned');
    });

    it('should apply country and city filters', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getPets(1, 20, undefined, undefined, 'US', 'NYC');

      expect(mockCollection.where).toHaveBeenCalledWith('location.country', '==', 'US');
      expect(mockCollection.where).toHaveBeenCalledWith('location.city', '==', 'NYC');
    });

    it('should handle owner lookup failure gracefully', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'pet-1',
              data: () => ({
                name: 'Buddy',
                species: 'dog',
                ownerId: 'owner-1',
                location: { country: 'US', city: 'NY' },
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        .mockRejectedValueOnce(new Error('Network error'));

      const result = await service.getPets(1, 20);

      expect(result.data[0].ownerName).toBe('Unknown');
    });
  });

  // --- getVerificationRequests ---

  describe('getVerificationRequests', () => {
    it('should return verification requests with user data', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'vreq-1',
              data: () => ({
                userId: 'user-1',
                status: 'pending',
                userName: 'FallbackName',
                userEmail: 'fallback@test.com',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        // User lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', email: 'alice@test.com' }),
        });

      const result = await service.getVerificationRequests();

      expect(result).toHaveLength(1);
      expect(result[0].displayName).toBe('Alice');
      expect(result[0].email).toBe('alice@test.com');
    });

    it('should filter by status when provided', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getVerificationRequests('pending');

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'pending');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });

    it('should fallback to userName/userEmail when user lookup fails', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'vreq-1',
              data: () => ({
                userId: 'user-1',
                status: 'pending',
                userName: 'FallbackName',
                userEmail: 'fallback@test.com',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        .mockResolvedValueOnce({
          exists: false,
          id: 'user-1',
          data: () => null,
        });

      const result = await service.getVerificationRequests();

      expect(result[0].displayName).toBe('FallbackName');
      expect(result[0].email).toBe('fallback@test.com');
    });
  });

  // --- getVerificationById ---

  describe('getVerificationById', () => {
    it('should return verification request with user data and history', async () => {
      mockCollection.get
        // Main doc lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'vreq-1',
          data: () => ({
            userId: 'user-1',
            status: 'pending',
            userName: 'Fallback',
            userEmail: 'fb@test.com',
          }),
        })
        // User lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Alice', email: 'alice@test.com' }),
        })
        // History query
        .mockResolvedValueOnce({
          docs: [
            { id: 'vreq-1', data: () => ({ status: 'pending', createdAt: '2025-01-01' }) },
            { id: 'vreq-0', data: () => ({ status: 'rejected', createdAt: '2024-06-01' }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getVerificationById('vreq-1');

      expect(result.id).toBe('vreq-1');
      expect(result.displayName).toBe('Alice');
      expect(result.email).toBe('alice@test.com');
      expect(result.history).toHaveLength(2);
    });

    it('should throw 404 when verification request not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getVerificationById('nonexistent')).rejects.toMatchObject({
        message: 'Verification request not found',
        statusCode: 404,
      });
    });
  });

  // --- getVerificationHistory ---

  describe('getVerificationHistory', () => {
    it('should return verification history for a user', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'vreq-1', data: () => ({ status: 'approved', createdAt: '2025-01-01' }) },
          { id: 'vreq-2', data: () => ({ status: 'rejected', createdAt: '2024-06-01' }) },
        ],
        empty: false,
        size: 2,
      });

      const result = await service.getVerificationHistory('user-1');

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'vreq-1', status: 'approved', createdAt: '2025-01-01' });
      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    });

    it('should return empty array when no history', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      const result = await service.getVerificationHistory('user-no-history');

      expect(result).toEqual([]);
    });
  });

  // --- getMatingListings ---

  describe('getMatingListings', () => {
    it('should return mating listings with owner info', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'listing-1',
              data: () => ({
                species: 'dog',
                breed: 'Labrador',
                status: 'active',
                ownerId: 'owner-1',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        // Owner lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'owner-1',
          data: () => ({ displayName: 'Alice', email: 'alice@test.com' }),
        });

      const result = await service.getMatingListings();

      expect(result).toHaveLength(1);
      expect(result[0].ownerName).toBe('Alice');
      expect(result[0].ownerEmail).toBe('alice@test.com');
    });

    it('should filter by status', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getMatingListings('active');

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'active');
    });

    it('should filter by species', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getMatingListings(undefined, 'cat');

      expect(mockCollection.where).toHaveBeenCalledWith('species', '==', 'cat');
    });

    it('should handle owner not found', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'listing-1',
              data: () => ({
                species: 'dog',
                ownerId: 'missing-owner',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        .mockResolvedValueOnce({
          exists: false,
          id: 'missing-owner',
          data: () => null,
        });

      const result = await service.getMatingListings();

      expect(result[0].ownerName).toBe('Unknown');
      expect(result[0].ownerEmail).toBe('');
    });
  });

  // --- getMatingStats ---

  describe('getMatingStats', () => {
    it('should return aggregated mating stats', async () => {
      mockCollection.get
        // mating_listings
        .mockResolvedValueOnce({
          docs: [
            { id: 'l1', data: () => ({ status: 'active', viewCount: 10 }) },
            { id: 'l2', data: () => ({ status: 'closed', viewCount: 5 }) },
            { id: 'l3', data: () => ({ status: 'active', viewCount: 3 }) },
          ],
          empty: false,
          size: 3,
        })
        // mating_requests
        .mockResolvedValueOnce({
          docs: [
            { id: 'r1', data: () => ({ status: 'accepted' }) },
            { id: 'r2', data: () => ({ status: 'rejected' }) },
            { id: 'r3', data: () => ({ status: 'pending' }) },
            { id: 'r4', data: () => ({ status: 'pending' }) },
          ],
          empty: false,
          size: 4,
        });

      const result = await service.getMatingStats();

      expect(result.totalListings).toBe(3);
      expect(result.activeListings).toBe(2);
      expect(result.totalRequests).toBe(4);
      expect(result.acceptedRequests).toBe(1);
      expect(result.rejectedRequests).toBe(1);
      expect(result.pendingRequests).toBe(2);
      expect(result.totalViews).toBe(18);
    });

    it('should handle empty collections', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 })
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 });

      const result = await service.getMatingStats();

      expect(result.totalListings).toBe(0);
      expect(result.activeListings).toBe(0);
      expect(result.totalRequests).toBe(0);
      expect(result.totalViews).toBe(0);
    });
  });

  // --- getBreederRankings ---

  describe('getBreederRankings', () => {
    it('should return breeder rankings sorted by matches', async () => {
      mockCollection.get
        // verified breeders
        .mockResolvedValueOnce({
          docs: [
            { id: 'breeder-1', data: () => ({ displayName: 'Breeder A', email: 'a@test.com', isVerifiedBreeder: true, createdAt: '2024-01-01' }) },
            { id: 'breeder-2', data: () => ({ displayName: 'Breeder B', email: 'b@test.com', isVerifiedBreeder: true, createdAt: '2024-02-01' }) },
          ],
          empty: false,
          size: 2,
        })
        // mating_listings
        .mockResolvedValueOnce({
          docs: [
            { id: 'l1', data: () => ({ ownerId: 'breeder-1', species: 'dog', status: 'active', viewCount: 10, location: { country: 'US', city: 'NY' } }) },
            { id: 'l2', data: () => ({ ownerId: 'breeder-2', species: 'cat', status: 'active', viewCount: 5, location: { country: 'UK', city: 'London' } }) },
          ],
          empty: false,
          size: 2,
        })
        // mating_requests
        .mockResolvedValueOnce({
          docs: [
            { id: 'r1', data: () => ({ receiverId: 'breeder-1', listingId: 'l1', status: 'accepted' }) },
            { id: 'r2', data: () => ({ receiverId: 'breeder-2', listingId: 'l2', status: 'pending' }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getBreederRankings();

      expect(result.rankings).toHaveLength(2);
      expect(result.rankings[0].userId).toBe('breeder-1');
      expect(result.rankings[0].totalMatches).toBe(1);
      expect(result.rankings[1].userId).toBe('breeder-2');
      expect(result.rankings[1].totalMatches).toBe(0);
      expect(result.filters).toBeDefined();
      expect(result.speciesRankings).toBeDefined();
    });

    it('should apply country filter', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'breeder-1', data: () => ({ displayName: 'Breeder A', isVerifiedBreeder: true, createdAt: '2024-01-01' }) },
          ],
          empty: false,
          size: 1,
        })
        .mockResolvedValueOnce({
          docs: [
            { id: 'l1', data: () => ({ ownerId: 'breeder-1', species: 'dog', status: 'active', viewCount: 5, location: { country: 'US', city: 'NY' } }) },
            { id: 'l2', data: () => ({ ownerId: 'breeder-1', species: 'dog', status: 'active', viewCount: 3, location: { country: 'UK', city: 'London' } }) },
          ],
          empty: false,
          size: 2,
        })
        .mockResolvedValueOnce({
          docs: [],
          empty: true,
          size: 0,
        });

      const result = await service.getBreederRankings({ country: 'US' });

      // Only listings from US should be included in ranking computation
      expect(result.rankings).toBeDefined();
    });
  });

  // --- getBreederDetail ---

  describe('getBreederDetail', () => {
    it('should return breeder details with listings and stats', async () => {
      mockCollection.get
        // User doc
        .mockResolvedValueOnce({
          exists: true,
          id: 'breeder-1',
          data: () => ({ displayName: 'Breeder A', email: 'a@test.com', isVerifiedBreeder: true }),
        })
        // mating_listings
        .mockResolvedValueOnce({
          docs: [
            { id: 'l1', data: () => ({ status: 'active', viewCount: 10 }) },
            { id: 'l2', data: () => ({ status: 'closed', viewCount: 5 }) },
          ],
          empty: false,
          size: 2,
        })
        // mating_requests
        .mockResolvedValueOnce({
          docs: [
            { id: 'r1', data: () => ({ status: 'accepted' }) },
            { id: 'r2', data: () => ({ status: 'pending' }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getBreederDetail('breeder-1');

      expect(result.displayName).toBe('Breeder A');
      expect(result.listings).toHaveLength(2);
      expect(result.requests).toHaveLength(2);
      expect(result.stats.totalListings).toBe(2);
      expect(result.stats.activeListings).toBe(1);
      expect(result.stats.totalMatches).toBe(1);
      expect(result.stats.totalViews).toBe(15);
      expect(result.stats.successRate).toBe(50);
    });

    it('should throw 404 when user not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getBreederDetail('nonexistent')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });

    it('should handle zero listings gracefully', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'breeder-1',
          data: () => ({ displayName: 'Breeder A' }),
        })
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 })
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 });

      const result = await service.getBreederDetail('breeder-1');

      expect(result.stats.totalListings).toBe(0);
      expect(result.stats.successRate).toBe(0);
    });
  });

  // --- getMatingMatches ---

  describe('getMatingMatches', () => {
    it('should return match details with listing, sender, and receiver', async () => {
      mockCollection.get
        // mating_requests query
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'req-1',
              data: () => ({
                status: 'accepted',
                senderId: 'user-1',
                receiverId: 'user-2',
                listingId: 'listing-1',
                petId: 'pet-1',
                message: 'Hello',
                respondedAt: '2025-01-01',
                createdAt: '2024-12-01',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        // listing lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'listing-1',
          data: () => ({
            breed: 'Labrador',
            species: 'dog',
            gender: 'male',
            age: 3,
            price: 100,
            location: { country: 'US', city: 'NY' },
            description: 'Healthy',
            healthCertified: true,
            petId: 'pet-2',
          }),
        })
        // sender user lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Sender', email: 'sender@test.com' }),
        })
        // sender pet lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Rex', breed: 'Lab', species: 'dog', gender: 'female', photos: ['photo1.jpg'], color: 'black' }),
        })
        // receiver user lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-2',
          data: () => ({ displayName: 'Receiver', email: 'receiver@test.com' }),
        })
        // receiver pet lookup
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-2',
          data: () => ({ name: 'Max', breed: 'Lab', species: 'dog', gender: 'male', photos: [{ url: 'photo2.jpg' }], color: 'gold' }),
        });

      const result = await service.getMatingMatches();

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('req-1');
      expect(result[0].status).toBe('accepted');
      expect(result[0].listing!.breed).toBe('Labrador');
      expect(result[0].sender.displayName).toBe('Sender');
      expect(result[0].senderPet!.name).toBe('Rex');
      expect(result[0].receiver.displayName).toBe('Receiver');
      expect(result[0].receiverPet!.name).toBe('Max');
    });

    it('should filter by status', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      await service.getMatingMatches({ status: 'pending' });

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'pending');
    });

    it('should filter out matches by species', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            {
              id: 'req-1',
              data: () => ({
                status: 'accepted',
                senderId: 'user-1',
                receiverId: 'user-2',
                listingId: 'listing-1',
                createdAt: '2024-12-01',
              }),
            },
          ],
          empty: false,
          size: 1,
        })
        // listing lookup - species is 'dog' but filter is 'cat'
        .mockResolvedValueOnce({
          exists: true,
          id: 'listing-1',
          data: () => ({
            breed: 'Labrador',
            species: 'dog',
            gender: 'male',
            location: { country: 'US', city: 'NY' },
          }),
        });

      const result = await service.getMatingMatches({ species: 'cat' });

      // Match filtered out because species doesn't match
      expect(result).toHaveLength(0);
    });
  });

  // --- sendWeddingCardForMatch ---

  describe('sendWeddingCardForMatch', () => {
    it('should send wedding card for accepted match', async () => {
      const { emailService } = await import('../../src/services/email.service');

      mockCollection.get
        // mating_requests doc
        .mockResolvedValueOnce({
          exists: true,
          id: 'req-1',
          data: () => ({
            status: 'accepted',
            senderId: 'user-1',
            receiverId: 'user-2',
            listingId: 'listing-1',
            petId: 'pet-1',
          }),
        })
        // sender, receiver, listing Promise.all
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Sender', email: 'sender@test.com' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-2',
          data: () => ({ displayName: 'Receiver', email: 'receiver@test.com' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'listing-1',
          data: () => ({ species: 'dog', breed: 'Lab', petId: 'pet-2', petName: 'Max', location: { country: 'US', city: 'NY' } }),
        })
        // sender pet
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Rex', breed: 'Lab', photos: ['photo1.jpg'] }),
        })
        // receiver pet
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-2',
          data: () => ({ name: 'Max', breed: 'Lab', photos: [{ url: 'photo2.jpg' }] }),
        });

      await service.sendWeddingCardForMatch('req-1');

      expect(emailService.sendMatchWeddingCard).toHaveBeenCalledWith(
        expect.objectContaining({
          senderName: 'Sender',
          senderEmail: 'sender@test.com',
          senderPetName: 'Rex',
          receiverName: 'Receiver',
          receiverEmail: 'receiver@test.com',
          receiverPetName: 'Max',
          species: 'dog',
        })
      );
    });

    it('should throw 404 when match request not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.sendWeddingCardForMatch('nonexistent')).rejects.toMatchObject({
        message: 'Match request not found',
        statusCode: 404,
      });
    });

    it('should throw 400 when match is not accepted', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: true,
        id: 'req-1',
        data: () => ({
          status: 'pending',
          senderId: 'user-1',
          receiverId: 'user-2',
          listingId: 'listing-1',
        }),
      });

      await expect(service.sendWeddingCardForMatch('req-1')).rejects.toMatchObject({
        message: 'Can only send wedding cards for accepted matches',
        statusCode: 400,
      });
    });
  });

  // --- getWeddingCardPreview ---

  describe('getWeddingCardPreview', () => {
    it('should return HTML preview of wedding card', async () => {
      const { emailService } = await import('../../src/services/email.service');

      mockCollection.get
        // request doc
        .mockResolvedValueOnce({
          exists: true,
          id: 'req-1',
          data: () => ({
            status: 'accepted',
            senderId: 'user-1',
            receiverId: 'user-2',
            listingId: 'listing-1',
            petId: 'pet-1',
            respondedAt: '2025-06-01',
          }),
        })
        // sender
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-1',
          data: () => ({ displayName: 'Sender', email: 'sender@test.com' }),
        })
        // receiver
        .mockResolvedValueOnce({
          exists: true,
          id: 'user-2',
          data: () => ({ displayName: 'Receiver', email: 'receiver@test.com' }),
        })
        // listing
        .mockResolvedValueOnce({
          exists: true,
          id: 'listing-1',
          data: () => ({ species: 'dog', breed: 'Lab', petId: 'pet-2', location: { country: 'US', city: 'NY' } }),
        })
        // sender pet
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Rex', breed: 'Lab', photos: [] }),
        })
        // receiver pet
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-2',
          data: () => ({ name: 'Max', breed: 'Lab', photos: [] }),
        });

      const result = await service.getWeddingCardPreview('req-1');

      expect(result).toBe('<html>card</html>');
      expect(emailService.buildWeddingCardTemplate).toHaveBeenCalledWith(
        expect.objectContaining({
          senderName: 'Sender',
          receiverName: 'Receiver',
          species: 'dog',
        })
      );
    });

    it('should throw 404 when match request not found', async () => {
      mockCollection.get.mockResolvedValueOnce({
        exists: false,
        id: 'nonexistent',
        data: () => null,
      });

      await expect(service.getWeddingCardPreview('nonexistent')).rejects.toMatchObject({
        message: 'Match request not found',
        statusCode: 404,
      });
    });
  });

  // --- getVaccinationAnalytics ---

  describe('getVaccinationAnalytics', () => {
    it('should return vaccination analytics with all data', async () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString();

      mockCollection.get
        // vaccinations collection
        .mockResolvedValueOnce({
          docs: [
            { id: 'v1', data: () => ({ name: 'Rabies', petId: 'pet-1', administeredDate: recent }) },
            { id: 'v2', data: () => ({ name: 'Rabies', petId: 'pet-2', administeredDate: recent }) },
            { id: 'v3', data: () => ({ name: 'Parvo', petId: 'pet-1', administeredDate: recent }) },
          ],
          empty: false,
          size: 3,
        })
        // pets collection
        .mockResolvedValueOnce({
          docs: [
            { id: 'pet-1', data: () => ({ species: 'dog', location: { country: 'US', city: 'NY' } }) },
            { id: 'pet-2', data: () => ({ species: 'cat', location: { country: 'UK', city: 'London' } }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getVaccinationAnalytics({ period: '30d' });

      expect(result.summary.totalVaccinations).toBe(3);
      expect(result.summary.uniqueVaccines).toBe(2);
      expect(result.summary.uniquePetsVaccinated).toBe(2);
      expect(result.summary.period).toBe('30d');
      expect(result.topVaccines[0].vaccineName).toBe('Rabies');
      expect(result.topVaccines[0].count).toBe(2);
    });

    it('should filter by species', async () => {
      const recent = new Date().toISOString();

      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'v1', data: () => ({ name: 'Rabies', petId: 'pet-1', administeredDate: recent }) },
            { id: 'v2', data: () => ({ name: 'FeLV', petId: 'pet-2', administeredDate: recent }) },
          ],
          empty: false,
          size: 2,
        })
        .mockResolvedValueOnce({
          docs: [
            { id: 'pet-1', data: () => ({ species: 'dog', location: { country: 'US', city: 'NY' } }) },
            { id: 'pet-2', data: () => ({ species: 'cat', location: { country: 'US', city: 'LA' } }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getVaccinationAnalytics({ species: 'dog' });

      expect(result.summary.totalVaccinations).toBe(1);
      expect(result.topVaccines[0].vaccineName).toBe('Rabies');
    });

    it('should filter by country', async () => {
      const recent = new Date().toISOString();

      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'v1', data: () => ({ name: 'Rabies', petId: 'pet-1', administeredDate: recent }) },
            { id: 'v2', data: () => ({ name: 'FeLV', petId: 'pet-2', administeredDate: recent }) },
          ],
          empty: false,
          size: 2,
        })
        .mockResolvedValueOnce({
          docs: [
            { id: 'pet-1', data: () => ({ species: 'dog', location: { country: 'US', city: 'NY' } }) },
            { id: 'pet-2', data: () => ({ species: 'cat', location: { country: 'UK', city: 'London' } }) },
          ],
          empty: false,
          size: 2,
        });

      const result = await service.getVaccinationAnalytics({ country: 'US' });

      expect(result.summary.totalVaccinations).toBe(1);
    });

    it('should handle no period (all time)', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'v1', data: () => ({ name: 'Rabies', petId: 'pet-1', administeredDate: '2020-01-01' }) },
          ],
          empty: false,
          size: 1,
        })
        .mockResolvedValueOnce({
          docs: [
            { id: 'pet-1', data: () => ({ species: 'dog', location: { country: 'US', city: 'NY' } }) },
          ],
          empty: false,
          size: 1,
        });

      const result = await service.getVaccinationAnalytics({});

      expect(result.summary.period).toBe('all');
      expect(result.summary.totalVaccinations).toBe(1);
    });

    it('should handle empty vaccinations', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 })
        .mockResolvedValueOnce({ docs: [], empty: true, size: 0 });

      const result = await service.getVaccinationAnalytics({});

      expect(result.summary.totalVaccinations).toBe(0);
      expect(result.summary.uniqueVaccines).toBe(0);
      expect(result.topVaccines).toHaveLength(0);
    });
  });

  // --- getCountries ---

  describe('getCountries', () => {
    it('should return countries ordered by name', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [
          { id: 'UK', data: () => ({ code: 'UK', name: 'United Kingdom' }) },
          { id: 'US', data: () => ({ code: 'US', name: 'United States' }) },
        ],
        empty: false,
        size: 2,
      });

      const result = await service.getCountries();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: 'UK', code: 'UK', name: 'United Kingdom' });
      expect(result[1]).toEqual({ id: 'US', code: 'US', name: 'United States' });
      expect(mockCollection.orderBy).toHaveBeenCalledWith('name', 'asc');
    });

    it('should return empty array when no countries', async () => {
      mockCollection.get.mockResolvedValueOnce({
        docs: [],
        empty: true,
        size: 0,
      });

      const result = await service.getCountries();

      expect(result).toEqual([]);
    });
  });

  // --- getCities ---

  describe('getCities', () => {
    it('should return cities for a country found by name', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'US', data: () => ({ code: 'US', name: 'United States', cities: ['New York', 'Los Angeles'] }) },
        ],
        size: 1,
      });

      const result = await service.getCities('United States');

      expect(result).toEqual(['New York', 'Los Angeles']);
      expect(mockCollection.where).toHaveBeenCalledWith('name', '==', 'United States');
    });

    it('should fallback to search by code when name not found', async () => {
      mockCollection.get
        // First query by name: empty
        .mockResolvedValueOnce({
          empty: true,
          docs: [],
          size: 0,
        })
        // Second query by code
        .mockResolvedValueOnce({
          empty: false,
          docs: [
            { id: 'US', data: () => ({ code: 'US', name: 'United States', cities: ['New York', 'LA'] }) },
          ],
          size: 1,
        });

      const result = await service.getCities('US');

      expect(mockCollection.where).toHaveBeenCalledWith('name', '==', 'US');
      expect(mockCollection.where).toHaveBeenCalledWith('code', '==', 'US');
      expect(result).toEqual(['New York', 'LA']);
    });

    it('should return empty array when no country param', async () => {
      const result = await service.getCities();

      expect(result).toEqual([]);
    });

    it('should return empty array when country not found by name or code', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ empty: true, docs: [], size: 0 })
        .mockResolvedValueOnce({ empty: true, docs: [], size: 0 });

      const result = await service.getCities('NonExistent');

      expect(result).toEqual([]);
    });

    it('should return empty array when country has no cities field', async () => {
      mockCollection.get.mockResolvedValueOnce({
        empty: false,
        docs: [
          { id: 'XX', data: () => ({ code: 'XX', name: 'NoCity' }) },
        ],
        size: 1,
      });

      const result = await service.getCities('NoCity');

      expect(result).toEqual([]);
    });
  });

  // --- seedLocations ---

  describe('seedLocations', () => {
    it('should seed locations from countries data', async () => {
      const result = await service.seedLocations();

      expect(result).toEqual({ message: 'Seeded 2 countries with cities', count: 2 });
      expect(mockCollection.set).toHaveBeenCalledTimes(2);
      expect(mockCollection.doc).toHaveBeenCalledWith('US');
      expect(mockCollection.doc).toHaveBeenCalledWith('UK');
      expect(mockCollection.set).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'US',
          name: 'United States',
          cities: ['New York', 'Los Angeles'],
        })
      );
    });
  });
});
