
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useSafeTranslation();
  
  // Get the appropriate class names and text based on status
  const getStatusDisplay = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    switch (lowerStatus) {
      case "pending":
        return {
          className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
          translationKey: "cards.activationTasks.statusPending",
          fallback: "Pending"
        };
      case "completed":
      case "approved":
        return {
          className: "bg-green-500/20 text-green-300 border-green-500/30",
          translationKey: "cards.activationTasks.statusCompleted",
          fallback: "Completed"
        };
      case "failed":
      case "rejected":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30",
          translationKey: lowerStatus === "rejected" 
            ? "cards.activationTasks.statusRejected"
            : "cards.activationTasks.statusFailed",
          fallback: lowerStatus === "rejected" ? "Rejected" : "Failed"
        };
      case "active":
        return {
          className: "bg-green-500/20 text-green-300 border-green-500/30",
          translationKey: "cards.search.statusActive",
          fallback: "Active"
        };
      case "inactive":
        return {
          className: "bg-gray-500/20 text-gray-300 border-gray-500/30",
          translationKey: "cards.search.statusInactive",
          fallback: "Inactive"
        };
      case "expired":
        return {
          className: "bg-orange-500/20 text-orange-300 border-orange-500/30",
          translationKey: "cards.search.statusExpired",
          fallback: "Expired"
        };
      case "blocked":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30",
          translationKey: "cards.search.statusBlocked",
          fallback: "Blocked"
        };
      default:
        return {
          className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          translationKey: `status.${lowerStatus}`,
          fallback: status
        };
    }
  };
  
  const { className, translationKey, fallback } = getStatusDisplay(status);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      <span className="mr-1 w-1.5 h-1.5 rounded-full bg-current"></span>
      <TranslatedText keyName={translationKey} fallback={fallback} />
    </span>
  );
};

export default StatusBadge;
