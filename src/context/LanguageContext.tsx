
import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { getInitialLanguage, getLanguageFromUrl } from "@/utils/languageDetection";
import { getTranslation } from "@/utils/translationUtils";
import { LanguageContextType } from "./LanguageContextTypes";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(`LanguageProvider initialized with language: ${language}`);

  // When language changes, update localStorage and document attributes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    console.log(`Language changed to: ${language}`);
    
    // Update URL query parameter if needed
    const urlParams = new URLSearchParams(window.location.search);
    const currentUrlLang = urlParams.get('lang');
    
    if (language === 'en') {
      // For English, remove the lang parameter if it exists
      if (currentUrlLang) {
        urlParams.delete('lang');
        const newUrl = 
          location.pathname + 
          (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
          location.hash;
        navigate(newUrl, { replace: true });
      }
    } else {
      // For other languages, set or update the lang parameter
      if (currentUrlLang !== language) {
        urlParams.set('lang', language);
        const newUrl = 
          location.pathname + 
          (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
          location.hash;
        navigate(newUrl, { replace: true });
      }
    }
  }, [language, location.pathname, navigate]);

  // Check for language parameter in URL whenever the location changes
  useEffect(() => {
    const urlLanguage = getLanguageFromUrl();
    if (urlLanguage && urlLanguage !== language) {
      console.log(`Setting language from URL: ${urlLanguage}`);
      setLanguage(urlLanguage);
    }
  }, [location.search]);

  // Memoize the t function to prevent unnecessary re-renders
  const t = useMemo(() => {
    return (key: string): string => {
      if (!key) return '';
      try {
        return getTranslation(key, language);
      } catch (error) {
        console.error(`Error in translation function for key "${key}":`, error);
        return key; // Fallback to key itself in case of error
      }
    };
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    console.error("useLanguage must be used within a LanguageProvider");
    // Return a fallback context to prevent application crashes
    return {
      language: 'en',
      setLanguage: () => console.error("LanguageProvider not found"),
      t: (key: string) => key
    };
  }
  return context;
};
