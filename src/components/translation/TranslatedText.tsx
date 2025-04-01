
import React, { useEffect, useState } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  className?: string;
}

/**
 * A component that handles translations and provides fallback for missing keys
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  keyName, 
  fallback, 
  className 
}) => {
  const { t, language } = useSafeTranslation();
  const [translatedText, setTranslatedText] = useState<string>("");
  
  useEffect(() => {
    const text = t(keyName);
    // We check if the translation is the same as the key, which indicates a missing translation
    const displayText = text === keyName && fallback ? fallback : text;
    setTranslatedText(displayText);
  }, [keyName, fallback, t, language]);
  
  return <span className={className}>{translatedText}</span>;
};

export default TranslatedText;
