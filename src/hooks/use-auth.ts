
import { useState, useEffect, useCallback, useRef } from 'react';

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
  
  const mountedRef = useRef(true);
  const checkInProgressRef = useRef(false);

  // Function to check auth state
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      const token = localStorage.getItem('authToken');
      console.log("Auth check: Token exists:", !!token);
      
      if (token && mountedRef.current) {
        // When token exists, set isLoggedIn to true
        setState({
          isLoggedIn: true,
          isLoading: false,
          user: { 
            id: '1', 
            name: 'Test User', 
            email: 'test@example.com' 
          },
        });
        checkInProgressRef.current = false;
        return true;
      } else if (mountedRef.current) {
        // When no token is found, clear state
        setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
        });
        checkInProgressRef.current = false;
        return false;
      }
    } catch (error) {
      console.error("Auth check failed with error:", error);
      if (mountedRef.current) {
        setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
        });
      }
      checkInProgressRef.current = false;
      return false;
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  // Force refresh auth state
  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("Force refreshing auth state...");
    setState(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 100);
  }, [checkAuth]);

  // Enhanced logout function
  const logout = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("Logging out user - removing auth token");
    localStorage.removeItem('authToken');
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
  }, []);

  // Add login function
  const login = useCallback((token: string) => {
    if (!mountedRef.current) return;
    
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

  // Track component mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Check auth state on mount
  useEffect(() => {
    console.log("Auth hook initialized, checking authentication state...");
    
    // Small timeout to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 50);
    
    // Listen for storage changes to detect cross-tab auth changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("Auth token changed in another tab, refreshing state");
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, [checkAuth]);

  return { ...state, logout, login, forceRefresh };
};
