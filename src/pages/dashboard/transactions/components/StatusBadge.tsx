
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  // Use wallet deposit records status keys for consistency across the app
  const getStatusText = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === "completed") return t("wallet.depositRecords.statusCompleted");
    if (lowerStatus === "pending") return t("wallet.depositRecords.statusPending");
    if (lowerStatus === "failed") return t("wallet.depositRecords.statusFailed");
    
    return status;
  };

  const lowerStatus = status.toLowerCase();

  // Define badge styles based on status
  if (lowerStatus === "completed") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200">
        {getStatusText(status)}
      </span>
    );
  } else if (lowerStatus === "pending") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200">
        {getStatusText(status)}
      </span>
    );
  } else if (lowerStatus === "failed") {
    return (
      <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200">
        {getStatusText(status)}
      </span>
    );
  } else {
    return null;
  }
};

export default StatusBadge;
