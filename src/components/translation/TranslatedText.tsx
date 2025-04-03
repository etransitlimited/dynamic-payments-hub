
import React, { useEffect, useState, useRef, CSSProperties } from "react";
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
 * A component that handles translations and provides fallback for missing keys
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
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
  
  useEffect(() => {
    try {
      // Create a stable representation of values for comparison
      const valuesString = values ? JSON.stringify(values) : '';
      const prevValuesString = previousValues.current ? JSON.stringify(previousValues.current) : '';
      
      // Check if any dependencies have changed
      const dependenciesChanged = 
        keyName !== previousKeyName.current || 
        language !== previousLanguage.current || 
        valuesString !== prevValuesString;
      
      if (dependenciesChanged) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`TranslatedText: Updating translation for key "${keyName}" in language "${language}"`, values ? `with values: ${JSON.stringify(values)}` : '');
        }
        
        // Get translation with fallback and values
        const finalText = t(keyName, fallback, values);
        
        // Debug log in development
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[TranslatedText] Key: "${keyName}", Result: "${finalText}", Language: ${language}`);
        }
        
        // Special handling for debugging - if the translation is the same as the key
        // and we have a fallback, use the fallback directly
        if (finalText === keyName && fallback) {
          setTranslatedText(fallback);
        } else {
          setTranslatedText(finalText);
        }
        
        // Update refs
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // In case of error, still show something reasonable
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, t, language, values]);
  
  // Apply text overflow handling styles if needed
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
      // Slightly larger font for Chinese due to character complexity
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      // Slightly smaller font for French due to word length
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
    >
      {translatedText || fallback || keyName}
    </span>
  );
};

export default TranslatedText;
