
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation, formatTranslation } from "@/utils/translationUtils";
import { LanguageCode } from "@/utils/languageUtils";
import { useEffect, useState } from "react";

/**
 * Hook that provides translations with fallback mechanisms
 * Use this when component might render outside of LanguageProvider context
 */
export const useSafeTranslation = () => {
  // Add internal state to trigger re-renders
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // Try to get language context
  try {
    const languageContext = useLanguage();
    
    // Add listener to ensure components using this hook re-render when language changes
    useEffect(() => {
      const currentLanguage = languageContext.language;
      return () => {
        // If language changed by unmount time, force refresh counter
        if (currentLanguage !== languageContext.language) {
          setRefreshCounter(c => c + 1);
        }
      };
    }, [languageContext.language]);
    
    // If we have valid context, return its translation function
    if (languageContext && typeof languageContext.t === 'function') {
      return {
        t: (key: string, fallback?: string, values?: Record<string, string | number>) => {
          if (!key) return fallback || '';
          
          try {
            // Get translation
            let translation = getTranslation(key, languageContext.language);
            
            // If we still have key as translation after all attempts, and fallback provided
            if (translation === key && fallback !== undefined) {
              translation = fallback;
            }
            
            // Format translation with values if needed
            if (values && Object.keys(values).length > 0) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Formatting translation for "${key}" with values:`, values);
                console.log("Before formatting:", translation);
              }
              
              // Ensure formatting is properly applied
              const formatted = formatTranslation(translation, values);
              
              if (process.env.NODE_ENV !== 'production') {
                console.log("After formatting:", formatted);
              }
              
              return formatted;
            }
            
            return translation;
          } catch (error) {
            console.warn(`Translation error for key "${key}"`, error);
            return fallback || key;
          }
        },
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
      if (!key) return fallback || '';
      
      try {
        // Get browser language or default to English
        const browserLang = navigator.language;
        let detectedLang: LanguageCode = 'en';
        
        if (browserLang.startsWith('zh')) {
          detectedLang = browserLang.includes('TW') ? 'zh-TW' : 'zh-CN';
        } else if (browserLang.startsWith('fr')) {
          detectedLang = 'fr';
        } else if (browserLang.startsWith('es')) {
          detectedLang = 'es';
        }
        
        // Try to get translation
        let translation = getTranslation(key, detectedLang);
        
        // If translation is same as key and fallback provided, return fallback
        if (translation === key && fallback !== undefined) {
          translation = fallback;
        }
        
        // Format translation with variables if needed
        if (values && Object.keys(values).length > 0) {
          return formatTranslation(translation, values);
        }
        
        return translation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback || key;
      }
    },
    language: localStorage.getItem('language') as LanguageCode || 'en',
    setLanguage: (newLang: LanguageCode) => {
      localStorage.setItem('language', newLang);
      window.location.reload();
    },
    refreshCounter // Include refresh counter so components can depend on it to re-render
  };
};
