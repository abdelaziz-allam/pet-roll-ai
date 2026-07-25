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

vi.mock('../../src/services/email.service', () => ({
  emailService: {
    sendMatchWeddingCard: vi.fn().mockResolvedValue(undefined),
    buildWeddingCardTemplate: vi.fn().mockReturnValue('<html>card</html>'),
  },
}));

function createMockCollection() {
  const mock: any = {
    doc: vi.fn().mockReturnThis(),
    add: vi.fn().mockResolvedValue({ id: 'new-doc-id' }),
    get: vi.fn().mockResolvedValue({ exists: true, id: 'mock-id', data: () => ({}), docs: [], empty: true }),
    set: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    count: vi.fn().mockReturnValue({
      get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
    }),
  };
  return mock;
}

describe('MatingService', () => {
  let service: any;
  let listingsCol: any;
  let requestsCol: any;
  let petsCol: any;
  let usersCol: any;
  let healthRecordsCol: any;
  let vaccinationsCol: any;
  let weddingCardsCol: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    listingsCol = createMockCollection();
    requestsCol = createMockCollection();
    petsCol = createMockCollection();
    usersCol = createMockCollection();
    healthRecordsCol = createMockCollection();
    vaccinationsCol = createMockCollection();
    weddingCardsCol = createMockCollection();

    vi.mocked(db.collection).mockImplementation((name: string) => {
      switch (name) {
        case 'mating_listings': return listingsCol;
        case 'mating_requests': return requestsCol;
        case 'pets': return petsCol;
        case 'users': return usersCol;
        case 'health_records': return healthRecordsCol;
        case 'vaccinations': return vaccinationsCol;
        case 'wedding_cards': return weddingCardsCol;
        default: return createMockCollection();
      }
    });

    const { MatingService } = await import('../../src/modules/mating/mating.service');
    service = new MatingService();
  });

  // --- createListing ---

  describe('createListing', () => {
    it('should create listing with provided petName', async () => {
      listingsCol.add.mockResolvedValue({ id: 'listing-1' });

      const result = await service.createListing('owner-1', {
        petName: 'Buddy',
        species: 'dog',
        breed: 'Labrador',
      });

      expect(listingsCol.add).toHaveBeenCalledWith(
        expect.objectContaining({
          petName: 'Buddy',
          ownerId: 'owner-1',
          status: 'active',
          viewCount: 0,
          species: 'dog',
          breed: 'Labrador',
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.id).toBe('listing-1');
      expect(result.petName).toBe('Buddy');
    });

    it('should look up petName from petId when petName not provided', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ name: 'Rex' }) }),
      });
      listingsCol.add.mockResolvedValue({ id: 'listing-2' });

      const result = await service.createListing('owner-1', {
        petId: 'pet-123',
        species: 'dog',
      });

      expect(petsCol.doc).toHaveBeenCalledWith('pet-123');
      expect(result.petName).toBe('Rex');
    });

    it('should set petName to null when petId pet does not exist', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      listingsCol.add.mockResolvedValue({ id: 'listing-3' });

      const result = await service.createListing('owner-1', {
        petId: 'nonexistent-pet',
        species: 'cat',
      });

      expect(result.petName).toBeNull();
    });

    it('should set petName to null when neither petName nor petId provided', async () => {
      listingsCol.add.mockResolvedValue({ id: 'listing-4' });

      const result = await service.createListing('owner-1', { species: 'cat' });

      expect(result.petName).toBeNull();
    });
  });

  // --- getPetProfile ---

  describe('getPetProfile', () => {
    it('should return full pet profile with owner, health records, and vaccinations', async () => {
      const petData = {
        name: 'Buddy',
        species: 'dog',
        breed: 'Labrador',
        gender: 'male',
        dateOfBirth: '2020-01-01',
        weight: 30,
        color: 'golden',
        isNeutered: false,
        isAvailableForMating: true,
        notes: 'Friendly dog',
        photos: ['photo1.jpg'],
        location: { city: 'Cairo' },
        ownerId: 'owner-1',
      };

      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, id: 'pet-1', data: () => petData }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => ({ displayName: 'John', avatar: 'avatar.jpg' }),
        }),
      });
      healthRecordsCol.get.mockResolvedValue({
        docs: [{ id: 'hr-1', data: () => ({ type: 'checkup', date: '2024-01-01' }) }],
      });
      vaccinationsCol.get.mockResolvedValue({
        docs: [{ id: 'v-1', data: () => ({ name: 'Rabies', date: '2024-02-01' }) }],
      });

      const result = await service.getPetProfile('pet-1');

      expect(result.id).toBe('pet-1');
      expect(result.name).toBe('Buddy');
      expect(result.species).toBe('dog');
      expect(result.breed).toBe('Labrador');
      expect(result.gender).toBe('male');
      expect(result.weight).toBe(30);
      expect(result.color).toBe('golden');
      expect(result.isNeutered).toBe(false);
      expect(result.isAvailableForMating).toBe(true);
      expect(result.notes).toBe('Friendly dog');
      expect(result.photos).toEqual(['photo1.jpg']);
      expect(result.location).toEqual({ city: 'Cairo' });
      expect(result.owner).toEqual({ displayName: 'John', avatar: 'avatar.jpg' });
      expect(result.healthRecords).toEqual([{ id: 'hr-1', type: 'checkup', date: '2024-01-01' }]);
      expect(result.vaccinations).toEqual([{ id: 'v-1', name: 'Rabies', date: '2024-02-01' }]);
    });

    it('should throw 404 when pet not found', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.getPetProfile('nonexistent')).rejects.toMatchObject({
        message: 'Pet not found',
        statusCode: 404,
      });
    });

    it('should return Unknown owner when owner doc does not exist', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-gone' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      healthRecordsCol.get.mockResolvedValue({ docs: [] });
      vaccinationsCol.get.mockResolvedValue({ docs: [] });

      const result = await service.getPetProfile('pet-1');

      expect(result.owner).toEqual({ displayName: 'Unknown', avatar: null });
    });

    it('should handle health records error with code 9 gracefully', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-1' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'John', avatar: null }) }),
      });
      const indexError: any = new Error('Index not found');
      indexError.code = 9;
      healthRecordsCol.get.mockRejectedValue(indexError);
      vaccinationsCol.get.mockResolvedValue({ docs: [] });

      const result = await service.getPetProfile('pet-1');

      expect(result.healthRecords).toEqual([]);
    });

    it('should rethrow health records error with non-9 code', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-1' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'John', avatar: null }) }),
      });
      const permError: any = new Error('Permission denied');
      permError.code = 7;
      healthRecordsCol.get.mockRejectedValue(permError);

      await expect(service.getPetProfile('pet-1')).rejects.toMatchObject({
        message: 'Permission denied',
        code: 7,
      });
    });

    it('should handle vaccinations error with code 9 gracefully', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-1' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'John', avatar: null }) }),
      });
      healthRecordsCol.get.mockResolvedValue({ docs: [] });
      const indexError: any = new Error('Index not found');
      indexError.code = 9;
      vaccinationsCol.get.mockRejectedValue(indexError);

      const result = await service.getPetProfile('pet-1');

      expect(result.vaccinations).toEqual([]);
    });

    it('should rethrow vaccinations error with non-9 code', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-1' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'John', avatar: null }) }),
      });
      healthRecordsCol.get.mockResolvedValue({ docs: [] });
      const permError: any = new Error('Permission denied');
      permError.code = 7;
      vaccinationsCol.get.mockRejectedValue(permError);

      await expect(service.getPetProfile('pet-1')).rejects.toMatchObject({
        message: 'Permission denied',
        code: 7,
      });
    });

    it('should return null for optional fields when not present', async () => {
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Buddy', species: 'dog', breed: 'Lab', gender: 'male', dateOfBirth: '2020-01-01', ownerId: 'owner-1' }),
        }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'John', avatar: null }) }),
      });
      healthRecordsCol.get.mockResolvedValue({ docs: [] });
      vaccinationsCol.get.mockResolvedValue({ docs: [] });

      const result = await service.getPetProfile('pet-1');

      expect(result.weight).toBeNull();
      expect(result.color).toBeNull();
      expect(result.isNeutered).toBe(false);
      expect(result.isAvailableForMating).toBe(false);
      expect(result.notes).toBeNull();
      expect(result.photos).toEqual([]);
      expect(result.location).toBeNull();
    });
  });

  // --- browseListings ---

  describe('browseListings', () => {
    it('should return paginated listings without filters', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 25 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [
          { id: 'l-1', data: () => ({ species: 'dog', breed: 'Labrador', ownerId: 'u1' }) },
          { id: 'l-2', data: () => ({ species: 'dog', breed: 'Poodle', ownerId: 'u2' }) },
        ],
      });

      const result = await service.browseListings({}, 1, 20);

      expect(result.total).toBe(25);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(20);
      expect(result.totalPages).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(listingsCol.where).toHaveBeenCalledWith('status', '==', 'active');
    });

    it('should apply species filter', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
      });
      listingsCol.get.mockResolvedValue({ docs: [] });

      await service.browseListings({ species: 'cat' });

      expect(listingsCol.where).toHaveBeenCalledWith('species', '==', 'cat');
    });

    it('should apply city filter', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 3 }) }),
      });
      listingsCol.get.mockResolvedValue({ docs: [] });

      await service.browseListings({ city: 'Cairo' });

      expect(listingsCol.where).toHaveBeenCalledWith('location.city', '==', 'Cairo');
    });

    it('should not apply city filter when city is empty string', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });
      listingsCol.get.mockResolvedValue({ docs: [] });

      await service.browseListings({ city: '   ' });

      // where is called once for status, not for city
      const whereCalls = listingsCol.where.mock.calls;
      const cityCalls = whereCalls.filter((c: any) => c[0] === 'location.city');
      expect(cityCalls).toHaveLength(0);
    });

    it('should sort by breed with exact matches first', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 3 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [
          { id: 'l-1', data: () => ({ breed: 'Golden Retriever', ownerId: 'u1' }) },
          { id: 'l-2', data: () => ({ breed: 'Labrador', ownerId: 'u2' }) },
          { id: 'l-3', data: () => ({ breed: 'labrador', ownerId: 'u3' }) },
        ],
      });

      const result = await service.browseListings({ breed: 'Labrador' });

      // Exact matches (case insensitive) should come first
      expect(result.data[0].id).toBe('l-2');
      expect(result.data[1].id).toBe('l-3');
    });

    it('should sort breed with partial matches after exact matches', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 3 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [
          { id: 'l-1', data: () => ({ breed: 'Poodle', ownerId: 'u1' }) },
          { id: 'l-2', data: () => ({ breed: 'Labradoodle', ownerId: 'u2' }) },
          { id: 'l-3', data: () => ({ breed: 'Lab', ownerId: 'u3' }) },
        ],
      });

      const result = await service.browseListings({ breed: 'Lab' });

      // l-3 is exact match, l-2 is partial match (contains 'lab'), l-1 is no match
      expect(result.data[0].id).toBe('l-3');
      expect(result.data[1].id).toBe('l-2');
      expect(result.data[2].id).toBe('l-1');
    });

    it('should calculate correct offset for pagination', async () => {
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }),
      });
      listingsCol.get.mockResolvedValue({ docs: [] });

      await service.browseListings({}, 3, 10);

      expect(listingsCol.offset).toHaveBeenCalledWith(20);
      expect(listingsCol.limit).toHaveBeenCalledWith(10);
    });
  });

  // --- browseSmartListings ---

  describe('browseSmartListings', () => {
    it('should use mating-available pet for smart matching', async () => {
      // First call: pets where isAvailableForMating
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'dog', breed: 'Labrador', location: { city: 'Cairo' }, ownerId: 'user-1' }) }],
      });
      // browseListings calls
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 2 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [
          { id: 'l-1', data: () => ({ species: 'dog', breed: 'Labrador', ownerId: 'other-user' }) },
        ],
      });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.filters_applied).toEqual({ city: 'Cairo', species: 'dog', breed: 'Labrador' });
    });

    it('should fallback to any pet when no mating-available pet', async () => {
      // First call: no mating-available pets
      petsCol.get.mockResolvedValueOnce({ empty: true, docs: [] });
      // Second call: any pet
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'cat', breed: 'Persian', location: { city: 'Alex' }, ownerId: 'user-1' }) }],
      });
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [{ id: 'l-1', data: () => ({ species: 'cat', breed: 'Persian', ownerId: 'other' }) }],
      });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.filters_applied.species).toBe('cat');
    });

    it('should return empty result when user has no pets at all', async () => {
      petsCol.get.mockResolvedValueOnce({ empty: true, docs: [] });
      petsCol.get.mockResolvedValueOnce({ empty: true, docs: [] });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
      expect(result.filters_applied).toEqual({});
    });

    it('should filter out own listings from results', async () => {
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'dog', breed: 'Lab', location: { city: 'Cairo' }, ownerId: 'user-1' }) }],
      });
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 2 }) }),
      });
      listingsCol.get.mockResolvedValue({
        docs: [
          { id: 'l-1', data: () => ({ species: 'dog', ownerId: 'user-1' }) },
          { id: 'l-2', data: () => ({ species: 'dog', ownerId: 'other-user' }) },
        ],
      });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.data[0].ownerId).toBe('other-user');
    });

    it('should fallback without city when no matches found with city', async () => {
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'dog', breed: 'Lab', location: { city: 'Cairo' }, ownerId: 'user-1' }) }],
      });

      // First browseListings call: with city - returns only own listings
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      listingsCol.get
        .mockResolvedValueOnce({
          docs: [{ id: 'l-own', data: () => ({ species: 'dog', ownerId: 'user-1' }) }],
        })
        // Second browseListings call: without city - returns other user listing
        .mockResolvedValueOnce({
          docs: [{ id: 'l-2', data: () => ({ species: 'dog', breed: 'Lab', ownerId: 'other-user' }) }],
        })
        // Third call if needed
        .mockResolvedValue({ docs: [] });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('l-2');
    });

    it('should fallback to species only when no matches without city', async () => {
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'dog', breed: 'Husky', location: { city: 'Cairo' }, ownerId: 'user-1' }) }],
      });
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      // First call (with city+breed): own listings only
      listingsCol.get
        .mockResolvedValueOnce({
          docs: [{ id: 'l-own', data: () => ({ species: 'dog', ownerId: 'user-1' }) }],
        })
        // Second call (without city, with breed): still no match
        .mockResolvedValueOnce({
          docs: [{ id: 'l-own2', data: () => ({ species: 'dog', ownerId: 'user-1' }) }],
        })
        // Third call (species only): finds match
        .mockResolvedValueOnce({
          docs: [{ id: 'l-match', data: () => ({ species: 'dog', breed: 'Poodle', ownerId: 'other' }) }],
        });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('l-match');
    });

    it('should not fallback without city when pet has no city', async () => {
      petsCol.get.mockResolvedValueOnce({
        empty: false,
        docs: [{ id: 'pet-1', data: () => ({ species: 'dog', breed: 'Lab', ownerId: 'user-1' }) }],
      });
      listingsCol.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });
      // First call: no matches (all own)
      listingsCol.get
        .mockResolvedValueOnce({
          docs: [{ id: 'l-own', data: () => ({ species: 'dog', ownerId: 'user-1' }) }],
        })
        // Skips the city fallback (city is undefined), goes directly to species-only fallback
        .mockResolvedValueOnce({
          docs: [{ id: 'l-match', data: () => ({ species: 'dog', ownerId: 'other' }) }],
        });

      const result = await service.browseSmartListings('user-1');

      expect(result.data).toHaveLength(1);
      expect(result.filters_applied.city).toBeNull();
    });
  });

  // --- getListingById ---

  describe('getListingById', () => {
    it('should return listing and increment view count', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ species: 'dog', breed: 'Lab', status: 'active' }),
        }),
        update: vi.fn().mockResolvedValue(undefined),
      };
      listingsCol.doc.mockReturnValue(mockDocRef);

      const result = await service.getListingById('listing-1');

      expect(result).toEqual({ id: 'listing-1', species: 'dog', breed: 'Lab', status: 'active' });
      expect(mockDocRef.update).toHaveBeenCalledWith({
        viewCount: { _increment: 1 },
      });
    });

    it('should throw 404 when listing not found', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.getListingById('nonexistent')).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });
  });

  // --- updateListing ---

  describe('updateListing', () => {
    it('should update listing owned by the user', async () => {
      const mockDocRef = {
        get: vi.fn()
          .mockResolvedValueOnce({
            exists: true,
            id: 'listing-1',
            data: () => ({ ownerId: 'owner-1', species: 'dog' }),
          })
          .mockResolvedValueOnce({
            exists: true,
            id: 'listing-1',
            data: () => ({ ownerId: 'owner-1', species: 'dog', breed: 'Poodle' }),
          }),
        update: vi.fn().mockResolvedValue(undefined),
      };
      listingsCol.doc.mockReturnValue(mockDocRef);

      const result = await service.updateListing('listing-1', 'owner-1', { breed: 'Poodle' });

      expect(mockDocRef.update).toHaveBeenCalledWith(
        expect.objectContaining({
          breed: 'Poodle',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.id).toBe('listing-1');
      expect(result.breed).toBe('Poodle');
    });

    it('should throw 404 when listing does not exist', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.updateListing('nonexistent', 'owner-1', { breed: 'Lab' })).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });

    it('should throw 404 when owner does not match', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'other-owner' }),
        }),
      });

      await expect(service.updateListing('listing-1', 'wrong-owner', { breed: 'Lab' })).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });
  });

  // --- deleteListing ---

  describe('deleteListing', () => {
    it('should delete listing owned by the user', async () => {
      const mockDocRef = {
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'owner-1' }),
        }),
        delete: vi.fn().mockResolvedValue(undefined),
      };
      listingsCol.doc.mockReturnValue(mockDocRef);

      await service.deleteListing('listing-1', 'owner-1');

      expect(mockDocRef.delete).toHaveBeenCalled();
    });

    it('should throw 404 when listing does not exist', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.deleteListing('nonexistent', 'owner-1')).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });

    it('should throw 404 when owner does not match', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'real-owner' }),
        }),
      });

      await expect(service.deleteListing('listing-1', 'wrong-owner')).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });
  });

  // --- sendRequest ---

  describe('sendRequest', () => {
    it('should create a mating request successfully', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'receiver-1', species: 'dog' }),
        }),
      });
      requestsCol.add.mockResolvedValue({ id: 'req-1' });

      const result = await service.sendRequest('sender-1', {
        listingId: 'listing-1',
        petId: 'pet-1',
        message: 'Interested in mating',
      });

      expect(requestsCol.add).toHaveBeenCalledWith(
        expect.objectContaining({
          listingId: 'listing-1',
          senderId: 'sender-1',
          receiverId: 'receiver-1',
          petId: 'pet-1',
          message: 'Interested in mating',
          status: 'pending',
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result.id).toBe('req-1');
    });

    it('should set message to null when not provided', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'receiver-1' }),
        }),
      });
      requestsCol.add.mockResolvedValue({ id: 'req-1' });

      const result = await service.sendRequest('sender-1', {
        listingId: 'listing-1',
        petId: 'pet-1',
      });

      expect(result.message).toBeNull();
    });

    it('should throw 404 when listing does not exist', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.sendRequest('sender-1', { listingId: 'nonexistent', petId: 'pet-1' })).rejects.toMatchObject({
        message: 'Listing not found',
        statusCode: 404,
      });
    });

    it('should throw 400 when requesting own listing', async () => {
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ ownerId: 'sender-1' }),
        }),
      });

      await expect(service.sendRequest('sender-1', { listingId: 'listing-1', petId: 'pet-1' })).rejects.toMatchObject({
        message: 'Cannot request your own listing',
        statusCode: 400,
      });
    });
  });

  // --- getSentRequests ---

  describe('getSentRequests', () => {
    it('should return enriched sent requests', async () => {
      requestsCol.get.mockResolvedValue({
        docs: [{
          id: 'req-1',
          data: () => ({
            listingId: 'listing-1',
            petId: 'pet-1',
            senderId: 'sender-1',
            receiverId: 'receiver-1',
            status: 'pending',
          }),
        }],
      });

      // Enrichment: listing
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-1',
          data: () => ({ petName: 'Buddy', species: 'dog', breed: 'Lab', location: { city: 'Cairo' }, photos: ['p1.jpg'], petId: 'pet-listing' }),
        }),
      });
      // Enrichment: pet
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-1',
          data: () => ({ name: 'Rex', species: 'dog', breed: 'Lab', photos: ['rex.jpg'] }),
        }),
      });
      // Enrichment: sender
      usersCol.doc.mockImplementation((id: string) => ({
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => id === 'sender-1'
            ? { displayName: 'Alice', avatar: 'alice.jpg' }
            : { displayName: 'Bob', avatar: 'bob.jpg' },
        }),
      }));

      const result = await service.getSentRequests('sender-1');

      expect(result).toHaveLength(1);
      expect(result[0].listing).toEqual({
        id: 'listing-1',
        petName: 'Buddy',
        species: 'dog',
        breed: 'Lab',
        location: { city: 'Cairo' },
        photos: ['p1.jpg'],
        petId: 'pet-listing',
      });
      expect(result[0].pet).toEqual({
        id: 'pet-1',
        name: 'Rex',
        species: 'dog',
        breed: 'Lab',
        photos: ['rex.jpg'],
      });
      expect(result[0].sender).toEqual({ displayName: 'Alice', avatar: 'alice.jpg' });
      expect(result[0].receiver).toEqual({ displayName: 'Bob', avatar: 'bob.jpg' });
    });

    it('should handle missing listing in enrichment', async () => {
      requestsCol.get.mockResolvedValue({
        docs: [{
          id: 'req-1',
          data: () => ({
            listingId: 'gone-listing',
            senderId: 'sender-1',
            receiverId: 'receiver-1',
          }),
        }],
      });
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      const result = await service.getSentRequests('sender-1');

      expect(result[0].listing).toBeUndefined();
    });

    it('should handle missing pet in enrichment', async () => {
      requestsCol.get.mockResolvedValue({
        docs: [{
          id: 'req-1',
          data: () => ({
            petId: 'gone-pet',
            senderId: 'sender-1',
            receiverId: 'receiver-1',
          }),
        }],
      });
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      const result = await service.getSentRequests('sender-1');

      expect(result[0].pet).toBeUndefined();
    });
  });

  // --- getReceivedRequests ---

  describe('getReceivedRequests', () => {
    it('should return enriched received requests', async () => {
      requestsCol.get.mockResolvedValue({
        docs: [{
          id: 'req-2',
          data: () => ({
            listingId: 'listing-2',
            petId: 'pet-2',
            senderId: 'sender-2',
            receiverId: 'receiver-2',
            status: 'pending',
          }),
        }],
      });
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'listing-2',
          data: () => ({ name: 'Whiskers', species: 'cat', breed: 'Persian', location: null, photos: [], petId: null }),
        }),
      });
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'pet-2',
          data: () => ({ name: 'Felix', species: 'cat', breed: 'Siamese', photos: [] }),
        }),
      });
      usersCol.doc.mockImplementation((id: string) => ({
        get: vi.fn().mockResolvedValue({
          exists: true,
          data: () => id === 'sender-2'
            ? { displayName: 'Charlie', avatar: null }
            : { displayName: 'Diana', avatar: 'diana.jpg' },
        }),
      }));

      const result = await service.getReceivedRequests('receiver-2');

      expect(result).toHaveLength(1);
      expect(result[0].listing.petName).toBe('Whiskers');
      expect(result[0].pet.name).toBe('Felix');
      expect(result[0].sender.displayName).toBe('Charlie');
      expect(result[0].receiver.displayName).toBe('Diana');
    });
  });

  // --- respondToRequest ---

  describe('respondToRequest', () => {
    it('should accept a pending request', async () => {
      const mockDocRef = {
        get: vi.fn()
          .mockResolvedValueOnce({
            exists: true,
            id: 'req-1',
            data: () => ({ receiverId: 'receiver-1', senderId: 'sender-1', status: 'pending', listingId: 'listing-1', petId: 'pet-1' }),
          })
          .mockResolvedValueOnce({
            exists: true,
            id: 'req-1',
            data: () => ({ receiverId: 'receiver-1', senderId: 'sender-1', status: 'accepted' }),
          }),
        update: vi.fn().mockResolvedValue(undefined),
      };
      requestsCol.doc.mockReturnValue(mockDocRef);
      // Mock for sendWeddingCard (called via fire-and-forget)
      usersCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ displayName: 'User', email: 'u@e.com' }) }),
      });
      listingsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ species: 'dog' }) }),
      });
      petsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });
      weddingCardsCol.add.mockResolvedValue({ id: 'card-1' });

      const result = await service.respondToRequest('req-1', 'receiver-1', 'accepted');

      expect(mockDocRef.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'accepted',
          respondedAt: expect.any(String),
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result).toEqual({ id: 'req-1', receiverId: 'receiver-1', senderId: 'sender-1', status: 'accepted' });
    });

    it('should reject a pending request without sending wedding card', async () => {
      const mockDocRef = {
        get: vi.fn()
          .mockResolvedValueOnce({
            exists: true,
            id: 'req-1',
            data: () => ({ receiverId: 'receiver-1', status: 'pending' }),
          })
          .mockResolvedValueOnce({
            exists: true,
            id: 'req-1',
            data: () => ({ receiverId: 'receiver-1', status: 'rejected' }),
          }),
        update: vi.fn().mockResolvedValue(undefined),
      };
      requestsCol.doc.mockReturnValue(mockDocRef);

      const result = await service.respondToRequest('req-1', 'receiver-1', 'rejected');

      expect(result.status).toBe('rejected');
      // sendWeddingCard should NOT be called for rejection
      expect(weddingCardsCol.add).not.toHaveBeenCalled();
    });

    it('should throw 404 when request does not exist', async () => {
      requestsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.respondToRequest('nonexistent', 'receiver-1', 'accepted')).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });
    });

    it('should throw 404 when receiver does not match', async () => {
      requestsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'req-1',
          data: () => ({ receiverId: 'actual-receiver', status: 'pending' }),
        }),
      });

      await expect(service.respondToRequest('req-1', 'wrong-receiver', 'accepted')).rejects.toMatchObject({
        message: 'Request not found',
        statusCode: 404,
      });
    });

    it('should throw 400 when request is already responded', async () => {
      requestsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'req-1',
          data: () => ({ receiverId: 'receiver-1', status: 'accepted' }),
        }),
      });

      await expect(service.respondToRequest('req-1', 'receiver-1', 'accepted')).rejects.toMatchObject({
        message: 'Request already responded',
        statusCode: 400,
      });
    });
  });

  // --- getWeddingCards ---

  describe('getWeddingCards', () => {
    it('should return combined and deduplicated cards sorted by createdAt', async () => {
      weddingCardsCol.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'card-1', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 100 } }) },
            { id: 'card-2', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 200 } }) },
          ],
        })
        .mockResolvedValueOnce({
          docs: [
            { id: 'card-2', data: () => ({ receiverId: 'user-1', createdAt: { _seconds: 200 } }) },
            { id: 'card-3', data: () => ({ receiverId: 'user-1', createdAt: { _seconds: 300 } }) },
          ],
        });

      const result = await service.getWeddingCards('user-1');

      expect(result).toHaveLength(3);
      // Sorted descending by _seconds
      expect(result[0].id).toBe('card-3');
      expect(result[1].id).toBe('card-2');
      expect(result[2].id).toBe('card-1');
    });

    it('should deduplicate cards appearing in both sender and receiver queries', async () => {
      weddingCardsCol.get
        .mockResolvedValueOnce({
          docs: [{ id: 'card-dup', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 100 } }) }],
        })
        .mockResolvedValueOnce({
          docs: [{ id: 'card-dup', data: () => ({ receiverId: 'user-1', createdAt: { _seconds: 100 } }) }],
        });

      const result = await service.getWeddingCards('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('card-dup');
    });

    it('should fallback without orderBy when sender query throws code 9', async () => {
      const indexError: any = new Error('Index not found');
      indexError.code = 9;

      // First get (with orderBy) throws code 9
      weddingCardsCol.get
        .mockRejectedValueOnce(indexError)
        // Fallback get (without orderBy) succeeds
        .mockResolvedValueOnce({
          docs: [{ id: 'card-1', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 50 } }) }],
        })
        // Receiver query succeeds normally
        .mockResolvedValueOnce({
          docs: [],
        });

      const result = await service.getWeddingCards('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('card-1');
    });

    it('should fallback without orderBy when receiver query throws code 9', async () => {
      const indexError: any = new Error('Index not found');
      indexError.code = 9;

      // Sender query succeeds
      weddingCardsCol.get
        .mockResolvedValueOnce({
          docs: [{ id: 'card-1', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 50 } }) }],
        })
        // Receiver query with orderBy throws code 9
        .mockRejectedValueOnce(indexError)
        // Fallback receiver query without orderBy succeeds
        .mockResolvedValueOnce({
          docs: [{ id: 'card-2', data: () => ({ receiverId: 'user-1', createdAt: { _seconds: 100 } }) }],
        });

      const result = await service.getWeddingCards('user-1');

      expect(result).toHaveLength(2);
    });

    it('should rethrow non-code-9 errors from sender query', async () => {
      const permError: any = new Error('Permission denied');
      permError.code = 7;

      weddingCardsCol.get.mockRejectedValueOnce(permError);

      await expect(service.getWeddingCards('user-1')).rejects.toMatchObject({
        message: 'Permission denied',
        code: 7,
      });
    });

    it('should rethrow non-code-9 errors from receiver query', async () => {
      const permError: any = new Error('Permission denied');
      permError.code = 7;

      weddingCardsCol.get
        .mockResolvedValueOnce({ docs: [] })
        .mockRejectedValueOnce(permError);

      await expect(service.getWeddingCards('user-1')).rejects.toMatchObject({
        message: 'Permission denied',
        code: 7,
      });
    });

    it('should handle cards with missing createdAt in sort', async () => {
      weddingCardsCol.get
        .mockResolvedValueOnce({
          docs: [
            { id: 'card-no-ts', data: () => ({ senderId: 'user-1' }) },
            { id: 'card-with-ts', data: () => ({ senderId: 'user-1', createdAt: { _seconds: 100 } }) },
          ],
        })
        .mockResolvedValueOnce({ docs: [] });

      const result = await service.getWeddingCards('user-1');

      expect(result).toHaveLength(2);
      // card-with-ts (100) > card-no-ts (0)
      expect(result[0].id).toBe('card-with-ts');
      expect(result[1].id).toBe('card-no-ts');
    });
  });

  // --- getWeddingCard ---

  describe('getWeddingCard', () => {
    it('should return card when user is sender', async () => {
      weddingCardsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'card-1',
          data: () => ({ senderId: 'user-1', receiverId: 'other', matchDate: '2024-01-01' }),
        }),
      });

      const result = await service.getWeddingCard('card-1', 'user-1');

      expect(result).toEqual({ id: 'card-1', senderId: 'user-1', receiverId: 'other', matchDate: '2024-01-01' });
    });

    it('should return card when user is receiver', async () => {
      weddingCardsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'card-1',
          data: () => ({ senderId: 'other', receiverId: 'user-1', matchDate: '2024-01-01' }),
        }),
      });

      const result = await service.getWeddingCard('card-1', 'user-1');

      expect(result).toEqual({ id: 'card-1', senderId: 'other', receiverId: 'user-1', matchDate: '2024-01-01' });
    });

    it('should throw 404 when card does not exist', async () => {
      weddingCardsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({ exists: false, data: () => null }),
      });

      await expect(service.getWeddingCard('nonexistent', 'user-1')).rejects.toMatchObject({
        message: 'Wedding card not found',
        statusCode: 404,
      });
    });

    it('should throw 404 when user is neither sender nor receiver', async () => {
      weddingCardsCol.doc.mockReturnValue({
        get: vi.fn().mockResolvedValue({
          exists: true,
          id: 'card-1',
          data: () => ({ senderId: 'alice', receiverId: 'bob' }),
        }),
      });

      await expect(service.getWeddingCard('card-1', 'intruder')).rejects.toMatchObject({
        message: 'Wedding card not found',
        statusCode: 404,
      });
    });
  });
});
