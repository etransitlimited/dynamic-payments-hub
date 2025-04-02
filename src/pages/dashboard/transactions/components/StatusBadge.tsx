
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  switch(status) {
    case "completed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200">
          {t("transactions.statusCompleted")}
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200">
          {t("transactions.statusPending")}
        </span>
      );
    case "failed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200">
          {t("transactions.statusFailed")}
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
