
import React, { useEffect, useState, useRef, CSSProperties, memo, useCallback } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

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
  const [translatedText, setTranslatedText] = useState<string>("");
  const previousKeyName = useRef(keyName);
  const previousLanguage = useRef(language);
  const previousValues = useRef(values);
  const componentId = useRef(`trans-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const [refreshKey, setRefreshKey] = useState(Date.now()); // Forced refresh mechanism
  
  const updateTranslation = useCallback(() => {
    try {
      // Create stable representation of values for comparison
      const valuesString = values ? JSON.stringify(values) : '';
      const prevValuesString = previousValues.current ? JSON.stringify(previousValues.current) : '';
      
      // Check if any dependency has changed
      const dependenciesChanged = 
        keyName !== previousKeyName.current || 
        language !== previousLanguage.current || 
        valuesString !== prevValuesString ||
        refreshCounter; // Add dependency on refreshCounter
      
      if (dependenciesChanged) {
        // Get translation with fallbacks and values
        const finalText = t(keyName, fallback || keyName, values);
        
        // Log translation process for debugging
        console.log(`[TranslatedText:${componentId.current}] Key: ${keyName}, Language: ${language}, Result: ${finalText}`);
        
        // Update the translated text
        setTranslatedText(finalText);
        
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
  }, [keyName, fallback, t, language, values, refreshCounter]);
  
  // Update translation when dependencies change
  useEffect(() => {
    updateTranslation();
    
    // Add a small delay and update again to ensure language changes are caught
    const timer = setTimeout(() => {
      updateTranslation();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [keyName, language, values, refreshCounter, updateTranslation]);
  
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
      return 'text-[95%]';
    } else if (language === 'es') {
      // Spanish fonts may need size adjustment
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
      data-instance-id={instanceId}
      data-component-id={componentId.current}
      key={`${keyName}-${language}-${refreshKey}-${refreshCounter}`} // Add key to ensure component rerenders when language changes
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
