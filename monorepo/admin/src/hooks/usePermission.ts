import { useAuth } from '@/hooks/useAuth';
import { hasPermission, type AdminRole, type Feature } from '@/config/permissions';

export function usePermission() {
  const { user } = useAuth();
  const role: AdminRole = user?.role || 'viewer';

  const can = (feature: Feature): boolean => {
    return hasPermission(role, feature);
  };

  return { can, role };
}
