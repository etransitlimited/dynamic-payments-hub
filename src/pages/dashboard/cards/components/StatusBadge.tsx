
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  
  // Get the appropriate class names and text based on status
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "pending":
        return {
          className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
          text: t("cards.activationTasks.statusPending")
        };
      case "completed":
        return {
          className: "bg-green-500/20 text-green-300 border-green-500/30",
          text: t("cards.activationTasks.statusCompleted")
        };
      case "failed":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30",
          text: t("cards.activationTasks.statusFailed")
        };
      default:
        return {
          className: "bg-blue-500/20 text-blue-300 border-blue-500/30",
          text: status
        };
    }
  };
  
  const { className, text } = getStatusDisplay(status);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      <span className="mr-1 w-1.5 h-1.5 rounded-full bg-current"></span>
      {text}
    </span>
  );
};

export default StatusBadge;
