
import React, { useEffect, useState, useRef, CSSProperties, memo } from "react";
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
  const { t, language } = useSafeTranslation();
  const [translatedText, setTranslatedText] = useState<string>("");
  const previousKeyName = useRef(keyName);
  const previousLanguage = useRef(language);
  const previousValues = useRef(values);
  const [refreshKey, setRefreshKey] = useState(0); // Add a forced refresh mechanism
  
  useEffect(() => {
    try {
      // Create stable representation of values for comparison
      const valuesString = values ? JSON.stringify(values) : '';
      const prevValuesString = previousValues.current ? JSON.stringify(previousValues.current) : '';
      
      // Check if any dependency has changed
      const dependenciesChanged = 
        keyName !== previousKeyName.current || 
        language !== previousLanguage.current || 
        valuesString !== prevValuesString;
      
      if (dependenciesChanged) {
        // Add more debug logging
        if (process.env.NODE_ENV !== 'production') {
          console.log(`TranslatedText: Updating translation for key "${keyName}" in language "${language}"${values ? ` with values: ${JSON.stringify(values)}` : ''}`);
        }
        
        // Get translation with fallbacks and values
        const finalText = t(keyName, fallback || keyName, values);
        
        // Log debug info in development environment
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[TranslatedText] Key: "${keyName}", Result: "${finalText}", Language: ${language}`);
        }
        
        // Update the translated text
        setTranslatedText(finalText);
        
        // Update refs for next comparison
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
        
        // Force refresh to ensure rendering updates
        setRefreshKey(prev => prev + 1);
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // Show something reasonable when there's an error
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, t, language, values]);
  
  // Apply text overflow handling styles (if needed)
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
    if (['zh-CN', 'zh-TW'].includes(language)) {
      // Chinese fonts slightly larger
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      // French fonts slightly smaller
      return 'text-[95%]';
    }
    return '';
  };
  
  return (
    <span 
      className={`${className} ${getLangClass()} transition-opacity duration-200`}
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
      data-language={language}
      data-key={keyName}
      key={`${keyName}-${language}-${refreshKey}`} // Add key to ensure component rerenders when language changes
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
