
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const { language } = useSafeTranslation();
  
  // Get status text based on language
  const getStatusText = () => {
    switch (status) {
      case "completed":
        switch (language) {
          case "zh-CN": return "已完成";
          case "zh-TW": return "已完成";
          case "fr": return "Terminée";
          case "es": return "Completada";
          default: return "Completed";
        }
      case "pending":
        switch (language) {
          case "zh-CN": return "处理中";
          case "zh-TW": return "處理中";
          case "fr": return "En Attente";
          case "es": return "Pendiente";
          default: return "Pending";
        }
      case "failed":
        switch (language) {
          case "zh-CN": return "失败";
          case "zh-TW": return "失敗";
          case "fr": return "Échouée";
          case "es": return "Fallida";
          default: return "Failed";
        }
      default:
        return status;
    }
  };
  
  const statusStyles = {
    completed: "bg-green-500/20 text-green-400 border-green-500/50",
    pending: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    failed: "bg-red-500/20 text-red-400 border-red-500/50",
  };
  
  return (
    <Badge 
      className={`px-2 py-1 capitalize border ${statusStyles[status]} text-xs font-medium hover:bg-opacity-80 ${className}`}
      variant="outline"
    >
      {getStatusText()}
    </Badge>
  );
};

export default StatusBadge;
