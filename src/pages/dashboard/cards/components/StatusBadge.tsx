
import React from "react";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { useLanguage } from "@/context/LanguageContext";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { language } = useLanguage();
  
  // Get status text based on current language
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return getDirectTranslation("cards.activationTasks.statusPending", language, "Pending");
      case "completed":
        return getDirectTranslation("cards.activationTasks.statusCompleted", language, "Completed");
      case "failed":
        return getDirectTranslation("cards.activationTasks.statusFailed", language, "Failed");
      case "rejected":
        return getDirectTranslation("cards.activationTasks.statusRejected", language, "Rejected");
      default:
        return status;
    }
  };
  
  // Get badge colors based on status
  const getBadgeClasses = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-400/20";
      case "failed":
        return "bg-red-500/20 text-red-300 border-red-400/20";
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-400/20";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-400/20";
    }
  };
  
  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeClasses(status)}`}
      data-language={language}
    >
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;
