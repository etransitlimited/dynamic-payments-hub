
import React, { memo, useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "../../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { LanguageCode, formatLocalizedDateTime } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionRowProps {
  transaction: Transaction;
  currentLanguage: LanguageCode;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction,
  currentLanguage
}) => {
  const { t } = useSafeTranslation();
  
  // Memoized formatted time to prevent re-rendering
  const formattedTime = useMemo(() => {
    return formatLocalizedDateTime(transaction.timestamp, currentLanguage);
  }, [transaction.timestamp, currentLanguage]);
  
  // Function to process note text - if it's a translation key, translate it
  const processNoteText = useMemo(() => {
    if (!transaction.note) return "-";
    
    // Check if the note is potentially a translation key (contains dots)
    if (transaction.note.includes('.')) {
      return t(transaction.note, transaction.note);
    }
    
    return transaction.note;
  }, [transaction.note, t]);

  // Create a stable row key to prevent unnecessary re-renders
  const rowKey = useMemo(() => `${transaction.id}-${currentLanguage}`, [transaction.id, currentLanguage]);

  return (
    <TableRow 
      key={rowKey}
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
        {processNoteText}
      </TableCell>
    </TableRow>
  );
};

export default memo(TransactionRow);
