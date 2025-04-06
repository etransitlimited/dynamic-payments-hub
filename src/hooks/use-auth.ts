
import { useState, useEffect, useCallback } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any | null;
}

// Enhanced authentication hook with improved state management and error handling
export const useAuth = (): AuthState & { logout: () => void } => {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    isLoading: true,
    user: null,
  });

  // Add logout functionality
  const logout = useCallback(() => {
    console.log("Logging out user");
    localStorage.removeItem('authToken');
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
    // Reload the window to clear all state and force re-auth
    window.location.href = '/login';
  }, []);

  // Check auth state with improved reliability
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check for auth token
        const token = localStorage.getItem('authToken');
        
        console.log("Auth check: Token in localStorage:", !!token);
        
        // For a cleaner separation between frontend and backend
        const isLoggedIn = !!token;
        
        // Only create user object if token exists
        const user = isLoggedIn ? { 
          id: '1', 
          name: 'Test User', 
          email: 'test@example.com' 
        } : null;
        
        console.log("Auth state updated:", { isLoggedIn, user: !!user });
        
        setState({
          isLoggedIn,
          isLoading: false,
          user,
        });
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
    
    // Immediate check
    checkAuth();
    
    // Listen for storage events to handle login/logout in other tabs
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
