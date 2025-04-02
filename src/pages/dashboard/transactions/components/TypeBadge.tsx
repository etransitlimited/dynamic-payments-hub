
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
    
    // First try the cards namespace
    const cardsTypeKey = `cards.activationTasks.taskType${lowerType.charAt(0).toUpperCase() + lowerType.slice(1)}`;
    const cardsTranslation = t(cardsTypeKey, null);
    
    if (cardsTranslation && cardsTranslation !== cardsTypeKey) {
      return cardsTranslation;
    }
    
    // If not found in cards namespace, try wallet namespace
    if (lowerType === "deposit") return t("wallet.fundDetails.typeDeposit", "Deposit");
    if (lowerType === "withdrawal") return t("wallet.fundDetails.typeExpense", "Withdrawal");
    if (lowerType === "transfer") return t("wallet.fundDetails.typeTransfer", "Transfer");
    if (lowerType === "payment") return t("transactions.payment", "Payment");
    
    // Try direct common types
    const commonKey = `common.${lowerType}`;
    const commonTranslation = t(commonKey, null);
    
    if (commonTranslation && commonTranslation !== commonKey) {
      return commonTranslation;
    }
    
    // Fallback to the transactions namespace if needed
    return t(`transactions.${lowerType}`, type);
  };

  // Choose colors based on transaction type
  const getBgColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType === "deposit") return "bg-green-900/60 text-green-200 border-green-500/30";
    if (lowerType === "withdrawal") return "bg-red-900/60 text-red-200 border-red-500/30";
    if (lowerType === "transfer") return "bg-blue-900/60 text-blue-200 border-blue-500/30";
    if (lowerType === "payment") return "bg-purple-900/60 text-purple-200 border-purple-500/30";
    if (lowerType === "card") return "bg-purple-900/60 text-purple-200 border-purple-500/30";
    if (lowerType === "activation") return "bg-cyan-900/60 text-cyan-200 border-cyan-500/30";
    return "bg-blue-900/60 text-blue-200 border-blue-500/30"; // default
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${
      getBgColor(type)
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      {getTypeText(type)}
    </span>
  );
};

export default React.memo(TypeBadge);
