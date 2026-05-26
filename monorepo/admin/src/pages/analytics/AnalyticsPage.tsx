import { useState } from 'react';
import { Card, Col, Row, Segmented, Statistic, Space } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatNumber } from '@/utils/format';
import { UserGrowthChart } from './components/UserGrowthChart';
import { PetDistribution } from './components/PetDistribution';
import { FeatureUsage } from './components/FeatureUsage';

interface AnalyticsOverview {
  totalUsers: number;
  newUsersThisPeriod: number;
  totalPets: number;
  activeListings: number;
  userGrowthPercent: number;
}

interface UserGrowthPoint {
  date: string;
  users: number;
}

interface PetDistItem {
  species: string;
  count: number;
}

interface FeatureUsageItem {
  feature: string;
  usage: number;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<string>('30d');

  const { data: overview } = useApiQuery<AnalyticsOverview>(
    ['analytics-overview', period],
    `/admin/analytics/overview?period=${period}`,
  );

  const { data: growthData } = useApiQuery<UserGrowthPoint[]>(
    ['analytics-growth', period],
    `/admin/analytics/user-growth?period=${period}`,
  );

  const { data: petData } = useApiQuery<PetDistItem[]>(
    ['analytics-pets', period],
    `/admin/analytics/pet-distribution?period=${period}`,
  );

  const { data: featureData } = useApiQuery<FeatureUsageItem[]>(
    ['analytics-features', period],
    `/admin/analytics/feature-usage?period=${period}`,
  );

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0 }}>Analytics Dashboard</h2>
          <Segmented
            value={period}
            onChange={(val) => setPeriod(val as string)}
            options={[
              { label: '7 Days', value: '7d' },
              { label: '30 Days', value: '30d' },
              { label: '90 Days', value: '90d' },
              { label: 'All Time', value: 'all' },
            ]}
          />
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={overview?.totalUsers || 0}
                prefix={<UserOutlined />}
                formatter={(val) => formatNumber(val as number)}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="New Users"
                value={overview?.newUsersThisPeriod || 0}
                prefix={<RiseOutlined />}
                suffix={
                  <span style={{ fontSize: 14, color: '#4CC287' }}>
                    +{overview?.userGrowthPercent || 0}%
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Pets"
                value={overview?.totalPets || 0}
                prefix={<HeartOutlined />}
                formatter={(val) => formatNumber(val as number)}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Active Listings"
                value={overview?.activeListings || 0}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="User Growth">
            <UserGrowthChart data={growthData || []} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Pet Distribution">
            <PetDistribution data={petData || []} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Feature Usage">
            <FeatureUsage data={featureData || []} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Retention">
            <div
              style={{
                height: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              Retention analysis coming soon
            </div>
          </Card>
        </Col>
      </Row>
    </Space>
  );
}
