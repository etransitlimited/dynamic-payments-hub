
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
          const wallet = walletObj;
          
          if (key === 'sidebar.wallet.title') {
            // Use walletManagement as fallback for title
            if (wallet.walletManagement) {
              const value = wallet.walletManagement;
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
          
          if (key === 'sidebar.wallet.deposit' && wallet.deposit) {
            // Try to use the deposit form title or any deposit key available
            const depositSection = wallet.deposit;
            if (typeof depositSection === 'object') {
              const value = depositSection.form || Object.values(depositSection)[0] || 'Deposit';
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
          
          if (key === 'sidebar.wallet.depositRecords' && wallet.depositRecords) {
            // Try to use deposit records statistics or any key available
            const recordsSection = wallet.depositRecords;
            if (typeof recordsSection === 'object') {
              const value = recordsSection.statistics || Object.values(recordsSection)[0] || 'Deposit Records';
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
          
          if (key === 'sidebar.wallet.fundDetails' && wallet.fundDetails) {
            // Try to use fund details title or any key available
            const fundsSection = wallet.fundDetails;
            if (typeof fundsSection === 'object') {
              const value = fundsSection.title || Object.values(fundsSection)[0] || 'Fund Details';
              directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
              return value;
            }
          }
        }
        
        // 4. Last resort - hardcoded fallbacks by language for wallet section
        const hardcodedFallbacks: Record<string, Record<LanguageCode, string>> = {
          'sidebar.wallet.title': {
            'en': 'Wallet',
            'es': 'Billetera',
            'fr': 'Portefeuille',
            'zh-CN': '钱包',
            'zh-TW': '錢包'
          },
          'sidebar.wallet.deposit': {
            'en': 'Deposit',
            'es': 'Depósito',
            'fr': 'Dépôt',
            'zh-CN': '充值',
            'zh-TW': '充值'
          },
          'sidebar.wallet.depositRecords': {
            'en': 'Deposit Records',
            'es': 'Registros de Depósito',
            'fr': 'Registres de Dépôt',
            'zh-CN': '充值记录',
            'zh-TW': '充值記錄'
          },
          'sidebar.wallet.fundDetails': {
            'en': 'Fund Details',
            'es': 'Detalles de Fondos',
            'fr': 'Détails des Fonds',
            'zh-CN': '资金明细',
            'zh-TW': '資金明細'
          }
        };
        
        if (hardcodedFallbacks[key] && hardcodedFallbacks[key][language]) {
          const value = hardcodedFallbacks[key][language];
          directTranslationCache[cacheKey] = { value, timestamp: Date.now() };
          return value;
        }
      }
      
      // Process non-wallet sidebar items using standard dot notation
      try {
        const parts = key.split('.');
        let result: any = languageTranslations;
        
        for (const part of parts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part];
          } else {
            // Not found in current path, break
            result = null;
            break;
          }
        }
        
        if (result && typeof result === 'string') {
          directTranslationCache[cacheKey] = { value: result, timestamp: Date.now() };
          return result;
        }
      } catch (e) {
        // Silent error, continue with other approaches
      }
    }
    
    // Standard path-based translation lookup for all other keys
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
