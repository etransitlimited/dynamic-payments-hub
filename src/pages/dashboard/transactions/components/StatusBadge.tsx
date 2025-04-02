
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();

  // Map status keys to consistent translations across the app
  const getStatusText = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === "completed") return t("cards.activationTasks.statusCompleted", "Completed");
    if (lowerStatus === "pending") return t("cards.activationTasks.statusPending", "Pending");
    if (lowerStatus === "failed") return t("cards.activationTasks.statusFailed", "Failed");
    
    // Attempt to find the status in the cards namespace if not in the common ones
    return t(`cards.activationTasks.status${lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1)}`, status);
  };

  const lowerStatus = status.toLowerCase();

  // Define badge styles based on status
  if (lowerStatus === "completed") {
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
