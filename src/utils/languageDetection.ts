
import { LanguageCode } from './languageUtils';

/**
 * Utility function to detect preferred language from browser settings
 * @returns detected language code or null
 */
export const detectLanguage = (): LanguageCode | null => {
  try {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined' || !navigator) {
      return null;
    }

    // Get browser language
    const browserLang = navigator.language || (navigator as any).userLanguage;
    if (!browserLang) return null;
    
    // Check if it matches our supported languages
    if (browserLang.startsWith('zh')) {
      // Special handling for Chinese variants
      if (browserLang.includes('CN') || browserLang.includes('Hans')) {
        return 'zh-CN';
      } else if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('Hant')) {
        return 'zh-TW';
      }
      // Default to Simplified Chinese if no specific variant is detected
      return 'zh-CN';
    } else if (browserLang.startsWith('fr')) {
      return 'fr';
    } else if (browserLang.startsWith('es')) {
      return 'es';
    } else if (browserLang.startsWith('en')) {
      return 'en';
    }
    
    // Default to English if no match
    return 'en';
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en';
  }
};

/**
 * Utility to detect region from browser or IP
 * @returns detected region code
 */
export const detectRegion = (): string => {
  try {
    // Try to get country from navigator.language
    const lang = navigator.language || (navigator as any).userLanguage;
    
    // Extract country code if in format 'en-US', 'fr-FR', etc.
    if (lang && lang.includes('-')) {
      const parts = lang.split('-');
      if (parts.length > 1) {
        const countryCode = parts[1].toUpperCase();
        return countryCode;
      }
    }
    
    // Fallback to US
    return 'US';
  } catch (error) {
    console.error('Error detecting region:', error);
    return 'US';
  }
};
