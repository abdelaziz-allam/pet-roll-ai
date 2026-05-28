import { useLocation } from 'react-router-dom';
import { Layout, Breadcrumb, Space, Badge, Avatar, Dropdown, Tag, Typography, Grid } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';
import { getRoleBadgeColor } from '@/utils/format';

const { Header: AntHeader } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface HeaderProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onLogout: () => void;
}

const routeNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  users: 'App Users',
  pets: 'Pets',
  verification: 'Verification',
  mating: 'Mating',
  notifications: 'Notifications',
  analytics: 'Analytics',
  'admin-users': 'Admin Users',
  settings: 'Settings',
};

const Header: React.FC<HeaderProps> = ({ collapsed, onCollapse, onLogout }) => {
  const location = useLocation();
  const { user } = useAuth();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    { title: 'Home' },
    ...pathSegments.map((segment) => ({
      title: routeNameMap[segment] || segment,
    })),
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'info',
      label: (
        <div style={{ padding: '4px 0' }}>
          <Text strong>{user?.displayName || 'Admin User'}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user?.email || 'admin@petroll.com'}
          </Text>
          <br />
          <Tag
            color={getRoleBadgeColor(user?.role || 'admin')}
            style={{ marginTop: 4 }}
          >
            {user?.role || 'admin'}
          </Tag>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: onLogout,
    },
  ];

  return (
    <AntHeader
      style={{
        background: '#fff',
        padding: isMobile ? '0 12px' : '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 64,
      }}
    >
      <Space size={isMobile ? 8 : 16}>
        <span
          onClick={() => onCollapse(!collapsed)}
          style={{ fontSize: 18, cursor: 'pointer', color: '#272727' }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        {!isMobile && <Breadcrumb items={breadcrumbItems} />}
      </Space>

      <Space size={isMobile ? 12 : 20}>
        {!isMobile && <SearchOutlined style={{ fontSize: 18, cursor: 'pointer' }} />}
        <Badge count={3} size="small">
          <BellOutlined style={{ fontSize: 18, cursor: 'pointer' }} />
        </Badge>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <Avatar
            style={{ backgroundColor: '#F1379D', cursor: 'pointer' }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
