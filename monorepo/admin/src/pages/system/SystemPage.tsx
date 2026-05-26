import { Card, Tabs } from 'antd';
import { HealthStatus } from './components/HealthStatus';
import { ErrorLogs } from './components/ErrorLogs';
import { useApiQuery } from '@/hooks/useApiQuery';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import { Tag } from 'antd';

interface ApiMetric {
  endpoint: string;
  method: string;
  avgResponseTime: number;
  p95ResponseTime: number;
  requestCount: number;
  errorRate: number;
}

function ApiMetrics() {
  const { data, isLoading } = useApiQuery<ApiMetric[]>(
    'api-metrics',
    '/admin/system/api-metrics',
  );

  const columns: ProColumns<ApiMetric>[] = [
    { title: 'Endpoint', dataIndex: 'endpoint', ellipsis: true },
    {
      title: 'Method',
      dataIndex: 'method',
      width: 80,
      render: (_, r) => <Tag>{r.method}</Tag>,
    },
    {
      title: 'Avg Response (ms)',
      dataIndex: 'avgResponseTime',
      width: 140,
      sorter: (a, b) => a.avgResponseTime - b.avgResponseTime,
      render: (_, r) => (
        <span style={{ color: r.avgResponseTime > 500 ? '#f5222d' : '#4CC287' }}>
          {r.avgResponseTime}ms
        </span>
      ),
    },
    {
      title: 'P95 (ms)',
      dataIndex: 'p95ResponseTime',
      width: 100,
      sorter: (a, b) => a.p95ResponseTime - b.p95ResponseTime,
    },
    {
      title: 'Requests',
      dataIndex: 'requestCount',
      width: 100,
      sorter: (a, b) => a.requestCount - b.requestCount,
    },
    {
      title: 'Error Rate',
      dataIndex: 'errorRate',
      width: 100,
      render: (_, r) => (
        <Tag color={r.errorRate > 5 ? 'red' : r.errorRate > 1 ? 'orange' : 'green'}>
          {r.errorRate}%
        </Tag>
      ),
      sorter: (a, b) => a.errorRate - b.errorRate,
    },
  ];

  return (
    <ProTable<ApiMetric>
      columns={columns}
      dataSource={data || []}
      loading={isLoading}
      rowKey="endpoint"
      search={false}
      pagination={{ pageSize: 20 }}
    />
  );
}

export default function SystemPage() {
  return (
    <Card title="System Monitoring">
      <Tabs
        items={[
          {
            key: 'health',
            label: 'Health',
            children: <HealthStatus />,
          },
          {
            key: 'errors',
            label: 'Error Logs',
            children: <ErrorLogs />,
          },
          {
            key: 'metrics',
            label: 'API Metrics',
            children: <ApiMetrics />,
          },
        ]}
      />
    </Card>
  );
}
