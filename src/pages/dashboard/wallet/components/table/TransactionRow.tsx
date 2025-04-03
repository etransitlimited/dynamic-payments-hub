
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./TransactionTypeBadge";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  balance: number;
  timestamp: string;
  note?: string;
}

interface TransactionRowProps {
  transaction: Transaction;
  onSelect?: (transaction: Transaction) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  onSelect 
}) => {
  const { language } = useLanguage();
  
  // Format date according to locale
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      let options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      // Use browser locale for date formatting, with fallback to language setting
      const locale = language === 'zh-CN' ? 'zh-CN' : 
                    language === 'zh-TW' ? 'zh-TW' : 
                    language === 'fr' ? 'fr' : 
                    language === 'es' ? 'es' : 'en';
                    
      return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  return (
    <TableRow 
      className={`
        group border-b border-purple-900/20 hover:bg-purple-900/10 cursor-pointer
        transition-all duration-200
      `}
      onClick={() => onSelect && onSelect(transaction)}
    >
      <TableCell className="font-mono text-xs text-gray-400">
        {transaction.id}
      </TableCell>
      <TableCell>
        <TransactionTypeBadge type={transaction.type} />
      </TableCell>
      <TableCell className={`font-medium ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {transaction.amount >= 0 ? '+' : ''}{formatUSD(transaction.amount)}
      </TableCell>
      <TableCell className="font-medium text-gray-100">
        {formatUSD(transaction.balance)}
      </TableCell>
      <TableCell className="text-gray-400 text-sm">
        {formatDate(transaction.timestamp)}
      </TableCell>
      <TableCell className="text-gray-400 truncate max-w-[200px]">
        {transaction.note || (
          <span className="text-gray-500 italic text-xs">
            <TranslatedText keyName="wallet.fundDetails.note" fallback="Note" />
          </span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TransactionRow;
