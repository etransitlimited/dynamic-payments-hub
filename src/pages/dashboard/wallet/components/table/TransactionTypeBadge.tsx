
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { LanguageCode } from "@/utils/languageUtils";
import { TransactionType } from "../../FundDetails";

interface TransactionTypeBadgeProps {
  type: TransactionType;
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ 
  type, 
  currentLanguage,
  getTranslation
}) => {
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Force rerender when language changes
  useEffect(() => {
    console.log(`TransactionTypeBadge language updated to ${currentLanguage}`);
    setForceUpdateKey(Date.now());
  }, [currentLanguage]);
  
  // Function to get the proper translation for the transaction type
  const getTypeTranslation = () => {
    console.log(`Getting translation for type: "${type}" in ${currentLanguage}`);
    return getTranslation(`transactionTypes.${type.toLowerCase()}`);
  };
  
  // Determine badge color based on transaction type
  const getBadgeColors = () => {
    switch (type) {
      case "Deposit":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 hover:bg-green-200";
      case "Expense":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400 hover:bg-red-200";
      case "Transfer":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400 hover:bg-blue-200";
      case "Payment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400 hover:bg-purple-200";
      case "Withdrawal":
        return "bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400 hover:bg-gray-200";
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`${getBadgeColors()} font-medium px-2.5 py-0.5 rounded transition-colors`}
      key={`transaction-type-${type}-${currentLanguage}-${forceUpdateKey}`}
      data-language={currentLanguage}
    >
      {getTypeTranslation()}
    </Badge>
  );
};

export default TransactionTypeBadge;
