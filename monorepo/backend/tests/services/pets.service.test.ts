import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PetsService } from '../../src/modules/pets/pets.service';
import { db, FieldValue, storage } from '../../src/config/firebase';

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

describe('PetsService', () => {
  let service: PetsService;
  let mockPetsCollection: any;
  let mockUsersCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new PetsService();

    // db.collection returns the same mock each time, so we track both
    mockPetsCollection = (db.collection as any)('pets');
    mockUsersCollection = (db.collection as any)('users');
  });

  // --- createPet ---

  describe('createPet', () => {
    it('should create a pet with basic fields', async () => {
      mockPetsCollection.add.mockResolvedValue({ id: 'pet-1' });
      // Owner lookup - no location needed since we provide location
      mockPetsCollection.get.mockResolvedValue({ exists: false, data: () => null });

      const input = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Labrador',
        gender: 'male' as const,
        dateOfBirth: '2020-01-15',
        location: { country: 'US', city: 'New York' },
      };

      const result = await service.createPet('owner-1', input);

      expect(result.id).toBe('pet-1');
      expect(result.ownerId).toBe('owner-1');
      expect(result.photos).toEqual([]);
      expect(mockPetsCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Buddy',
          species: 'dog',
          breed: 'Labrador',
          ownerId: 'owner-1',
          photos: [],
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should inherit owner location if pet has no location', async () => {
      // db.collection is called for 'users' to get owner data
      // The mock returns the same mockCollection for all collection names
      // So we mock .get to first return owner data (for users doc get), then resolve add
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'owner-1',
        data: () => ({ country: 'Sweden', city: 'Stockholm' }),
      });
      mockPetsCollection.add.mockResolvedValue({ id: 'pet-2' });

      const input = {
        name: 'Katt',
        species: 'cat',
        gender: 'female' as const,
      };

      const result = await service.createPet('owner-1', input);

      expect(mockPetsCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          location: { country: 'Sweden', city: 'Stockholm' },
        })
      );
    });

    it('should not override pet location with owner location if pet has location', async () => {
      mockPetsCollection.add.mockResolvedValue({ id: 'pet-3' });

      const input = {
        name: 'Rex',
        species: 'dog',
        gender: 'male' as const,
        location: { country: 'UK', city: 'London' },
      };

      const result = await service.createPet('owner-1', input);

      expect(mockPetsCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          location: { country: 'UK', city: 'London' },
        })
      );
    });

    it('should not set location if owner also has no location', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'owner-1',
        data: () => ({ name: 'Owner Without Location' }), // no country/city
      });
      mockPetsCollection.add.mockResolvedValue({ id: 'pet-4' });

      const input = {
        name: 'NoLoc',
        species: 'bird',
        gender: 'male' as const,
      };

      await service.createPet('owner-1', input);

      const addCall = mockPetsCollection.add.mock.calls[0][0];
      expect(addCall.location).toBeUndefined();
    });
  });

  // --- getUserPets ---

  describe('getUserPets', () => {
    it('should return paginated pets for owner', async () => {
      mockPetsCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 15 }) }),
      });
      mockPetsCollection.get.mockResolvedValue({
        docs: [
          { id: 'pet-1', data: () => ({ name: 'Buddy', species: 'dog' }) },
          { id: 'pet-2', data: () => ({ name: 'Kitty', species: 'cat' }) },
        ],
      });

      const result = await service.getUserPets('owner-1', 1, 10);

      expect(result.total).toBe(15);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: 'pet-1', name: 'Buddy', species: 'dog' });
    });

    it('should use default pagination values', async () => {
      mockPetsCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockPetsCollection.get.mockResolvedValue({ docs: [] });

      const result = await service.getUserPets('owner-1');

      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(mockPetsCollection.offset).toHaveBeenCalledWith(0);
      expect(mockPetsCollection.limit).toHaveBeenCalledWith(20);
    });

    it('should calculate correct offset for subsequent pages', async () => {
      mockPetsCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }),
      });
      mockPetsCollection.get.mockResolvedValue({ docs: [] });

      await service.getUserPets('owner-1', 3, 10);

      expect(mockPetsCollection.offset).toHaveBeenCalledWith(20);
    });

    it('should filter by ownerId', async () => {
      mockPetsCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      mockPetsCollection.get.mockResolvedValue({ docs: [] });

      await service.getUserPets('owner-1');

      expect(mockPetsCollection.where).toHaveBeenCalledWith('ownerId', '==', 'owner-1');
    });
  });

  // --- getPetById ---

  describe('getPetById', () => {
    it('should return pet if it belongs to the owner', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', species: 'dog', ownerId: 'owner-1' }),
      });

      const result = await service.getPetById('pet-1', 'owner-1');

      expect(result).toEqual({ id: 'pet-1', name: 'Buddy', species: 'dog', ownerId: 'owner-1' });
    });

    it('should throw 404 if pet does not exist', async () => {
      mockPetsCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getPetById('missing', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'other-owner' }),
      });

      await expect(service.getPetById('pet-1', 'owner-1')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });
  });

  // --- updatePet ---

  describe('updatePet', () => {
    it('should update pet fields', async () => {
      // getPetById called twice: once to verify, once to return updated
      mockPetsCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', ownerId: 'owner-1' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Bud', species: 'dog', ownerId: 'owner-1' }),
        });
      mockPetsCollection.update.mockResolvedValue(undefined);

      const result = await service.updatePet('pet-1', 'owner-1', { name: 'Bud' });

      expect(mockPetsCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Bud',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.name).toBe('Bud');
    });

    it('should throw 404 if pet not found during update', async () => {
      mockPetsCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.updatePet('missing', 'owner-1', { name: 'X' })).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should throw 404 if pet belongs to different owner', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ ownerId: 'other-owner' }),
      });

      await expect(service.updatePet('pet-1', 'owner-1', { name: 'X' })).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- deletePet ---

  describe('deletePet', () => {
    it('should delete pet and all related records', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
      });

      const mockBatch = {
        delete: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      };
      (db.batch as any).mockReturnValue(mockBatch);

      // For each related collection query
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
        docs: [{ ref: { id: 'rec-1' } }],
      });

      const mockBucket = {
        deleteFiles: vi.fn().mockResolvedValue(undefined),
      };
      (storage.bucket as any).mockReturnValue(mockBucket);

      await service.deletePet('pet-1', 'owner-1');

      expect(mockBatch.commit).toHaveBeenCalled();
      expect(mockBucket.deleteFiles).toHaveBeenCalledWith({
        prefix: 'pets/owner-1/pet-1/',
      });
    });

    it('should throw 404 if pet does not exist', async () => {
      mockPetsCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.deletePet('missing', 'owner-1')).rejects.toMatchObject({
        statusCode: 404,
      });
    });

    it('should not throw if storage cleanup fails', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1' }),
        docs: [],
      });

      const mockBatch = {
        delete: vi.fn(),
        commit: vi.fn().mockResolvedValue(undefined),
      };
      (db.batch as any).mockReturnValue(mockBatch);

      const mockBucket = {
        deleteFiles: vi.fn().mockRejectedValue(new Error('Storage error')),
      };
      (storage.bucket as any).mockReturnValue(mockBucket);

      // Should not throw despite storage failure
      await expect(service.deletePet('pet-1', 'owner-1')).resolves.toBeUndefined();
    });
  });

  // --- addPetPhoto ---

  describe('addPetPhoto', () => {
    it('should add photo to pet', async () => {
      mockPetsCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [] }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [{ url: 'http://img.com/1.jpg', path: 'pets/1.jpg' }] }),
        });
      mockPetsCollection.update.mockResolvedValue(undefined);

      const result = await service.addPetPhoto('pet-1', 'owner-1', 'http://img.com/1.jpg', 'pets/1.jpg');

      expect(mockPetsCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          photos: expect.anything(),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 400 if pet already has 50 photos', async () => {
      const photos = Array(50).fill({ url: 'http://x.com/img.jpg', path: 'path' });
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos }),
      });

      await expect(service.addPetPhoto('pet-1', 'owner-1', 'http://x.com/new.jpg', 'new-path')).rejects.toMatchObject({
        message: 'Maximum 50 photos per pet reached',
        statusCode: 400,
      });
    });

    it('should throw 404 if pet not found', async () => {
      mockPetsCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.addPetPhoto('missing', 'owner-1', 'url', 'path')).rejects.toMatchObject({
        statusCode: 404,
      });
    });
  });

  // --- removePetPhoto ---

  describe('removePetPhoto', () => {
    it('should remove photo from pet and delete from storage', async () => {
      const photo = { url: 'http://img.com/1.jpg', path: 'pets/owner-1/pet-1/photo.jpg', uploadedAt: '2024-01-01' };
      mockPetsCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [photo] }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [] }),
        });
      mockPetsCollection.update.mockResolvedValue(undefined);

      const mockFile = { delete: vi.fn().mockResolvedValue(undefined) };
      const mockBucket = { file: vi.fn().mockReturnValue(mockFile) };
      (storage.bucket as any).mockReturnValue(mockBucket);

      await service.removePetPhoto('pet-1', 'owner-1', 'pets/owner-1/pet-1/photo.jpg');

      expect(mockPetsCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          photos: expect.anything(),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(mockFile.delete).toHaveBeenCalled();
    });

    it('should throw 404 if photo not found in pet photos', async () => {
      mockPetsCollection.get.mockResolvedValue({
        exists: true,
        id: 'pet-1',
        data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [] }),
      });

      await expect(service.removePetPhoto('pet-1', 'owner-1', 'nonexistent-path')).rejects.toMatchObject({
        message: 'Photo not found',
        statusCode: 404,
      });
    });

    it('should not throw if storage delete fails', async () => {
      const photo = { url: 'http://img.com/1.jpg', path: 'some/path.jpg', uploadedAt: '2024-01-01' };
      mockPetsCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [photo] }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', ownerId: 'owner-1', photos: [] }),
        });
      mockPetsCollection.update.mockResolvedValue(undefined);

      const mockFile = { delete: vi.fn().mockRejectedValue(new Error('Storage error')) };
      const mockBucket = { file: vi.fn().mockReturnValue(mockFile) };
      (storage.bucket as any).mockReturnValue(mockBucket);

      // Should not throw
      await expect(service.removePetPhoto('pet-1', 'owner-1', 'some/path.jpg')).resolves.toBeUndefined();
    });
  });
});
