
import React from 'react';
import { translationToString } from '@/utils/translationString';

interface TranslatedTextProps {
  value: any;
  fallback?: string;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

/**
 * 安全地显示翻译文本的组件，处理各种类型的翻译返回值
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({
  value,
  fallback = '',
  className = '',
  as: Component = 'span',
  ...rest
}) => {
  const translatedText = translationToString(value, fallback);
  
  return (
    <Component className={className} {...rest}>
      {translatedText}
    </Component>
  );
};

export default TranslatedText;
