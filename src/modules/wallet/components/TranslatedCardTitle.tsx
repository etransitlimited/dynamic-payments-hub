
import React, { useEffect, useRef, useState } from "react";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { CardTitle } from "@/components/ui/card";

interface TranslatedCardTitleProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Special translation component for card titles with language change support
 */
const TranslatedCardTitle: React.FC<TranslatedCardTitleProps> = ({
  translationKey,
  fallback,
  className,
  icon
}) => {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState<string>("");
  const langRef = useRef<LanguageCode>(language as LanguageCode);
  const [updateKey, setUpdateKey] = useState(`title-${translationKey}-${language}-${Date.now()}`);
  
  // Update translation when language changes
  useEffect(() => {
    const translate = () => {
      try {
        const translated = getDirectTranslation(translationKey, language as LanguageCode, fallback);
        setDisplayText(translated);
        langRef.current = language as LanguageCode;
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
        
        if (newLanguage && langRef.current !== newLanguage) {
          const translated = getDirectTranslation(translationKey, newLanguage as LanguageCode, fallback);
          setDisplayText(translated);
          langRef.current = newLanguage as LanguageCode;
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
    <CardTitle className={className} key={updateKey} data-key={translationKey} data-lang={language}>
      {icon && <span className="mr-2">{icon}</span>}
      {displayText || fallback || translationKey}
    </CardTitle>
  );
};

export default TranslatedCardTitle;
