import { Form, Input, Modal, Select, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { TeamService } from '@/services/team.service';
import type { AdminRole } from '@/types/common';

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InviteModal({ open, onClose, onSuccess }: InviteModalProps) {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (values: { email: string; role: AdminRole }) =>
      TeamService.createTeamMember(values),
    onSuccess: () => {
      message.success('Invitation sent successfully');
      form.resetFields();
      onSuccess();
    },
    onError: () => {
      message.error('Failed to send invitation');
    },
  });

  const handleOk = async () => {
    const values = await form.validateFields();
    mutation.mutate(values);
  };

  return (
    <Modal
      title="Invite Team Member"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={mutation.isPending}
      okText="Send Invitation"
      okButtonProps={{ style: { background: '#F1379D' } }}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="colleague@petroll.com" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select
            placeholder="Select a role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Moderator', value: 'moderator' },
              { label: 'Support', value: 'support' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        </Form.Item>
      </Form>

      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        An email invitation will be sent to this address with instructions to join the admin portal.
      </Typography.Text>
    </Modal>
  );
}
