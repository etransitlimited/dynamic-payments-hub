
import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import translations from '@/translations';
import { LanguageCode } from '@/utils/languageUtils';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';

// Create context type for translations
interface TranslationContextType {
  currentLanguage: LanguageCode;
  translate: (key: string, fallback?: string, values?: Record<string, string | number>) => string;
  format: (text: string, values?: Record<string, string | number>) => string;
  refreshTranslations: () => void;
  isChangingLanguage: boolean;
  setIsChangingLanguage: (value: boolean) => void;
}

// Create context with default values
const TranslationContext = createContext<TranslationContextType>({
  currentLanguage: 'en',
  translate: (key, fallback) => fallback || key,
  format: (text) => text,
  refreshTranslations: () => {},
  isChangingLanguage: false,
  setIsChangingLanguage: () => {}
});

interface TranslationProviderProps {
  children: React.ReactNode;
  initialLanguage?: LanguageCode;
}

// Create provider component
export const TranslationProvider: React.FC<TranslationProviderProps> = ({ 
  children,
  initialLanguage = 'en' 
}) => {
  // Track current language with state and ref
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(initialLanguage);
  const languageRef = useRef<LanguageCode>(initialLanguage);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const changingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Get initial language from document if available
  useEffect(() => {
    try {
      const storedLanguage = localStorage.getItem('language') as LanguageCode | null;
      const htmlLang = document.documentElement.lang;
      
      if (storedLanguage && Object.keys(translations).includes(storedLanguage)) {
        setCurrentLanguage(storedLanguage);
        languageRef.current = storedLanguage;
      } else if (htmlLang && Object.keys(translations).includes(htmlLang)) {
        setCurrentLanguage(htmlLang as LanguageCode);
        languageRef.current = htmlLang as LanguageCode;
      }
    } catch (error) {
      console.error("Error getting initial language:", error);
    }
  }, []);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLanguage = customEvent.detail?.language;
      
      if (newLanguage && Object.keys(translations).includes(newLanguage)) {
        setCurrentLanguage(newLanguage as LanguageCode);
        languageRef.current = newLanguage as LanguageCode;
        // Trigger refresh
        setRefreshTrigger(prev => prev + 1);
        // Set changing state to coordinate with routing
        setIsChangingLanguage(true);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // Translation function
  const translate = useCallback((key: string, fallback?: string, values?: Record<string, string | number>): string => {
    if (!key) return fallback || '';
    
    try {
      // Get translation
      const translatedText = getDirectTranslation(key, languageRef.current, fallback);
      
      // Apply values if needed
      if (values && translatedText !== key) {
        return formatDirectTranslation(translatedText, values);
      }
      
      return translatedText;
    } catch (error) {
      console.error(`Translation error for key "${key}":`, error);
      return fallback || key;
    }
  }, [refreshTrigger]); // Depend on refresh to update when language changes
  
  // Format function for translations with variables
  const format = useCallback((text: string, values?: Record<string, string | number>): string => {
    if (!text || !values) return text;
    
    try {
      return formatDirectTranslation(text, values);
    } catch (error) {
      console.error('Format error:', error);
      return text;
    }
  }, []);
  
  // Function to force refresh translations
  const refreshTranslations = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);
  
  // Set language change state for routing coordination
  useEffect(() => {
    if (isChangingLanguage) {
      // Clear any existing timeout
      if (changingTimeoutRef.current) {
        clearTimeout(changingTimeoutRef.current);
      }
      
      // Auto-reset after a delay
      changingTimeoutRef.current = setTimeout(() => {
        setIsChangingLanguage(false);
        console.log("Language change completed");
      }, 800);
      
      return () => {
        if (changingTimeoutRef.current) {
          clearTimeout(changingTimeoutRef.current);
        }
      };
    }
  }, [isChangingLanguage]);
  
  // Track language changes to coordinate with routing
  useEffect(() => {
    setIsChangingLanguage(true);
    console.log(`Language changing to: ${currentLanguage}`);
    
    // Store the current path for potential restoration
    const currentPath = window.location.pathname;
    if (currentPath && currentPath !== '/') {
      localStorage.setItem('lastPath', currentPath);
    }
  }, [currentLanguage]);
  
  // Context value
  const contextValue: TranslationContextType = {
    currentLanguage,
    translate,
    format,
    refreshTranslations,
    isChangingLanguage,
    setIsChangingLanguage
  };
  
  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation context
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default TranslationProvider;
