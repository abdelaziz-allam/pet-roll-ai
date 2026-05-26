import { Card, Tabs } from 'antd';
import { GeneralSettings } from './components/GeneralSettings';
import { BreedDatabase } from './components/BreedDatabase';
import { Form, Input, Switch, TimePicker, Tag, Space, Typography } from 'antd';
import { useApiQuery } from '@/hooks/useApiQuery';

interface NotificationSettings {
  fcmStatus: 'connected' | 'disconnected' | 'error';
  defaultReminderTime: string;
}

function NotificationSettings() {
  const { data } = useApiQuery<NotificationSettings>(
    'settings-notifications',
    '/admin/config/notifications',
  );

  const statusColor = {
    connected: 'green',
    disconnected: 'default',
    error: 'red',
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%', maxWidth: 600 }}>
      <div>
        <Typography.Text strong>FCM Status: </Typography.Text>
        <Tag color={statusColor[data?.fcmStatus || 'disconnected']}>
          {data?.fcmStatus || 'Unknown'}
        </Tag>
      </div>
      <Form layout="vertical">
        <Form.Item label="Default Reminder Time">
          <TimePicker format="HH:mm" style={{ width: 200 }} />
        </Form.Item>
      </Form>
    </Space>
  );
}

export default function SettingsPage() {
  return (
    <Card title="Settings">
      <Tabs
        items={[
          {
            key: 'general',
            label: 'General',
            children: <GeneralSettings />,
          },
          {
            key: 'notifications',
            label: 'Notifications',
            children: <NotificationSettings />,
          },
          {
            key: 'breeds',
            label: 'Breed Database',
            children: <BreedDatabase />,
          },
        ]}
      />
    </Card>
  );
}
