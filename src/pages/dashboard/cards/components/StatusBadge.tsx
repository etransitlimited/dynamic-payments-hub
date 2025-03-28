
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

interface StatusBadgeProps {
  status: "completed" | "pending" | "failed";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch(status) {
    case "completed":
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
          <CheckCircle2 size={14} />
          已完成
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
          <Clock size={14} />
          处理中
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
          <XCircle size={14} />
          失败
        </Badge>
      );
    default:
      return null;
  }
};

export default StatusBadge;
