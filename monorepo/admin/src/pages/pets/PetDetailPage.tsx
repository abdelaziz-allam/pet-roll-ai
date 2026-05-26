import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  Descriptions,
  Tag,
  Button,
  Space,
  Tabs,
  Table,
  Image,
  Carousel,
  Modal,
  Input,
  Breadcrumb,
  Spin,
  Empty,
  Typography,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  FlagOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { PetsService, type PetWithOwner } from '@/services/pets.service';
import { usePermission } from '@/hooks/usePermission';
import { formatDate } from '@/utils/format';
import { relativeTime } from '@/utils/date';

const { Text } = Typography;

export default function PetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { can } = usePermission();
  const [flagModalOpen, setFlagModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [reason, setReason] = useState('');

  const { data: pet, isLoading } = useQuery({
    queryKey: ['admin-pet', id],
    queryFn: () => PetsService.getPetDetail(id!),
    enabled: !!id,
  });

  const flagMutation = useMutation({
    mutationFn: (flagReason: string) => PetsService.flagPet(id!, flagReason),
    onSuccess: () => {
      message.success('Pet flagged successfully');
      setFlagModalOpen(false);
      setReason('');
      queryClient.invalidateQueries({ queryKey: ['admin-pet', id] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (removeReason: string) => PetsService.removePet(id!, removeReason),
    onSuccess: () => {
      message.success('Pet removed successfully');
      navigate('/pets');
    },
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!pet) {
    return <Empty description="Pet not found" />;
  }

  const age = pet.dateOfBirth
    ? relativeTime(pet.dateOfBirth)
    : 'Unknown';

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Breadcrumb
        items={[
          { title: <Link to="/pets">Pets</Link> },
          { title: pet.name },
        ]}
      />

      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/pets')}>
        Back to Pets
      </Button>

      <Card>
        {pet.photos?.length > 0 && (
          <div style={{ maxWidth: 500, margin: '0 auto 24px' }}>
            <Carousel autoplay>
              {pet.photos.map((photo, idx) => (
                <div key={idx}>
                  <Image
                    src={photo}
                    alt={`${pet.name} photo ${idx + 1}`}
                    style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 8 }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        <Descriptions title={pet.name} bordered column={{ xs: 1, sm: 2, md: 3 }}>
          <Descriptions.Item label="Species" span={1}>
            <span style={{ textTransform: 'capitalize' }}>{pet.species}</span>
          </Descriptions.Item>
          <Descriptions.Item label="Breed">{pet.breed}</Descriptions.Item>
          <Descriptions.Item label="Gender">
            <Tag color={pet.gender === 'male' ? 'blue' : 'pink'}>{pet.gender}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {pet.dateOfBirth ? formatDate(pet.dateOfBirth) : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Age">{age}</Descriptions.Item>
          <Descriptions.Item label="Weight">
            {pet.weight ? `${pet.weight} ${pet.weightUnit || 'kg'}` : '-'}
          </Descriptions.Item>
          <Descriptions.Item label="Neutered">
            <Tag color={pet.isNeutered ? 'green' : 'default'}>
              {pet.isNeutered ? 'Yes' : 'No'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mating Availability">
            <Tag color={pet.isAvailableForMating ? 'purple' : 'default'}>
              {pet.isAvailableForMating ? 'Available' : 'Not Available'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Registered">
            {formatDate(pet.createdAt)}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {pet.owner && (
        <Card title="Owner" size="small">
          <Space>
            <UserOutlined />
            <Link to={`/users/${pet.owner.id}`}>
              <Text strong>{pet.owner.displayName}</Text>
            </Link>
            <Text type="secondary">({pet.owner.email})</Text>
          </Space>
        </Card>
      )}

      <Card>
        <Tabs
          items={[
            {
              key: 'health',
              label: 'Health Records',
              children: (
                <Table
                  dataSource={[]}
                  columns={[
                    { title: 'Date', dataIndex: 'date', key: 'date' },
                    { title: 'Type', dataIndex: 'type', key: 'type' },
                    { title: 'Description', dataIndex: 'description', key: 'description' },
                    { title: 'Vet', dataIndex: 'vet', key: 'vet' },
                  ]}
                  locale={{ emptyText: 'No health records' }}
                  pagination={false}
                />
              ),
            },
            {
              key: 'vaccinations',
              label: 'Vaccinations',
              children: (
                <Table
                  dataSource={[]}
                  columns={[
                    { title: 'Vaccine', dataIndex: 'vaccine', key: 'vaccine' },
                    { title: 'Date Given', dataIndex: 'dateGiven', key: 'dateGiven' },
                    { title: 'Next Due', dataIndex: 'nextDue', key: 'nextDue' },
                    { title: 'Administered By', dataIndex: 'administeredBy', key: 'administeredBy' },
                  ]}
                  locale={{ emptyText: 'No vaccination records' }}
                  pagination={false}
                />
              ),
            },
            {
              key: 'pregnancy',
              label: 'Pregnancy',
              children: (
                <Empty description="No pregnancy data available" />
              ),
            },
            {
              key: 'mating',
              label: 'Mating Listings',
              children: (
                <Empty description="No mating listings" />
              ),
            },
          ]}
        />
      </Card>

      {can('pet_management') && (
        <Card title="Admin Actions" size="small">
          <Space>
            <Button
              icon={<FlagOutlined />}
              onClick={() => setFlagModalOpen(true)}
            >
              Flag Pet
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => setRemoveModalOpen(true)}
            >
              Remove Pet
            </Button>
          </Space>
        </Card>
      )}

      <Modal
        title="Flag Pet"
        open={flagModalOpen}
        onCancel={() => setFlagModalOpen(false)}
        onOk={() => flagMutation.mutate(reason)}
        okText="Flag"
        confirmLoading={flagMutation.isPending}
        okButtonProps={{ disabled: !reason.trim() }}
      >
        <Input.TextArea
          rows={4}
          placeholder="Reason for flagging this pet..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>

      <Modal
        title="Remove Pet"
        open={removeModalOpen}
        onCancel={() => setRemoveModalOpen(false)}
        onOk={() => removeMutation.mutate(reason)}
        okText="Remove"
        okButtonProps={{ danger: true, disabled: !reason.trim() }}
        confirmLoading={removeMutation.isPending}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Text type="danger">
            This action will permanently remove the pet from the platform. The owner will be notified.
          </Text>
          <Input.TextArea
            rows={4}
            placeholder="Reason for removal (required)..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Space>
      </Modal>
    </Space>
  );
}
