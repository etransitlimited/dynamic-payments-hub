
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  // Use the correct translation key format
  const getStatusKey = (status: string) => `transactions.status${status.charAt(0).toUpperCase() + status.slice(1)}`;

  switch(status) {
    case "completed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200">
          {t(getStatusKey(status))}
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200">
          {t(getStatusKey(status))}
        </span>
      );
    case "failed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200">
          {t(getStatusKey(status))}
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
