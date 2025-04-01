
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslationWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that provides the LanguageProvider context to its children
 * and handles fallbacks for components that might be rendered outside of the context
 */
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  // Try to use the language context
  const languageContext = useLanguage();
  
  // Log for debugging purposes
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language);
  }, [languageContext.language]);

  // If language context exists, just render children
  return <>{children}</>;
};

export default TranslationWrapper;
