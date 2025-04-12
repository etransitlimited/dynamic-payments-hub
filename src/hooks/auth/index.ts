
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  AuthHookReturn,
  removeUserFromStorage,
  dispatchLogoutEvent,
  setAuthTokenInStorage
} from '@/auth';
import { useAuthState } from './use-auth-state';
import { useAuthToken } from './use-auth-token';
import { useAuthCheck } from './use-auth-check';
import { useAuthRefresh } from './use-auth-refresh';
import { useAuthLanguageEffect } from './use-auth-language-effect';

/**
 * Main authentication hook that combines all the smaller hooks
 */
export const useAuth = (): AuthHookReturn => {
  // Initialize all the smaller hooks
  const { state, updateState, setLoggedIn, setLoggedOut, setLoading } = useAuthState();
  
  const {
    storeToken,
    removeToken,
    getToken,
    getCurrentUser,
    preserveTokenDuringLanguageChange,
    restoreTokenAfterLanguageChange,
    checkAndLoadInitialToken
  } = useAuthToken();
  
  const { checkAuth, setMounted, mountedRef } = useAuthCheck(
    getToken,
    getCurrentUser,
    updateState,
    setAuthTokenInStorage
  );
  
  const { forceRefresh } = useAuthRefresh(checkAuth);
  
  useAuthLanguageEffect(
    preserveTokenDuringLanguageChange,
    restoreTokenAfterLanguageChange,
    checkAuth
  );
  
  // Login function
  const login = useCallback((token: string) => {
    if (!mountedRef.current) return;
    
    console.log("Login: Setting auth token", token);
    storeToken(token);
    
    const storedUser = getCurrentUser();
    setLoggedIn(storedUser);
  }, [storeToken, getCurrentUser, setLoggedIn, mountedRef]);
  
  // Logout function
  const logout = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("Logging out user - removing auth token");
    
    removeToken();
    removeUserFromStorage();
    setLoggedOut();
    
    toast.success('退出登录成功', {
      duration: 3000,
      position: 'top-center',
    });
    
    dispatchLogoutEvent();
  }, [removeToken, setLoggedOut, mountedRef]);
  
  // Set up component mount/unmount effect
  useEffect(() => {
    setMounted(true);
    checkAndLoadInitialToken();
    
    return () => {
      setMounted(false);
    };
  }, [checkAndLoadInitialToken, setMounted]);
  
  // Set up initial auth check effect
  useEffect(() => {
    checkAndLoadInitialToken();
    
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 50);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("Auth token changed in another tab, refreshing state");
        checkAuth();
      } else if (e.key === 'userData' && mountedRef.current) {
        console.log("User data changed in another tab, refreshing state");
        const storedUser = getCurrentUser();
        if (storedUser) {
          updateState({ user: storedUser });
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
    };
  }, [checkAuth, checkAndLoadInitialToken, mountedRef, getCurrentUser, updateState]);
  
  // Return the public API
  return { ...state, logout, login, forceRefresh };
};

// Export the auth hook as the default export
export default useAuth;
