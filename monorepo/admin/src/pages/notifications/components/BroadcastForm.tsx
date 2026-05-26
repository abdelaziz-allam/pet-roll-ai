import { useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Switch,
  DatePicker,
  Button,
  Card,
  Typography,
  Space,
  Modal,
  message,
} from 'antd';
import { SendOutlined, BellOutlined } from '@ant-design/icons';
import { useApiMutation } from '@/hooks/useApiQuery';
import type { BroadcastPayload } from '@/services/notifications.service';

const { TextArea } = Input;
const { Text } = Typography;

export function BroadcastForm() {
  const [form] = Form.useForm();
  const [target, setTarget] = useState<'all' | 'by_role' | 'specific_users'>('all');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);

  const title = Form.useWatch('title', form);
  const body = Form.useWatch('body', form);

  const mutation = useApiMutation<void, BroadcastPayload>(
    '/admin/notifications/broadcast',
    'post',
    {
      onSuccess: () => {
        message.success('Notification sent successfully');
        form.resetFields();
      },
    },
  );

  const handleSubmit = (values: Record<string, unknown>) => {
    Modal.confirm({
      title: 'Confirm Send',
      content: scheduleEnabled
        ? 'This notification will be scheduled for delivery.'
        : 'This notification will be sent immediately to the selected audience.',
      okText: 'Send',
      onOk: () => {
        const payload: BroadcastPayload = {
          title: values.title as string,
          body: values.body as string,
          target,
          targetRoles: values.targetRoles as string[] | undefined,
          targetUserIds: values.targetUserIds as string[] | undefined,
          imageUrl: values.imageUrl as string | undefined,
          scheduledAt: scheduleEnabled ? (values.scheduledAt as Date)?.toISOString() : undefined,
        };
        mutation.mutate(payload);
      },
    });
  };

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input placeholder="Notification title" maxLength={100} showCount />
          </Form.Item>

          <Form.Item
            name="body"
            label="Body"
            rules={[{ required: true, message: 'Body is required' }]}
          >
            <TextArea rows={4} placeholder="Notification body text" maxLength={500} showCount />
          </Form.Item>

          <Form.Item name="imageUrl" label="Image URL (optional)">
            <Input placeholder="https://example.com/image.png" />
          </Form.Item>

          <Form.Item label="Target Audience">
            <Radio.Group value={target} onChange={(e) => setTarget(e.target.value)}>
              <Radio.Button value="all">All Users</Radio.Button>
              <Radio.Button value="by_role">By Role</Radio.Button>
              <Radio.Button value="specific_users">Specific Users</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {target === 'by_role' && (
            <Form.Item
              name="targetRoles"
              label="Select Roles"
              rules={[{ required: true, message: 'Select at least one role' }]}
            >
              <Select
                mode="multiple"
                placeholder="Select roles"
                options={[
                  { label: 'Pet Owner', value: 'pet_owner' },
                  { label: 'Breeder', value: 'breeder' },
                  { label: 'Veterinarian', value: 'vet' },
                  { label: 'Premium', value: 'premium' },
                ]}
              />
            </Form.Item>
          )}

          {target === 'specific_users' && (
            <Form.Item
              name="targetUserIds"
              label="Search Users"
              rules={[{ required: true, message: 'Select at least one user' }]}
            >
              <Select
                mode="multiple"
                placeholder="Search by name or email"
                showSearch
                filterOption={false}
              />
            </Form.Item>
          )}

          <Form.Item label="Delivery">
            <Space>
              <Text>Send now</Text>
              <Switch checked={scheduleEnabled} onChange={setScheduleEnabled} />
              <Text>Schedule</Text>
            </Space>
          </Form.Item>

          {scheduleEnabled && (
            <Form.Item
              name="scheduledAt"
              label="Schedule Date & Time"
              rules={[{ required: true, message: 'Select a date' }]}
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              loading={mutation.isPending}
              style={{ background: '#F1379D' }}
            >
              {scheduleEnabled ? 'Schedule Notification' : 'Send Notification'}
            </Button>
          </Form.Item>
        </Form>

        <Card
          title={
            <Space>
              <BellOutlined />
              <span>Preview</span>
            </Space>
          }
          style={{ height: 'fit-content' }}
        >
          <div
            style={{
              background: '#f5f5f5',
              borderRadius: 12,
              padding: 16,
              border: '1px solid #e8e8e8',
            }}
          >
            <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 4 }}>
              {title || 'Notification Title'}
            </Text>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {body || 'Notification body will appear here...'}
            </Text>
          </div>
          <Text type="secondary" style={{ fontSize: 11, marginTop: 8, display: 'block' }}>
            Target: {target === 'all' ? 'All Users' : target === 'by_role' ? 'By Role' : 'Specific Users'}
          </Text>
        </Card>
      </div>
    </Space>
  );
}
