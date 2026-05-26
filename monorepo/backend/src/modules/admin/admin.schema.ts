import { z } from 'zod';

export const updateUserRoleSchema = z.object({
  role: z.enum(['user', 'breeder', 'admin', 'moderator', 'support', 'viewer']),
});

export const banUserSchema = z.object({
  banned: z.boolean(),
  reason: z.string().optional(),
});

export const updateVerificationSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  reason: z.string().optional(),
});

export const createAdminSchema = z.object({
  email: z.string().email(),
  displayName: z.string(),
  role: z.enum(['admin', 'moderator', 'support', 'viewer']),
  password: z.string().min(8),
});

export const updateConfigSchema = z.object({
  minAppVersion: z.string().optional(),
  latestAppVersion: z.string().optional(),
  maintenanceMode: z.boolean().optional(),
  maintenanceMessage: z.string().optional(),
  featureFlags: z.record(z.unknown()).optional(),
});

export const createReportSchema = z.object({
  targetType: z.enum(['user', 'listing', 'message']),
  targetId: z.string(),
  reason: z.enum(['spam', 'abuse', 'inappropriate', 'fake', 'other']),
  description: z.string().max(500).optional(),
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type BanUserInput = z.infer<typeof banUserSchema>;
export type UpdateVerificationInput = z.infer<typeof updateVerificationSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UpdateConfigInput = z.infer<typeof updateConfigSchema>;
export type CreateReportInput = z.infer<typeof createReportSchema>;
