
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

// Translation cache with timeout
const translationCache: Record<string, { value: string, timestamp: number }> = {};
const CACHE_TTL = 30000; // 30 seconds cache lifetime

/**
 * Get translation bypassing contexts for most reliable results
 * @param key Translation key (can use dot notation)
 * @param language Target language code
 * @param fallback Fallback text if translation not found
 * @returns Translated text or fallback/key
 */
export const getDirectTranslation = (key: string, language: LanguageCode = 'en', fallback?: string): string => {
  if (!key) return fallback || '';

  try {
    // Create cache key
    const cacheKey = `${language}:${key}`;
    
    // Check cache first (if not expired)
    if (translationCache[cacheKey] && 
        (Date.now() - translationCache[cacheKey].timestamp < CACHE_TTL)) {
      return translationCache[cacheKey].value;
    }
    
    // Get translations for requested language
    let translationObj = translations[language];
    
    if (!translationObj) {
      if (language !== 'en') {
        // Fallback to English
        return getDirectTranslation(key, 'en', fallback);
      }
      return fallback || key;
    }
    
    // Handle nested keys like "auth.login.title"
    const keyParts = key.split('.');
    let result: any = translationObj;
    let keyFound = true;
    
    // Navigate through the nested structure
    for (const part of keyParts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part];
      } else {
        keyFound = false;
        break;
      }
    }
    
    // If the full key path was found and result is a string
    if (keyFound && typeof result === 'string') {
      // Save in cache
      translationCache[cacheKey] = {
        value: result, 
        timestamp: Date.now()
      };
      return result;
    }
    
    // If not found in requested language and not English, try English
    if (language !== 'en') {
      return getDirectTranslation(key, 'en', fallback);
    }
    
    // Return fallback or key if nothing found
    return fallback || key;
  } catch (error) {
    console.error(`Error getting direct translation for key "${key}" in "${language}":`, error);
    return fallback || key;
  }
};

/**
 * Format translated string with variables
 * @param text Text with {placeholders}
 * @param values Values to insert
 * @returns Formatted text
 */
export const formatDirectTranslation = (text: string, values?: Record<string, string | number>): string => {
  if (!values || !text) return text;
  
  try {
    let result = text;
    
    // Replace each placeholder with its value
    Object.entries(values).forEach(([key, value]) => {
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(pattern, String(value));
    });
    
    return result;
  } catch (error) {
    console.error("Error formatting translation:", error);
    return text;
  }
};

/**
 * Dispatch language change events to notify all components
 * @param language New language code
 */
export const dispatchLanguageChangeEvent = (language: LanguageCode): void => {
  try {
    console.log(`Dispatching language change events for: ${language}`);
    
    const timestamp = Date.now();
    const detail = { language, timestamp };
    
    // Browser events - one for window, one for document (for wider compatibility)
    window.dispatchEvent(new CustomEvent('app:languageChange', { detail }));
    document.dispatchEvent(new CustomEvent('languageChanged', { detail }));
    
    // Ensure HTML lang attribute is updated
    document.documentElement.lang = language;
    document.documentElement.setAttribute('data-language', language);
    
    // Save to local storage
    try {
      localStorage.setItem('language', language);
    } catch (storageError) {
      console.warn("Could not save language to localStorage:", storageError);
    }
    
    console.log(`Language change events dispatched for: ${language}`);
  } catch (error) {
    console.error("Error dispatching language change events:", error);
  }
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = (): void => {
  Object.keys(translationCache).forEach(key => {
    delete translationCache[key];
  });
  console.log("Translation cache cleared");
};
