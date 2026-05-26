import { api } from '@/config/api';
import type { StatsData, GrowthDataPoint } from '@/types/analytics';

export async function getStats(): Promise<StatsData> {
  const { data } = await api.get<StatsData>('/admin/stats');
  return data;
}

export async function getGrowthData(
  period: '7d' | '30d' | '90d',
): Promise<GrowthDataPoint[]> {
  const { data } = await api.get<GrowthDataPoint[]>('/admin/stats/growth', {
    params: { period },
  });
  return data;
}
