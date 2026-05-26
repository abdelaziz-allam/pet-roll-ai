import { Row, Col, Card, Statistic, Skeleton } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
  BellOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import type { StatsData } from '@/types/analytics';
import { formatNumber } from '@/utils/format';

interface StatsCardsProps {
  stats: StatsData | undefined;
  loading: boolean;
}

interface StatCardConfig {
  title: string;
  key: keyof StatsData;
  growthKey?: keyof StatsData;
  icon: React.ReactNode;
  color: string;
}

const cards: StatCardConfig[] = [
  {
    title: 'Total Users',
    key: 'totalUsers',
    growthKey: 'userGrowthPercent',
    icon: <UserOutlined />,
    color: '#F1379D',
  },
  {
    title: 'Total Pets',
    key: 'totalPets',
    growthKey: 'petGrowthPercent',
    icon: <HeartOutlined />,
    color: '#0096D1',
  },
  {
    title: 'Active Listings',
    key: 'activeListings',
    icon: <ShoppingOutlined />,
    color: '#4CC287',
  },
  {
    title: 'Pending Verifications',
    key: 'pendingVerifications',
    icon: <SafetyCertificateOutlined />,
    color: '#faad14',
  },
  {
    title: 'Notifications Today',
    key: 'notificationsSentToday',
    icon: <BellOutlined />,
    color: '#722ed1',
  },
];

function GrowthSuffix({ value }: { value: number | undefined }) {
  if (value === undefined) return null;
  const isPositive = value >= 0;
  return (
    <span style={{ fontSize: 14, color: isPositive ? '#4CC287' : '#ff4d4f' }}>
      {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

export default function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col key={card.key} xs={12} sm={12} md={8} lg={4} xl={4}>
            <Card>
              <Skeleton active paragraph={{ rows: 1 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col key={card.key} xs={12} sm={12} md={8} lg={4} xl={4}>
          <Card hoverable>
            <Statistic
              title={card.title}
              value={stats ? formatNumber(stats[card.key] as number) : 0}
              prefix={<span style={{ color: card.color }}>{card.icon}</span>}
              suffix={
                card.growthKey && stats ? (
                  <GrowthSuffix value={stats[card.growthKey] as number} />
                ) : null
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
