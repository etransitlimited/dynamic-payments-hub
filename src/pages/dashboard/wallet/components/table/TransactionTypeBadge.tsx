
import React, { useEffect, useState } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import TranslatedText from '@/components/translation/TranslatedText';

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`badge-${type}-${currentLanguage}`);
  
  useEffect(() => {
    setUniqueKey(`badge-${type}-${currentLanguage}-${Date.now()}`);
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

  // 修复：使用正确的翻译键名，使用 transactions 命名空间
  const getTranslationKey = () => {
    const typeLower = type.toLowerCase();
    // 首先尝试 wallet.fundDetails.type* 格式
    const walletKey = `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`;
    // 同时尝试 transactions 命名空间作为备选方案
    const transactionKey = `transactions.${typeLower}`;
    
    // 通过检查两种可能的键名来支持不同格式的翻译文件
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Trying translation keys: ${walletKey} or ${transactionKey}`);
    }
    
    return walletKey;
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center min-w-[80px]`}
      key={uniqueKey}
      data-language={currentLanguage}
    >
      <TranslatedText 
        keyName={getTranslationKey()} 
        fallback={type.charAt(0).toUpperCase() + type.slice(1)}
        key={`type-${type}-${currentLanguage}-${language}`}
      />
    </span>
  );
};

export default TransactionTypeBadge;
