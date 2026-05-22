import { useState, useCallback, useEffect } from 'react';
import { api } from '@/services/api';

export interface AdminUser {
  id: string;
  displayName: string;
  email: string;
  role: string;
  status: string;
  permissions: Record<string, { access: boolean; actions: string[] }>;
  lastLoginAt?: string;
}

interface AuthState {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const TOKEN_KEY = 'petroll_admin_token';
const REFRESH_KEY = 'petroll_admin_refresh';
const USER_KEY = 'petroll_admin_user';

export function useAuth(): AuthState {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      setLoading(true);
      api.get<AdminUser>('/admin-auth/me')
        .then((data) => {
          setUser(data);
          localStorage.setItem(USER_KEY, JSON.stringify(data));
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(REFRESH_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await api.post<{ user: AdminUser; accessToken: string; refreshToken: string }>(
        '/admin-auth/login',
        { email, password }
      );
      localStorage.setItem(TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_KEY, data.refreshToken);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: user !== null,
  };
}
