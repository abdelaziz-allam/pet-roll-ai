import { useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, type ProColumns, type ActionType } from '@ant-design/pro-components';
import { useApiQuery, useApiMutation } from '@/hooks/useApiQuery';
import type { PaginatedResponse } from '@/types/common';

interface Breed {
  id: string;
  name: string;
  species: string;
  group: string;
  avgWeight: number;
  lifespan: string;
  gestationDays: number;
}

export function BreedDatabase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBreed, setEditingBreed] = useState<Breed | null>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  const { data, isLoading, refetch } = useApiQuery<PaginatedResponse<Breed>>(
    'breeds',
    '/admin/breeds',
  );

  const createMutation = useApiMutation<void, Omit<Breed, 'id'>>('/admin/breeds', 'post', {
    onSuccess: () => {
      message.success('Breed added');
      setModalOpen(false);
      form.resetFields();
      refetch();
    },
  });

  const updateMutation = useApiMutation<void, Partial<Breed>>('/admin/breeds', 'put', {
    onSuccess: () => {
      message.success('Breed updated');
      setModalOpen(false);
      setEditingBreed(null);
      form.resetFields();
      refetch();
    },
  });

  const deleteMutation = useApiMutation<void, { id: string }>('/admin/breeds', 'delete', {
    onSuccess: () => {
      message.success('Breed deleted');
      refetch();
    },
  });

  const columns: ProColumns<Breed>[] = [
    { title: 'Name', dataIndex: 'name', ellipsis: true },
    {
      title: 'Species',
      dataIndex: 'species',
      filters: [
        { text: 'Dog', value: 'dog' },
        { text: 'Cat', value: 'cat' },
        { text: 'Bird', value: 'bird' },
        { text: 'Rabbit', value: 'rabbit' },
        { text: 'Horse', value: 'horse' },
      ],
      onFilter: (value, record) => record.species === value,
    },
    { title: 'Group', dataIndex: 'group', ellipsis: true },
    { title: 'Avg Weight (kg)', dataIndex: 'avgWeight', width: 120 },
    { title: 'Lifespan', dataIndex: 'lifespan', width: 100 },
    { title: 'Gestation (days)', dataIndex: 'gestationDays', width: 130 },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <>
          <Button
            type="link"
            size="small"
            onClick={() => {
              setEditingBreed(record);
              form.setFieldsValue(record);
              setModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this breed?"
            onConfirm={() => deleteMutation.mutate({ id: record.id })}
          >
            <Button type="link" size="small" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingBreed) {
      updateMutation.mutate({ ...values, id: editingBreed.id });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <>
      <ProTable<Breed>
        actionRef={actionRef}
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 20 }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingBreed(null);
              form.resetFields();
              setModalOpen(true);
            }}
            style={{ background: '#F1379D' }}
          >
            Add Breed
          </Button>,
        ]}
      />

      <Modal
        title={editingBreed ? 'Edit Breed' : 'Add Breed'}
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => {
          setModalOpen(false);
          setEditingBreed(null);
          form.resetFields();
        }}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Breed Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="species" label="Species" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Dog', value: 'dog' },
                { label: 'Cat', value: 'cat' },
                { label: 'Bird', value: 'bird' },
                { label: 'Rabbit', value: 'rabbit' },
                { label: 'Horse', value: 'horse' },
              ]}
            />
          </Form.Item>
          <Form.Item name="group" label="Group">
            <Input placeholder="e.g. Sporting, Working, Herding" />
          </Form.Item>
          <Form.Item name="avgWeight" label="Average Weight (kg)">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="lifespan" label="Lifespan">
            <Input placeholder="e.g. 10-14 years" />
          </Form.Item>
          <Form.Item name="gestationDays" label="Gestation Days">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
