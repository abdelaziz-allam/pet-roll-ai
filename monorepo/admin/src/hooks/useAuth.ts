import { create } from 'zustand';
import { api } from '@/config/api';
import type { AdminRole } from '@/config/permissions';

interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
}

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    const { data } = await api.post('/admin-auth/login', { email, password });

    const adminUser: AdminUser = {
      uid: data.user.id,
      email: data.user.email,
      displayName: data.user.displayName || '',
      role: data.user.role,
    };

    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(adminUser));

    set({ user: adminUser, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, isLoading: false });
    window.location.href = '/login';
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const { data } = await api.get('/admin-auth/me');
      const adminUser: AdminUser = {
        uid: data.id,
        email: data.email,
        displayName: data.displayName || '',
        role: data.role,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      set({ user: adminUser, isAuthenticated: true, isLoading: false });
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
