
import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
}

// Completely redesigned authentication hook with more reliable state management
export const useAuth = (): AuthState & { logout: () => void } => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  // Enhanced logout functionality
  const logout = useCallback(() => {
    console.log("Logging out user");
    localStorage.removeItem('authToken');
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
    // Navigate to login page
    window.location.href = '/login';
  }, []);

  // Check auth state on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Auth check: Token exists:", !!token);
        
        if (token) {
          console.log("User is authenticated, setting isLoggedIn to true");
          setState({
            isLoggedIn: true,
            isLoading: false,
            user: { 
              id: '1', 
              name: 'Test User', 
              email: 'test@example.com' 
            },
          });
        } else {
          console.log("No auth token found, setting isLoggedIn to false");
          setState({
            isLoggedIn: false,
            isLoading: false,
            user: null,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setState({
          isLoggedIn: false,
          isLoading: false,
          user: null,
        });
      }
    };

    console.log("Auth hook initialized, checking authentication state...");
    
    // Perform immediate auth check
    checkAuth();
    
    // Set up storage event listener to handle auth changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        console.log("Auth token changed in another tab, updating state");
        checkAuth();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { ...state, logout };
};
