
import React, { useEffect, useRef, memo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { dispatchLanguageChangeEvent } from '@/utils/translationHelpers';

interface TranslationWrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component that ensures translations are updated when language changes
 * Optimized to prevent unnecessary re-renders
 */
const TranslationWrapper: React.FC<TranslationWrapperProps> = ({ children }) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const mountedRef = useRef(true);
  const componentKey = useRef(`transwrap-${Math.random().toString(36).substring(2, 9)}`);
  const lastDispatchTimeRef = useRef(0);
  const eventDebounceTimeMs = 300; // Debounce time for language change events
  
  // Update language reference and trigger language change events
  // With debouncing to prevent too many events
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      console.log(`TranslationWrapper: Language changed from ${languageRef.current} to ${language}`);
      languageRef.current = language as LanguageCode;
      
      // Update container attributes for immediate visual feedback
      if (containerRef.current) {
        containerRef.current.setAttribute('data-language', language);
        containerRef.current.setAttribute('data-refresh', refreshCounter.toString());
      }
      
      // Debounce the language change events to prevent cascading updates
      const now = Date.now();
      if (now - lastDispatchTimeRef.current > eventDebounceTimeMs) {
        // Dispatch language change events to ensure all components update
        dispatchLanguageChangeEvent(language as LanguageCode);
        lastDispatchTimeRef.current = now;
      }
    }
  }, [language, refreshCounter]);
  
  // Track mounted state
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Using React.Children.map with a wrapper function instead of direct embedding
  // This helps prevent unnecessary re-renders of children
  const childrenWithProps = React.useMemo(() => {
    return children;
  }, [children]);
  
  return (
    <div 
      ref={containerRef}
      className="translation-wrapper w-full h-full"
      data-language={languageRef.current}
      data-key={componentKey.current}
      data-refresh={refreshCounter}
    >
      {childrenWithProps}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(TranslationWrapper);
