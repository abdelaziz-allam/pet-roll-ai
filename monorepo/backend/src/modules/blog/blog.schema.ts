import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().max(200).optional(),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  coverImageUrl: z.string().max(1000).optional(),
  tags: z.string().max(500).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export const updateBlogPostSchema = createBlogPostSchema.partial();

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;
export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
