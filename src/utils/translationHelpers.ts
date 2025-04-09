
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

// Translation cache with time-based expiration to improve performance
const directTranslationCache: Record<string, { value: string, timestamp: number }> = {};
const DIRECT_CACHE_TTL = 0; // Disabled cache temporarily for debugging

// Function to dispatch language change events for components that need to be notified
export function dispatchLanguageChangeEvent(language: LanguageCode) {
  try {
    if (typeof window !== 'undefined') {
      const event1 = new CustomEvent('app:languageChange', { 
        detail: { language, timestamp: Date.now() } 
      });
      window.dispatchEvent(event1);
      
      const event2 = new CustomEvent('languageChanged', {
        detail: { language, timestamp: Date.now() }
      });
      document.dispatchEvent(event2);
      
      // Update HTML lang attribute for accessibility
      if (document && document.documentElement) {
        document.documentElement.setAttribute('lang', language);
      }
      
      console.log(`Language change events dispatched for: ${language}`);
    }
  } catch (error) {
    console.error('Error dispatching language events:', error);
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
    // Create cache key
    const cacheKey = `${language}:${key}`;
    
    // Check cache first (if not expired)
    if (useCache && directTranslationCache[cacheKey] && 
        (Date.now() - directTranslationCache[cacheKey].timestamp < DIRECT_CACHE_TTL)) {
      return directTranslationCache[cacheKey].value;
    }
    
    // Get translations for current language or fallback to English
    const languageTranslations = translations[language] || translations.en;
    
    if (!languageTranslations) {
      return fallback || key;
    }
    
    // Special handling for sidebar navigation items
    if (key.startsWith('sidebar.')) {
      // Handle wallet-related sidebar translations
      if (key.includes('wallet')) {
        // Try multiple approaches to find the correct translation
        
        // 1. Check if there's a top-level sidebar object in translations
        const topLevelSidebar = safelyGetNested(languageTranslations, ['sidebar']);
        if (topLevelSidebar && typeof topLevelSidebar === 'object') {
          const sidebarWallet = topLevelSidebar.wallet;
          if (sidebarWallet) {
            if (key === 'sidebar.wallet.title' && sidebarWallet.title) {
              const value = sidebarWallet.title;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.deposit' && sidebarWallet.deposit) {
              const value = sidebarWallet.deposit;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.depositRecords' && sidebarWallet.depositRecords) {
              const value = sidebarWallet.depositRecords;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.fundDetails' && sidebarWallet.fundDetails) {
              const value = sidebarWallet.fundDetails;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
        }
        
        // 2. Check if there's a sidebar inside dashboard object
        const dashboardObj = safelyGetNested(languageTranslations, ['dashboard']);
        if (dashboardObj && typeof dashboardObj === 'object') {
          // Use any type to bypass type checking since we're doing runtime checks
          const dashboardSidebar = (dashboardObj as any).sidebar;
          if (dashboardSidebar && dashboardSidebar.wallet) {
            const dashboardWallet = dashboardSidebar.wallet;
            
            if (key === 'sidebar.wallet.title' && dashboardWallet.title) {
              const value = dashboardWallet.title;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.deposit' && dashboardWallet.deposit) {
              const value = dashboardWallet.deposit;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.depositRecords' && dashboardWallet.depositRecords) {
              const value = dashboardWallet.depositRecords;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
            
            if (key === 'sidebar.wallet.fundDetails' && dashboardWallet.fundDetails) {
              const value = dashboardWallet.fundDetails;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
        }
        
        // 3. Try direct wallet section for key fragments
        const walletObj = safelyGetNested(languageTranslations, ['wallet']);
        if (walletObj && typeof walletObj === 'object') {
          // Just extract the last part of the key after the last dot
          const keyParts = key.split('.');
          const lastKeyPart = keyParts[keyParts.length - 1];
          
          if (lastKeyPart && walletObj[lastKeyPart]) {
            const value = walletObj[lastKeyPart];
            directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
            return value;
          }
        }
      }
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
      directTranslationCache[cacheKey] = { value: result, timestamp: Date.now() };
      return result;
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
