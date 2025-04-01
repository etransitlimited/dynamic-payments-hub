
import React from "react";
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
  const { t } = useSafeTranslation();
  
  const text = t(keyName);
  // We check if the translation is the same as the key, which indicates a missing translation
  const displayText = text === keyName && fallback ? fallback : text;
  
  return <span className={className}>{displayText}</span>;
};

export default TranslatedText;
