import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Input, Select, Space, Button, Row, Col, message, Modal } from 'antd';
import { DownloadOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, deleteUser } from '@/services/users.service';
import { usePermission } from '@/hooks/usePermission';
import { exportToCsv } from '@/utils/export';
import type { User } from '@/types/user';
import UserTable from './components/UserTable';
import BanUserModal from './components/BanUserModal';
import RoleChangeModal from './components/RoleChangeModal';

const { Title } = Typography;
const { Search } = Input;

const roleOptions = [
  { label: 'All Roles', value: '' },
  { label: 'Super Admin', value: 'super_admin' },
  { label: 'Admin', value: 'admin' },
  { label: 'Moderator', value: 'moderator' },
  { label: 'Support', value: 'support' },
  { label: 'Viewer', value: 'viewer' },
];

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Banned', value: 'banned' },
  { label: 'Inactive', value: 'inactive' },
];

export default function UsersListPage() {
  const navigate = useNavigate();
  const { can } = usePermission();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [banModalUser, setBanModalUser] = useState<User | null>(null);
  const [roleModalUser, setRoleModalUser] = useState<User | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, pageSize, search, roleFilter, statusFilter],
    queryFn: () =>
      getUsers({
        page,
        limit: pageSize,
        search: search || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      message.error('Failed to delete user');
    },
  });

  const handlePageChange = useCallback((newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  }, []);

  const handleView = useCallback(
    (user: User) => navigate(`/users/${user.id}`),
    [navigate],
  );

  const handleDelete = useCallback(
    (user: User) => {
      Modal.confirm({
        title: 'Delete User',
        content: `Are you sure you want to permanently delete "${user.displayName}"? This action cannot be undone.`,
        okText: 'Delete',
        okButtonProps: { danger: true },
        onOk: () => deleteMutation.mutateAsync(user.id),
      });
    },
    [deleteMutation],
  );

  const handleExport = useCallback(() => {
    if (data?.data) {
      exportToCsv(data.data, 'users-export');
    }
  }, [data]);

  const handleBulkBan = useCallback(() => {
    Modal.confirm({
      title: 'Bulk Ban Users',
      content: `Are you sure you want to ban ${selectedRowKeys.length} selected users?`,
      okText: 'Ban All',
      okButtonProps: { danger: true },
      onOk: () => {
        message.info('Bulk ban initiated');
        setSelectedRowKeys([]);
      },
    });
  }, [selectedRowKeys]);

  return (
    <div style={{ padding: 24 }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Users
          </Title>
        </Col>
        <Col>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>
            Export CSV
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search by name or email"
            allowClear
            onSearch={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            style={{ width: '100%' }}
            options={roleOptions}
            value={roleFilter}
            onChange={(value) => {
              setRoleFilter(value);
              setPage(1);
            }}
          />
        </Col>
        <Col xs={12} sm={6} md={4}>
          <Select
            style={{ width: '100%' }}
            options={statusOptions}
            value={statusFilter}
            onChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          />
        </Col>
      </Row>

      {selectedRowKeys.length > 0 && can('user_edit') && (
        <Space style={{ marginBottom: 16 }}>
          <span>{selectedRowKeys.length} selected</span>
          <Button danger icon={<StopOutlined />} onClick={handleBulkBan}>
            Bulk Ban
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => setSelectedRowKeys([])}>
            Clear Selection
          </Button>
        </Space>
      )}

      <UserTable
        data={data?.data ?? []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize,
          total: data?.pagination.total ?? 0,
        }}
        onPageChange={handlePageChange}
        onView={handleView}
        onBan={setBanModalUser}
        onRoleChange={setRoleModalUser}
        onDelete={handleDelete}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />

      <BanUserModal
        open={!!banModalUser}
        user={banModalUser}
        onClose={() => setBanModalUser(null)}
      />

      <RoleChangeModal
        open={!!roleModalUser}
        user={roleModalUser}
        onClose={() => setRoleModalUser(null)}
      />
    </div>
  );
}
