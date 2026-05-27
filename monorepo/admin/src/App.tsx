import { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { AppRoutes } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';

const theme = {
  token: {
    colorPrimary: '#F1379D',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 8,
  },
};

function App() {
  const checkAuth = useAuth((s) => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
