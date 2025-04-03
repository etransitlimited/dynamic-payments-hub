
import React, { useEffect, useState } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import TranslatedText from '@/components/translation/TranslatedText';

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
  const { language, t } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`badge-${type}-${currentLanguage}-${language}-${Date.now()}`);
  
  // Force refresh when any language or type changes to ensure proper rendering
  useEffect(() => {
    setUniqueKey(`badge-${type}-${currentLanguage}-${language}-${Date.now()}`);
    console.log(`TransactionTypeBadge re-rendered: type=${type}, context language=${language}, prop language=${currentLanguage}`);
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
      case 'exchange':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'card':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'activation':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  // Improved translation key lookup with better prioritization
  const getTranslationKey = () => {
    const typeLower = type.toLowerCase();
    
    // Direct transaction type key - always highest priority
    const directKey = `transactions.${typeLower}`;
    const directTranslation = t(directKey, '', {});
    
    if (directTranslation && directTranslation !== directKey) {
      return directKey;
    }
    
    // Alternative keys if direct key doesn't work
    const alternativeKeys = [
      `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`,
      `common.${typeLower}`
    ];
    
    for (const key of alternativeKeys) {
      const translation = t(key, '', {});
      if (translation && translation !== key && translation !== '') {
        return key;
      }
    }
    
    // Always fallback to transactions namespace
    return directKey;
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
