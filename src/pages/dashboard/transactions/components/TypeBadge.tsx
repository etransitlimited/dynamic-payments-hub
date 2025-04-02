
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useSafeTranslation();
  const isMobile = useIsMobile();

  // Simplified, direct translation mapping for transaction types
  const getTypeText = (type: string) => {
    const lowerType = type.toLowerCase();
    
    // Directly use the wallet transaction type keys for consistency
    if (lowerType === "deposit") return t("wallet.fundDetails.typeDeposit");
    if (lowerType === "withdrawal") return t("wallet.fundDetails.typeExpense");
    if (lowerType === "transfer") return t("wallet.fundDetails.typeTransfer");
    if (lowerType === "payment") return t("transactions.payment");
    
    // Fallback to the transactions namespace if needed
    return t(`transactions.${lowerType}`, type);
  };

  // Choose colors based on transaction type
  const getBgColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "deposit") return "bg-green-900/60 text-green-200";
    if (lowerType === "withdrawal") return "bg-red-900/60 text-red-200";
    if (lowerType === "transfer") return "bg-blue-900/60 text-blue-200";
    if (lowerType === "payment") return "bg-purple-900/60 text-purple-200";
    return "bg-blue-900/60 text-blue-200"; // default
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${
      getBgColor(type)
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      {getTypeText(type)}
    </span>
  );
};

export default React.memo(TypeBadge);
