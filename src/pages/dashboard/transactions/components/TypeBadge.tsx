
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { useIsMobile } from "@/hooks/use-mobile";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const { t } = useSafeTranslation();
  const isMobile = useIsMobile();

  // Get translation for transaction type with consistent key mapping
  const getTypeText = (type: string) => {
    const lowerType = type.toLowerCase();
    
    // Map to standard translation keys
    if (lowerType === "deposit") return t("wallet.fundDetails.typeDeposit");
    if (lowerType === "withdrawal") return t("wallet.fundDetails.typeExpense");
    if (lowerType === "transfer") return t("wallet.fundDetails.typeTransfer");
    if (lowerType === "payment") return t("transactions.payment");
    if (lowerType === "exchange") return t("common.exchange");
    if (lowerType === "expense") return t("common.expense");
    
    // Check card task type namespace
    const cardTaskTypeKey = `cards.activationTasks.taskType${lowerType.charAt(0).toUpperCase() + lowerType.slice(1)}`;
    const cardTypeTranslation = t(cardTaskTypeKey);
    if (cardTypeTranslation && cardTypeTranslation !== cardTaskTypeKey) {
      return cardTypeTranslation;
    }
    
    // Try direct translation from transactions namespace
    const transactionKey = `transactions.${lowerType}`;
    const transactionTypeTranslation = t(transactionKey);
    if (transactionTypeTranslation && transactionTypeTranslation !== transactionKey) {
      return transactionTypeTranslation;
    }
    
    // Last resort: return the type as is
    return type;
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
    if (lowerType === "exchange") return "bg-yellow-900/60 text-yellow-200 border-yellow-500/30";
    if (lowerType === "expense") return "bg-orange-900/60 text-orange-200 border-orange-500/30";
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
