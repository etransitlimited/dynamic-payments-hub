
import { useRef, useCallback } from 'react';
import {
  getAuthTokenFromStorage,
  getTempAuthTokenFromStorage,
  setAuthTokenInStorage,
  removeAuthTokenFromStorage,
  getUserFromStorage,
  setTempAuthTokenInStorage
} from '@/auth';

/**
 * Hook for managing authentication tokens
 */
export const useAuthToken = () => {
  const stableTokenRef = useRef<string | null>(null);
  const initialTokenLoadedRef = useRef(false);
  
  const storeToken = useCallback((token: string) => {
    setAuthTokenInStorage(token);
    setTempAuthTokenInStorage(token);
    stableTokenRef.current = token;
  }, []);
  
  const removeToken = useCallback(() => {
    removeAuthTokenFromStorage();
    stableTokenRef.current = null;
  }, []);
  
  const getToken = useCallback(() => {
    const localToken = getAuthTokenFromStorage();
    const sessionToken = getTempAuthTokenFromStorage();
    return localToken || sessionToken || stableTokenRef.current;
  }, []);
  
  const preserveTokenDuringLanguageChange = useCallback(() => {
    const token = getAuthTokenFromStorage() || stableTokenRef.current;
    if (token) {
      console.log("Auth: Preserving token during language change");
      setTempAuthTokenInStorage(token);
      stableTokenRef.current = token;
    }
  }, []);
  
  const restoreTokenAfterLanguageChange = useCallback(() => {
    const tempToken = getTempAuthTokenFromStorage();
    const currentToken = getAuthTokenFromStorage();
    
    if (tempToken && !currentToken) {
      console.log("Auth: Restoring token from session storage after language change");
      setAuthTokenInStorage(tempToken);
      stableTokenRef.current = tempToken;
      return true;
    } else if (stableTokenRef.current && !currentToken) {
      console.log("Auth: Restoring token from memory reference");
      setAuthTokenInStorage(stableTokenRef.current);
      return true;
    }
    return false;
  }, []);
  
  const checkAndLoadInitialToken = useCallback(() => {
    if (initialTokenLoadedRef.current) return null;
    
    const localToken = getAuthTokenFromStorage();
    const sessionToken = getTempAuthTokenFromStorage();
    
    if (localToken) {
      stableTokenRef.current = localToken;
      initialTokenLoadedRef.current = true;
      return localToken;
    } else if (sessionToken) {
      console.log("Auth: No token in localStorage, but found in sessionStorage. Restoring.");
      setAuthTokenInStorage(sessionToken);
      stableTokenRef.current = sessionToken;
      initialTokenLoadedRef.current = true;
      return sessionToken;
    }
    return null;
  }, []);
  
  const getCurrentUser = useCallback(() => {
    return getUserFromStorage();
  }, []);
  
  return {
    stableTokenRef,
    initialTokenLoadedRef,
    storeToken,
    removeToken,
    getToken,
    preserveTokenDuringLanguageChange,
    restoreTokenAfterLanguageChange,
    checkAndLoadInitialToken,
    getCurrentUser
  };
};
