
import React, { useEffect, useState, CSSProperties } from "react";
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
  
  useEffect(() => {
    try {
      // Get translation with fallback
      const displayText = t(keyName, fallback);
      
      // Handle variable replacement if values are provided
      let finalText = displayText || fallback || keyName;
      if (values && typeof finalText === 'string') {
        Object.entries(values).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          finalText = finalText.replace(regex, String(value));
        });
      }
      
      setTranslatedText(finalText);
      
      // Log translation info in development for debugging
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[TranslatedText] Key: "${keyName}", Language: "${language}", Result: "${finalText}"`);
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, t, language, values]);
  
  // Apply text overflow handling styles if needed
  const overflowStyles: CSSProperties = {};
  
  if (truncate) {
    overflowStyles.overflow = 'hidden';
    overflowStyles.textOverflow = 'ellipsis';
    
    if (maxLines && maxLines > 1) {
      overflowStyles.display = '-webkit-box';
      overflowStyles.WebkitLineClamp = maxLines;
      // Use the correct type for WebkitBoxOrient
      overflowStyles.WebkitBoxOrient = 'vertical';
    } else {
      overflowStyles.whiteSpace = 'nowrap';
      overflowStyles.display = 'block';
    }
  }
  
  return (
    <span 
      className={className} 
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
      data-language={language}
      data-key={keyName}
    >
      {translatedText}
    </span>
  );
};

export default TranslatedText;
