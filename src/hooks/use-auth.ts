
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';

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
  
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const mountedRef = useRef(true);
  const checkInProgressRef = useRef(false);
  const lastRefreshTimeRef = useRef(0);
  const languageRef = useRef(language);
  const refreshThrottleMs = 500;
  const stableTokenRef = useRef<string | null>(null);
  const initialTokenLoadedRef = useRef(false);

  // Function to check auth state with debouncing
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      // Always check localStorage first, then use cached value
      const token = localStorage.getItem('authToken') || stableTokenRef.current;
      
      // Store token in memory to prevent it from being lost
      if (token) {
        stableTokenRef.current = token;
        initialTokenLoadedRef.current = true;
      }
      
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
        
        // Ensure token is stored in localStorage
        if (token !== localStorage.getItem('authToken')) {
          localStorage.setItem('authToken', token);
        }
        
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
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  // Force refresh auth state with throttling
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

  // Enhanced logout function
  const logout = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log("Logging out user - removing auth token");
    localStorage.removeItem('authToken');
    stableTokenRef.current = null;
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
    stableTokenRef.current = token;
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

  // Track component mounted state
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Critical fix: More robust handling of language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      // Save token immediately during language change to prevent it from being lost
      if (stableTokenRef.current) {
        console.log("Auth: Preserving token during language change");
        sessionStorage.setItem('tempAuthToken', stableTokenRef.current);
      }
      
      // Re-check auth after language change with small delay to avoid conflicts
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          // First try to restore from session storage
          const tempToken = sessionStorage.getItem('tempAuthToken');
          if (tempToken) {
            console.log("Auth: Restoring token from session storage after language change");
            localStorage.setItem('authToken', tempToken);
            stableTokenRef.current = tempToken;
            sessionStorage.removeItem('tempAuthToken');
          }
          
          // Then check auth state
          checkAuth();
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [language, checkAuth]);

  // When language is changing, save auth token to session storage
  useEffect(() => {
    if (isChangingLanguage) {
      console.log("Auth: Language is changing, preserving auth token");
      const token = localStorage.getItem('authToken') || stableTokenRef.current;
      if (token) {
        sessionStorage.setItem('tempAuthToken', token);
      }
    } else if (!isChangingLanguage && sessionStorage.getItem('tempAuthToken')) {
      console.log("Auth: Language change complete, restoring auth token");
      const tempToken = sessionStorage.getItem('tempAuthToken');
      if (tempToken) {
        localStorage.setItem('authToken', tempToken);
        stableTokenRef.current = tempToken;
        
        if (state.isLoggedIn === false) {
          setState({
            isLoggedIn: true,
            isLoading: false,
            user: { 
              id: '1', 
              name: 'Test User', 
              email: 'test@example.com' 
            },
          });
        }
        
        sessionStorage.removeItem('tempAuthToken');
      }
    }
  }, [isChangingLanguage, state.isLoggedIn]);

  // Check auth state on mount
  useEffect(() => {
    // Try to load token from localStorage first when component mounts
    if (!initialTokenLoadedRef.current) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        stableTokenRef.current = storedToken;
        initialTokenLoadedRef.current = true;
      }
    }
    
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
