
import React, { createContext, useState, useContext, useEffect } from "react";
import translations from "@/translations";

type Language = "zh-CN" | "zh-TW" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get browser language
const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) {
    return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
  }
  return 'en';
};

// Get the initial language from localStorage or browser settings
const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('language') as Language;
  return savedLanguage || getBrowserLanguage();
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set document lang attribute to help with text rendering
    document.documentElement.lang = language;
    // Force text redraw in some browsers
    document.body.style.webkitTextSizeAdjust = "100%";
  }, [language]);

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
