import { useState } from 'react';
import { Card, Tabs, Table, Statistic, Row, Col, Spin, Empty, Tag } from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  VerificationService,
  type Verification,
} from '@/services/verification.service';
import { formatDate } from '@/utils/format';
import VerificationCard from './components/VerificationCard';
import ApproveModal from './components/ApproveModal';
import RejectModal from './components/RejectModal';

export default function VerificationQueue() {
  const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  const { data: pending, isLoading: pendingLoading } = useQuery({
    queryKey: ['verifications', 'pending'],
    queryFn: VerificationService.getPendingVerifications,
  });

  const { data: history, isLoading: historyLoading } = useQuery({
    queryKey: ['verifications', 'history'],
    queryFn: VerificationService.getVerificationHistory,
  });

  const { data: stats } = useQuery({
    queryKey: ['verifications', 'stats'],
    queryFn: VerificationService.getVerificationStats,
  });

  const handleApprove = (verification: Verification) => {
    setSelectedVerification(verification);
    setApproveModalOpen(true);
  };

  const handleReject = (verification: Verification) => {
    setSelectedVerification(verification);
    setRejectModalOpen(true);
  };

  const historyColumns = [
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: 'date',
      render: (date: string) => formatDate(date),
      sorter: (a: Verification, b: Verification) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      defaultSortOrder: 'descend' as const,
    },
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'user',
    },
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'email',
    },
    {
      title: 'Decision',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          approved: 'green',
          rejected: 'red',
          revoked: 'orange',
          pending: 'blue',
        };
        return <Tag color={colorMap[status] || 'default'}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewedBy',
      key: 'reviewer',
      render: (reviewer: string) => reviewer || '-',
    },
    {
      title: 'Reason',
      dataIndex: 'rejectionReason',
      key: 'reason',
      ellipsis: true,
      render: (reason: string) => reason || '-',
    },
  ];

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Pending Applications"
              value={stats?.pendingCount ?? pending?.length ?? 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Avg Review Time"
              value={stats?.avgReviewTimeHours ?? 0}
              suffix="hours"
              prefix={<CheckCircleOutlined />}
              precision={1}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Approval Rate"
              value={stats?.approvalRate ?? 0}
              suffix="%"
              prefix={<PercentageOutlined />}
              valueStyle={{ color: '#52c41a' }}
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs
          defaultActiveKey="pending"
          items={[
            {
              key: 'pending',
              label: `Pending Queue (${pending?.length ?? 0})`,
              children: pendingLoading ? (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <Spin size="large" />
                </div>
              ) : !pending?.length ? (
                <Empty description="No pending verifications" />
              ) : (
                <div>
                  {pending.map((v) => (
                    <VerificationCard
                      key={v.id}
                      verification={v}
                      onApprove={handleApprove}
                      onReject={handleReject}
                    />
                  ))}
                </div>
              ),
            },
            {
              key: 'history',
              label: 'History',
              children: (
                <Table
                  dataSource={history || []}
                  columns={historyColumns}
                  rowKey="id"
                  loading={historyLoading}
                  pagination={{ pageSize: 20, showSizeChanger: true }}
                />
              ),
            },
          ]}
        />
      </Card>

      <ApproveModal
        open={approveModalOpen}
        verification={selectedVerification}
        onClose={() => {
          setApproveModalOpen(false);
          setSelectedVerification(null);
        }}
      />

      <RejectModal
        open={rejectModalOpen}
        verification={selectedVerification}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedVerification(null);
        }}
      />
    </div>
  );
}
