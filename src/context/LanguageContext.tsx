
import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { getInitialLanguage, getLanguageFromUrl } from "@/utils/languageDetection";
import { getTranslation } from "@/utils/translationUtils";
import { LanguageContextType } from "./LanguageContextTypes";
import { toast } from "sonner";

// Create the context with a default value that's not undefined
const defaultLanguageContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => console.warn("Default language setter used"),
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(`LanguageProvider initialized with language: ${language}`);

  // Handle language change with a hard reload approach for more reliable updates
  const handleLanguageChange = (newLanguage: LanguageCode) => {
    if (newLanguage === language) return;
    
    console.log(`Changing language from ${language} to ${newLanguage}`);
    
    // Save to localStorage first
    localStorage.setItem('language', newLanguage);
    
    // Set the language in the context
    setLanguage(newLanguage);
    
    // Update document attributes
    document.documentElement.lang = newLanguage;
    document.documentElement.setAttribute('data-language', newLanguage);
    
    // Add lang parameter to URL if needed
    const urlParams = new URLSearchParams(window.location.search);
    if (newLanguage === 'en') {
      urlParams.delete('lang');
    } else {
      urlParams.set('lang', newLanguage);
    }
    
    // Create new URL with updated parameters
    const newUrl = 
      location.pathname + 
      (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
      location.hash;
    
    // Show feedback to user
    toast.success(`Language changed to ${newLanguage}`);
    
    // Force a reload for a complete language refresh
    // This is more reliable than trying to update all components
    setTimeout(() => {
      window.location.href = newUrl;
    }, 300);
  };

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
        const translation = getTranslation(key, language);
        // Reduce logging noise for production
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Translation for key "${key}" in "${language}": "${translation}"`);
        }
        return translation;
      } catch (error) {
        console.error(`Error in translation function for key "${key}":`, error);
        return key; // Fallback to key itself in case of error
      }
    };
  }, [language]);

  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleLanguageChange,
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
  if (!context) {
    console.error("useLanguage must be used within a LanguageProvider");
    // Return a fallback context with better error handling
    return {
      language: 'en',
      setLanguage: () => console.error("LanguageProvider not found"),
      t: (key: string) => {
        // Try to get a translation directly as fallback
        try {
          return getTranslation(key, 'en');
        } catch (e) {
          return key;
        }
      }
    };
  }
  return context;
};
