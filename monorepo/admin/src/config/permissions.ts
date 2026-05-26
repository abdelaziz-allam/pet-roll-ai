export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support' | 'viewer';

const ROLE_HIERARCHY: Record<AdminRole, number> = {
  super_admin: 5,
  admin: 4,
  moderator: 3,
  support: 2,
  viewer: 1,
};

type Feature =
  | 'dashboard'
  | 'analytics'
  | 'user_read'
  | 'user_edit'
  | 'user_delete'
  | 'pet_management'
  | 'verification'
  | 'content_moderation'
  | 'broadcast'
  | 'team_management'
  | 'system_settings'
  | 'error_logs'
  | 'breed_database';

const permissions: Record<Feature, AdminRole> = {
  dashboard: 'viewer',
  analytics: 'support',
  user_read: 'support',
  user_edit: 'moderator',
  user_delete: 'admin',
  pet_management: 'moderator',
  verification: 'moderator',
  content_moderation: 'moderator',
  broadcast: 'admin',
  team_management: 'admin',
  system_settings: 'super_admin',
  error_logs: 'admin',
  breed_database: 'moderator',
};

export function hasPermission(userRole: AdminRole, feature: Feature): boolean {
  const requiredLevel = ROLE_HIERARCHY[permissions[feature]];
  const userLevel = ROLE_HIERARCHY[userRole];
  return userLevel >= requiredLevel;
}

export type { Feature };
export { permissions, ROLE_HIERARCHY };
