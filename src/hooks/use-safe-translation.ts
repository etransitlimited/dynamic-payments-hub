
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
  const lastLanguageChangeRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Track mounted state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  // Update language ref when base language changes with debouncing
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      // Prevent rapid language switches by checking timestamp
      const now = Date.now();
      const minTimeBetweenUpdates = 500; // ms
      
      if (now - lastDispatchTimeRef.current < minTimeBetweenUpdates) {
        console.log(`Debouncing language update from ${languageRef.current} to ${language}`);
        
        // Clear any existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        // Set a new timer to update after delay
        debounceTimerRef.current = setTimeout(() => {
          if (mountedRef.current) {
            languageRef.current = language as LanguageCode;
            // Update timestamp
            lastDispatchTimeRef.current = Date.now();
            // Force refresh to ensure components update
            setRefreshCounter(prev => prev + 1);
          }
        }, minTimeBetweenUpdates);
        
        return;
      }
      
      // Update immediately if outside debounce window
      languageRef.current = language as LanguageCode;
      lastDispatchTimeRef.current = now;
    }
  }, [language]);
  
  // Enhanced translation function with direct and context fallbacks
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>) => {
    if (!key) return fallback || '';
    
    try {
      // Create a cache key including language to ensure freshness
      const cacheKey = `${languageRef.current}:${key}:${refreshCounter}`;
      
      // Check if we've already processed this exact translation request
      if (lastLanguageChangeRef.current === cacheKey) {
        // Fixed: Removed the fourth parameter that was causing the TypeScript error
        const cachedTranslation = getDirectTranslation(key, languageRef.current, fallback);
        return values ? formatDirectTranslation(cachedTranslation, values) : cachedTranslation;
      }
      
      // Update last translation key
      lastLanguageChangeRef.current = cacheKey;
      
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
  
  // Update language with improved stability and throttling
  const setLanguageSafely = useCallback((newLanguage: LanguageCode) => {
    if (isChangingRef.current || !mountedRef.current || newLanguage === languageRef.current) return;
    
    try {
      const now = Date.now();
      // Throttle language changes to prevent rapid switching
      const minTimeBetweenChanges = 800; // ms
      if (now - lastDispatchTimeRef.current < minTimeBetweenChanges) {
        console.log(`Throttling language change to ${newLanguage}, too soon after last change`);
        return;
      }
      
      console.log(`Setting language safely from ${languageRef.current} to ${newLanguage}`);
      
      isChangingRef.current = true;
      languageRef.current = newLanguage;
      
      // Clear any pending debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      
      // Update language context
      setLanguage(newLanguage);
      
      // Only dispatch events after a short delay to prevent event cascade
      debounceTimerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          // Dispatch events manually for reliability
          dispatchLanguageChangeEvent(newLanguage);
          
          // Increment refresh counter to trigger re-renders
          setRefreshCounter(prev => prev + 1);
          
          // Update timestamp
          lastDispatchTimeRef.current = Date.now();
        }
      }, 50);
      
      // Release lock after small delay
      setTimeout(() => {
        if (mountedRef.current) {
          isChangingRef.current = false;
        }
      }, minTimeBetweenChanges);
    } catch (error) {
      console.error("Error changing language:", error);
      isChangingRef.current = false;
    }
  }, [setLanguage]);
  
  // Force refresh translations with debouncing
  const refreshTranslations = useCallback(() => {
    if (!mountedRef.current) return;
    
    const now = Date.now();
    const minTimeBetweenRefreshes = 500; // ms
    
    if (now - lastDispatchTimeRef.current < minTimeBetweenRefreshes) {
      console.log(`Debouncing translation refresh for language ${languageRef.current}`);
      
      // Clear any existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Set a new timer to refresh after delay
      debounceTimerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          console.log(`Executing delayed translation refresh for language ${languageRef.current}`);
          setRefreshCounter(prev => prev + 1);
          dispatchLanguageChangeEvent(languageRef.current);
          lastDispatchTimeRef.current = Date.now();
        }
      }, minTimeBetweenRefreshes);
      
      return;
    }
    
    // Refresh immediately if outside debounce window
    console.log(`Forcing translation refresh for language ${languageRef.current}`);
    setRefreshCounter(prev => prev + 1);
    dispatchLanguageChangeEvent(languageRef.current);
    lastDispatchTimeRef.current = now;
  }, []);
  
  return {
    t,
    language: languageRef.current,
    setLanguage: setLanguageSafely,
    refreshTranslations,
    refreshCounter
  };
};
