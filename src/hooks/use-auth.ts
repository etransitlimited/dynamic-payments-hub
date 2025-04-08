
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

  // Function to check authentication state
  const checkAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('authToken');
      console.log("Auth check: Token exists:", !!token);
      
      if (token) {
        // Set isLoggedIn to true when token exists
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
        // Clear state when no token is found
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

  // Force refresh authentication state
  const forceRefresh = useCallback(() => {
    console.log("Force refreshing auth state...");
    setState(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      checkAuth();
    }, 100);
  }, [checkAuth]);

  // Enhanced logout functionality
  const logout = useCallback(() => {
    console.log("Logging out user - removing auth token");
    localStorage.removeItem('authToken');
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
  }, []);

  // Add login functionality
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

  // Check auth state when component mounts
  useEffect(() => {
    console.log("Auth hook initialized, checking authentication state...");
    const initialCheck = checkAuth();
    console.log("Initial auth check result:", initialCheck ? "authenticated" : "not authenticated");
    
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
