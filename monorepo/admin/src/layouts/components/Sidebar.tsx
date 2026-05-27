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
  BulbOutlined,
  MonitorOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { hasPermission, type AdminRole } from '@/config/permissions';

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const role: AdminRole = user?.role || 'viewer';

  const menuItems: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = [];

    if (hasPermission(role, 'dashboard')) {
      items.push({ key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' });
    }
    if (hasPermission(role, 'analytics')) {
      items.push({ key: '/analytics', icon: <LineChartOutlined />, label: 'Analytics' });
    }
    if (hasPermission(role, 'pet_management')) {
      items.push({ key: '/pets', icon: <HeartOutlined />, label: 'Pets' });
    }
    if (hasPermission(role, 'user_read')) {
      items.push({ key: '/users', icon: <UserOutlined />, label: 'App Users' });
    }
    if (hasPermission(role, 'verification')) {
      items.push({ key: '/verification', icon: <SafetyCertificateOutlined />, label: 'Verification' });
    }
    if (hasPermission(role, 'content_moderation')) {
      items.push({ key: '/mating', icon: <ShoppingOutlined />, label: 'Mating' });
    }
    if (hasPermission(role, 'broadcast')) {
      items.push({ key: '/notifications', icon: <BellOutlined />, label: 'Notifications' });
    }
    if (hasPermission(role, 'team_management')) {
      items.push({ key: '/team', icon: <TeamOutlined />, label: 'Team' });
    }
    if (hasPermission(role, 'system_settings')) {
      items.push({ key: '/tips', icon: <BulbOutlined />, label: 'Daily Tips' });
    }
    if (hasPermission(role, 'system_settings')) {
      items.push({ key: '/settings', icon: <SettingOutlined />, label: 'Settings' });
    }
    if (hasPermission(role, 'error_logs')) {
      items.push({ key: '/system', icon: <MonitorOutlined />, label: 'System' });
    }

    return items;
  }, [role]);

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
        height: '100vh',
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
