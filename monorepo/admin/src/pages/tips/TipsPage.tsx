import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Space,
  Typography,
  message,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, BulbOutlined } from '@ant-design/icons';
import { api } from '@/services/api';

const { Title } = Typography;
const { TextArea } = Input;

interface Tip {
  id: string;
  title: string;
  body: string;
  category: string;
  species?: string[];
  active: boolean;
}

interface PaginatedTips {
  data: Tip[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
}

const CATEGORIES = [
  { label: 'Health', value: 'health', color: 'green' },
  { label: 'Nutrition', value: 'nutrition', color: 'orange' },
  { label: 'Grooming', value: 'grooming', color: 'blue' },
  { label: 'Training', value: 'training', color: 'purple' },
  { label: 'Safety', value: 'safety', color: 'red' },
  { label: 'General', value: 'general', color: 'default' },
];

const SPECIES_OPTIONS = [
  { label: 'Dogs', value: 'dog' },
  { label: 'Cats', value: 'cat' },
  { label: 'Birds', value: 'bird' },
  { label: 'Fish', value: 'fish' },
  { label: 'Rabbits', value: 'rabbit' },
  { label: 'Reptiles', value: 'reptile' },
];

const TipsPage: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  const fetchTips = useCallback(async () => {
    setLoading(true);
    try {
      let url = `/tips?page=${page}&limit=20`;
      if (categoryFilter) url += `&category=${categoryFilter}`;
      const result = await api.get<PaginatedTips>(url);
      setTips(result.data);
      setTotal(result.pagination.total);
    } catch (err: any) {
      message.error(err.message || 'Failed to load tips');
    } finally {
      setLoading(false);
    }
  }, [page, categoryFilter]);

  useEffect(() => {
    fetchTips();
  }, [fetchTips]);

  const openCreate = () => {
    setEditingTip(null);
    form.resetFields();
    form.setFieldsValue({ active: true, category: 'general' });
    setModalOpen(true);
  };

  const openEdit = (tip: Tip) => {
    setEditingTip(tip);
    form.setFieldsValue({
      title: tip.title,
      body: tip.body,
      category: tip.category,
      species: tip.species || [],
      active: tip.active,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTip(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      if (editingTip) {
        await api.put(`/tips/${editingTip.id}`, values);
        message.success('Tip updated');
      } else {
        await api.post('/tips', values);
        message.success('Tip created');
      }

      closeModal();
      fetchTips();
    } catch (err: any) {
      if (err.message) message.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tips/${id}`);
      message.success('Tip deleted');
      fetchTips();
    } catch (err: any) {
      message.error(err.message || 'Failed to delete');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 180,
    },
    {
      title: 'Tip Content',
      dataIndex: 'body',
      key: 'body',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      render: (cat: string) => {
        const found = CATEGORIES.find((c) => c.value === cat);
        return <Tag color={found?.color}>{found?.label || cat}</Tag>;
      },
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
      width: 140,
      render: (species: string[] | undefined) =>
        species?.length ? species.join(', ') : <Tag>All</Tag>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      width: 80,
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'default'}>{active ? 'Yes' : 'No'}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (_: any, record: Tip) => (
        <Space>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm title="Delete this tip?" onConfirm={() => handleDelete(record.id)}>
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <BulbOutlined style={{ fontSize: 20, color: '#F1379D' }} />
          <Title level={4} style={{ margin: 0 }}>Daily Tips</Title>
        </Space>
        <Space>
          <Select
            placeholder="Filter by category"
            allowClear
            style={{ width: 160 }}
            onChange={(val) => { setCategoryFilter(val); setPage(1); }}
            options={CATEGORIES}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            Add Tip
          </Button>
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={tips}
          loading={loading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: 20,
            total,
            onChange: (p) => setPage(p),
            showTotal: (t) => `${t} tips`,
          }}
        />
      </Card>

      <Modal
        title={editingTip ? 'Edit Tip' : 'Create Tip'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={submitting}
        okText={editingTip ? 'Update' : 'Create'}
        width={560}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="title" label="Title" rules={[{ required: true, min: 2, max: 100 }]}>
            <Input placeholder="e.g. Grooming Benefits" />
          </Form.Item>
          <Form.Item name="body" label="Tip Content" rules={[{ required: true, min: 5, max: 500 }]}>
            <TextArea rows={3} placeholder="The tip shown to users on their dashboard..." />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select options={CATEGORIES} />
          </Form.Item>
          <Form.Item name="species" label="Target Species (leave empty for all)">
            <Select mode="multiple" options={SPECIES_OPTIONS} placeholder="All species" />
          </Form.Item>
          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default TipsPage;
