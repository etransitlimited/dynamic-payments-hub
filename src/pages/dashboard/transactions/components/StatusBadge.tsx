
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  // Get consistent translations for status across the app
  const getStatusText = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === "completed") return t("cards.activationTasks.statusCompleted");
    if (lowerStatus === "pending") return t("cards.activationTasks.statusPending");
    if (lowerStatus === "failed") return t("cards.activationTasks.statusFailed");
    if (lowerStatus === "rejected") return t("cards.activationTasks.statusRejected");
    
    // Try to find the status in various namespaces for consistent translations
    const possibleKeys = [
      `cards.activationTasks.status${lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1)}`,
      `invitation.rebate.status.${lowerStatus}`,
      `wallet.fundDetails.status${lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1)}`,
      `transactions.status${lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1)}`
    ];
    
    for (const key of possibleKeys) {
      const translation = t(key);
      if (translation && translation !== key) return translation;
    }
    
    return status;
  };

  const lowerStatus = status.toLowerCase();

  // Define badge styles based on status
  if (lowerStatus === "completed" || lowerStatus === "approved") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200 border border-green-500/30">
        {getStatusText(status)}
      </span>
    );
  } else if (lowerStatus === "pending") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200 border border-yellow-500/30">
        {getStatusText(status)}
      </span>
    );
  } else if (lowerStatus === "failed" || lowerStatus === "rejected") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200 border border-red-500/30">
        {getStatusText(status)}
      </span>
    );
  } else {
    // Default style for unknown statuses
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-blue-900/60 text-blue-200 border border-blue-500/30">
        {getStatusText(status)}
      </span>
    );
  }
};

export default StatusBadge;
