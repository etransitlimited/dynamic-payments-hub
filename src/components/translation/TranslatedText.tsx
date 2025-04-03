
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
  
  useEffect(() => {
    try {
      // Only update if key or language has changed to prevent unnecessary renders
      if (keyName !== previousKeyName.current || language !== previousLanguage.current) {
        // Get translation with fallback and values
        const finalText = t(keyName, fallback, values);
        
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
        
        // Log translation info in development for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[TranslatedText] Key: "${keyName}", Language: "${language}", Result: "${finalText}"`);
        }
      } else if (values) {
        // If only values have changed, get the translation again
        const finalText = t(keyName, fallback, values);
        setTranslatedText(finalText);
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
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
