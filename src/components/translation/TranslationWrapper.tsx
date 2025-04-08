
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { dispatchLanguageChangeEvent } from '@/utils/translationHelpers';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that ensures translations are updated when language changes
 */
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const mountedRef = useRef(true);
  const componentKey = useRef(`transwrap-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update language reference and trigger language change events
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      console.log(`TranslationWrapper: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      
      // Update container attributes for immediate visual feedback
      if (containerRef.current) {
        containerRef.current.setAttribute('data-language', language);
        containerRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
      
      // Dispatch language change events to ensure all components update
      dispatchLanguageChangeEvent(language as LanguageCode);
    }
  }, [language, refreshCounter]);
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="translation-wrapper w-full h-full"
      data-language={languageRef.current}
      data-key={componentKey.current}
      data-refresh={refreshCounter}
    >
      {children}
    </div>
  );
};

export default React.memo(TranslationWrapper);
