
import React, { useEffect, useRef, memo, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageCode } from '@/utils/languageUtils';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { dispatchLanguageChangeEvent } from '@/utils/translationHelpers';
import { useTranslation } from '@/context/TranslationProvider';

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
  const { isChangingLanguage } = useTranslation();
  const [uniqueKey, setUniqueKey] = useState(`transwrap-${Math.random().toString(36).substring(2, 9)}`);
  const containerRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const mountedRef = useRef(true);
  const lastDispatchTimeRef = useRef(0);
  const eventDebounceTimeMs = 300; // Debounce time for language change events
  
  // Track if component is mounted
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  
  // Create a new key when language changes to force refresh
  useEffect(() => {
    if (language !== languageRef.current && mountedRef.current) {
      console.log(`TranslationWrapper: Language changed from ${languageRef.current} to ${language}, generating new key`);
      setUniqueKey(`transwrap-${language}-${Date.now()}`);
      
      // This is critical: Update language reference immediately to prevent unnecessary re-renders
      languageRef.current = language as LanguageCode;
      
      // 手动触发节点刷新
      if (containerRef.current) {
        const existingNodes = containerRef.current.querySelectorAll('[data-key]');
        existingNodes.forEach(node => {
          node.setAttribute('data-refresh', Date.now().toString());
          node.setAttribute('data-language', language);
        });
      }
    }
  }, [language]);
  
  // Update language reference and trigger language change events
  // With debouncing to prevent too many events
  useEffect(() => {
    if (mountedRef.current) {
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
  
  // Special useEffect to handle refreshCounter changes without changing language
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.setAttribute('data-refresh', refreshCounter.toString());
    }
  }, [refreshCounter]);
  
  // 当语言变化完成后，重新触发一次刷新
  useEffect(() => {
    if (!isChangingLanguage && mountedRef.current) {
      // 额外的延迟刷新，确保所有翻译已更新
      const timer = setTimeout(() => {
        if (mountedRef.current && containerRef.current) {
          // 手动触发一次刷新
          const refreshTimestamp = Date.now().toString();
          containerRef.current.setAttribute('data-force-refresh', refreshTimestamp);
          
          // 通知翻译组件更新
          dispatchLanguageChangeEvent(language as LanguageCode);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isChangingLanguage, language]);
  
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
      data-key={uniqueKey}
      data-refresh={refreshCounter}
      data-changing={isChangingLanguage ? 'true' : 'false'}
    >
      {childrenWithProps}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default memo(TranslationWrapper);
