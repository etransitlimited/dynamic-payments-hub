
import React, { useEffect, useState, useRef } from "react";
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
  const lastLanguageRef = useRef(languageContext.language);
  const instanceRef = useRef(`wrapper-${Math.random().toString(36).substr(2, 9)}`);
  
  // Only update language without affecting navigation
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', languageContext.language);
    htmlEl.setAttribute('data-language', languageContext.language);
    
    // Update our reference
    lastLanguageRef.current = languageContext.language;
    
    // Force update only when language changes
    if (lastLanguageRef.current !== languageContext.language) {
      console.log('TranslationWrapper: Language changed, updating without affecting navigation');
      setForceUpdate(prev => prev + 1);
    }
  }, [languageContext.language]);
  
  // Track route changes separately from language changes
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      console.log(`TranslationWrapper detected route change from ${lastLocation} to ${location.pathname}`);
      console.log('Current language:', languageContext.language);
      setLastLocation(location.pathname);
    }
  }, [location.pathname, lastLocation, languageContext.language]);
  
  // Listen for global language change events
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      console.log('TranslationWrapper detected language change event');
      setForceUpdate(prev => prev + 1);
    };
    
    // Listen for the custom event
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'forceUpdate:', forceUpdate, 'instance:', instanceRef.current);
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language, forceUpdate]);

  // Render without any key that would cause full remounting
  return (
    <div 
      data-translation-wrapper={true} 
      data-language={languageContext.language}
      data-instance={instanceRef.current}
    >
      {children}
    </div>
  );
};

export default TranslationWrapper;
