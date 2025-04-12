
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/context/TranslationProvider';

/**
 * Hook for handling authentication during language changes
 */
export const useAuthLanguageEffect = (
  preserveToken: () => void,
  restoreToken: () => boolean,
  checkAuth: () => boolean
) => {
  const { language } = useLanguage();
  const { isChangingLanguage } = useTranslation();
  const languageRef = useRef(language);
  
  // Language change effect
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`Auth: Language changed from ${languageRef.current} to ${language}, preserving auth state`);
      languageRef.current = language;
      
      preserveToken();
      
      const timer = setTimeout(() => {
        restoreToken();
        checkAuth();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [language, checkAuth, preserveToken, restoreToken]);
  
  // Language changing state effect
  useEffect(() => {
    if (isChangingLanguage) {
      console.log("Auth: Language is changing, preserving auth token");
      preserveToken();
    } else if (!isChangingLanguage) {
      console.log("Auth: Language change complete, checking for token restoration");
      restoreToken();
    }
  }, [isChangingLanguage, preserveToken, restoreToken]);
  
  return { language, isChangingLanguage, languageRef };
};
