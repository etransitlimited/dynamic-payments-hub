
import React, { useEffect, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  className?: string;
  values?: Record<string, string | number>;
}

/**
 * A component that handles translations and provides fallback for missing keys
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  keyName, 
  fallback, 
  className,
  values 
}) => {
  const { t, language } = useSafeTranslation();
  const [translatedText, setTranslatedText] = useState<string>("");
  
  useEffect(() => {
    // Get translation with fallback
    const displayText = t(keyName);
    
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
  }, [keyName, fallback, t, language, values]);
  
  return <span className={className}>{translatedText}</span>;
};

export default TranslatedText;
