import { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Card,
  message,
  Popconfirm,
  Tabs,
  Descriptions,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CrownOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';
import { usePermission } from '@/hooks/usePermission';

const { Title, Text } = Typography;

interface AdminUserData {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
  permissions: Record<string, { access: boolean; actions: string[] }>;
  createdAt: string;
  lastLoginAt?: string;
  createdBy?: string;
}

interface PermissionsConfig {
  pages: string[];
  actions: Record<string, string[]>;
}

const ROLE_COLORS: Record<string, string> = {
  super_admin: 'purple',
  admin: 'blue',
  moderator: 'green',
  viewer: 'default',
};

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserData | null>(null);
  const [permConfig, setPermConfig] = useState<PermissionsConfig | null>(null);
  const [form] = Form.useForm();
  const { canPerformAction } = usePermission();

  const canCreate = canPerformAction('admin_users', 'create');
  const canEdit = canPerformAction('admin_users', 'edit');
  const canDelete = canPerformAction('admin_users', 'delete');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ data: AdminUserData[] }>('/admin-auth/users');
      setUsers(res.data);
    } catch (err: any) {
      message.error(err.message || 'Failed to load admin users');
    } finally {
      setLoading(false);
    }
  };

  const fetchPermConfig = async () => {
    try {
      const res = await api.get<PermissionsConfig>('/admin-auth/permissions-config');
      setPermConfig(res);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPermConfig();
  }, []);

  const handleCreate = () => {
    setEditingUser(null);
    form.resetFields();
    form.setFieldsValue({
      role: 'admin',
      permissions: {},
    });
    setModalOpen(true);
  };

  const handleEdit = (record: AdminUserData) => {
    setEditingUser(record);
    form.setFieldsValue({
      email: record.email,
      displayName: record.displayName,
      role: record.role,
      status: record.status,
      permissions: record.permissions,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/admin-auth/users/${id}`);
      message.success('Admin user deleted');
      fetchUsers();
    } catch (err: any) {
      message.error(err.message || 'Failed to delete');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const permissions: Record<string, { access: boolean; actions: string[] }> = {};
      if (values.role !== 'super_admin' && permConfig) {
        permConfig.pages.forEach((page) => {
          const pageKey = `perm_${page}_access`;
          const actionsKey = `perm_${page}_actions`;
          permissions[page] = {
            access: values[pageKey] || false,
            actions: values[actionsKey] || [],
          };
        });
      }

      const payload: any = {
        displayName: values.displayName,
        role: values.role,
        permissions,
      };

      if (editingUser) {
        if (values.status) payload.status = values.status;
        await api.put(`/admin-auth/users/${editingUser.id}`, payload);
        message.success('Admin user updated');
      } else {
        payload.email = values.email;
        payload.password = values.password;
        await api.post('/admin-auth/users', payload);
        message.success('Admin user created');
      }

      setModalOpen(false);
      fetchUsers();
    } catch (err: any) {
      if (err.message) message.error(err.message);
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_: any, record: AdminUserData) => (
        <Space>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: record.role === 'super_admin' ? '#722ed1' : '#F1379D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: 13,
          }}>
            {record.displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
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
      render: (role: string) => (
        <Tag color={ROLE_COLORS[role] || 'default'} icon={role === 'super_admin' ? <CrownOutlined /> : undefined}>
          {role.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Pages Access',
      key: 'pages',
      render: (_: any, record: AdminUserData) => {
        if (record.role === 'super_admin') return <Tag color="purple">All Pages</Tag>;
        const accessCount = Object.values(record.permissions || {}).filter(p => p.access).length;
        const total = permConfig?.pages.length || 9;
        return <Text type="secondary">{accessCount}/{total} pages</Text>;
      },
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLoginAt',
      render: (val: string) => val ? new Date(val).toLocaleDateString() : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: AdminUserData) => (
        <Space>
          {canEdit && (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
              size="small"
            />
          )}
          {canDelete && record.role !== 'super_admin' && (
            <Popconfirm
              title="Delete this admin user?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Admin Users</Title>
          <Text type="secondary">Manage administrator accounts and their permissions</Text>
        </div>
        {canCreate && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            New Admin User
          </Button>
        )}
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingUser ? 'Edit Admin User' : 'Create Admin User'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSubmit}
        width={700}
        okText={editingUser ? 'Save Changes' : 'Create User'}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Tabs
            items={[
              {
                key: 'basic',
                label: 'Basic Info',
                children: (
                  <>
                    {!editingUser && (
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email' }]}
                      >
                        <Input placeholder="admin@company.com" />
                      </Form.Item>
                    )}
                    <Form.Item
                      name="displayName"
                      label="Display Name"
                      rules={[{ required: true, min: 2 }]}
                    >
                      <Input placeholder="John Smith" />
                    </Form.Item>
                    {!editingUser && (
                      <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, min: 8 }]}
                      >
                        <Input.Password prefix={<LockOutlined />} placeholder="Min 8 characters" />
                      </Form.Item>
                    )}
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                      <Select
                        options={[
                          { value: 'super_admin', label: 'Super Admin (Full Access)' },
                          { value: 'admin', label: 'Admin' },
                          { value: 'moderator', label: 'Moderator' },
                          { value: 'viewer', label: 'Viewer (Read Only)' },
                        ]}
                      />
                    </Form.Item>
                    {editingUser && (
                      <Form.Item name="status" label="Status">
                        <Select
                          options={[
                            { value: 'active', label: 'Active' },
                            { value: 'suspended', label: 'Suspended' },
                          ]}
                        />
                      </Form.Item>
                    )}
                  </>
                ),
              },
              {
                key: 'permissions',
                label: 'Page Permissions',
                children: (
                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
                      Configure which pages this user can access and what actions they can perform.
                      Super Admin role has full access to everything.
                    </Text>
                    <Form.Item noStyle shouldUpdate={(prev, cur) => prev.role !== cur.role}>
                      {({ getFieldValue }) => {
                        const role = getFieldValue('role');
                        if (role === 'super_admin') {
                          return (
                            <Card size="small" style={{ background: '#f6f0ff' }}>
                              <Space>
                                <CrownOutlined style={{ color: '#722ed1' }} />
                                <Text>Super Admin has full access to all pages and actions</Text>
                              </Space>
                            </Card>
                          );
                        }
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {permConfig?.pages.map((page) => (
                              <Card key={page} size="small" style={{ background: '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                  <Text strong style={{ textTransform: 'capitalize' }}>
                                    {page.replace('_', ' ')}
                                  </Text>
                                  <Form.Item
                                    name={`perm_${page}_access`}
                                    valuePropName="checked"
                                    noStyle
                                    initialValue={editingUser?.permissions?.[page]?.access || false}
                                  >
                                    <Switch size="small" />
                                  </Form.Item>
                                </div>
                                <Form.Item
                                  name={`perm_${page}_actions`}
                                  noStyle
                                  initialValue={editingUser?.permissions?.[page]?.actions || []}
                                >
                                  <Select
                                    mode="multiple"
                                    size="small"
                                    placeholder="Select allowed actions"
                                    style={{ width: '100%' }}
                                    options={(permConfig?.actions[page] || []).map(a => ({
                                      value: a,
                                      label: a.charAt(0).toUpperCase() + a.slice(1),
                                    }))}
                                  />
                                </Form.Item>
                              </Card>
                            ))}
                          </div>
                        );
                      }}
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
