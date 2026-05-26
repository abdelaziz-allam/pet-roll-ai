import { Avatar, Badge, Button, Space, Tag, Tooltip } from 'antd';
import { ProTable, type ProColumns } from '@ant-design/pro-components';
import {
  PauseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/format';
import type { MatingListing } from '../MatingListingsPage';

const speciesIcons: Record<string, string> = {
  dog: '🐕',
  cat: '🐱',
  bird: '🐦',
  rabbit: '🐰',
  horse: '🐴',
  other: '🐾',
};

interface ListingTableProps {
  data: MatingListing[];
  loading: boolean;
  onSuspend?: (listing: MatingListing) => void;
  onRemove?: (listing: MatingListing) => void;
  highlighted?: boolean;
}

export function ListingTable({ data, loading, onSuspend, onRemove, highlighted }: ListingTableProps) {
  const columns: ProColumns<MatingListing>[] = [
    {
      title: 'Pet Photo',
      dataIndex: 'petPhoto',
      width: 64,
      search: false,
      render: (_, record) => <Avatar src={record.petPhoto} size={40} />,
    },
    {
      title: 'Pet Name',
      dataIndex: 'petName',
      ellipsis: true,
    },
    {
      title: 'Breed',
      dataIndex: 'breed',
      render: (_, record) => (
        <Space size={4}>
          <span>{speciesIcons[record.species]}</span>
          <span>{record.breed}</span>
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      ellipsis: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueEnum: {
        active: { text: 'Active', status: 'Success' },
        flagged: { text: 'Flagged', status: 'Warning' },
        suspended: { text: 'Suspended', status: 'Default' },
        removed: { text: 'Removed', status: 'Error' },
      },
    },
    {
      title: 'Reports',
      dataIndex: 'reportsCount',
      width: 90,
      sorter: (a, b) => a.reportsCount - b.reportsCount,
      render: (_, record) =>
        record.reportsCount > 0 ? (
          <Badge count={record.reportsCount} style={{ backgroundColor: '#f5222d' }} />
        ) : (
          <Tag color="green">0</Tag>
        ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      valueType: 'date',
      render: (_, record) => formatDate(record.createdAt),
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      search: false,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="View">
            <Link to={`/mating/${record.id}`}>
              <Button type="link" icon={<EyeOutlined />} size="small" />
            </Link>
          </Tooltip>
          {onSuspend && record.status !== 'suspended' && (
            <Tooltip title="Suspend">
              <Button
                type="link"
                icon={<PauseCircleOutlined />}
                size="small"
                style={{ color: '#faad14' }}
                onClick={() => onSuspend(record)}
              />
            </Tooltip>
          )}
          {onRemove && record.status !== 'removed' && (
            <Tooltip title="Remove">
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => onRemove(record)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <ProTable<MatingListing>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 20 }}
      rowClassName={(record) =>
        highlighted || record.status === 'flagged' ? 'flagged-row' : ''
      }
      options={{ density: true, reload: false }}
      style={{
        ...(highlighted && {
          ['--flagged-bg' as string]: '#fff2e8',
        }),
      }}
    />
  );
}
