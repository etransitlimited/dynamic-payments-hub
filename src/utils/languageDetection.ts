
import { LanguageCode } from '@/utils/languageUtils';

// Improved helper function to get browser language with better detection
export const getBrowserLanguage = (): LanguageCode => {
  // Get the browser's preferred languages array
  const languages = navigator.languages || [navigator.language];
  
  // Loop through the languages array to find the first matching language
  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase();
    
    // Check for Chinese variants first
    if (normalizedLang.startsWith('zh')) {
      // Traditional Chinese: zh-tw, zh-hk, zh-mo
      if (normalizedLang.includes('tw') || normalizedLang.includes('hk') || normalizedLang.includes('mo')) {
        return 'zh-TW';
      }
      // Simplified Chinese: zh-cn, zh-sg, zh-my, zh (default Chinese)
      return 'zh-CN';
    }
    
    // For French variants
    if (normalizedLang.startsWith('fr')) {
      return 'fr';
    }
    
    // For Spanish variants
    if (normalizedLang.startsWith('es')) {
      return 'es';
    }
    
    // For English variants: en, en-us, en-gb, etc.
    if (normalizedLang.startsWith('en')) {
      return 'en';
    }
  }
  
  // Default to English if no match found
  return 'en';
};

// Function to get language from URL query parameter
export const getLanguageFromUrl = (): LanguageCode | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as LanguageCode | null;
  
  if (langParam && ['en', 'zh-CN', 'zh-TW', 'fr', 'es'].includes(langParam)) {
    return langParam;
  }
  
  return null;
};

// Get the initial language from URL parameter, localStorage or browser settings
export const getInitialLanguage = (): LanguageCode => {
  // URL parameter takes highest priority
  const urlLanguage = getLanguageFromUrl();
  if (urlLanguage) {
    return urlLanguage;
  }
  
  // Next check localStorage
  const savedLanguage = localStorage.getItem('language') as LanguageCode;
  if (savedLanguage && ['en', 'zh-CN', 'zh-TW', 'fr', 'es'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Finally use browser language
  return getBrowserLanguage();
};

// Export legacy function name for backward compatibility
export const detectLanguage = getBrowserLanguage;
