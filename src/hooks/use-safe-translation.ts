
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation, formatTranslation } from "@/utils/translationUtils";
import { LanguageCode } from "@/utils/languageUtils";

/**
 * A hook that provides translations with a fallback mechanism
 * when components might be rendered outside the LanguageProvider context
 */
export const useSafeTranslation = () => {
  // Try to get the language context
  try {
    const languageContext = useLanguage();
    
    // If we have a valid context, return its translation function
    if (languageContext && typeof languageContext.t === 'function') {
      return {
        t: (key: string, fallback?: string, values?: Record<string, string | number>) => {
          if (!key) return fallback || '';
          
          try {
            // First try to get direct translation
            let translation = getTranslation(key, languageContext.language);
            
            // If after all attempts we still have the key as translation and a fallback is provided
            if (translation === key && fallback !== undefined) {
              return values ? formatTranslation(fallback, values) : fallback;
            }
            
            // Format translation with values if needed
            if (values && Object.keys(values).length > 0) {
              if (process.env.NODE_ENV !== 'production') {
                console.log(`Formatting translation for "${key}" with values:`, values);
                console.log("Before formatting:", translation);
              }
              
              const formatted = formatTranslation(translation, values);
              
              if (process.env.NODE_ENV !== 'production') {
                console.log("After formatting:", formatted);
              }
              
              return formatted;
            }
            
            return translation;
          } catch (error) {
            console.warn(`Translation error for key "${key}"`, error);
            return fallback !== undefined ? (values ? formatTranslation(fallback, values) : fallback) : key;
          }
        },
        language: languageContext.language,
        setLanguage: languageContext.setLanguage
      };
    }
  } catch (error) {
    console.warn("LanguageContext not available, using fallback mechanism", error);
  }
  
  // Fallback to a direct translation function if context is missing
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
        
        // Try to get a direct translation
        const translation = getTranslation(key, detectedLang);
        
        // Format translation with variables if needed
        if (values && Object.keys(values).length > 0) {
          const formatted = formatTranslation(translation, values);
          return formatted;
        }
        
        // Return fallback if translation is the same as key and fallback is provided
        if (translation === key && fallback !== undefined) {
          return values ? formatTranslation(fallback, values) : fallback;
        }
        
        return translation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback !== undefined ? (values ? formatTranslation(fallback, values) : fallback) : key;
      }
    },
    language: localStorage.getItem('language') as LanguageCode || 'en',
    setLanguage: (newLang: LanguageCode) => {
      localStorage.setItem('language', newLang);
      window.location.reload();
    }
  };
};
