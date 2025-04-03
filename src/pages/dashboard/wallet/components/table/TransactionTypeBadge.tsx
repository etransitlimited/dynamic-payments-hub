
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
  
  // Force refresh when language or type changes
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

  // Enhanced translation key lookup logic with better validation
  const getTranslationKey = () => {
    const typeLower = type.toLowerCase();
    
    // Try different key patterns in order of preference with improved logging
    const possibleKeys = [
      // Direct translations from transactions namespace
      `transactions.${typeLower}`,
      
      // Wallet-specific transaction types 
      `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`,
      
      // Common/fallback keys
      `common.${typeLower}`
    ];
    
    // Find first key that has a valid translation
    for (const key of possibleKeys) {
      const translation = t(key, '', {});
      if (translation && translation !== key && translation !== '') {
        console.log(`Using translation key "${key}" for type "${typeLower}": "${translation}"`);
        return key;
      }
    }
    
    // Fallback to transactions namespace
    console.log(`No valid translation found, using fallback key "transactions.${typeLower}"`);
    return `transactions.${typeLower}`;
  };

  const translationKey = getTranslationKey();
  const fallbackText = type.charAt(0).toUpperCase() + type.slice(1);

  // Enhanced badge with better size adjustments for different languages
  const getBadgeClasses = () => {
    let classes = `px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center`;
    
    // Adjust width based on language
    if (language === 'fr' || language === 'es') {
      classes += ' min-w-[90px]'; // More space for longer French/Spanish words
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      classes += ' min-w-[70px]'; // Less space for Chinese characters
    } else {
      classes += ' min-w-[80px]'; // Default for English
    }
    
    return classes;
  };

  return (
    <span 
      className={getBadgeClasses()}
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
