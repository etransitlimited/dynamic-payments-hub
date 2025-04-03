
import React, { useState, useEffect } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { getTransactionTranslation } from '../i18n';

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`type-badge-${type}-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TypeBadge language updated to: ${language} for type: ${type}`);
    setUniqueKey(`type-badge-${type}-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, type, refreshCounter]);
  
  // Get translation directly to guarantee update
  const typeTranslation = getTransactionTranslation(`type${type.charAt(0).toUpperCase() + type.slice(1)}`, language);
  
  const getTypeColor = () => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'withdrawal':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'transfer':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'payment':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'exchange':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'expense':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  // Adjust min-width based on language for better appearance
  const getMinWidth = () => {
    if (language === 'fr') {
      return 'min-w-[90px]'; // French needs more space
    } else if (language === 'es') {
      return 'min-w-[85px]'; // Spanish needs moderate space
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'min-w-[70px]'; // Chinese needs less space
    } else {
      return 'min-w-[80px]'; // Default for English
    }
  };

  return (
    <span 
      key={uniqueKey}
      className={`px-2 py-1 rounded-full text-xs ${getTypeColor()} border inline-flex items-center justify-center ${getMinWidth()}`}
      data-language={language}
      data-type={type.toLowerCase()}
    >
      {typeTranslation}
    </span>
  );
};

export default TypeBadge;
