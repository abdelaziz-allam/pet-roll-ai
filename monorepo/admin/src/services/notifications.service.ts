import { api } from '@/config/api';
import type { PaginatedResponse } from '@/types/common';

export interface BroadcastPayload {
  title: string;
  body: string;
  target: 'all' | 'by_role' | 'specific_users';
  targetRoles?: string[];
  targetUserIds?: string[];
  imageUrl?: string;
  scheduledAt?: string;
}

export interface NotificationLogEntry {
  id: string;
  title: string;
  body: string;
  target: string;
  sentAt: string;
  deliveredCount: number;
  openCount: number;
  openRate: number;
  status: 'sent' | 'scheduled' | 'failed' | 'cancelled';
  scheduledAt?: string;
}

export const NotificationsService = {
  async sendBroadcast(data: BroadcastPayload) {
    const { data: response } = await api.post('/admin/notifications/broadcast', data);
    return response;
  },

  async getNotificationLog(params: { page?: number; limit?: number; status?: string }) {
    const { data } = await api.get<PaginatedResponse<NotificationLogEntry>>('/admin/notifications', { params });
    return data;
  },

  async cancelScheduled(id: string) {
    const { data } = await api.delete(`/admin/notifications/${id}`);
    return data;
  },
};
