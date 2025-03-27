
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import translations from "@/translations";
import { LanguageCode } from "@/utils/languageUtils";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Improved helper function to get browser language with better detection
const getBrowserLanguage = (): LanguageCode => {
  // Get the browser's preferred languages array
  const languages = navigator.languages || [navigator.language];
  
  // Loop through the languages array to find the first matching language
  for (const lang of languages) {
    const normalizedLang = lang.toLowerCase();
    
    // Check for Chinese variants first
    if (normalizedLang.startsWith('zh')) {
      // Traditional Chinese: zh-tw, zh-hk, zh-mo
      if (normalizedLang.includes('tw') || normalizedLang.includes('hk') || normalizedLang.includes('mo')) {
        return 'zh-TW';
      }
      // Simplified Chinese: zh-cn, zh-sg, zh-my, zh (default Chinese)
      return 'zh-CN';
    }
    
    // For French variants
    if (normalizedLang.startsWith('fr')) {
      return 'fr';
    }
    
    // For Spanish variants
    if (normalizedLang.startsWith('es')) {
      return 'es';
    }
    
    // For English variants: en, en-us, en-gb, etc.
    if (normalizedLang.startsWith('en')) {
      return 'en';
    }
  }
  
  // Default to English if no match found
  return 'en';
};

// Function to get language from URL query parameter
const getLanguageFromUrl = (): LanguageCode | null => {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as LanguageCode | null;
  
  if (langParam && ['en', 'zh-CN', 'zh-TW', 'fr', 'es'].includes(langParam)) {
    return langParam;
  }
  
  return null;
};

// Get the initial language from URL parameter, localStorage or browser settings
const getInitialLanguage = (): LanguageCode => {
  // URL parameter takes highest priority
  const urlLanguage = getLanguageFromUrl();
  if (urlLanguage) {
    return urlLanguage;
  }
  
  // Next check localStorage
  const savedLanguage = localStorage.getItem('language') as LanguageCode;
  if (savedLanguage && ['en', 'zh-CN', 'zh-TW', 'fr', 'es'].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Finally use browser language
  return getBrowserLanguage();
};

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

  // Updated translation function with improved error handling and fallbacks
  const t = (key: string): string => {
    try {
      // Handle nested objects by using dot notation in the key (e.g., "hero.title")
      if (key.includes('.')) {
        const parts = key.split('.');
        let value: any = translations[language];
        
        // Navigate through the nested objects
        for (const part of parts) {
          if (value && typeof value === 'object' && part in value) {
            value = value[part];
          } else {
            console.warn(`Translation key not found: "${key}" in language "${language}"`);
            // Try fallback to English if current language is not English
            if (language !== 'en') {
              let fallbackValue: any = translations['en'];
              let fallbackFound = true;
              
              for (const fallbackPart of parts) {
                if (fallbackValue && typeof fallbackValue === 'object' && fallbackPart in fallbackValue) {
                  fallbackValue = fallbackValue[fallbackPart];
                } else {
                  fallbackFound = false;
                  break;
                }
              }
              
              if (fallbackFound && typeof fallbackValue === 'string') {
                console.info(`Using English fallback for key: "${key}"`);
                return fallbackValue;
              }
            }
            return key; // Key not found, return the key itself
          }
        }
        
        // Check if we got a string at the end
        if (typeof value === 'string') {
          return value;
        } else {
          console.warn(`Translation key "${key}" resolves to a non-string value:`, value);
          return key; // Return the key if the value is not a string
        }
      } else {
        // Handle top-level keys
        const value = translations[language][key as keyof typeof translations[typeof language]];
        if (typeof value === 'string') {
          return value;
        } else {
          console.warn(`Translation key "${key}" resolves to a non-string value:`, value);
          
          // Try fallback to English
          if (language !== 'en') {
            const fallbackValue = translations['en'][key as keyof typeof translations['en']];
            if (typeof fallbackValue === 'string') {
              console.info(`Using English fallback for key: "${key}"`);
              return fallbackValue;
            }
          }
          
          return key; // Return the key if the value is not a string
        }
      }
    } catch (error) {
      console.error(`Error accessing translation key "${key}":`, error);
      return key; // Return the key itself as fallback
    }
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
