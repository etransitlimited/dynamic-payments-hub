
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTransactionTranslation } from "../i18n";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: string;
  status: string;
  date: string;
}

interface TransactionTableProps {
  filterMode: 'last24Hours' | 'allTransactions';
}

const TransactionTable: React.FC<TransactionTableProps> = ({ filterMode }) => {
  const { language } = useLanguage();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const { refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`transaction-table-${language}-${filterMode}-${Date.now()}`);
  const tableHeaderRefs = useRef<Record<string, HTMLTableCellElement | null>>({
    id: null,
    user: null,
    type: null,
    amount: null,
    status: null,
    date: null,
    actions: null
  });
  
  const footerTextRef = useRef<HTMLDivElement>(null);
  
  // Mock data
  const transactions = useMemo(() => [
    {
      id: 'TRX-123456',
      userId: 'user@example.com',
      type: 'deposit',
      amount: '$500.00',
      status: 'statusCompleted',
      date: '2023-11-15'
    },
    {
      id: 'TRX-123457',
      userId: 'user2@example.com',
      type: 'withdrawal',
      amount: '$200.00',
      status: 'statusPending',
      date: '2023-11-14'
    },
    {
      id: 'TRX-123458',
      userId: 'user3@example.com',
      type: 'exchange',
      amount: '$350.00',
      status: 'statusCompleted',
      date: '2023-11-13'
    }
  ], []);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionTable language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`transaction-table-${language}-${filterMode}-${Date.now()}-${refreshCounter}`);
      
      // Update translations directly
      updateTranslations();
    }
  }, [language, refreshCounter, filterMode]);
  
  // Update translations directly in the DOM
  const updateTranslations = () => {
    // Update table headers
    Object.keys(tableHeaderRefs.current).forEach(key => {
      const headerCell = tableHeaderRefs.current[key];
      if (headerCell) {
        headerCell.textContent = getTransactionTranslation(key, languageRef.current);
      }
    });
    
    // Update footer text
    if (footerTextRef.current) {
      const showing = getTransactionTranslation("showing", languageRef.current);
      const of = getTransactionTranslation("of", languageRef.current);
      const records = getTransactionTranslation("records", languageRef.current);
      footerTextRef.current.textContent = `${showing} 3 ${of} 5 ${records}`;
    }
  };
  
  // Set up translation event listeners
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`transaction-table-${e.detail.language}-${filterMode}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateTranslations();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateTranslations();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [filterMode]);
  
  // Format date according to current language
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      
      // Format date based on language
      return new Intl.DateTimeFormat(languageRef.current === 'en' ? 'en-US' : 
                                   languageRef.current === 'fr' ? 'fr-FR' : 
                                   languageRef.current === 'es' ? 'es-ES' : 
                                   languageRef.current === 'zh-CN' ? 'zh-CN' : 
                                   languageRef.current === 'zh-TW' ? 'zh-TW' : 
                                   'en-US').format(date);
    } catch {
      return dateStr;
    }
  };
  
  // Function to get translated type
  const getTranslatedType = (type: string) => {
    return getTransactionTranslation(`type${type.charAt(0).toUpperCase() + type.slice(1)}`, languageRef.current);
  };
  
  // Function to get translated status
  const getTranslatedStatus = (status: string) => {
    return getTransactionTranslation(status, languageRef.current);
  };
  
  // Function to get cell content with dynamic translation
  const getCellContent = (transaction: Transaction, column: keyof Transaction | 'actions') => {
    if (column === 'type') {
      return getTranslatedType(transaction.type);
    } else if (column === 'status') {
      return getTranslatedStatus(transaction.status);
    } else if (column === 'date') {
      return formatDate(transaction.date);
    } else if (column === 'actions') {
      return (
        <Button 
          size="sm" 
          variant="ghost" 
          className="p-0 hover:bg-transparent text-purple-400 hover:text-neon-green"
        >
          <Eye className="h-4 w-4 mr-1" />
          <span className="text-xs">{getTransactionTranslation("view", languageRef.current)}</span>
        </Button>
      );
    } else {
      return transaction[column];
    }
  };
  
  // Set ref for table header cells
  const setHeaderRef = (element: HTMLTableCellElement | null, key: string) => {
    tableHeaderRefs.current[key] = element;
    if (element) {
      element.textContent = getTransactionTranslation(key, languageRef.current);
    }
  };
  
  return (
    <div 
      key={uniqueKey}
      className="overflow-x-auto"
      data-language={languageRef.current}
    >
      <table className="min-w-full divide-y divide-purple-900/30">
        <thead>
          <tr>
            <th ref={(el) => setHeaderRef(el, "id")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "user")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "type")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "amount")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "status")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "date")} className="px-3 py-3 text-left text-xs font-medium text-gray-300 tracking-wider"></th>
            <th ref={(el) => setHeaderRef(el, "actions")} className="px-3 py-3 text-right text-xs font-medium text-gray-300 tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-charcoal-dark divide-y divide-purple-900/30">
          {transactions.map((transaction, index) => (
            <tr key={`${transaction.id}-${index}`} className="hover:bg-charcoal-light/30 transition-colors">
              <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-200">{transaction.id}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-200">{transaction.userId}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  transaction.type === 'deposit' ? 'bg-green-900/30 text-green-400' : 
                  transaction.type === 'withdrawal' ? 'bg-red-900/30 text-red-400' : 
                  'bg-blue-900/30 text-blue-400'
                }`}>
                  {getCellContent(transaction, 'type')}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-200">{transaction.amount}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs">
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  transaction.status === 'statusCompleted' ? 'bg-green-900/30 text-green-400' : 
                  transaction.status === 'statusPending' ? 'bg-yellow-900/30 text-yellow-400' : 
                  'bg-red-900/30 text-red-400'
                }`}>
                  {getCellContent(transaction, 'status')}
                </span>
              </td>
              <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-200">{getCellContent(transaction, 'date')}</td>
              <td className="px-3 py-3 whitespace-nowrap text-xs text-right">
                {getCellContent(transaction, 'actions')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xs text-gray-400 text-right" ref={footerTextRef}>
        {`${getTransactionTranslation("showing", languageRef.current)} 3 
           ${getTransactionTranslation("of", languageRef.current)} 5 
           ${getTransactionTranslation("records", languageRef.current)}`}
      </div>
    </div>
  );
};

export default TransactionTable;
