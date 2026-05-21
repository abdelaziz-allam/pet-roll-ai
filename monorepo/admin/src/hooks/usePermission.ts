import { useCallback } from 'react';
import { useAuth } from './useAuth';

export function usePermission() {
  const { user } = useAuth();

  const canAccessPage = useCallback(
    (page: string): boolean => {
      if (!user) return false;
      if (user.role === 'super_admin') return true;
      const pagePerms = user.permissions?.[page];
      return pagePerms?.access === true;
    },
    [user]
  );

  const canPerformAction = useCallback(
    (page: string, action: string): boolean => {
      if (!user) return false;
      if (user.role === 'super_admin') return true;
      const pagePerms = user.permissions?.[page];
      if (!pagePerms?.access) return false;
      return pagePerms.actions.includes(action);
    },
    [user]
  );

  const hasRole = useCallback(
    (...roles: string[]): boolean => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  return { canAccessPage, canPerformAction, hasRole };
}
