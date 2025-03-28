
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useLanguage();

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      type === "deposit" ? "bg-green-900/60 text-green-200" : "bg-blue-900/60 text-blue-200"
    }`}>
      {t(`transactions.${type}`)}
    </span>
  );
};

export default TypeBadge;
