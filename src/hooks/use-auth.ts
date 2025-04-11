
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
      // First try to get token from localStorage, then sessionStorage, then memory
      const localToken = localStorage.getItem('authToken');
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      const token = localToken || sessionToken || stableTokenRef.current;
      
      // Store token in memory to prevent it from being lost
      if (token) {
        stableTokenRef.current = token;
        initialTokenLoadedRef.current = true;
        
        // Make sure token is in localStorage
        if (!localToken && token) {
          console.log("Auth: Restoring token to localStorage");
          localStorage.setItem('authToken', token);
        }
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
    sessionStorage.removeItem('tempAuthToken');
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
    sessionStorage.setItem('tempAuthToken', token);
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
    
    // Try to restore auth from localStorage, sessionStorage, or memory on mount
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

  // Critical fix: More robust handling of language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      // Save token immediately during language change to prevent it from being lost
      const currentToken = localStorage.getItem('authToken') || stableTokenRef.current;
      if (currentToken) {
        console.log("Auth: Preserving token during language change");
        sessionStorage.setItem('tempAuthToken', currentToken);
        stableTokenRef.current = currentToken;
      }
      
      // Re-check auth after language change with small delay to avoid conflicts
      const timer = setTimeout(() => {
        if (mountedRef.current) {
          // First try to restore from session storage
          const tempToken = sessionStorage.getItem('tempAuthToken');
          if (tempToken && !localStorage.getItem('authToken')) {
            console.log("Auth: Restoring token from session storage after language change");
            localStorage.setItem('authToken', tempToken);
            stableTokenRef.current = tempToken;
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
              email: 'test@example.com' 
            },
          });
        }
      }
    }
  }, [isChangingLanguage, state.isLoggedIn]);

  // Check auth state on mount
  useEffect(() => {
    // Try to load token from localStorage first when component mounts
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
