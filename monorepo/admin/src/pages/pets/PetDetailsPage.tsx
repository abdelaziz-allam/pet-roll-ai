import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card, Typography, Tag, Space, Button, Descriptions, Image, Empty,
  Modal, Input, message, Spin, Row, Col, Progress, Statistic, Divider,
} from 'antd';
import {
  ArrowLeftOutlined, StopOutlined, CheckCircleOutlined, CloseCircleOutlined,
  CameraOutlined, MedicineBoxOutlined, SafetyCertificateOutlined,
  CalendarOutlined, UserOutlined, EnvironmentOutlined, HeartOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';
import { formatDate } from '@/utils/format';
import { usePermission } from '@/hooks/usePermission';

const { Title, Text } = Typography;

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth?: string;
  weight?: number;
  color?: string;
  microchipId?: string;
  isNeutered?: boolean;
  isAvailableForMating?: boolean;
  healthCertified?: boolean;
  healthCertifiedAt?: string;
  notes?: string;
  photos?: Array<{ url: string; path: string; uploadedAt: string }>;
  ownerId?: string;
  ownerName: string;
  country?: string;
  city?: string;
  status: string;
  banReason?: string;
  bannedAt?: string;
  createdAt: string;
}

interface HealthCert {
  id: string;
  petId: string;
  vetName: string;
  vetClinic: string;
  certDate: string;
  expiryDate: string | null;
  status: string;
  documents: Array<{ url: string; name: string }>;
  notes: string | null;
  createdAt: string;
  processedAt: string | null;
}

const MAX_PHOTOS = 50;

const PetDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [healthCert, setHealthCert] = useState<HealthCert | null>(null);
  const [loading, setLoading] = useState(true);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const { canPerformAction } = usePermission();
  const canBan = canPerformAction('pets', 'delete');

  const fetchPet = async () => {
    setLoading(true);
    try {
      const data = await api.get<Pet>(`/admin/pets/${id}`);
      setPet(data);
      try {
        const cert = await api.get<HealthCert>(`/admin/health-certifications?petId=${id}`);
        if (Array.isArray(cert) && cert.length > 0) {
          setHealthCert(cert[0]);
        } else if (cert && !Array.isArray(cert)) {
          setHealthCert(cert);
        }
      } catch (_) {}
    } catch (err: any) {
      message.error(err.message || 'Failed to load pet');
      navigate('/pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPet(); }, [id]);

  const handleBanSubmit = async () => {
    if (!banReason.trim()) {
      message.warning('Please provide a reason for banning this pet');
      return;
    }
    try {
      await api.put(`/admin/pets/${pet!.id}/ban`, { reason: banReason });
      message.success(`${pet!.name} has been banned`);
      setBanModalOpen(false);
      fetchPet();
    } catch (err: any) {
      message.error(err.message || 'Failed to ban pet');
    }
  };

  const handleUnban = async () => {
    try {
      await api.put(`/admin/pets/${pet!.id}/unban`, {});
      message.success(`${pet!.name} has been unbanned`);
      fetchPet();
    } catch (err: any) {
      message.error(err.message || 'Failed to unban pet');
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!pet) return null;

  const photos = pet.photos || [];
  const speciesColor = pet.species === 'dog' ? '#1890ff' : pet.species === 'cat' ? '#722ed1' : pet.species === 'bird' ? '#fa8c16' : '#13c2c2';

  const getExpiryInfo = () => {
    if (!healthCert?.expiryDate) return null;
    const expiry = new Date(healthCert.expiryDate);
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((expiry.getTime() - new Date(healthCert.certDate).getTime()) / (1000 * 60 * 60 * 24));
    const percent = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
    return { daysLeft, percent, expired: daysLeft <= 0 };
  };

  const expiryInfo = getExpiryInfo();

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      {/* Header */}
      <Card size="small" style={{ borderLeft: `4px solid ${speciesColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space align="center" size={16}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/pets')}
              type="text"
              size="large"
            />
            <div>
              <Space align="center">
                <Title level={4} style={{ margin: 0 }}>{pet.name}</Title>
                {pet.healthCertified && (
                  <Tag icon={<SafetyCertificateOutlined />} color="green">Health Certified</Tag>
                )}
              </Space>
              <Text type="secondary">{pet.breed} &bull; {pet.species}</Text>
            </div>
          </Space>
          <Space>
            <Tag color={speciesColor}>{pet.species}</Tag>
            <Tag>{pet.gender}</Tag>
            <Tag color={pet.status === 'banned' ? 'red' : 'green'}>{pet.status || 'active'}</Tag>
          </Space>
        </div>
      </Card>

      {/* Ban notice */}
      {pet.status === 'banned' && pet.banReason && (
        <Card size="small" style={{ background: '#fff2f0', border: '1px solid #ffccc7' }}>
          <Text type="danger" strong>Ban Reason: </Text>
          <Text>{pet.banReason}</Text>
          {pet.bannedAt && (
            <Text type="secondary" style={{ marginLeft: 12, fontSize: 12 }}>
              Banned on {formatDate(pet.bannedAt)}
            </Text>
          )}
        </Card>
      )}

      {/* Quick Stats Row */}
      <Row gutter={16}>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic title="Photos" value={photos.length} suffix={`/ ${MAX_PHOTOS}`} valueStyle={{ fontSize: 20 }} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="Health Status"
              value={pet.healthCertified ? 'Certified' : 'Not Certified'}
              valueStyle={{ fontSize: 14, color: pet.healthCertified ? '#52c41a' : '#999' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic
              title="Mating"
              value={pet.isAvailableForMating ? 'Available' : 'Not Available'}
              valueStyle={{ fontSize: 14, color: pet.isAvailableForMating ? '#1890ff' : '#999' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card size="small" style={{ textAlign: 'center' }}>
            <Statistic title="Registered" value={formatDate(pet.createdAt, 'MMM YYYY')} valueStyle={{ fontSize: 14 }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={20}>
        {/* Left column - Photos & Health Cert */}
        <Col xs={24} lg={14}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card
              title={<Space><CameraOutlined /> Photos ({photos.length}/{MAX_PHOTOS})</Space>}
              size="small"
            >
              <style>{`
                .ant-image-preview-switch-left,
                .ant-image-preview-switch-right {
                  background: rgba(0,0,0,0.6) !important;
                  color: #fff !important;
                  width: 44px !important;
                  height: 44px !important;
                  border-radius: 50% !important;
                  display: flex !important;
                  align-items: center !important;
                  justify-content: center !important;
                  font-size: 18px !important;
                  opacity: 1 !important;
                  pointer-events: auto !important;
                }
                .ant-image-preview-switch-left:hover,
                .ant-image-preview-switch-right:hover {
                  background: rgba(0,0,0,0.85) !important;
                }
                .ant-image-preview-switch-left {
                  left: 24px !important;
                }
                .ant-image-preview-switch-right {
                  right: 24px !important;
                }
              `}</style>
              {photos.length > 0 ? (
                <Image.PreviewGroup>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8 }}>
                    {photos.map((photo, idx) => (
                      <Image
                        key={idx}
                        width="100%"
                        height={140}
                        src={photo.url}
                        style={{ objectFit: 'cover', borderRadius: 8 }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPkQ0jHrQAAAABJRU5ErkJggg=="
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
              ) : (
                <Empty
                  image={<CameraOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
                  imageStyle={{ height: 56 }}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text type="secondary">No photos uploaded yet</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Pet owners upload photos via the mobile app. Max {MAX_PHOTOS} photos per pet.
                      </Text>
                    </Space>
                  }
                />
              )}
            </Card>

            {/* Health Certification Card */}
            <Card
              title={<Space><MedicineBoxOutlined /> Health Certification</Space>}
              size="small"
              extra={
                healthCert ? (
                  <Tag color={healthCert.status === 'approved' ? 'green' : healthCert.status === 'pending' ? 'orange' : 'red'}>
                    {healthCert.status.toUpperCase()}
                  </Tag>
                ) : (
                  <Tag color="default">NO CERT</Tag>
                )
              }
            >
              {healthCert ? (
                <Space direction="vertical" size={12} style={{ width: '100%' }}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: 12 }}>Veterinarian</Text>
                      <div style={{ fontWeight: 500 }}>{healthCert.vetName}</div>
                      <Text type="secondary" style={{ fontSize: 12 }}>{healthCert.vetClinic}</Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: 12 }}>Certification Date</Text>
                      <div style={{ fontWeight: 500 }}>{formatDate(healthCert.certDate)}</div>
                      {healthCert.expiryDate && (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Expires: {formatDate(healthCert.expiryDate)}
                        </Text>
                      )}
                    </Col>
                  </Row>
                  {expiryInfo && healthCert.status === 'approved' && (
                    <>
                      <Divider style={{ margin: '8px 0' }} />
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>Certificate Validity</Text>
                          <Text
                            style={{ fontSize: 12, fontWeight: 500 }}
                            type={expiryInfo.expired ? 'danger' : expiryInfo.daysLeft <= 30 ? 'warning' : undefined}
                          >
                            {expiryInfo.expired ? 'EXPIRED' : `${expiryInfo.daysLeft} days remaining`}
                          </Text>
                        </div>
                        <Progress
                          percent={expiryInfo.percent}
                          showInfo={false}
                          strokeColor={expiryInfo.expired ? '#ff4d4f' : expiryInfo.daysLeft <= 30 ? '#faad14' : '#52c41a'}
                          size="small"
                        />
                      </div>
                    </>
                  )}
                  {healthCert.documents && healthCert.documents.length > 0 && (
                    <>
                      <Divider style={{ margin: '8px 0' }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
                          Documents ({healthCert.documents.length})
                        </Text>
                        <Image.PreviewGroup>
                          <Space>
                            {healthCert.documents.map((doc, i) => (
                              <Image
                                key={i}
                                width={60}
                                height={60}
                                src={doc.url}
                                style={{ objectFit: 'cover', borderRadius: 6 }}
                                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPkQ0jHrQAAAABJRU5ErkJggg=="
                              />
                            ))}
                          </Space>
                        </Image.PreviewGroup>
                      </div>
                    </>
                  )}
                </Space>
              ) : (
                <Empty
                  image={<MedicineBoxOutlined style={{ fontSize: 36, color: '#d9d9d9' }} />}
                  imageStyle={{ height: 44 }}
                  description={<Text type="secondary">No health certification submitted</Text>}
                />
              )}
            </Card>
          </Space>
        </Col>

        {/* Right column - Details */}
        <Col xs={24} lg={10}>
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            <Card
              size="small"
              title={<Space><HeartOutlined /> Basic Information</Space>}
            >
              <Descriptions column={1} size="small" labelStyle={{ color: '#888', width: 120 }}>
                <Descriptions.Item label="Name"><Text strong>{pet.name}</Text></Descriptions.Item>
                <Descriptions.Item label="Species"><Tag color={speciesColor}>{pet.species}</Tag></Descriptions.Item>
                <Descriptions.Item label="Breed">{pet.breed}</Descriptions.Item>
                <Descriptions.Item label="Gender">
                  <Tag color={pet.gender === 'male' ? 'blue' : 'magenta'}>{pet.gender}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{pet.dateOfBirth ? formatDate(pet.dateOfBirth) : '—'}</Descriptions.Item>
                <Descriptions.Item label="Color">{pet.color || '—'}</Descriptions.Item>
                <Descriptions.Item label="Weight">{pet.weight ? `${pet.weight} kg` : '—'}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              size="small"
              title={<Space><SafetyCertificateOutlined /> Health & Identity</Space>}
            >
              <Descriptions column={1} size="small" labelStyle={{ color: '#888', width: 140 }}>
                <Descriptions.Item label="Microchip ID">{pet.microchipId || '—'}</Descriptions.Item>
                <Descriptions.Item label="Neutered/Spayed">
                  {pet.isNeutered
                    ? <Tag icon={<CheckCircleOutlined />} color="green">Yes</Tag>
                    : <Tag icon={<CloseCircleOutlined />} color="default">No</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Available for Mating">
                  {pet.isAvailableForMating
                    ? <Tag icon={<CheckCircleOutlined />} color="green">Yes</Tag>
                    : <Tag icon={<CloseCircleOutlined />} color="default">No</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Health Certified">
                  {pet.healthCertified
                    ? <Tag icon={<SafetyCertificateOutlined />} color="green">Yes</Tag>
                    : <Tag icon={<CloseCircleOutlined />} color="default">No</Tag>}
                </Descriptions.Item>
                <Descriptions.Item label="Notes">{pet.notes || '—'}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              size="small"
              title={<Space><EnvironmentOutlined /> Location</Space>}
            >
              <Descriptions column={1} size="small" labelStyle={{ color: '#888', width: 100 }}>
                <Descriptions.Item label="Country">{pet.country || '—'}</Descriptions.Item>
                <Descriptions.Item label="City">{pet.city || '—'}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              size="small"
              title={<Space><UserOutlined /> Ownership</Space>}
            >
              <Descriptions column={1} size="small" labelStyle={{ color: '#888', width: 100 }}>
                <Descriptions.Item label="Owner"><Text strong>{pet.ownerName}</Text></Descriptions.Item>
                <Descriptions.Item label="Owner ID">
                  <Text copyable style={{ fontSize: 12 }}>{pet.ownerId || '—'}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Registered">
                  <Space>
                    <CalendarOutlined />
                    {formatDate(pet.createdAt)}
                  </Space>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Space>
        </Col>
      </Row>

      {/* Ban/Unban action */}
      {canBan && (
        <Card size="small">
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {pet.status !== 'banned' ? (
              <Button
                size="small"
                danger
                icon={<StopOutlined />}
                onClick={() => { setBanReason(''); setBanModalOpen(true); }}
              >
                Ban Pet
              </Button>
            ) : (
              <Button
                size="small"
                type="primary"
                ghost
                onClick={handleUnban}
              >
                Unban Pet
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Ban Modal */}
      <Modal
        title={`Ban Pet — ${pet.name}`}
        open={banModalOpen}
        onCancel={() => setBanModalOpen(false)}
        onOk={handleBanSubmit}
        okText="Ban Pet"
        okButtonProps={{ danger: true }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Text type="secondary">
            Banning this pet will hide it from the app. The pet owner will see the reason you provide below.
          </Text>
          <div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>Reason for ban *</Text>
            <Input.TextArea
              rows={3}
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="e.g. Inappropriate images, fake profile, policy violation..."
            />
          </div>
          <Card size="small" style={{ background: '#fffbe6', border: '1px solid #ffe58f' }}>
            <Text type="secondary" style={{ fontSize: 13 }}>
              This reason will be shown to the pet owner in the mobile app so they understand why their pet was hidden.
            </Text>
          </Card>
        </Space>
      </Modal>
    </Space>
  );
};

export default PetDetailsPage;
