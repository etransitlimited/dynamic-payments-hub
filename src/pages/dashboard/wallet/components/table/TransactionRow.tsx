
import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { Transaction } from "../FundDetailsTable";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionRowProps {
  transaction: Transaction;
  currentLanguage: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, currentLanguage }) => {
  const { language } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`${transaction.id}-${currentLanguage}`);
  
  // Ensure component rerenders when language changes
  useEffect(() => {
    setUniqueKey(`${transaction.id}-${currentLanguage}-${Date.now()}`);
  }, [transaction.id, currentLanguage, language]);

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
    >
      <TableCell className="font-mono text-xs text-purple-300">{transaction.id}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={transaction.type} currentLanguage={currentLanguage} />
      </TableCell>
      <TableCell className={getAmountColor(transaction.amount)}>{formatAmount(transaction.amount)}</TableCell>
      <TableCell className="text-white">{formatUSD(parseFloat(transaction.balance))}</TableCell>
      <TableCell className="text-purple-200/80 text-sm">{transaction.date}</TableCell>
      <TableCell className="text-purple-200/80">{transaction.note}</TableCell>
    </TableRow>
  );
};

export default TransactionRow;
