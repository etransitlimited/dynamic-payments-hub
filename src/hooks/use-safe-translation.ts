
import { useTranslation } from '@/context/TranslationProvider';
import { useLanguage } from '@/context/LanguageContext';
import { useCallback, useRef, useState, useEffect } from 'react';
import { getDirectTranslation, formatDirectTranslation, dispatchLanguageChangeEvent } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Enhanced translation hook that combines context provider with direct access
 * for improved reliability and performance
 */
export const useSafeTranslation = () => {
  const translation = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const isChangingRef = useRef(false);
  const mountedRef = useRef(true);
  const lastDispatchTimeRef = useRef(0);
  
  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update language ref when base language changes
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      languageRef.current = language as LanguageCode;
    }
  }, [language]);
  
  // Enhanced translation function with direct and context fallbacks
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>) => {
    try {
      // Try using context translation first
      if (translation && translation.translate) {
        const contextTranslation = translation.translate(key, fallback, values);
        if (contextTranslation && contextTranslation !== key) {
          return contextTranslation;
        }
      }
      
      // Fallback to direct translation if context fails
      const directTranslation = getDirectTranslation(key, languageRef.current, fallback);
      
      // Apply format if values are provided
      if (values && directTranslation !== key) {
        return formatDirectTranslation(directTranslation, values);
      }
      
      return directTranslation;
    } catch (error) {
      console.error(`Safe translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, [translation, language, refreshCounter]);
  
  // Update language with improved stability
  const setLanguageSafely = useCallback((newLanguage: LanguageCode) => {
    if (isChangingRef.current || !mountedRef.current || newLanguage === languageRef.current) return;
    
    try {
      const now = Date.now();
      // Debounce language changes to prevent rapid switching
      if (now - lastDispatchTimeRef.current < 300) {
        console.log(`Debouncing language change to ${newLanguage}`);
        return;
      }
      
      console.log(`Setting language safely from ${languageRef.current} to ${newLanguage}`);
      
      isChangingRef.current = true;
      languageRef.current = newLanguage;
      
      // Update language context
      setLanguage(newLanguage);
      
      // Dispatch events manually for reliability
      dispatchLanguageChangeEvent(newLanguage);
      
      // Increment refresh counter to trigger re-renders
      if (mountedRef.current) {
        setRefreshCounter(prev => prev + 1);
      }
      
      lastDispatchTimeRef.current = now;
      
      // Release lock after small delay
      setTimeout(() => {
        if (mountedRef.current) {
          isChangingRef.current = false;
        }
      }, 300);
    } catch (error) {
      console.error("Error changing language:", error);
      isChangingRef.current = false;
    }
  }, [setLanguage]);
  
  // Force refresh translations
  const refreshTranslations = useCallback(() => {
    if (!mountedRef.current) return;
    
    console.log(`Forcing translation refresh for language ${languageRef.current}`);
    setRefreshCounter(prev => prev + 1);
    dispatchLanguageChangeEvent(languageRef.current);
  }, []);
  
  return {
    t,
    language: languageRef.current,
    setLanguage: setLanguageSafely,
    refreshTranslations,
    refreshCounter
  };
};
