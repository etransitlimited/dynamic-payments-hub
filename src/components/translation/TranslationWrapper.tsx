
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(location.pathname);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  // Track route changes for debugging language issues
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      console.log(`TranslationWrapper detected route change from ${lastLocation} to ${location.pathname}`);
      console.log('Current language:', languageContext.language);
      setLastLocation(location.pathname);
      
      // Force re-render on route change
      setForceUpdate(prev => prev + 1);
    }
  }, [location.pathname, lastLocation, languageContext.language]);
  
  // Log for debugging purposes and set HTML lang attribute
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'forceUpdate:', forceUpdate);
    
    // Add a global language change listener
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', languageContext.language);
    htmlEl.setAttribute('data-language', languageContext.language);
    
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language, forceUpdate]);

  // If language context exists, just render children
  return (
    <div 
      data-translation-wrapper={true} 
      data-language={languageContext.language}
      key={`translation-wrapper-${languageContext.language}-${forceUpdate}`}
    >
      {children}
    </div>
  );
};

export default TranslationWrapper;
