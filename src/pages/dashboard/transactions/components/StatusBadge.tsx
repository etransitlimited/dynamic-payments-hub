
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  const getStatusText = (status: string) => {
    // Direct key mapping to ensure we're using the correct translation key
    switch(status) {
      case "completed":
        return t("transactions.statusCompleted", "Completed");
      case "pending":
        return t("transactions.statusPending", "Pending");
      case "failed":
        return t("transactions.statusFailed", "Failed");
      default:
        return status;
    }
  };

  switch(status) {
    case "completed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200">
          {getStatusText(status)}
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200">
          {getStatusText(status)}
        </span>
      );
    case "failed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200">
          {getStatusText(status)}
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
