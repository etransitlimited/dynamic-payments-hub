
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

interface KeybasedTextProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
}

/**
 * Component for displaying translated text with direct DOM updates
 * to avoid re-renders and flickering during language changes
 */
const KeybasedText: React.FC<KeybasedTextProps> = ({ 
  translationKey, 
  fallback, 
  className = '',
  values
}) => {
  const { language } = useLanguage();
  const textRef = useRef<HTMLSpanElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const componentId = useRef(`kt-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update text content when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      updateTranslation();
    }
  }, [language, translationKey]);
  
  // Initial translation
  useEffect(() => {
    updateTranslation();
    
    // Listen for language change events
    const handleLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { language: newLanguage } = customEvent.detail || {};
      
      if (newLanguage && languageRef.current !== newLanguage) {
        languageRef.current = newLanguage as LanguageCode;
        updateTranslation();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [translationKey]);
  
  // Update the translation in the DOM directly
  const updateTranslation = () => {
    if (textRef.current) {
      let translatedText = getDirectTranslation(
        translationKey, 
        languageRef.current, 
        fallback
      );
      
      // Apply values if provided
      if (values && translatedText !== translationKey) {
        translatedText = Object.entries(values).reduce((text, [key, value]) => {
          const pattern = new RegExp(`\\{${key}\\}`, 'g');
          return text.replace(pattern, String(value));
        }, translatedText);
      }
      
      // Update DOM directly to avoid re-render flickering
      if (textRef.current.textContent !== translatedText) {
        textRef.current.textContent = translatedText;
        textRef.current.setAttribute('data-language', languageRef.current);
      }
    }
  };
  
  // Initial translation
  const initialTranslation = getDirectTranslation(
    translationKey,
    languageRef.current,
    fallback
  );
  
  // Apply values if provided
  let displayText = initialTranslation;
  if (values && initialTranslation !== translationKey) {
    displayText = Object.entries(values).reduce((text, [key, value]) => {
      const pattern = new RegExp(`\\{${key}\\}`, 'g');
      return text.replace(pattern, String(value));
    }, initialTranslation);
  }
  
  return (
    <span 
      ref={textRef}
      className={className}
      data-translation-key={translationKey}
      data-language={languageRef.current}
      data-component-id={componentId.current}
    >
      {displayText}
    </span>
  );
};

export default React.memo(KeybasedText);
