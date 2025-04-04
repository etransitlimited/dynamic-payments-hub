
import { LanguageCode } from './languageUtils';
import { navigationTranslations } from '@/components/dashboard/sidebar/sidebarConfig';
import translations from '@/translations';

/**
 * Get direct translation from various sources when context is not available
 * This is a fallback mechanism to ensure translations work in all situations
 */
export const getDirectTranslation = (
  key: string, 
  language: LanguageCode, 
  fallback?: string
): string => {
  try {
    if (!key) {
      console.warn('Empty translation key provided');
      return fallback || '';
    }
    
    console.log(`[getDirectTranslation] Getting translation for key: ${key}, language: ${language}`);
    
    // First try to get from navigation translations if the key matches
    if (key.startsWith('sidebar.')) {
      const parts = key.split('.');
      if (parts.length === 2) {
        // Simple sidebar.key format
        const navKey = parts[1];
        const navTranslation = navigationTranslations[navKey];
        if (navTranslation && navTranslation[language]) {
          return navTranslation[language];
        }
      } else if (parts.length === 3) {
        // Nested sidebar.section.key format
        const section = parts[1];
        const navKey = parts[2];
        const sectionTranslations = navigationTranslations[section as keyof typeof navigationTranslations];
        if (sectionTranslations && typeof sectionTranslations === 'object') {
          const itemTranslations = (sectionTranslations as any)[navKey];
          if (itemTranslations && itemTranslations[language]) {
            return itemTranslations[language];
          }
        }
      }
    }
    
    // Try to get from global translations object
    const langTranslations = translations[language];
    if (langTranslations) {
      // Handle nested keys with dot notation
      if (key.includes('.')) {
        const parts = key.split('.');
        let current: any = langTranslations;
        
        for (const part of parts) {
          if (!current || typeof current !== 'object') {
            break;
          }
          current = current[part];
        }
        
        if (typeof current === 'string') {
          console.log(`[getDirectTranslation] Found translation for "${key}" in ${language}: "${current}"`);
          return current;
        }
      } else {
        // Direct key lookup
        const translation = (langTranslations as any)[key];
        if (typeof translation === 'string') {
          return translation;
        }
      }
    }
    
    // If language is not English and translation not found, try English
    if (language !== 'en') {
      console.log(`[getDirectTranslation] Translation not found in ${language}, trying English`);
      const enTranslation = getDirectTranslation(key, 'en', fallback);
      if (enTranslation !== key) {
        return enTranslation;
      }
    }
    
    // Return fallback or key as last resort
    const result = fallback || key;
    console.log(`[getDirectTranslation] Using fallback for "${key}": "${result}"`);
    return result;
  } catch (error) {
    console.error(`Error in getDirectTranslation for key "${key}":`, error);
    return fallback || key;
  }
};

/**
 * Format translation with variables
 */
export const formatDirectTranslation = (
  text: string, 
  values?: Record<string, string | number>
): string => {
  if (!values || !text) return text;
  
  let result = text;
  
  try {
    console.log(`[formatDirectTranslation] Formatting: "${text}" with values:`, values);
    
    Object.entries(values).forEach(([key, value]) => {
      const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(pattern, String(value));
    });
    
    console.log(`[formatDirectTranslation] Result: "${result}"`);
    return result;
  } catch (error) {
    console.error("Error formatting translation:", error);
    return text;
  }
};
