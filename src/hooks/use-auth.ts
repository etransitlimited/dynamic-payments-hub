
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';
import { toast } from 'sonner';
import { AuthHookReturn, AuthState } from '@/types/auth';
import { 
  getAuthTokenFromStorage, 
  getTempAuthTokenFromStorage,
  setAuthTokenInStorage,
  removeAuthTokenFromStorage,
  removeUserFromStorage,
  syncTokens,
  getUserFromStorage,
  setTempAuthTokenInStorage
} from '@/auth/storage';
import {
  preserveAuthDuringLanguageChange,
  restoreAuthAfterLanguageChange,
  dispatchLogoutEvent,
  getInitialAuthState
} from '@/auth/authUtils';

export const useAuth = (): AuthHookReturn => {
  const [state, setState] = useState<AuthState>(getInitialAuthState());
  
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const mountedRef = useRef(true);
  const checkInProgressRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);
  const languageRef = useRef(language);
  const refreshThrottleMs = 500;
  const stableTokenRef = useRef<string | null>(null);
  const initialTokenLoadedRef = useRef(false);

  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      const localToken = getAuthTokenFromStorage();
      const sessionToken = getTempAuthTokenFromStorage();
      const token = localToken || sessionToken || stableTokenRef.current;
      
      if (token) {
        stableTokenRef.current = token;
        initialTokenLoadedRef.current = true;
        
        if (!localToken && token) {
          console.log("Auth: Restoring token to localStorage");
          setAuthTokenInStorage(token);
        }
      }
      
      console.log("Auth check: Token exists:", !!token);
      
      if (token && mountedRef.current) {
        const storedUser = getUserFromStorage();
        
        setState(prev => {
          if (!prev.isLoggedIn || prev.isLoading || !prev.user) {
            return {
              isLoggedIn: true,
              isLoading: false,
              user: storedUser,
            };
          }
          return prev;
        });
        
        if (token !== getAuthTokenFromStorage()) {
          setAuthTokenInStorage(token);
        }
        
        checkInProgressRef.current = false;
        return true;
      } else if (mountedRef.current) {
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
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
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

  const logout = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("Logging out user - removing auth token");
    
    removeAuthTokenFromStorage();
    removeUserFromStorage();
    sessionStorage.removeItem('tempAuthToken');
    stableTokenRef.current = null;
    
    setState({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });
    
    toast.success('退出登录成功', {
      duration: 3000,
      position: 'top-center',
    });
    
    dispatchLogoutEvent();
  }, []);

  const login = useCallback((token: string) => {
    if (!mountedRef.current) return;
    
    console.log("Login: Setting auth token", token);
    setAuthTokenInStorage(token);
    setTempAuthTokenInStorage(token);
    stableTokenRef.current = token;
    
    const storedUser = getUserFromStorage();
    
    setState({
      isLoggedIn: true,
      isLoading: false,
      user: storedUser,
    });
  }, []);

  // 组件挂载和卸载效果处理
  useEffect(() => {
    mountedRef.current = true;
    
    const localToken = getAuthTokenFromStorage();
    const sessionToken = getTempAuthTokenFromStorage();
    
    if (localToken) {
      stableTokenRef.current = localToken;
    } else if (sessionToken) {
      console.log("Auth: Found token in session storage on mount, restoring");
      setAuthTokenInStorage(sessionToken);
      stableTokenRef.current = sessionToken;
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 语言变化效果处理
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      const currentToken = getAuthTokenFromStorage() || stableTokenRef.current;
      if (currentToken) {
        console.log("Auth: Preserving token during language change");
        setTempAuthTokenInStorage(currentToken);
        stableTokenRef.current = currentToken;
      }
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          const tempToken = getTempAuthTokenFromStorage();
          if (tempToken && !getAuthTokenFromStorage()) {
            console.log("Auth: Restoring token from session storage after language change");
            setAuthTokenInStorage(tempToken);
            stableTokenRef.current = tempToken;
          }
          
          checkAuth();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [language, checkAuth]);

  // 语言切换中状态处理
  useEffect(() => {
    if (isChangingLanguage) {
      console.log("Auth: Language is changing, preserving auth token");
      const token = getAuthTokenFromStorage() || stableTokenRef.current;
      if (token) {
        setTempAuthTokenInStorage(token);
        stableTokenRef.current = token;
      }
    } else if (!isChangingLanguage) {
      console.log("Auth: Language change complete, checking for token restoration");
      const tempToken = getTempAuthTokenFromStorage();
      const localToken = getAuthTokenFromStorage();
      
      if (tempToken && !localToken) {
        console.log("Auth: Restoring token from session storage");
        setAuthTokenInStorage(tempToken);
        stableTokenRef.current = tempToken;
        
        const storedUser = getUserFromStorage();
        
        if (!state.isLoggedIn && storedUser) {
          setState({
            isLoggedIn: true,
            isLoading: false,
            user: storedUser,
          });
        }
      }
    }
  }, [isChangingLanguage, state.isLoggedIn]);

  // 初始认证检查和存储事件监听
  useEffect(() => {
    if (!initialTokenLoadedRef.current) {
      const localToken = getAuthTokenFromStorage();
      const sessionToken = getTempAuthTokenFromStorage();
      
      if (localToken) {
        stableTokenRef.current = localToken;
        initialTokenLoadedRef.current = true;
      } else if (sessionToken) {
        console.log("Auth: No token in localStorage, but found in sessionStorage. Restoring.");
        setAuthTokenInStorage(sessionToken);
        stableTokenRef.current = sessionToken;
        initialTokenLoadedRef.current = true;
      }
    }
    
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 50);
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("Auth token changed in another tab, refreshing state");
        stableTokenRef.current = e.newValue;
        checkAuth();
      } else if (e.key === 'userData' && mountedRef.current) {
        console.log("User data changed in another tab, refreshing state");
        const storedUser = getUserFromStorage();
        if (storedUser) {
          setState(prev => ({ ...prev, user: storedUser }));
        }
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
