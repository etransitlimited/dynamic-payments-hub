
import React, { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';
import { useLocation } from 'react-router-dom';

/**
 * This is a debug-only component that helps trace auth and language issues
 * It's invisible in production but logs important diagnostics
 */
export const AuthDebugger: React.FC = () => {
  const { isLoggedIn, isLoading: authLoading, forceRefresh } = useAuth();
  const { language, isLoading: langLoading } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const location = useLocation();
  const lastPathRef = useRef(location.pathname);
  const mountTimeRef = useRef(Date.now());
  const lastLogTimeRef = useRef(Date.now());
  const tokenRef = useRef<string | null>(null);
  
  // Enhanced logging system with timestamp
  const debugLog = (...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      const now = Date.now();
      const timeSinceMount = (now - mountTimeRef.current) / 1000;
      const timeSinceLastLog = (now - lastLogTimeRef.current) / 1000;
      lastLogTimeRef.current = now;
      
      console.log(`[AUTH DEBUG ${timeSinceMount.toFixed(1)}s] (+${timeSinceLastLog.toFixed(1)}s)`, ...args);
    }
  };
  
  // Log basic auth info every render
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      debugLog('==== AUTH DEBUG INFO ====');
      debugLog('Auth state:', { isLoggedIn, isLoading: authLoading });
      debugLog('Language:', language, { isLoading: langLoading, changing: isChangingLanguage });
      debugLog('Current path:', location.pathname);
      
      // Check tokens from all storage locations
      const localToken = localStorage.getItem('authToken');
      const sessionToken = sessionStorage.getItem('tempAuthToken');
      tokenRef.current = localToken || sessionToken || null;
      
      debugLog('localStorage token:', localToken);
      debugLog('sessionStorage tempToken:', sessionToken);
      debugLog('Memory token:', tokenRef.current);
      
      // Report path changes
      if (location.pathname !== lastPathRef.current) {
        debugLog('Path changed from:', lastPathRef.current, 'to:', location.pathname);
        lastPathRef.current = location.pathname;
      }
      
      // Check for inconsistencies
      if (tokenRef.current && !isLoggedIn && !authLoading) {
        debugLog('⚠️ INCONSISTENCY: Token exists but isLoggedIn is false!');
        debugLog('Token value:', tokenRef.current);
        debugLog('Triggering auth refresh due to inconsistency...');
        
        // Attempt to fix by forcing refresh
        forceRefresh();
      }
      
      // Storage event monitoring
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'authToken' || e.key === 'tempAuthToken') {
          debugLog(`Storage change detected for ${e.key}:`, {
            oldValue: e.oldValue,
            newValue: e.newValue
          });
          
          // Update our reference and trigger auth check if needed
          if (e.key === 'authToken') {
            tokenRef.current = e.newValue;
            if (e.newValue && !isLoggedIn) {
              debugLog('Token added but not logged in, triggering refresh');
              forceRefresh();
            } else if (!e.newValue && isLoggedIn) {
              debugLog('Token removed but still logged in, state may be inconsistent');
            }
          }
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isLoggedIn, authLoading, language, langLoading, isChangingLanguage, location.pathname, forceRefresh]);
  
  // Log details about token restoration attempts
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!isLoggedIn && tokenRef.current) {
        debugLog('Found token but not logged in - attempting automatic recovery');
        forceRefresh();
        
        // Check again after a delay to see if recovery worked
        const timer = setTimeout(() => {
          debugLog('Checking if token recovery was successful:', { 
            isLoggedIn, 
            token: tokenRef.current !== null 
          });
          
          if (!isLoggedIn && tokenRef.current) {
            debugLog('Recovery failed, token still exists but not logged in');
          }
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isLoggedIn, forceRefresh]);
  
  // This component doesn't render anything visible
  return null;
};

export default AuthDebugger;
