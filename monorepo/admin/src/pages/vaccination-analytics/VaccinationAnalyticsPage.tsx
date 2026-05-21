import { useState, useEffect } from 'react';
import {
  Card, Typography, Select, Space, Row, Col, Statistic, Table, Tag, Progress,
  message, Spin, Empty,
} from 'antd';
import {
  ExperimentOutlined, GlobalOutlined, RiseOutlined,
  MedicineBoxOutlined, TeamOutlined, CalendarOutlined,
  EnvironmentOutlined, TrophyOutlined,
} from '@ant-design/icons';
import { api } from '@/services/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface VaccineRank {
  vaccineName: string;
  count: number;
  speciesBreakdown: Record<string, number>;
  countries: Record<string, number>;
  cities: Record<string, number>;
}

interface AnalyticsData {
  topVaccines: VaccineRank[];
  summary: {
    totalVaccinations: number;
    uniqueVaccines: number;
    uniquePetsVaccinated: number;
    period: string;
  };
  filters: {
    species: string[];
    countries: string[];
    cities: string[];
  };
}

const periodOptions = [
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '6m', label: 'Last 6 Months' },
  { value: '1y', label: 'Last Year' },
  { value: 'all', label: 'All Time' },
];

const speciesEmoji: Record<string, string> = {
  dog: '🐕', cat: '🐱', bird: '🐦', horse: '🐴', rabbit: '🐰', fish: '🐠', reptile: '🦎',
};

const speciesColors: Record<string, string> = {
  dog: '#1890ff', cat: '#722ed1', bird: '#fa8c16', horse: '#13c2c2', rabbit: '#eb2f96', fish: '#2f54eb', reptile: '#52c41a',
};

const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

const VaccinationAnalyticsPage: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('all');
  const [species, setSpecies] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [city, setCity] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (period) params.set('period', period);
      if (species) params.set('species', species);
      if (country) params.set('country', country);
      if (city) params.set('city', city);
      const result = await api.get<AnalyticsData>(`/admin/vaccination-analytics?${params}`);
      setData(result);
    } catch (err: any) {
      message.error(err.message || 'Failed to load vaccination analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [period, species, country, city]);

  const maxCount = data?.topVaccines[0]?.count || 1;

  const columns = [
    {
      title: '#',
      key: 'rank',
      width: 50,
      render: (_: any, __: any, idx: number) => (
        idx < 3 ? (
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: `${medalColors[idx]}20`, border: `2px solid ${medalColors[idx]}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 12,
          }}>
            {idx + 1}
          </div>
        ) : (
          <Text type="secondary" style={{ fontWeight: 500 }}>{idx + 1}</Text>
        )
      ),
    },
    {
      title: 'Vaccine',
      key: 'name',
      render: (_: any, record: VaccineRank, idx: number) => (
        <div>
          <Text strong style={{ fontSize: idx < 3 ? 14 : 13 }}>{record.vaccineName}</Text>
          <div style={{ marginTop: 4 }}>
            <Progress
              percent={Math.round((record.count / maxCount) * 100)}
              showInfo={false}
              strokeColor={idx < 3 ? medalColors[idx] : '#1890ff'}
              size="small"
              style={{ maxWidth: 200 }}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      width: 80,
      render: (count: number, _: any, idx: number) => (
        <Text strong style={{ fontSize: idx < 3 ? 16 : 14, color: idx < 3 ? medalColors[idx] : undefined }}>
          {count}
        </Text>
      ),
    },
    {
      title: 'Species',
      key: 'species',
      width: 200,
      render: (_: any, record: VaccineRank) => (
        <Space size={4} wrap>
          {Object.entries(record.speciesBreakdown).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([sp, count]) => (
            <Tag
              key={sp}
              color={speciesColors[sp] || 'default'}
              style={{ borderRadius: 10, fontSize: 11, padding: '0 6px' }}
            >
              {speciesEmoji[sp] || ''} {count}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Top Locations',
      key: 'locations',
      render: (_: any, record: VaccineRank) => (
        <Space size={4} wrap>
          {Object.entries(record.countries).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([c, count]) => (
            <Tag key={c} style={{ borderRadius: 10, fontSize: 11, padding: '0 6px' }}>
              {c} ({count})
            </Tag>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size={20} style={{ width: '100%' }}>
      {/* Header */}
      <div>
        <Space align="center" size={12}>
          <ExperimentOutlined style={{ fontSize: 24, color: '#1890ff' }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>Vaccination Analytics</Title>
            <Text type="secondary">Top vaccines administered across all pets — filter by period, species, and location</Text>
          </div>
        </Space>
      </div>

      {/* Filters */}
      <Card size="small" style={{ borderRadius: 12 }}>
        <Space wrap size={12}>
          <Space size={4}>
            <CalendarOutlined style={{ color: '#666' }} />
            <Select value={period} onChange={setPeriod} style={{ width: 160 }}>
              {periodOptions.map(o => <Option key={o.value} value={o.value}>{o.label}</Option>)}
            </Select>
          </Space>
          <Space size={4}>
            <MedicineBoxOutlined style={{ color: '#666' }} />
            <Select
              placeholder="All Species"
              allowClear
              value={species}
              onChange={(v) => setSpecies(v)}
              style={{ width: 150 }}
            >
              {(data?.filters.species || []).map(s => (
                <Option key={s} value={s}>{speciesEmoji[s] || ''} {s}</Option>
              ))}
            </Select>
          </Space>
          <Space size={4}>
            <GlobalOutlined style={{ color: '#666' }} />
            <Select
              placeholder="All Countries"
              allowClear
              value={country}
              onChange={(v) => { setCountry(v); setCity(undefined); }}
              style={{ width: 160 }}
            >
              {(data?.filters.countries || []).map(c => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Space>
          <Space size={4}>
            <EnvironmentOutlined style={{ color: '#666' }} />
            <Select
              placeholder="All Cities"
              allowClear
              value={city}
              onChange={(v) => setCity(v)}
              style={{ width: 150 }}
              disabled={!country}
            >
              {(data?.filters.cities || []).map(c => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Space>
        </Space>
      </Card>

      {/* Summary Stats */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : data ? (
        <>
          <Row gutter={16}>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ borderRadius: 12, borderTop: '3px solid #1890ff' }}>
                <Statistic
                  title={<Space size={4}><ExperimentOutlined /> Total Vaccinations</Space>}
                  value={data.summary.totalVaccinations}
                  valueStyle={{ color: '#1890ff', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ borderRadius: 12, borderTop: '3px solid #722ed1' }}>
                <Statistic
                  title={<Space size={4}><MedicineBoxOutlined /> Unique Vaccines</Space>}
                  value={data.summary.uniqueVaccines}
                  valueStyle={{ color: '#722ed1', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ borderRadius: 12, borderTop: '3px solid #52c41a' }}>
                <Statistic
                  title={<Space size={4}><TeamOutlined /> Pets Vaccinated</Space>}
                  value={data.summary.uniquePetsVaccinated}
                  valueStyle={{ color: '#52c41a', fontWeight: 700 }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card size="small" style={{ borderRadius: 12, borderTop: '3px solid #faad14' }}>
                <Statistic
                  title={<Space size={4}><CalendarOutlined /> Period</Space>}
                  value={periodOptions.find(p => p.value === period)?.label || 'All Time'}
                  valueStyle={{ fontSize: 18, fontWeight: 600, color: '#faad14' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Top 3 Podium */}
          {data.topVaccines.length >= 3 && (
            <Card size="small" style={{ borderRadius: 12 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <Space size={8}>
                  <TrophyOutlined style={{ color: '#FFD700', fontSize: 20 }} />
                  <Text strong style={{ fontSize: 16 }}>Top 3 Most Administered Vaccines</Text>
                </Space>
              </div>
              <Row gutter={16} justify="center" align="bottom">
                {[1, 0, 2].map((rankIdx) => {
                  const vaccine = data.topVaccines[rankIdx];
                  if (!vaccine) return null;
                  const isFirst = rankIdx === 0;
                  return (
                    <Col key={rankIdx} xs={8} style={{ textAlign: 'center' }}>
                      <div style={{
                        background: `${medalColors[rankIdx]}10`,
                        border: `2px solid ${medalColors[rankIdx]}40`,
                        borderRadius: 16,
                        padding: isFirst ? '24px 12px' : '16px 12px',
                        transition: 'all 0.3s',
                      }}>
                        <div style={{
                          width: isFirst ? 56 : 44,
                          height: isFirst ? 56 : 44,
                          borderRadius: '50%',
                          background: `${medalColors[rankIdx]}30`,
                          border: `3px solid ${medalColors[rankIdx]}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          margin: '0 auto 12px',
                          fontSize: isFirst ? 22 : 18, fontWeight: 800,
                        }}>
                          {rankIdx + 1}
                        </div>
                        <Text strong style={{ fontSize: isFirst ? 14 : 12, display: 'block' }}>
                          {vaccine.vaccineName}
                        </Text>
                        <div style={{
                          fontSize: isFirst ? 28 : 22,
                          fontWeight: 800,
                          color: medalColors[rankIdx],
                          margin: '8px 0',
                        }}>
                          {vaccine.count}
                        </div>
                        <Text type="secondary" style={{ fontSize: 11 }}>doses</Text>
                        <div style={{ marginTop: 8 }}>
                          {Object.entries(vaccine.speciesBreakdown).slice(0, 2).map(([sp, count]) => (
                            <Tag key={sp} style={{ fontSize: 10, borderRadius: 8, margin: 2 }}>
                              {speciesEmoji[sp] || sp} {count}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>
          )}

          {/* Full Rankings Table */}
          <Card
            size="small"
            style={{ borderRadius: 12 }}
            title={
              <Space>
                <RiseOutlined />
                <span>Top 20 Vaccines {species ? `(${speciesEmoji[species] || ''} ${species})` : ''} {country ? `in ${country}` : ''}</span>
              </Space>
            }
          >
            {data.topVaccines.length > 0 ? (
              <Table
                columns={columns}
                dataSource={data.topVaccines}
                rowKey="vaccineName"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="No vaccination data for the selected filters" />
            )}
          </Card>
        </>
      ) : (
        <Empty description="No data available" />
      )}
    </Space>
  );
};

export default VaccinationAnalyticsPage;
