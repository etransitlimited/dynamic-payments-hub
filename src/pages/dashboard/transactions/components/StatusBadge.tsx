
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();

  switch(status) {
    case "completed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-green-900/60 text-green-200 border border-green-500/40 shadow-[0_0_8px_rgba(0,255,0,0.1)]">
          {t("transactions.statusCompleted")}
        </span>
      );
    case "pending":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-yellow-900/60 text-yellow-200 border border-yellow-500/40 shadow-[0_0_8px_rgba(255,255,0,0.1)]">
          {t("transactions.statusPending")}
        </span>
      );
    case "failed":
      return (
        <span className="px-2 py-1 rounded-full text-xs bg-red-900/60 text-red-200 border border-red-500/40 shadow-[0_0_8px_rgba(255,0,0,0.1)]">
          {t("transactions.statusFailed")}
        </span>
      );
    default:
      return null;
  }
};

export default StatusBadge;
