
import { useState, useEffect } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
}

// Simple authentication hook
export const useAuth = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    // Check if user is logged in from localStorage or cookies
    const checkAuth = async () => {
      // For now, we'll just simulate a quick auth check
      const token = localStorage.getItem('authToken');
      
      // Set a short timeout to simulate an API call
      setTimeout(() => {
        setState({
          isLoggedIn: !!token,
          isLoading: false,
          user: token ? { id: '1', name: 'Test User' } : null,
        });
      }, 300);
    };

    checkAuth();
  }, []);

  return state;
};
