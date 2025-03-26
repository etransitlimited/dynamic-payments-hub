import React, { createContext, useState, useContext, useEffect } from "react";
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
    
    // For English variants: en, en-us, en-gb, etc.
    if (normalizedLang.startsWith('en')) {
      return 'en';
    }
  }
  
  // Default to English if no match found
  return 'en';
};

// Get the initial language from localStorage or browser settings
const getInitialLanguage = (): LanguageCode => {
  const savedLanguage = localStorage.getItem('language') as LanguageCode;
  return savedLanguage || getBrowserLanguage();
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set document lang attribute to help with text rendering
    document.documentElement.lang = language;
    // Force text redraw in some browsers
    document.body.style.webkitTextSizeAdjust = "100%";
  }, [language]);

  // Update language if browser language changes (rare but possible)
  useEffect(() => {
    // Only listen for language changes if the user hasn't set a preference
    const handleLanguageChange = () => {
      if (!localStorage.getItem('language')) {
        setLanguage(getBrowserLanguage());
      }
    };
    
    // This is a theoretical event - browsers don't actually fire a standard event
    // when language preferences change, but we include it for future compatibility
    window.addEventListener('languagechange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

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
