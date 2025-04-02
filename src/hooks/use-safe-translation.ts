
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
            // First try to get direct translation from the language context
            let translation = languageContext.t(key);
            
            // If the translation is the same as the key, it might not be translated
            if (translation === key) {
              // Try to get a direct translation from the translation utils
              translation = getTranslation(key, languageContext.language);
            }
            
            // If after all attempts we still have the key as translation and a fallback is provided
            if (translation === key && fallback !== undefined) {
              return values ? formatTranslation(fallback, values) : fallback;
            }
            
            // Format translation with variables if needed
            return values ? formatTranslation(translation, values) : translation;
          } catch (error) {
            console.warn(`Translation error for key "${key}"`, error);
            return fallback !== undefined ? fallback : key;
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
        // Try to get a direct translation
        const translation = getTranslation(key, 'en');
        
        // Format translation with variables if needed
        const formattedTranslation = values ? formatTranslation(translation, values) : translation;
        
        // Return fallback if translation is the same as key and fallback is provided
        return translation === key && fallback !== undefined ? 
          (values ? formatTranslation(fallback, values) : fallback) : 
          formattedTranslation;
      } catch (error) {
        console.warn(`Fallback translation error for key "${key}"`, error);
        return fallback !== undefined ? fallback : key;
      }
    },
    language: 'en' as LanguageCode,
    setLanguage: (_: LanguageCode) => console.warn("Language setter not available in fallback mode")
  };
};
