
import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
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
  lastUpdate: Date.now()
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
  // Use useState with an initializer function to set up the initial language
  const [language, setLanguageState] = useState<LanguageCode>(() => {
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
  });
  
  // Critical refs to manage state without causing re-renders
  const lastUpdateRef = useRef<number>(Date.now());
  const [translationsObj, setTranslationsObj] = useState(() => translations[language] || translations[defaultLanguage]);
  const isChangingRef = useRef(false);
  const initialRenderRef = useRef(true);
  const mountedRef = useRef(true);
  
  // Track component mount state to prevent memory leaks
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      console.log('LanguageProvider unmounted');
    };
  }, []);
  
  // Function to set language and update translations
  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    if (newLanguage === language || isChangingRef.current || !mountedRef.current) return;
    
    try {
      console.log(`Setting language from ${language} to ${newLanguage}`);
      isChangingRef.current = true;
      
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
      
      // Use custom events for language changes instead of navigation
      if (window && document) {
        try {
          window.dispatchEvent(new CustomEvent('app:languageChange', { 
            detail: { language: newLanguage, timestamp } 
          }));
          
          document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: newLanguage, timestamp }
          }));
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
        }
      }, 200);
    } catch (error) {
      console.error('Error setting language:', error);
      isChangingRef.current = false;
    }
  }, [language]);
  
  // Set HTML lang attribute on initial render
  useEffect(() => {
    if (initialRenderRef.current && document && document.documentElement) {
      document.documentElement.setAttribute('lang', language);
      initialRenderRef.current = false;
    }
  }, [language]);
  
  // Translation function with enhanced error handling and memoization
  const t = useCallback((key: string): string => {
    if (!key) return key;
    
    try {
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
              return fallbackResult;
            }
          }
          
          return key; // Return the key itself as fallback
        }
      }
      
      return typeof result === 'string' ? result : key;
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
  
  // Add a logging effect for debugging
  useEffect(() => {
    if (!mountedRef.current) return;
    
    console.log(`LanguageProvider mounted with language: ${language}`);
    
    // Check if translations are available for this language
    if (!translations[language]) {
      console.warn(`No translations found for language: ${language}, falling back to ${defaultLanguage}`);
    }
    
    // Set up global listener for language change events from other tabs
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
    
    // Listen for storage events (for multi-tab support)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [language]);
  
  // Create a stable context value object to prevent unnecessary renders
  const contextValue = React.useMemo(() => ({
    language, 
    setLanguage, 
    translations: translationsObj, 
    t, 
    lastUpdate: lastUpdateRef.current
  }), [language, setLanguage, translationsObj, t, lastUpdateRef.current]);
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
