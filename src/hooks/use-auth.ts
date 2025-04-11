
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
  const refreshThrottleMs = 500; // Prevent refreshing more than once every 500ms
  const stableTokenRef = useRef<string | null>(null);

  // Function to check auth state with debouncing
  const checkAuth = useCallback(() => {
    if (checkInProgressRef.current || !mountedRef.current) return false;
    
    checkInProgressRef.current = true;
    try {
      // Important fix: Cache token in ref to prevent it from being lost during language changes
      const token = stableTokenRef.current || localStorage.getItem('authToken');
      if (token) {
        stableTokenRef.current = token; // Keep token in memory
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
        
        // Ensure token is stored in localStorage (may have been lost during language switch)
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
        stableTokenRef.current = null; // Clear the ref
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
      checkInProgressRef.current = false;
      return false;
    }
    
    checkInProgressRef.current = false;
    return false;
  }, []);

  // Force refresh auth state with throttling
  const forceRefresh = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
    // Throttle refreshes to prevent cascading updates
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
    stableTokenRef.current = null; // Clear the memory cache
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
    stableTokenRef.current = token; // Keep token in memory
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

  // Re-check auth when language changes to ensure token is preserved
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      // Re-check auth after language change with small delay to avoid conflicts
      setTimeout(() => {
        if (mountedRef.current && stableTokenRef.current) {
          console.log("Auth: Re-storing token after language change");
          localStorage.setItem('authToken', stableTokenRef.current);
          
          // Force state update if needed
          setState(prev => {
            if (!prev.isLoggedIn) {
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
        }
      }, 200);
    }
  }, [language]);

  // Check auth state on mount
  useEffect(() => {
    console.log("Auth hook initialized, checking authentication state...");
    
    // Initialize stableTokenRef from localStorage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      stableTokenRef.current = storedToken;
    }
    
    // Small timeout to ensure component is fully mounted
    const timer = setTimeout(() => {
      if (mountedRef.current) {
        checkAuth();
      }
    }, 50);
    
    // Listen for storage changes to detect cross-tab auth changes
    // But with debouncing to prevent excessive checks
    let storageDebounceTimer: NodeJS.Timeout | null = null;
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && mountedRef.current) {
        console.log("Auth token changed in another tab, refreshing state");
        
        // Debounce the storage event handler
        if (storageDebounceTimer) {
          clearTimeout(storageDebounceTimer);
        }
        
        storageDebounceTimer = setTimeout(() => {
          if (mountedRef.current) {
            // Update the stable reference
            stableTokenRef.current = localStorage.getItem('authToken');
            checkAuth();
          }
          storageDebounceTimer = null;
        }, 200);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timer);
      if (storageDebounceTimer) {
        clearTimeout(storageDebounceTimer);
      }
    };
  }, [checkAuth]);

  return { ...state, logout, login, forceRefresh };
};
