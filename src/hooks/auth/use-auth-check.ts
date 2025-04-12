
import { useCallback, useRef } from 'react';
import { AuthState } from '@/auth';

/**
 * Hook for checking authentication status
 */
export const useAuthCheck = (
  getToken: () => string | null,
  getCurrentUser: () => AuthState['user'] | null,
  updateState: (newState: Partial<AuthState>) => void,
  setAuthTokenInStorage: (token: string) => void
) => {
  const checkInProgressRef = useRef(false);
  const mountedRef = useRef(true);
  
  // Set mounted status
  const setMounted = (mounted: boolean) => {
    mountedRef.current = mounted;
  };
  
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      const token = getToken();
      
      console.log("Auth check: Token exists:", !!token);
      
      if (token && mountedRef.current) {
        const storedUser = getCurrentUser();
        
        updateState({
          isLoggedIn: true,
          isLoading: false,
          user: storedUser
        });
        
        if (token !== localStorage.getItem('authToken')) {
          setAuthTokenInStorage(token);
        }
        
        checkInProgressRef.current = false;
        return true;
      } else if (mountedRef.current) {
        updateState({
          isLoggedIn: false,
          isLoading: false,
          user: null
        });
        checkInProgressRef.current = false;
        return false;
      }
    } catch (error) {
      console.error("Auth check failed with error:", error);
      if (mountedRef.current) {
        updateState({
          isLoggedIn: false,
          isLoading: false,
          user: null
        });
      }
    }
    
    checkInProgressRef.current = false;
    return false;
  }, [getToken, getCurrentUser, updateState, setAuthTokenInStorage]);
  
  return { checkAuth, setMounted, mountedRef };
};
