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

const email = z.string().trim().email().max(254);

export const passwordRegisterSchema = registerSchema.extend({
  email,
  password: z.string().min(8).max(128),
});

export const passwordLoginSchema = z.object({
  email,
  password: z.string().min(1).max(128),
});

// Profile fields are only used when the sign-in creates the account.
export const googleSignInSchema = registerSchema.partial().extend({
  idToken: z.string().min(1).max(8192),
});

export const appleSignInSchema = registerSchema.partial().extend({
  identityToken: z.string().min(1).max(8192),
  rawNonce: z.string().min(16).max(256),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
