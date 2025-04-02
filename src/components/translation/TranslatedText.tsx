
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
    // Always provide the fallback to the translation function
    let displayText = t(keyName, fallback || keyName);
    
    // Handle variable replacement if values are provided
    if (values && typeof displayText === 'string') {
      Object.entries(values).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        displayText = displayText.replace(regex, String(value));
      });
    }
    
    setTranslatedText(displayText);
    
    // Log translation info in development
    if (process.env.NODE_ENV !== 'production') {
      if (displayText === fallback && fallback !== keyName) {
        console.log(`Translation fallback used for key: "${keyName}" in language: "${language}"`);
      }
    }
  }, [keyName, fallback, t, language, values]);
  
  return <span className={className}>{translatedText}</span>;
};

export default TranslatedText;
