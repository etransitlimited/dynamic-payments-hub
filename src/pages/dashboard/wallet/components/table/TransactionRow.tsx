
import React, { useState, useEffect } from "react";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { LanguageCode } from "@/utils/languageUtils";
import { Transaction } from "../../FundDetails";

interface TransactionRowProps {
  transaction: Transaction;
  currentLanguage: LanguageCode;
  getTranslation: (key: string) => string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  currentLanguage,
  getTranslation
}) => {
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Force rerender when language changes
  useEffect(() => {
    console.log(`TransactionRow language updated: ${currentLanguage}, currentLanguage: ${currentLanguage}, id: ${transaction.id}`);
    setForceUpdateKey(Date.now());
  }, [currentLanguage, transaction.id]);

  return (
    <tr 
      className="bg-transparent hover:bg-purple-900/10 transition-colors hover:cursor-pointer"
      key={`transaction-row-${transaction.id}-${currentLanguage}-${forceUpdateKey}`}
      data-language={currentLanguage}
    >
      <td className="py-3 pl-4 pr-2">
        <span className="text-xs text-blue-300 font-mono">
          {transaction.id}
        </span>
      </td>
      <td className="py-3 px-2">
        <TransactionTypeBadge 
          type={transaction.type} 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
      </td>
      <td className="py-3 px-2">
        <span className={`font-medium ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {transaction.amount}
        </span>
      </td>
      <td className="py-3 px-2">
        <span className="text-blue-200">
          ${transaction.balance}
        </span>
      </td>
      <td className="py-3 px-2">
        <div className="flex flex-col">
          <span className="text-xs text-blue-200">
            {transaction.date.split(' ')[0]}
          </span>
          <span className="text-xs text-blue-400/70">
            {transaction.date.split(' ')[1]}
          </span>
        </div>
      </td>
      <td className="py-3 px-2">
        <span className="text-sm text-blue-300 truncate max-w-xs inline-block">
          {transaction.note}
        </span>
      </td>
      <td className="py-3 px-2 text-right">
        <Button variant="ghost" size="icon" className="hover:bg-purple-900/20">
          <ExternalLink size={14} className="text-blue-300" />
        </Button>
      </td>
    </tr>
  );
};

export default TransactionRow;
