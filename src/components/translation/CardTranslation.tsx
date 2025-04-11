
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectTranslation } from '@/utils/translationHelpers';
import { LanguageCode } from '@/utils/languageUtils';

interface CardTranslationProps {
  translationKey: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
}

/**
 * Optimized translation component specifically for dashboard cards
 * Uses direct DOM manipulation for instant updates without re-renders
 */
const CardTranslation: React.FC<CardTranslationProps> = ({ 
  translationKey, 
  fallback, 
  className,
  values
}) => {
  const { language } = useLanguage();
  const textRef = useRef<HTMLSpanElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(`${translationKey}-${language}`);
  
  // Update text when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      updateTextContent();
      setForceUpdateKey(`${translationKey}-${language}-${Date.now()}`);
    }
  }, [language, translationKey]);
  
  // Initial render and setup language change listeners
  useEffect(() => {
    updateTextContent();
    
    const handleLanguageChange = (e: Event) => {
      try {
        const customEvent = e as CustomEvent;
        const { language: newLanguage } = customEvent.detail || {};
        
        if (newLanguage && languageRef.current !== newLanguage) {
          languageRef.current = newLanguage as LanguageCode;
          updateTextContent();
          setForceUpdateKey(`${translationKey}-${newLanguage}-${Date.now()}`);
        }
      } catch (error) {
        console.error("CardTranslation language change handler error:", error);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [translationKey]);
  
  // Update DOM text content directly for immediate updates
  const updateTextContent = () => {
    if (textRef.current) {
      try {
        let translated = getDirectTranslation(translationKey, languageRef.current, fallback);
        
        // Apply values if provided
        if (values && translated !== translationKey) {
          translated = Object.entries(values).reduce((text, [key, value]) => {
            const pattern = new RegExp(`\\{${key}\\}`, 'g');
            return text.replace(pattern, String(value));
          }, translated);
        }
        
        textRef.current.textContent = translated;
        textRef.current.setAttribute('data-language', languageRef.current);
      } catch (error) {
        console.error(`CardTranslation error for key "${translationKey}":`, error);
        if (textRef.current) {
          textRef.current.textContent = fallback || translationKey;
        }
      }
    }
  };
  
  return (
    <span 
      ref={textRef} 
      className={className}
      data-key={translationKey}
      data-language={languageRef.current}
      key={forceUpdateKey}
    >
      {fallback || translationKey}
    </span>
  );
};

export default React.memo(CardTranslation);
