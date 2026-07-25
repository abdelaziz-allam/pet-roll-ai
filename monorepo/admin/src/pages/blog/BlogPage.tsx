import { useState, useEffect, useCallback } from 'react';
import {
  Table, Card, Tag, Space, Button, Typography, Modal, message,
  Input, Switch, Form, Upload, Tabs, Badge, Tooltip, Drawer,
} from 'antd';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined,
  PushpinOutlined, SearchOutlined, UploadOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  tags: string;
  author: string;
  readingTimeMinutes: number;
  isPublished: boolean;
  isFeatured: boolean;
  publishedDate: { _seconds: number } | null;
  viewCount: number;
  metaTitle: string;
  metaDescription: string;
  content?: string;
  createdAt: { _seconds: number };
  updatedAt: { _seconds: number };
}

function formatDate(ts: { _seconds: number } | null): string {
  if (!ts) return '-';
  return dayjs.unix(ts._seconds).format('MMM D, YYYY');
}

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<{ data: BlogPost[] }>(`/blog/admin/posts?limit=100&search=${search}`);
      setPosts(res.data);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const openCreate = () => {
    setEditingPost(null);
    setCoverImageUrl('');
    form.resetFields();
    form.setFieldsValue({ isPublished: false, isFeatured: false });
    setDrawerOpen(true);
  };

  const openEdit = async (post: BlogPost) => {
    try {
      const full = await api.get<BlogPost>(`/blog/admin/posts/${post.id}`);
      setEditingPost(full);
      setCoverImageUrl(full.coverImageUrl || '');
      form.setFieldsValue({
        title: full.title,
        slug: full.slug,
        content: full.content,
        excerpt: full.excerpt,
        tags: full.tags,
        metaTitle: full.metaTitle,
        metaDescription: full.metaDescription,
        isPublished: full.isPublished,
        isFeatured: full.isFeatured,
      });
      setDrawerOpen(true);
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values, coverImageUrl };
      if (editingPost) {
        await api.put(`/blog/admin/posts/${editingPost.id}`, payload);
        message.success('Post updated');
      } else {
        await api.post('/blog/admin/posts', payload);
        message.success('Post created');
      }
      setDrawerOpen(false);
      fetchPosts();
    } catch (err: any) {
      if (err.message) message.error(err.message);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const token = localStorage.getItem('petroll_admin_token');
      const res = await fetch(`${API_BASE}/blog/admin/upload-image`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setCoverImageUrl(data.url);
      message.success('Image uploaded');
    } catch (err: any) {
      message.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
    return false;
  };

  const handleDelete = (post: BlogPost) => {
    Modal.confirm({
      title: 'Delete Post',
      content: `Are you sure you want to delete "${post.title}"?`,
      okType: 'danger',
      onOk: async () => {
        await api.delete(`/blog/admin/posts/${post.id}`);
        message.success('Post deleted');
        fetchPosts();
      },
    });
  };

  const toggleFeatured = async (post: BlogPost) => {
    await api.post(`/blog/admin/posts/${post.id}/feature`);
    fetchPosts();
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: BlogPost) => (
        <Space direction="vertical" size={0}>
          <Text strong>{title}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>/{record.slug}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_: any, record: BlogPost) => (
        <Space>
          {record.isPublished ? <Tag color="green">Published</Tag> : <Tag>Draft</Tag>}
          {record.isFeatured && <Tag color="gold">Featured</Tag>}
        </Space>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width: 120,
    },
    {
      title: 'Views',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 80,
      render: (v: number) => <Badge count={v} showZero color="#722ed1" />,
    },
    {
      title: 'Date',
      key: 'date',
      width: 120,
      render: (_: any, record: BlogPost) => formatDate(record.publishedDate || record.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 160,
      render: (_: any, record: BlogPost) => (
        <Space>
          <Tooltip title="Edit"><Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} /></Tooltip>
          <Tooltip title={record.isFeatured ? 'Unpin' : 'Pin'}>
            <Button size="small" icon={<PushpinOutlined />} type={record.isFeatured ? 'primary' : 'default'} onClick={() => toggleFeatured(record)} />
          </Tooltip>
          {record.isPublished && (
            <Tooltip title="View">
              <Button size="small" icon={<EyeOutlined />} href={`https://petfolioo.com/blog/${record.slug}`} target="_blank" />
            </Tooltip>
          )}
          <Tooltip title="Delete"><Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Blog Posts</Title>
        <Space>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 240 }}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
            New Post
          </Button>
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={posts}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 20 }}
        />
      </Card>

      <Drawer
        title={editingPost ? 'Edit Post' : 'New Post'}
        placement="right"
        width={720}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>Save</Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required' }]}>
            <Input placeholder="Post title" />
          </Form.Item>

          <Form.Item name="slug" label="Slug" extra="Leave empty to auto-generate from title">
            <Input placeholder="custom-url-slug" />
          </Form.Item>

          <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Content is required' }]}>
            <TextArea rows={16} placeholder="Write your post content (HTML supported)..." />
          </Form.Item>

          <Form.Item name="excerpt" label="Excerpt" extra="Leave empty to auto-generate from content">
            <TextArea rows={3} placeholder="Short summary..." maxLength={500} showCount />
          </Form.Item>

          <Form.Item label="Cover Image">
            <Upload
              accept="image/*"
              showUploadList={false}
              beforeUpload={handleImageUpload}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {coverImageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
            </Upload>
            {coverImageUrl && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={coverImageUrl}
                  alt="Cover preview"
                  style={{ maxWidth: '100%', maxHeight: 160, borderRadius: 8, objectFit: 'cover' }}
                />
              </div>
            )}
          </Form.Item>

          <Form.Item name="tags" label="Tags" extra="Comma-separated: health, dogs, vaccination">
            <Input placeholder="tag1, tag2, tag3" />
          </Form.Item>

          <Card size="small" title="SEO Settings" style={{ marginBottom: 24 }}>
            <Form.Item name="metaTitle" label="Meta Title" extra="Max 60 characters">
              <Input placeholder="SEO title override" maxLength={60} showCount />
            </Form.Item>
            <Form.Item name="metaDescription" label="Meta Description" extra="Max 160 characters">
              <TextArea rows={2} placeholder="SEO description override" maxLength={160} showCount />
            </Form.Item>
          </Card>

          <Space size="large">
            <Form.Item name="isPublished" label="Published" valuePropName="checked">
              <Switch checkedChildren="Live" unCheckedChildren="Draft" />
            </Form.Item>
            <Form.Item name="isFeatured" label="Featured" valuePropName="checked">
              <Switch checkedChildren="Pinned" unCheckedChildren="Normal" />
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </div>
  );
};

export default BlogPage;
