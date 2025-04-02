
import React from "react";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { language } = useSafeTranslation();
  
  const getStatusClass = () => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-600/20 text-amber-300 border-amber-500/20';
      case 'completed':
      case 'approved':
        return 'bg-emerald-600/20 text-emerald-300 border-emerald-500/20';
      case 'failed':
      case 'rejected':
        return 'bg-red-600/20 text-red-300 border-red-500/20';
      default:
        return 'bg-blue-600/20 text-blue-300 border-blue-500/20';
    }
  };
  
  const getTranslatedStatus = () => {
    const statusKey = status.toLowerCase();
    
    if (statusKey === 'pending') {
      if (language === 'zh-CN') return '待处理';
      if (language === 'zh-TW') return '待處理';
      if (language === 'fr') return 'En Attente';
      if (language === 'es') return 'Pendiente';
      return 'Pending';
    }
    
    if (statusKey === 'completed' || statusKey === 'approved') {
      if (language === 'zh-CN') return '已批准';
      if (language === 'zh-TW') return '已批准';
      if (language === 'fr') return 'Approuvée';
      if (language === 'es') return 'Aprobada';
      return 'Approved';
    }
    
    if (statusKey === 'failed' || statusKey === 'rejected') {
      if (language === 'zh-CN') return '已拒绝';
      if (language === 'zh-TW') return '已拒絕';
      if (language === 'fr') return 'Rejetée';
      if (language === 'es') return 'Rechazada';
      return 'Rejected';
    }
    
    return status;
  };
  
  return (
    <span 
      className={`inline-block px-2 py-1 text-xs rounded-full border ${getStatusClass()}`}
      data-status={status}
      data-language={language}
    >
      {getTranslatedStatus()}
    </span>
  );
};

export default StatusBadge;
