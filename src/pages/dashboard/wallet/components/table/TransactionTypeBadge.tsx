
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
      case 'withdrawal':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'payment':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  // Enhanced translation key lookup logic
  const getTranslationKey = () => {
    const typeLower = type.toLowerCase();
    
    // Try different key patterns in order of preference
    const possibleKeys = [
      // Direct translations from transactions namespace
      `transactions.${typeLower}`,
      
      // Wallet-specific transaction types 
      `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`,
      
      // Common/fallback keys
      `common.${typeLower}`
    ];
    
    // Find first key that has a translation
    for (const key of possibleKeys) {
      const translation = t(key, '', {});
      if (translation && translation !== key) {
        console.log(`Using translation key "${key}" for type "${typeLower}": "${translation}"`);
        return key;
      }
    }
    
    // Fallback to transactions namespace
    return `transactions.${typeLower}`;
  };

  const translationKey = getTranslationKey();
  const fallbackText = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center min-w-[80px]`}
      key={uniqueKey}
      data-language={currentLanguage}
      data-type={type.toLowerCase()}
      data-key={translationKey}
    >
      <TranslatedText 
        keyName={translationKey} 
        fallback={fallbackText}
        key={`type-${type}-${currentLanguage}-${language}-${Date.now()}`}
      />
    </span>
  );
};

export default TransactionTypeBadge;
