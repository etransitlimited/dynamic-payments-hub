
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
  const lastRefreshTimeRef = useRef(0);
  const refreshThrottleMs = 500; // Prevent refreshing more than once every 500ms

  // Function to check auth state with debouncing
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      const token = localStorage.getItem('authToken');
      console.log("Auth check: Token exists:", !!token);
      
      if (token && mountedRef.current) {
        // When token exists, set isLoggedIn to true
        setState(prev => {
          // Only update if there's a change to prevent unnecessary renders
          if (!prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: true,
              isLoading: false,
              user: { 
                id: '1', 
                name: 'Test User', 
                email: 'test@example.com' 
              },
            };
          }
          return prev;
        });
        checkInProgressRef.current = false;
        return true;
      } else if (mountedRef.current) {
        // When no token is found, clear state
        setState(prev => {
          // Only update if there's a change
          if (prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: false,
              isLoading: false,
              user: null,
            };
          }
          return prev;
        });
        checkInProgressRef.current = false;
        return false;
      }
    } catch (error) {
      console.error("Auth check failed with error:", error);
      if (mountedRef.current) {
        setState(prev => {
          if (prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: false,
              isLoading: false,
              user: null,
            };
          }
          return prev;
        });
      }
      checkInProgressRef.current = false;
      return false;
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  // Force refresh auth state with throttling to prevent excessive refreshes
  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
    // Throttle refreshes to prevent cascading updates
    if (now - lastRefreshTimeRef.current < refreshThrottleMs) {
      console.log("Auth refresh throttled, skipping...");
      return;
    }
    
    console.log("Force refreshing auth state...");
    lastRefreshTimeRef.current = now;
    
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

  // Check auth state on mount, but only once
  useEffect(() => {
    console.log("Auth hook initialized, checking authentication state...");
    
    // Small timeout to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 50);
    
    // Listen for storage changes to detect cross-tab auth changes
    // But with debouncing to prevent excessive checks
    let storageDebounceTimer: NodeJS.Timeout | null = null;
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("Auth token changed in another tab, refreshing state");
        
        // Debounce the storage event handler
        if (storageDebounceTimer) {
          clearTimeout(storageDebounceTimer);
        }
        
        storageDebounceTimer = setTimeout(() => {
          if (mountedRef.current) {
            checkAuth();
          }
          storageDebounceTimer = null;
        }, 200);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
      if (storageDebounceTimer) {
        clearTimeout(storageDebounceTimer);
      }
    };
  }, [checkAuth]);

  return { ...state, logout, login, forceRefresh };
};
