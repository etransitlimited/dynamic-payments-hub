import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
}

// 新增：生成随机用户名的函数
const generateRandomUsername = () => {
  const prefixes = ['brave', 'swift', 'clever', 'cool', 'smart'];
  const suffixes = ['user', 'pro', 'explorer', 'ninja', 'master'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const randomNumber = Math.floor(Math.random() * 1000);
  
  return `${randomPrefix}_${randomSuffix}_${randomNumber}`;
};

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
      const localToken = localStorage.getItem('authToken');
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      const token = localToken || sessionToken || stableTokenRef.current;
      
      if (token) {
        stableTokenRef.current = token;
        initialTokenLoadedRef.current = true;
        
        if (!localToken && token) {
          console.log("Auth: Restoring token to localStorage");
          localStorage.setItem('authToken', token);
        }
      }
      
      console.log("Auth check: Token exists:", !!token);
      
      if (token && mountedRef.current) {
        setState(prev => {
          if (!prev.isLoggedIn || prev.isLoading) {
            return {
              isLoggedIn: true,
              isLoading: false,
              user: { 
                id: '1', 
                name: 'Test User', 
                email: 'test@example.com',
                username: 'TestUser'
              },
            };
          }
          return prev;
        });
        
        if (token !== localStorage.getItem('authToken')) {
          localStorage.setItem('authToken', token);
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
    
    localStorage.removeItem('authToken');
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
    
    const logoutEvent = new CustomEvent('auth:logout');
    window.dispatchEvent(logoutEvent);
  }, []);

  const login = useCallback((token: string) => {
    if (!mountedRef.current) return;
    
    console.log("Login: Setting auth token", token);
    localStorage.setItem('authToken', token);
    sessionStorage.setItem('tempAuthToken', token);
    stableTokenRef.current = token;
    
    // 使用随机生成的用户名
    const dynamicUsername = generateRandomUsername();
    
    setState({
      isLoggedIn: true,
      isLoading: false,
      user: { 
        id: '1', 
        name: 'Test User', 
        email: 'test@example.com',
        username: dynamicUsername
      },
    });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    const localToken = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('tempAuthToken');
    
    if (localToken) {
      stableTokenRef.current = localToken;
    } else if (sessionToken) {
      console.log("Auth: Found token in session storage on mount, restoring");
      localStorage.setItem('authToken', sessionToken);
      stableTokenRef.current = sessionToken;
    }
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      const currentToken = localStorage.getItem('authToken') || stableTokenRef.current;
      if (currentToken) {
        console.log("Auth: Preserving token during language change");
        sessionStorage.setItem('tempAuthToken', currentToken);
        stableTokenRef.current = currentToken;
      }
      
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          const tempToken = sessionStorage.getItem('tempAuthToken');
          if (tempToken && !localStorage.getItem('authToken')) {
            console.log("Auth: Restoring token from session storage after language change");
            localStorage.setItem('authToken', tempToken);
            stableTokenRef.current = tempToken;
          }
          
          checkAuth();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [language, checkAuth]);

  useEffect(() => {
    if (isChangingLanguage) {
      console.log("Auth: Language is changing, preserving auth token");
      const token = localStorage.getItem('authToken') || stableTokenRef.current;
      if (token) {
        sessionStorage.setItem('tempAuthToken', token);
        stableTokenRef.current = token;
      }
    } else if (!isChangingLanguage) {
      console.log("Auth: Language change complete, checking for token restoration");
      const tempToken = sessionStorage.getItem('tempAuthToken');
      const localToken = localStorage.getItem('authToken');
      
      if (tempToken && !localToken) {
        console.log("Auth: Restoring token from session storage");
        localStorage.setItem('authToken', tempToken);
        stableTokenRef.current = tempToken;
        
        if (!state.isLoggedIn) {
          setState({
            isLoggedIn: true,
            isLoading: false,
            user: { 
              id: '1', 
              name: 'Test User', 
              email: 'test@example.com',
              username: 'TestUser'
            },
          });
        }
      }
    }
  }, [isChangingLanguage, state.isLoggedIn]);

  useEffect(() => {
    if (!initialTokenLoadedRef.current) {
      const localToken = localStorage.getItem('authToken');
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      
      if (localToken) {
        stableTokenRef.current = localToken;
        initialTokenLoadedRef.current = true;
      } else if (sessionToken) {
        console.log("Auth: No token in localStorage, but found in sessionStorage. Restoring.");
        localStorage.setItem('authToken', sessionToken);
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
