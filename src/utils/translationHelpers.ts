
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

// Function to dispatch language change events for components that need to be notified
export function dispatchLanguageChangeEvent(language: LanguageCode) {
  try {
    if (typeof window !== 'undefined') {
      const timestamp = Date.now();
      
      // Add a flag to check if language change is in progress to coordinate with routing
      window.sessionStorage.setItem('languageChanging', 'true');
      window.sessionStorage.setItem('languageChangeTimestamp', timestamp.toString());
      
      const event1 = new CustomEvent('app:languageChange', { 
        detail: { language, timestamp } 
      });
      window.dispatchEvent(event1);
      
      const event2 = new CustomEvent('languageChanged', {
        detail: { language, timestamp }
      });
      document.dispatchEvent(event2);
      
      // Update HTML lang attribute for accessibility
      if (document && document.documentElement) {
        document.documentElement.setAttribute('lang', language);
      }
      
      console.log(`Language change events dispatched for: ${language} at ${timestamp}`);
      
      // Clear the changing flag after a safe delay
      setTimeout(() => {
        window.sessionStorage.removeItem('languageChanging');
        console.log(`Language change completed for: ${language}`);
      }, 800);
    }
  } catch (error) {
    console.error('Error dispatching language events:', error);
    // Cleanup in case of error
    window.sessionStorage.removeItem('languageChanging');
  }
}

/**
 * Format a translated string by replacing placeholders with values
 * 
 * @param text Translated text with {placeholder} format
 * @param values Object with values to replace placeholders
 * @returns Formatted string
 */
export function formatDirectTranslation(text: string, values: Record<string, string | number>): string {
  if (!text) return '';
  if (!values || typeof values !== 'object') return text;
  
  let formattedText = text;
  
  try {
    Object.entries(values).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      formattedText = formattedText.replace(new RegExp(placeholder, 'g'), String(value));
    });
    
    return formattedText;
  } catch (error) {
    console.error('Error formatting translation:', error);
    return text;
  }
}

// Helper function to safely access nested objects without type errors
const safelyGetNested = (obj: any, path: string[]): any => {
  let current = obj;
  
  for (const key of path) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return undefined;
    }
    current = current[key];
  }
  
  return current;
};

/**
 * Get translation directly without using context for more stable rendering performance
 * This function bypasses the context to get translations directly from the source
 * 
 * @param key Translation key in dot notation
 * @param language Current language code
 * @param fallback Optional fallback text
 * @param useCache Whether to prioritize cache (default: false)
 * @returns Translated string or fallback/key
 */
export const getDirectTranslation = (
  key: string, 
  language: LanguageCode = 'en',
  fallback?: string,
  useCache: boolean = false
): string => {
  if (!key) return fallback || '';
  
  try {
    // Get translations for current language or fallback to English
    const languageTranslations = translations[language] || translations.en;
    
    if (!languageTranslations) {
      return fallback || key;
    }
    
    // Split the key by dots to navigate the nested structure
    const keyParts = key.split('.');
    let result = languageTranslations;
    
    // Try to find the translation by navigating the object
    for (const part of keyParts) {
      if (result === undefined || result === null || typeof result !== 'object') {
        break;
      }
      result = result[part];
    }
    
    // If found and is a string, return it
    if (typeof result === 'string') {
      return result;
    }
    
    // Special handling for analytics data
    if (key.startsWith('analytics.')) {
      // Check if we're looking for a month abbreviation
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthKey = key.split('.')[1];
      
      if (months.includes(monthKey)) {
        // For Chinese languages, use special format
        if (language === 'zh-CN') {
          const monthIndex = months.indexOf(monthKey) + 1;
          return `${monthIndex}月`;
        } else if (language === 'zh-TW') {
          const monthIndex = months.indexOf(monthKey) + 1;
          return `${monthIndex}月`;
        }
        // For other languages try to get month names from translations
        const analytics = safelyGetNested(languageTranslations, ['analytics']);
        if (analytics && typeof analytics === 'object' && analytics[monthKey]) {
          return analytics[monthKey];
        }
      }
      
      // Check for expense categories or transaction types
      const categories = ['tech', 'office', 'marketing', 'travel', 'services', 
                          'deposits', 'withdrawals', 'transfers', 'payments', 'others'];
      const categoryKey = key.split('.')[1];
      
      if (categories.includes(categoryKey)) {
        const analytics = safelyGetNested(languageTranslations, ['analytics']);
        if (analytics && typeof analytics === 'object' && analytics[categoryKey]) {
          return analytics[categoryKey];
        }
      }
    }
    
    // If not found in current language, try English
    if (language !== 'en') {
      const enTranslation = getDirectTranslation(key, 'en', undefined, useCache);
      if (enTranslation !== key) {
        return enTranslation;
      }
    }
    
    // Return fallback or key if no translation found
    return fallback || key;
  } catch (error) {
    console.error(`Error getting translation for "${key}":`, error);
    return fallback || key;
  }
};

/**
 * Check if language change is currently in progress
 * @returns Boolean indicating if language is changing
 */
export const isLanguageChanging = (): boolean => {
  try {
    return window.sessionStorage.getItem('languageChanging') === 'true';
  } catch (error) {
    return false;
  }
};

/**
 * Get timestamp of last language change
 * @returns Timestamp or null if not available
 */
export const getLanguageChangeTimestamp = (): number | null => {
  try {
    const timestamp = window.sessionStorage.getItem('languageChangeTimestamp');
    return timestamp ? parseInt(timestamp, 10) : null;
  } catch (error) {
    return null;
  }
};
