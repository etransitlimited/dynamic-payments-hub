
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';

interface TranslationContextProps {
  translate: (key: string, fallback?: string, values?: Record<string, string | number>) => string;
  currentLanguage: LanguageCode;
  refreshTranslations: () => void;
}

const TranslationContext = createContext<TranslationContextProps>({
  translate: (key: string, fallback?: string) => fallback || key,
  currentLanguage: 'en' as LanguageCode,
  refreshTranslations: () => {}
});

export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { language, t, lastUpdate } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Update current language when language context changes
  useEffect(() => {
    console.log(`TranslationProvider: Language changed from ${currentLanguage} to ${language}`);
    setCurrentLanguage(language as LanguageCode);
    
    // Set HTML lang attribute for accessibility
    document.documentElement.setAttribute('lang', language);
    
    // Force a refresh when language changes
    setForceUpdate(prev => prev + 1);
    
    // Add multiple refresh attempts with increasing delays for better reliability
    const timers = [
      setTimeout(() => setForceUpdate(prev => prev + 1), 100),
      setTimeout(() => setForceUpdate(prev => prev + 1), 300),
      setTimeout(() => setForceUpdate(prev => prev + 1), 600)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [language, lastUpdate]);

  const refreshTranslations = () => {
    console.log("Manual translation refresh triggered");
    setForceUpdate(prev => prev + 1);
  };

  // Enhanced translation function with fallbacks and variable replacement
  const translate = useMemo(() => {
    return (key: string, fallback?: string, values?: Record<string, string | number>): string => {
      try {
        if (!key) return fallback || '';
        
        // Try using the context's translation function first
        const contextResult = t(key);
        
        // Debug logging for translation lookups
        console.log(`Translation lookup - Key: "${key}", Result: "${contextResult}", Language: ${currentLanguage}`);
        
        if (contextResult && contextResult !== key) {
          // If context translation successful, apply any value replacements
          return values ? formatDirectTranslation(contextResult, values) : contextResult;
        }
        
        // If context translation failed, use direct translation with fallback
        const directResult = getDirectTranslation(key, currentLanguage, fallback);
        return values ? formatDirectTranslation(directResult, values) : directResult;
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error);
        return fallback || key;
      }
    };
  }, [currentLanguage, t, forceUpdate]);

  const contextValue = useMemo(() => ({
    translate,
    currentLanguage,
    refreshTranslations
  }), [translate, currentLanguage]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
