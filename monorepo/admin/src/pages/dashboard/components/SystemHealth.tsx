import { Card, Badge, Space, Skeleton } from 'antd';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatDate } from '@/utils/format';

interface HealthStatus {
  api: 'healthy' | 'degraded' | 'down';
  firestore: 'healthy' | 'degraded' | 'down';
  fcm: 'healthy' | 'degraded' | 'down';
  lastCronRun: string;
}

const statusMap: Record<string, 'success' | 'warning' | 'error'> = {
  healthy: 'success',
  degraded: 'warning',
  down: 'error',
};

const statusLabel: Record<string, string> = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  down: 'Down',
};

export default function SystemHealth() {
  const { data, isLoading } = useApiQuery<HealthStatus>(
    'system-health',
    '/admin/stats/health',
  );

  return (
    <Card title="System Health" style={{ height: '100%' }}>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>API Status</span>
            <Badge status={statusMap[data?.api ?? 'down']} text={statusLabel[data?.api ?? 'down']} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Firestore</span>
            <Badge status={statusMap[data?.firestore ?? 'down']} text={statusLabel[data?.firestore ?? 'down']} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>FCM</span>
            <Badge status={statusMap[data?.fcm ?? 'down']} text={statusLabel[data?.fcm ?? 'down']} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Last Cron Run</span>
            <span style={{ color: '#8c8c8c', fontSize: 13 }}>
              {data?.lastCronRun ? formatDate(data.lastCronRun) : 'N/A'}
            </span>
          </div>
        </Space>
      )}
    </Card>
  );
}
