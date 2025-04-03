
import React, { useEffect, useState, memo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { Transaction } from "../../FundDetails";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionRowProps {
  transaction: Transaction;
  currentLanguage: string;
  getTranslation?: (key: string) => string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  currentLanguage,
  getTranslation
}) => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`${transaction.id}-${currentLanguage}-${language}-${Date.now()}`);
  
  // Force re-render when language changes
  useEffect(() => {
    console.log(`TransactionRow language updated: ${language}, currentLanguage: ${currentLanguage}, id: ${transaction.id}`);
    setUniqueKey(`${transaction.id}-${currentLanguage}-${language}-${Date.now()}-${refreshCounter}`);
  }, [transaction.id, currentLanguage, language, refreshCounter]);

  const getAmountColor = (amount: string) => {
    return amount.startsWith("+") ? "text-green-300" : "text-red-300";
  };

  const formatAmount = (amount: string) => {
    const isPositive = amount.startsWith("+");
    const isNegative = amount.startsWith("-");
    const numericValue = parseFloat(amount.replace(/[^0-9.-]/g, ''));
    
    if (isPositive) {
      return "+" + formatUSD(numericValue).slice(1);
    } else if (isNegative) {
      return "-" + formatUSD(Math.abs(numericValue)).slice(1);
    } else {
      return formatUSD(numericValue);
    }
  };

  return (
    <TableRow 
      key={uniqueKey} 
      className="border-purple-900/30 hover:bg-purple-900/20 transition-colors"
      data-transaction-id={transaction.id}
      data-language={currentLanguage}
      data-context-language={language}
    >
      <TableCell className="font-mono text-xs text-purple-300">{transaction.id}</TableCell>
      <TableCell>
        <TransactionTypeBadge 
          type={transaction.type} 
          currentLanguage={currentLanguage}
          getTranslation={getTranslation}
        />
      </TableCell>
      <TableCell className={getAmountColor(transaction.amount)}>{formatAmount(transaction.amount)}</TableCell>
      <TableCell className="text-white">{formatUSD(parseFloat(transaction.balance))}</TableCell>
      <TableCell className="text-purple-200/80 text-sm">{transaction.date}</TableCell>
      <TableCell className="text-purple-200/80">{transaction.note}</TableCell>
    </TableRow>
  );
};

export default memo(TransactionRow);
