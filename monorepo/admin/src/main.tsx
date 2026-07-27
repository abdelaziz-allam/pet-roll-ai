import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import './i18n';
import App from './App';

const theme = {
  token: {
    colorPrimary: '#F1379D',
    borderRadius: 8,
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ConfigProvider>
  </React.StrictMode>,
);
