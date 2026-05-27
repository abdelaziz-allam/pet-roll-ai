import { useState, useEffect } from 'react';
import {
  Table, Card, Input, Select, Tag, Space, Button, Avatar, Typography, Modal, message,
  Form, Drawer, Descriptions, Divider, Tooltip,
} from 'antd';
import {
  SearchOutlined, UserOutlined, StopOutlined, EditOutlined, EyeOutlined,
  CheckCircleOutlined, CloseCircleOutlined, PlusOutlined,
} from '@ant-design/icons';
import { formatDate, getRoleBadgeColor, getStatusBadgeColor } from '@/utils/format';
import { usePermission } from '@/hooks/usePermission';
import { api } from '@/services/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface User {
  id: string;
  displayName: string;
  email: string;
  role: string;
  status: string;
  isVerifiedBreeder: boolean;
  createdAt: string;
  petsCount: number;
  phone?: string;
  timezone?: string;
}

const APP_USER_ROLES = [
  { value: 'user', label: 'User', description: 'Standard app user — can manage their own pets and records' },
  { value: 'moderator', label: 'Moderator', description: 'Can moderate mating listings and community content' },
  { value: 'admin', label: 'Admin', description: 'Full app-level access — can manage all users and content within the mobile app' },
];

const TIMEZONES = [
  { value: 'Pacific/Honolulu', label: '(UTC-10:00) Pacific/Honolulu' },
  { value: 'America/Anchorage', label: '(UTC-09:00) America/Anchorage' },
  { value: 'America/Los_Angeles', label: '(UTC-08:00) America/Los_Angeles' },
  { value: 'America/Denver', label: '(UTC-07:00) America/Denver' },
  { value: 'America/Chicago', label: '(UTC-06:00) America/Chicago' },
  { value: 'America/Mexico_City', label: '(UTC-06:00) America/Mexico_City' },
  { value: 'America/New_York', label: '(UTC-05:00) America/New_York' },
  { value: 'America/Toronto', label: '(UTC-05:00) America/Toronto' },
  { value: 'America/Vancouver', label: '(UTC-08:00) America/Vancouver' },
  { value: 'America/Sao_Paulo', label: '(UTC-03:00) America/Sao_Paulo' },
  { value: 'America/Argentina/Buenos_Aires', label: '(UTC-03:00) America/Argentina/Buenos_Aires' },
  { value: 'Europe/London', label: '(UTC+00:00) Europe/London' },
  { value: 'Europe/Paris', label: '(UTC+01:00) Europe/Paris' },
  { value: 'Europe/Berlin', label: '(UTC+01:00) Europe/Berlin' },
  { value: 'Europe/Madrid', label: '(UTC+01:00) Europe/Madrid' },
  { value: 'Europe/Rome', label: '(UTC+01:00) Europe/Rome' },
  { value: 'Europe/Amsterdam', label: '(UTC+01:00) Europe/Amsterdam' },
  { value: 'Europe/Istanbul', label: '(UTC+03:00) Europe/Istanbul' },
  { value: 'Europe/Moscow', label: '(UTC+03:00) Europe/Moscow' },
  { value: 'Africa/Cairo', label: '(UTC+02:00) Africa/Cairo' },
  { value: 'Africa/Lagos', label: '(UTC+01:00) Africa/Lagos' },
  { value: 'Africa/Johannesburg', label: '(UTC+02:00) Africa/Johannesburg' },
  { value: 'Africa/Nairobi', label: '(UTC+03:00) Africa/Nairobi' },
  { value: 'Asia/Dubai', label: '(UTC+04:00) Asia/Dubai' },
  { value: 'Asia/Riyadh', label: '(UTC+03:00) Asia/Riyadh' },
  { value: 'Asia/Kolkata', label: '(UTC+05:30) Asia/Kolkata' },
  { value: 'Asia/Bangkok', label: '(UTC+07:00) Asia/Bangkok' },
  { value: 'Asia/Singapore', label: '(UTC+08:00) Asia/Singapore' },
  { value: 'Asia/Shanghai', label: '(UTC+08:00) Asia/Shanghai' },
  { value: 'Asia/Hong_Kong', label: '(UTC+08:00) Asia/Hong_Kong' },
  { value: 'Asia/Tokyo', label: '(UTC+09:00) Asia/Tokyo' },
  { value: 'Asia/Seoul', label: '(UTC+09:00) Asia/Seoul' },
  { value: 'Australia/Sydney', label: '(UTC+11:00) Australia/Sydney' },
  { value: 'Australia/Melbourne', label: '(UTC+11:00) Australia/Melbourne' },
  { value: 'Pacific/Auckland', label: '(UTC+12:00) Pacific/Auckland' },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [editForm] = Form.useForm();
  const [createForm] = Form.useForm();
  const { canPerformAction } = usePermission();

  const canCreate = canPerformAction('app_users', 'create');
  const canEdit = canPerformAction('app_users', 'edit');
  const canBan = canPerformAction('app_users', 'ban');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ data: User[]; total: number }>('/admin/users?limit=100');
      setUsers(res.data);
    } catch (err: any) {
      message.error(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users.filter((u) => {
    const matchSearch = !search || u.displayName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || u.status === statusFilter;
    const matchRole = !roleFilter || u.role === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const handleView = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    editForm.setFieldsValue({
      displayName: user.displayName,
      email: user.email,
      phone: user.phone || '',
      timezone: user.timezone || '',
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await editForm.validateFields();
      await api.put(`/admin/users/${selectedUser!.id}`, {
        displayName: values.displayName,
        phone: values.phone || null,
        timezone: values.timezone || null,
      });
      message.success('User updated successfully');
      setEditModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to update user');
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const values = await createForm.validateFields();
      await api.post('/admin/users', {
        displayName: values.displayName,
        email: values.email,
        role: values.role || 'user',
        phone: values.phone || null,
        timezone: values.timezone || null,
      });
      message.success('User created successfully');
      setCreateModalOpen(false);
      createForm.resetFields();
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to create user');
    }
  };

  const handleRoleChange = (user: User) => {
    setSelectedUser(user);
    setRoleModalOpen(true);
  };

  const handleRoleSubmit = async (newRole: string) => {
    try {
      await api.put(`/admin/users/${selectedUser!.id}/role`, { role: newRole });
      message.success(`Role changed to ${newRole}`);
      setRoleModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to change role');
    }
  };

  const handleBan = (user: User) => {
    Modal.confirm({
      title: `Ban ${user.displayName}?`,
      content: 'This will prevent the user from accessing the platform. They can be unbanned later.',
      okText: 'Ban User',
      okType: 'danger',
      onOk: async () => {
        try {
          await api.put(`/admin/users/${user.id}/ban`, { reason: 'Banned by admin' });
          message.success(`${user.displayName} has been banned`);
          fetchUsers();
        } catch (err: any) {
          message.error(err.message || 'Failed to ban user');
        }
      },
    });
  };

  const handleUnban = async (user: User) => {
    try {
      await api.put(`/admin/users/${user.id}/unban`, {});
      message.success(`${user.displayName} has been unbanned`);
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to unban user');
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_: any, record: User) => (
        <Space>
          <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#F1379D' }} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.displayName}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, record: User) => (
        <Tooltip title={canEdit ? 'Click to change role' : ''}>
          <Tag
            color={getRoleBadgeColor(role)}
            style={canEdit ? { cursor: 'pointer' } : {}}
            onClick={canEdit ? () => handleRoleChange(record) : undefined}
          >
            {role}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={getStatusBadgeColor(status)}>{status}</Tag>,
    },
    {
      title: 'Verified Breeder',
      dataIndex: 'isVerifiedBreeder',
      key: 'verified',
      render: (v: boolean) => v
        ? <Tag icon={<CheckCircleOutlined />} color="green">Verified</Tag>
        : <Tag icon={<CloseCircleOutlined />} color="default">No</Tag>,
    },
    {
      title: 'Pets',
      dataIndex: 'petsCount',
      key: 'pets',
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'joined',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Tooltip title="View details">
            <Button size="small" type="text" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          {canEdit && (
            <Tooltip title="Edit user">
              <Button size="small" type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            </Tooltip>
          )}
          {canBan && record.status === 'active' && (
            <Button size="small" danger icon={<StopOutlined />} onClick={() => handleBan(record)}>
              Ban
            </Button>
          )}
          {canBan && record.status === 'banned' && (
            <Button size="small" type="primary" ghost onClick={() => handleUnban(record)}>
              Unban
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>App Users</Title>
          <Text type="secondary">Manage application users (pet owners, breeders)</Text>
        </div>
        {canCreate && (
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { createForm.resetFields(); setCreateModalOpen(true); }}>
            Create User
          </Button>
        )}
      </div>

      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space wrap>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 250 }}
            />
            <Select placeholder="Status" allowClear value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}>
              <Option value="active">Active</Option>
              <Option value="banned">Banned</Option>
              <Option value="deleted">Deleted</Option>
            </Select>
            <Select placeholder="Role" allowClear value={roleFilter} onChange={setRoleFilter} style={{ width: 130 }}>
              <Option value="user">User</Option>
              <Option value="moderator">Moderator</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Space>
        </div>

        <Card size="small" style={{ marginBottom: 16, background: '#f9f9f9' }}>
          <Title level={5} style={{ margin: '0 0 8px' }}>Role Descriptions</Title>
          <Space direction="vertical" size={4}>
            {APP_USER_ROLES.map(r => (
              <div key={r.value}>
                <Tag color={getRoleBadgeColor(r.value)}>{r.label}</Tag>
                <Text type="secondary" style={{ fontSize: 13 }}>{r.description}</Text>
              </div>
            ))}
          </Space>
        </Card>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showTotal: (total) => `${total} users` }}
        />
      </Card>

      {/* View User Drawer */}
      <Drawer
        title="User Details"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={480}
      >
        {selectedUser && (
          <>
            <Space direction="vertical" align="center" style={{ width: '100%', marginBottom: 24 }}>
              <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#F1379D' }} />
              <Title level={5} style={{ margin: '8px 0 0' }}>{selectedUser.displayName}</Title>
              <Text type="secondary">{selectedUser.email}</Text>
              <Space>
                <Tag color={getRoleBadgeColor(selectedUser.role)}>{selectedUser.role}</Tag>
                <Tag color={getStatusBadgeColor(selectedUser.status)}>{selectedUser.status}</Tag>
              </Space>
            </Space>
            <Divider />
            <Descriptions column={1} size="small">
              <Descriptions.Item label="User ID">{selectedUser.id}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedUser.phone || '—'}</Descriptions.Item>
              <Descriptions.Item label="Timezone">{selectedUser.timezone || '—'}</Descriptions.Item>
              <Descriptions.Item label="Pets">{selectedUser.petsCount}</Descriptions.Item>
              <Descriptions.Item label="Verified Breeder">
                {selectedUser.isVerifiedBreeder ? 'Yes' : 'No'}
              </Descriptions.Item>
              <Descriptions.Item label="Joined">{formatDate(selectedUser.createdAt)}</Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Drawer>

      {/* Create User Modal */}
      <Modal
        title="Create New App User"
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onOk={handleCreateSubmit}
        okText="Create User"
      >
        <Form form={createForm} layout="vertical" style={{ marginTop: 16 }}>
          <Card size="small" style={{ marginBottom: 16, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              App users authenticate via <strong>Firebase Auth</strong> (Google, Apple, Phone OTP) through the mobile app.
              No password is needed — this form creates their profile record.
            </Text>
          </Card>
          <Form.Item name="displayName" label="Display Name" rules={[{ required: true, message: 'Name is required' }]}>
            <Input placeholder="John Smith" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email is required' }]}>
            <Input placeholder="user@example.com" />
          </Form.Item>
          <Form.Item name="role" label="Role" initialValue="user">
            <Select>
              {APP_USER_ROLES.map(r => (
                <Option key={r.value} value={r.value}>{r.label} — {r.description}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="+1234567890" />
          </Form.Item>
          <Form.Item name="timezone" label="Timezone">
            <Select
              showSearch
              allowClear
              placeholder="Select timezone"
              optionFilterProp="label"
              options={TIMEZONES}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User Details"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={handleEditSubmit}
        okText="Save Changes"
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="displayName" label="Display Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="+1234567890" />
          </Form.Item>
          <Form.Item name="timezone" label="Timezone">
            <Select
              showSearch
              allowClear
              placeholder="Select timezone"
              optionFilterProp="label"
              options={TIMEZONES}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Role Modal */}
      <Modal
        title={`Change Role — ${selectedUser?.displayName}`}
        open={roleModalOpen}
        onCancel={() => setRoleModalOpen(false)}
        footer={null}
      >
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          Select a new role for this user. This affects what they can do within the mobile app.
        </Text>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          {APP_USER_ROLES.map((r) => (
            <Card
              key={r.value}
              size="small"
              hoverable
              style={{
                border: selectedUser?.role === r.value ? '2px solid #F1379D' : '1px solid #f0f0f0',
                cursor: 'pointer',
              }}
              onClick={() => handleRoleSubmit(r.value)}
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <Tag color={getRoleBadgeColor(r.value)}>{r.label}</Tag>
                  {selectedUser?.role === r.value && <Tag color="pink">Current</Tag>}
                </Space>
                <Text type="secondary" style={{ fontSize: 13 }}>{r.description}</Text>
              </Space>
            </Card>
          ))}
        </Space>
      </Modal>
    </Space>
  );
};

export default UsersPage;
