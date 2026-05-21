import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const adminForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const adminResetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8),
});

export const adminChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export const createAdminUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(50),
  role: z.enum(['super_admin', 'admin', 'moderator', 'viewer']),
  permissions: z.record(
    z.string(),
    z.object({
      access: z.boolean(),
      actions: z.array(z.string()),
    })
  ),
});

export const updateAdminUserSchema = z.object({
  displayName: z.string().min(2).max(50).optional(),
  role: z.enum(['super_admin', 'admin', 'moderator', 'viewer']).optional(),
  status: z.enum(['active', 'suspended']).optional(),
  permissions: z.record(
    z.string(),
    z.object({
      access: z.boolean(),
      actions: z.array(z.string()),
    })
  ).optional(),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type AdminForgotPasswordInput = z.infer<typeof adminForgotPasswordSchema>;
export type AdminResetPasswordInput = z.infer<typeof adminResetPasswordSchema>;
export type AdminChangePasswordInput = z.infer<typeof adminChangePasswordSchema>;
export type CreateAdminUserInput = z.infer<typeof createAdminUserSchema>;
export type UpdateAdminUserInput = z.infer<typeof updateAdminUserSchema>;

export interface AdminPermissions {
  [page: string]: {
    access: boolean;
    actions: string[];
  };
}

export const ADMIN_PAGES = [
  'dashboard',
  'app_users',
  'pets',
  'verification',
  'mating',
  'notifications',
  'analytics',
  'admin_users',
  'settings',
] as const;

export const PAGE_ACTIONS: Record<string, string[]> = {
  dashboard: ['view'],
  app_users: ['view', 'create', 'edit', 'ban', 'delete', 'export'],
  pets: ['view', 'edit', 'delete'],
  verification: ['view', 'approve', 'reject'],
  mating: ['view', 'edit', 'delete', 'moderate'],
  notifications: ['view', 'send', 'delete'],
  analytics: ['view', 'export'],
  admin_users: ['view', 'create', 'edit', 'delete', 'manage_permissions'],
  settings: ['view', 'edit'],
};
