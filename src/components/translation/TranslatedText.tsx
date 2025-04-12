
import React, { useEffect, useState, useRef, CSSProperties, memo, useCallback } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useLanguage } from "@/context/LanguageContext";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

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
  const stableLanguage = useRef<LanguageCode>(language as LanguageCode);
  const [translatedText, setTranslatedText] = useState<string>("");
  const isUpdating = useRef(false);
  const componentId = useRef(`trans-${Math.random().toString(36).substring(2, 9)}`);
  
  // Update translation without triggering re-renders
  const updateTranslation = useCallback((newLanguage: LanguageCode = stableLanguage.current) => {
    if (isUpdating.current) return;
    
    isUpdating.current = true;
    try {
      // Get direct translation for maximum reliability
      const directTranslation = getDirectTranslation(keyName, newLanguage, fallback);
      
      // Format the translated text with values if needed
      let formattedText = directTranslation;
      if (values && directTranslation !== keyName) {
        formattedText = Object.entries(values).reduce((result, [key, value]) => {
          const pattern = new RegExp(`\\{${key}\\}`, 'g');
          return result.replace(pattern, String(value));
        }, directTranslation);
      }
      
      // Only update state if text is different (reduces re-renders)
      if (formattedText !== translatedText) {
        setTranslatedText(formattedText);
        
        // Also update the DOM directly for immediate feedback
        if (spanRef.current) {
          spanRef.current.textContent = formattedText;
          spanRef.current.setAttribute('data-language', newLanguage);
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
  }, [keyName, fallback, values, translatedText]);
  
  // Update stable language reference when language changes
  useEffect(() => {
    if (language !== stableLanguage.current) {
      stableLanguage.current = language as LanguageCode;
      updateTranslation(language as LanguageCode);
    }
  }, [language, updateTranslation]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage !== stableLanguage.current) {
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
  
  // Initial translation on mount
  useEffect(() => {
    updateTranslation();
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
      title={truncate ? translatedText : undefined}
      data-language={stableLanguage.current}
      data-key={keyName}
      data-component-id={componentId.current}
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
