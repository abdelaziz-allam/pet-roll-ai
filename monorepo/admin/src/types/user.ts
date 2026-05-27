import type { AdminRole } from '@/types/common';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: AdminRole;
  status: string;
  timezone: string;
  country?: string;
  city?: string;
  settings: Record<string, unknown>;
  fcmTokens: string[];
  isVerifiedBreeder: boolean;
  createdAt: string;
  updatedAt: string;
}
