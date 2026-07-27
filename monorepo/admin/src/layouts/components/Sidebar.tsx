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
  ReadOutlined,
  BookOutlined,
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

    if (canAccessPage('settings')) {
      items.push({ key: '/blog', icon: <ReadOutlined />, label: 'Blog' });
    }

    if (canAccessPage('admin_users')) {
      items.push({ key: '/admin-users', icon: <CrownOutlined />, label: 'Admin Users' });
    }

    if (canAccessPage('settings')) {
      items.push({ key: '/settings', icon: <SettingOutlined />, label: 'Settings' });
    }

    items.push({ type: 'divider' } as any);
    items.push({ key: '/docs', icon: <BookOutlined />, label: 'User Manual' });

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
          <svg width="28" height="28" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="sidebarBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1379D"/>
                <stop offset="100%" stopColor="#722ed1"/>
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="56" fill="url(#sidebarBg)"/>
            <path d="M60 22L28 46V92C28 94.2 29.8 96 32 96H88C90.2 96 92 94.2 92 92V46L60 22Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95"/>
            <g transform="translate(33, 47)">
              <ellipse cx="14" cy="26" rx="11" ry="13" fill="white"/>
              <ellipse cx="6" cy="16" rx="4" ry="7" fill="white" transform="rotate(-10, 6, 16)"/>
              <ellipse cx="22" cy="16" rx="4" ry="7" fill="white" transform="rotate(10, 22, 16)"/>
              <ellipse cx="14" cy="27" rx="2.5" ry="1.8" fill="#F1379D"/>
            </g>
            <g transform="translate(55, 49)">
              <circle cx="16" cy="24" r="11" fill="white"/>
              <path d="M8 15L5 4L13 12Z" fill="white"/>
              <path d="M24 15L27 4L19 12Z" fill="white"/>
              <path d="M14.5 25L16 23.5L17.5 25Z" fill="#F1379D"/>
              <circle cx="12" cy="21" r="2" fill="#3d1a78"/>
              <circle cx="20" cy="21" r="2" fill="#3d1a78"/>
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
