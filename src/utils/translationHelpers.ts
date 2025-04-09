
import translations from '@/translations';
import { LanguageCode } from './languageUtils';

// Translation cache with time-based expiration to improve performance
const directTranslationCache: Record<string, { value: string, timestamp: number }> = {};
const DIRECT_CACHE_TTL = 5000; // Cache lifetime: 5 seconds (reduced from 10 seconds)

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
    if (directTranslationCache[cacheKey] && 
        (Date.now() - directTranslationCache[cacheKey].timestamp < DIRECT_CACHE_TTL)) {
      return directTranslationCache[cacheKey].value;
    }
    
    // If useCache is true but cache miss, wait for next render
    if (useCache) {
      return fallback || key;
    }
    
    // Get translations for current language or fallback to English
    const languageTranslations = translations[language] || translations.en;
    
    if (!languageTranslations) {
      return fallback || key;
    }
    
    // Special handling for sidebar section titles and items
    if (key.startsWith('sidebar.')) {
      // Try to look up directly at the root level first (most translations have sidebar at root)
      const sidebarParts = key.split('.');
      // Remove 'sidebar' prefix
      sidebarParts.shift();
      
      let result = null;
      let found = false;
      
      // First check if sidebar exists directly at the root level
      if (languageTranslations.sidebar && typeof languageTranslations.sidebar === 'object') {
        result = languageTranslations.sidebar;
        found = true;
        
        // Navigate through nested objects
        for (const part of sidebarParts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part];
          } else {
            found = false;
            break;
          }
        }
        
        if (found && typeof result === 'string') {
          // Cache sidebar translation
          directTranslationCache[cacheKey] = {
            value: result,
            timestamp: Date.now()
          };
          return result;
        }
      }
      
      // If not found at root, try in dashboard (some translations have sidebar under dashboard)
      if (!found && languageTranslations.dashboard && 
          typeof languageTranslations.dashboard === 'object' && 
          languageTranslations.dashboard.sidebar) {
        
        result = languageTranslations.dashboard.sidebar;
        found = true;
        
        // Navigate through nested objects
        for (const part of sidebarParts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part];
          } else {
            found = false;
            break;
          }
        }
        
        if (found && typeof result === 'string') {
          // Cache sidebar translation
          directTranslationCache[cacheKey] = {
            value: result,
            timestamp: Date.now()
          };
          return result;
        }
      }
    }
    
    // Split the key on '.' to access nested properties
    const keys = key.split('.');
    let result: any = languageTranslations;
    
    // Navigate through nested objects
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // If key not found in current language, try English as fallback
        if (language !== 'en') {
          let fallbackResult = translations.en;
          let keyFound = true;
          
          for (const fallbackKey of keys) {
            if (fallbackResult && typeof fallbackResult === 'object' && fallbackKey in fallbackResult) {
              fallbackResult = fallbackResult[fallbackKey];
            } else {
              keyFound = false;
              break;
            }
          }
          
          if (keyFound && typeof fallbackResult === 'string') {
            // Cache fallback translation
            directTranslationCache[cacheKey] = {
              value: fallbackResult,
              timestamp: Date.now()
            };
            return fallbackResult;
          }
        }
        
        // Return fallback or key if not found
        const finalResult = fallback || key;
        
        // Cache the result
        directTranslationCache[cacheKey] = {
          value: finalResult,
          timestamp: Date.now()
        };
        
        return finalResult;
      }
    }
    
    // Process the final result
    const finalResult = typeof result === 'string' ? result : (fallback || key);
    
    // Cache the result with current timestamp
    directTranslationCache[cacheKey] = {
      value: finalResult,
      timestamp: Date.now()
    };
    
    return finalResult;
  } catch (error) {
    console.error(`Error getting direct translation for key "${key}" in language "${language}":`, error);
    return fallback || key;
  }
};

/**
 * Format translation with variables
 * @param text Translation text with placeholders
 * @param values Variables to insert
 * @returns Formatted text with variables replaced
 */
export const formatDirectTranslation = (
  text: string,
  values?: Record<string, string | number>
): string => {
  if (!text || !values) return text;
  
  try {
    return Object.entries(values).reduce((result, [key, value]) => {
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      return result.replace(pattern, String(value));
    }, text);
  } catch (error) {
    console.error('Error formatting direct translation:', error);
    return text;
  }
};

/**
 * Clear the direct translation cache
 * Call this when you need to force fresh translations
 */
export const clearDirectTranslationCache = (): void => {
  Object.keys(directTranslationCache).forEach(key => {
    delete directTranslationCache[key];
  });
  console.log('Translation cache cleared');
};

// Global event dispatching function with improved throttling for reliability
export const dispatchLanguageChangeEvent = (language: LanguageCode): void => {
  try {
    if (typeof window !== 'undefined') {
      const timestamp = Date.now();
      
      // Static variable to track last dispatch time
      if (!window.lastLanguageEventDispatch) {
        window.lastLanguageEventDispatch = 0;
      }
      
      // Throttle events to prevent flooding
      const minTimeBetweenEvents = 200; // ms (decreased from 300)
      if (timestamp - window.lastLanguageEventDispatch < minTimeBetweenEvents) {
        console.log(`Throttling language change event for ${language}, too soon after last event`);
        return;
      }
      
      // Clear cache before dispatching events
      clearDirectTranslationCache();
      
      // Ensure both events have identical payloads
      const eventPayload = { 
        language, 
        timestamp,
        source: 'language-system' 
      };
      
      // Console log for debugging
      console.log(`Language change events dispatched for: ${language} at ${new Date(timestamp).toISOString()}`);
      
      // First dispatch window event
      const windowEvent = new CustomEvent('app:languageChange', {
        detail: eventPayload,
        bubbles: true
      });
      window.dispatchEvent(windowEvent);
      
      // Then dispatch document event to ensure capturing by all handlers
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const documentEvent = new CustomEvent('languageChanged', {
            detail: eventPayload,
            bubbles: true
          });
          document.dispatchEvent(documentEvent);
        }
      }, 0);
      
      // Update last dispatch time
      window.lastLanguageEventDispatch = timestamp;
    }
  } catch (error) {
    console.error('Error dispatching language change events:', error);
  }
};

// Listen for language changes and clear the cache
if (typeof window !== 'undefined') {
  // Initialize event listeners if not already set up
  let eventListenersInitialized = false;
  
  if (!eventListenersInitialized) {
    const clearCacheHandler = () => clearDirectTranslationCache();
    
    window.addEventListener('app:languageChange', clearCacheHandler);
    document.addEventListener('languageChanged', clearCacheHandler);
    
    // Mark as initialized
    eventListenersInitialized = true;
    
    // Store original listeners to avoid duplicates
    if (!window.clearCacheHandlers) {
      window.clearCacheHandlers = {
        window: clearCacheHandler,
        document: clearCacheHandler
      };
    }
  }
}

// Export a function to check if an element is in the viewport
// This can help with optimization for translation updates
export const isElementInViewport = (el: Element): boolean => {
  try {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  } catch (error) {
    console.error('Error checking if element is in viewport:', error);
    return false;
  }
};

// Type extension for window to store cache handlers and last event time
declare global {
  interface Window {
    clearCacheHandlers?: {
      window: EventListener;
      document: EventListener;
    };
    lastLanguageEventDispatch?: number;
  }
}
