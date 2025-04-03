
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation, formatTranslation } from "@/utils/translationUtils";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook that provides translations with fallback mechanisms
 * Use this when component might render outside of LanguageProvider context
 */
export const useSafeTranslation = () => {
  // Add internal state to trigger re-renders
  const [refreshCounter, setRefreshCounter] = useState(0);
  const location = useLocation();
  const previousLocation = useRef(location.pathname);
  
  // Detect route changes to force language refresh
  useEffect(() => {
    if (location.pathname !== previousLocation.current) {
      console.log(`useSafeTranslation detected route change: ${previousLocation.current} -> ${location.pathname}`);
      previousLocation.current = location.pathname;
      // Increment refresh counter to trigger component updates
      setRefreshCounter(prev => prev + 1);
    }
  }, [location.pathname]);
  
  // Try to get language context
  try {
    const languageContext = useLanguage();
    
    // Add listener to ensure components using this hook re-render when language changes
    useEffect(() => {
      const currentLanguage = languageContext.language;
      
      // Add a log for debugging
      console.log(`useSafeTranslation detected language context: ${languageContext.language}`);
      
      // Force refresh counter when language changes
      if (currentLanguage !== languageContext.language) {
        setRefreshCounter(c => c + 1);
      }
      
      return () => {
        // If language changed by unmount time, force refresh counter
        if (currentLanguage !== languageContext.language) {
          setRefreshCounter(c => c + 1);
        }
      };
    }, [languageContext.language]);
    
    // Create an enhanced translation function
    const enhancedT = useCallback((key: string, fallback?: string, values?: Record<string, string | number>) => {
      if (!key) return fallback || '';
      
      try {
        // First try normal translation mechanism
        let translation = getTranslation(key, languageContext.language);
        
        // If we got back the key itself (translation not found), try direct translations
        if (translation === key) {
          const directTranslation = getDirectTranslation(key, languageContext.language);
          if (directTranslation) {
            translation = directTranslation;
          }
        }
        
        // If we still have key as translation after all attempts, and fallback provided
        if (translation === key && fallback !== undefined) {
          translation = fallback;
        }
        
        // Format translation with values if needed
        if (values && Object.keys(values).length > 0) {
          return formatTranslation(translation, values);
        }
        
        return translation;
      } catch (error) {
        console.warn(`Translation error for key "${key}"`, error);
        return fallback || key;
      }
    }, [languageContext.language]);
    
    // If we have valid context, return its translation function
    if (languageContext && typeof languageContext.t === 'function') {
      return {
        t: enhancedT,
        language: languageContext.language,
        setLanguage: languageContext.setLanguage,
        refreshCounter // Include refresh counter so components can depend on it to re-render
      };
    }
  } catch (error) {
    console.warn("LanguageContext not available, using fallback mechanism", error);
  }
  
  // If context missing, fall back to direct translation function
  return {
    t: (key: string, fallback?: string, values?: Record<string, string | number>) => {
      return fallback || key;
    },
    language: 'en' as LanguageCode,
    setLanguage: () => console.warn("Language context not available"),
    refreshCounter
  };
};
