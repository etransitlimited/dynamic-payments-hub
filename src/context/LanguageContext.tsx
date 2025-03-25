
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
  const [language, setLanguage] = useState<Language>("zh-CN");

  const t = (key: string): string => {
    const translationValue = translations[language][key as keyof typeof translations[typeof language]];
    
    // Handle nested objects by using dot notation in the key (e.g., "hero.title")
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      const parentObj = translations[language][parent as keyof typeof translations[typeof language]];
      
      if (parentObj && typeof parentObj === 'object') {
        return (parentObj as Record<string, string>)[child] || key;
      }
    }
    
    // Return the string or the key itself as fallback
    return typeof translationValue === 'string' ? translationValue : key;
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
