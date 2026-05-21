import { Card, Row, Col, Space, Typography, Statistic, Select } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const { Title } = Typography;
const { Option } = Select;

const userGrowth = [
  { month: 'Jan', newUsers: 85, activeUsers: 420 },
  { month: 'Feb', newUsers: 120, activeUsers: 510 },
  { month: 'Mar', newUsers: 155, activeUsers: 620 },
  { month: 'Apr', newUsers: 180, activeUsers: 730 },
  { month: 'May', newUsers: 220, activeUsers: 870 },
  { month: 'Jun', newUsers: 280, activeUsers: 1020 },
];

const speciesDistribution = [
  { name: 'Dogs', value: 2450, color: '#F1379D' },
  { name: 'Cats', value: 1442, color: '#722ed1' },
];

const breedPopularity = [
  { breed: 'Golden Retriever', count: 320 },
  { breed: 'Labrador', count: 280 },
  { breed: 'Persian', count: 250 },
  { breed: 'German Shepherd', count: 220 },
  { breed: 'Siamese', count: 190 },
  { breed: 'Bulldog', count: 165 },
];

const healthActivity = [
  { month: 'Jan', checkups: 120, vaccinations: 95, surgeries: 15 },
  { month: 'Feb', checkups: 145, vaccinations: 110, surgeries: 20 },
  { month: 'Mar', checkups: 160, vaccinations: 130, surgeries: 12 },
  { month: 'Apr', checkups: 180, vaccinations: 150, surgeries: 18 },
  { month: 'May', checkups: 200, vaccinations: 170, surgeries: 22 },
  { month: 'Jun', checkups: 230, vaccinations: 195, surgeries: 25 },
];

const AnalyticsPage: React.FC = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>Analytics</Title>
        <Select defaultValue="6months" style={{ width: 150 }}>
          <Option value="7days">Last 7 days</Option>
          <Option value="30days">Last 30 days</Option>
          <Option value="6months">Last 6 months</Option>
          <Option value="1year">Last year</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}><Card><Statistic title="Avg. Pets per User" value={3.1} precision={1} /></Card></Col>
        <Col span={6}><Card><Statistic title="Monthly Active Users" value={870} suffix={<ArrowUpOutlined style={{ color: '#52c41a', fontSize: 14 }} />} /></Card></Col>
        <Col span={6}><Card><Statistic title="Health Records/Month" value={445} /></Card></Col>
        <Col span={6}><Card><Statistic title="Mating Success Rate" value={68} suffix="%" valueStyle={{ color: '#52c41a' }} /></Card></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card title="User Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="newUsers" stroke="#F1379D" name="New Users" strokeWidth={2} />
                <Line type="monotone" dataKey="activeUsers" stroke="#1890ff" name="Active Users" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Species Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={speciesDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label>
                  {speciesDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Popular Breeds">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={breedPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="breed" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="count" fill="#F1379D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Health Activity">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={healthActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="checkups" fill="#52c41a" name="Checkups" />
                <Bar dataKey="vaccinations" fill="#1890ff" name="Vaccinations" />
                <Bar dataKey="surgeries" fill="#faad14" name="Surgeries" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default AnalyticsPage;
