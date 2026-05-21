import { useState, useEffect } from 'react';
import {
  Table, Card, Tag, Space, Button, Typography, Modal, message,
  Descriptions, Image, Select, Input, Empty, Spin, Row, Col,
  Drawer, Divider, Progress, Statistic,
} from 'antd';
import {
  CheckOutlined, CloseOutlined, EyeOutlined, MedicineBoxOutlined,
  StopOutlined, CalendarOutlined, UserOutlined, FileImageOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface CertDocument {
  url: string;
  name: string;
}

interface HealthCertification {
  id: string;
  petId: string;
  petName: string;
  ownerId: string;
  species: string;
  breed: string;
  country: string | null;
  city: string | null;
  vetName: string;
  vetClinic: string;
  certDate: string;
  expiryDate: string | null;
  notes: string | null;
  documents: CertDocument[];
  status: 'pending' | 'approved' | 'rejected' | 'revoked';
  rejectionReason: string | null;
  processedBy: string | null;
  processedAt: string | null;
  createdAt: string;
}

const statusColor: Record<string, string> = {
  pending: 'orange',
  approved: 'green',
  rejected: 'red',
  revoked: 'volcano',
};

interface FilterOptions {
  species: string[];
  countries: string[];
  cities: string[];
}

const HealthCertificationsPage: React.FC = () => {
  const [certifications, setCertifications] = useState<HealthCertification[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [speciesFilter, setSpeciesFilter] = useState<string | undefined>(undefined);
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ species: [], countries: [], cities: [] });
  const [selectedCert, setSelectedCert] = useState<HealthCertification | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectingCert, setRejectingCert] = useState<HealthCertification | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [revokingCert, setRevokingCert] = useState<HealthCertification | null>(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [processing, setProcessing] = useState(false);

  const fetchFilters = async () => {
    try {
      const res = await api.get<FilterOptions>('/admin/health-certifications/filters');
      setFilterOptions(res);
    } catch (_) {}
  };

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (speciesFilter) params.set('species', speciesFilter);
      if (countryFilter) params.set('country', countryFilter);
      if (cityFilter) params.set('city', cityFilter);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const res = await api.get<HealthCertification[]>(`/admin/health-certifications${queryStr}`);
      setCertifications(res);
    } catch (err: any) {
      message.error(err.message || 'Failed to load health certifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFilters(); }, []);
  useEffect(() => { fetchCertifications(); }, [statusFilter, speciesFilter, countryFilter, cityFilter]);

  const viewDetails = async (record: HealthCertification) => {
    setDetailsLoading(true);
    setSelectedCert(record);
    try {
      const details = await api.get<HealthCertification>(`/admin/health-certifications/${record.id}`);
      setSelectedCert(details);
    } catch (err: any) {
      message.error('Failed to load details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleApprove = (cert: HealthCertification) => {
    Modal.confirm({
      title: `Approve health certification for ${cert.petName}?`,
      content: 'This will mark the pet as health certified and display a badge on mating listings.',
      okText: 'Approve',
      okType: 'primary',
      onOk: async () => {
        setProcessing(true);
        try {
          await api.put(`/admin/health-certifications/${cert.id}`, { approved: true });
          message.success(`${cert.petName} is now health certified!`);
          fetchCertifications();
          if (selectedCert?.id === cert.id) setSelectedCert(null);
        } catch (err: any) {
          message.error(err.message || 'Failed to approve');
        } finally {
          setProcessing(false);
        }
      },
    });
  };

  const openRejectModal = (cert: HealthCertification) => {
    setRejectingCert(cert);
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
      await api.put(`/admin/health-certifications/${rejectingCert!.id}`, {
        approved: false,
        rejectionReason: rejectionReason.trim(),
      });
      message.info(`Health certification for ${rejectingCert!.petName} rejected`);
      setRejectModalOpen(false);
      setRejectingCert(null);
      fetchCertifications();
      if (selectedCert?.id === rejectingCert!.id) setSelectedCert(null);
    } catch (err: any) {
      message.error(err.message || 'Failed to reject');
    } finally {
      setProcessing(false);
    }
  };

  const openRevokeModal = (cert: HealthCertification) => {
    setRevokingCert(cert);
    setRevokeReason('');
    setRevokeModalOpen(true);
  };

  const handleRevoke = async () => {
    if (!revokeReason.trim()) {
      message.warning('Please provide a reason for revoking');
      return;
    }
    setProcessing(true);
    try {
      await api.post(`/admin/pets/${revokingCert!.petId}/revoke-health-certification`, {
        reason: revokeReason.trim(),
      });
      message.info(`Health certification for ${revokingCert!.petName} has been revoked`);
      setRevokeModalOpen(false);
      setRevokingCert(null);
      fetchCertifications();
      if (selectedCert?.id === revokingCert!.id) setSelectedCert(null);
    } catch (err: any) {
      message.error(err.message || 'Failed to revoke');
    } finally {
      setProcessing(false);
    }
  };

  const columns = [
    {
      title: 'Pet',
      key: 'pet',
      render: (_: any, r: HealthCertification) => (
        <div>
          <div style={{ fontWeight: 500 }}>{r.petName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.species} - {r.breed}</Text>
        </div>
      ),
    },
    {
      title: 'Vet Info',
      key: 'vet',
      render: (_: any, r: HealthCertification) => (
        <div>
          <div>{r.vetName}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{r.vetClinic}</Text>
        </div>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, r: HealthCertification) => (
        r.country || r.city ? (
          <div>
            {r.city && <div style={{ fontSize: 13 }}>{r.city}</div>}
            {r.country && <Text type="secondary" style={{ fontSize: 11 }}>{r.country}</Text>}
          </div>
        ) : <Text type="secondary">—</Text>
      ),
    },
    {
      title: 'Cert Date',
      dataIndex: 'certDate',
      key: 'certDate',
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Documents',
      key: 'docs',
      render: (_: any, r: HealthCertification) => (
        <Text type="secondary">{r.documents?.length || 0} file(s)</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => <Tag color={statusColor[s]}>{s.toUpperCase()}</Tag>,
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
      render: (_: any, record: HealthCertification) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => viewDetails(record)}>View</Button>
          {record.status === 'pending' && (
            <>
              <Button size="small" type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(record)}>Approve</Button>
              <Button size="small" danger icon={<CloseOutlined />} onClick={() => openRejectModal(record)}>Reject</Button>
            </>
          )}
          {record.status === 'approved' && (
            <Button size="small" danger icon={<StopOutlined />} onClick={() => openRevokeModal(record)}>Revoke</Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>
          <MedicineBoxOutlined style={{ marginRight: 8 }} />
          Health Certifications
        </Title>
        <Text type="secondary">Review and manage pet health certification requests</Text>
      </div>

      <Card>
        <Space wrap style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by status"
            allowClear
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 160 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
            <Option value="revoked">Revoked</Option>
          </Select>
          <Select
            placeholder="Pet Category"
            allowClear
            value={speciesFilter}
            onChange={setSpeciesFilter}
            style={{ width: 160 }}
            showSearch
            optionFilterProp="children"
          >
            {filterOptions.species.map((s) => (
              <Option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</Option>
            ))}
          </Select>
          <Select
            placeholder="Country"
            allowClear
            value={countryFilter}
            onChange={(val) => { setCountryFilter(val); setCityFilter(undefined); }}
            style={{ width: 180 }}
            showSearch
            optionFilterProp="children"
          >
            {filterOptions.countries.map((c) => (
              <Option key={c} value={c}>{c}</Option>
            ))}
          </Select>
          <Select
            placeholder="City"
            allowClear
            value={cityFilter}
            onChange={setCityFilter}
            style={{ width: 160 }}
            showSearch
            optionFilterProp="children"
            disabled={!countryFilter}
          >
            {filterOptions.cities
              .filter(() => true)
              .map((c) => (
                <Option key={c} value={c}>{c}</Option>
              ))}
          </Select>
          {(statusFilter || speciesFilter || countryFilter || cityFilter) && (
            <Button type="link" size="small" onClick={() => { setStatusFilter(undefined); setSpeciesFilter(undefined); setCountryFilter(undefined); setCityFilter(undefined); }}>
              Clear all
            </Button>
          )}
        </Space>

        <Table
          columns={columns}
          dataSource={certifications}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10, showTotal: (total) => `${total} certifications` }}
        />
      </Card>

      {/* Details Drawer */}
      <Drawer
        title={null}
        open={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        width={560}
        extra={
          selectedCert?.status === 'pending' ? (
            <Space>
              <Button danger icon={<CloseOutlined />} onClick={() => { setSelectedCert(null); openRejectModal(selectedCert!); }}>Reject</Button>
              <Button type="primary" icon={<CheckOutlined />} onClick={() => handleApprove(selectedCert!)}>Approve</Button>
            </Space>
          ) : selectedCert?.status === 'approved' ? (
            <Button danger icon={<StopOutlined />} onClick={() => { setSelectedCert(null); openRevokeModal(selectedCert!); }}>Revoke</Button>
          ) : undefined
        }
      >
        {detailsLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
        ) : selectedCert && (
          <Space direction="vertical" size={20} style={{ width: '100%' }}>
            {/* Status Header */}
            <div style={{
              padding: 16,
              borderRadius: 12,
              background: selectedCert.status === 'approved' ? '#f6ffed' : selectedCert.status === 'pending' ? '#fffbe6' : '#fff2f0',
              border: `1px solid ${selectedCert.status === 'approved' ? '#b7eb8f' : selectedCert.status === 'pending' ? '#ffe58f' : '#ffccc7'}`,
            }}>
              <Space align="center" size={12}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: selectedCert.status === 'approved' ? '#52c41a' : selectedCert.status === 'pending' ? '#faad14' : '#ff4d4f',
                }}>
                  <MedicineBoxOutlined style={{ color: '#fff', fontSize: 18 }} />
                </div>
                <div>
                  <Tag color={statusColor[selectedCert.status]} style={{ marginBottom: 2 }}>{selectedCert.status.toUpperCase()}</Tag>
                  <div><Text type="secondary" style={{ fontSize: 12 }}>Submitted {formatDate(selectedCert.createdAt)}</Text></div>
                </div>
              </Space>
            </div>

            {/* Pet Info */}
            <Card size="small" title={<Space><HeartOutlined /> Pet Information</Space>} style={{ borderRadius: 10 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Pet Name" value={selectedCert.petName} valueStyle={{ fontSize: 16 }} />
                </Col>
                <Col span={12}>
                  <Statistic title="Species" value={`${selectedCert.species} - ${selectedCert.breed}`} valueStyle={{ fontSize: 14 }} />
                </Col>
              </Row>
            </Card>

            {/* Vet Info */}
            <Card size="small" title={<Space><UserOutlined /> Veterinary Details</Space>} style={{ borderRadius: 10 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 11 }}>VETERINARIAN</Text>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedCert.vetName}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 11 }}>CLINIC / HOSPITAL</Text>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedCert.vetClinic}</div>
                  </div>
                </Col>
              </Row>
              <Divider style={{ margin: '12px 0' }} />
              <Row gutter={16}>
                <Col span={12}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 11 }}>CERTIFICATION DATE</Text>
                    <div style={{ fontWeight: 500 }}><CalendarOutlined style={{ marginRight: 4 }} />{formatDate(selectedCert.certDate)}</div>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text type="secondary" style={{ fontSize: 11 }}>EXPIRY DATE</Text>
                    <div style={{ fontWeight: 500 }}>
                      {selectedCert.expiryDate ? (
                        <><CalendarOutlined style={{ marginRight: 4 }} />{formatDate(selectedCert.expiryDate)}</>
                      ) : '—'}
                    </div>
                  </div>
                </Col>
              </Row>
              {selectedCert.expiryDate && selectedCert.status === 'approved' && (() => {
                const expiry = new Date(selectedCert.expiryDate!);
                const certStart = new Date(selectedCert.certDate);
                const now = new Date();
                const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                const totalDays = Math.ceil((expiry.getTime() - certStart.getTime()) / (1000 * 60 * 60 * 24));
                const percent = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
                return (
                  <>
                    <Divider style={{ margin: '12px 0' }} />
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>Validity Progress</Text>
                        <Text style={{ fontSize: 12, fontWeight: 600 }} type={daysLeft <= 0 ? 'danger' : daysLeft <= 30 ? 'warning' : undefined}>
                          {daysLeft <= 0 ? 'EXPIRED' : `${daysLeft} days left`}
                        </Text>
                      </div>
                      <Progress
                        percent={percent}
                        showInfo={false}
                        strokeColor={daysLeft <= 0 ? '#ff4d4f' : daysLeft <= 30 ? '#faad14' : '#52c41a'}
                        size="small"
                      />
                    </div>
                  </>
                );
              })()}
            </Card>

            {/* Notes */}
            {selectedCert.notes && (
              <Card size="small" title="Notes" style={{ borderRadius: 10 }}>
                <Paragraph style={{ margin: 0 }}>{selectedCert.notes}</Paragraph>
              </Card>
            )}

            {/* Rejection Reason */}
            {selectedCert.rejectionReason && (
              <Card size="small" style={{ borderRadius: 10, background: '#fff2f0', border: '1px solid #ffccc7' }}>
                <Text type="danger" strong>Rejection Reason</Text>
                <Paragraph type="danger" style={{ margin: '4px 0 0' }}>{selectedCert.rejectionReason}</Paragraph>
              </Card>
            )}

            {/* Documents */}
            <Card
              size="small"
              title={<Space><FileImageOutlined /> Documents ({selectedCert.documents?.length || 0})</Space>}
              style={{ borderRadius: 10 }}
            >
              {selectedCert.documents?.length > 0 ? (
                <Image.PreviewGroup>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                    {selectedCert.documents.map((doc, i) => (
                      <div key={i} style={{ textAlign: 'center' }}>
                        <Image
                          src={doc.url}
                          alt={doc.name}
                          width="100%"
                          height={130}
                          style={{ objectFit: 'cover', borderRadius: 8 }}
                          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                        />
                        <Text type="secondary" style={{ fontSize: 11, marginTop: 4, display: 'block' }}>{doc.name}</Text>
                      </div>
                    ))}
                  </div>
                </Image.PreviewGroup>
              ) : (
                <Empty description="No documents" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>

            {/* Processed Info */}
            {selectedCert.processedAt && (
              <Card size="small" style={{ borderRadius: 10, background: '#fafafa' }}>
                <Text type="secondary">Processed on {formatDate(selectedCert.processedAt)}</Text>
              </Card>
            )}
          </Space>
        )}
      </Drawer>

      {/* Reject Modal */}
      <Modal
        title={`Reject certification for ${rejectingCert?.petName || ''}`}
        open={rejectModalOpen}
        onCancel={() => { setRejectModalOpen(false); setRejectingCert(null); }}
        onOk={handleReject}
        okText="Reject"
        okType="danger"
        okButtonProps={{ loading: processing, disabled: !rejectionReason.trim() }}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Text>Please provide a reason for rejection. The pet owner will see this and can resubmit with corrections.</Text>
          <TextArea
            rows={4}
            placeholder="e.g., Certificate is expired or documents are not legible. Please resubmit with clear, valid documents."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            maxLength={500}
            showCount
          />
        </Space>
      </Modal>

      {/* Revoke Modal */}
      <Modal
        title={`Revoke certification for ${revokingCert?.petName || ''}`}
        open={revokeModalOpen}
        onCancel={() => { setRevokeModalOpen(false); setRevokingCert(null); }}
        onOk={handleRevoke}
        okText="Revoke Certification"
        okType="danger"
        okButtonProps={{ loading: processing, disabled: !revokeReason.trim() }}
      >
        <Space direction="vertical" size={12} style={{ width: '100%' }}>
          <Text>This will remove the health certified badge from the pet. Please provide a reason.</Text>
          <TextArea
            rows={4}
            placeholder="e.g., Certification has expired or new information invalidates the health status."
            value={revokeReason}
            onChange={(e) => setRevokeReason(e.target.value)}
            maxLength={500}
            showCount
          />
        </Space>
      </Modal>
    </Space>
  );
};

export default HealthCertificationsPage;
