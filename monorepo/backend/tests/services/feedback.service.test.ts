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
  createFeedback,
  getUserFeedback,
  listAllFeedback,
  replyToFeedback,
  updateFeedbackStatus,
  toggleTodo,
} from '../../src/modules/feedback/feedback.service';

describe('FeedbackService', () => {
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockCollection = (db.collection as any)('feedback');
  });

  // --- createFeedback ---

  describe('createFeedback', () => {
    it('should create feedback and return the document with id', async () => {
      const feedbackData = {
        userId: 'user-1',
        userDisplayName: 'John Doe',
        userEmail: 'john@example.com',
        type: 'bug',
        message: 'Something is broken',
        status: 'open',
        isTodo: false,
        adminReply: null,
        adminRepliedBy: null,
        adminRepliedAt: null,
        createdAt: 'SERVER_TIMESTAMP',
        updatedAt: 'SERVER_TIMESTAMP',
      };

      const mockDocRef = {
        id: 'new-feedback-id',
        get: vi.fn().mockResolvedValue({
          id: 'new-feedback-id',
          exists: true,
          data: () => feedbackData,
        }),
      };

      mockCollection.add.mockResolvedValue(mockDocRef);

      const result = await createFeedback(
        'user-1',
        'John Doe',
        'john@example.com',
        { type: 'bug', message: 'Something is broken' }
      );

      expect(db.collection).toHaveBeenCalledWith('feedback');
      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user-1',
          userDisplayName: 'John Doe',
          userEmail: 'john@example.com',
          type: 'bug',
          message: 'Something is broken',
          status: 'open',
          isTodo: false,
          adminReply: null,
          adminRepliedBy: null,
          adminRepliedAt: null,
          createdAt: 'SERVER_TIMESTAMP',
          updatedAt: 'SERVER_TIMESTAMP',
        })
      );
      expect(result).toEqual({ id: 'new-feedback-id', ...feedbackData });
    });
  });

  // --- getUserFeedback ---

  describe('getUserFeedback', () => {
    it('should return paginated feedback for a user', async () => {
      const mockDocs = [
        { id: 'fb-1', userId: 'user-1', type: 'bug', message: 'Bug 1', status: 'open' },
        { id: 'fb-2', userId: 'user-1', type: 'suggestion', message: 'Idea 1', status: 'open' },
      ];

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 5 }) }),
      });

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 2,
        docs: mockDocs.map((d) => ({
          id: d.id,
          data: () => d,
          ref: { id: d.id },
        })),
      });

      const result = await getUserFeedback('user-1', 1, 2);

      expect(mockCollection.where).toHaveBeenCalledWith('userId', '==', 'user-1');
      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(2);

      expect(result.data).toHaveLength(2);
      expect(result.data[0]).toEqual({ id: 'fb-1', ...mockDocs[0] });
      expect(result.pagination).toEqual({
        page: 1,
        limit: 2,
        total: 5,
        totalPages: 3,
        hasNext: true,
      });
    });

    it('should calculate offset correctly for page 2', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 10 }) }),
      });

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 3,
        docs: [
          { id: 'fb-4', data: () => ({ message: 'msg4' }), ref: { id: 'fb-4' } },
          { id: 'fb-5', data: () => ({ message: 'msg5' }), ref: { id: 'fb-5' } },
          { id: 'fb-6', data: () => ({ message: 'msg6' }), ref: { id: 'fb-6' } },
        ],
      });

      const result = await getUserFeedback('user-1', 2, 3);

      expect(mockCollection.offset).toHaveBeenCalledWith(3);
      expect(mockCollection.limit).toHaveBeenCalledWith(3);
      expect(result.pagination).toEqual({
        page: 2,
        limit: 3,
        total: 10,
        totalPages: 4,
        hasNext: true,
      });
    });

    it('should report hasNext false on last page', async () => {
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 4 }) }),
      });

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-4', data: () => ({ message: 'last' }), ref: { id: 'fb-4' } },
        ],
      });

      const result = await getUserFeedback('user-1', 2, 3);

      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.totalPages).toBe(2);
    });
  });

  // --- listAllFeedback ---

  describe('listAllFeedback', () => {
    it('should list feedback without filters', async () => {
      const mockDocs = [
        { id: 'fb-1', type: 'bug', status: 'open', message: 'Bug' },
        { id: 'fb-2', type: 'suggestion', status: 'open', message: 'Idea' },
      ];

      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 2,
        docs: mockDocs.map((d) => ({
          id: d.id,
          data: () => d,
          ref: { id: d.id },
        })),
      });

      const result = await listAllFeedback({ page: 1, limit: 10 });

      expect(mockCollection.orderBy).toHaveBeenCalledWith('createdAt', 'desc');
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(10);
      expect(result.data).toHaveLength(2);
      // size (2) < limit (10), so total = offset + data.length = 0 + 2 = 2
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.hasNext).toBe(false);
    });

    it('should filter by status', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-1', data: () => ({ status: 'closed' }), ref: { id: 'fb-1' } },
        ],
      });

      await listAllFeedback({ page: 1, limit: 10, status: 'closed' });

      expect(mockCollection.where).toHaveBeenCalledWith('status', '==', 'closed');
    });

    it('should filter by type', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-1', data: () => ({ type: 'bug' }), ref: { id: 'fb-1' } },
        ],
      });

      await listAllFeedback({ page: 1, limit: 10, type: 'bug' });

      expect(mockCollection.where).toHaveBeenCalledWith('type', '==', 'bug');
    });

    it('should filter by isTodo true', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-1', data: () => ({ isTodo: true }), ref: { id: 'fb-1' } },
        ],
      });

      await listAllFeedback({ page: 1, limit: 10, isTodo: 'true' });

      expect(mockCollection.where).toHaveBeenCalledWith('isTodo', '==', true);
    });

    it('should filter by isTodo false', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-1', data: () => ({ isTodo: false }), ref: { id: 'fb-1' } },
        ],
      });

      await listAllFeedback({ page: 1, limit: 10, isTodo: 'false' });

      expect(mockCollection.where).toHaveBeenCalledWith('isTodo', '==', false);
    });

    it('should filter by date range', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 1,
        docs: [
          { id: 'fb-1', data: () => ({ createdAt: new Date('2024-06-15') }), ref: { id: 'fb-1' } },
        ],
      });

      await listAllFeedback({
        page: 1,
        limit: 10,
        dateFrom: '2024-06-01',
        dateTo: '2024-06-30',
      });

      expect(mockCollection.where).toHaveBeenCalledWith('createdAt', '>=', new Date('2024-06-01'));
      expect(mockCollection.where).toHaveBeenCalledWith('createdAt', '<=', new Date('2024-06-30'));
    });

    it('should use count query when snapshot.size equals limit', async () => {
      // When size === limit, it tries to get a count
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 5,
        docs: Array.from({ length: 5 }, (_, i) => ({
          id: `fb-${i}`,
          data: () => ({ message: `msg-${i}` }),
          ref: { id: `fb-${i}` },
        })),
      });

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 20 }) }),
      });

      const result = await listAllFeedback({ page: 1, limit: 5 });

      expect(result.pagination.total).toBe(20);
      expect(result.pagination.totalPages).toBe(4);
      expect(result.pagination.hasNext).toBe(true);
    });

    it('should fallback total when count query fails', async () => {
      // size === limit triggers count, but count throws
      mockCollection.get.mockResolvedValue({
        empty: false,
        size: 5,
        docs: Array.from({ length: 5 }, (_, i) => ({
          id: `fb-${i}`,
          data: () => ({ message: `msg-${i}` }),
          ref: { id: `fb-${i}` },
        })),
      });

      mockCollection.count.mockReturnValue({
        get: vi.fn().mockRejectedValue(new Error('Count not supported')),
      });

      const result = await listAllFeedback({ page: 1, limit: 5 });

      // Fallback: total = offset + data.length + 1 = 0 + 5 + 1 = 6
      expect(result.pagination.total).toBe(6);
      expect(result.pagination.hasNext).toBe(true);
    });

    it('should use in-memory fallback when main query throws', async () => {
      const allDocs = [
        { id: 'fb-1', status: 'open', type: 'bug', isTodo: true, message: 'A' },
        { id: 'fb-2', status: 'closed', type: 'suggestion', isTodo: false, message: 'B' },
        { id: 'fb-3', status: 'open', type: 'bug', isTodo: false, message: 'C' },
      ];

      // First call (the query with filters) throws
      // Second call (the fallback orderBy('createdAt','desc').get()) succeeds
      let callCount = 0;
      mockCollection.get.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Firestore composite index required');
        }
        return Promise.resolve({
          empty: false,
          size: 3,
          docs: allDocs.map((d) => ({
            id: d.id,
            data: () => d,
            ref: { id: d.id },
          })),
        });
      });

      const result = await listAllFeedback({ page: 1, limit: 10, status: 'open' });

      // In-memory filter: only 'open' docs
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe('fb-1');
      expect(result.data[1].id).toBe('fb-3');
      expect(result.pagination.total).toBe(2);
    });

    it('should filter by type in fallback path', async () => {
      const allDocs = [
        { id: 'fb-1', status: 'open', type: 'bug', isTodo: false, message: 'A' },
        { id: 'fb-2', status: 'open', type: 'suggestion', isTodo: false, message: 'B' },
      ];

      let callCount = 0;
      mockCollection.get.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Index error');
        }
        return Promise.resolve({
          empty: false,
          size: 2,
          docs: allDocs.map((d) => ({
            id: d.id,
            data: () => d,
            ref: { id: d.id },
          })),
        });
      });

      const result = await listAllFeedback({ page: 1, limit: 10, type: 'suggestion' });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('fb-2');
    });

    it('should filter by isTodo true in fallback path', async () => {
      const allDocs = [
        { id: 'fb-1', isTodo: true, status: 'open', type: 'bug', message: 'A' },
        { id: 'fb-2', isTodo: false, status: 'open', type: 'bug', message: 'B' },
      ];

      let callCount = 0;
      mockCollection.get.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Index error');
        }
        return Promise.resolve({
          empty: false,
          size: 2,
          docs: allDocs.map((d) => ({
            id: d.id,
            data: () => d,
            ref: { id: d.id },
          })),
        });
      });

      const result = await listAllFeedback({ page: 1, limit: 10, isTodo: 'true' });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('fb-1');
    });

    it('should filter by isTodo false in fallback path', async () => {
      const allDocs = [
        { id: 'fb-1', isTodo: true, status: 'open', type: 'bug', message: 'A' },
        { id: 'fb-2', isTodo: false, status: 'open', type: 'bug', message: 'B' },
      ];

      let callCount = 0;
      mockCollection.get.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Index error');
        }
        return Promise.resolve({
          empty: false,
          size: 2,
          docs: allDocs.map((d) => ({
            id: d.id,
            data: () => d,
            ref: { id: d.id },
          })),
        });
      });

      const result = await listAllFeedback({ page: 1, limit: 10, isTodo: 'false' });

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('fb-2');
    });

    it('should paginate correctly in fallback path', async () => {
      const allDocs = Array.from({ length: 5 }, (_, i) => ({
        id: `fb-${i}`,
        status: 'open',
        type: 'bug',
        isTodo: false,
        message: `msg-${i}`,
      }));

      let callCount = 0;
      mockCollection.get.mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          throw new Error('Index error');
        }
        return Promise.resolve({
          empty: false,
          size: 5,
          docs: allDocs.map((d) => ({
            id: d.id,
            data: () => d,
            ref: { id: d.id },
          })),
        });
      });

      const result = await listAllFeedback({ page: 2, limit: 2 });

      // offset = (2-1)*2 = 2, slice(2, 4)
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe('fb-2');
      expect(result.data[1].id).toBe('fb-3');
      expect(result.pagination.total).toBe(5);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.hasNext).toBe(true);
    });
  });

  // --- replyToFeedback ---

  describe('replyToFeedback', () => {
    it('should reply to existing feedback', async () => {
      const originalData = {
        userId: 'user-1',
        type: 'bug',
        message: 'Bug report',
        status: 'open',
      };

      const updatedData = {
        ...originalData,
        status: 'replied',
        adminReply: 'We fixed it!',
        adminRepliedBy: 'admin@example.com',
        adminRepliedAt: 'SERVER_TIMESTAMP',
        updatedAt: 'SERVER_TIMESTAMP',
      };

      let getCallCount = 0;
      mockCollection.get.mockImplementation(() => {
        getCallCount++;
        if (getCallCount === 1) {
          // First call: check existence
          return Promise.resolve({
            exists: true,
            id: 'fb-123',
            data: () => originalData,
          });
        }
        // Second call: return updated doc
        return Promise.resolve({
          exists: true,
          id: 'fb-123',
          data: () => updatedData,
        });
      });

      const result = await replyToFeedback('fb-123', 'We fixed it!', 'admin@example.com');

      expect(mockCollection.doc).toHaveBeenCalledWith('fb-123');
      expect(mockCollection.update).toHaveBeenCalledWith({
        adminReply: 'We fixed it!',
        adminRepliedBy: 'admin@example.com',
        adminRepliedAt: 'SERVER_TIMESTAMP',
        status: 'replied',
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'fb-123', ...updatedData });
    });

    it('should throw 404 if feedback not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'fb-999',
        data: () => null,
      });

      await expect(
        replyToFeedback('fb-999', 'Reply', 'admin@example.com')
      ).rejects.toEqual({ statusCode: 404, message: 'Feedback not found' });
    });
  });

  // --- updateFeedbackStatus ---

  describe('updateFeedbackStatus', () => {
    it('should update status of existing feedback', async () => {
      const updatedData = {
        userId: 'user-1',
        type: 'bug',
        message: 'Bug',
        status: 'closed',
        updatedAt: 'SERVER_TIMESTAMP',
      };

      let getCallCount = 0;
      mockCollection.get.mockImplementation(() => {
        getCallCount++;
        if (getCallCount === 1) {
          return Promise.resolve({
            exists: true,
            id: 'fb-100',
            data: () => ({ status: 'open' }),
          });
        }
        return Promise.resolve({
          exists: true,
          id: 'fb-100',
          data: () => updatedData,
        });
      });

      const result = await updateFeedbackStatus('fb-100', 'closed');

      expect(mockCollection.doc).toHaveBeenCalledWith('fb-100');
      expect(mockCollection.update).toHaveBeenCalledWith({
        status: 'closed',
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'fb-100', ...updatedData });
    });

    it('should throw 404 if feedback not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'fb-missing',
        data: () => null,
      });

      await expect(
        updateFeedbackStatus('fb-missing', 'closed')
      ).rejects.toEqual({ statusCode: 404, message: 'Feedback not found' });
    });
  });

  // --- toggleTodo ---

  describe('toggleTodo', () => {
    it('should set isTodo to true', async () => {
      const updatedData = { isTodo: true, updatedAt: 'SERVER_TIMESTAMP' };

      let getCallCount = 0;
      mockCollection.get.mockImplementation(() => {
        getCallCount++;
        if (getCallCount === 1) {
          return Promise.resolve({
            exists: true,
            id: 'fb-200',
            data: () => ({ isTodo: false }),
          });
        }
        return Promise.resolve({
          exists: true,
          id: 'fb-200',
          data: () => updatedData,
        });
      });

      const result = await toggleTodo('fb-200', true);

      expect(mockCollection.doc).toHaveBeenCalledWith('fb-200');
      expect(mockCollection.update).toHaveBeenCalledWith({
        isTodo: true,
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'fb-200', ...updatedData });
    });

    it('should set isTodo to false', async () => {
      const updatedData = { isTodo: false, updatedAt: 'SERVER_TIMESTAMP' };

      let getCallCount = 0;
      mockCollection.get.mockImplementation(() => {
        getCallCount++;
        if (getCallCount === 1) {
          return Promise.resolve({
            exists: true,
            id: 'fb-201',
            data: () => ({ isTodo: true }),
          });
        }
        return Promise.resolve({
          exists: true,
          id: 'fb-201',
          data: () => updatedData,
        });
      });

      const result = await toggleTodo('fb-201', false);

      expect(mockCollection.update).toHaveBeenCalledWith({
        isTodo: false,
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'fb-201', ...updatedData });
    });

    it('should throw 404 if feedback not found', async () => {
      mockCollection.get.mockResolvedValue({
        exists: false,
        id: 'fb-ghost',
        data: () => null,
      });

      await expect(
        toggleTodo('fb-ghost', true)
      ).rejects.toEqual({ statusCode: 404, message: 'Feedback not found' });
    });
  });
});
