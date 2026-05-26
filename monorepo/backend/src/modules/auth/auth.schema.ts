import { z } from 'zod';

export const registerSchema = z.object({
  firebaseToken: z.string().min(1),
  displayName: z.string().min(2).max(100),
  timezone: z.string().default('UTC'),
});

export const loginSchema = z.object({
  firebaseToken: z.string().min(1),
});

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  phone: z.string().optional(),
  timezone: z.string().optional(),
  settings: z.object({
    reminderTimeUTC: z.number().min(0).max(23).optional(),
    pushEnabled: z.boolean().optional(),
    emailNotifications: z.boolean().optional(),
    language: z.string().optional(),
  }).optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
