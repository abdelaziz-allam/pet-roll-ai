import { api } from '@/config/api';
import type { AdminRole } from '@/types/common';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: AdminRole;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}

export interface CreateTeamMemberPayload {
  email: string;
  role: AdminRole;
}

export const TeamService = {
  async getTeam() {
    const { data } = await api.get<TeamMember[]>('/admin/team');
    return data;
  },

  async createTeamMember(payload: CreateTeamMemberPayload) {
    const { data } = await api.post<TeamMember>('/admin/team', payload);
    return data;
  },

  async updateTeamMember(id: string, payload: Partial<Pick<TeamMember, 'role' | 'status'>>) {
    const { data } = await api.patch<TeamMember>(`/admin/team/${id}`, payload);
    return data;
  },

  async removeTeamMember(id: string) {
    const { data } = await api.delete(`/admin/team/${id}`);
    return data;
  },
};
