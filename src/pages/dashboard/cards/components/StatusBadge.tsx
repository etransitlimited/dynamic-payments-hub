
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          color: "bg-green-600/20 text-green-300 border-green-500/30",
          label: t("cards.activationTasks.statusCompleted")
        };
      case "pending":
        return {
          color: "bg-amber-600/20 text-amber-300 border-amber-500/30",
          label: t("cards.activationTasks.statusPending")
        };
      case "failed":
        return {
          color: "bg-red-600/20 text-red-300 border-red-500/30",
          label: t("cards.activationTasks.statusFailed")
        };
      default:
        return {
          color: "bg-gray-600/20 text-gray-300 border-gray-500/30",
          label: status
        };
    }
  };
  
  const { color, label } = getStatusConfig(status);
  
  return (
    <Badge variant="outline" className={`rounded-sm px-2 py-0.5 ${color}`}>
      {label}
    </Badge>
  );
};

export default StatusBadge;
