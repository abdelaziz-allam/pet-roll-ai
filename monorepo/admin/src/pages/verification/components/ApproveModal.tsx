import { Modal, Input, Space, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VerificationService, type Verification } from '@/services/verification.service';

const { Text } = Typography;

interface ApproveModalProps {
  open: boolean;
  verification: Verification | null;
  onClose: () => void;
}

export default function ApproveModal({ open, verification, onClose }: ApproveModalProps) {
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => VerificationService.approveVerification(verification!.id, notes || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verifications'] });
      setNotes('');
      onClose();
    },
  });

  const handleOk = () => {
    if (!verification) return;
    mutation.mutate();
  };

  return (
    <Modal
      title="Approve Breeder"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okText="Confirm Approval"
      okButtonProps={{ style: { backgroundColor: '#52c41a', borderColor: '#52c41a' } }}
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
          <Input.TextArea
            rows={3}
            placeholder="Optional notes (not sent to user)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Space>
      )}
    </Modal>
  );
}
