
import React, { useState, useEffect } from 'react';
import { useSafeTranslation } from '@/hooks/use-safe-translation';
import { getTransactionTranslation } from '../i18n';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`status-badge-${status}-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`StatusBadge language updated to: ${language} for status: ${status}`);
    setUniqueKey(`status-badge-${status}-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, status, refreshCounter]);
  
  // Get translation directly to guarantee update
  const statusTranslation = getTransactionTranslation(`status${status.charAt(0).toUpperCase() + status.slice(1)}`, language);
  
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
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
      className={`px-2 py-1 rounded-full text-xs ${getStatusColor()} border inline-flex items-center justify-center ${getMinWidth()}`}
      data-language={language}
      data-status={status.toLowerCase()}
    >
      {statusTranslation}
    </span>
  );
};

export default StatusBadge;
