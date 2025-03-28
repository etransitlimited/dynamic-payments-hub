
import React, { createContext, useState, useContext, useEffect } from "react";
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

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    
    // Set document lang attribute to help with text rendering
    document.documentElement.lang = language;
    
    // Force text redraw in some browsers
    document.body.style.webkitTextSizeAdjust = "100%";
    
    // Update URL query parameter if needed, but don't trigger a page reload
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
  }, [language, location, navigate]);

  // Check for language parameter in URL whenever the location changes
  useEffect(() => {
    const urlLanguage = getLanguageFromUrl();
    if (urlLanguage && urlLanguage !== language) {
      setLanguage(urlLanguage);
    }
  }, [location.search]);

  // Translation function that uses the utility
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
