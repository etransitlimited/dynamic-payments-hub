
import React, { useEffect, useRef, useState } from "react";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getWalletTranslation } from "../i18n";
import { CardTitle } from "@/components/ui/card";

interface TranslatedCardTitleProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Special translation component for card titles with language change support
 * Uses module-specific translations
 */
const TranslatedCardTitle: React.FC<TranslatedCardTitleProps> = ({
  translationKey,
  fallback,
  className,
  icon
}) => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState<string>("");
  const [updateKey, setUpdateKey] = useState(`title-${translationKey}-${language}-${Date.now()}`);
  const lastLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  
  // Update translation when language changes
  useEffect(() => {
    const translate = () => {
      try {
        const translated = getWalletTranslation(translationKey, language as LanguageCode);
        setDisplayText(translated || fallback || translationKey);
        
        // Save current language to ref
        lastLanguageRef.current = language as LanguageCode;
      } catch (error) {
        console.error(`TranslatedCardTitle translation error for key "${translationKey}":`, error);
        setDisplayText(fallback || translationKey);
      }
    };
    
    translate();
    setUpdateKey(`title-${translationKey}-${language}-${Date.now()}`);
  }, [language, translationKey, fallback]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && lastLanguageRef.current !== newLanguage) {
          const translated = getWalletTranslation(translationKey, newLanguage as LanguageCode);
          setDisplayText(translated || fallback || translationKey);
          lastLanguageRef.current = newLanguage as LanguageCode;
          setUpdateKey(`title-${translationKey}-${newLanguage}-${Date.now()}`);
        }
      } catch (error) {
        console.error("TranslatedCardTitle language change error:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [translationKey, fallback]);
  
  return (
    <CardTitle 
      className={className} 
      key={updateKey} 
      data-key={translationKey} 
      data-lang={language}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {displayText || fallback || translationKey}
    </CardTitle>
  );
};

export default TranslatedCardTitle;
