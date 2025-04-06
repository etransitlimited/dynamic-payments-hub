
import React, { memo, useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "../../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { LanguageCode } from "@/utils/languageUtils";
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
    try {
      const date = new Date(transaction.timestamp);
      
      // Map language codes to valid locale strings with better mapping
      let locale: string;
      switch (currentLanguage) {
        case 'zh-CN':
          locale = 'zh-Hans-CN';
          break;
        case 'zh-TW':
          locale = 'zh-Hant-TW';
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
      
      // Format options with better internationalization support
      const formatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      } as const;
      
      // Try with specified locale first
      try {
        return new Intl.DateTimeFormat(locale, formatOptions).format(date);
      } catch (localeError) {
        console.warn(`Locale error with ${locale}, falling back to en-US:`, localeError);
        
        // Fallback to a more standard date format
        try {
          return new Intl.DateTimeFormat('en-US', formatOptions).format(date);
        } catch (e) {
          // If even standard locale fails, use ISO format
          return date.toISOString().substring(0, 16).replace('T', ' ');
        }
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      // Ultimate fallback to a simple string format if all else fails
      return transaction.timestamp;
    }
  }, [transaction.timestamp, currentLanguage]);
  
  // Function to process note text - if it's a translation key, translate it
  const processNoteText = (note: string): string => {
    if (!note) return "-";
    
    // Check if the note is potentially a translation key (contains dots)
    if (note.includes('.')) {
      return t(note, note);
    }
    
    return note;
  };

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
        {processNoteText(transaction.note)}
      </TableCell>
    </TableRow>
  );
};

TransactionRow.displayName = "TransactionRow";

export default memo(TransactionRow);
