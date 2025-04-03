
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
  // Format transaction timestamp with robust error handling
  const formattedTime = (() => {
    try {
      const date = new Date(transaction.timestamp);
      
      // Map language codes to valid locale strings
      let locale: string;
      switch (currentLanguage) {
        case 'zh-CN':
          locale = 'zh-CN';
          break;
        case 'zh-TW':
          locale = 'zh-TW';
          break;
        case 'fr':
          locale = 'fr-FR';
          break;
        case 'es':
          locale = 'es-ES';
          break;
        default:
          locale = 'en-US';
      }
      
      // Try with specified locale first
      try {
        return date.toLocaleString(locale, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (localeError) {
        // Fallback to en-US if the specified locale causes issues
        console.warn(`Locale error with ${locale}, falling back to en-US:`, localeError);
        return date.toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      // Fallback to a simple string format if toLocaleString fails
      try {
        const date = new Date(transaction.timestamp);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } catch (e) {
        // Ultimate fallback
        return transaction.timestamp;
      }
    }
  })();

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
