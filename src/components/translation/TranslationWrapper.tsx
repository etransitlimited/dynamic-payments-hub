
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  const instanceRef = useRef(`wrapper-${Math.random().toString(36).substr(2, 9)}`);
  const initTimestampRef = useRef(Date.now());
  const languageRef = useRef(languageContext.language);
  const mountedRef = useRef(true);
  
  // Ensure we track component mount state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Update HTML attributes without triggering re-renders
  const updateDOMAttributes = useCallback(() => {
    if (!mountedRef.current) return;
    
    try {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute('lang', languageContext.language);
      htmlEl.setAttribute('data-language', languageContext.language);
      
      // Set language data attribute on the wrapper component DOM element directly
      const wrapperEl = document.querySelector(`[data-instance="${instanceRef.current}"]`);
      if (wrapperEl) {
        wrapperEl.setAttribute('data-language', languageContext.language);
      }
    } catch (error) {
      console.error("Error updating DOM attributes:", error);
    }
  }, [languageContext.language]);
  
  // Handle language changes through DOM updates without re-renders
  useEffect(() => {
    if (!mountedRef.current) return;
    
    updateDOMAttributes();
    
    // Update language reference if changed
    if (languageRef.current !== languageContext.language) {
      console.log(`TranslationWrapper: language changed from ${languageRef.current} to ${languageContext.language}`);
      languageRef.current = languageContext.language;
      
      // Dispatch language change event for components to listen to
      try {
        window.dispatchEvent(new CustomEvent('app:languageChange', { 
          detail: { language: languageContext.language, timestamp: Date.now() } 
        }));
        
        document.dispatchEvent(new CustomEvent('languageChanged', { 
          detail: { language: languageContext.language, timestamp: Date.now() } 
        }));
      } catch (error) {
        console.error("Error dispatching language change events:", error);
      }
    }
  }, [languageContext.language, updateDOMAttributes]);
  
  // Log mounting/unmounting
  useEffect(() => {
    console.log('TranslationWrapper initialized with language:', languageContext.language, 'instance:', instanceRef.current);
    return () => {
      console.log('TranslationWrapper unmounted');
    };
  }, [languageContext.language]);
  
  // CRITICAL: Super stable content memo to prevent re-rendering the entire child tree
  // Only depend on the children prop, not on language changes
  const stableContent = useMemo(() => children, [children]);

  // Use a stable wrapper with offline DOM updates to avoid re-renders on language changes
  return (
    <div 
      data-translation-wrapper={true} 
      data-language={languageContext.language}
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
