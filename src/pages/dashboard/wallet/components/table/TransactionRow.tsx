
import React from 'react';
import { format } from 'date-fns';
import { getLanguageDisplayName, LanguageCode } from '@/utils/languageUtils';
import TransactionTypeBadge from './TransactionTypeBadge';

export interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  currency?: string; // Adding currency prop
  description?: string;
}

export interface TransactionRowProps {
  transaction: Transaction;
  key: string;
  currentLanguage: LanguageCode;
  getTranslation: (key: string, fallback: string) => string;
}

const TransactionRow = ({ transaction, currentLanguage, getTranslation }: TransactionRowProps) => {
  const formatLocalCurrency = (amount: number, currency?: string) => {
    try {
      const currencyCode = currency || 'USD'; // Default to USD if currency not provided
      return new Intl.NumberFormat(currentLanguage, { 
        style: 'currency', 
        currency: currencyCode 
      }).format(amount);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return `${currency || 'USD'} ${amount.toFixed(2)}`;
    }
  };
  
  const formatLocalDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, currentLanguage === 'zh-CN' || currentLanguage === 'zh-TW' ? 
        'yyyy年MM月dd日' : 'MMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <tr className="border-b border-gray-100/10 hover:bg-white/5 transition-colors">
      <td className="py-3 px-4">
        <TransactionTypeBadge type={transaction.type} />
      </td>
      <td className="py-3 px-4 text-white/90">
        {formatLocalCurrency(transaction.amount, transaction.currency)}
      </td>
      <td className="py-3 px-4 text-white/70 hidden md:table-cell">
        {formatLocalDate(transaction.date)}
      </td>
      <td className="py-3 px-4 text-white/70 hidden lg:table-cell">
        {transaction.description || getTranslation('wallet.transactions.noDescription', 'No description')}
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 text-xs rounded-full ${
          transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' : 
          transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
          'bg-red-500/20 text-red-400'
        }`}>
          {getTranslation(`wallet.status.${transaction.status}`, transaction.status)}
        </span>
      </td>
    </tr>
  );
};

export default TransactionRow;
