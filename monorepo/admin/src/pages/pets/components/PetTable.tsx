import { Avatar, Tag, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import type { PetWithOwner } from '@/services/pets.service';
import { formatDate } from '@/utils/format';

const speciesIcons: Record<string, string> = {
  dog: '🐕',
  cat: '🐈',
  bird: '🐦',
  rabbit: '🐇',
  hamster: '🐹',
  fish: '🐟',
};

const columns: ProColumns<PetWithOwner>[] = [
  {
    title: 'Photo',
    dataIndex: 'photos',
    search: false,
    width: 64,
    render: (_, record) => (
      <Avatar
        src={record.photos?.[0]}
        size={40}
        shape="square"
      >
        {record.name?.[0]}
      </Avatar>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Species',
    dataIndex: 'species',
    filters: true,
    valueEnum: {
      dog: { text: '🐕 Dog' },
      cat: { text: '🐈 Cat' },
      bird: { text: '🐦 Bird' },
      rabbit: { text: '🐇 Rabbit' },
    },
    render: (_, record) => (
      <Space>
        <span>{speciesIcons[record.species?.toLowerCase()] || '🐾'}</span>
        <span style={{ textTransform: 'capitalize' }}>{record.species}</span>
      </Space>
    ),
  },
  {
    title: 'Breed',
    dataIndex: 'breed',
    ellipsis: true,
  },
  {
    title: 'Owner',
    dataIndex: ['owner', 'displayName'],
    search: false,
    render: (_, record) =>
      record.owner ? (
        <Link to={`/users/${record.owner.id}`}>{record.owner.displayName}</Link>
      ) : (
        '-'
      ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    width: 90,
    valueEnum: {
      male: { text: 'Male' },
      female: { text: 'Female' },
    },
    render: (_, record) => (
      <Tag color={record.gender === 'male' ? 'blue' : 'pink'}>
        {record.gender}
      </Tag>
    ),
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    search: false,
    sorter: true,
    width: 100,
    render: (_, record) =>
      record.weight ? `${record.weight} ${record.weightUnit || 'kg'}` : '-',
  },
  {
    title: 'Neutered',
    dataIndex: 'isNeutered',
    search: false,
    width: 90,
    render: (_, record) => (
      <Tag color={record.isNeutered ? 'green' : 'default'}>
        {record.isNeutered ? 'Yes' : 'No'}
      </Tag>
    ),
  },
  {
    title: 'Mating',
    dataIndex: 'isAvailableForMating',
    search: false,
    width: 90,
    render: (_, record) => (
      <Tag color={record.isAvailableForMating ? 'purple' : 'default'}>
        {record.isAvailableForMating ? 'Available' : 'N/A'}
      </Tag>
    ),
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    search: false,
    sorter: true,
    width: 120,
    render: (_, record) => formatDate(record.createdAt),
  },
];

interface PetTableProps {
  data: PetWithOwner[];
  loading?: boolean;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onRowClick?: (record: PetWithOwner) => void;
  headerTitle?: string;
  toolBarRender?: () => React.ReactNode[];
}

export default function PetTable({
  data,
  loading,
  total,
  onPageChange,
  onRowClick,
  headerTitle = 'Pets',
  toolBarRender,
}: PetTableProps) {
  return (
    <ProTable<PetWithOwner>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      headerTitle={headerTitle}
      toolBarRender={toolBarRender ? () => toolBarRender() : undefined}
      search={false}
      pagination={{
        total,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: onPageChange,
      }}
      onRow={(record) => ({
        onClick: () => onRowClick?.(record),
        style: { cursor: onRowClick ? 'pointer' : 'default' },
      })}
      options={{
        density: true,
        reload: false,
      }}
    />
  );
}
