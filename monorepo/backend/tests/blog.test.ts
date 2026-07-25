import { describe, it, expect, vi } from 'vitest';
import { createBlogPostSchema, updateBlogPostSchema } from '../src/modules/blog/blog.schema';

vi.mock('../src/config/env', () => ({
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

describe('Blog Module', () => {
  describe('createBlogPostSchema', () => {
    it('should validate a valid blog post', () => {
      const input = {
        title: 'How to Care for Your Dog',
        content: '<p>Taking care of your dog requires attention to nutrition...</p>',
        isPublished: true,
      };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should require title', () => {
      const input = { content: 'Some content' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should require content', () => {
      const input = { title: 'A Title' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty title', () => {
      const input = { title: '', content: 'Some content' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject empty content', () => {
      const input = { title: 'A Title', content: '' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject title longer than 500 chars', () => {
      const input = { title: 'A'.repeat(501), content: 'Some content' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject excerpt longer than 500 chars', () => {
      const input = { title: 'Title', content: 'Content', excerpt: 'A'.repeat(501) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject metaTitle longer than 60 chars', () => {
      const input = { title: 'Title', content: 'Content', metaTitle: 'A'.repeat(61) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should reject metaDescription longer than 160 chars', () => {
      const input = { title: 'Title', content: 'Content', metaDescription: 'A'.repeat(161) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should default isPublished to false', () => {
      const input = { title: 'Title', content: 'Content' };
      const result = createBlogPostSchema.parse(input);
      expect(result.isPublished).toBe(false);
    });

    it('should default isFeatured to false', () => {
      const input = { title: 'Title', content: 'Content' };
      const result = createBlogPostSchema.parse(input);
      expect(result.isFeatured).toBe(false);
    });

    it('should accept optional slug', () => {
      const input = { title: 'Title', content: 'Content', slug: 'my-custom-slug' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
      expect(result.data!.slug).toBe('my-custom-slug');
    });

    it('should reject slug longer than 200 chars', () => {
      const input = { title: 'Title', content: 'Content', slug: 'a'.repeat(201) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept optional tags', () => {
      const input = { title: 'Title', content: 'Content', tags: 'health, dogs, care' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject tags longer than 500 chars', () => {
      const input = { title: 'Title', content: 'Content', tags: 'a'.repeat(501) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    it('should accept coverImageUrl', () => {
      const input = { title: 'Title', content: 'Content', coverImageUrl: 'https://storage.googleapis.com/bucket/image.jpg' };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    it('should reject coverImageUrl longer than 1000 chars', () => {
      const input = { title: 'Title', content: 'Content', coverImageUrl: 'https://example.com/' + 'a'.repeat(1000) };
      const result = createBlogPostSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('updateBlogPostSchema', () => {
    it('should allow partial update with only title', () => {
      const result = updateBlogPostSchema.safeParse({ title: 'New Title' });
      expect(result.success).toBe(true);
    });

    it('should allow partial update with only isPublished', () => {
      const result = updateBlogPostSchema.safeParse({ isPublished: true });
      expect(result.success).toBe(true);
    });

    it('should allow empty object (no changes)', () => {
      const result = updateBlogPostSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it('should still validate field constraints on partial update', () => {
      const result = updateBlogPostSchema.safeParse({ title: '' });
      expect(result.success).toBe(false);
    });
  });
});
