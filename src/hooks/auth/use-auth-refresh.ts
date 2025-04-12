
import { useCallback, useRef } from 'react';

/**
 * Hook for handling authentication refresh
 */
export const useAuthRefresh = (checkAuth: () => boolean) => {
  const lastRefreshTimeRef = useRef(0);
  const refreshThrottleMs = 500;
  
  const forceRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastRefreshTimeRef.current < refreshThrottleMs) {
      console.log("Auth refresh throttled, skipping...");
      return;
    }
    
    console.log("Force refreshing auth state...");
    lastRefreshTimeRef.current = now;
    
    setTimeout(() => {
      checkAuth();
    }, 100);
  }, [checkAuth]);
  
  return { forceRefresh };
};
