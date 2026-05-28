import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, Button, Alert, Typography, Space, Divider } from 'antd';
import { MailOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAuth } from '@/hooks/useAuth';

const { Title, Text, Link } = Typography;

type ViewMode = 'login' | 'forgot' | 'reset-sent';

interface LoginFormValues {
  email: string;
  password: string;
}

interface ForgotFormValues {
  email: string;
}

const LoginPage: React.FC = () => {
  const [view, setView] = useState<ViewMode>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (values: ForgotFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/admin-auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      setSuccessMsg(data.message);
      setView('reset-sent');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const envBadge = import.meta.env.MODE === 'development' ? (
    <div style={{
      position: 'absolute',
      top: -12,
      right: -12,
      background: '#52c41a',
      color: 'white',
      padding: '2px 10px',
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
    }}>
      LOCAL DEV
    </div>
  ) : null;

  return (
    <Card
      style={{
        width: '100%',
        maxWidth: 420,
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        overflow: 'visible',
      }}
      styles={{ body: { padding: 40 } }}
    >
      {envBadge}

      <Space direction="vertical" size={4} style={{ width: '100%', textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="loginPaw" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1379D"/>
                <stop offset="100%" stopColor="#722ed1"/>
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#loginPaw)"/>
            <g fill="white" transform="translate(14, 12) scale(0.75)">
              <ellipse cx="14" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="34" cy="8" rx="5" ry="6.5"/>
              <ellipse cx="6" cy="22" rx="4.2" ry="5.5"/>
              <ellipse cx="42" cy="22" rx="4.2" ry="5.5"/>
              <path d="M24 24c-6 0-11 4-13 9-2.8 6 1 12 7 13.5 2 .6 4 2 6 2s4-1.4 6-2c6-1.5 9.8-7.5 7-13.5-2-5-7-9-13-9z"/>
            </g>
          </svg>
          <span style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Poppins' }}>
            <span style={{ color: '#F1379D' }}>Pet</span><span style={{ color: '#1a1a1a' }}>folioo</span>
          </span>
        </div>
        <Title level={4} style={{ margin: 0, fontFamily: 'Poppins' }}>
          {view === 'login' && 'Admin Portal'}
          {view === 'forgot' && 'Reset Password'}
          {view === 'reset-sent' && 'Check Your Email'}
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
          {view === 'login' && 'Sign in to manage your platform'}
          {view === 'forgot' && "Enter your email and we'll send a reset link"}
          {view === 'reset-sent' && 'A password reset link has been sent'}
        </Text>
      </Space>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          style={{ marginBottom: 24 }}
        />
      )}

      {view === 'login' && (
        <Form<LoginFormValues>
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="admin@petfolioo.com"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Password"
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -8 }}>
            <Link onClick={() => { setView('forgot'); setError(null); }}>
              Forgot password?
            </Link>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: 48,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Sign In
            </Button>
          </Form.Item>

          {import.meta.env.MODE === 'development' && (
            <>
              <Divider style={{ margin: '24px 0 16px' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>DEV CREDENTIALS</Text>
              </Divider>
              <div style={{
                background: '#f6f6f6',
                borderRadius: 8,
                padding: '12px 16px',
                fontSize: 13,
                lineHeight: 1.8,
              }}>
                <div><strong>Email:</strong> admin@petfolioo.com</div>
                <div><strong>Password:</strong> admin123456</div>
              </div>
            </>
          )}
        </Form>
      )}

      {view === 'forgot' && (
        <Form<ForgotFormValues>
          layout="vertical"
          onFinish={handleForgotPassword}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Enter your admin email"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: 48,
                borderRadius: 10,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Send Reset Link
            </Button>
          </Form.Item>

          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => { setView('login'); setError(null); }}
            style={{ padding: 0 }}
          >
            Back to login
          </Button>
        </Form>
      )}

      {view === 'reset-sent' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            <MailOutlined style={{ color: '#F1379D' }} />
          </div>
          {successMsg && (
            <Alert message={successMsg} type="success" style={{ marginBottom: 24 }} />
          )}
          <Button
            type="primary"
            onClick={() => { setView('login'); setError(null); setSuccessMsg(null); }}
            style={{
              height: 48,
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            Back to Login
          </Button>
        </div>
      )}
    </Card>
  );
};

export default LoginPage;
