
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { getDirectTranslation, dispatchLanguageChangeEvent, clearDirectTranslationCache } from '@/utils/translationHelpers';

/**
 * Hook that provides safer translation with less UI flickering
 * by using direct translation without re-renders
 */
export const useSafeTranslation = () => {
  const { language: contextLanguage, setLanguage, lastUpdate } = useLanguage();
  const [updateCounter, setUpdateCounter] = useState(0);
  const instanceId = useRef(`safe-trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const stableLanguage = useRef<LanguageCode>(contextLanguage as LanguageCode);
  const lastUpdateTime = useRef<number>(Date.now());
  const translationCache = useRef<Record<string, string>>({});
  const isChangingLanguage = useRef(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const isInitializedRef = useRef(false);
  const handlerAttachedRef = useRef(false);
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // Throttle refreshes to prevent too many rerenders
  const throttleRefresh = useCallback(() => {
    if (pendingUpdateRef.current) {
      clearTimeout(pendingUpdateRef.current);
    }
    pendingUpdateRef.current = setTimeout(() => {
      setRefreshCounter(prev => prev + 1);
      pendingUpdateRef.current = null;
    }, 50);
  }, []);
  
  // Initialize once on mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      stableLanguage.current = contextLanguage as LanguageCode;
      isInitializedRef.current = true;
    }
    
    return () => {
      // Clear cache and pending updates on unmount to prevent memory leaks
      translationCache.current = {};
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }
    };
  }, []);
  
  // Attach global event handlers only once
  useEffect(() => {
    if (!handlerAttachedRef.current) {
      const handleGlobalLanguageChange = (e: Event) => {
        try {
          const customEvent = e as CustomEvent;
          const { language: newLanguage, timestamp } = customEvent.detail || {};
          
          if (newLanguage && stableLanguage.current !== newLanguage && !isChangingLanguage.current) {
            console.log(`Global language change detected in useSafeTranslation: ${stableLanguage.current} -> ${newLanguage}`);
            
            // Update stable reference
            stableLanguage.current = newLanguage as LanguageCode;
            
            // Clear cache
            translationCache.current = {}; 
            
            // Track update time
            if (timestamp) {
              lastUpdateTime.current = timestamp;
            } else {
              lastUpdateTime.current = Date.now();
            }
            
            // Trigger update to re-render components
            setUpdateCounter(prev => prev + 1);
            throttleRefresh();
          }
        } catch (error) {
          console.error("Error in global language change handler:", error);
        }
      };
      
      window.addEventListener('app:languageChange', handleGlobalLanguageChange);
      document.addEventListener('languageChanged', handleGlobalLanguageChange);
      handlerAttachedRef.current = true;
      
      return () => {
        window.removeEventListener('app:languageChange', handleGlobalLanguageChange);
        document.removeEventListener('languageChanged', handleGlobalLanguageChange);
        handlerAttachedRef.current = false;
      };
    }
  }, [throttleRefresh]);
  
  // Update stable reference when language context changes
  useEffect(() => {
    if (stableLanguage.current !== contextLanguage && !isChangingLanguage.current) {
      console.log(`Language context change detected in useSafeTranslation: ${stableLanguage.current} -> ${contextLanguage}`);
      
      stableLanguage.current = contextLanguage as LanguageCode;
      translationCache.current = {}; // Clear cache on language change
      clearDirectTranslationCache(); // Also clear the global cache
      
      // Trigger update counter change to notify components
      lastUpdateTime.current = Date.now();
      setUpdateCounter(prev => prev + 1);
      throttleRefresh();
    }
  }, [contextLanguage, throttleRefresh]);
  
  // Also update when lastUpdate changes
  useEffect(() => {
    if (lastUpdate > lastUpdateTime.current) {
      lastUpdateTime.current = lastUpdate;
      translationCache.current = {}; // Clear cache on forced update
      clearDirectTranslationCache(); // Also clear the global cache
      setUpdateCounter(prev => prev + 1);
      throttleRefresh();
    }
  }, [lastUpdate, throttleRefresh]);
  
  // Create a stable translation function that doesn't cause re-renders
  const t = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      if (!key) return fallback || '';
      
      // Create a cache key that includes language and values
      const valuesStr = values ? JSON.stringify(values) : '';
      const cacheKey = `${stableLanguage.current}:${key}:${valuesStr}`;
      
      // Return cached result if available
      if (translationCache.current[cacheKey]) {
        return translationCache.current[cacheKey];
      }
      
      // Get translation directly to bypass context and reduce re-renders
      let result = getDirectTranslation(key, stableLanguage.current, fallback);
      
      // Apply values to translation if provided
      if (values && result !== key && result !== fallback) {
        result = Object.entries(values).reduce((text, [valueKey, value]) => {
          const pattern = new RegExp(`\\{${valueKey}\\}`, 'g');
          return text.replace(pattern, String(value));
        }, result);
      }
      
      // Cache successful translations
      if (result && result !== key) {
        translationCache.current[cacheKey] = result;
      }
      
      return result;
    } catch (error) {
      console.error(`Safe translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, []);
  
  // Create a safer language setter that prevents thrashing
  const safeSetLanguage = useCallback((newLanguage: LanguageCode) => {
    if (newLanguage === stableLanguage.current || isChangingLanguage.current) return;
    
    isChangingLanguage.current = true;
    try {
      console.log(`Safe translation changing language from ${stableLanguage.current} to ${newLanguage}`);
      
      // Clear cache immediately
      translationCache.current = {};
      clearDirectTranslationCache();
      
      // Update stable reference first
      stableLanguage.current = newLanguage;
      
      // Then update context
      setLanguage(newLanguage);
      
      // Update timestamp
      lastUpdateTime.current = Date.now();
      
      // Dispatch events consistently using the helper function
      dispatchLanguageChangeEvent(newLanguage);
      
      // Force refresh with throttling
      throttleRefresh();
      
    } catch (error) {
      console.error("Error in safeSetLanguage:", error);
    } finally {
      // Release lock after a short delay
      setTimeout(() => {
        isChangingLanguage.current = false;
      }, 300);
    }
  }, [setLanguage, throttleRefresh]);
  
  return {
    t,
    language: stableLanguage.current,
    updateCounter,
    refreshCounter,
    instanceId: instanceId.current,
    setLanguage: safeSetLanguage
  };
};

export default useSafeTranslation;
