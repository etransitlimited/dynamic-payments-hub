
import React, { useEffect, useState } from "react";
import TranslatedText from "@/components/translation/TranslatedText";

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
  const [uniqueKey, setUniqueKey] = useState(`type-${type}-${currentLanguage}`);
  
  // 确保语言变化时组件重新渲染
  useEffect(() => {
    setUniqueKey(`type-${type}-${currentLanguage}`);
  }, [type, currentLanguage]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-600/20 text-green-300";
      case "Expense":
        return "bg-red-600/20 text-red-300";
      case "Transfer":
        return "bg-blue-600/20 text-blue-300";
      default:
        return "bg-gray-600/20 text-gray-300";
    }
  };

  const getTranslationKey = (type: string) => {
    switch (type) {
      case "Deposit": 
        return "wallet.fundDetails.typeDeposit";
      case "Expense": 
        return "wallet.fundDetails.typeExpense";
      case "Transfer": 
        return "wallet.fundDetails.typeTransfer";
      default:
        return "";
    }
  };

  const getFallback = (type: string) => {
    return type; // 使用类型本身作为回退
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(type)}`}>
      <TranslatedText 
        keyName={getTranslationKey(type)} 
        fallback={getFallback(type)} 
        key={uniqueKey} 
      />
    </span>
  );
};

export default TransactionTypeBadge;
