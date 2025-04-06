
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
  const { lastUpdate } = useLanguage(); // Get the lastUpdate from context
  const [translatedText, setTranslatedText] = useState<string>("");
  const previousKeyName = useRef(keyName);
  const previousLanguage = useRef(language);
  const previousValues = useRef(values);
  const componentId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const [refreshKey, setRefreshKey] = useState(Date.now()); // Forced refresh mechanism
  const translationStartTime = useRef(Date.now());
  const translationAttempts = useRef(0);
  
  const updateTranslation = useCallback(() => {
    try {
      // Create stable representation of values for comparison
      const valuesString = values ? JSON.stringify(values) : '';
      const prevValuesString = previousValues.current ? JSON.stringify(previousValues.current) : '';
      
      // Track translation attempt
      translationAttempts.current += 1;
      
      // Try direct translation first for maximum reliability
      const directTranslation = getDirectTranslation(keyName, language as LanguageCode, fallback);
      
      // If direct translation successful or we've tried too many times, use what we have
      const shouldUseDirectTranslation = 
        directTranslation !== keyName || 
        translationAttempts.current > 3 ||
        (Date.now() - translationStartTime.current > 1500);
        
      // Use direct translation or fallback to t function
      const finalText = shouldUseDirectTranslation ? 
        directTranslation : 
        t(keyName, fallback || keyName, values);
      
      // Format the translated text with values if needed
      const formattedText = values && finalText !== keyName ? 
        Object.entries(values).reduce((result, [key, value]) => {
          return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
        }, finalText) : finalText;
      
      // Only update if text is different to reduce renders
      if (formattedText !== translatedText) {
        setTranslatedText(formattedText);
        
        // Update refs for next comparison
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
        
        // Force refresh to ensure rendering updates
        setRefreshKey(Date.now());
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // Show fallback when there's an error
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, t, language, values, translatedText]);
  
  // Reset counters when dependencies change
  useEffect(() => {
    if (keyName !== previousKeyName.current || 
        language !== previousLanguage.current ||
        JSON.stringify(values) !== JSON.stringify(previousValues.current)) {
      translationAttempts.current = 0;
      translationStartTime.current = Date.now();
    }
  }, [keyName, language, values]);
  
  // Update translation when dependencies change
  useEffect(() => {
    updateTranslation();
    
    // Add multiple retry attempts with staggered delays
    const timers = [
      setTimeout(updateTranslation, 50),
      setTimeout(updateTranslation, 200),
      setTimeout(updateTranslation, 500)
    ];
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [keyName, language, values, refreshCounter, lastUpdate, updateTranslation]);
  
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
      // Chinese fonts slightly larger
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      // French fonts slightly smaller
      return 'text-[97%]';
    } else if (language === 'es') {
      // Spanish fonts may need size adjustment
      return 'text-[98%]';
    }
    return '';
  }, [language]);
  
  // Create a key that will force re-render when needed
  const componentKey = `${keyName}-${language}-${refreshKey}-${refreshCounter}`;
  
  return (
    <span 
      className={`${className} ${getLangClass()} transition-opacity duration-200`}
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
      data-language={language}
      data-key={keyName}
      data-instance-id={instanceId}
      data-component-id={componentId.current}
      key={componentKey}
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
