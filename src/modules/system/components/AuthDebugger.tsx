
import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('==== AUTH DEBUG INFO ====');
      console.log('Auth state:', { isLoggedIn, isLoading: authLoading });
      console.log('Language:', language, { isLoading: langLoading, changing: isChangingLanguage });
      console.log('Current path:', location.pathname);
      console.log('localStorage token:', localStorage.getItem('authToken'));
      console.log('sessionStorage tempToken:', sessionStorage.getItem('tempAuthToken'));
      
      // Additional diagnostics
      const tokenStatus = localStorage.getItem('authToken') 
        ? "Token exists in localStorage" 
        : "No token in localStorage";
      
      const tempTokenStatus = sessionStorage.getItem('tempAuthToken')
        ? "Temporary token exists in sessionStorage"
        : "No temporary token in sessionStorage";
        
      console.log('Token status:', tokenStatus);
      console.log('Temp token status:', tempTokenStatus);
      
      // Check for inconsistencies
      if (localStorage.getItem('authToken') && !isLoggedIn && !authLoading) {
        console.warn('⚠️ INCONSISTENCY: Token exists but isLoggedIn is false!');
        console.log('Attempting to fix by forcing refresh...');
        setTimeout(() => forceRefresh(), 500);
      }
      
      console.log('=======================');
    }
  }, [isLoggedIn, authLoading, language, langLoading, isChangingLanguage, location.pathname, forceRefresh]);
  
  // This component doesn't render anything visible
  return null;
};

export default AuthDebugger;
