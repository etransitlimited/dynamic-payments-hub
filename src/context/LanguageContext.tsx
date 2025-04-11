import React, { createContext, useState, useContext, useCallback, useEffect, useRef, useMemo } from 'react';
import translations from '@/translations';
import { detectLanguage } from '@/utils/languageDetection';
import { LanguageContextType } from './LanguageContextTypes';
import { LanguageCode } from '@/utils/languageUtils';

const defaultLanguage = 'en' as LanguageCode;

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: (key: string) => key,
  translations: translations[defaultLanguage],
  setLanguage: () => {},
  lastUpdate: Date.now(),
  isLoading: false // Add isLoading property with default value
});

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Helper function to initialize language
  const getInitialLanguage = (): LanguageCode => {
    try {
      // Try to get language from localStorage
      const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
      
      if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
        return savedLanguage as LanguageCode;
      }
      
      // If no saved language, try to detect from browser
      const detectedLanguage = detectLanguage();
      if (detectedLanguage && Object.keys(translations).includes(detectedLanguage)) {
        return detectedLanguage as LanguageCode;
      }
      
      // Default to English
      return defaultLanguage;
    } catch (error) {
      console.error('Error initializing language:', error);
      return defaultLanguage;
    }
  };
  
  // Use a ref for initial language to avoid unnecessary re-renders
  const initialLanguageRef = useRef<LanguageCode>(getInitialLanguage());
  
  // Use state with initializer to set the initial language
  const [language, setLanguageState] = useState<LanguageCode>(initialLanguageRef.current);
  
  // Add isLoading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Critical refs to manage state without causing re-renders
  const lastUpdateRef = useRef<number>(Date.now());
  const [translationsObj, setTranslationsObj] = useState(() => translations[language] || translations[defaultLanguage]);
  const isChangingRef = useRef(false);
  const mountedRef = useRef(true);
  const eventDispatchedRef = useRef(false);
  
  // Track component mount state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      console.log('LanguageProvider unmounted');
    };
  }, []);
  
  // Function to set language and update translations with improved stability
  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    if (newLanguage === language || isChangingRef.current || !mountedRef.current) return;
    
    try {
      console.log(`Setting language from ${language} to ${newLanguage}`);
      isChangingRef.current = true;
      eventDispatchedRef.current = false;
      
      // Set loading state to true
      setIsLoading(true);
      
      // Save the new language to localStorage
      localStorage.setItem('language', newLanguage);
      
      // Update translations object
      const newTranslations = translations[newLanguage] || translations[defaultLanguage];
      setTranslationsObj(newTranslations);
      
      // Update language state
      setLanguageState(newLanguage);
      
      // Force update timestamp to trigger re-renders
      const timestamp = Date.now();
      lastUpdateRef.current = timestamp;
      
      // Dispatch events in a more reliable way with try-catch
      if (typeof window !== 'undefined' && !eventDispatchedRef.current) {
        try {
          const event1 = new CustomEvent('app:languageChange', { 
            detail: { language: newLanguage, timestamp } 
          });
          window.dispatchEvent(event1);
          
          const event2 = new CustomEvent('languageChanged', {
            detail: { language: newLanguage, timestamp }
          });
          document.dispatchEvent(event2);
          
          eventDispatchedRef.current = true;
        } catch (error) {
          console.error('Error dispatching language events:', error);
        }
      }
      
      // Update HTML lang attribute for accessibility
      if (document && document.documentElement) {
        document.documentElement.setAttribute('lang', newLanguage);
      }
      
      console.log(`Language changed to ${newLanguage} at ${new Date(timestamp).toISOString()}`);
      
      // Release the lock after a short delay
      setTimeout(() => {
        if (mountedRef.current) {
          isChangingRef.current = false;
          setIsLoading(false); // Set loading state to false after operation is complete
        }
      }, 200);
    } catch (error) {
      console.error('Error setting language:', error);
      isChangingRef.current = false;
      setIsLoading(false); // Set loading state to false in case of error
    }
  }, [language]);
  
  // Set HTML lang attribute on initial render
  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.setAttribute('lang', language);
    }
  }, []);
  
  // Create a translation cache to improve performance
  const translationCacheRef = useRef<Record<string, string>>({});
  
  // Clear cache when language changes
  useEffect(() => {
    translationCacheRef.current = {};
  }, [language]);
  
  // Translation function with caching for better performance
  const t = useCallback((key: string): string => {
    if (!key) return key;
    
    try {
      // Check cache first
      const cacheKey = `${language}:${key}`;
      if (translationCacheRef.current[cacheKey]) {
        return translationCacheRef.current[cacheKey];
      }
      
      // Split the key on '.' to access nested properties
      const keys = key.split('.');
      let result: any = translationsObj;
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          // If key not found, look in default language
          if (language !== defaultLanguage) {
            let fallbackResult = translations[defaultLanguage];
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
              translationCacheRef.current[cacheKey] = fallbackResult;
              return fallbackResult;
            }
          }
          
          return key; // Return the key itself as fallback
        }
      }
      
      const finalResult = typeof result === 'string' ? result : key;
      
      // Cache successful translation
      translationCacheRef.current[cacheKey] = finalResult;
      
      return finalResult;
    } catch (error) {
      console.error(`Error translating key "${key}":`, error);
      return key; // Return the key as fallback
    }
  }, [translationsObj, language]);
  
  // Force a re-fetch of translations when language changes
  useEffect(() => {
    if (translations[language]) {
      setTranslationsObj(translations[language]);
      lastUpdateRef.current = Date.now();
    }
  }, [language]);
  
  // Listen for storage events for multi-tab support
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!mountedRef.current) return;
      
      if (e.key === 'language' && e.newValue && e.newValue !== language) {
        console.log(`Language changed from storage: ${e.newValue}`);
        if (!isChangingRef.current) {
          setLanguageState(e.newValue as LanguageCode);
          lastUpdateRef.current = Date.now();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [language]);
  
  // Create a stable context value object to prevent unnecessary renders
  const contextValue = useMemo(() => ({
    language, 
    setLanguage, 
    translations: translationsObj, 
    t, 
    lastUpdate: lastUpdateRef.current,
    isLoading // Add isLoading to the context value
  }), [language, setLanguage, translationsObj, t, isLoading]); // Include isLoading in the dependency array
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
