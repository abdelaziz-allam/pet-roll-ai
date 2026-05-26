import { ConfigProvider } from 'antd';
import { AppRoutes } from '@/config/routes';

const theme = {
  token: {
    colorPrimary: '#F1379D',
    fontFamily: 'Poppins, sans-serif',
    borderRadius: 8,
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
