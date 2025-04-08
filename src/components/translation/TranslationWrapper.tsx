
import React, { useEffect, useState, useRef, useMemo } from "react";
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
  const lastLanguageRef = useRef(languageContext.language);
  const instanceRef = useRef(`wrapper-${Math.random().toString(36).substr(2, 9)}`);
  
  // Update HTML attributes without triggering re-renders
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', languageContext.language);
    htmlEl.setAttribute('data-language', languageContext.language);
  }, [languageContext.language]);
  
  // Track route changes separately from language changes - no re-renders
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      console.log(`TranslationWrapper: route changed from ${lastLocation} to ${location.pathname}`);
      setLastLocation(location.pathname);
    }
  }, [location.pathname, lastLocation]);
  
  // Stable content memo to prevent re-rendering the entire child tree
  const stableContent = useMemo(() => {
    return children;
  }, [children, lastLocation]); // Only re-render when children or route changes, not language
  
  // Handle language changes through data attributes without re-renders
  useEffect(() => {
    if (lastLanguageRef.current !== languageContext.language) {
      console.log(`TranslationWrapper: language changed from ${lastLanguageRef.current} to ${languageContext.language}`);
      lastLanguageRef.current = languageContext.language;
      
      // Dispatch language change event for components to listen to
      window.dispatchEvent(new CustomEvent('app:languageChange', { 
        detail: { language: languageContext.language, timestamp: Date.now() } 
      }));
      
      document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: languageContext.language, timestamp: Date.now() } 
      }));
    }
  }, [languageContext.language]);
  
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'instance:', instanceRef.current);
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language]);

  // Use a stable wrapper that doesn't re-render on language changes
  return (
    <div 
      data-translation-wrapper={true} 
      data-language={languageContext.language}
      data-instance={instanceRef.current}
    >
      {stableContent}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(TranslationWrapper);
