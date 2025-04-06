
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { getDirectTranslation, formatDirectTranslation } from '@/utils/translationHelpers';

interface TranslationContextProps {
  translate: (key: string, fallback?: string, values?: Record<string, string | number>) => string;
  currentLanguage: LanguageCode;
}

const TranslationContext = createContext<TranslationContextProps>({
  translate: (key: string) => key,
  currentLanguage: 'en' as LanguageCode
});

export const useTranslation = () => useContext(TranslationContext);

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const { language, t } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);

  // Update current language when language context changes
  useEffect(() => {
    setCurrentLanguage(language as LanguageCode);
  }, [language]);

  // Enhanced translation function with fallbacks and variable replacement
  const translate = (key: string, fallback?: string, values?: Record<string, string | number>): string => {
    try {
      // Try using the context's translation function first
      const contextResult = t(key);
      if (contextResult !== key) {
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

  return (
    <TranslationContext.Provider value={{ translate, currentLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
