
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
  
  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
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
  }, [translation, refreshCounter]);
  
  // Update language with improved stability
  const setLanguageSafely = useCallback((newLanguage: LanguageCode) => {
    if (isChangingRef.current || !mountedRef.current) return;
    
    try {
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
      
      // Release lock after small delay
      setTimeout(() => {
        if (mountedRef.current) {
          isChangingRef.current = false;
        }
      }, 100);
    } catch (error) {
      console.error("Error changing language:", error);
      isChangingRef.current = false;
    }
  }, [setLanguage]);
  
  // Force refresh translations
  const refreshTranslations = useCallback(() => {
    if (!mountedRef.current) return;
    
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
