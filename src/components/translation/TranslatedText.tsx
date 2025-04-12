
import React from 'react';
import { translationToString } from '@/utils/translationString';
import { useTranslation } from '@/context/TranslationProvider';

interface TranslatedTextProps {
  keyName: string;
  fallback?: string;
  values?: Record<string, string | number>;
  className?: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  keyName, 
  fallback = '', 
  values,
  className
}) => {
  const { translate } = useTranslation();
  
  const translatedText = translate(keyName, fallback, values);
  const safeText = translationToString(translatedText, fallback);
  
  return <span className={className}>{safeText}</span>;
};

export default TranslatedText;
