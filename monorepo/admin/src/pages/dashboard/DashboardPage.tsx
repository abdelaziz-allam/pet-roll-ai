import { Row, Col, Typography } from 'antd';
import { useApiQuery } from '@/hooks/useApiQuery';
import type { StatsData } from '@/types/analytics';
import StatsCards from './components/StatsCards';
import GrowthChart from './components/GrowthChart';
import RecentActivity from './components/RecentActivity';
import SystemHealth from './components/SystemHealth';

const { Title } = Typography;

export default function DashboardPage() {
  const { data: stats, isLoading } = useApiQuery<StatsData>('stats', '/admin/stats');

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      <StatsCards stats={stats} loading={isLoading} />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <GrowthChart />
        </Col>
        <Col xs={24} lg={8}>
          <SystemHealth />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <RecentActivity />
        </Col>
      </Row>
    </div>
  );
}
