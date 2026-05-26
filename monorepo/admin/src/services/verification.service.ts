import { api } from '@/config/api';

export interface Verification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  userJoinDate: string;
  petCount: number;
  breeds: string[];
  documents: string[];
  description?: string;
  status: 'pending' | 'approved' | 'rejected' | 'revoked';
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationStats {
  pendingCount: number;
  avgReviewTimeHours: number;
  approvalRate: number;
}

export const VerificationService = {
  async getPendingVerifications(): Promise<Verification[]> {
    const { data } = await api.get<Verification[]>('/admin/verifications', {
      params: { status: 'pending' },
    });
    return data;
  },

  async getVerificationHistory(): Promise<Verification[]> {
    const { data } = await api.get<Verification[]>('/admin/verifications', {
      params: { status: 'all' },
    });
    return data;
  },

  async getVerificationStats(): Promise<VerificationStats> {
    const { data } = await api.get<VerificationStats>('/admin/verifications/stats');
    return data;
  },

  async approveVerification(id: string, notes?: string): Promise<void> {
    await api.put(`/admin/verifications/${id}`, { status: 'approved', notes });
  },

  async rejectVerification(id: string, reason: string): Promise<void> {
    await api.put(`/admin/verifications/${id}`, { status: 'rejected', reason });
  },

  async revokeVerification(userId: string): Promise<void> {
    await api.post(`/admin/verifications/${userId}/revoke`);
  },
};
