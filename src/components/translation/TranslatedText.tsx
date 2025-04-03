
import React, { useEffect, useState, useRef, CSSProperties, memo } from "react";
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
const TranslatedText: React.FC<TranslatedTextProps> = memo(({ 
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
  const [refreshKey, setRefreshKey] = useState(0); // 添加强制刷新的机制
  
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
        // 添加更多调试日志
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
        
        // 更新refs以便下次比较
        previousKeyName.current = keyName;
        previousLanguage.current = language;
        previousValues.current = values;
        
        // 强制刷新以确保渲染更新
        setRefreshKey(prev => prev + 1);
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
      // 中文字体稍大
      return 'text-[102%]'; 
    } else if (language === 'fr') {
      // 法语字体稍小
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
      key={`${keyName}-${language}-${refreshKey}`} // 添加key以确保组件在语言变化时重新渲染
    >
      {translatedText || fallback || keyName}
    </span>
  );
});

TranslatedText.displayName = 'TranslatedText';

export default TranslatedText;
