import { api } from '@/config/api';

export const AuthService = {
  async login(email: string, password: string) {
    const { data } = await api.post('/admin-auth/login', { email, password });
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/admin-auth/me');
    return data;
  },
};
