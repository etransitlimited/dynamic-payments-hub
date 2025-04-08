
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";
import { motion } from 'framer-motion';

interface PageTranslationWrapperProps {
  children: ReactNode;
  pageKey: string;
  pageName: string;
}

/**
 * Component that wraps page content and handles language transitions smoothly
 * to prevent flickering and improve performance during language changes
 */
const PageTranslationWrapper: React.FC<PageTranslationWrapperProps> = ({
  children,
  pageKey,
  pageName
}) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMountRef = useRef(true);
  const stableKeyRef = useRef(`${pageKey}-${Math.random().toString(36).substring(2, 9)}`);
  const [pageRenderKey, setPageRenderKey] = useState<string>(stableKeyRef.current);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pendingLanguageUpdate = useRef<string | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Update title when page mounts
  useEffect(() => {
    document.title = `${pageName} | Dashboard`;
  }, [pageName]);
  
  // Handle controlled language changes
  useEffect(() => {
    if (!isInitialMountRef.current && languageRef.current !== language) {
      // Mark that we're starting a transition
      setIsTransitioning(true);
      
      // Store the pending language update
      pendingLanguageUpdate.current = language;
      
      // Update DOM attributes without triggering rerender
      if (contentRef.current) {
        contentRef.current.setAttribute('data-language', language);
        contentRef.current.setAttribute('data-transition', 'true');
      }
      
      // Clear any existing timeouts
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      // Apply the update after a short delay to minimize flicker
      transitionTimeoutRef.current = setTimeout(() => {
        if (pendingLanguageUpdate.current) {
          languageRef.current = pendingLanguageUpdate.current as LanguageCode;
          setPageRenderKey(`${stableKeyRef.current}-${pendingLanguageUpdate.current}-${Date.now()}`);
          pendingLanguageUpdate.current = null;
        }
        
        // End transition after rendering completes
        requestAnimationFrame(() => {
          setIsTransitioning(false);
          if (contentRef.current) {
            contentRef.current.setAttribute('data-transition', 'false');
          }
        });
      }, 50);
    }
    
    isInitialMountRef.current = false;
    
    // Cleanup
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [language, refreshCounter]);
  
  // Listen for global language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        // Set transitioning state
        setIsTransitioning(true);
        
        // Store pending update
        pendingLanguageUpdate.current = newLanguage;
        
        // Update DOM first
        if (contentRef.current) {
          contentRef.current.setAttribute('data-language', newLanguage);
          contentRef.current.setAttribute('data-transition', 'true');
        }
        
        // Clear any existing timeouts
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
        
        // Apply update after delay
        transitionTimeoutRef.current = setTimeout(() => {
          languageRef.current = newLanguage as LanguageCode;
          setPageRenderKey(`${stableKeyRef.current}-${newLanguage}-${Date.now()}`);
          pendingLanguageUpdate.current = null;
          
          // End transition after rendering
          requestAnimationFrame(() => {
            setIsTransitioning(false);
            if (contentRef.current) {
              contentRef.current.setAttribute('data-transition', 'false');
            }
          });
        }, 50);
      }
    };
    
    // Add event listeners
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      // Cleanup listeners
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  return (
    <motion.div
      ref={contentRef}
      key={pageRenderKey}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.2 }}
      data-language={languageRef.current}
      data-page={pageKey}
      data-transition={isTransitioning.toString()}
      className={`w-full ${isTransitioning ? 'pointer-events-none' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default PageTranslationWrapper;
