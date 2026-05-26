import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FeatureUsageItem {
  feature: string;
  usage: number;
}

interface FeatureUsageProps {
  data: FeatureUsageItem[];
}

export function FeatureUsage({ data }: FeatureUsageProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis
          type="category"
          dataKey="feature"
          tick={{ fontSize: 12 }}
          width={90}
        />
        <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Usage Count']} />
        <Bar
          dataKey="usage"
          fill="#0096D1"
          radius={[0, 4, 4, 0]}
          barSize={24}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
