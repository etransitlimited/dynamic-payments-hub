
import React, { memo, useMemo } from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { language } = useSafeTranslation();
  
  // Memoize status class to avoid recalculations
  const statusClass = useMemo(() => {
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
  }, [status]);
  
  // Get translated status using our direct translation utility
  const translatedStatus = useMemo(() => {
    const statusKey = status.toLowerCase();
    
    if (statusKey === 'pending') {
      return getDirectTranslation("status.pending", language, "Pending");
    }
    
    if (statusKey === 'completed' || statusKey === 'approved') {
      return getDirectTranslation("status.approved", language, "Approved");
    }
    
    if (statusKey === 'failed' || statusKey === 'rejected') {
      return getDirectTranslation("status.rejected", language, "Rejected");
    }
    
    return status;
  }, [status, language]);
  
  return (
    <span 
      className={`inline-block px-2 py-1 text-xs rounded-full border ${statusClass}`}
      data-status={status}
      data-language={language}
    >
      {translatedStatus}
    </span>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(StatusBadge);
