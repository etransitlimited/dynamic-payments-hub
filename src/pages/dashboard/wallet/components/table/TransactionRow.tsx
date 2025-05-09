
import React from 'react';
import TranslatedText from "@/components/translation/TranslatedText";
import { format, fromUnixTime } from 'date-fns';
import { cn } from '@/lib/utils';
import StatusBadge from '@/pages/dashboard/transactions/components/StatusBadge';
import TypeBadge from '@/pages/dashboard/transactions/components/TypeBadge';
import { formatUSD } from '@/utils/currencyUtils';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  timestamp: number; // Unix timestamp
  recipient?: string;
  description?: string;
  orderId?: string;
}

export interface TransactionRowProps {
  key: string;
  transaction: Transaction;
  currentLanguage: 'en' | 'fr' | 'zh-CN' | 'zh-TW' | 'es';
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  currentLanguage 
}) => {
  const getStatusClasses = (status: string) => {
    switch(status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'processing':
        return 'text-blue-400';
      case 'failed':
        return 'text-red-400';
      default:
        return '';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    if (!currency) {
      return formatUSD(amount); // Fall back to USD if no currency is specified
    }
    
    try {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      });
      return formatter.format(amount);
    } catch (error) {
      console.error(`Error formatting amount with currency ${currency}:`, error);
      return formatUSD(amount); // Fall back to USD formatter if there's an error
    }
  };

  const formatDate = (timestamp: number) => {
    const date = fromUnixTime(timestamp);
    return format(date, 'yyyy-MM-dd HH:mm');
  };

  return (
    <tr className="border-b border-blue-900/40 hover:bg-blue-900/20">
      <td className="py-3 px-4">
        <span className="font-medium text-white">{transaction.id}</span>
      </td>
      <td className="py-3 px-4">
        <span className={cn(
          transaction.amount < 0 ? 'text-red-400' : 'text-green-400',
          'font-medium'
        )}>
          {formatAmount(transaction.amount, transaction.currency || 'USD')}
        </span>
      </td>
      <td className="py-3 px-4">
        <TypeBadge type={transaction.type} />
      </td>
      <td className="py-3 px-4">
        <StatusBadge status={transaction.status} />
      </td>
      <td className="py-3 px-4">
        <span className="text-gray-400">
          {formatDate(transaction.timestamp)}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <button className="text-blue-500 hover:text-blue-400 text-sm">
          <TranslatedText 
            keyName="wallet.transactions.viewDetails" 
            fallback="View Details" 
          />
        </button>
      </td>
    </tr>
  );
};

export default TransactionRow;
