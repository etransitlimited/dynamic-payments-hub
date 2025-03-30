
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      type === "deposit" 
        ? "bg-green-900/60 text-green-200 border border-green-500/40 shadow-[0_0_8px_rgba(0,255,0,0.1)]" 
        : "bg-blue-900/60 text-blue-200 border border-blue-500/40 shadow-[0_0_8px_rgba(0,0,255,0.1)]"
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      {t(`transactions.${type}`)}
    </span>
  );
};

export default React.memo(TypeBadge);
