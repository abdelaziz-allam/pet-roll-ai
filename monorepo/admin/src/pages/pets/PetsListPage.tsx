import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Select, Space, Card } from 'antd';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { PetsService, type PetListParams, type PetWithOwner } from '@/services/pets.service';
import { exportToCsv } from '@/utils/export';
import PetTable from './components/PetTable';

export default function PetsListPage() {
  const navigate = useNavigate();
  const [params, setParams] = useState<PetListParams>({
    page: 1,
    limit: 20,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-pets', params],
    queryFn: () => PetsService.getAllPets(params),
  });

  const handleSearch = (value: string) => {
    setParams((prev) => ({ ...prev, search: value || undefined, page: 1 }));
  };

  const handleSpeciesFilter = (value: string | undefined) => {
    setParams((prev) => ({ ...prev, species: value, page: 1 }));
  };

  const handleBreedFilter = (value: string) => {
    setParams((prev) => ({ ...prev, breed: value || undefined, page: 1 }));
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setParams((prev) => ({ ...prev, page, limit: pageSize }));
  };

  const handleRowClick = (record: PetWithOwner) => {
    navigate(`/pets/${record.id}`);
  };

  const handleExport = () => {
    if (!data?.data) return;
    exportToCsv(
      data.data.map((pet) => ({
        Name: pet.name,
        Species: pet.species,
        Breed: pet.breed,
        Gender: pet.gender,
        Weight: `${pet.weight} ${pet.weightUnit}`,
        Owner: pet.owner?.displayName || '',
        Neutered: pet.isNeutered ? 'Yes' : 'No',
        'Available for Mating': pet.isAvailableForMating ? 'Yes' : 'No',
        Created: pet.createdAt,
      })),
      'pets-export',
    );
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space wrap>
          <Input.Search
            placeholder="Search by name..."
            allowClear
            onSearch={handleSearch}
            prefix={<SearchOutlined />}
            style={{ width: 260 }}
          />
          <Select
            placeholder="Species"
            allowClear
            onChange={handleSpeciesFilter}
            style={{ width: 150 }}
            options={[
              { label: '🐕 Dog', value: 'dog' },
              { label: '🐈 Cat', value: 'cat' },
              { label: '🐦 Bird', value: 'bird' },
              { label: '🐇 Rabbit', value: 'rabbit' },
            ]}
          />
          <Input.Search
            placeholder="Filter by breed..."
            allowClear
            onSearch={handleBreedFilter}
            style={{ width: 200 }}
          />
        </Space>
        <PetTable
          data={data?.data || []}
          loading={isLoading}
          total={data?.pagination?.total}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
          headerTitle="All Pets"
          toolBarRender={() => [
            <Button
              key="export"
              icon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={!data?.data?.length}
            >
              Export CSV
            </Button>,
          ]}
        />
      </Space>
    </Card>
  );
}
