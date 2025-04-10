
import React, { useRef, useEffect, useState } from "react";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionPageHeader = () => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const { refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`header-${language}-${Date.now()}`);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionPageHeader language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`header-${language}-${Date.now()}-${refreshCounter}`);
      
      // Update translations directly
      updateTranslations();
    }
  }, [language, refreshCounter]);
  
  // Update translations directly in the DOM
  const updateTranslations = () => {
    const titleText = getTransactionTranslation("pageTitle", languageRef.current);
    const subtitleText = getTransactionTranslation("pageSubtitle", languageRef.current);
    
    if (titleRef.current) titleRef.current.textContent = titleText;
    if (subtitleRef.current) subtitleRef.current.textContent = subtitleText;
  };
  
  // Set up translation event listeners
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`header-${e.detail.language}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <div 
      key={uniqueKey} 
      className="mb-6"
      data-language={languageRef.current}
    >
      <h1 
        ref={titleRef}
        className="text-2xl font-bold tracking-tight text-white"
      >
        {getTransactionTranslation("pageTitle", languageRef.current)}
      </h1>
      <p 
        ref={subtitleRef}
        className="text-gray-400 mt-1"
      >
        {getTransactionTranslation("pageSubtitle", languageRef.current)}
      </p>
    </div>
  );
};

export default TransactionPageHeader;
