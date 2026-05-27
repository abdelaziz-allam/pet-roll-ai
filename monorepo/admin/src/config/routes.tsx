import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Spin, Avatar, Dropdown, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  BellOutlined,
  BarChartOutlined,
  TeamOutlined,
  BulbOutlined,
  SettingOutlined,
  MonitorOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';

const { Sider, Header, Content } = Layout;

const LoginPage = React.lazy(() => import('@/pages/auth/LoginPage'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage'));
const UsersListPage = React.lazy(() => import('@/pages/users/UsersListPage'));
const UserDetailPage = React.lazy(() => import('@/pages/users/UserDetailPage'));
const PetsListPage = React.lazy(() => import('@/pages/pets/PetsListPage'));
const PetDetailPage = React.lazy(() => import('@/pages/pets/PetDetailPage'));
const VerificationQueue = React.lazy(() => import('@/pages/verification/VerificationQueue'));
const MatingListingsPage = React.lazy(() => import('@/pages/mating/MatingListingsPage'));
const NotificationsPage = React.lazy(() => import('@/pages/notifications/NotificationsPage'));
const AnalyticsPage = React.lazy(() => import('@/pages/analytics/AnalyticsPage'));
const TeamPage = React.lazy(() => import('@/pages/team/TeamPage'));
const SettingsPage = React.lazy(() => import('@/pages/settings/SettingsPage'));
const SystemPage = React.lazy(() => import('@/pages/system/SystemPage'));
const TipsPage = React.lazy(() => import('@/pages/tips/TipsPage'));

const NAV_ITEMS = [
  { key: '/dashboard',     icon: <DashboardOutlined />,          label: 'Dashboard' },
  { key: '/users',         icon: <UserOutlined />,               label: 'Users' },
  { key: '/pets',          icon: <HeartOutlined />,              label: 'Pets' },
  { key: '/verification',  icon: <SafetyCertificateOutlined />,  label: 'Verification' },
  { key: '/mating',        icon: <ShoppingOutlined />,           label: 'Mating' },
  { key: '/notifications', icon: <BellOutlined />,               label: 'Notifications' },
  { key: '/analytics',     icon: <BarChartOutlined />,           label: 'Analytics' },
  { key: '/team',          icon: <TeamOutlined />,               label: 'Team' },
  { key: '/tips',          icon: <BulbOutlined />,               label: 'Tips' },
  { key: '/settings',      icon: <SettingOutlined />,            label: 'Settings' },
  { key: '/system',        icon: <MonitorOutlined />,            label: 'System' },
];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKey = NAV_ITEMS.find((item) =>
    location.pathname === item.key || location.pathname.startsWith(item.key + '/')
  )?.key ?? '/dashboard';

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={220}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 16px',
          borderBottom: '1px solid #f0f0f0',
        }}>
          {!collapsed && (
            <Typography.Text strong style={{ color: '#F1379D', fontSize: 16 }}>
              PET Folioo
            </Typography.Text>
          )}
          {collapsed && (
            <HeartOutlined style={{ color: '#F1379D', fontSize: 20 }} />
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ border: 'none', marginTop: 8 }}
          items={NAV_ITEMS.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: item.label,
            onClick: () => navigate(item.key),
          }))}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin-left 0.2s' }}>
        <Header style={{
          background: '#fff',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18, cursor: 'pointer', color: '#595959' }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Avatar style={{ backgroundColor: '#F1379D' }} icon={<UserOutlined />} />
              {user && (
                <Typography.Text style={{ maxWidth: 140 }} ellipsis>
                  {user.displayName || user.email}
                </Typography.Text>
              )}
            </div>
          </Dropdown>
        </Header>

        <Content style={{ padding: 24, background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

const Loading = () => (
  <Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }} />
);

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UsersListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/pets" element={<PetsListPage />} />
          <Route path="/pets/:id" element={<PetDetailPage />} />
          <Route path="/verification" element={<VerificationQueue />} />
          <Route path="/mating" element={<MatingListingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/system" element={<SystemPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
