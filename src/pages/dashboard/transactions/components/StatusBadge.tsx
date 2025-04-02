
import React from "react";
import { Badge } from "@/components/ui/badge";
import TranslatedText from "@/components/translation/TranslatedText";

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusKey = (status: string): string => {
    return `transactions.status${status.charAt(0).toUpperCase() + status.slice(1)}`;
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
      <TranslatedText 
        keyName={getStatusKey(status)} 
        fallback={status.charAt(0).toUpperCase() + status.slice(1)} 
      />
    </Badge>
  );
};

export default StatusBadge;
