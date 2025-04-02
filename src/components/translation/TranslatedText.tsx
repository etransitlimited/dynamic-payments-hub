
import React, { useEffect, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { CSSProperties } from "react";

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
  const overflowStyles: CSSProperties = truncate
    ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: maxLines && maxLines > 1 ? '-webkit-box' : 'block', 
        WebkitLineClamp: maxLines,
        // Fix TypeScript error by using the correct type
        WebkitBoxOrient: 'vertical' as const // Use 'as const' to correctly type this property
      }
    : {};
  
  return (
    <span 
      className={className} 
      style={overflowStyles}
      title={truncate ? translatedText : undefined}
    >
      {translatedText}
    </span>
  );
};

export default TranslatedText;
