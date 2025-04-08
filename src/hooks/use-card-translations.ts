
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

/**
 * Hook specifically optimized for dashboard card translations
 * Provides methods to get translations without causing re-renders
 */
export const useCardTranslations = () => {
  const { language } = useLanguage();
  const [refreshCounter, setRefreshCounter] = useState(0);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const mountedRef = useRef(true);
  
  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update language reference when it changes
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      languageRef.current = language as LanguageCode;
      setRefreshCounter(prev => prev + 1);
    }
  }, [language]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage && mountedRef.current) {
          languageRef.current = newLanguage as LanguageCode;
          setRefreshCounter(prev => prev + 1);
        }
      } catch (error) {
        console.error("Error in card translations language change handler:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Get translation for a key
  const getTranslation = useCallback((key: string, fallback?: string): string => {
    return getDirectTranslation(key, languageRef.current, fallback);
  }, [refreshCounter]);
  
  // Get translation with values replaced
  const getFormattedTranslation = useCallback((
    key: string, 
    values: Record<string, string | number>,
    fallback?: string
  ): string => {
    const translation = getDirectTranslation(key, languageRef.current, fallback);
    return formatDirectTranslation(translation, values);
  }, [refreshCounter]);
  
  // Update a DOM element's text content directly
  const updateElement = useCallback((
    element: HTMLElement | null,
    key: string,
    fallback?: string,
    values?: Record<string, string | number>
  ): void => {
    if (!element) return;
    
    try {
      let translation = getDirectTranslation(key, languageRef.current, fallback);
      
      if (values) {
        translation = formatDirectTranslation(translation, values);
      }
      
      element.textContent = translation;
      element.setAttribute('data-language', languageRef.current);
      element.setAttribute('data-key', key);
    } catch (error) {
      console.error(`Error updating element with translation for "${key}":`, error);
      if (element) {
        element.textContent = fallback || key;
      }
    }
  }, [refreshCounter]);
  
  return {
    language: languageRef.current,
    getTranslation,
    getFormattedTranslation,
    updateElement,
    refreshCounter
  };
};
