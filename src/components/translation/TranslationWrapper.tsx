
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
  
  // Track route changes for debugging language issues
  // But don't update state for every route change to avoid re-renders
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      console.log(`TranslationWrapper detected route change from ${lastLocation} to ${location.pathname}`);
      console.log('Current language:', languageContext.language);
      setLastLocation(location.pathname);
      
      // Only force re-render if the language also changed
      if (lastLanguageRef.current !== languageContext.language) {
        lastLanguageRef.current = languageContext.language;
        setForceUpdate(prev => prev + 1);
      }
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
  
  // Log for debugging purposes and set HTML lang attribute
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'forceUpdate:', forceUpdate, 'instance:', instanceRef.current);
    
    // Add a global language change listener
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', languageContext.language);
    htmlEl.setAttribute('data-language', languageContext.language);
    
    // Update our reference
    lastLanguageRef.current = languageContext.language;
    
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language, forceUpdate]);

  // If language context exists, just render children
  return (
    <div 
      data-translation-wrapper={true} 
      data-language={languageContext.language}
      data-instance={instanceRef.current}
      key={`translation-wrapper-${languageContext.language}-${forceUpdate}`}
    >
      {children}
    </div>
  );
};

export default TranslationWrapper;
