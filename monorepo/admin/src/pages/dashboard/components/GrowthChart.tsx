import { useState } from 'react';
import { Card, Radio, Skeleton } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useApiQuery } from '@/hooks/useApiQuery';
import type { GrowthDataPoint } from '@/types/analytics';

type Period = '7d' | '30d' | '90d';

export default function GrowthChart() {
  const [period, setPeriod] = useState<Period>('30d');

  const { data, isLoading } = useApiQuery<GrowthDataPoint[]>(
    ['growth', period],
    `/admin/stats/growth?period=${period}`,
  );

  return (
    <Card
      title="Growth Overview"
      extra={
        <Radio.Group
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          size="small"
        >
          <Radio.Button value="7d">7 days</Radio.Button>
          <Radio.Button value="30d">30 days</Radio.Button>
          <Radio.Button value="90d">90 days</Radio.Button>
        </Radio.Group>
      }
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F1379D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F1379D" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0096D1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0096D1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#F1379D"
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="pets"
              stroke="#0096D1"
              fill="url(#colorPets)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
