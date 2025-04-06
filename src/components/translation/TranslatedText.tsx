
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
  const previousLanguage = useRef(language);
  const previousValues = useRef(values);
  const componentId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const translationStartTime = useRef(Date.now());
  const translationAttempts = useRef(0);
  const skipRender = useRef(false);
  
  const updateTranslation = useCallback(() => {
    try {
      // Skip unnecessary updates
      if (skipRender.current) {
        skipRender.current = false;
        return;
      }
      
      // Track translation attempt
      translationAttempts.current += 1;
      
      // Try direct translation for maximum reliability
      const directTranslation = getDirectTranslation(keyName, language as LanguageCode, fallback);
      
      // Format the translated text with values if needed
      const formattedText = values && directTranslation !== keyName ? 
        Object.entries(values).reduce((result, [key, value]) => {
          return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
        }, directTranslation) : directTranslation;
      
      // Only update if text is different to reduce renders
      if (formattedText !== translatedText) {
        setTranslatedText(formattedText);
        
        // Update refs for next comparison
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // Show fallback when there's an error
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, language, values, translatedText]);
  
  // Reset counters when dependencies change
  useEffect(() => {
    if (keyName !== previousKeyName.current || 
        language !== previousLanguage.current ||
        JSON.stringify(values) !== JSON.stringify(previousValues.current)) {
      translationAttempts.current = 0;
      translationStartTime.current = Date.now();
      skipRender.current = false;
    }
  }, [keyName, language, values]);
  
  // Update translation when dependencies change
  useEffect(() => {
    updateTranslation();
    
    // Single focused update after small delay
    const timer = setTimeout(updateTranslation, 50);
    
    return () => {
      clearTimeout(timer);
    };
  }, [keyName, language, values, lastUpdate, updateTranslation]);
  
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
    if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      return 'text-[97%]';
    } else if (language === 'es') {
      return 'text-[98%]';
    }
    return '';
  }, [language]);
  
  return (
    <span 
      className={`${className} ${getLangClass()} transition-opacity duration-200`}
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
      data-language={language}
      data-key={keyName}
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
