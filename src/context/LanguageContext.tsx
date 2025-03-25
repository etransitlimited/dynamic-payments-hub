
import React, { createContext, useState, useContext } from "react";
import translations from "@/translations";

type Language = "zh-CN" | "zh-TW" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

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
