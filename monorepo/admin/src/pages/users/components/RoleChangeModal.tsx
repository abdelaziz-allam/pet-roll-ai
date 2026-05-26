import { useState, useEffect } from 'react';
import { Modal, Select, Space, Tag, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserRole } from '@/services/users.service';
import { usePermission } from '@/hooks/usePermission';
import type { User } from '@/types/user';
import type { AdminRole } from '@/types/common';
import { getRoleBadgeColor } from '@/utils/format';

interface RoleChangeModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

const roleHierarchy: AdminRole[] = ['super_admin', 'admin', 'moderator', 'support', 'viewer'];

export default function RoleChangeModal({ open, user, onClose }: RoleChangeModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const queryClient = useQueryClient();
  const { role: currentUserRole } = usePermission();

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  const currentUserRoleIndex = roleHierarchy.indexOf(currentUserRole as AdminRole);
  const availableRoles = roleHierarchy.filter(
    (_, index) => index > currentUserRoleIndex,
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!user || !selectedRole) return;
      await updateUserRole(user.id, selectedRole);
    },
    onSuccess: () => {
      message.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onClose();
    },
    onError: () => {
      message.error('Failed to update user role');
    },
  });

  return (
    <Modal
      title="Change User Role"
      open={open}
      onOk={() => mutation.mutate()}
      onCancel={onClose}
      confirmLoading={mutation.isPending}
      okText="Update Role"
      okButtonProps={{ disabled: selectedRole === user?.role }}
    >
      {user && (
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <span style={{ color: '#8c8c8c' }}>Current role: </span>
            <Tag color={getRoleBadgeColor(user.role)}>{user.role}</Tag>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>New Role</label>
            <Select
              value={selectedRole}
              onChange={setSelectedRole}
              style={{ width: '100%' }}
              options={availableRoles.map((role) => ({
                label: role.replace('_', ' ').toUpperCase(),
                value: role,
              }))}
            />
          </div>
        </Space>
      )}
    </Modal>
  );
}
