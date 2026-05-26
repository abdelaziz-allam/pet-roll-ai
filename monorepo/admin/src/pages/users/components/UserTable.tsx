import { Avatar, Tag, Badge, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, StopOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import type { User } from '@/types/user';
import { usePermission } from '@/hooks/usePermission';
import { relativeTime } from '@/utils/date';
import { getRoleBadgeColor, getStatusBadgeColor } from '@/utils/format';

interface UserTableProps {
  data: User[];
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
  onPageChange: (page: number, pageSize: number) => void;
  onView: (user: User) => void;
  onBan: (user: User) => void;
  onRoleChange: (user: User) => void;
  onDelete: (user: User) => void;
  rowSelection?: {
    selectedRowKeys: React.Key[];
    onChange: (keys: React.Key[]) => void;
  };
}

export default function UserTable({
  data,
  loading,
  pagination,
  onPageChange,
  onView,
  onBan,
  onRoleChange,
  onDelete,
  rowSelection,
}: UserTableProps) {
  const { can } = usePermission();

  const columns: ProColumns<User>[] = [
    {
      title: 'User',
      dataIndex: 'displayName',
      render: (_, record) => (
        <Space>
          <Avatar src={undefined} style={{ backgroundColor: '#F1379D' }}>
            {record.displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          <span>{record.displayName}</span>
        </Space>
      ),
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      copyable: true,
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (_, record) => (
        <Tag color={getRoleBadgeColor(record.role)}>{record.role}</Tag>
      ),
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => (
        <Badge
          status={getStatusBadgeColor(record.status) as 'success' | 'error' | 'warning' | 'default'}
          text={record.status}
        />
      ),
    },
    {
      title: 'Verified Breeder',
      dataIndex: 'isVerifiedBreeder',
      render: (_, record) =>
        record.isVerifiedBreeder ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Tag>No</Tag>
        ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      render: (_, record) => relativeTime(record.createdAt),
      sorter: true,
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View">
            <Button type="text" size="small" icon={<EyeOutlined />} onClick={() => onView(record)} />
          </Tooltip>
          {can('user_edit') && (
            <Tooltip title="Change Role">
              <Button type="text" size="small" icon={<EditOutlined />} onClick={() => onRoleChange(record)} />
            </Tooltip>
          )}
          {can('user_edit') && (
            <Tooltip title={record.status === 'banned' ? 'Unban' : 'Ban'}>
              <Button
                type="text"
                size="small"
                danger={record.status !== 'banned'}
                icon={<StopOutlined />}
                onClick={() => onBan(record)}
              />
            </Tooltip>
          )}
          {can('user_delete') && (
            <Tooltip title="Delete">
              <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ProTable<User>
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      search={false}
      options={false}
      pagination={{
        ...pagination,
        onChange: onPageChange,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} users`,
      }}
      rowSelection={rowSelection}
    />
  );
}
