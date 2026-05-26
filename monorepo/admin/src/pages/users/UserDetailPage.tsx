import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  Avatar,
  Tag,
  Badge,
  Button,
  Space,
  Row,
  Col,
  Tabs,
  Descriptions,
  Statistic,
  Skeleton,
  Modal,
  message,
  Table,
  Timeline,
  Select,
} from 'antd';
import {
  ArrowLeftOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserById, deleteUser, updateUserRole } from '@/services/users.service';
import { usePermission } from '@/hooks/usePermission';
import type { AdminRole } from '@/types/common';
import { formatDate } from '@/utils/format';
import { relativeTime } from '@/utils/date';
import { getRoleBadgeColor, getStatusBadgeColor } from '@/utils/format';
import BanUserModal from './components/BanUserModal';

const { Title } = Typography;

const roleOptions: AdminRole[] = ['super_admin', 'admin', 'moderator', 'support', 'viewer'];

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { can, role: currentUserRole } = usePermission();
  const queryClient = useQueryClient();
  const [banModalOpen, setBanModalOpen] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(id!),
    onSuccess: () => {
      message.success('User deleted successfully');
      navigate('/users');
    },
    onError: () => {
      message.error('Failed to delete user');
    },
  });

  const roleChangeMutation = useMutation({
    mutationFn: (newRole: string) => updateUserRole(id!, newRole),
    onSuccess: () => {
      message.success('Role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
    onError: () => {
      message.error('Failed to update role');
    },
  });

  const handleDelete = () => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to permanently delete "${user?.displayName}"? This action cannot be undone.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      onOk: () => deleteMutation.mutateAsync(),
    });
  };

  const currentRoleIndex = roleOptions.indexOf(currentUserRole as AdminRole);
  const assignableRoles = roleOptions.filter((_, i) => i > currentRoleIndex);

  if (isLoading) {
    return (
      <div style={{ padding: 24 }}>
        <Skeleton active avatar paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/users')}>
          Back to Users
        </Button>
        <Card style={{ marginTop: 16 }}>User not found.</Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 24 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/users')}>
          Back to Users
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar size={80} style={{ backgroundColor: '#F1379D', fontSize: 32 }}>
                {user.displayName?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Title level={4} style={{ marginTop: 12, marginBottom: 4 }}>
                {user.displayName}
              </Title>
              <p style={{ color: '#8c8c8c', margin: 0 }}>{user.email}</p>
            </div>

            <Descriptions column={1} size="small">
              <Descriptions.Item label="Role">
                {can('user_edit') ? (
                  <Select
                    value={user.role}
                    size="small"
                    style={{ width: 140 }}
                    onChange={(value) => roleChangeMutation.mutate(value)}
                    loading={roleChangeMutation.isPending}
                    options={assignableRoles.map((r) => ({
                      label: r.replace('_', ' ').toUpperCase(),
                      value: r,
                    }))}
                  />
                ) : (
                  <Tag color={getRoleBadgeColor(user.role)}>{user.role}</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge
                  status={getStatusBadgeColor(user.status) as 'success' | 'error' | 'warning' | 'default'}
                  text={user.status}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Verified Breeder">
                {user.isVerifiedBreeder ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Verified
                  </Tag>
                ) : (
                  <Tag>Not Verified</Tag>
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Timezone">{user.timezone || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Joined">{formatDate(user.createdAt)}</Descriptions.Item>
              <Descriptions.Item label="Last Updated">{relativeTime(user.updatedAt)}</Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: 24, width: '100%' }} direction="vertical">
              {can('user_edit') && (
                <Button
                  block
                  danger={user.status !== 'banned'}
                  icon={<StopOutlined />}
                  onClick={() => setBanModalOpen(true)}
                >
                  {user.status === 'banned' ? 'Unban User' : 'Ban User'}
                </Button>
              )}
              {can('user_delete') && (
                <Button block danger icon={<DeleteOutlined />} onClick={handleDelete}>
                  Delete User
                </Button>
              )}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Pets" value={0} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Health Records" value={0} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Vaccinations" value={0} />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card>
                <Statistic title="Mating Listings" value={0} />
              </Card>
            </Col>
          </Row>

          <Card>
            <Tabs
              items={[
                {
                  key: 'pets',
                  label: 'Pets',
                  children: (
                    <Table
                      dataSource={[]}
                      columns={[
                        { title: 'Name', dataIndex: 'name' },
                        { title: 'Species', dataIndex: 'species' },
                        { title: 'Breed', dataIndex: 'breed' },
                        { title: 'Status', dataIndex: 'status' },
                      ]}
                      rowKey="id"
                      locale={{ emptyText: 'No pets found' }}
                    />
                  ),
                },
                {
                  key: 'activity',
                  label: 'Activity',
                  children: (
                    <Timeline
                      items={[
                        { children: 'No recent activity' },
                      ]}
                    />
                  ),
                },
                {
                  key: 'listings',
                  label: 'Mating Listings',
                  children: (
                    <Table
                      dataSource={[]}
                      columns={[
                        { title: 'Pet', dataIndex: 'petName' },
                        { title: 'Status', dataIndex: 'status' },
                        { title: 'Created', dataIndex: 'createdAt' },
                      ]}
                      rowKey="id"
                      locale={{ emptyText: 'No listings found' }}
                    />
                  ),
                },
                {
                  key: 'settings',
                  label: 'Settings',
                  children: (
                    <Descriptions column={1}>
                      {Object.entries(user.settings || {}).map(([key, value]) => (
                        <Descriptions.Item key={key} label={key}>
                          {String(value)}
                        </Descriptions.Item>
                      ))}
                    </Descriptions>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <BanUserModal
        open={banModalOpen}
        user={user}
        onClose={() => setBanModalOpen(false)}
      />
    </div>
  );
}
