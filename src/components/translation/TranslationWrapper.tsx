
import React, { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TranslationWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that stabilizes rendering during language changes
 * to reduce flickering and unnecessary re-renders
 */
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  // Try to use the language context
  const languageContext = useLanguage();
  const instanceRef = useRef(`wrapper-${Math.random().toString(36).substr(2, 9)}`);
  const languageRef = useRef(languageContext.language);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);
  
  // Generate a stable version of the children
  const stableChildren = useMemo(() => children, [children]);
  
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
        wrapperRef.current.setAttribute('data-update', Date.now().toString());
      }
      
      // Update all translation elements within this wrapper
      try {
        const translationElements = wrapperRef.current?.querySelectorAll('[data-translation-key]');
        if (translationElements) {
          translationElements.forEach(element => {
            element.setAttribute('data-language', languageContext.language);
          });
        }
      } catch (err) {
        console.error("Error updating translation elements:", err);
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
          wrapperRef.current.setAttribute('data-update', Date.now().toString());
          
          // Update all translation elements within this wrapper
          try {
            const translationElements = wrapperRef.current.querySelectorAll('[data-translation-key]');
            translationElements.forEach(element => {
              element.setAttribute('data-language', newLanguage);
            });
          } catch (err) {
            console.error("Error updating translation elements on event:", err);
          }
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

  return (
    <div 
      ref={wrapperRef}
      data-translation-wrapper={true} 
      data-language={languageRef.current}
      data-instance={instanceRef.current}
      className="translation-wrapper"
      key={`tw-${instanceRef.current}`}
    >
      {stableChildren}
    </div>
  );
};

export default React.memo(TranslationWrapper);
