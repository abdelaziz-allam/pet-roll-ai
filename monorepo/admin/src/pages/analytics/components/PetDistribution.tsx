import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PetDistItem {
  species: string;
  count: number;
}

interface PetDistributionProps {
  data: PetDistItem[];
}

const COLORS = ['#F1379D', '#0096D1', '#4CC287', '#272727', '#faad14', '#722ed1'];

export function PetDistribution({ data }: PetDistributionProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="species"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ species, count }) => `${species}: ${count}`}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number, name: string) => [value.toLocaleString(), name]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
