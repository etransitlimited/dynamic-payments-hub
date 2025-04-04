
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
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
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      // Try to get language from localStorage
      const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
      
      if (savedLanguage && translations[savedLanguage as LanguageCode]) {
        return savedLanguage as LanguageCode;
      }
      
      // If no saved language, try to detect from browser
      const detectedLanguage = detectLanguage();
      if (detectedLanguage && translations[detectedLanguage]) {
        return detectedLanguage;
      }
      
      // Default to English
      return defaultLanguage;
    } catch (error) {
      console.error('Error initializing language:', error);
      return defaultLanguage;
    }
  });
  
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [translationsObj, setTranslationsObj] = useState(() => translations[language] || translations[defaultLanguage]);
  
  // Function to set language and update translations
  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    if (newLanguage === language) return;
    
    try {
      console.log(`Setting language from ${language} to ${newLanguage}`);
      
      // Save the new language to localStorage
      localStorage.setItem('language', newLanguage);
      
      // Update translations object
      const newTranslations = translations[newLanguage] || translations[defaultLanguage];
      setTranslationsObj(newTranslations);
      
      // Update language state
      setLanguageState(newLanguage);
      
      // Force update timestamp to trigger re-renders
      setLastUpdate(Date.now());
      
      // Log change
      console.log(`Language changed to ${newLanguage} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  }, [language]);
  
  // Translation function
  const t = useCallback((key: string): string => {
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
      setLastUpdate(Date.now());
    }
  }, [language]);
  
  // Add a logging effect for debugging
  useEffect(() => {
    console.log(`LanguageProvider mounted with language: ${language}`);
    
    // Check if translations are available for this language
    if (!translations[language]) {
      console.warn(`No translations found for language: ${language}, falling back to ${defaultLanguage}`);
    }
    
    return () => console.log('LanguageProvider unmounted');
  }, [language]);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsObj, t, lastUpdate }}>
      {children}
    </LanguageContext.Provider>
  );
};
