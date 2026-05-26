import { Card, List, Tag, Button, Space, Typography, Modal, message, Avatar } from 'antd';
import {
  WarningOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';
import { relativeTime } from '@/utils/date';

interface ContentReport {
  id: string;
  reporterName: string;
  reporterAvatar?: string;
  reportedContentId: string;
  reportedContentType: string;
  reason: string;
  description?: string;
  createdAt: string;
  status: 'pending' | 'dismissed' | 'resolved';
}

export function FlaggedContent() {
  const { data, isLoading, refetch } = useApiQuery<ContentReport[]>(
    'mating-reports',
    '/admin/mating/reports',
  );

  const dismissMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/reports/dismiss',
    'post',
    { onSuccess: () => { message.success('Report dismissed'); refetch(); } },
  );

  const removeContentMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/reports/remove-content',
    'post',
    { onSuccess: () => { message.success('Content removed'); refetch(); } },
  );

  const warnUserMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/reports/warn-user',
    'post',
    { onSuccess: () => { message.success('User warned'); refetch(); } },
  );

  const banUserMutation = useApiMutation<void, { id: string }>(
    '/admin/mating/reports/ban-user',
    'post',
    { onSuccess: () => { message.success('User banned'); refetch(); } },
  );

  const handleBan = (report: ContentReport) => {
    Modal.confirm({
      title: 'Ban User',
      content: 'Are you sure you want to ban this user? This will prevent them from accessing the mating feature.',
      okText: 'Ban',
      okButtonProps: { danger: true },
      onOk: () => banUserMutation.mutate({ id: report.id }),
    });
  };

  const statusColor: Record<string, string> = {
    pending: 'orange',
    dismissed: 'default',
    resolved: 'green',
  };

  return (
    <Card
      title={
        <Space>
          <WarningOutlined style={{ color: '#fa8c16' }} />
          <span>Content Reports</span>
        </Space>
      }
      style={{ marginTop: 24 }}
    >
      <List
        loading={isLoading}
        dataSource={data || []}
        locale={{ emptyText: 'No pending reports' }}
        renderItem={(report) => (
          <List.Item
            actions={[
              <Button
                key="dismiss"
                size="small"
                icon={<CloseCircleOutlined />}
                onClick={() => dismissMutation.mutate({ id: report.id })}
                disabled={report.status !== 'pending'}
              >
                Dismiss
              </Button>,
              <Button
                key="remove"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={() => removeContentMutation.mutate({ id: report.id })}
                disabled={report.status !== 'pending'}
              >
                Remove Content
              </Button>,
              <Button
                key="warn"
                size="small"
                style={{ color: '#fa8c16', borderColor: '#fa8c16' }}
                icon={<WarningOutlined />}
                onClick={() => warnUserMutation.mutate({ id: report.id })}
                disabled={report.status !== 'pending'}
              >
                Warn User
              </Button>,
              <Button
                key="ban"
                size="small"
                danger
                type="primary"
                icon={<StopOutlined />}
                onClick={() => handleBan(report)}
                disabled={report.status !== 'pending'}
              >
                Ban User
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={report.reporterAvatar}>{report.reporterName[0]}</Avatar>}
              title={
                <Space>
                  <Typography.Text strong>{report.reporterName}</Typography.Text>
                  <Tag color={statusColor[report.status]}>{report.status}</Tag>
                </Space>
              }
              description={
                <Space direction="vertical" size={2}>
                  <Typography.Text type="secondary">
                    Reason: {report.reason}
                  </Typography.Text>
                  {report.description && (
                    <Typography.Text type="secondary" italic>
                      {report.description}
                    </Typography.Text>
                  )}
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Reported {relativeTime(report.createdAt)}
                  </Typography.Text>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
