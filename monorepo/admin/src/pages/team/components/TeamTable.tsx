import { Avatar, Button, Popconfirm, Select, Space, Tag } from 'antd';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { getRoleBadgeColor } from '@/utils/format';
import type { TeamMember } from '@/services/team.service';

interface TeamTableProps {
  data: TeamMember[];
  loading: boolean;
  onRemove: (id: string) => void;
  onUpdateRole: (id: string, role: string) => void;
  onDeactivate: (id: string) => void;
}

export function TeamTable({ data, loading, onRemove, onUpdateRole, onDeactivate }: TeamTableProps) {
  const columns: ProColumns<TeamMember>[] = [
    {
      title: 'Member',
      dataIndex: 'name',
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar}>{record.name?.[0]}</Avatar>
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
      copyable: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: 160,
      render: (_, record) => (
        <Select
          value={record.role}
          size="small"
          style={{ width: 140 }}
          onChange={(val) => onUpdateRole(record.id, val)}
          options={[
            { label: 'Super Admin', value: 'super_admin' },
            { label: 'Admin', value: 'admin' },
            { label: 'Moderator', value: 'moderator' },
            { label: 'Support', value: 'support' },
            { label: 'Viewer', value: 'viewer' },
          ]}
        />
      ),
      filters: [
        { text: 'Super Admin', value: 'super_admin' },
        { text: 'Admin', value: 'admin' },
        { text: 'Moderator', value: 'moderator' },
        { text: 'Support', value: 'support' },
        { text: 'Viewer', value: 'viewer' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      render: (_, record) => (
        <Tag color={record.status === 'active' ? 'green' : 'default'}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      width: 160,
      render: (_, record) => (record.lastLogin ? formatDate(record.lastLogin) : 'Never'),
      sorter: (a, b) =>
        new Date(a.lastLogin || 0).getTime() - new Date(b.lastLogin || 0).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size={4}>
          {record.status === 'active' && (
            <Popconfirm
              title="Deactivate this member?"
              onConfirm={() => onDeactivate(record.id)}
            >
              <Button size="small" icon={<StopOutlined />} style={{ color: '#faad14' }} />
            </Popconfirm>
          )}
          <Popconfirm
            title="Remove this team member?"
            description="This action cannot be undone."
            onConfirm={() => onRemove(record.id)}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<TeamMember>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 20 }}
      options={{ density: true }}
    />
  );
}
