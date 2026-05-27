import { useState, useEffect } from 'react';
import {
  Card, Tag, Space, Typography, Select, Statistic, Row, Col,
  Tabs, Avatar, Progress, Badge, Empty, Spin, message, Tooltip,
  Drawer, Divider, Descriptions, Image, Button,
} from 'antd';
import {
  HeartOutlined, TrophyOutlined, CrownOutlined,
  EyeOutlined, RiseOutlined, TeamOutlined, FireOutlined,
  StarFilled, HeartFilled, EnvironmentOutlined, CalendarOutlined,
  ManOutlined, WomanOutlined, CheckCircleFilled, ClockCircleOutlined,
  CloseCircleFilled, SwapOutlined, MailOutlined, SendOutlined,
  InfoCircleOutlined, DollarOutlined,
} from '@ant-design/icons';
import { formatDate } from '@/utils/format';
import { api } from '@/services/api';

const { Title, Text } = Typography;
const { Option } = Select;

interface MatingStats {
  totalListings: number;
  activeListings: number;
  totalRequests: number;
  acceptedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  totalViews: number;
}

interface BreederRanking {
  userId: string;
  displayName: string;
  email: string;
  country: string | null;
  city: string | null;
  totalListings: number;
  activeListings: number;
  totalMatches: number;
  totalViews: number;
  successRate: number;
  joinedAt: string;
  speciesBreakdown?: Record<string, { listings: number; matches: number }>;
}

interface SpeciesBreederRank {
  userId: string;
  displayName: string;
  totalListings: number;
  activeListings: number;
  totalMatches: number;
  totalViews: number;
  successRate: number;
}

interface BreederRankingsResponse {
  rankings: BreederRanking[];
  speciesRankings: Record<string, SpeciesBreederRank[]>;
  filters: { countries: string[]; cities: string[]; species: string[] };
}

interface PetInfo {
  id: string;
  name: string;
  breed: string;
  species: string;
  gender: string;
  photos: Array<{ url: string }>;
  color?: string;
}

interface MatchData {
  id: string;
  status: string;
  message?: string;
  respondedAt?: string;
  createdAt: string;
  listing?: {
    id: string;
    breed: string;
    species: string;
    gender: string;
    age: number;
    price: number;
    location?: { city?: string; country?: string };
    description?: string;
    healthCertified: boolean;
  };
  sender: { id: string; displayName: string; email: string };
  senderPet?: PetInfo;
  receiver: { id: string; displayName: string; email: string };
  receiverPet?: PetInfo;
}

const rankMedals = ['🥇', '🥈', '🥉'];

const MatingPage: React.FC = () => {
  const [stats, setStats] = useState<MatingStats | null>(null);
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [breeders, setBreeders] = useState<BreederRanking[]>([]);
  const [speciesRankings, setSpeciesRankings] = useState<Record<string, SpeciesBreederRank[]>>({});
  const [breederFilterOptions, setBreederFilterOptions] = useState<{ countries: string[]; cities: string[]; species: string[] }>({ countries: [], cities: [], species: [] });
  const [loading, setLoading] = useState(true);
  const [matchFilter, setMatchFilter] = useState<string | undefined>(undefined);
  const [speciesFilter, setSpeciesFilter] = useState<string | undefined>(undefined);
  const [countryFilter, setCountryFilter] = useState<string | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);

  // Breeder ranking filters
  const [breederCountry, setBreederCountry] = useState<string | undefined>(undefined);
  const [breederCity, setBreederCity] = useState<string | undefined>(undefined);
  const [breederSpecies, setBreederSpecies] = useState<string | undefined>(undefined);

  // Match detail drawer
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);

  // Global locations from DB
  const [allCountries, setAllCountries] = useState<{ code: string; name: string }[]>([]);
  const [matchCities, setMatchCities] = useState<string[]>([]);
  const [breederCities, setBreederCities] = useState<string[]>([]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [statsData, matchesData, breedersData, countriesData] = await Promise.all([
        api.get<MatingStats>('/admin/mating/stats'),
        api.get<MatchData[]>('/admin/mating/matches'),
        api.get<BreederRankingsResponse>('/admin/mating/breeders'),
        api.get<{ code: string; name: string }[]>('/admin/locations/countries'),
      ]);
      setStats(statsData);
      setMatches(matchesData);
      setBreeders(breedersData.rankings);
      setSpeciesRankings(breedersData.speciesRankings);
      setBreederFilterOptions(breedersData.filters);
      setAllCountries(countriesData);
    } catch (err: any) {
      message.error(err.message || 'Failed to load mating data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCitiesForMatch = async (country: string) => {
    try {
      const cities = await api.get<string[]>(`/admin/locations/cities?country=${encodeURIComponent(country)}`);
      setMatchCities(cities);
    } catch { setMatchCities([]); }
  };

  const fetchCitiesForBreeder = async (country: string) => {
    try {
      const cities = await api.get<string[]>(`/admin/locations/cities?country=${encodeURIComponent(country)}`);
      setBreederCities(cities);
    } catch { setBreederCities([]); }
  };

  const fetchBreeders = async (country?: string, city?: string, species?: string) => {
    try {
      const params = new URLSearchParams();
      if (country) params.set('country', country);
      if (city) params.set('city', city);
      if (species) params.set('species', species);
      const queryStr = params.toString() ? `?${params.toString()}` : '';
      const data = await api.get<BreederRankingsResponse>(`/admin/mating/breeders${queryStr}`);
      setBreeders(data.rankings);
      setSpeciesRankings(data.speciesRankings);
      setBreederFilterOptions(data.filters);
    } catch (err: any) {
      message.error(err.message || 'Failed to load breeder rankings');
    }
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    if (!loading) {
      fetchBreeders(breederCountry, breederCity, breederSpecies);
    }
  }, [breederCountry, breederCity, breederSpecies]);

  const filteredMatches = matches.filter((m) => {
    if (matchFilter && m.status !== matchFilter) return false;
    if (speciesFilter && m.listing?.species !== speciesFilter) return false;
    if (countryFilter && m.listing?.location?.country !== countryFilter) return false;
    if (cityFilter && m.listing?.location?.city !== cityFilter) return false;
    return true;
  });

  const speciesList = [...new Set(matches.map((m) => m.listing?.species).filter(Boolean))] as string[];

  const handleSendWeddingCard = async (matchId: string) => {
    try {
      await api.post(`/admin/mating/matches/${matchId}/wedding-card`, {});
      message.success('Wedding card sent successfully!');
    } catch (err: any) {
      message.error(err.message || 'Failed to send wedding card');
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}><Spin size="large" /></div>;
  }

  const breederColumns = [
    {
      title: 'Rank',
      key: 'rank',
      width: 60,
      render: (_: any, __: any, index: number) => (
        <div style={{ textAlign: 'center', fontSize: index < 3 ? 20 : 14 }}>
          {index < 3 ? rankMedals[index] : <Text type="secondary">#{index + 1}</Text>}
        </div>
      ),
    },
    {
      title: 'Breeder',
      key: 'breeder',
      render: (_: any, r: BreederRanking) => (
        <Space>
          <Avatar style={{ backgroundColor: '#F1379D' }}>{r.displayName?.[0] || '?'}</Avatar>
          <div>
            <Space size={4}>
              <Text strong>{r.displayName}</Text>
              <Badge count={<StarFilled style={{ color: '#faad14', fontSize: 12 }} />} />
            </Space>
            <div><Text type="secondary" style={{ fontSize: 11 }}>{r.email}</Text></div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_: any, r: BreederRanking) => (
        r.country || r.city ? (
          <Space size={4}>
            <EnvironmentOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
            <div>
              {r.city && <div><Text style={{ fontSize: 12 }}>{r.city}</Text></div>}
              {r.country && <div><Text type="secondary" style={{ fontSize: 11 }}>{r.country}</Text></div>}
            </div>
          </Space>
        ) : <Text type="secondary" style={{ fontSize: 11 }}>—</Text>
      ),
    },
    {
      title: 'Matches',
      key: 'matches',
      sorter: (a: BreederRanking, b: BreederRanking) => a.totalMatches - b.totalMatches,
      render: (_: any, r: BreederRanking) => (
        <Space><HeartOutlined style={{ color: '#eb2f96' }} /><Text strong style={{ color: '#eb2f96' }}>{r.totalMatches}</Text></Space>
      ),
    },
    {
      title: 'Listings',
      key: 'listings',
      render: (_: any, r: BreederRanking) => <><Text>{r.totalListings}</Text><Text type="secondary" style={{ fontSize: 11 }}> ({r.activeListings} active)</Text></>,
    },
    {
      title: 'Success Rate',
      key: 'rate',
      render: (_: any, r: BreederRanking) => (
        <Progress percent={r.successRate} size="small" strokeColor={r.successRate >= 70 ? '#52c41a' : r.successRate >= 40 ? '#faad14' : '#ff4d4f'} style={{ width: 100 }} />
      ),
    },
    {
      title: 'Views',
      key: 'views',
      render: (_: any, r: BreederRanking) => <Space><EyeOutlined style={{ color: '#1890ff' }} />{r.totalViews}</Space>,
    },
    {
      title: 'Joined',
      key: 'joined',
      render: (_: any, r: BreederRanking) => <Text type="secondary">{formatDate(r.joinedAt)}</Text>,
    },
  ];

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <div>
        <Title level={4} style={{ margin: 0 }}>Mating Marketplace</Title>
        <Text type="secondary">Manage mating listings, monitor breeder activity & rankings</Text>
      </div>

      {stats && (
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #1890ff' }}>
              <Statistic title="Active Listings" value={stats.activeListings} prefix={<HeartOutlined style={{ color: '#1890ff' }} />} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #52c41a' }}>
              <Statistic title="Matches Made" value={stats.acceptedRequests} prefix={<TeamOutlined style={{ color: '#52c41a' }} />} valueStyle={{ color: '#52c41a' }} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #faad14' }}>
              <Statistic title="Pending" value={stats.pendingRequests} prefix={<FireOutlined style={{ color: '#faad14' }} />} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #eb2f96' }}>
              <Statistic title="Total Views" value={stats.totalViews} prefix={<EyeOutlined style={{ color: '#eb2f96' }} />} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #722ed1' }}>
              <Statistic title="Total Listings" value={stats.totalListings} prefix={<RiseOutlined style={{ color: '#722ed1' }} />} />
            </Card>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <Card size="small" style={{ borderLeft: '3px solid #ff4d4f' }}>
              <Statistic title="Match Rate" value={stats.totalRequests > 0 ? Math.round((stats.acceptedRequests / stats.totalRequests) * 100) : 0} suffix="%" prefix={<TrophyOutlined style={{ color: '#ff4d4f' }} />} />
            </Card>
          </Col>
        </Row>
      )}

      <Tabs
        defaultActiveKey="matches"
        items={[
          {
            key: 'matches',
            label: <Space><HeartFilled style={{ color: '#eb2f96' }} />Matches & Requests ({matches.length})</Space>,
            children: (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Space wrap>
                  <Select placeholder="Filter by status" allowClear value={matchFilter} onChange={setMatchFilter} style={{ width: 160 }}>
                    <Option value="accepted">Matched</Option>
                    <Option value="pending">Pending</Option>
                    <Option value="rejected">Rejected</Option>
                  </Select>
                  <Select placeholder="Filter by species" allowClear value={speciesFilter} onChange={setSpeciesFilter} style={{ width: 160 }}>
                    {speciesList.map((s) => (
                      <Option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</Option>
                    ))}
                  </Select>
                  <Select placeholder="Filter by country" allowClear value={countryFilter} onChange={(val) => { setCountryFilter(val); setCityFilter(undefined); if (val) fetchCitiesForMatch(val); else setMatchCities([]); }} style={{ width: 180 }} showSearch optionFilterProp="children">
                    {allCountries.map((c) => (
                      <Option key={c.code} value={c.name}>{c.name}</Option>
                    ))}
                  </Select>
                  <Select placeholder="Filter by city" allowClear value={cityFilter} onChange={setCityFilter} style={{ width: 160 }} showSearch optionFilterProp="children" disabled={!countryFilter}>
                    {matchCities.map((c) => (
                      <Option key={c} value={c}>{c}</Option>
                    ))}
                  </Select>
                  <Text type="secondary">{filteredMatches.length} results</Text>
                </Space>

                {filteredMatches.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
                    {filteredMatches.map((match) => (
                      <MatchCard key={match.id} match={match} onSendWeddingCard={handleSendWeddingCard} onClick={() => setSelectedMatch(match)} />
                    ))}
                  </div>
                ) : (
                  <Empty description="No matches found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </Space>
            ),
          },
          {
            key: 'rankings',
            label: <Space><CrownOutlined style={{ color: '#faad14' }} />Breeder Rankings</Space>,
            children: (
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                {/* Filters */}
                <Card size="small">
                  <Space wrap>
                    <Text strong><EnvironmentOutlined /> Filter Rankings:</Text>
                    <Select placeholder="All Countries" allowClear value={breederCountry} onChange={(val) => { setBreederCountry(val); setBreederCity(undefined); if (val) fetchCitiesForBreeder(val); else setBreederCities([]); }} style={{ width: 180 }} showSearch optionFilterProp="children">
                      {allCountries.map((c) => (
                        <Option key={c.code} value={c.name}>{c.name}</Option>
                      ))}
                    </Select>
                    <Select placeholder="All Cities" allowClear value={breederCity} onChange={setBreederCity} style={{ width: 160 }} showSearch optionFilterProp="children" disabled={!breederCountry}>
                      {breederCities.map((c) => (
                        <Option key={c} value={c}>{c}</Option>
                      ))}
                    </Select>
                    <Select placeholder="All Species" allowClear value={breederSpecies} onChange={setBreederSpecies} style={{ width: 160 }}>
                      {breederFilterOptions.species.map((s) => (
                        <Option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</Option>
                      ))}
                    </Select>
                    {(breederCountry || breederCity || breederSpecies) && (
                      <Tag color="blue">
                        {[breederCountry, breederCity, breederSpecies && breederSpecies.charAt(0).toUpperCase() + breederSpecies.slice(1)].filter(Boolean).join(' / ')}
                      </Tag>
                    )}
                  </Space>
                </Card>

                {/* Overall Top 10 */}
                <Card title={<Space><TrophyOutlined style={{ color: '#faad14' }} /><span>Top 10 Breeders{breederCountry || breederCity || breederSpecies ? ' (Filtered)' : ' (Overall)'}</span></Space>}>
                  {breeders.length > 0 ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 32, paddingTop: 16 }}>
                        {(breeders.length >= 3 ? [1, 0, 2] : breeders.map((_, i) => i)).map((idx) => {
                          const b = breeders[idx];
                          if (!b) return null;
                          const isFirst = idx === 0;
                          return (
                            <div key={b.userId} style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 12, background: isFirst ? 'linear-gradient(135deg, #fff7e6 0%, #ffe7ba 100%)' : '#fafafa', border: isFirst ? '2px solid #ffd666' : '1px solid #f0f0f0', transform: isFirst ? 'scale(1.1)' : 'scale(1)', minWidth: 160 }}>
                              <div style={{ fontSize: 28 }}>{rankMedals[idx]}</div>
                              <Avatar size={isFirst ? 64 : 48} style={{ backgroundColor: '#F1379D', marginTop: 8 }}>{b.displayName?.[0]}</Avatar>
                              <div style={{ marginTop: 8 }}><Text strong style={{ fontSize: isFirst ? 16 : 14 }}>{b.displayName}</Text></div>
                              {(b.country || b.city) && (
                                <div style={{ marginTop: 2 }}>
                                  <Text type="secondary" style={{ fontSize: 11 }}>
                                    <EnvironmentOutlined style={{ fontSize: 10, marginRight: 2 }} />
                                    {[b.city, b.country].filter(Boolean).join(', ')}
                                  </Text>
                                </div>
                              )}
                              <div><Text style={{ color: '#eb2f96', fontSize: 20, fontWeight: 700 }}>{b.totalMatches}</Text><Text type="secondary" style={{ fontSize: 12 }}> matches</Text></div>
                              <Progress percent={b.successRate} size="small" showInfo={false} strokeColor="#52c41a" style={{ marginTop: 4 }} />
                              <Text type="secondary" style={{ fontSize: 11 }}>{b.successRate}% success</Text>
                            </div>
                          );
                        })}
                      </div>
                      <Card size="small">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                              {breederColumns.map((col) => (
                                <th key={col.key} style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 500, color: '#8c8c8c', fontSize: 13 }}>{col.title}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {breeders.map((b, idx) => (
                              <tr key={b.userId} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                {breederColumns.map((col) => (
                                  <td key={col.key} style={{ padding: '12px 8px' }}>{col.render(null, b, idx)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card>
                    </>
                  ) : (
                    <Empty description="No breeders found for the selected filters" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </Card>

                {/* Per-Species Top 10 */}
                {Object.keys(speciesRankings).length > 0 && (
                  <Card title={<Space><FireOutlined style={{ color: '#eb2f96' }} /><span>Top 10 Per Species</span></Space>}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
                      {Object.entries(speciesRankings).map(([species, ranked]) => {
                        const speciesEmoji = species === 'dog' ? '🐕' : species === 'cat' ? '🐱' : species === 'horse' ? '🐴' : species === 'bird' ? '🐦' : species === 'rabbit' ? '🐰' : species === 'fish' ? '🐟' : species === 'reptile' ? '🦎' : '🐾';
                        return (
                          <Card
                            key={species}
                            size="small"
                            title={<Space><span style={{ fontSize: 18 }}>{speciesEmoji}</span><Text strong style={{ textTransform: 'capitalize' }}>{species}</Text><Tag color="pink">{ranked.length} breeders</Tag></Space>}
                            style={{ borderRadius: 12 }}
                          >
                            {ranked.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {ranked.map((r, idx) => (
                                  <div key={r.userId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: idx === 0 ? '#fffbe6' : idx < 3 ? '#fafafa' : 'transparent', borderRadius: 8, border: idx < 3 ? '1px solid #f0f0f0' : 'none' }}>
                                    <div style={{ width: 28, textAlign: 'center', fontSize: idx < 3 ? 16 : 12 }}>
                                      {idx < 3 ? rankMedals[idx] : <Text type="secondary">#{idx + 1}</Text>}
                                    </div>
                                    <Avatar size={32} style={{ backgroundColor: '#F1379D', flexShrink: 0 }}>{r.displayName?.[0]}</Avatar>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <Text strong style={{ fontSize: 13 }}>{r.displayName}</Text>
                                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <Text type="secondary" style={{ fontSize: 11 }}>{r.totalMatches} matches</Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>•</Text>
                                        <Text type="secondary" style={{ fontSize: 11 }}>{r.totalListings} listings</Text>
                                      </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                      <Progress percent={r.successRate} size="small" style={{ width: 60 }} strokeColor={r.successRate >= 70 ? '#52c41a' : r.successRate >= 40 ? '#faad14' : '#ff4d4f'} />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Text type="secondary" style={{ fontSize: 12 }}>No breeders yet</Text>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                  </Card>
                )}
              </Space>
            ),
          },
        ]}
      />

      {/* Match Detail Drawer */}
      <MatchDetailDrawer
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
        onSendWeddingCard={handleSendWeddingCard}
      />
    </Space>
  );
};

function MatchCard({ match, onSendWeddingCard, onClick }: { match: MatchData; onSendWeddingCard: (id: string) => void; onClick?: () => void }) {
  const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
    accepted: { color: '#52c41a', bg: '#f6ffed', icon: <CheckCircleFilled style={{ color: '#52c41a' }} />, label: 'Matched' },
    pending: { color: '#faad14', bg: '#fffbe6', icon: <ClockCircleOutlined style={{ color: '#faad14' }} />, label: 'Pending' },
    rejected: { color: '#ff4d4f', bg: '#fff2f0', icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />, label: 'Rejected' },
  };

  const config = statusConfig[match.status] || statusConfig.pending;
  const maleFirst = match.listing?.gender === 'male';
  const leftPet = maleFirst ? match.receiverPet : match.senderPet;
  const rightPet = maleFirst ? match.senderPet : match.receiverPet;
  const leftOwner = maleFirst ? match.receiver : match.sender;
  const rightOwner = maleFirst ? match.sender : match.receiver;

  const getPhotoUrl = (pet?: PetInfo) => {
    if (pet?.photos && pet.photos.length > 0) {
      const photo = pet.photos[0];
      return typeof photo === 'string' ? photo : (photo as any).url;
    }
    return null;
  };

  return (
    <Card
      size="small"
      hoverable
      onClick={onClick}
      style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${config.color}22`, cursor: 'pointer' }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Status header */}
      <div style={{ background: config.bg, padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          {config.icon}
          <Text strong style={{ color: config.color }}>{config.label}</Text>
        </Space>
        <Text type="secondary" style={{ fontSize: 11 }}>{formatDate(match.createdAt)}</Text>
      </div>

      {/* Match visual - two pets with heart connector */}
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left pet (Male) */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                size={64}
                src={getPhotoUrl(leftPet)}
                style={{ backgroundColor: '#1890ff', border: '3px solid #1890ff33' }}
              >
                {leftPet?.name?.[0] || '♂'}
              </Avatar>
              <div style={{ position: 'absolute', bottom: -2, right: -2 }}>
                <ManOutlined style={{ color: '#1890ff', fontSize: 16, background: '#fff', borderRadius: '50%', padding: 2 }} />
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <Text strong style={{ fontSize: 13 }}>{leftPet?.name || 'Unknown'}</Text>
              <div><Text type="secondary" style={{ fontSize: 11 }}>{leftPet?.breed || match.listing?.breed || '—'}</Text></div>
              <div><Text type="secondary" style={{ fontSize: 10 }}>{leftOwner.displayName}</Text></div>
            </div>
          </div>

          {/* Heart connector */}
          <div style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {match.status === 'accepted' ? (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b9d, #c44569)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(235,47,150,0.3)' }}>
                <HeartFilled style={{ color: '#fff', fontSize: 20 }} />
              </div>
            ) : match.status === 'pending' ? (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fffbe6', border: '2px dashed #faad14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SwapOutlined style={{ color: '#faad14', fontSize: 18 }} />
              </div>
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#fff2f0', border: '2px solid #ffccc7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: 18 }} />
              </div>
            )}
            <Text type="secondary" style={{ fontSize: 10, marginTop: 4 }}>{match.listing?.species}</Text>
          </div>

          {/* Right pet (Female) */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                size={64}
                src={getPhotoUrl(rightPet)}
                style={{ backgroundColor: '#eb2f96', border: '3px solid #eb2f9633' }}
              >
                {rightPet?.name?.[0] || '♀'}
              </Avatar>
              <div style={{ position: 'absolute', bottom: -2, right: -2 }}>
                <WomanOutlined style={{ color: '#eb2f96', fontSize: 16, background: '#fff', borderRadius: '50%', padding: 2 }} />
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <Text strong style={{ fontSize: 13 }}>{rightPet?.name || 'Unknown'}</Text>
              <div><Text type="secondary" style={{ fontSize: 11 }}>{rightPet?.breed || '—'}</Text></div>
              <div><Text type="secondary" style={{ fontSize: 10 }}>{rightOwner.displayName}</Text></div>
            </div>
          </div>
        </div>

        {/* Details row */}
        <div style={{ marginTop: 12, padding: '8px 12px', background: '#fafafa', borderRadius: 8, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {match.listing?.location && (
            <Tooltip title="Location">
              <Space size={4}>
                <EnvironmentOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
                <Text type="secondary" style={{ fontSize: 11 }}>
                  {match.listing.location.city}{match.listing.location.country ? `, ${match.listing.location.country}` : ''}
                </Text>
              </Space>
            </Tooltip>
          )}
          {match.listing && (
            <Space size={4}>
              <CalendarOutlined style={{ color: '#8c8c8c', fontSize: 12 }} />
              <Text type="secondary" style={{ fontSize: 11 }}>{match.listing.age}mo old</Text>
            </Space>
          )}
          {match.listing?.healthCertified && (
            <Tag color="green" style={{ fontSize: 10, margin: 0, lineHeight: '16px' }}>Health Certified</Tag>
          )}
          {match.listing && match.listing.price > 0 && (
            <Tag color="blue" style={{ fontSize: 10, margin: 0, lineHeight: '16px' }}>${match.listing.price}</Tag>
          )}
          {match.listing && match.listing.price === 0 && (
            <Tag color="green" style={{ fontSize: 10, margin: 0, lineHeight: '16px' }}>Free</Tag>
          )}
          {match.respondedAt && (
            <Text type="secondary" style={{ fontSize: 10, marginLeft: 'auto' }}>
              Responded: {formatDate(match.respondedAt)}
            </Text>
          )}
        </div>

        {match.message && (
          <div style={{ marginTop: 8, padding: '6px 12px', background: '#e6f7ff', borderRadius: 6, borderLeft: '3px solid #1890ff' }}>
            <Text style={{ fontSize: 12, fontStyle: 'italic' }}>"{match.message}"</Text>
          </div>
        )}

        {match.status === 'accepted' && (
          <div style={{ marginTop: 10, textAlign: 'right' }}>
            <Tooltip title="Send wedding card email to both pet parents">
              <Tag
                icon={<SendOutlined />}
                color="magenta"
                style={{ cursor: 'pointer', fontSize: 11, padding: '2px 8px' }}
                onClick={(e) => { e.stopPropagation(); onSendWeddingCard(match.id); }}
              >
                Send Wedding Card
              </Tag>
            </Tooltip>
          </div>
        )}
      </div>
    </Card>
  );
}

function MatchDetailDrawer({ match, onClose, onSendWeddingCard }: { match: MatchData | null; onClose: () => void; onSendWeddingCard: (id: string) => void }) {
  if (!match) return null;

  const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
    accepted: { color: '#52c41a', bg: '#f6ffed', icon: <CheckCircleFilled style={{ color: '#52c41a' }} />, label: 'Matched' },
    pending: { color: '#faad14', bg: '#fffbe6', icon: <ClockCircleOutlined style={{ color: '#faad14' }} />, label: 'Pending' },
    rejected: { color: '#ff4d4f', bg: '#fff2f0', icon: <CloseCircleFilled style={{ color: '#ff4d4f' }} />, label: 'Rejected' },
  };

  const config = statusConfig[match.status] || statusConfig.pending;
  const maleFirst = match.listing?.gender === 'male';
  const leftPet = maleFirst ? match.receiverPet : match.senderPet;
  const rightPet = maleFirst ? match.senderPet : match.receiverPet;
  const leftOwner = maleFirst ? match.receiver : match.sender;
  const rightOwner = maleFirst ? match.sender : match.receiver;

  const getPhotoUrl = (pet?: PetInfo) => {
    if (pet?.photos && pet.photos.length > 0) {
      const photo = pet.photos[0];
      return typeof photo === 'string' ? photo : (photo as any).url;
    }
    return null;
  };

  const getPhotos = (pet?: PetInfo) => {
    if (!pet?.photos) return [];
    return pet.photos.map((p) => typeof p === 'string' ? p : (p as any).url).filter(Boolean);
  };

  return (
    <Drawer
      title={null}
      open={!!match}
      onClose={onClose}
      width={620}
      extra={
        match.status === 'accepted' ? (
          <Button type="primary" icon={<SendOutlined />} onClick={() => onSendWeddingCard(match.id)} style={{ background: '#eb2f96', borderColor: '#eb2f96' }}>
            Send Wedding Card
          </Button>
        ) : undefined
      }
    >
      {/* Status Banner */}
      <div style={{ padding: '14px 20px', borderRadius: 12, background: config.bg, border: `1px solid ${config.color}33`, marginBottom: 20 }}>
        <Space size={12} align="center">
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: config.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {match.status === 'accepted' ? <HeartFilled style={{ color: '#fff', fontSize: 18 }} /> :
             match.status === 'pending' ? <ClockCircleOutlined style={{ color: '#fff', fontSize: 18 }} /> :
             <CloseCircleFilled style={{ color: '#fff', fontSize: 18 }} />}
          </div>
          <div>
            <Tag color={config.color} style={{ fontWeight: 600 }}>{config.label}</Tag>
            <div><Text type="secondary" style={{ fontSize: 12 }}>Request submitted {formatDate(match.createdAt)}</Text></div>
          </div>
        </Space>
      </div>

      {/* Two Pet Cards Side by Side */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={12}>
          <PetDetailCard
            pet={leftPet}
            owner={leftOwner}
            gender="male"
            photoUrl={getPhotoUrl(leftPet)}
            photos={getPhotos(leftPet)}
            label="Listing Pet"
          />
        </Col>
        <Col span={12}>
          <PetDetailCard
            pet={rightPet}
            owner={rightOwner}
            gender="female"
            photoUrl={getPhotoUrl(rightPet)}
            photos={getPhotos(rightPet)}
            label="Requester Pet"
          />
        </Col>
      </Row>

      {/* Listing Details */}
      {match.listing && (
        <Card size="small" title={<Space><InfoCircleOutlined /> Listing Details</Space>} style={{ borderRadius: 10, marginBottom: 16 }}>
          <Descriptions column={2} size="small" styles={{ label: { color: '#888' } }}>
            <Descriptions.Item label="Species">
              <Tag>{match.listing.species}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Breed">{match.listing.breed}</Descriptions.Item>
            <Descriptions.Item label="Gender">
              <Tag color={match.listing.gender === 'male' ? 'blue' : 'magenta'}>{match.listing.gender}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Age">{match.listing.age} months</Descriptions.Item>
            <Descriptions.Item label="Price">
              {match.listing.price > 0 ? (
                <Tag icon={<DollarOutlined />} color="blue">${match.listing.price}</Tag>
              ) : (
                <Tag color="green">Free</Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Health Certified">
              {match.listing.healthCertified ? (
                <Tag icon={<CheckCircleFilled />} color="green">Yes</Tag>
              ) : (
                <Tag color="default">No</Tag>
              )}
            </Descriptions.Item>
            {match.listing.location && (
              <Descriptions.Item label="Location" span={2}>
                <Space size={4}>
                  <EnvironmentOutlined style={{ color: '#1890ff' }} />
                  <Text>{match.listing.location.city}{match.listing.location.country ? `, ${match.listing.location.country}` : ''}</Text>
                </Space>
              </Descriptions.Item>
            )}
            {match.listing.description && (
              <Descriptions.Item label="Description" span={2}>
                <Text style={{ fontSize: 13 }}>{match.listing.description}</Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}

      {/* Message */}
      {match.message && (
        <Card size="small" title={<Space><MailOutlined /> Request Message</Space>} style={{ borderRadius: 10, marginBottom: 16 }}>
          <div style={{ padding: '8px 12px', background: '#e6f7ff', borderRadius: 8, borderLeft: '3px solid #1890ff' }}>
            <Text style={{ fontStyle: 'italic' }}>"{match.message}"</Text>
          </div>
        </Card>
      )}

      {/* Timeline */}
      <Card size="small" title={<Space><CalendarOutlined /> Timeline</Space>} style={{ borderRadius: 10 }}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f5' }}>
            <Text type="secondary">Request Sent</Text>
            <Text>{formatDate(match.createdAt)}</Text>
          </div>
          {match.respondedAt && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f5' }}>
              <Text type="secondary">Response</Text>
              <Space>
                <Tag color={config.color} style={{ margin: 0 }}>{config.label}</Tag>
                <Text>{formatDate(match.respondedAt)}</Text>
              </Space>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <Text type="secondary">Sender</Text>
            <Text>{match.sender.displayName} ({match.sender.email})</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
            <Text type="secondary">Receiver</Text>
            <Text>{match.receiver.displayName} ({match.receiver.email})</Text>
          </div>
        </Space>
      </Card>
    </Drawer>
  );
}

function PetDetailCard({ pet, owner, gender, photoUrl, photos, label }: {
  pet?: PetInfo;
  owner: { id: string; displayName: string; email: string };
  gender: string;
  photoUrl: string | null;
  photos: string[];
  label: string;
}) {
  const genderColor = gender === 'male' ? '#1890ff' : '#eb2f96';

  return (
    <Card
      size="small"
      style={{ borderRadius: 10, border: `1px solid ${genderColor}33`, height: '100%' }}
      styles={{ body: { padding: 12 } }}
    >
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <Text type="secondary" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Text>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <Avatar size={72} src={photoUrl} style={{ backgroundColor: genderColor, border: `3px solid ${genderColor}33` }}>
          {pet?.name?.[0] || '?'}
        </Avatar>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div><Text strong style={{ fontSize: 15 }}>{pet?.name || 'Unknown'}</Text></div>
        <div><Text type="secondary" style={{ fontSize: 12 }}>{pet?.breed || '—'}</Text></div>
        <Tag color={genderColor} style={{ marginTop: 4 }}>{gender === 'male' ? '♂ Male' : '♀ Female'}</Tag>
      </div>
      <Divider style={{ margin: '8px 0' }} />
      <Space direction="vertical" size={4} style={{ width: '100%' }}>
        {pet?.species && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text type="secondary" style={{ fontSize: 11 }}>Species</Text>
            <Text style={{ fontSize: 11 }}>{pet.species}</Text>
          </div>
        )}
        {pet?.color && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text type="secondary" style={{ fontSize: 11 }}>Color</Text>
            <Text style={{ fontSize: 11 }}>{pet.color}</Text>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text type="secondary" style={{ fontSize: 11 }}>Owner</Text>
          <Text style={{ fontSize: 11 }}>{owner.displayName}</Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text type="secondary" style={{ fontSize: 11 }}>Email</Text>
          <Text style={{ fontSize: 11 }} copyable={{ text: owner.email }}>{owner.email}</Text>
        </div>
      </Space>
      {photos.length > 1 && (
        <>
          <Divider style={{ margin: '8px 0' }} />
          <Image.PreviewGroup>
            <Space size={4} wrap>
              {photos.slice(0, 4).map((url, i) => (
                <Image key={i} width={40} height={40} src={url} style={{ borderRadius: 6, objectFit: 'cover' }} />
              ))}
              {photos.length > 4 && <Text type="secondary" style={{ fontSize: 10 }}>+{photos.length - 4}</Text>}
            </Space>
          </Image.PreviewGroup>
        </>
      )}
    </Card>
  );
}

export default MatingPage;
