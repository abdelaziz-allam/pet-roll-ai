import { Outlet } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { HeartFilled } from '@ant-design/icons';

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
          <HeartFilled style={{ fontSize: 48, color: '#F1379D' }} />
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
