import { Card, Tabs } from 'antd';
import { BroadcastForm } from './components/BroadcastForm';
import { NotificationLog } from './components/NotificationLog';
import { useApiQuery } from '@/hooks/useApiQuery';
import type { PaginatedResponse } from '@/types/common';
import type { NotificationLogEntry } from '@/services/notifications.service';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Popconfirm, Tag, message } from 'antd';
import { useApiMutation } from '@/hooks/useApiQuery';
import { formatDate } from '@/utils/format';

export default function NotificationsPage() {
  const scheduledQuery = useApiQuery<PaginatedResponse<NotificationLogEntry>>(
    'notifications-scheduled',
    '/admin/notifications?status=scheduled',
  );

  const cancelMutation = useApiMutation<void, { id: string }>(
    '/admin/notifications/cancel',
    'post',
    {
      onSuccess: () => {
        message.success('Notification cancelled');
        scheduledQuery.refetch();
      },
    },
  );

  const scheduledColumns: ProColumns<NotificationLogEntry>[] = [
    { title: 'Title', dataIndex: 'title', ellipsis: true },
    { title: 'Target', dataIndex: 'target' },
    {
      title: 'Scheduled For',
      dataIndex: 'scheduledAt',
      render: (_, r) => formatDate(r.scheduledAt || ''),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => <Tag color="blue">Scheduled</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Cancel this notification?"
          onConfirm={() => cancelMutation.mutate({ id: record.id })}
        >
          <Button size="small" danger>
            Cancel
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="Notifications Management">
      <Tabs
        items={[
          {
            key: 'compose',
            label: 'Compose',
            children: <BroadcastForm />,
          },
          {
            key: 'log',
            label: 'Log',
            children: <NotificationLog />,
          },
          {
            key: 'scheduled',
            label: 'Scheduled',
            children: (
              <ProTable<NotificationLogEntry>
                columns={scheduledColumns}
                dataSource={scheduledQuery.data?.data || []}
                loading={scheduledQuery.isLoading}
                rowKey="id"
                search={false}
                pagination={{ pageSize: 10 }}
              />
            ),
          },
        ]}
      />
    </Card>
  );
}
