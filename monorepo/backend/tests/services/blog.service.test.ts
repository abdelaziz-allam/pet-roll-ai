import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BlogService } from '../../src/modules/blog/blog.service';
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

vi.mock('../../src/modules/seo/seo.service', () => ({
  SeoService: vi.fn().mockImplementation(() => ({
    pingSearchEngines: vi.fn().mockResolvedValue(undefined),
  })),
}));

const mockLogger: any = {
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  debug: vi.fn(),
  child: vi.fn().mockReturnThis(),
};

describe('BlogService', () => {
  let service: BlogService;
  let mockCollection: any;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new BlogService(mockLogger);
    mockCollection = (db.collection as any)('blog_posts');
  });

  // --- slugify tests (via create) ---

  describe('slugify (tested via create)', () => {
    beforeEach(() => {
      // Default: slug is unique on first try
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'new-post-id' });
    });

    it('should convert title to lowercase slug', async () => {
      const result = await service.create(
        { title: 'Hello World', content: 'Some content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('hello-world');
    });

    it('should strip HTML tags from slug input', async () => {
      const result = await service.create(
        { title: '<h1>My Post</h1>', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('my-post');
    });

    it('should remove special characters', async () => {
      const result = await service.create(
        { title: 'Hello! @World #2024', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('hello-world-2024');
    });

    it('should collapse multiple hyphens', async () => {
      const result = await service.create(
        { title: 'Hello---World', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('hello---world'.replace(/-+/g, '-'));
    });

    it('should trim leading and trailing hyphens', async () => {
      const result = await service.create(
        { title: '-Hello World-', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('hello-world');
    });

    it('should truncate slugs longer than 80 characters', async () => {
      const longTitle = 'a '.repeat(50); // 100 chars when slugified
      const result = await service.create(
        { title: longTitle, content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug.length).toBeLessThanOrEqual(80);
    });

    it('should return "post" for empty/whitespace-only titles after stripping', async () => {
      const result = await service.create(
        { title: '!!!', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('post');
    });

    it('should use provided slug if specified', async () => {
      const result = await service.create(
        { title: 'My Title', slug: 'custom-slug', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('custom-slug');
    });
  });

  // --- ensureUniqueSlug tests ---

  describe('ensureUniqueSlug (tested via create)', () => {
    it('should append counter when slug already exists', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ empty: false, docs: [{ id: 'existing-id', data: () => ({}) }] }) // first check: slug taken
        .mockResolvedValueOnce({ empty: true, docs: [] }); // second check: slug-2 is free
      mockCollection.add.mockResolvedValue({ id: 'new-post-id' });

      const result = await service.create(
        { title: 'Duplicate Title', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('duplicate-title-2');
    });

    it('should keep incrementing until a unique slug is found', async () => {
      mockCollection.get
        .mockResolvedValueOnce({ empty: false, docs: [{ id: 'id-1', data: () => ({}) }] })
        .mockResolvedValueOnce({ empty: false, docs: [{ id: 'id-2', data: () => ({}) }] })
        .mockResolvedValueOnce({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'new-post-id' });

      const result = await service.create(
        { title: 'Popular', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.slug).toBe('popular-3');
    });
  });

  // --- calculateReadingTime tests ---

  describe('calculateReadingTime (tested via create)', () => {
    beforeEach(() => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'new-id' });
    });

    it('should return 1 for very short content', async () => {
      const result = await service.create(
        { title: 'Short', content: 'Hello world', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.readingTimeMinutes).toBe(1);
    });

    it('should return correct reading time based on 200 wpm', async () => {
      const words = Array(400).fill('word').join(' ');
      const result = await service.create(
        { title: 'Long', content: words, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.readingTimeMinutes).toBe(2);
    });

    it('should strip HTML before counting words', async () => {
      // 250 words wrapped in HTML tags - after stripping, 250 words => ceil(250/200) = 2
      const content = '<p>' + Array(250).fill('word').join(' ') + '</p>';
      const result = await service.create(
        { title: 'HTML', content, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.readingTimeMinutes).toBe(2);
    });

    it('should round up to next minute', async () => {
      const words = Array(201).fill('word').join(' ');
      const result = await service.create(
        { title: 'Ceil', content: words, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.readingTimeMinutes).toBe(2);
    });
  });

  // --- generateExcerpt tests ---

  describe('generateExcerpt (tested via create)', () => {
    beforeEach(() => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'new-id' });
    });

    it('should use full text if <= 155 chars', async () => {
      const content = 'Short text here';
      const result = await service.create(
        { title: 'T', content, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.excerpt).toBe('Short text here');
    });

    it('should truncate at word boundary and add ellipsis for long content', async () => {
      const content = 'word '.repeat(100); // much longer than 155 chars
      const result = await service.create(
        { title: 'T', content, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.excerpt.length).toBeLessThanOrEqual(160);
      expect(result.excerpt).toMatch(/\.\.\.$/);
    });

    it('should use provided excerpt if given', async () => {
      const result = await service.create(
        { title: 'T', content: 'Long content', excerpt: 'Custom excerpt', isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.excerpt).toBe('Custom excerpt');
    });

    it('should strip HTML from content before generating excerpt', async () => {
      const content = '<p><strong>Bold</strong> text here</p>';
      const result = await service.create(
        { title: 'T', content, isPublished: false, isFeatured: false },
        'author-1'
      );
      expect(result.excerpt).toBe('Bold text here');
    });
  });

  // --- create ---

  describe('create', () => {
    beforeEach(() => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.add.mockResolvedValue({ id: 'new-post-id' });
    });

    it('should create a blog post with all required fields', async () => {
      const input = {
        title: 'Test Post',
        content: '<p>This is test content for the blog post.</p>',
        isPublished: false,
        isFeatured: false,
      };

      const result = await service.create(input, 'author-1');

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Post',
          slug: 'test-post',
          content: input.content,
          author: 'author-1',
          isPublished: false,
          isFeatured: false,
          viewCount: 0,
          coverImageUrl: '',
          tags: '',
          metaTitle: '',
          metaDescription: '',
        })
      );
      expect(result.id).toBe('new-post-id');
    });

    it('should set publishedDate when isPublished is true', async () => {
      const result = await service.create(
        { title: 'Published', content: 'Content', isPublished: true, isFeatured: false },
        'author-1'
      );

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          publishedDate: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should set publishedDate to null when isPublished is false', async () => {
      await service.create(
        { title: 'Draft', content: 'Content', isPublished: false, isFeatured: false },
        'author-1'
      );

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          publishedDate: null,
        })
      );
    });

    it('should include optional fields when provided', async () => {
      const input = {
        title: 'Full Post',
        content: 'Content',
        isPublished: true,
        isFeatured: true,
        coverImageUrl: 'https://img.example.com/cover.jpg',
        tags: 'dog,health',
        metaTitle: 'SEO Title',
        metaDescription: 'SEO Description',
      };

      await service.create(input, 'author-1');

      expect(mockCollection.add).toHaveBeenCalledWith(
        expect.objectContaining({
          coverImageUrl: 'https://img.example.com/cover.jpg',
          tags: 'dog,health',
          metaTitle: 'SEO Title',
          metaDescription: 'SEO Description',
          isFeatured: true,
        })
      );
    });

    it('should ping search engines when post is published', async () => {
      const { SeoService } = await import('../../src/modules/seo/seo.service');
      const mockPing = vi.fn();
      (SeoService as any).mockImplementation(() => ({
        pingSearchEngines: mockPing,
      }));

      const freshService = new BlogService(mockLogger);
      const freshCollection = (db.collection as any)('blog_posts');
      freshCollection.get.mockResolvedValue({ empty: true, docs: [] });
      freshCollection.add.mockResolvedValue({ id: 'pub-id' });

      await freshService.create(
        { title: 'Published Post', content: 'Content', isPublished: true, isFeatured: false },
        'author-1'
      );

      expect(mockPing).toHaveBeenCalledWith(['https://petfolioo.com/blog/published-post']);
    });
  });

  // --- update ---

  describe('update', () => {
    it('should throw 404 if blog post not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'missing', data: () => null });

      await expect(service.update('missing-id', { title: 'New' })).rejects.toMatchObject({
        message: 'Blog post not found',
        statusCode: 404,
      });
    });

    it('should update title', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Old Title', slug: 'old-title', isPublished: false }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.update('post-1', { title: 'New Title' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'New Title' })
      );
      expect(result.title).toBe('New Title');
    });

    it('should recalculate reading time and excerpt when content changes', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Title', content: 'old', slug: 'title', isPublished: false }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      const newContent = Array(400).fill('word').join(' ');
      await service.update('post-1', { content: newContent });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          content: newContent,
          readingTimeMinutes: 2,
          excerpt: expect.any(String),
        })
      );
    });

    it('should not override excerpt if explicitly provided', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Title', slug: 'title', isPublished: false }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      await service.update('post-1', { content: 'New content', excerpt: 'Custom excerpt' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ excerpt: 'Custom excerpt' })
      );
    });

    it('should ensure unique slug when updating slug', async () => {
      // First get: fetch existing doc
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'post-1',
          data: () => ({ title: 'Title', slug: 'old-slug', isPublished: false }),
        })
        // Second get: slug uniqueness check - slug belongs to same doc
        .mockResolvedValueOnce({ empty: false, docs: [{ id: 'post-1', data: () => ({}) }] });

      mockCollection.update.mockResolvedValue(undefined);

      await service.update('post-1', { slug: 'new-slug' });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'new-slug' })
      );
    });

    it('should set publishedDate when publishing for first time', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Draft', slug: 'draft', isPublished: false, publishedDate: null }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      await service.update('post-1', { isPublished: true });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          isPublished: true,
          publishedDate: 'SERVER_TIMESTAMP',
        })
      );
    });

    it('should not overwrite publishedDate if already set', async () => {
      const existingDate = new Date('2024-01-01');
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Post', slug: 'post', isPublished: true, publishedDate: existingDate }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      await service.update('post-1', { isPublished: true });

      const updateCall = mockCollection.update.mock.calls[0][0];
      expect(updateCall.publishedDate).toBeUndefined();
    });

    it('should update multiple fields at once', async () => {
      mockCollection.get
        .mockResolvedValueOnce({
          exists: true,
          id: 'post-1',
          data: () => ({ title: 'Old', slug: 'old', isPublished: false }),
        })
        // slug uniqueness check
        .mockResolvedValueOnce({ empty: true, docs: [] });
      mockCollection.update.mockResolvedValue(undefined);

      await service.update('post-1', {
        title: 'New Title',
        slug: 'new-slug',
        tags: 'cats,dogs',
        coverImageUrl: 'https://img.example.com/new.jpg',
        metaTitle: 'New Meta',
        metaDescription: 'New Desc',
        isFeatured: true,
      });

      expect(mockCollection.update).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'New Title',
          slug: 'new-slug',
          tags: 'cats,dogs',
          coverImageUrl: 'https://img.example.com/new.jpg',
          metaTitle: 'New Meta',
          metaDescription: 'New Desc',
          isFeatured: true,
        })
      );
    });
  });

  // --- getAll ---

  describe('getAll', () => {
    it('should return paginated posts', async () => {
      const mockDocs = [
        { id: 'post-1', title: 'Post 1', tags: 'dog', author: 'admin', content: 'full content' },
        { id: 'post-2', title: 'Post 2', tags: 'cat', author: 'admin', content: 'full content' },
      ];
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: mockDocs.map((d) => ({ id: d.id, data: () => d })),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 20 }) }),
      });

      const result = await service.getAll({ page: 1, limit: 10 });

      expect(result.total).toBe(20);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(result.totalPages).toBe(2);
      expect(result.data).toHaveLength(2);
    });

    it('should exclude content from list results', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [{ id: 'p1', data: () => ({ title: 'P', content: 'Full content', tags: '' }) }],
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 1 }) }),
      });

      const result = await service.getAll({});
      expect((result.data[0] as any).content).toBeUndefined();
    });

    it('should filter by publishedOnly', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });

      await service.getAll({ publishedOnly: true });

      expect(mockCollection.where).toHaveBeenCalledWith('isPublished', '==', true);
    });

    it('should filter by search term in title, tags, and author', async () => {
      const mockDocs = [
        { id: '1', title: 'Dog Care Tips', tags: 'health', author: 'admin' },
        { id: '2', title: 'Cat Nutrition', tags: 'food', author: 'admin' },
        { id: '3', title: 'Bird Basics', tags: 'dog', author: 'admin' },
      ];
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: mockDocs.map((d) => ({ id: d.id, data: () => d })),
      });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 3 }) }),
      });

      const result = await service.getAll({ search: 'dog' });

      // Should match "Dog Care Tips" (title) and "Bird Basics" (tags: 'dog')
      expect(result.data.length).toBe(2);
    });

    it('should use default pagination values', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 0 }) }),
      });

      const result = await service.getAll({});

      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
      expect(mockCollection.offset).toHaveBeenCalledWith(0);
      expect(mockCollection.limit).toHaveBeenCalledWith(10);
    });

    it('should calculate correct offset for page 3', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });
      mockCollection.count.mockReturnValue({
        get: vi.fn().mockResolvedValue({ data: () => ({ count: 50 }) }),
      });

      await service.getAll({ page: 3, limit: 5 });

      expect(mockCollection.offset).toHaveBeenCalledWith(10);
      expect(mockCollection.limit).toHaveBeenCalledWith(5);
    });
  });

  // --- getById ---

  describe('getById', () => {
    it('should return a blog post by ID', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Found Post', slug: 'found-post' }),
      });

      const result = await service.getById('post-1');

      expect(result).toEqual({ id: 'post-1', title: 'Found Post', slug: 'found-post' });
    });

    it('should throw 404 if post not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.getById('missing')).rejects.toMatchObject({
        message: 'Blog post not found',
        statusCode: 404,
      });
    });
  });

  // --- getBySlug ---

  describe('getBySlug', () => {
    it('should return a published post by slug', async () => {
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [{ id: 'post-1', data: () => ({ title: 'My Post', slug: 'my-post', isPublished: true }) }],
      });

      const result = await service.getBySlug('my-post');

      expect(result).toEqual({ id: 'post-1', title: 'My Post', slug: 'my-post', isPublished: true });
      expect(mockCollection.where).toHaveBeenCalledWith('slug', '==', 'my-post');
      expect(mockCollection.where).toHaveBeenCalledWith('isPublished', '==', true);
    });

    it('should throw 404 if no published post with slug', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

      await expect(service.getBySlug('nonexistent')).rejects.toMatchObject({
        message: 'Blog post not found',
        statusCode: 404,
      });
    });
  });

  // --- delete ---

  describe('delete', () => {
    it('should delete an existing blog post', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ title: 'Delete Me' }),
      });
      mockCollection.delete.mockResolvedValue(undefined);

      const result = await service.delete('post-1');

      expect(mockCollection.delete).toHaveBeenCalled();
      expect(result).toEqual({ success: true });
    });

    it('should throw 404 if post does not exist', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.delete('missing')).rejects.toMatchObject({
        message: 'Blog post not found',
        statusCode: 404,
      });
    });
  });

  // --- toggleFeatured ---

  describe('toggleFeatured', () => {
    it('should toggle featured from false to true', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ isFeatured: false }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.toggleFeatured('post-1');

      expect(mockCollection.update).toHaveBeenCalledWith({
        isFeatured: true,
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'post-1', isFeatured: true });
    });

    it('should toggle featured from true to false', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({ isFeatured: true }),
      });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.toggleFeatured('post-1');

      expect(mockCollection.update).toHaveBeenCalledWith({
        isFeatured: false,
        updatedAt: 'SERVER_TIMESTAMP',
      });
      expect(result).toEqual({ id: 'post-1', isFeatured: false });
    });

    it('should default isFeatured to false if undefined', async () => {
      mockCollection.get.mockResolvedValue({
        exists: true,
        id: 'post-1',
        data: () => ({}), // no isFeatured field
      });
      mockCollection.update.mockResolvedValue(undefined);

      const result = await service.toggleFeatured('post-1');

      expect(result.isFeatured).toBe(true);
    });

    it('should throw 404 if post not found', async () => {
      mockCollection.get.mockResolvedValue({ exists: false, id: 'x', data: () => null });

      await expect(service.toggleFeatured('missing')).rejects.toMatchObject({
        message: 'Blog post not found',
        statusCode: 404,
      });
    });
  });

  // --- incrementViewCount ---

  describe('incrementViewCount', () => {
    it('should increment view count for published post', async () => {
      const mockRef = { update: vi.fn().mockResolvedValue(undefined) };
      mockCollection.get.mockResolvedValue({
        empty: false,
        docs: [{ id: 'post-1', ref: mockRef, data: () => ({ slug: 'my-post', isPublished: true }) }],
      });

      await service.incrementViewCount('my-post');

      expect(mockRef.update).toHaveBeenCalledWith({ viewCount: { _increment: 1 } });
    });

    it('should do nothing if post not found', async () => {
      mockCollection.get.mockResolvedValue({ empty: true, docs: [] });

      // Should not throw
      await expect(service.incrementViewCount('nonexistent')).resolves.toBeUndefined();
    });
  });

  // --- uploadCoverImage ---

  describe('uploadCoverImage', () => {
    it('should upload image and return public URL', async () => {
      const mockFile = {
        save: vi.fn().mockResolvedValue(undefined),
      };
      const mockBucket = {
        file: vi.fn().mockReturnValue(mockFile),
        name: 'petroll-mvp.appspot.com',
      };
      (storage.bucket as any).mockReturnValue(mockBucket);

      const buffer = Buffer.from('fake-image-data');
      const result = await service.uploadCoverImage(buffer, 'cover.jpg');

      expect(mockBucket.file).toHaveBeenCalledWith(expect.stringMatching(/^blog\/\d+-cover\.jpg$/));
      expect(mockFile.save).toHaveBeenCalledWith(buffer, {
        metadata: { contentType: 'image/jpeg' },
        public: true,
      });
      expect(result).toMatch(/^https:\/\/storage\.googleapis\.com\/petroll-mvp\.appspot\.com\/blog\/\d+-cover\.jpg$/);
    });
  });
});
