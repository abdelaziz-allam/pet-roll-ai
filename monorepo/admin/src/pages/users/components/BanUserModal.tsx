import { useState } from 'react';
import { Modal, Input, Alert, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { banUser, unbanUser } from '@/services/users.service';
import type { User } from '@/types/user';

interface BanUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export default function BanUserModal({ open, user, onClose }: BanUserModalProps) {
  const [reason, setReason] = useState('');
  const queryClient = useQueryClient();
  const isBanned = user?.status === 'banned';

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user) return;
      if (isBanned) {
        await unbanUser(user.id);
      } else {
        await banUser(user.id, reason || undefined);
      }
    },
    onSuccess: () => {
      message.success(isBanned ? 'User unbanned successfully' : 'User banned successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      handleClose();
    },
    onError: () => {
      message.error('Failed to update user status');
    },
  });

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal
      title={isBanned ? 'Unban User' : 'Ban User'}
      open={open}
      onOk={() => mutation.mutate()}
      onCancel={handleClose}
      confirmLoading={mutation.isPending}
      okText={isBanned ? 'Unban' : 'Ban'}
      okButtonProps={{ danger: !isBanned }}
    >
      {user && (
        <>
          <p>
            {isBanned
              ? `Are you sure you want to unban "${user.displayName}"?`
              : `Are you sure you want to ban "${user.displayName}"?`}
          </p>

          {!isBanned && (
            <>
              <Alert
                type="warning"
                message="This will prevent the user from accessing the platform. They will be logged out immediately."
                style={{ marginBottom: 16 }}
              />
              <Input.TextArea
                placeholder="Reason for ban (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </>
          )}
        </>
      )}
    </Modal>
  );
}
