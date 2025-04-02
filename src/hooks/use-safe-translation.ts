
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/utils/translationUtils";
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
        t: languageContext.t,
        language: languageContext.language,
        setLanguage: languageContext.setLanguage
      };
    }
  } catch (error) {
    console.warn("LanguageContext not available, using fallback mechanism");
  }
  
  // Fallback to a direct translation function if context is missing
  return {
    t: (key: string, fallback?: string) => {
      const translation = getTranslation(key, 'en');
      return translation === key && fallback ? fallback : translation;
    },
    language: 'en' as LanguageCode,
    setLanguage: (_: LanguageCode) => console.warn("Language setter not available in fallback mode")
  };
};
