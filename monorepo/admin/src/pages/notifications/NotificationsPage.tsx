import { useState } from 'react';
import { Card, List, Tag, Space, Button, Typography, Badge, Switch, Form, Input, Select, message } from 'antd';
import { BellOutlined, SendOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
  sentAt: string;
  recipientCount: number;
}

const mockNotifications: Notification[] = [
  { id: '1', title: 'System Maintenance', body: 'Scheduled maintenance on March 20th from 2-4 AM UTC.', type: 'system', sentAt: '2024-03-15T10:00:00Z', recipientCount: 1247 },
  { id: '2', title: 'New Feature: Pregnancy Tracker', body: 'Track your pet pregnancy milestones with our new feature!', type: 'feature', sentAt: '2024-03-10T09:00:00Z', recipientCount: 1247 },
  { id: '3', title: 'Vaccination Reminder Campaign', body: 'Annual vaccination reminder sent to eligible pet owners.', type: 'campaign', sentAt: '2024-03-05T08:00:00Z', recipientCount: 892 },
];

const typeColors: Record<string, string> = { system: 'red', feature: 'blue', campaign: 'green' };

const NotificationsPage: React.FC = () => {
  const [notifications] = useState(mockNotifications);
  const [showForm, setShowForm] = useState(false);

  const handleSend = (values: any) => {
    message.success(`Notification "${values.title}" sent to ${values.audience === 'all' ? 'all users' : values.audience}`);
    setShowForm(false);
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>Notifications</Title>
        <Button type="primary" icon={<SendOutlined />} onClick={() => setShowForm(!showForm)}>
          Send Notification
        </Button>
      </div>

      {showForm && (
        <Card title="Compose Notification">
          <Form layout="vertical" onFinish={handleSend}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Notification title" />
            </Form.Item>
            <Form.Item name="body" label="Message" rules={[{ required: true }]}>
              <TextArea rows={3} placeholder="Notification body" />
            </Form.Item>
            <Form.Item name="audience" label="Audience" rules={[{ required: true }]} initialValue="all">
              <Select>
                <Option value="all">All Users</Option>
                <Option value="dog_owners">Dog Owners</Option>
                <Option value="cat_owners">Cat Owners</Option>
                <Option value="breeders">Verified Breeders</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">Send</Button>
                <Button onClick={() => setShowForm(false)}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      )}

      <Card title="Sent Notifications">
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge count={<BellOutlined />} style={{ backgroundColor: '#F1379D' }} />}
                title={
                  <Space>
                    {item.title}
                    <Tag color={typeColors[item.type]}>{item.type}</Tag>
                  </Space>
                }
                description={item.body}
              />
              <div style={{ textAlign: 'right' }}>
                <div><Text type="secondary">{new Date(item.sentAt).toLocaleDateString()}</Text></div>
                <div><Text type="secondary">{item.recipientCount} recipients</Text></div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </Space>
  );
};

export default NotificationsPage;
