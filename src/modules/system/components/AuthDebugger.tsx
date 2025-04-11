
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';

/**
 * This is a debug-only component that helps trace auth and language issues
 * It's invisible in production but logs important diagnostics
 */
export const AuthDebugger: React.FC = () => {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { language, isLoading: langLoading } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('==== AUTH DEBUG INFO ====');
      console.log('Auth state:', { isLoggedIn, isLoading: authLoading });
      console.log('Language:', language, { isLoading: langLoading, changing: isChangingLanguage });
      console.log('localStorage token:', localStorage.getItem('authToken'));
      console.log('sessionStorage tempToken:', sessionStorage.getItem('tempAuthToken'));
      console.log('=======================');
    }
  }, [isLoggedIn, authLoading, language, langLoading, isChangingLanguage]);
  
  // This component doesn't render anything visible
  return null;
};

export default AuthDebugger;
