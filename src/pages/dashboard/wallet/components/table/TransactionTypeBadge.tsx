
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import TranslatedText from '@/components/translation/TranslatedText';

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`badge-${type}-${currentLanguage}-${language}-${Date.now()}`);
  
  // Force refresh when language changes to ensure proper rendering
  useEffect(() => {
    setUniqueKey(`badge-${type}-${currentLanguage}-${language}-${Date.now()}`);
    console.log(`TransactionTypeBadge re-rendered: type=${type}, language context=${language}, prop language=${currentLanguage}`);
  }, [type, currentLanguage, language, refreshCounter]);

  const getTypeColor = useCallback(() => {
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
  }, [type]);

  // Try multiple translation keys to find the best match
  const getTranslationKey = useCallback(() => {
    const typeLower = type.toLowerCase();
    
    // First try direct transaction type key (most specific)
    const directKey = `transactions.${typeLower}`;
    
    // Fallback keys in order of preference
    const fallbackKeys = [
      `wallet.fundDetails.type${typeLower.charAt(0).toUpperCase() + typeLower.slice(1)}`,
      `common.${typeLower}`
    ];
    
    // Return the most specific key for the TranslatedText component to handle
    return directKey;
  }, [type]);

  // Enhanced badge with language-specific size adjustments
  const getBadgeClasses = useCallback(() => {
    let classes = `px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center`;
    
    // Adjust width based on language for better appearance
    if (language === 'fr' || currentLanguage === 'fr') {
      classes += ' min-w-[90px]'; // French needs more space
    } else if (language === 'es' || currentLanguage === 'es') {
      classes += ' min-w-[85px]'; // Spanish needs moderate space
    } else if (['zh-CN', 'zh-TW'].includes(language) || ['zh-CN', 'zh-TW'].includes(currentLanguage)) {
      classes += ' min-w-[70px]'; // Chinese needs less space
    } else {
      classes += ' min-w-[80px]'; // Default for English
    }
    
    return classes;
  }, [getTypeColor, language, currentLanguage]);

  const translationKey = getTranslationKey();
  const fallbackText = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <span 
      className={getBadgeClasses()}
      key={uniqueKey}
      data-language={currentLanguage}
      data-context-language={language}
      data-type={type.toLowerCase()}
      data-key={translationKey}
    >
      <TranslatedText 
        keyName={translationKey} 
        fallback={fallbackText}
      />
    </span>
  );
};

export default memo(TransactionTypeBadge);
