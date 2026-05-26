import { Tag, Typography } from 'antd';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { useApiQuery } from '@/hooks/useApiQuery';
import { formatDate, formatPercent } from '@/utils/format';
import type { PaginatedResponse } from '@/types/common';
import type { NotificationLogEntry } from '@/services/notifications.service';

export function NotificationLog() {
  const { data, isLoading } = useApiQuery<PaginatedResponse<NotificationLogEntry>>(
    'notifications-log',
    '/admin/notifications?status=sent',
  );

  const columns: ProColumns<NotificationLogEntry>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      ellipsis: true,
      width: 240,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      width: 120,
      render: (_, record) => <Tag>{record.target}</Tag>,
    },
    {
      title: 'Sent At',
      dataIndex: 'sentAt',
      width: 160,
      render: (_, record) => formatDate(record.sentAt),
      sorter: (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime(),
    },
    {
      title: 'Delivered',
      dataIndex: 'deliveredCount',
      width: 100,
      sorter: (a, b) => a.deliveredCount - b.deliveredCount,
    },
    {
      title: 'Open Rate',
      dataIndex: 'openRate',
      width: 100,
      render: (_, record) => (
        <Tag color={record.openRate >= 0.5 ? 'green' : record.openRate >= 0.2 ? 'orange' : 'red'}>
          {formatPercent(record.openRate)}
        </Tag>
      ),
      sorter: (a, b) => a.openRate - b.openRate,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      render: (_, record) => {
        const colorMap: Record<string, string> = {
          sent: 'green',
          failed: 'red',
          cancelled: 'default',
        };
        return <Tag color={colorMap[record.status]}>{record.status}</Tag>;
      },
    },
  ];

  return (
    <ProTable<NotificationLogEntry>
      columns={columns}
      dataSource={data?.data || []}
      loading={isLoading}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 20 }}
      expandable={{
        expandedRowRender: (record) => (
          <Typography.Paragraph style={{ margin: 0, padding: '8px 16px' }}>
            {record.body}
          </Typography.Paragraph>
        ),
      }}
    />
  );
}
