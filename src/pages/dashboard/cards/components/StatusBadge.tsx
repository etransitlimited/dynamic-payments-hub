
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { language } = useSafeTranslation();
  
  // Direct translation approach for reliable status display
  const getStatusText = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus === "pending") {
      switch (language) {
        case 'zh-CN': return '待处理';
        case 'zh-TW': return '待處理';
        case 'fr': return 'En Attente';
        case 'es': return 'Pendiente';
        default: return 'Pending';
      }
    } else if (lowerStatus === "completed" || lowerStatus === "approved") {
      switch (language) {
        case 'zh-CN': return '已完成';
        case 'zh-TW': return '已完成';
        case 'fr': return 'Terminée';
        case 'es': return 'Completada';
        default: return 'Completed';
      }
    } else if (lowerStatus === "failed" || lowerStatus === "rejected") {
      if (lowerStatus === "rejected") {
        switch (language) {
          case 'zh-CN': return '已拒绝';
          case 'zh-TW': return '已拒絕';
          case 'fr': return 'Rejetée';
          case 'es': return 'Rechazada';
          default: return 'Rejected';
        }
      } else {
        switch (language) {
          case 'zh-CN': return '失败';
          case 'zh-TW': return '失敗';
          case 'fr': return 'Échouée';
          case 'es': return 'Fallida';
          default: return 'Failed';
        }
      }
    } else if (lowerStatus === "active") {
      switch (language) {
        case 'zh-CN': return '激活';
        case 'zh-TW': return '啟用';
        case 'fr': return 'Active';
        case 'es': return 'Activa';
        default: return 'Active';
      }
    } else if (lowerStatus === "inactive") {
      switch (language) {
        case 'zh-CN': return '未激活';
        case 'zh-TW': return '未啟用';
        case 'fr': return 'Inactive';
        case 'es': return 'Inactiva';
        default: return 'Inactive';
      }
    } else if (lowerStatus === "expired") {
      switch (language) {
        case 'zh-CN': return '已过期';
        case 'zh-TW': return '已過期';
        case 'fr': return 'Expirée';
        case 'es': return 'Expirada';
        default: return 'Expired';
      }
    } else if (lowerStatus === "blocked") {
      switch (language) {
        case 'zh-CN': return '已冻结';
        case 'zh-TW': return '已凍結';
        case 'fr': return 'Bloquée';
        case 'es': return 'Bloqueada';
        default: return 'Blocked';
      }
    } else {
      return status;
    }
  };
  
  // Get the appropriate class names based on status
  const getStatusDisplay = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    switch (lowerStatus) {
      case "pending":
        return {
          className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
        };
      case "completed":
      case "approved":
        return {
          className: "bg-green-500/20 text-green-300 border-green-500/30"
        };
      case "failed":
      case "rejected":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30"
        };
      case "active":
        return {
          className: "bg-green-500/20 text-green-300 border-green-500/30"
        };
      case "inactive":
        return {
          className: "bg-gray-500/20 text-gray-300 border-gray-500/30"
        };
      case "expired":
        return {
          className: "bg-orange-500/20 text-orange-300 border-orange-500/30"
        };
      case "blocked":
        return {
          className: "bg-red-500/20 text-red-300 border-red-500/30"
        };
      default:
        return {
          className: "bg-blue-500/20 text-blue-300 border-blue-500/30"
        };
    }
  };
  
  const { className } = getStatusDisplay(status);
  const statusText = getStatusText(status);
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      <span className="mr-1 w-1.5 h-1.5 rounded-full bg-current"></span>
      {statusText}
    </span>
  );
};

export default StatusBadge;
