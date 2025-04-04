
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
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const location = useLocation();
  const navigate = useNavigate();

  console.log(`LanguageProvider initialized with language: ${language}`);

  // Handle language change with a soft update approach to avoid page reloads
  const handleLanguageChange = (newLanguage: LanguageCode) => {
    if (newLanguage === language) return;
    
    console.log(`Changing language from ${language} to ${newLanguage}`);
    
    // Save to localStorage
    localStorage.setItem('language', newLanguage);
    
    // Set the language in the context and update timestamp
    setLanguageState(newLanguage);
    setLastUpdate(Date.now());
    
    // Update document attributes
    document.documentElement.lang = newLanguage;
    document.documentElement.setAttribute('data-language', newLanguage);
    
    // Get the current URL path from window.location to ensure we have the exact current path
    const currentPath = window.location.pathname;
    console.log(`Current path during language change: ${currentPath}`);
    
    // Add lang parameter to URL if needed
    const urlParams = new URLSearchParams(window.location.search);
    if (newLanguage === 'en') {
      urlParams.delete('lang');
    } else {
      urlParams.set('lang', newLanguage);
    }
    
    // Create new URL with updated parameters while preserving the exact current path
    const newUrl = 
      currentPath + 
      (urlParams.toString() ? `?${urlParams.toString()}` : '') + 
      location.hash;
    
    // Show feedback to user
    toast.success(`Language changed to ${newLanguage}`);
    
    // Update URL without causing a page reload and preserve the current path
    navigate(newUrl, { replace: true });
    
    // Force a global re-render by adding a class to document element and removing after a small delay
    document.documentElement.classList.add('language-transition');
    setTimeout(() => {
      document.documentElement.classList.remove('language-transition');
    }, 50);
  };

  // Check for language parameter in URL whenever the location changes
  useEffect(() => {
    const urlLanguage = getLanguageFromUrl();
    if (urlLanguage && urlLanguage !== language) {
      console.log(`Setting language from URL: ${urlLanguage}`);
      setLanguageState(urlLanguage);
      setLastUpdate(Date.now());
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
    t,
    lastUpdate
  }), [language, t, lastUpdate]);

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
      },
      lastUpdate: Date.now()
    };
  }
  return context;
};
