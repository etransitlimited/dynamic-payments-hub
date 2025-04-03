
import React, { useEffect, useState } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import TranslatedText from '@/components/translation/TranslatedText';

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
  const { language, t } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`badge-${type}-${currentLanguage}`);
  
  useEffect(() => {
    setUniqueKey(`badge-${type}-${currentLanguage}-${language}-${Date.now()}`);
  }, [type, currentLanguage, language]);

  const getTypeColor = () => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'expense':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'transfer':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  // 增强翻译键查找逻辑，按优先级尝试多种可能的键
  const getTranslationText = () => {
    const typeLower = type.toLowerCase();
    const fallbackText = type.charAt(0).toUpperCase() + type.slice(1);
    
    // 尝试不同格式的翻译键
    const keys = [
      `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`,
      `transactions.${typeLower}`,
      `wallet.fundDetails.${typeLower}`,
      `common.${typeLower}`
    ];
    
    // 检查哪个键有值
    for (const key of keys) {
      const translation = t(key, '', {});
      if (translation && translation !== key) {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Found translation for "${key}": "${translation}"`);
        }
        return { keyName: key, hasValue: true };
      }
    }
    
    // 如果所有键都没有值，返回第一个键作为默认值
    return { keyName: keys[0], hasValue: false };
  };

  const { keyName, hasValue } = getTranslationText();

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center min-w-[80px]`}
      key={uniqueKey}
      data-language={currentLanguage}
      data-type={type.toLowerCase()}
    >
      <TranslatedText 
        keyName={keyName} 
        fallback={type.charAt(0).toUpperCase() + type.slice(1)}
        key={`type-${type}-${currentLanguage}-${language}-${Date.now()}`}
      />
    </span>
  );
};

export default TransactionTypeBadge;
