import { useState } from 'react';
import { Card, Button, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useApiQuery } from '@/hooks/useApiQuery';
import { usePermission } from '@/hooks/usePermission';
import { TeamTable } from './components/TeamTable';
import { InviteModal } from './components/InviteModal';
import type { TeamMember } from '@/services/team.service';
import { TeamService } from '@/services/team.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const { role } = usePermission();
  const queryClient = useQueryClient();

  const { data: team, isLoading } = useApiQuery<TeamMember[]>('team', '/admin/team');

  const removeMutation = useMutation({
    mutationFn: (id: string) => TeamService.removeTeamMember(id),
    onSuccess: () => {
      message.success('Team member removed');
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role: newRole }: { id: string; role: string }) =>
      TeamService.updateTeamMember(id, { role: newRole as TeamMember['role'] }),
    onSuccess: () => {
      message.success('Role updated');
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => TeamService.updateTeamMember(id, { status: 'inactive' }),
    onSuccess: () => {
      message.success('Member deactivated');
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });

  if (role !== 'super_admin') {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: 48, color: '#999' }}>
          Only super admins can access team management.
        </div>
      </Card>
    );
  }

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card
        title="Team Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setInviteOpen(true)}
            style={{ background: '#F1379D' }}
          >
            Invite Member
          </Button>
        }
      >
        <TeamTable
          data={team || []}
          loading={isLoading}
          onRemove={(id) => removeMutation.mutate(id)}
          onUpdateRole={(id, newRole) => updateRoleMutation.mutate({ id, role: newRole })}
          onDeactivate={(id) => deactivateMutation.mutate(id)}
        />
      </Card>

      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onSuccess={() => {
          setInviteOpen(false);
          queryClient.invalidateQueries({ queryKey: ['team'] });
        }}
      />
    </Space>
  );
}
