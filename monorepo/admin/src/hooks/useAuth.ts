import { create } from 'zustand';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
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
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await credential.user.getIdToken();

    const { data } = await api.post('/admin/auth/verify', { token: idToken });

    const adminUser: AdminUser = {
      uid: data.user.id || credential.user.uid,
      email: data.user.email,
      displayName: data.user.displayName || credential.user.displayName || '',
      role: data.user.role,
    };

    localStorage.setItem('token', data.accessToken || idToken);
    localStorage.setItem('user', JSON.stringify(adminUser));

    set({ user: adminUser, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await signOut(auth);
    localStorage.removeItem('token');
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
      const { data } = await api.get('/auth/me');
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
      localStorage.removeItem('user');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
