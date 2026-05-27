import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Grid, Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/layouts/components/Sidebar';
import Header from '@/layouts/components/Header';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isLoading, logout, isAuthenticated } = useAuth();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!screens.lg) {
      setCollapsed(true);
    }
  }, [screens.lg]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header
          collapsed={collapsed}
          onCollapse={setCollapsed}
          onLogout={handleLogout}
        />
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: '#fff',
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
