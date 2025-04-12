
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './components/providers/AppProviders';
import RouteComponents from './components/routing/RouteComponents';
import { Toaster } from '@/components/ui/toaster';
import { startAuthProtectionService } from './modules/auth/services/authProtectionService';
import './App.css';

function App() {
  // 在应用程序启动时初始化认证保护服务
  useEffect(() => {
    // 启动认证保护服务
    startAuthProtectionService();
    
    // 检查并从sessionStorage恢复token (如果需要)
    const tempToken = sessionStorage.getItem('tempAuthToken');
    if (tempToken && !localStorage.getItem('authToken')) {
      console.log('App: Restoring auth token from session storage on app start');
      localStorage.setItem('authToken', tempToken);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <AppProviders>
        <RouteComponents />
        <Toaster />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
