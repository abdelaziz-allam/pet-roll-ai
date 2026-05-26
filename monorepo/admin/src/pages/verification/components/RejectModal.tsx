import { Modal, Input, Space, Typography, Avatar, Alert } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VerificationService, type Verification } from '@/services/verification.service';

const { Text } = Typography;

interface RejectModalProps {
  open: boolean;
  verification: Verification | null;
  onClose: () => void;
}

export default function RejectModal({ open, verification, onClose }: RejectModalProps) {
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => VerificationService.rejectVerification(verification!.id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      setReason('');
      onClose();
    },
  });

  const handleOk = () => {
    if (!verification || !reason.trim()) return;
    mutation.mutate();
  };

  return (
    <Modal
      title="Reject Application"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okText="Confirm Rejection"
      okButtonProps={{ danger: true, disabled: !reason.trim() }}
      confirmLoading={mutation.isPending}
    >
      {verification && (
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Space>
            <Avatar src={verification.userAvatar} icon={<UserOutlined />} />
            <div>
              <Text strong>{verification.userName}</Text>
              <br />
              <Text type="secondary">{verification.userEmail}</Text>
            </div>
          </Space>
          <Alert
            type="warning"
            message="The user will be notified of this rejection with the reason you provide."
            showIcon
          />
          <Input.TextArea
            rows={4}
            placeholder="Reason for rejection (required, sent to user)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            status={reason.trim() ? undefined : 'error'}
          />
        </Space>
      )}
    </Modal>
  );
}
