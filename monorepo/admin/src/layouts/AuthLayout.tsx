import { Outlet } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

const AuthLayout: React.FC = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 440,
          padding: '0 16px',
        }}
      >
        <Space
          direction="vertical"
          align="center"
          style={{ marginBottom: 32 }}
          size={4}
        >
          <svg width="52" height="52" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="authPaw" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1379D"/>
                <stop offset="100%" stopColor="#722ed1"/>
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#authPaw)"/>
            <g fill="white" transform="translate(14, 12) scale(0.75)">
              <ellipse cx="14" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="34" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="6" cy="22" rx="4.2" ry="5.5"/>
              <ellipse cx="42" cy="22" rx="4.2" ry="5.5"/>
              <path d="M24 24c-6 0-11 4-13 9-2.8 6 1 12 7 13.5 2 .6 4 2 6 2s4-1.4 6-2c6-1.5 9.8-7.5 7-13.5-2-5-7-9-13-9z"/>
            </g>
          </svg>
          <Title level={2} style={{ margin: 0, fontFamily: 'Poppins' }}>
            Petfolioo
          </Title>
          <Text type="secondary" style={{ fontSize: 16 }}>
            Admin Portal
          </Text>
        </Space>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AuthLayout;
