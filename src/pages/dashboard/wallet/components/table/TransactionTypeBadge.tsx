
import React from "react";
import TranslatedText from "@/components/translation/TranslatedText";

interface TransactionTypeBadgeProps {
  type: string;
  currentLanguage: string;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({ type, currentLanguage }) => {
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

  return (
    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getTypeColor(type)}`}>
      {type === "Deposit" ? 
        <TranslatedText keyName="wallet.fundDetails.typeDeposit" fallback="Deposit" key={`type-deposit-${currentLanguage}`} /> :
       type === "Expense" ? 
        <TranslatedText keyName="wallet.fundDetails.typeExpense" fallback="Expense" key={`type-expense-${currentLanguage}`} /> :
        <TranslatedText keyName="wallet.fundDetails.typeTransfer" fallback="Transfer" key={`type-transfer-${currentLanguage}`} />
      }
    </span>
  );
};

export default TransactionTypeBadge;
