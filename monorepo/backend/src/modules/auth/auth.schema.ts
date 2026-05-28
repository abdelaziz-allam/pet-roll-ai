import { z } from 'zod';

export const registerSchema = z.object({
  displayName: z.string().min(2).max(50),
  phone: z.string().optional(),
  timezone: z.string().default('UTC'),
  country: z.string().max(100).optional(),
  city: z.string().max(100).optional(),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  phone: z.string().optional(),
  timezone: z.string().optional(),
  country: z.string().max(100).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  avatar: z.string().url().optional(),
  settings: z.object({
    notifications: z.boolean().optional(),
    language: z.string().optional(),
    theme: z.enum(['light', 'dark']).optional(),
  }).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
