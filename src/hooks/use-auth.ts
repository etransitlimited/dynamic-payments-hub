
import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
}

export const useAuth = (): AuthState & { 
  logout: () => void; 
  login: (token: string) => void;
  forceRefresh: () => void;
} => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  // 检查认证状态的函数
  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('authToken');
      console.log("Auth check: Token exists:", !!token);
      
      if (token) {
        // 当令牌存在时，设置 isLoggedIn 为 true
        setState({
          isLoggedIn: true,
          isLoading: false,
          user: { 
            id: '1', 
            name: 'Test User', 
            email: 'test@example.com' 
          },
        });
        return true;
      } else {
        // 当没有找到令牌时，清除状态
        setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
        });
        return false;
      }
    } catch (error) {
      console.error("Auth check failed with error:", error);
      setState({
        isLoggedIn: false,
        isLoading: false,
        user: null,
      });
      return false;
    }
  }, []);

  // 强制刷新认证状态
  const forceRefresh = useCallback(() => {
    console.log("Force refreshing auth state...");
    setState(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      checkAuth();
    }, 100);
  }, [checkAuth]);

  // 增强的注销功能
  const logout = useCallback(() => {
    console.log("Logging out user - removing auth token");
    localStorage.removeItem('authToken');
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
  }, []);

  // 增加登录功能
  const login = useCallback((token: string) => {
    console.log("Login: Setting auth token", token);
    localStorage.setItem('authToken', token);
    setState({
      isLoggedIn: true,
      isLoading: false,
      user: { 
        id: '1', 
        name: 'Test User', 
        email: 'test@example.com' 
      },
    });
  }, []);

  // 组件挂载时检查认证状态
  useEffect(() => {
    console.log("Auth hook initialized, checking authentication state...");
    checkAuth();
    
    // 添加事件监听器以检测跨标签的存储变化
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        console.log("Auth token changed in another tab, refreshing state");
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]);

  return { ...state, logout, login, forceRefresh };
};
