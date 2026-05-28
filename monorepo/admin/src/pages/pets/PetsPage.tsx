import { useState, useEffect } from 'react';
import {
  Table, Card, Input, Select, Tag, Space, Typography, Avatar, Button, Tooltip,
  message, Drawer, Row, Col, Progress, Divider, Image, Empty, Spin, Badge,
  Statistic, Modal, Descriptions,
} from 'antd';
import {
  SearchOutlined, EyeOutlined, HeartOutlined, CameraOutlined,
  MedicineBoxOutlined, SafetyCertificateOutlined, CalendarOutlined,
  UserOutlined, EnvironmentOutlined, CheckCircleOutlined, CloseCircleOutlined,
  StopOutlined, ManOutlined, WomanOutlined, InfoCircleOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';
import { usePermission } from '@/hooks/usePermission';

const { Title, Text } = Typography;
const { Option } = Select;

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  ownerName: string;
  country?: string;
  city?: string;
  status: string;
  createdAt: string;
}

interface PetDetail {
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

const speciesEmoji: Record<string, string> = {
  dog: '🐕', cat: '🐱', bird: '🐦', horse: '🐴', rabbit: '🐰', fish: '🐠', reptile: '🦎',
};

const speciesColors: Record<string, string> = {
  dog: '#1890ff', cat: '#722ed1', bird: '#fa8c16', horse: '#13c2c2', rabbit: '#eb2f96', fish: '#2f54eb', reptile: '#52c41a',
};

const PetsPage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);
  const [genderFilter, setGenderFilter] = useState<string | undefined>(undefined);

  const [selectedPet, setSelectedPet] = useState<PetDetail | null>(null);
  const [healthCert, setHealthCert] = useState<HealthCert | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);

  const [banModalOpen, setBanModalOpen] = useState(false);
  const [banReason, setBanReason] = useState('');

  const { canPerformAction } = usePermission();
  const canBan = canPerformAction('pets', 'delete');

  const fetchPets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (speciesFilter) params.set('species', speciesFilter);
      if (statusFilter) params.set('status', statusFilter);
      if (countryFilter) params.set('country', countryFilter);
      if (cityFilter) params.set('city', cityFilter);
      const res = await api.get<{ data: Pet[]; total: number }>(`/admin/pets?${params}`);
      setPets(res.data);
    } catch (err: any) {
      message.error(err.message || 'Failed to load pets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPets(); }, [speciesFilter, statusFilter, countryFilter, cityFilter]);

  const uniqueCountries = [...new Set(pets.map(p => p.country).filter(Boolean))].sort();
  const uniqueCities = [...new Set(pets.map(p => p.city).filter(Boolean))].sort();

  const filteredPets = pets.filter((p) => {
    if (genderFilter && p.gender !== genderFilter) return false;
    if (!search) return true;
    return p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.breed?.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName?.toLowerCase().includes(search.toLowerCase());
  });

  const openPetDetail = async (petId: string) => {
    setDrawerOpen(true);
    setDetailLoading(true);
    setSelectedPet(null);
    setHealthCert(null);
    try {
      const data = await api.get<PetDetail>(`/admin/pets/${petId}`);
      setSelectedPet(data);
      try {
        const cert = await api.get<HealthCert>(`/admin/health-certifications?petId=${petId}`);
        if (Array.isArray(cert) && cert.length > 0) {
          setHealthCert(cert[0]);
        } else if (cert && !Array.isArray(cert)) {
          setHealthCert(cert);
        }
      } catch {}
    } catch (err: any) {
      message.error(err.message || 'Failed to load pet details');
      setDrawerOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleBan = async () => {
    if (!banReason.trim()) { message.warning('Please provide a ban reason'); return; }
    try {
      await api.put(`/admin/pets/${selectedPet!.id}/ban`, { reason: banReason });
      message.success(`${selectedPet!.name} has been banned`);
      setBanModalOpen(false);
      setBanReason('');
      openPetDetail(selectedPet!.id);
      fetchPets();
    } catch (err: any) { message.error(err.message || 'Failed to ban'); }
  };

  const handleUnban = async () => {
    try {
      await api.put(`/admin/pets/${selectedPet!.id}/unban`, {});
      message.success(`${selectedPet!.name} has been unbanned`);
      openPetDetail(selectedPet!.id);
      fetchPets();
    } catch (err: any) { message.error(err.message || 'Failed to unban'); }
  };

  const getExpiryInfo = () => {
    if (!healthCert?.expiryDate) return null;
    const expiry = new Date(healthCert.expiryDate);
    const now = new Date();
    const daysLeft = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((expiry.getTime() - new Date(healthCert.certDate).getTime()) / (1000 * 60 * 60 * 24));
    const percent = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));
    return { daysLeft, percent, expired: daysLeft <= 0 };
  };

  const columns = [
    {
      title: 'Pet',
      key: 'pet',
      render: (_: any, record: Pet) => (
        <Space>
          <Avatar
            style={{
              backgroundColor: speciesColors[record.species] || '#999',
              fontSize: 16,
            }}
          >
            {speciesEmoji[record.species] || record.name?.[0] || '?'}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{record.name}</div>
            <div style={{ color: '#8c8c8c', fontSize: 11 }}>{record.breed}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
      render: (s: string) => (
        <Tag color={speciesColors[s] || 'default'} style={{ borderRadius: 12, fontWeight: 500 }}>
          {speciesEmoji[s] || ''} {s}
        </Tag>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (g: string) => (
        <Space size={4}>
          {g === 'male' ? <ManOutlined style={{ color: '#1890ff' }} /> : <WomanOutlined style={{ color: '#eb2f96' }} />}
          <span style={{ textTransform: 'capitalize' }}>{g}</span>
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      key: 'owner',
      render: (name: string) => <Text style={{ fontSize: 13 }}>{name}</Text>,
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, record: Pet) => (
        record.country ? (
          <Space size={4}>
            <EnvironmentOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.city ? `${record.city}, ` : ''}{record.country}
            </Text>
          </Space>
        ) : <Text type="secondary">—</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge
          status={status === 'banned' ? 'error' : 'success'}
          text={<span style={{ fontSize: 12, textTransform: 'capitalize' }}>{status || 'active'}</span>}
        />
      ),
    },
    {
      title: 'Registered',
      dataIndex: 'createdAt',
      key: 'created',
      render: (date: string) => <Text type="secondary" style={{ fontSize: 12 }}>{formatDate(date)}</Text>,
    },
    {
      title: '',
      key: 'actions',
      width: 50,
      render: (_: any, record: Pet) => (
        <Tooltip title="View details">
          <Button
            size="small"
            type="text"
            icon={<EyeOutlined />}
            onClick={(e) => { e.stopPropagation(); openPetDetail(record.id); }}
          />
        </Tooltip>
      ),
    },
  ];

  const expiryInfo = getExpiryInfo();

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>Pet Registry</Title>
        <Text type="secondary">View and manage all registered pets</Text>
      </div>

      <Card>
        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by name, breed, or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 280 }}
          />
          <Select placeholder="Species" allowClear value={speciesFilter} onChange={setSpeciesFilter} style={{ width: 150 }}>
            <Option value="dog">🐕 Dog</Option>
            <Option value="cat">🐱 Cat</Option>
            <Option value="bird">🐦 Bird</Option>
            <Option value="horse">🐴 Horse</Option>
            <Option value="rabbit">🐰 Rabbit</Option>
            <Option value="fish">🐠 Fish</Option>
            <Option value="reptile">🦎 Reptile</Option>
            <Option value="other">Other</Option>
          </Select>
          <Select placeholder="Status" allowClear value={statusFilter} onChange={setStatusFilter} style={{ width: 130 }}>
            <Option value="active">Active</Option>
            <Option value="banned">Banned</Option>
          </Select>
          <Select placeholder="Gender" allowClear value={genderFilter} onChange={setGenderFilter} style={{ width: 130 }}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Select placeholder="Country" allowClear value={countryFilter} onChange={setCountryFilter} style={{ width: 150 }}>
            {uniqueCountries.map((c) => <Option key={c} value={c}>{c}</Option>)}
          </Select>
          <Select placeholder="City" allowClear value={cityFilter} onChange={setCityFilter} style={{ width: 150 }}>
            {uniqueCities.map((c) => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredPets}
          rowKey="id"
          loading={loading}
          scroll={{ x: 900 }}
          pagination={{ pageSize: 10, showTotal: (total) => `${total} pets` }}
          onRow={(record) => ({
            onClick: () => openPetDetail(record.id),
            style: { cursor: 'pointer' },
          })}
          size="middle"
        />
      </Card>

      {/* Pet Detail Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={Math.min(720, window.innerWidth - 20)}
        styles={{ body: { padding: 0, background: '#f8f9fa' } }}
        title={null}
        closable={false}
      >
        {detailLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
            <Spin size="large" />
          </div>
        ) : selectedPet ? (
          <PetDetailContent
            pet={selectedPet}
            healthCert={healthCert}
            expiryInfo={expiryInfo}
            canBan={canBan}
            onBan={() => { setBanReason(''); setBanModalOpen(true); }}
            onUnban={handleUnban}
            onClose={() => setDrawerOpen(false)}
          />
        ) : null}
      </Drawer>

      {/* Ban Modal */}
      <Modal
        title={`Ban Pet — ${selectedPet?.name}`}
        open={banModalOpen}
        onCancel={() => setBanModalOpen(false)}
        onOk={handleBan}
        okText="Ban Pet"
        okButtonProps={{ danger: true }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          <Text type="secondary">
            Banning this pet will hide it from the app. The owner will see the reason below.
          </Text>
          <Input.TextArea
            rows={3}
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            placeholder="e.g. Inappropriate images, fake profile, policy violation..."
          />
        </Space>
      </Modal>
    </Space>
  );
};

function PetDetailContent({
  pet, healthCert, expiryInfo, canBan, onBan, onUnban, onClose,
}: {
  pet: PetDetail;
  healthCert: HealthCert | null;
  expiryInfo: { daysLeft: number; percent: number; expired: boolean } | null;
  canBan: boolean;
  onBan: () => void;
  onUnban: () => void;
  onClose: () => void;
}) {
  const photos = pet.photos || [];
  const speciesColor = speciesColors[pet.species] || '#999';

  return (
    <div>
      {/* Hero Header */}
      <div style={{
        background: `linear-gradient(135deg, ${speciesColor}15, ${speciesColor}08)`,
        borderBottom: `3px solid ${speciesColor}`,
        padding: '24px 28px',
        position: 'relative',
      }}>
        <Button
          type="text"
          size="small"
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, fontSize: 18 }}
        >
          ✕
        </Button>

        <Space size={20} align="start">
          <Avatar
            size={80}
            src={photos[0]?.url}
            style={{
              backgroundColor: speciesColor,
              fontSize: 32,
              border: `3px solid ${speciesColor}40`,
              boxShadow: `0 4px 12px ${speciesColor}30`,
            }}
          >
            {speciesEmoji[pet.species] || pet.name[0]}
          </Avatar>
          <div>
            <Space align="center" size={8}>
              <Title level={3} style={{ margin: 0 }}>{pet.name}</Title>
              {pet.healthCertified && (
                <Tag icon={<SafetyCertificateOutlined />} color="green" style={{ borderRadius: 12 }}>Certified</Tag>
              )}
            </Space>
            <Text style={{ display: 'block', color: '#666', marginTop: 2 }}>
              {pet.breed} &bull; {speciesEmoji[pet.species]} {pet.species}
            </Text>
            <Space style={{ marginTop: 10 }} size={6}>
              <Tag color={speciesColor} style={{ borderRadius: 12 }}>{pet.species}</Tag>
              <Tag
                color={pet.gender === 'male' ? 'blue' : 'magenta'}
                icon={pet.gender === 'male' ? <ManOutlined /> : <WomanOutlined />}
                style={{ borderRadius: 12 }}
              >
                {pet.gender}
              </Tag>
              <Tag
                color={pet.status === 'banned' ? 'red' : 'green'}
                style={{ borderRadius: 12 }}
              >
                {pet.status || 'active'}
              </Tag>
            </Space>
          </div>
        </Space>
      </div>

      {/* Ban Notice */}
      {pet.status === 'banned' && pet.banReason && (
        <div style={{ margin: '16px 20px 0', padding: '10px 16px', background: '#fff2f0', borderRadius: 8, border: '1px solid #ffccc7' }}>
          <Text type="danger" strong style={{ fontSize: 12 }}>BANNED: </Text>
          <Text style={{ fontSize: 12 }}>{pet.banReason}</Text>
          {pet.bannedAt && <Text type="secondary" style={{ marginLeft: 8, fontSize: 11 }}>({formatDate(pet.bannedAt)})</Text>}
        </div>
      )}

      {/* Quick Stats */}
      <div style={{ padding: '16px 20px' }}>
        <Row gutter={12}>
          <Col span={6}>
            <div style={{ textAlign: 'center', padding: '12px 8px', background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <CameraOutlined style={{ fontSize: 18, color: '#1890ff' }} />
              <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>{photos.length}</div>
              <div style={{ fontSize: 11, color: '#999' }}>Photos</div>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', padding: '12px 8px', background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <SafetyCertificateOutlined style={{ fontSize: 18, color: pet.healthCertified ? '#52c41a' : '#d9d9d9' }} />
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, color: pet.healthCertified ? '#52c41a' : '#999' }}>
                {pet.healthCertified ? 'Yes' : 'No'}
              </div>
              <div style={{ fontSize: 11, color: '#999' }}>Health Cert</div>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', padding: '12px 8px', background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <HeartOutlined style={{ fontSize: 18, color: pet.isAvailableForMating ? '#eb2f96' : '#d9d9d9' }} />
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6, color: pet.isAvailableForMating ? '#eb2f96' : '#999' }}>
                {pet.isAvailableForMating ? 'Yes' : 'No'}
              </div>
              <div style={{ fontSize: 11, color: '#999' }}>Mating</div>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ textAlign: 'center', padding: '12px 8px', background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <CalendarOutlined style={{ fontSize: 18, color: '#faad14' }} />
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{formatDate(pet.createdAt, 'MMM YY')}</div>
              <div style={{ fontSize: 11, color: '#999' }}>Registered</div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Content Sections */}
      <div style={{ padding: '0 20px 24px' }}>
        {/* Photos */}
        {photos.length > 0 && (
          <Card
            size="small"
            style={{ marginBottom: 16, borderRadius: 12, overflow: 'hidden' }}
            title={<Space><CameraOutlined /> Photos ({photos.length})</Space>}
          >
            <Image.PreviewGroup>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
                {photos.slice(0, 8).map((photo, idx) => (
                  <Image
                    key={idx}
                    width="100%"
                    height={100}
                    src={photo.url}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPkQ0jHrQAAAABJRU5ErkJggg=="
                  />
                ))}
              </div>
            </Image.PreviewGroup>
            {photos.length > 8 && (
              <Text type="secondary" style={{ fontSize: 11, marginTop: 8, display: 'block' }}>
                +{photos.length - 8} more photos
              </Text>
            )}
          </Card>
        )}

        {/* Basic Info + Health side by side */}
        <Row gutter={12}>
          <Col span={12}>
            <Card size="small" style={{ marginBottom: 12, borderRadius: 12, height: '100%' }}
              title={<Space style={{ fontSize: 13 }}><InfoCircleOutlined /> Details</Space>}
            >
              <div style={{ fontSize: 12 }}>
                <InfoRow label="Breed" value={pet.breed} />
                <InfoRow label="Color" value={pet.color || '—'} />
                <InfoRow label="Weight" value={pet.weight ? `${pet.weight} kg` : '—'} />
                <InfoRow label="DOB" value={pet.dateOfBirth ? formatDate(pet.dateOfBirth) : '—'} />
                <InfoRow label="Microchip" value={pet.microchipId || '—'} />
                <InfoRow label="Neutered" value={
                  pet.isNeutered
                    ? <Tag color="green" style={{ fontSize: 11, padding: '0 6px', borderRadius: 8 }}>Yes</Tag>
                    : <Tag style={{ fontSize: 11, padding: '0 6px', borderRadius: 8 }}>No</Tag>
                } />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" style={{ marginBottom: 12, borderRadius: 12, height: '100%' }}
              title={<Space style={{ fontSize: 13 }}><EnvironmentOutlined /> Location & Owner</Space>}
            >
              <div style={{ fontSize: 12 }}>
                <InfoRow label="Country" value={pet.country || '—'} />
                <InfoRow label="City" value={pet.city || '—'} />
                <Divider style={{ margin: '8px 0' }} />
                <InfoRow label="Owner" value={<Text strong style={{ fontSize: 12 }}>{pet.ownerName}</Text>} />
                <InfoRow label="Owner ID" value={
                  <Text copyable style={{ fontSize: 11, fontFamily: 'monospace' }}>
                    {pet.ownerId ? `${pet.ownerId.slice(0, 16)}...` : '—'}
                  </Text>
                } />
              </div>
            </Card>
          </Col>
        </Row>

        {/* Health Certification */}
        <Card
          size="small"
          style={{ marginBottom: 12, borderRadius: 12 }}
          title={<Space style={{ fontSize: 13 }}><MedicineBoxOutlined /> Health Certification</Space>}
          extra={
            healthCert ? (
              <Tag
                color={healthCert.status === 'approved' ? 'green' : healthCert.status === 'pending' ? 'orange' : 'red'}
                style={{ borderRadius: 10, fontSize: 11 }}
              >
                {healthCert.status.toUpperCase()}
              </Tag>
            ) : <Tag style={{ borderRadius: 10, fontSize: 11 }}>NO CERT</Tag>
          }
        >
          {healthCert ? (
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text type="secondary" style={{ fontSize: 11 }}>Veterinarian</Text>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{healthCert.vetName}</div>
                  <Text type="secondary" style={{ fontSize: 11 }}>{healthCert.vetClinic}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary" style={{ fontSize: 11 }}>Dates</Text>
                  <div style={{ fontWeight: 500, fontSize: 12 }}>Issued: {formatDate(healthCert.certDate)}</div>
                  {healthCert.expiryDate && (
                    <div style={{ fontSize: 12, color: '#666' }}>Expires: {formatDate(healthCert.expiryDate)}</div>
                  )}
                </Col>
              </Row>
              {expiryInfo && healthCert.status === 'approved' && (
                <div style={{ background: expiryInfo.expired ? '#fff2f0' : '#f6ffed', padding: '8px 12px', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 11 }}>Validity</Text>
                    <Text
                      style={{ fontSize: 11, fontWeight: 600 }}
                      type={expiryInfo.expired ? 'danger' : expiryInfo.daysLeft <= 30 ? 'warning' : 'success'}
                    >
                      {expiryInfo.expired ? 'EXPIRED' : `${expiryInfo.daysLeft} days left`}
                    </Text>
                  </div>
                  <Progress
                    percent={expiryInfo.percent}
                    showInfo={false}
                    strokeColor={expiryInfo.expired ? '#ff4d4f' : expiryInfo.daysLeft <= 30 ? '#faad14' : '#52c41a'}
                    size="small"
                  />
                </div>
              )}
              {healthCert.documents?.length > 0 && (
                <Image.PreviewGroup>
                  <Space size={6}>
                    {healthCert.documents.map((doc, i) => (
                      <Image
                        key={i}
                        width={50}
                        height={50}
                        src={doc.url}
                        style={{ objectFit: 'cover', borderRadius: 6 }}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwAJhAPkQ0jHrQAAAABJRU5ErkJggg=="
                      />
                    ))}
                  </Space>
                </Image.PreviewGroup>
              )}
            </Space>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <MedicineBoxOutlined style={{ fontSize: 28, color: '#d9d9d9' }} />
              <div style={{ marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>No certification submitted</Text>
              </div>
            </div>
          )}
        </Card>

        {/* Notes */}
        {pet.notes && (
          <Card size="small" style={{ marginBottom: 12, borderRadius: 12 }}
            title={<Space style={{ fontSize: 13 }}><InfoCircleOutlined /> Notes</Space>}
          >
            <Text style={{ fontSize: 12 }}>{pet.notes}</Text>
          </Card>
        )}

        {/* Actions */}
        {canBan && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            {pet.status !== 'banned' ? (
              <Button size="small" danger icon={<StopOutlined />} onClick={onBan}>
                Ban Pet
              </Button>
            ) : (
              <Button size="small" type="primary" ghost onClick={onUnban}>
                Unban Pet
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
      <Text type="secondary" style={{ fontSize: 12 }}>{label}</Text>
      <div style={{ fontSize: 12, textAlign: 'right' }}>{value}</div>
    </div>
  );
}

export default PetsPage;
