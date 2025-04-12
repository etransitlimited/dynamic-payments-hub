
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
  const forceUpdateTimeRef = useRef<number | null>(null);
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Track if component is mounted
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      
      // Clear any pending timeouts
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, []);
  
  // Prevent infinite loops with language changes
  useEffect(() => {
    // Only update if language has actually changed
    if (language !== languageRef.current && mountedRef.current) {
      console.log(`TranslationWrapper: Language changed from ${languageRef.current} to ${language}, generating new key`);
      
      // Set a unique key to help React with reconciliation
      const newKey = `transwrap-${language}-${Date.now()}`;
      setUniqueKey(newKey);
      
      // This is critical: Update language reference immediately to prevent unnecessary re-renders
      languageRef.current = language as LanguageCode;
      
      // Track when we last forced an update to prevent recursive updates
      forceUpdateTimeRef.current = Date.now();
      
      // Update container attributes for immediate visual feedback  
      if (containerRef.current) {
        containerRef.current.setAttribute('data-language', language);
        containerRef.current.setAttribute('data-refresh', refreshCounter.toString());
        
        // 手动触发节点刷新
        const existingNodes = containerRef.current.querySelectorAll('[data-key]');
        existingNodes.forEach(node => {
          node.setAttribute('data-refresh', Date.now().toString());
          node.setAttribute('data-language', language);
        });
      }
    }
  }, [language, refreshCounter]);
  
  // Handle language change completion
  useEffect(() => {
    // Only process if language change has completed and sufficient time has passed
    // since our last update to avoid update loops
    const now = Date.now();
    const timeSinceLastUpdate = forceUpdateTimeRef.current ? now - forceUpdateTimeRef.current : Infinity;
    const minimumUpdateInterval = 500; // Half a second minimum between updates
    
    if (!isChangingLanguage && mountedRef.current && timeSinceLastUpdate > minimumUpdateInterval) {
      // Clear any existing timeout to avoid multiple refreshes
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
      
      // Schedule a delayed refresh to ensure all translations are applied
      refreshTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current && containerRef.current) {
          // Add a forced refresh timestamp attribute
          const refreshTimestamp = Date.now().toString();
          containerRef.current.setAttribute('data-force-refresh', refreshTimestamp);
          
          // Check time since last event dispatch
          const now = Date.now();
          if (now - lastDispatchTimeRef.current > eventDebounceTimeMs) {
            // Dispatch event to notify other components of the language change
            dispatchLanguageChangeEvent(language as LanguageCode);
            lastDispatchTimeRef.current = now;
          }
        }
        
        refreshTimeoutRef.current = null;
      }, 100);
    }
  }, [isChangingLanguage, language, refreshCounter]);
  
  // Optimize to prevent unnecessary child re-renders
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
