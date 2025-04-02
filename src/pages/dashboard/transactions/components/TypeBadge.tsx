
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useSafeTranslation();
  const isMobile = useIsMobile();

  const getTypeText = (type: string) => {
    // Direct key mapping to ensure we're using the correct translation key
    switch(type.toLowerCase()) {
      case "deposit":
        return t("transactions.deposit", "Deposit");
      case "withdrawal":
        return t("transactions.withdrawal", "Withdrawal");
      case "transfer":
        return t("transactions.transfer", "Transfer");
      case "payment":
        return t("transactions.payment", "Payment");
      default:
        return type;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      type === "deposit" ? "bg-green-900/60 text-green-200" : "bg-blue-900/60 text-blue-200"
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      {getTypeText(type)}
    </span>
  );
};

export default React.memo(TypeBadge);
