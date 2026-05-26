import { api } from '@/config/api';
import type { User } from '@/types/user';
import type { PaginatedResponse } from '@/types/common';

export interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  role?: string;
  status?: string;
}

export async function getUsers(
  params: GetUsersParams,
): Promise<PaginatedResponse<User>> {
  const { data } = await api.get<PaginatedResponse<User>>('/admin/users', {
    params,
  });
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await api.get<User>(`/admin/users/${id}`);
  return data;
}

export async function updateUserRole(
  id: string,
  role: string,
): Promise<User> {
  const { data } = await api.put<User>(`/admin/users/${id}/role`, { role });
  return data;
}

export async function banUser(id: string, reason?: string): Promise<void> {
  await api.put(`/admin/users/${id}/ban`, { action: 'ban', reason });
}

export async function unbanUser(id: string): Promise<void> {
  await api.put(`/admin/users/${id}/ban`, { action: 'unban' });
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}
