import { useEffect } from 'react';
import { Form, Input, Switch, Button, Alert, Divider, message, Space } from 'antd';
import { SaveOutlined, WarningOutlined } from '@ant-design/icons';
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';

interface AppConfig {
  appName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  minAppVersion: string;
  features: {
    mating: boolean;
    chat: boolean;
    pregnancy: boolean;
    pdf: boolean;
  };
}

export function GeneralSettings() {
  const [form] = Form.useForm();

  const { data: config, isLoading } = useApiQuery<AppConfig>(
    'admin-config',
    '/admin/config',
  );

  const mutation = useApiMutation<void, AppConfig>('/admin/config', 'put', {
    onSuccess: () => message.success('Settings saved'),
  });

  useEffect(() => {
    if (config) {
      form.setFieldsValue(config);
    }
  }, [config, form]);

  const handleSave = (values: AppConfig) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSave}
      style={{ maxWidth: 600 }}
      initialValues={config}
    >
      <Form.Item name="appName" label="App Name">
        <Input disabled />
      </Form.Item>

      <Form.Item name="supportEmail" label="Support Email">
        <Input placeholder="support@petroll.com" />
      </Form.Item>

      <Divider />

      <Form.Item
        name="maintenanceMode"
        label="Maintenance Mode"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {form.getFieldValue('maintenanceMode') && (
        <Alert
          type="warning"
          icon={<WarningOutlined />}
          message="Maintenance mode is enabled. Users will see a maintenance screen."
          style={{ marginBottom: 16 }}
          showIcon
        />
      )}

      <Form.Item
        name="minAppVersion"
        label="Minimum App Version"
        rules={[{ pattern: /^\d+\.\d+\.\d+$/, message: 'Use semver format (e.g. 1.2.0)' }]}
      >
        <Input placeholder="1.0.0" />
      </Form.Item>

      <Divider>Feature Flags</Divider>

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <Form.Item
          name={['features', 'mating']}
          label="Mating Feature"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name={['features', 'chat']}
          label="Chat Feature"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name={['features', 'pregnancy']}
          label="Pregnancy Tracking"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name={['features', 'pdf']}
          label="PDF Reports"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
        >
          <Switch />
        </Form.Item>
      </Space>

      <Divider />

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={mutation.isPending}
          style={{ background: '#F1379D' }}
        >
          Save Settings
        </Button>
      </Form.Item>
    </Form>
  );
}
