
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { getDirectTranslation, formatDirectTranslation } from "@/utils/translationHelpers";

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
}

/**
 * Optimized translation component with DOM direct updates
 * This improves performance for language changes
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  keyName, 
  fallback, 
  className,
  values 
}) => {
  const { language } = useLanguage();
  const [initialText, setInitialText] = useState<string>("");
  const [forceUpdateKey, setForceUpdateKey] = useState(`${keyName}-${language}-${Date.now()}`);
  const textRef = useRef<HTMLSpanElement>(null);
  const lastLanguageRef = useRef<LanguageCode>(language as LanguageCode);
  
  // Get translation with variable replacement if needed
  const getTranslatedText = (lang: LanguageCode) => {
    try {
      let text = getDirectTranslation(keyName, lang, fallback);
      
      // Apply variables if provided
      if (values && Object.keys(values).length > 0) {
        text = formatDirectTranslation(text, values);
      }
      
      return text;
    } catch (error) {
      console.error(`Error translating key "${keyName}":`, error);
      return fallback || keyName;
    }
  };
  
  // Initialize with first translation
  useEffect(() => {
    const text = getTranslatedText(language as LanguageCode);
    setInitialText(text);
  }, []);
  
  // Update DOM directly when language changes
  useEffect(() => {
    const updateText = () => {
      if (textRef.current) {
        const text = getTranslatedText(language as LanguageCode);
        textRef.current.textContent = text;
        textRef.current.setAttribute('data-lang', language);
      }
    };
    
    // Update when language changes
    if (language !== lastLanguageRef.current) {
      lastLanguageRef.current = language as LanguageCode;
      updateText();
      setForceUpdateKey(`${keyName}-${language}-${Date.now()}`);
    }
  }, [language, keyName, values]);
  
  // Listen for direct language change events
  useEffect(() => {
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && newLanguage !== lastLanguageRef.current) {
          lastLanguageRef.current = newLanguage as LanguageCode;
          
          // Update text immediately via DOM manipulation for responsiveness
          if (textRef.current) {
            const text = getTranslatedText(newLanguage as LanguageCode);
            textRef.current.textContent = text;
            textRef.current.setAttribute('data-lang', newLanguage);
          }
          
          // Also update state to trigger re-render
          setForceUpdateKey(`${keyName}-${newLanguage}-${Date.now()}`);
        }
      } catch (error) {
        console.error("TranslatedText language change error:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [keyName, values]);
  
  return (
    <span 
      ref={textRef} 
      className={className}
      data-key={keyName}
      data-language={language}
      key={forceUpdateKey}
    >
      {initialText || fallback || keyName}
    </span>
  );
};

export default React.memo(TranslatedText);
