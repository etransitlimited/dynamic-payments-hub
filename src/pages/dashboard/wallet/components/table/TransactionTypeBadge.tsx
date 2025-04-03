
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ 
  type, 
  currentLanguage,
  getTranslation
}) => {
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
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  }, [type]);

  // Get translated type text
  const getTypeText = useCallback(() => {
    if (getTranslation) {
      const translationKey = `transactionTypes.${type.toLowerCase()}`;
      return getTranslation(translationKey);
    }
    
    // Default fallback handling
    return type.charAt(0).toUpperCase() + type.slice(1);
  }, [type, getTranslation]);

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

  return (
    <span 
      className={getBadgeClasses()}
      key={uniqueKey}
      data-language={currentLanguage}
      data-context-language={language}
      data-type={type.toLowerCase()}
    >
      {getTypeText()}
    </span>
  );
};

export default memo(TransactionTypeBadge);
