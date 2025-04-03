
import React, { memo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "../../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { LanguageCode } from "@/utils/languageUtils";

interface TransactionRowProps {
  transaction: Transaction;
  currentLanguage: LanguageCode;
}

const TransactionRow: React.FC<TransactionRowProps> = memo(({ 
  transaction,
  currentLanguage
}) => {
  // Format transaction timestamp to a more readable format
  const formattedTime = new Date(transaction.timestamp).toLocaleString(
    // Use appropriate locale based on language
    currentLanguage === 'zh-CN' || currentLanguage === 'zh-TW' ? 
      currentLanguage.replace('-', '_') : currentLanguage,
    { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );

  return (
    <TableRow 
      className="border-purple-900/30 hover:bg-purple-900/20 transition-colors"
      data-language={currentLanguage}
    >
      <TableCell className="font-mono text-xs text-white/70">{transaction.id}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={transaction.type} language={currentLanguage} />
      </TableCell>
      <TableCell className={`font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {formatUSD(transaction.amount)}
      </TableCell>
      <TableCell className="text-white">{formatUSD(transaction.balance)}</TableCell>
      <TableCell className="text-xs text-white/70">{formattedTime}</TableCell>
      <TableCell className="text-xs text-white/70 max-w-[200px] truncate">
        {transaction.note || "-"}
      </TableCell>
    </TableRow>
  );
});

TransactionRow.displayName = "TransactionRow";

export default TransactionRow;
