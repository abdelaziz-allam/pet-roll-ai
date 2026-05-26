import { useState } from 'react';
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Tag,
  Popconfirm,
  message,
  Space,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TipsService, type Tip, type CreateTipPayload } from '@/services/tips.service';
import type { PaginatedResponse } from '@/types/common';
import { ProTable, type ProColumns } from '@ant-design/pro-components';

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

export default function TipsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(page));
  queryParams.set('limit', String(pageSize));
  if (categoryFilter) queryParams.set('category', categoryFilter);

  const { data, isLoading } = useQuery<PaginatedResponse<Tip>>({
    queryKey: ['tips', page, pageSize, categoryFilter],
    queryFn: () => TipsService.getAll({ page, limit: pageSize, category: categoryFilter }),
  });

  const createMutation = useMutation({
    mutationFn: (payload: CreateTipPayload) => TipsService.create(payload),
    onSuccess: () => {
      message.success('Tip created');
      queryClient.invalidateQueries({ queryKey: ['tips'] });
      closeModal();
    },
    onError: () => message.error('Failed to create tip'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateTipPayload> }) =>
      TipsService.update(id, payload),
    onSuccess: () => {
      message.success('Tip updated');
      queryClient.invalidateQueries({ queryKey: ['tips'] });
      closeModal();
    },
    onError: () => message.error('Failed to update tip'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => TipsService.delete(id),
    onSuccess: () => {
      message.success('Tip deleted');
      queryClient.invalidateQueries({ queryKey: ['tips'] });
    },
    onError: () => message.error('Failed to delete tip'),
  });

  function openCreate() {
    setEditingTip(null);
    form.resetFields();
    form.setFieldsValue({ active: true, category: 'general' });
    setModalOpen(true);
  }

  function openEdit(tip: Tip) {
    setEditingTip(tip);
    form.setFieldsValue({
      title: tip.title,
      body: tip.body,
      category: tip.category,
      species: tip.species || [],
      active: tip.active,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTip(null);
    form.resetFields();
  }

  function handleSubmit() {
    form.validateFields().then((values) => {
      if (editingTip) {
        updateMutation.mutate({ id: editingTip.id, payload: values });
      } else {
        createMutation.mutate(values);
      }
    });
  }

  const columns: ProColumns<Tip>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Body',
      dataIndex: 'body',
      ellipsis: true,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      width: 120,
      render: (_, record) => {
        const cat = CATEGORIES.find((c) => c.value === record.category);
        return <Tag color={cat?.color}>{cat?.label || record.category}</Tag>;
      },
    },
    {
      title: 'Species',
      dataIndex: 'species',
      width: 150,
      render: (_, record) =>
        record.species?.length ? record.species.join(', ') : <Tag>All</Tag>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      width: 80,
      render: (_, record) => (
        <Tag color={record.active ? 'green' : 'default'}>
          {record.active ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(record)}
          />
          <Popconfirm
            title="Delete this tip?"
            onConfirm={() => deleteMutation.mutate(record.id)}
          >
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Daily Tips Management"
      extra={
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
      }
    >
      <ProTable<Tip>
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        search={false}
        toolBarRender={false}
        pagination={{
          current: page,
          pageSize,
          total: data?.pagination.total || 0,
          onChange: (p, ps) => { setPage(p); setPageSize(ps); },
          showSizeChanger: true,
          showTotal: (total) => `${total} tips`,
        }}
      />

      <Modal
        title={editingTip ? 'Edit Tip' : 'Create Tip'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
        okText={editingTip ? 'Update' : 'Create'}
        width={600}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, min: 2, max: 100 }]}
          >
            <Input placeholder="e.g. Grooming Benefits" />
          </Form.Item>

          <Form.Item
            name="body"
            label="Tip Content"
            rules={[{ required: true, min: 5, max: 500 }]}
          >
            <Input.TextArea rows={3} placeholder="The tip shown to users..." />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select options={CATEGORIES} />
          </Form.Item>

          <Form.Item
            name="species"
            label="Target Species (leave empty for all)"
          >
            <Select mode="multiple" options={SPECIES_OPTIONS} placeholder="All species" />
          </Form.Item>

          <Form.Item name="active" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
