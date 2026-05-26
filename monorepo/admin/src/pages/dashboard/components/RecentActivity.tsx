import { Card, Timeline, Skeleton, Empty } from 'antd';
import {
  UserAddOutlined,
  HeartOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useApiQuery } from '@/hooks/useApiQuery';
import { relativeTime } from '@/utils/date';

interface ActivityEvent {
  id: string;
  type: 'user_registered' | 'pet_created' | 'listing_created' | 'verification_submitted' | 'report_submitted';
  description: string;
  timestamp: string;
}

const eventConfig: Record<ActivityEvent['type'], { icon: React.ReactNode; color: string }> = {
  user_registered: { icon: <UserAddOutlined />, color: '#F1379D' },
  pet_created: { icon: <HeartOutlined />, color: '#0096D1' },
  listing_created: { icon: <ShoppingOutlined />, color: '#4CC287' },
  verification_submitted: { icon: <SafetyCertificateOutlined />, color: '#faad14' },
  report_submitted: { icon: <WarningOutlined />, color: '#ff4d4f' },
};

export default function RecentActivity() {
  const { data, isLoading } = useApiQuery<ActivityEvent[]>(
    'recent-activity',
    '/admin/stats/activity?limit=20',
  );

  return (
    <Card title="Recent Activity" style={{ height: '100%' }}>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : !data?.length ? (
        <Empty description="No recent activity" />
      ) : (
        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
          <Timeline
            items={data.map((event) => {
              const config = eventConfig[event.type];
              return {
                key: event.id,
                dot: <span style={{ color: config.color }}>{config.icon}</span>,
                children: (
                  <div>
                    <span>{event.description}</span>
                    <br />
                    <span style={{ fontSize: 12, color: '#8c8c8c' }}>
                      {relativeTime(event.timestamp)}
                    </span>
                  </div>
                ),
              };
            })}
          />
        </div>
      )}
    </Card>
  );
}
