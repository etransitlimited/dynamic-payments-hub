
import { useState, useEffect } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
}

// Enhanced authentication hook
export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    // Check if user is logged in from localStorage or cookies
    const checkAuth = async () => {
      try {
        // For development purposes, we'll check for authToken in localStorage
        const token = localStorage.getItem('authToken');
        
        // Add more detailed logging
        console.log("Auth check: Token in localStorage:", !!token);
        
        // Set a small timeout to simulate API call and prevent flash of login screen
        setTimeout(() => {
          const user = token ? { id: '1', name: 'Test User', email: 'test@example.com' } : null;
          
          // FOR DEBUGGING: To force login state for development
          // 取消注释这一行来强制登录状态，用于测试解决路由问题
          const isLoggedIn = true; // 临时启用强制登录状态
          // const isLoggedIn = !!token;
          
          console.log("Auth state updated:", { isLoggedIn, user: !!user });
          
          setState({
            isLoggedIn,
            isLoading: false,
            user: user || (isLoggedIn ? { id: '1', name: 'Test User', email: 'test@example.com' } : null),
          });
        }, 300);
      } catch (error) {
        console.error("Auth check error:", error);
        setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
        });
      }
    };

    checkAuth();
  }, []);

  return state;
};
