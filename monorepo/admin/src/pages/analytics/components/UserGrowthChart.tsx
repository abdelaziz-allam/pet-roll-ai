import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface UserGrowthPoint {
  date: string;
  users: number;
}

interface UserGrowthChartProps {
  data: UserGrowthPoint[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          tickFormatter={(val) => {
            const d = new Date(val);
            return `${d.getMonth() + 1}/${d.getDate()}`;
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
          formatter={(value: number) => [value.toLocaleString(), 'Total Users']}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          name="Total Users"
          stroke="#F1379D"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6, fill: '#F1379D' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
