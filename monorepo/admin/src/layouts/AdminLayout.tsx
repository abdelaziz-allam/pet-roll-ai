import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Grid, Spin, Drawer } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from '@/layouts/components/Sidebar';
import Header from '@/layouts/components/Header';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { loading, logout, isAuthenticated } = useAuth();
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const isMobile = !screens.md;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!screens.lg) {
      setCollapsed(true);
    }
  }, [screens.lg]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggle = () => {
    if (isMobile) {
      setMobileDrawerOpen(!mobileDrawerOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {isMobile ? (
        <Drawer
          placement="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          width={240}
          styles={{ body: { padding: 0, background: '#272727' } }}
          closable={false}
        >
          <Sidebar collapsed={false} onCollapse={() => setMobileDrawerOpen(false)} />
        </Drawer>
      ) : (
        <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      )}
      <Layout>
        <Header
          collapsed={isMobile ? false : collapsed}
          onCollapse={handleToggle}
          onLogout={handleLogout}
        />
        <Content
          style={{
            margin: isMobile ? 8 : 24,
            padding: isMobile ? 12 : 24,
            background: '#fff',
            borderRadius: 8,
            minHeight: 280,
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
