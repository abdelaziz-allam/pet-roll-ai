import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  CloudServerOutlined,
  DatabaseOutlined,
  CloudOutlined,
  BellOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatDate } from '@/utils/format';

interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  lastCheck: string;
  uptime: number;
}

const serviceIcons: Record<string, React.ReactNode> = {
  API: <CloudServerOutlined />,
  Firestore: <DatabaseOutlined />,
  Storage: <CloudOutlined />,
  FCM: <BellOutlined />,
  Cron: <ClockCircleOutlined />,
};

const statusConfig = {
  healthy: { color: '#4CC287', icon: <CheckCircleOutlined />, label: 'Healthy' },
  degraded: { color: '#faad14', icon: <WarningOutlined />, label: 'Degraded' },
  down: { color: '#f5222d', icon: <CloseCircleOutlined />, label: 'Down' },
};

export function HealthStatus() {
  const { data, isLoading } = useApiQuery<ServiceHealth[]>(
    'system-health',
    '/admin/system/health',
  );

  if (isLoading) {
    return <Card loading />;
  }

  return (
    <Row gutter={[16, 16]}>
      {(data || []).map((service) => {
        const config = statusConfig[service.status];
        return (
          <Col xs={24} sm={12} md={8} key={service.name}>
            <Card
              style={{ borderTop: `3px solid ${config.color}` }}
              bodyStyle={{ padding: 20 }}
            >
              <Space direction="vertical" size={8} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <span style={{ fontSize: 20 }}>
                      {serviceIcons[service.name] || <CloudServerOutlined />}
                    </span>
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      {service.name}
                    </Typography.Text>
                  </Space>
                  <Tag color={config.color} icon={config.icon}>
                    {config.label}
                  </Tag>
                </div>

                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Uptime: {service.uptime}%
                  </Typography.Text>
                </div>

                <div>
                  <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                    Last check: {formatDate(service.lastCheck)}
                  </Typography.Text>
                </div>
              </Space>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
