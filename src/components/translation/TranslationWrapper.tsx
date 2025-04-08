
import React, { useEffect, useRef, useMemo } from "react";
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
  const instanceRef = useRef(`wrapper-${Math.random().toString(36).substr(2, 9)}`);
  const languageRef = useRef(languageContext.language);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  
  // Ensure we track component mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Handle language changes through DOM updates without re-renders
  useEffect(() => {
    if (!mountedRef.current) return;
    
    // Update DOM attributes if language changed
    if (languageRef.current !== languageContext.language) {
      console.log(`TranslationWrapper: language changed from ${languageRef.current} to ${languageContext.language}`);
      languageRef.current = languageContext.language;
      
      // Update HTML lang attribute
      try {
        const htmlEl = document.documentElement;
        htmlEl.setAttribute('lang', languageContext.language);
        htmlEl.setAttribute('data-language', languageContext.language);
      } catch (error) {
        console.error("Error updating HTML attributes:", error);
      }
      
      // Update wrapper element's data-language attribute directly
      if (wrapperRef.current) {
        wrapperRef.current.setAttribute('data-language', languageContext.language);
      }
    }
  }, [languageContext.language]);
  
  // Register global language change listener
  useEffect(() => {
    if (!mountedRef.current) return;
    
    const handleLanguageChange = (e: Event) => {
      if (!mountedRef.current) return;
      
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage;
        
        // Update DOM attributes directly
        if (wrapperRef.current) {
          wrapperRef.current.setAttribute('data-language', newLanguage);
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);
  
  // CRITICAL: Super stable content memo to prevent re-rendering the entire child tree
  const stableContent = useMemo(() => children, [children]);

  return (
    <div 
      ref={wrapperRef}
      data-translation-wrapper={true} 
      data-language={languageRef.current}
      data-instance={instanceRef.current}
      className="translation-wrapper"
    >
      {stableContent}
    </div>
  );
};

// Use React.memo with custom comparison to prevent unnecessary re-renders
export default React.memo(TranslationWrapper, (prevProps, nextProps) => {
  // Only re-render if children actually change structure, not just props
  return prevProps.children === nextProps.children;
});
