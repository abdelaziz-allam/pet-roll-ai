import { api } from '@/config/api';
import type { PaginatedResponse } from '@/types/common';

export interface Tip {
  id: string;
  title: string;
  body: string;
  category: 'health' | 'nutrition' | 'grooming' | 'training' | 'safety' | 'general';
  species?: string[];
  active: boolean;
  createdBy: string;
  createdAt: { _seconds: number };
  updatedAt: { _seconds: number };
}

export interface CreateTipPayload {
  title: string;
  body: string;
  category: string;
  species?: string[];
  active: boolean;
}

export interface TipListParams {
  page?: number;
  limit?: number;
  category?: string;
  active?: string;
}

export const TipsService = {
  async getAll(params: TipListParams): Promise<PaginatedResponse<Tip>> {
    const { data } = await api.get<PaginatedResponse<Tip>>('/tips', { params });
    return data;
  },

  async getById(id: string): Promise<Tip> {
    const { data } = await api.get<Tip>(`/tips/${id}`);
    return data;
  },

  async create(payload: CreateTipPayload): Promise<Tip> {
    const { data } = await api.post<Tip>('/tips', payload);
    return data;
  },

  async update(id: string, payload: Partial<CreateTipPayload>): Promise<Tip> {
    const { data } = await api.put<Tip>(`/tips/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tips/${id}`);
  },
};
