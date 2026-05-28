import { useState, useEffect } from 'react';
import {
  Table, Card, Tag, Space, Button, Typography, Modal, message,
  Descriptions, Image, Select, Input, Timeline, Tabs, Empty, Spin,
} from 'antd';
import {
  CheckOutlined, CloseOutlined, EyeOutlined, FileOutlined,
  FilePdfOutlined, FileImageOutlined, HistoryOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface VerificationDocument {
  url: string;
  path: string;
  name: string;
  type: string;
  uploadedAt: string;
}

interface VerificationRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  displayName: string;
  email: string;
  kennelName: string;
  breedExperience: string;
  documents: VerificationDocument[];
  status: 'pending' | 'approved' | 'rejected';
  submissionNumber: number;
  rejectionReason: string | null;
  processedBy: string | null;
  processedAt: string | null;
  createdAt: string;
  history?: VerificationRequest[];
}

const statusColor: Record<string, string> = { pending: 'orange', approved: 'green', rejected: 'red' };

const VerificationPage: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingRequest, setRejectingRequest] = useState<VerificationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const res = await api.get<VerificationRequest[]>(`/admin/verifications${params}`);
      setRequests(res);
    } catch (err: any) {
      message.error(err.message || 'Failed to load verification requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, [statusFilter]);

  const viewDetails = async (record: VerificationRequest) => {
    setDetailsLoading(true);
    setSelectedRequest(record);
    try {
      const details = await api.get<VerificationRequest>(`/admin/verifications/${record.id}`);
      setSelectedRequest(details);
    } catch (err: any) {
      message.error('Failed to load details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleApprove = (req: VerificationRequest) => {
    Modal.confirm({
      title: `Approve ${req.displayName || req.userName}?`,
      content: 'This will grant verified breeder status to this user.',
      okText: 'Approve',
      okType: 'primary',
      onOk: async () => {
        setProcessing(true);
        try {
          await api.put(`/admin/verifications/${req.id}`, { approved: true });
          message.success(`${req.displayName || req.userName} approved as verified breeder`);
          fetchRequests();
          if (selectedRequest?.id === req.id) setSelectedRequest(null);
        } catch (err: any) {
          message.error(err.message || 'Failed to approve');
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  const openRejectModal = (req: VerificationRequest) => {
    setRejectingRequest(req);
    setRejectionReason('');
    setRejectModalOpen(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      message.warning('Please provide a rejection reason');
      return;
    }
    setProcessing(true);
    try {
      await api.put(`/admin/verifications/${rejectingRequest!.id}`, {
        approved: false,
        rejectionReason: rejectionReason.trim(),
      });
      message.info(`${rejectingRequest!.displayName || rejectingRequest!.userName} verification rejected`);
      setRejectModalOpen(false);
      setRejectingRequest(null);
      fetchRequests();
      if (selectedRequest?.id === rejectingRequest!.id) setSelectedRequest(null);
    } catch (err: any) {
      message.error(err.message || 'Failed to reject');
    } finally {
      setProcessing(false);
    }
  };

  const getDocIcon = (type: string) => {
    if (type.includes('pdf')) return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
    if (type.includes('image')) return <FileImageOutlined style={{ color: '#1890ff' }} />;
    return <FileOutlined />;
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_: any, r: VerificationRequest) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.displayName || r.userName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.email || r.userEmail}</Text>
        </div>
      ),
    },
    { title: 'Kennel', dataIndex: 'kennelName', key: 'kennel' },
    {
      title: 'Submission',
      key: 'submission',
      render: (_: any, r: VerificationRequest) => (
        <Text type="secondary">#{r.submissionNumber || 1}</Text>
      ),
    },
    {
      title: 'Documents',
      key: 'docs',
      render: (_: any, r: VerificationRequest) => (
        <Text type="secondary">{r.documents?.length || 0} file(s)</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={statusColor[s]}>{s}</Tag>,
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'submitted',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: VerificationRequest) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => viewDetails(record)}>View</Button>
          {record.status === 'pending' && (
            <>
              <Button size="small" type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(record)}>Approve</Button>
              <Button size="small" danger icon={<CloseOutlined />} onClick={() => openRejectModal(record)}>Reject</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>Breeder Verification</Title>
        <Text type="secondary">Review and process breeder verification requests</Text>
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by status"
            allowClear
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={requests}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
          pagination={{ pageSize: 10, showTotal: (total) => `${total} requests` }}
        />
      </Card>

      {/* Details Modal */}
      <Modal
        title={
          <Space>
            <Text strong>Verification Details</Text>
            {selectedRequest && <Tag color={statusColor[selectedRequest.status]}>{selectedRequest.status}</Tag>}
          </Space>
        }
        open={!!selectedRequest}
        onCancel={() => setSelectedRequest(null)}
        footer={
          selectedRequest?.status === 'pending' ? (
            <Space>
              <Button onClick={() => setSelectedRequest(null)}>Close</Button>
              <Button danger icon={<CloseOutlined />} onClick={() => { setSelectedRequest(null); openRejectModal(selectedRequest!); }}>Reject</Button>
              <Button type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(selectedRequest!)}>Approve</Button>
            </Space>
          ) : null
        }
        width={800}
      >
        {detailsLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
        ) : selectedRequest && (
          <Tabs
            items={[
              {
                key: 'details',
                label: 'Current Submission',
                children: (
                  <Space direction="vertical" size={16} style={{ width: '100%' }}>
                    <Descriptions column={2} bordered size="small">
                      <Descriptions.Item label="Name">{selectedRequest.displayName || selectedRequest.userName}</Descriptions.Item>
                      <Descriptions.Item label="Email">{selectedRequest.email || selectedRequest.userEmail}</Descriptions.Item>
                      <Descriptions.Item label="Kennel Name">{selectedRequest.kennelName}</Descriptions.Item>
                      <Descriptions.Item label="Submission #">{selectedRequest.submissionNumber || 1}</Descriptions.Item>
                      <Descriptions.Item label="Experience" span={2}>{selectedRequest.breedExperience}</Descriptions.Item>
                      <Descriptions.Item label="Submitted">{formatDate(selectedRequest.createdAt)}</Descriptions.Item>
                      <Descriptions.Item label="Status"><Tag color={statusColor[selectedRequest.status]}>{selectedRequest.status}</Tag></Descriptions.Item>
                      {selectedRequest.rejectionReason && (
                        <Descriptions.Item label="Rejection Reason" span={2}>
                          <Text type="danger">{selectedRequest.rejectionReason}</Text>
                        </Descriptions.Item>
                      )}
                      {selectedRequest.processedAt && (
                        <Descriptions.Item label="Processed">{formatDate(selectedRequest.processedAt)}</Descriptions.Item>
                      )}
                    </Descriptions>

                    <Card size="small" title={`Documents (${selectedRequest.documents?.length || 0})`}>
                      {selectedRequest.documents?.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                          {selectedRequest.documents.map((doc, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                              {doc.type?.includes('image') ? (
                                <Image
                                  src={doc.url}
                                  alt={doc.name}
                                  width={120}
                                  height={120}
                                  style={{ objectFit: 'cover', borderRadius: 8 }}
                                  fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                                />
                              ) : (
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                  <Card
                                    size="small"
                                    hoverable
                                    style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
                                  >
                                    <div style={{ fontSize: 32 }}>{getDocIcon(doc.type)}</div>
                                    <Text type="secondary" style={{ fontSize: 11, marginTop: 4 }} ellipsis>{doc.name}</Text>
                                  </Card>
                                </a>
                              )}
                              <div style={{ marginTop: 4 }}>
                                <Text type="secondary" style={{ fontSize: 11 }}>{doc.name}</Text>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Empty description="No documents submitted" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      )}
                    </Card>
                  </Space>
                ),
              },
              {
                key: 'history',
                label: (
                  <Space>
                    <HistoryOutlined />
                    Submission History ({selectedRequest.history?.length || 1})
                  </Space>
                ),
                children: (
                  <div>
                    {selectedRequest.history && selectedRequest.history.length > 0 ? (
                      <Timeline
                        items={selectedRequest.history.map((h) => ({
                          color: h.status === 'approved' ? 'green' : h.status === 'rejected' ? 'red' : 'blue',
                          children: (
                            <Card size="small" style={{ marginBottom: 8 }}>
                              <Space direction="vertical" size={4} style={{ width: '100%' }}>
                                <Space>
                                  <Text strong>Submission #{h.submissionNumber}</Text>
                                  <Tag color={statusColor[h.status]}>{h.status}</Tag>
                                  <Text type="secondary">{formatDate(h.createdAt)}</Text>
                                </Space>
                                <Text>Kennel: {h.kennelName}</Text>
                                <Text>Experience: {h.breedExperience}</Text>
                                <Text type="secondary">Documents: {h.documents?.length || 0} file(s)</Text>
                                {h.rejectionReason && (
                                  <Paragraph type="danger" style={{ margin: 0 }}>
                                    Rejection reason: {h.rejectionReason}
                                  </Paragraph>
                                )}
                                {h.processedAt && (
                                  <Text type="secondary">Processed: {formatDate(h.processedAt)}</Text>
                                )}
                              </Space>
                            </Card>
                          ),
                        }))}
                      />
                    ) : (
                      <Empty description="No previous submissions" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </div>
                ),
              },
            ]}
          />
        )}
      </Modal>

      {/* Reject Modal */}
      <Modal
        title={`Reject ${rejectingRequest?.displayName || rejectingRequest?.userName || ''}'s Verification`}
        open={rejectModalOpen}
        onCancel={() => { setRejectModalOpen(false); setRejectingRequest(null); }}
        onOk={handleReject}
        okText="Reject"
        okType="danger"
        okButtonProps={{ loading: processing, disabled: !rejectionReason.trim() }}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Text>Please provide a reason for rejection. The user will see this reason and can resubmit with corrections.</Text>
          <TextArea
            rows={4}
            placeholder="e.g., License document is expired. Please submit a valid breeding license."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            maxLength={500}
            showCount
          />
        </Space>
      </Modal>
    </Space>
  );
};

export default VerificationPage;
