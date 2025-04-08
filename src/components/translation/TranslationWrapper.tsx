
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
  
  // Update HTML attributes without triggering re-renders
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', languageContext.language);
    htmlEl.setAttribute('data-language', languageContext.language);
  }, [languageContext.language]);
  
  // Track route changes separately from language changes
  // CRITICAL: Do not force re-renders on each location change
  useEffect(() => {
    if (location.pathname !== lastLocation) {
      console.log(`TranslationWrapper: route changed from ${lastLocation} to ${location.pathname}`);
      setLastLocation(location.pathname);
    }
  }, [location.pathname, lastLocation]);
  
  // Handle language changes without affecting routes
  // This effect is separate to ensure language changes don't affect navigation
  useEffect(() => {
    if (lastLanguageRef.current !== languageContext.language) {
      console.log(`TranslationWrapper: language changed from ${lastLanguageRef.current} to ${languageContext.language}`);
      lastLanguageRef.current = languageContext.language;
      
      // Use a setTimeout to ensure this happens after route transitions
      setTimeout(() => {
        setForceUpdate(prev => prev + 1);
      }, 50);
    }
  }, [languageContext.language]);
  
  // Listen for global language change events with even less frequency
  useEffect(() => {
    const debounceTimerRef = { current: null as NodeJS.Timeout | null };
    
    const handleLanguageChange = (event: Event) => {
      // Debounce to prevent multiple rapid refreshes
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      debounceTimerRef.current = setTimeout(() => {
        console.log('TranslationWrapper: detected language change event');
        // No need to force re-render the entire subtree, just update the language reference
        lastLanguageRef.current = languageContext.language;
      }, 200);
    };
    
    // Listen for the custom event
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [languageContext.language]);
  
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'instance:', instanceRef.current);
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language]);

  // Important: Don't use a key with language in it which would trigger complete remounts
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

export default React.memo(TranslationWrapper);
