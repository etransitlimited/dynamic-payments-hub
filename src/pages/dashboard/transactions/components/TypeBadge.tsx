import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TranslatedText from "@/components/translation/TranslatedText";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const isMobile = useIsMobile();

  const getTypeTranslationKey = (type: string) => {
    const lowerType = type.toLowerCase();
    
    if (lowerType === "deposit") return "transactions.deposit";
    if (lowerType === "withdrawal") return "transactions.withdrawal";
    
    if (lowerType === "transfer") return "wallet.fundDetails.typeTransfer";
    if (lowerType === "payment") return "transactions.payment";
    if (lowerType === "exchange") return "common.exchange";
    if (lowerType === "expense") return "common.expense";
    
    const cardTaskTypeKey = `cards.activationTasks.taskType${lowerType.charAt(0).toUpperCase() + lowerType.slice(1)}`;
    
    const transactionKey = `transactions.${lowerType}`;
    
    if (cardTaskTypeKey.includes('.')) return cardTaskTypeKey;
    if (transactionKey.includes('.')) return transactionKey;
    
    return type;
  };

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

  const typeKey = getTypeTranslationKey(type);
  const typeFallback = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <span className={`px-2 py-1 rounded-full text-xs border ${
      getBgColor(type)
    } ${isMobile ? 'inline-flex justify-center min-w-[70px]' : ''}`}>
      <TranslatedText keyName={typeKey} fallback={typeFallback} />
    </span>
  );
};

export default React.memo(TypeBadge);
