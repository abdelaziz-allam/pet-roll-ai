import { useState, useEffect, useCallback } from 'react';
import {
  Table, Card, Tag, Space, Button, Typography, Modal, message,
  Select, Input, DatePicker, Tabs, Badge, Statistic, Row, Col, Switch,
  Tooltip,
} from 'antd';
import {
  MessageOutlined, CheckCircleOutlined, CloseCircleOutlined,
  BulbOutlined, BugOutlined, CommentOutlined, PushpinOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface FeedbackItem {
  id: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  type: 'bug' | 'suggestion' | 'general';
  message: string;
  status: 'open' | 'replied' | 'closed';
  isTodo: boolean;
  adminReply: string | null;
  adminRepliedBy: string | null;
  adminRepliedAt: { _seconds: number; _nanoseconds: number } | null;
  createdAt: { _seconds: number; _nanoseconds: number };
  updatedAt: { _seconds: number; _nanoseconds: number };
}

interface FeedbackResponse {
  data: FeedbackItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const typeColors: Record<string, string> = {
  bug: 'red',
  suggestion: 'blue',
  general: 'default',
};

const typeIcons: Record<string, React.ReactNode> = {
  bug: <BugOutlined />,
  suggestion: <BulbOutlined />,
  general: <CommentOutlined />,
};

const statusColors: Record<string, string> = {
  open: 'orange',
  replied: 'green',
  closed: 'default',
};

function formatTimestamp(ts: { _seconds: number; _nanoseconds: number } | null): string {
  if (!ts) return '-';
  const date = dayjs.unix(ts._seconds);
  const now = dayjs();
  if (now.diff(date, 'day') < 7) {
    return date.fromNow();
  }
  return date.format('MMM D, YYYY');
}

const FeedbackPage: React.FC = () => {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 1 });

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [showTodosOnly, setShowTodosOnly] = useState(false);

  // Reply modal
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState('all');

  // Stats
  const [stats, setStats] = useState({ total: 0, open: 0, replied: 0, closed: 0, todo: 0 });

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', String(pagination.page));
      params.set('limit', String(pagination.limit));

      if (activeTab === 'todo') {
        params.set('isTodo', 'true');
      } else if (showTodosOnly) {
        params.set('isTodo', 'true');
      }

      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }
      if (typeFilter !== 'all') {
        params.set('type', typeFilter);
      }
      if (dateRange && dateRange[0]) {
        params.set('dateFrom', dateRange[0].format('YYYY-MM-DD'));
      }
      if (dateRange && dateRange[1]) {
        params.set('dateTo', dateRange[1].format('YYYY-MM-DD'));
      }

      const res = await api.get<FeedbackResponse>(`/admin/feedback?${params.toString()}`);
      setFeedbackItems(res.data);
      setPagination(res.pagination);

      // Calculate stats from response
      const open = res.data.filter((f) => f.status === 'open').length;
      const replied = res.data.filter((f) => f.status === 'replied').length;
      const closed = res.data.filter((f) => f.status === 'closed').length;
      const todo = res.data.filter((f) => f.isTodo).length;
      setStats({ total: res.pagination.total, open, replied, closed, todo });
    } catch (err: any) {
      message.error(err.message || 'Failed to load feedback');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, statusFilter, typeFilter, dateRange, showTodosOnly, activeTab]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  const handleReply = async () => {
    if (!selectedFeedback || !replyText.trim()) {
      message.warning('Please enter a reply message');
      return;
    }
    setSubmitting(true);
    try {
      await api.put(`/admin/feedback/${selectedFeedback.id}/reply`, { reply: replyText.trim() });
      message.success('Reply sent successfully');
      setReplyModalOpen(false);
      setReplyText('');
      setSelectedFeedback(null);
      fetchFeedback();
    } catch (err: any) {
      message.error(err.message || 'Failed to send reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = async (record: FeedbackItem) => {
    try {
      await api.put(`/admin/feedback/${record.id}/status`, { status: 'closed' });
      message.success('Feedback closed');
      fetchFeedback();
    } catch (err: any) {
      message.error(err.message || 'Failed to close feedback');
    }
  };

  const handleToggleTodo = async (record: FeedbackItem) => {
    try {
      await api.put(`/admin/feedback/${record.id}/todo`, { isTodo: !record.isTodo });
      message.success(record.isTodo ? 'Removed from TODO list' : 'Added to TODO list');
      fetchFeedback();
    } catch (err: any) {
      message.error(err.message || 'Failed to update TODO status');
    }
  };

  const openReplyModal = (record: FeedbackItem) => {
    setSelectedFeedback(record);
    setReplyText('');
    setReplyModalOpen(true);
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      width: 200,
      render: (_: unknown, record: FeedbackItem) => (
        <div>
          <Text strong>{record.userDisplayName || 'Unknown'}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>{record.userEmail}</Text>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      render: (type: string) => (
        <Tag color={typeColors[type]} icon={typeIcons[type]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
      render: (text: string, record: FeedbackItem) => (
        <Tooltip title="Click to view full message">
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => openReplyModal(record)}
          >
            {text.length > 100 ? `${text.slice(0, 100)}...` : text}
          </span>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={statusColors[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (ts: { _seconds: number; _nanoseconds: number }) => (
        <Text type="secondary">{formatTimestamp(ts)}</Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 220,
      render: (_: unknown, record: FeedbackItem) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<MessageOutlined />}
            onClick={() => openReplyModal(record)}
          >
            Reply
          </Button>
          {record.status !== 'closed' && (
            <Button
              type="link"
              size="small"
              icon={<CloseCircleOutlined />}
              onClick={() => handleClose(record)}
            >
              Close
            </Button>
          )}
          <Tooltip title={record.isTodo ? 'Remove from TODO' : 'Mark as TODO'}>
            <Button
              type="link"
              size="small"
              icon={<PushpinOutlined />}
              style={{ color: record.isTodo ? '#fa8c16' : undefined }}
              onClick={() => handleToggleTodo(record)}
            >
              {record.isTodo ? 'Unpin' : 'TODO'}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const todayCount = feedbackItems.filter((f) => {
    const created = dayjs.unix(f.createdAt._seconds);
    return created.isAfter(dayjs().startOf('day'));
  }).length;

  const thisWeekCount = feedbackItems.filter((f) => {
    const created = dayjs.unix(f.createdAt._seconds);
    return created.isAfter(dayjs().startOf('week'));
  }).length;

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0 }}>Feedback & Suggestions</Title>
        <Text type="secondary">
          Today: <strong>{todayCount}</strong> | This week: <strong>{thisWeekCount}</strong>
        </Text>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="Total" value={stats.total} prefix={<CommentOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Open"
              value={stats.open}
              valueStyle={{ color: '#fa8c16' }}
              prefix={<Badge status="warning" />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="Replied"
              value={stats.replied}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="TODO Items"
              value={stats.todo}
              valueStyle={{ color: '#1890ff' }}
              prefix={<PushpinOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card size="small">
        <Space wrap size="middle">
          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            style={{ width: 130 }}
          >
            <Option value="all">All Status</Option>
            <Option value="open">Open</Option>
            <Option value="replied">Replied</Option>
            <Option value="closed">Closed</Option>
          </Select>

          <Select
            value={typeFilter}
            onChange={(val) => setTypeFilter(val)}
            style={{ width: 140 }}
          >
            <Option value="all">All Types</Option>
            <Option value="bug">Bug</Option>
            <Option value="suggestion">Suggestion</Option>
            <Option value="general">General</Option>
          </Select>

          <RangePicker
            value={dateRange as [dayjs.Dayjs, dayjs.Dayjs] | null}
            onChange={(dates) => setDateRange(dates)}
            style={{ width: 260 }}
          />

          <Space>
            <Text type="secondary">TODOs only:</Text>
            <Switch
              checked={showTodosOnly}
              onChange={(checked) => setShowTodosOnly(checked)}
              size="small"
            />
          </Space>
        </Space>
      </Card>

      {/* Tabs with Table */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={[
            {
              key: 'all',
              label: (
                <span>
                  <CommentOutlined /> All Feedback
                  <Badge count={stats.total} style={{ marginLeft: 8 }} showZero={false} />
                </span>
              ),
              children: (
                <Table
                  dataSource={feedbackItems}
                  columns={columns}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    current: pagination.page,
                    pageSize: pagination.limit,
                    total: pagination.total,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} items`,
                    onChange: (page, pageSize) => {
                      setPagination((prev) => ({ ...prev, page, limit: pageSize }));
                    },
                  }}
                  size="middle"
                />
              ),
            },
            {
              key: 'todo',
              label: (
                <span>
                  <PushpinOutlined /> TODO List
                  <Badge count={stats.todo} style={{ marginLeft: 8 }} showZero={false} />
                </span>
              ),
              children: (
                <Table
                  dataSource={feedbackItems.filter((f) => f.isTodo)}
                  columns={columns}
                  rowKey="id"
                  loading={loading}
                  pagination={{
                    pageSize: 20,
                    showTotal: (total) => `${total} actionable items`,
                  }}
                  size="middle"
                />
              ),
            },
          ]}
        />
      </Card>

      {/* Reply Modal */}
      <Modal
        title="Feedback Details & Reply"
        open={replyModalOpen}
        onCancel={() => {
          setReplyModalOpen(false);
          setSelectedFeedback(null);
          setReplyText('');
        }}
        footer={[
          <Button key="cancel" onClick={() => setReplyModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={submitting}
            onClick={handleReply}
            icon={<MessageOutlined />}
          >
            Send Reply
          </Button>,
        ]}
        width={640}
      >
        {selectedFeedback && (
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <div>
              <Text type="secondary">From:</Text>{' '}
              <Text strong>{selectedFeedback.userDisplayName}</Text>{' '}
              <Text type="secondary">({selectedFeedback.userEmail})</Text>
            </div>
            <div>
              <Text type="secondary">Type:</Text>{' '}
              <Tag color={typeColors[selectedFeedback.type]} icon={typeIcons[selectedFeedback.type]}>
                {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
              </Tag>
              <Text type="secondary" style={{ marginLeft: 8 }}>Status:</Text>{' '}
              <Tag color={statusColors[selectedFeedback.status]}>
                {selectedFeedback.status.charAt(0).toUpperCase() + selectedFeedback.status.slice(1)}
              </Tag>
              {selectedFeedback.isTodo && (
                <Tag color="orange" icon={<PushpinOutlined />}>TODO</Tag>
              )}
            </div>
            <div>
              <Text type="secondary">Submitted:</Text>{' '}
              <Text>{formatTimestamp(selectedFeedback.createdAt)}</Text>
            </div>
            <Card size="small" style={{ backgroundColor: '#f9f9f9' }}>
              <Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {selectedFeedback.message}
              </Paragraph>
            </Card>
            {selectedFeedback.adminReply && (
              <Card size="small" style={{ backgroundColor: '#f6ffed', borderColor: '#b7eb8f' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Previous reply by {selectedFeedback.adminRepliedBy || 'admin'}{' '}
                  {selectedFeedback.adminRepliedAt && `(${formatTimestamp(selectedFeedback.adminRepliedAt)})`}:
                </Text>
                <Paragraph style={{ margin: '8px 0 0 0' }}>
                  {selectedFeedback.adminReply}
                </Paragraph>
              </Card>
            )}
            <div>
              <Text strong>Your Reply:</Text>
              <TextArea
                rows={4}
                placeholder="Type your reply to this feedback..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>
          </Space>
        )}
      </Modal>
    </Space>
  );
};

export default FeedbackPage;
