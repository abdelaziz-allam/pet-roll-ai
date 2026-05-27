import { useState, useEffect } from 'react';
import {
  Card, Form, Input, Switch, Select, Button, Space, Typography, message,
  Tabs, InputNumber, Spin, Tag, Tooltip, Alert,
} from 'antd';
import {
  SaveOutlined, SettingOutlined, BellOutlined, LockOutlined,
  ReloadOutlined, InfoCircleOutlined, CheckCircleFilled,
} from '@ant-design/icons';
import { api } from '@/services/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface GeneralSettings {
  appName: string;
  supportEmail: string;
  defaultLanguage: string;
  maintenanceMode: boolean;
}

interface NotificationSettings {
  vaccinationReminders: boolean;
  pregnancyAlerts: boolean;
  matingUpdates: boolean;
  reminderDaysBefore: number;
}

interface SecuritySettings {
  rateLimitPerMinute: number;
  tokenExpiryHours: number;
  refreshTokenExpiryDays: number;
  maxPhotoSizeMB: number;
  maxAvatarSizeMB: number;
  allowedFileTypes: string[];
}

interface AppSettings {
  general: GeneralSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingGeneral, setSavingGeneral] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);

  const [generalForm] = Form.useForm();
  const [notificationsForm] = Form.useForm();
  const [securityForm] = Form.useForm();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await api.get<AppSettings>('/admin/settings');
      setSettings(data);
      generalForm.setFieldsValue(data.general);
      notificationsForm.setFieldsValue(data.notifications);
      securityForm.setFieldsValue({
        ...data.security,
        allowedFileTypes: data.security.allowedFileTypes?.join(', ') || 'jpeg, png, webp',
      });
    } catch (err: any) {
      message.error(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleSaveGeneral = async (values: GeneralSettings) => {
    setSavingGeneral(true);
    try {
      const data = await api.put<AppSettings>('/admin/settings/general', values);
      setSettings(data);
      message.success('General settings saved successfully');
    } catch (err: any) {
      message.error(err.message || 'Failed to save general settings');
    } finally {
      setSavingGeneral(false);
    }
  };

  const handleSaveNotifications = async (values: NotificationSettings) => {
    setSavingNotifications(true);
    try {
      const data = await api.put<AppSettings>('/admin/settings/notifications', values);
      setSettings(data);
      message.success('Notification settings saved successfully');
    } catch (err: any) {
      message.error(err.message || 'Failed to save notification settings');
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSaveSecurity = async (values: any) => {
    setSavingSecurity(true);
    try {
      const payload: SecuritySettings = {
        rateLimitPerMinute: values.rateLimitPerMinute,
        tokenExpiryHours: values.tokenExpiryHours,
        refreshTokenExpiryDays: values.refreshTokenExpiryDays,
        maxPhotoSizeMB: values.maxPhotoSizeMB,
        maxAvatarSizeMB: values.maxAvatarSizeMB,
        allowedFileTypes: values.allowedFileTypes
          .split(',')
          .map((t: string) => t.trim().toLowerCase())
          .filter(Boolean),
      };
      const data = await api.put<AppSettings>('/admin/settings/security', payload);
      setSettings(data);
      message.success('Security settings saved successfully');
    } catch (err: any) {
      message.error(err.message || 'Failed to save security settings');
    } finally {
      setSavingSecurity(false);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>;
  }

  const items = [
    {
      key: 'general',
      label: <Space><SettingOutlined />General</Space>,
      forceRender: true,
      children: (
        <Form
          form={generalForm}
          layout="vertical"
          onFinish={handleSaveGeneral}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="appName"
            label="Application Name"
            rules={[{ required: true, message: 'Application name is required' }]}
          >
            <Input placeholder="PET Roll" />
          </Form.Item>

          <Form.Item
            name="supportEmail"
            label="Support Email"
            rules={[
              { required: true, message: 'Support email is required' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="support@petroll.com" />
          </Form.Item>

          <Form.Item name="defaultLanguage" label="Default Language">
            <Select>
              <Option value="en">English</Option>
              <Option value="ar">Arabic</Option>
              <Option value="fr">French</Option>
              <Option value="es">Spanish</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="maintenanceMode"
            label={
              <Space>
                Maintenance Mode
                <Tooltip title="When enabled, the mobile app will show a maintenance screen to all users">
                  <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
                </Tooltip>
              </Space>
            }
            valuePropName="checked"
          >
            <Switch checkedChildren="ON" unCheckedChildren="OFF" />
          </Form.Item>

          {settings?.general.maintenanceMode && (
            <Alert
              type="warning"
              message="Maintenance mode is currently active"
              description="Mobile app users will see a maintenance screen and cannot access the app."
              showIcon
              style={{ marginBottom: 24 }}
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={savingGeneral}>
              Save General Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'notifications',
      label: <Space><BellOutlined />Notifications</Space>,
      forceRender: true,
      children: (
        <Form
          form={notificationsForm}
          layout="vertical"
          onFinish={handleSaveNotifications}
          style={{ maxWidth: 600 }}
        >
          <Card size="small" style={{ marginBottom: 16 }}>
            <Text type="secondary">
              Configure which push notifications are sent to mobile app users. These settings apply globally to all users.
            </Text>
          </Card>

          <Form.Item
            name="vaccinationReminders"
            label="Vaccination Reminders"
            valuePropName="checked"
            extra="Notify users when their pet's vaccination is approaching or overdue"
          >
            <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          </Form.Item>

          <Form.Item
            name="pregnancyAlerts"
            label="Pregnancy Milestone Alerts"
            valuePropName="checked"
            extra="Notify users about pregnancy milestones and expected delivery dates"
          >
            <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          </Form.Item>

          <Form.Item
            name="matingUpdates"
            label="Mating Request Updates"
            valuePropName="checked"
            extra="Notify users when they receive, accept, or get a response on mating requests"
          >
            <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          </Form.Item>

          <Form.Item
            name="reminderDaysBefore"
            label="Reminder Days Before Due"
            extra="How many days before a due date should reminders be sent"
          >
            <Select style={{ width: 200 }}>
              <Option value={1}>1 day before</Option>
              <Option value={3}>3 days before</Option>
              <Option value={7}>7 days before</Option>
              <Option value={14}>14 days before</Option>
              <Option value={30}>30 days before</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={savingNotifications}>
              Save Notification Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'security',
      label: <Space><LockOutlined />Security</Space>,
      forceRender: true,
      children: (
        <Form
          form={securityForm}
          layout="vertical"
          onFinish={handleSaveSecurity}
          style={{ maxWidth: 600 }}
        >
          <Card size="small" title="Rate Limiting" style={{ marginBottom: 16 }}>
            <Form.Item
              name="rateLimitPerMinute"
              label="Max Requests Per Minute"
              rules={[{ required: true, message: 'Required' }]}
              extra="Maximum API requests allowed per IP per minute"
            >
              <Space.Compact><InputNumber min={10} max={1000} style={{ width: 160 }} /><Button disabled style={{ pointerEvents: 'none' }}>req/min</Button></Space.Compact>
            </Form.Item>
          </Card>

          <Card size="small" title="Session Management" style={{ marginBottom: 16 }}>
            <Form.Item
              name="tokenExpiryHours"
              label="Access Token Expiry"
              rules={[{ required: true, message: 'Required' }]}
              extra="How long before an admin access token expires"
            >
              <Space.Compact><InputNumber min={1} max={72} style={{ width: 160 }} /><Button disabled style={{ pointerEvents: 'none' }}>hours</Button></Space.Compact>
            </Form.Item>

            <Form.Item
              name="refreshTokenExpiryDays"
              label="Refresh Token Expiry"
              rules={[{ required: true, message: 'Required' }]}
              extra="How long before a refresh token expires and user must re-login"
            >
              <Space.Compact><InputNumber min={1} max={90} style={{ width: 160 }} /><Button disabled style={{ pointerEvents: 'none' }}>days</Button></Space.Compact>
            </Form.Item>
          </Card>

          <Card size="small" title="File Upload Limits" style={{ marginBottom: 16 }}>
            <Form.Item
              name="maxPhotoSizeMB"
              label="Max Photo Size"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Space.Compact><InputNumber min={1} max={50} style={{ width: 160 }} /><Button disabled style={{ pointerEvents: 'none' }}>MB</Button></Space.Compact>
            </Form.Item>

            <Form.Item
              name="maxAvatarSizeMB"
              label="Max Avatar Size"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Space.Compact><InputNumber min={1} max={20} style={{ width: 160 }} /><Button disabled style={{ pointerEvents: 'none' }}>MB</Button></Space.Compact>
            </Form.Item>

            <Form.Item
              name="allowedFileTypes"
              label="Allowed File Types"
              rules={[{ required: true, message: 'Required' }]}
              extra="Comma-separated list of allowed image types"
            >
              <Input placeholder="jpeg, png, webp" />
            </Form.Item>
          </Card>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={savingSecurity}>
              Save Security Settings
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Settings</Title>
          <Text type="secondary">Manage application configuration, notifications, and security</Text>
        </div>
        <Button icon={<ReloadOutlined />} onClick={fetchSettings}>Refresh</Button>
      </div>
      <Card>
        <Tabs items={items} />
      </Card>
    </Space>
  );
};

export default SettingsPage;
