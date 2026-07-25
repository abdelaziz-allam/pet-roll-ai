import { describe, it, expect, vi, beforeEach } from 'vitest';
import { db } from '../../src/config/firebase';

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

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    arrayUnion: vi.fn((...args) => ({ _arrayUnion: args })),
    arrayRemove: vi.fn((...args) => ({ _arrayRemove: args })),
    increment: vi.fn((n) => ({ _increment: n })),
    delete: vi.fn(() => ({ _delete: true })),
  },
}));

import {
  createTip,
  updateTip,
  deleteTip,
  listTips,
  getDailyTip,
  getTipById,
} from '../../src/modules/tips/tips.service';

describe('TipsService', () => {
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = (db.collection as any)('tips');
  });

  // --- createTip ---

  describe('createTip', () => {
    it('should create a tip and return it with id', async () => {
      const mockDocData = {
        title: 'Hydration Tip',
        body: 'Keep fresh water available',
        category: 'health',
        species: ['dog', 'cat'],
        active: true,
        createdBy: 'admin-1',
        createdAt: 'SERVER_TIMESTAMP',
        updatedAt: 'SERVER_TIMESTAMP',
      };

      mockCollection.add.mockResolvedValue({
        id: 'tip-1',
        get: vi.fn().mockResolvedValue({
          id: 'tip-1',
          data: () => mockDocData,
        }),
      });

      const input = {
        title: 'Hydration Tip',
        body: 'Keep fresh water available',
        category: 'health',
        species: ['dog', 'cat'],
        active: true,
      };

      const result = await createTip(input, 'admin-1');

      expect(result.id).toBe('tip-1');
      expect(result.title).toBe('Hydration Tip');
      expect(result.createdBy).toBe('admin-1');
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Hydration Tip',
          body: 'Keep fresh water available',
          category: 'health',
          species: ['dog', 'cat'],
          active: true,
          createdBy: 'admin-1',
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });
  });

  // --- updateTip ---

  describe('updateTip', () => {
    it('should update tip and return updated data', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'tip-1',
          data: () => ({ title: 'Old Title', body: 'Old body', category: 'health' }),
        })
        .mockResolvedValueOnce({
          exists: true,
          id: 'tip-1',
          data: () => ({ title: 'New Title', body: 'Old body', category: 'health', updatedAt: 'SERVER_TIMESTAMP' }),
        });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await updateTip('tip-1', { title: 'New Title' });

      expect(result.id).toBe('tip-1');
      expect(result.title).toBe('New Title');
      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Title',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should throw 404 if tip not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'missing',
        data: () => null,
      });

      await expect(updateTip('missing', { title: 'X' })).rejects.toMatchObject({
        statusCode: 404,
        message: 'Tip not found',
      });
    });
  });

  // --- deleteTip ---

  describe('deleteTip', () => {
    it('should delete tip and return success message', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'tip-1',
        data: () => ({ title: 'Some Tip' }),
      });
      mockCollection.delete.mockResolvedValue(undefined);

      const result = await deleteTip('tip-1');

      expect(result).toEqual({ message: 'Tip deleted' });
      expect(mockCollection.delete).toHaveBeenCalled();
    });

    it('should throw 404 if tip not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'missing',
        data: () => null,
      });

      await expect(deleteTip('missing')).rejects.toMatchObject({
        statusCode: 404,
        message: 'Tip not found',
      });
    });
  });

  // --- listTips ---

  describe('listTips', () => {
    it('should list tips without filters', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 25 }) }),
      });
      mockCollection.get.mockResolvedValue({
        docs: [
          { id: 'tip-1', data: () => ({ title: 'Tip 1', category: 'health' }) },
          { id: 'tip-2', data: () => ({ title: 'Tip 2', category: 'nutrition' }) },
        ],
      });

      const result = await listTips({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: 'tip-1', title: 'Tip 1', category: 'health' });
      expect(result.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 25,
        totalPages: 3,
        hasNext: true,
      });
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(10);
    });

    it('should filter by category', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
      });
      mockCollection.get.mockResolvedValue({
        docs: [
          { id: 'tip-1', data: () => ({ title: 'Health Tip', category: 'health' }) },
        ],
      });

      const result = await listTips({ page: 1, limit: 10, category: 'health' });

      expect(mockCollection.where).toHaveBeenCalledWith('category', '==', 'health');
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(5);
    });

    it('should filter by active status', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 10 }) }),
      });
      mockCollection.get.mockResolvedValue({
        docs: [
          { id: 'tip-1', data: () => ({ title: 'Active Tip', active: true }) },
        ],
      });

      const result = await listTips({ page: 1, limit: 10, active: 'true' });

      expect(mockCollection.where).toHaveBeenCalledWith('active', '==', true);
      expect(result.data).toHaveLength(1);
    });

    it('should filter by active=false correctly', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 3 }) }),
      });
      mockCollection.get.mockResolvedValue({
        docs: [],
      });

      await listTips({ page: 1, limit: 10, active: 'false' });

      expect(mockCollection.where).toHaveBeenCalledWith('active', '==', false);
    });

    it('should calculate correct offset for page 3', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }),
      });
      mockCollection.get.mockResolvedValue({ docs: [] });

      await listTips({ page: 3, limit: 10 });

      expect(mockCollection.offset).toHaveBeenCalledWith(20);
    });

    it('should set hasNext to false on last page', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 10 }) }),
      });
      mockCollection.get.mockResolvedValue({ docs: [] });

      const result = await listTips({ page: 1, limit: 10 });

      expect(result.pagination.hasNext).toBe(false);
    });
  });

  // --- getDailyTip ---

  describe('getDailyTip', () => {
    it('should return a tip matching species', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'tip-1', data: () => ({ title: 'Dog Tip 1', species: ['dog'] }) },
          { id: 'tip-2', data: () => ({ title: 'Dog Tip 2', species: ['dog'] }) },
        ],
      });

      const result = await getDailyTip('dog');

      expect(mockCollection.where).toHaveBeenCalledWith('active', '==', true);
      expect(mockCollection.where).toHaveBeenCalledWith('species', 'array-contains', 'dog');
      expect(result.id).toMatch(/^tip-/);
      expect(result.title).toMatch(/^Dog Tip/);
    });

    it('should return a tip without species filter', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [
          { id: 'tip-1', data: () => ({ title: 'General Tip', category: 'general' }) },
        ],
      });

      const result = await getDailyTip();

      expect(mockCollection.where).toHaveBeenCalledWith('active', '==', true);
      expect(result.id).toBe('tip-1');
      expect(result.title).toBe('General Tip');
    });

    it('should fallback to all active tips when no species match', async () => {
      // First query (with species filter) returns empty
      mockCollection.get
        .mockResolvedValueOnce({
          empty: true,
          docs: [],
        })
        // Fallback query returns active tips
        .mockResolvedValueOnce({
          empty: false,
          docs: [
            { id: 'fallback-1', data: () => ({ title: 'Fallback Tip', category: 'general' }) },
          ],
        });

      const result = await getDailyTip('exotic');

      expect(result.id).toBe('fallback-1');
      expect(result.title).toBe('Fallback Tip');
    });

    it('should return default tip when no tips exist at all', async () => {
      // First query returns empty
      mockCollection.get
        .mockResolvedValueOnce({
          empty: true,
          docs: [],
        })
        // Fallback query also returns empty
        .mockResolvedValueOnce({
          empty: true,
          docs: [],
        });

      const result = await getDailyTip('bird');

      expect(result).toEqual({
        id: '',
        title: 'Daily Tip',
        body: 'Keep your pet happy and healthy!',
        category: 'general',
      });
    });

    it('should select tip based on day index', async () => {
      const docs = [
        { id: 'tip-0', data: () => ({ title: 'Tip 0' }) },
        { id: 'tip-1', data: () => ({ title: 'Tip 1' }) },
        { id: 'tip-2', data: () => ({ title: 'Tip 2' }) },
      ];
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs,
      });

      const dayIndex = Math.floor(Date.now() / 86400000) % docs.length;
      const result = await getDailyTip();

      expect(result.id).toBe(`tip-${dayIndex}`);
    });
  });

  // --- getTipById ---

  describe('getTipById', () => {
    it('should return tip by id', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'tip-1',
        data: () => ({ title: 'Great Tip', body: 'Tip body', category: 'health', active: true }),
      });

      const result = await getTipById('tip-1');

      expect(result).toEqual({
        id: 'tip-1',
        title: 'Great Tip',
        body: 'Tip body',
        category: 'health',
        active: true,
      });
      expect(mockCollection.doc).toHaveBeenCalledWith('tip-1');
    });

    it('should throw 404 if tip not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'missing',
        data: () => null,
      });

      await expect(getTipById('missing')).rejects.toMatchObject({
        statusCode: 404,
        message: 'Tip not found',
      });
    });
  });
});
