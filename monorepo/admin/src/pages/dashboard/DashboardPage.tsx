import { useState, useEffect, useMemo } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag, Space, Spin, Progress, Select } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  StopOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { api } from '@/services/api';
import { formatNumber, formatDate, getRoleBadgeColor } from '@/utils/format';

const { Title, Text } = Typography;

interface Stats {
  totalUsers: number;
  totalPets: number;
  pendingVerifications: number;
  activeListings: number;
  userGrowth: number;
  petGrowth: number;
}

interface PetAnalytics {
  bySpecies: Array<{ name: string; value: number }>;
  byGender: Array<{ name: string; value: number }>;
  byStatus: Array<{ name: string; value: number }>;
  byCountry: Array<{ country: string; count: number }>;
  recentRegistrations: Array<{ date: string; count: number }>;
  totalBanned: number;
  totalActive: number;
  avgPetsPerUser: number;
}

interface RecentUser {
  id: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

interface PetCategory {
  id: string;
  name: string;
  label: string;
  icon?: string;
}

const COLORS = ['#F1379D', '#722ed1', '#1890ff', '#52c41a', '#faad14', '#ff4d4f'];

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalPets: 0,
    pendingVerifications: 0,
    activeListings: 0,
    userGrowth: 0,
    petGrowth: 0,
  });
  const [petAnalytics, setPetAnalytics] = useState<PetAnalytics>({
    bySpecies: [],
    byGender: [],
    byStatus: [],
    byCountry: [],
    recentRegistrations: [],
    totalBanned: 0,
    totalActive: 0,
    avgPetsPerUser: 0,
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [allPets, setAllPets] = useState<any[]>([]);
  const [categories, setCategories] = useState<PetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);
  const [speciesFilter, setSpeciesFilter] = useState<string | undefined>(undefined);

  const uniqueCountries = useMemo(() => [...new Set(allPets.map((p) => p.country).filter(Boolean))].sort(), [allPets]);
  const uniqueCities = useMemo(() => {
    const filtered = countryFilter ? allPets.filter((p) => p.country === countryFilter) : allPets;
    return [...new Set(filtered.map((p) => p.city).filter(Boolean))].sort();
  }, [allPets, countryFilter]);

  const filteredPets = useMemo(() => {
    let pets = allPets;
    if (countryFilter) pets = pets.filter((p) => p.country === countryFilter);
    if (cityFilter) pets = pets.filter((p) => p.city === cityFilter);
    if (speciesFilter) pets = pets.filter((p) => p.species === speciesFilter);
    return pets;
  }, [allPets, countryFilter, cityFilter, speciesFilter]);

  useEffect(() => {
    computeAnalytics(filteredPets);
  }, [filteredPets]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const computeAnalytics = (pets: any[]) => {
    const speciesMap: Record<string, number> = {};
    const genderMap: Record<string, number> = {};
    const statusMap: Record<string, number> = {};
    const countryMap: Record<string, number> = {};
    let banned = 0;
    let active = 0;

    pets.forEach((p: any) => {
      speciesMap[p.species || 'unknown'] = (speciesMap[p.species || 'unknown'] || 0) + 1;
      genderMap[p.gender || 'unknown'] = (genderMap[p.gender || 'unknown'] || 0) + 1;
      const st = p.status || 'active';
      statusMap[st] = (statusMap[st] || 0) + 1;
      if (st === 'banned') banned++;
      else active++;
      if (p.country) countryMap[p.country] = (countryMap[p.country] || 0) + 1;
    });

    setPetAnalytics({
      bySpecies: Object.entries(speciesMap).map(([name, value]) => ({ name, value })),
      byGender: Object.entries(genderMap).map(([name, value]) => ({ name, value })),
      byStatus: Object.entries(statusMap).map(([name, value]) => ({ name, value })),
      byCountry: Object.entries(countryMap)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      recentRegistrations: [],
      totalBanned: banned,
      totalActive: active,
      avgPetsPerUser: stats.totalUsers ? +(pets.length / stats.totalUsers).toFixed(1) : 0,
    });
  };

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, petsRes, categoriesRes] = await Promise.all([
        api.get<any>('/admin/stats').catch(() => null),
        api.get<any>('/admin/users?limit=5').catch(() => null),
        api.get<any>('/admin/pets?limit=100').catch(() => null),
        api.get<PetCategory[]>('/admin/categories').catch(() => []),
      ]);

      if (statsRes) {
        setStats({
          totalUsers: statsRes.totalUsers || 0,
          totalPets: statsRes.totalPets || 0,
          pendingVerifications: statsRes.pendingVerifications || 0,
          activeListings: statsRes.activeListings || 0,
          userGrowth: 12.5,
          petGrowth: 8.3,
        });
      }

      if (usersRes?.data) {
        setRecentUsers(usersRes.data.slice(0, 5));
      }

      if (categoriesRes) {
        setCategories(categoriesRes as PetCategory[]);
      }

      if (petsRes?.data) {
        setAllPets(petsRes.data);
      }
    } catch {
      // fallback to zeros
    } finally {
      setLoading(false);
    }
  };

  const recentUsersColumns = [
    { title: 'Name', dataIndex: 'displayName', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag color={getRoleBadgeColor(role)}>{role}</Tag>,
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date),
    },
  ];

  const totalPets = petAnalytics.totalActive + petAnalytics.totalBanned;

  return (
    <Spin spinning={loading}>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Title level={4} style={{ margin: 0 }}>Dashboard</Title>

        {/* Overview Stats */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={stats.totalUsers}
                prefix={<UserOutlined />}
                formatter={(val) => formatNumber(val as number)}
                suffix={
                  stats.userGrowth > 0 ? (
                    <Text type="success" style={{ fontSize: 14 }}>
                      <ArrowUpOutlined /> {stats.userGrowth}%
                    </Text>
                  ) : undefined
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Pets"
                value={stats.totalPets}
                prefix={<HeartOutlined />}
                formatter={(val) => formatNumber(val as number)}
                suffix={
                  stats.petGrowth > 0 ? (
                    <Text type="success" style={{ fontSize: 14 }}>
                      <ArrowUpOutlined /> {stats.petGrowth}%
                    </Text>
                  ) : undefined
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending Verifications"
                value={stats.pendingVerifications}
                prefix={<SafetyCertificateOutlined />}
                valueStyle={{ color: stats.pendingVerifications > 0 ? '#faad14' : '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Listings"
                value={stats.activeListings}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
        </Row>

        {/* Pet Analytics Filters */}
        <Card size="small">
          <Space wrap style={{ width: '100%' }}>
            <FilterOutlined />
            <Select
              placeholder="Country"
              allowClear
              style={{ width: 140, minWidth: 100 }}
              value={countryFilter}
              onChange={(val) => { setCountryFilter(val); setCityFilter(undefined); }}
              options={uniqueCountries.map((c) => ({ label: c, value: c }))}
            />
            <Select
              placeholder="City"
              allowClear
              style={{ width: 140, minWidth: 100 }}
              value={cityFilter}
              onChange={setCityFilter}
              options={uniqueCities.map((c) => ({ label: c, value: c }))}
            />
            <Select
              placeholder="Pet Category"
              allowClear
              style={{ width: 140, minWidth: 100 }}
              value={speciesFilter}
              onChange={setSpeciesFilter}
              options={categories.map((c) => ({ label: `${c.icon || ''} ${c.label}`, value: c.name }))}
            />
          </Space>
        </Card>

        {/* Pet Analytics Section */}
        <Title level={5} style={{ margin: 0 }}>
          Pet Analytics
          {(countryFilter || cityFilter || speciesFilter) && (
            <Tag color="blue" style={{ marginLeft: 8, fontSize: 12 }}>Filtered</Tag>
          )}
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Pets"
                value={petAnalytics.totalActive}
                valueStyle={{ color: '#52c41a' }}
                prefix={<HeartOutlined />}
              />
              {totalPets > 0 && (
                <Progress percent={Math.round((petAnalytics.totalActive / totalPets) * 100)} strokeColor="#52c41a" size="small" style={{ marginTop: 8 }} />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Banned Pets"
                value={petAnalytics.totalBanned}
                valueStyle={{ color: '#ff4d4f' }}
                prefix={<StopOutlined />}
              />
              {totalPets > 0 && (
                <Progress percent={Math.round((petAnalytics.totalBanned / totalPets) * 100)} strokeColor="#ff4d4f" size="small" style={{ marginTop: 8 }} />
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Avg. Pets per User"
                value={petAnalytics.avgPetsPerUser}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Registered"
                value={totalPets}
                prefix={<HeartOutlined />}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Pets by Species">
              {petAnalytics.bySpecies.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={petAnalytics.bySpecies}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {petAnalytics.bySpecies.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">No pet data available</Text>
                </div>
              )}
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Pets by Gender">
              {petAnalytics.byGender.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={petAnalytics.byGender}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Count">
                      {petAnalytics.byGender.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text type="secondary">No pet data available</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {petAnalytics.byCountry.length > 0 && (
          <Card title="Pets by Country (Top 10)">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={petAnalytics.byCountry} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="country" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#F1379D" name="Pets" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Recent Users */}
        <Card title="Recent Registrations">
          <Table
            columns={recentUsersColumns}
            dataSource={recentUsers}
            rowKey="id"
            pagination={false}
            size="small"
            scroll={{ x: 500 }}
            locale={{ emptyText: 'No recent users' }}
          />
        </Card>
      </Space>
    </Spin>
  );
};

export default DashboardPage;
