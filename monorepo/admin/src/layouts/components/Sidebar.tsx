import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography, Space } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  BellOutlined,
  LineChartOutlined,
  SettingOutlined,
  HeartFilled,
  CrownOutlined,
  AppstoreOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import { usePermission } from '@/hooks/usePermission';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { canAccessPage } = usePermission();

  const menuItems: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = [];

    if (canAccessPage('dashboard')) {
      items.push({ key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' });
    }

    if (canAccessPage('analytics')) {
      items.push({ key: '/analytics', icon: <LineChartOutlined />, label: 'Analytics' });
    }

    if (canAccessPage('pets')) {
      items.push({ key: '/pets', icon: <HeartOutlined />, label: 'Pets' });
    }

    if (canAccessPage('app_users')) {
      items.push({ key: '/users', icon: <UserOutlined />, label: 'App Users' });
    }

    if (canAccessPage('verification')) {
      items.push({ key: '/verification', icon: <SafetyCertificateOutlined />, label: 'Verification' });
    }

    if (canAccessPage('mating')) {
      items.push({ key: '/mating', icon: <TeamOutlined />, label: 'Mating' });
    }

    if (canAccessPage('pets')) {
      items.push({ key: '/health-certifications', icon: <MedicineBoxOutlined />, label: 'Health Certs' });
    }

    if (canAccessPage('analytics')) {
      items.push({ key: '/vaccination-analytics', icon: <ExperimentOutlined />, label: 'Vax Analytics' });
    }

    if (canAccessPage('pets')) {
      items.push({ key: '/categories', icon: <AppstoreOutlined />, label: 'Pet Categories' });
    }

    if (canAccessPage('admin_users')) {
      items.push({ key: '/admin-users', icon: <CrownOutlined />, label: 'Admin Users' });
    }

    if (canAccessPage('settings')) {
      items.push({ key: '/settings', icon: <SettingOutlined />, label: 'Settings' });
    }

    return items;
  }, [canAccessPage]);

  const selectedKey = useMemo(() => {
    const path = location.pathname;
    const match = menuItems?.find(
      (item) => item && 'key' in item && path.startsWith(item.key as string)
    );
    return match && 'key' in match ? (match.key as string) : '/dashboard';
  }, [location.pathname, menuItems]);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={240}
      style={{
        background: '#272727',
        overflow: 'auto',
        minHeight: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
      theme="dark"
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Space size={10}>
          <HeartFilled style={{ fontSize: 24, color: '#F1379D' }} />
          {!collapsed && (
            <Text
              strong
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Poppins',
                whiteSpace: 'nowrap',
              }}
            >
              PET Roll Admin
            </Text>
          )}
        </Space>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          background: '#272727',
          borderRight: 0,
          marginTop: 8,
        }}
      />

      {!collapsed && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: 'center',
          }}
        >
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
            v1.0.0
          </Text>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
