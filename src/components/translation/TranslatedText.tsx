
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
  const { t, language, refreshCounter, instanceId } = useSafeTranslation();
  const { lastUpdate } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>("");
  const previousKeyName = useRef(keyName);
  const previousLanguage = useRef<LanguageCode>(language as LanguageCode);
  const previousValues = useRef(values);
  const componentId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const translationAttempts = useRef(0);
  const stableLanguage = useRef<LanguageCode>(language as LanguageCode);
  const isUpdating = useRef(false);
  
  // Update stable language reference when language changes and force refresh
  useEffect(() => {
    if (language !== stableLanguage.current || lastUpdate) {
      stableLanguage.current = language as LanguageCode;
      setRefreshKey(Date.now());
      updateTranslation();
    }
  }, [language, lastUpdate]);
  
  const updateTranslation = useCallback(() => {
    // Prevent concurrent updates
    if (isUpdating.current) return;
    
    try {
      isUpdating.current = true;
      translationAttempts.current += 1;
      
      // Get direct translation for maximum reliability
      const directTranslation = getDirectTranslation(keyName, stableLanguage.current as LanguageCode, fallback);
      
      // Format the translated text with values if needed
      let formattedText = directTranslation;
      if (values && directTranslation !== keyName) {
        formattedText = Object.entries(values).reduce((result, [key, value]) => {
          const pattern = new RegExp(`\\{${key}\\}`, 'g');
          return result.replace(pattern, String(value));
        }, directTranslation);
      }
      
      // Only update if text is different to reduce renders
      if (formattedText !== translatedText) {
        setTranslatedText(formattedText);
        
        // Update refs for next comparison
        previousKeyName.current = keyName;
        previousLanguage.current = language as LanguageCode;
        previousValues.current = values;
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // Show fallback when there's an error
      setTranslatedText(fallback || keyName);
    } finally {
      isUpdating.current = false;
    }
  }, [keyName, fallback, language, values, translatedText]);
  
  // Listen for global language change events
  useEffect(() => {
    const handleLanguageChange = () => {
      setRefreshKey(Date.now());
      updateTranslation();
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange);
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange);
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [updateTranslation]);
  
  // Update translation when props change
  useEffect(() => {
    if (keyName !== previousKeyName.current || 
        language !== previousLanguage.current ||
        JSON.stringify(values) !== JSON.stringify(previousValues.current)) {
      translationAttempts.current = 0;
      updateTranslation();
    }
  }, [keyName, language, values, updateTranslation]);
  
  // Update translation when refresh counter changes
  useEffect(() => {
    if (refreshCounter > 0) {
      updateTranslation();
    }
  }, [refreshCounter, updateTranslation]);
  
  // Initial translation on mount
  useEffect(() => {
    updateTranslation();
  }, []);
  
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
  const getLangClass = useCallback(() => {
    if (['zh-CN', 'zh-TW'].includes(stableLanguage.current)) {
      return 'text-[102%]'; 
    } else if (stableLanguage.current === 'fr') {
      return 'text-[97%]';
    } else if (stableLanguage.current === 'es') {
      return 'text-[98%]';
    }
    return '';
  }, []);
  
  return (
    <span 
      key={`${componentId.current}-${refreshKey}`}
      className={`${className} ${getLangClass()} transition-opacity duration-200`}
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
      data-language={stableLanguage.current}
      data-key={keyName}
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
