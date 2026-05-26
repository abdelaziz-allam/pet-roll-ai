import { api } from '@/config/api';

export const AuthService = {
  async verifyAdmin(firebaseToken: string) {
    const { data } = await api.post('/admin/auth/verify', { token: firebaseToken });
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/auth/me');
    return data;
  },
};
