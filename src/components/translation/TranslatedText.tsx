
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
 * 处理翻译并为缺失的键提供回退的组件
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
      // 创建值的稳定表示用于比较
      const valuesString = values ? JSON.stringify(values) : '';
      const prevValuesString = previousValues.current ? JSON.stringify(previousValues.current) : '';
      
      // 检查是否有任何依赖项发生变化
      const dependenciesChanged = 
        keyName !== previousKeyName.current || 
        language !== previousLanguage.current || 
        valuesString !== prevValuesString;
      
      if (dependenciesChanged) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`TranslatedText: Updating translation for key "${keyName}" in language "${language}"${values ? ` with values: ${JSON.stringify(values)}` : ''}`);
        }
        
        // 获取带有回退和值的翻译
        const finalText = t(keyName, fallback || keyName, values);
        
        // 在开发环境中记录调试信息
        if (process.env.NODE_ENV !== 'production') {
          console.log(`[TranslatedText] Key: "${keyName}", Result: "${finalText}", Language: ${language}`);
        }
        
        // 更新翻译文本
        setTranslatedText(finalText);
        
        // 更新refs
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
      }
    } catch (error) {
      console.error(`[TranslatedText] Error translating key "${keyName}":`, error);
      // 出错时仍显示合理的内容
      setTranslatedText(fallback || keyName);
    }
  }, [keyName, fallback, t, language, values]);
  
  // 应用文本溢出处理样式（如需要）
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
  
  // 应用语言特定的字体调整
  const getLangClass = () => {
    if (['zh-CN', 'zh-TW'].includes(language)) {
      // 由于字符复杂性，中文字体稍大
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      // 由于单词长度，法语字体稍小
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
