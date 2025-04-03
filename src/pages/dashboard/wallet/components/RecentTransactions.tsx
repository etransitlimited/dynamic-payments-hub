
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());

  // Force update when language changes
  useEffect(() => {
    setForceUpdateKey(Date.now());
  }, [language]);

  // Get the first 5 transactions
  const recentTransactions = transactions.slice(0, 5);

  // Format transaction timestamp with robust error handling
  const formatDate = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      
      // Map language codes to valid locale strings
      let locale: string;
      switch (language) {
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
      
      try {
        return date.toLocaleString(locale, { 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      } catch (localeError) {
        // Fallback to standard format
        try {
          return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          });
        } catch (e) {
          // Ultimate fallback to ISO string format
          return date.toISOString().substring(0, 16).replace('T', ' ');
        }
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return timestamp;
    }
  };

  const getTransactionTypeLabel = (type: string): string => {
    const key = `wallet.fundDetails.type${type.charAt(0).toUpperCase() + type.slice(1)}`;
    return key;
  };

  return (
    <Card 
      className="bg-gradient-to-br from-blue-950/80 to-blue-950/40 border-blue-900/40 overflow-hidden h-full shadow-lg"
      key={`recent-transactions-${language}-${forceUpdateKey}`}
    >
      <CardHeader className="pb-3 bg-blue-950/40 backdrop-blur-sm border-b border-blue-800/20">
        <CardTitle className="text-white flex justify-between items-center">
          <TranslatedText keyName="wallet.fundDetails.recentTransactions" />
          <button 
            className="text-xs flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            onClick={() => navigate('/dashboard/wallet/fund-details')}
          >
            <TranslatedText keyName="wallet.fundDetails.viewAllRecords" />
            <ChevronRight size={14} className="ml-1" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 p-0">
        <div className="divide-y divide-blue-900/30">
          {recentTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex justify-between items-center p-3 hover:bg-blue-900/20 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-white text-sm">
                  <TranslatedText keyName={getTransactionTypeLabel(transaction.type)} />
                </span>
                <span className="text-blue-300/70 text-xs mt-1">{formatDate(transaction.timestamp)}</span>
              </div>
              <div className={`text-right ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatUSD(transaction.amount)}
              </div>
            </div>
          ))}
          
          {recentTransactions.length === 0 && (
            <div className="p-4 text-center text-blue-400/60">
              <TranslatedText keyName="common.noDataAvailable" fallback="No transaction records" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
