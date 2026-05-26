import { useState } from 'react';
import { Button, Popconfirm, Select, Space, Switch, Tag, Typography, message } from 'antd';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';
import { formatDate } from '@/utils/format';

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  endpoint: string;
  message: string;
  stack?: string;
}

export function ErrorLogs() {
  const [levelFilter, setLevelFilter] = useState<string | undefined>(undefined);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const url = levelFilter
    ? `/admin/system/error-logs?level=${levelFilter}`
    : '/admin/system/error-logs';

  const { data, isLoading, refetch } = useApiQuery<ErrorLog[]>(
    ['error-logs', levelFilter || 'all'],
    url,
    { refetchInterval: autoRefresh ? 10000 : false },
  );

  const clearMutation = useApiMutation<void, void>('/admin/system/error-logs/clear', 'delete', {
    onSuccess: () => {
      message.success('Old logs cleared');
      refetch();
    },
  });

  const levelColors: Record<string, string> = {
    error: 'red',
    warn: 'orange',
    info: 'blue',
  };

  const columns: ProColumns<ErrorLog>[] = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      width: 180,
      render: (_, r) => (
        <Typography.Text style={{ fontSize: 12 }}>{formatDate(r.timestamp)}</Typography.Text>
      ),
      sorter: (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      width: 80,
      render: (_, r) => <Tag color={levelColors[r.level]}>{r.level.toUpperCase()}</Tag>,
    },
    {
      title: 'Endpoint',
      dataIndex: 'endpoint',
      width: 200,
      ellipsis: true,
      render: (_, r) => <Typography.Text code>{r.endpoint}</Typography.Text>,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      ellipsis: true,
    },
  ];

  return (
    <ProTable<ErrorLog>
      columns={columns}
      dataSource={data || []}
      loading={isLoading}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 50 }}
      expandable={{
        expandedRowRender: (record) =>
          record.stack ? (
            <pre
              style={{
                margin: 0,
                padding: 12,
                background: '#f5f5f5',
                borderRadius: 4,
                fontSize: 11,
                overflow: 'auto',
                maxHeight: 200,
              }}
            >
              {record.stack}
            </pre>
          ) : (
            <Typography.Text type="secondary">No stack trace available</Typography.Text>
          ),
      }}
      headerTitle={
        <Space>
          <Select
            value={levelFilter}
            onChange={setLevelFilter}
            allowClear
            placeholder="Filter by level"
            style={{ width: 150 }}
            options={[
              { label: 'Error', value: 'error' },
              { label: 'Warning', value: 'warn' },
              { label: 'Info', value: 'info' },
            ]}
          />
          <Space size={4}>
            <Switch size="small" checked={autoRefresh} onChange={setAutoRefresh} />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Auto-refresh
            </Typography.Text>
          </Space>
        </Space>
      }
      toolBarRender={() => [
        <Button key="refresh" icon={<ReloadOutlined />} onClick={() => refetch()}>
          Refresh
        </Button>,
        <Popconfirm
          key="clear"
          title="Clear logs older than 7 days?"
          onConfirm={() => clearMutation.mutate(undefined as never)}
        >
          <Button icon={<DeleteOutlined />} danger>
            Clear Old Logs
          </Button>
        </Popconfirm>,
      ]}
    />
  );
}
