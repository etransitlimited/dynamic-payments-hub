
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

// Translation cache with time-based expiration to improve performance
const directTranslationCache: Record<string, { value: string, timestamp: number }> = {};
const DIRECT_CACHE_TTL = 500; // Cache lifetime: 0.5 seconds (reduced from 2 seconds)

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
    
    // Special handling for sidebar section titles and items
    if (key.startsWith('sidebar.')) {
      // Try multiple paths to find the correct translation
      
      // 1. Try sidebar at root level first (most common structure)
      if ('sidebar' in languageTranslations) {
        try {
          const parts = key.split('.');
          parts.shift(); // Remove 'sidebar'
          
          let result = (languageTranslations as any).sidebar;
          let found = true;
          
          for (const part of parts) {
            if (result && typeof result === 'object' && part in result) {
              result = result[part];
            } else {
              found = false;
              break;
            }
          }
          
          if (found && typeof result === 'string') {
            // Cache successful translation
            directTranslationCache[cacheKey] = {
              value: result,
              timestamp: Date.now()
            };
            return result;
          }
        } catch (e) {
          // Silent fail and continue to next approach
        }
      }
      
      // 2. Try dashboard.sidebar path 
      if ('dashboard' in languageTranslations && 'sidebar' in (languageTranslations as any).dashboard) {
        try {
          const parts = key.split('.');
          parts.shift(); // Remove 'sidebar'
          
          let result = (languageTranslations as any).dashboard.sidebar;
          let found = true;
          
          for (const part of parts) {
            if (result && typeof result === 'object' && part in result) {
              result = result[part];
            } else {
              found = false;
              break;
            }
          }
          
          if (found && typeof result === 'string') {
            // Cache successful translation
            directTranslationCache[cacheKey] = {
              value: result,
              timestamp: Date.now()
            };
            return result;
          }
        } catch (e) {
          // Silent fail and continue to next approach
        }
      }
      
      // 3. Special case for wallet and specific paths
      if (key.includes('wallet')) {
        // Try direct wallet path
        const wallKey = key.replace('sidebar.', '');
        
        // Try wallet.deposit, wallet.depositRecords, etc.
        if ('wallet' in languageTranslations) {
          const walletSection = (languageTranslations as any).wallet;
          
          if (wallKey === 'wallet.deposit' && walletSection && walletSection.deposit && typeof walletSection.deposit === 'object') {
            const depositSection = walletSection.deposit;
            if ('form' in depositSection) {
              directTranslationCache[cacheKey] = {
                value: language === 'en' ? 'Deposit' : (depositSection.form || 'Deposit'),
                timestamp: Date.now()
              };
              return directTranslationCache[cacheKey].value;
            }
          }
          
          if (wallKey === 'wallet.depositRecords' && walletSection && walletSection.depositRecords && typeof walletSection.depositRecords === 'object') {
            const recordsSection = walletSection.depositRecords;
            if ('statistics' in recordsSection) {
              directTranslationCache[cacheKey] = {
                value: language === 'en' ? 'Deposit Records' : (recordsSection.statistics || 'Deposit Records'),
                timestamp: Date.now()
              };
              return directTranslationCache[cacheKey].value;
            }
          }
          
          if (wallKey === 'wallet.fundDetails' && walletSection && walletSection.fundDetails && typeof walletSection.fundDetails === 'object') {
            const fundsSection = walletSection.fundDetails;
            if ('title' in fundsSection) {
              directTranslationCache[cacheKey] = {
                value: fundsSection.title || 'Fund Details',
                timestamp: Date.now()
              };
              return directTranslationCache[cacheKey].value;
            }
          }
        }
      }
      
      // 4. Try navigationTranslations from sidebarConfig (if module exists)
      try {
        const { navigationTranslations } = require('@/components/dashboard/sidebar/sidebarConfig');
        
        if (key === 'sidebar.wallet.title' && navigationTranslations.wallet?.title) {
          const value = navigationTranslations.wallet.title[language] || 'Wallet';
          directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
          return value;
        }
        
        if (key === 'sidebar.wallet.deposit' && navigationTranslations.wallet?.deposit) {
          const value = navigationTranslations.wallet.deposit[language] || 'Deposit';
          directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
          return value;
        }
        
        if (key === 'sidebar.wallet.depositRecords' && navigationTranslations.wallet?.depositRecords) {
          const value = navigationTranslations.wallet.depositRecords[language] || 'Deposit Records';
          directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
          return value;
        }
        
        if (key === 'sidebar.wallet.fundDetails' && navigationTranslations.wallet?.fundDetails) {
          const value = navigationTranslations.wallet.fundDetails[language] || 'Fund Details';
          directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
          return value;
        }
        
        // Similar checks for other sidebar sections...
      } catch (e) {
        // Module might not exist, continue with normal flow
      }
    }
    
    // Standard path-based translation lookup for non-sidebar keys
    try {
      const parts = key.split('.');
      let result: any = languageTranslations;
      
      for (const part of parts) {
        if (result && typeof result === 'object' && part in result) {
          result = result[part];
        } else {
          // Not found in current language, try English
          if (language !== 'en') {
            return getDirectTranslation(key, 'en', fallback);
          }
          
          return fallback || key;
        }
      }
      
      if (typeof result === 'string') {
        // Cache successful translation
        directTranslationCache[cacheKey] = {
          value: result,
          timestamp: Date.now()
        };
        return result;
      }
      
      // If we got an object instead of a string
      return fallback || key;
    } catch (e) {
      console.warn(`Error retrieving translation for key "${key}":`, e);
      
      // Try English as fallback for non-English languages
      if (language !== 'en') {
        return getDirectTranslation(key, 'en', fallback);
      }
      
      return fallback || key;
    }
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return fallback || key;
  }
};

/**
 * Format a translated string by replacing placeholders with values
 * 
 * @param text Translated text with {placeholder} format
 * @param values Object with values to replace placeholders
 * @returns Formatted string
 */
export const formatDirectTranslation = (
  text: string, 
  values?: Record<string, string | number>
): string => {
  if (!text || !values) return text;
  
  try {
    return text.replace(/{(\w+)}/g, (match, key) => {
      return values[key] !== undefined ? String(values[key]) : match;
    });
  } catch (error) {
    console.error('Error formatting translation:', error);
    return text;
  }
};

/**
 * Dispatch language change events to notify components
 * 
 * @param language New language code
 */
export const dispatchLanguageChangeEvent = (language: LanguageCode): void => {
  const timestamp = Date.now();
  
  try {
    if (typeof window !== 'undefined') {
      // Clear all translation caches
      for (const key in directTranslationCache) {
        if (key.startsWith(`${language}:`)) {
          delete directTranslationCache[key];
        }
      }
      
      // App-specific event
      window.dispatchEvent(new CustomEvent('app:languageChange', {
        detail: { language, timestamp }
      }));
      
      // DOM event
      document.dispatchEvent(new CustomEvent('languageChanged', {
        detail: { language, timestamp }
      }));
      
      console.log(`Language change events dispatched for ${language}`);
    }
  } catch (error) {
    console.error('Error dispatching language events:', error);
  }
};
