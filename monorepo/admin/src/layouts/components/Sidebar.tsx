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
  CrownOutlined,
  AppstoreOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  CommentOutlined,
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

    if (canAccessPage('settings')) {
      items.push({ key: '/feedback', icon: <CommentOutlined />, label: 'Feedback' });
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
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="sidebarPaw" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1379D"/>
                <stop offset="100%" stopColor="#722ed1"/>
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#sidebarPaw)"/>
            <g fill="white" transform="translate(14, 12) scale(0.75)">
              <ellipse cx="14" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="34" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="6" cy="22" rx="4.2" ry="5.5"/>
              <ellipse cx="42" cy="22" rx="4.2" ry="5.5"/>
              <path d="M24 24c-6 0-11 4-13 9-2.8 6 1 12 7 13.5 2 .6 4 2 6 2s4-1.4 6-2c6-1.5 9.8-7.5 7-13.5-2-5-7-9-13-9z"/>
            </g>
          </svg>
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
              Petfolioo
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
