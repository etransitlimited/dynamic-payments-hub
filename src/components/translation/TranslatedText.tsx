
import React, { useEffect, useState, useRef, CSSProperties, memo, useCallback } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { translationToString } from "@/utils/translationString";

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
  truncate?: boolean;
  maxLines?: number;
}

/**
 * Component that handles translations and provides fallbacks for missing keys
 */
const TranslatedText: React.FC<TranslatedTextProps> = memo(({ 
  keyName, 
  fallback, 
  className = "",
  values,
  truncate = false,
  maxLines
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const stableLanguage = useRef<LanguageCode>(language as LanguageCode);
  const [translatedText, setTranslatedText] = useState<string>("");
  const isUpdating = useRef(false);
  const componentId = useRef(`trans-${Math.random().toString(36).substring(2, 9)}`);
  const prevTranslation = useRef<string>("");
  
  // Update translation without triggering re-renders
  const updateTranslation = useCallback((newLanguage: LanguageCode = stableLanguage.current) => {
    if (isUpdating.current) return;
    
    isUpdating.current = true;
    try {
      let formattedText = "";
      
      if (values) {
        // 使用带插值参数的翻译
        const translationResult = t(keyName, {...values, defaultValue: fallback || keyName});
        formattedText = translationToString(translationResult, fallback || keyName);
      } else {
        // 使用无参数的翻译
        const translationResult = t(keyName, {defaultValue: fallback || keyName});
        formattedText = translationToString(translationResult, fallback || keyName);
      }
      
      // Only update state if text is different (reduces re-renders)
      if (formattedText !== prevTranslation.current) {
        prevTranslation.current = formattedText;
        setTranslatedText(formattedText);
        
        // Also update the DOM directly for immediate feedback
        if (spanRef.current) {
          spanRef.current.textContent = formattedText;
          spanRef.current.setAttribute('data-language', newLanguage);
          spanRef.current.setAttribute('data-updated', Date.now().toString());
        }
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // Show fallback when there's an error
      setTranslatedText(fallback || keyName);
      
      // Update the DOM directly for immediate feedback
      if (spanRef.current) {
        spanRef.current.textContent = fallback || keyName;
      }
    } finally {
      isUpdating.current = false;
    }
  }, [keyName, fallback, values, t]);
  
  // Initial translation on mount and when dependencies change
  useEffect(() => {
    updateTranslation(language as LanguageCode);
    
    // Update stable language reference when language changes
    if (language !== stableLanguage.current) {
      stableLanguage.current = language as LanguageCode;
    }
  }, [language, updateTranslation]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== stableLanguage.current) {
        stableLanguage.current = newLanguage as LanguageCode;
        updateTranslation(newLanguage as LanguageCode);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [updateTranslation]);
  
  // Apply text overflow handling styles
  const overflowStyles: CSSProperties = {};
  
  if (truncate) {
    if (maxLines && maxLines > 1) {
      overflowStyles.overflow = 'hidden';
      overflowStyles.textOverflow = 'ellipsis';
      overflowStyles.display = '-webkit-box';
      overflowStyles.WebkitLineClamp = maxLines;
      overflowStyles.WebkitBoxOrient = 'vertical' as const;
    } else {
      overflowStyles.overflow = 'hidden';
      overflowStyles.textOverflow = 'ellipsis';
      overflowStyles.whiteSpace = 'nowrap';
      overflowStyles.maxWidth = '100%';
    }
  }
  
  // Apply language-specific font adjustments
  const getLangClass = () => {
    if (['zh-CN', 'zh-TW'].includes(stableLanguage.current)) {
      return 'text-[102%]'; 
    } else if (stableLanguage.current === 'fr') {
      return 'text-[97%]';
    } else if (stableLanguage.current === 'es') {
      return 'text-[98%]';
    }
    return '';
  };
  
  return (
    <span 
      ref={spanRef}
      className={`${className} ${getLangClass()} transition-opacity duration-200`}
      style={overflowStyles}
      data-component="translated-text"
      data-key={keyName}
      data-language={stableLanguage.current}
      data-id={componentId.current}
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
