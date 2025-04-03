
import React, { memo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { formatUSD } from "@/utils/currencyUtils";
import { useLanguage } from "@/context/LanguageContext";
import { getFundDetailsTranslation } from "../i18n";
import { Transaction } from "../FundDetails";
import { LanguageCode } from "@/utils/languageUtils";
import TransactionTypeBadge from "./table/TransactionTypeBadge";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions = memo(({ transactions }: RecentTransactionsProps) => {
  const { language } = useLanguage();
  
  // Function to get direct translations
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, language as LanguageCode);
  }, [language]);
  
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(
      language === 'zh-CN' || language === 'zh-TW' ? 
        language.replace('-', '_') : language,
      { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }
    );
  }, [language]);

  return (
    <Card 
      className="relative overflow-hidden bg-gradient-to-br from-purple-800/10 to-purple-900/30 border-purple-900/30 shadow-lg"
      key={`recent-transactions-${language}`}
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-purple-900/30 p-2 rounded-lg text-purple-400">
            <Clock size={18} />
          </span>
          {getTranslation('recentTransactions')}
        </CardTitle>
        <CardDescription className="text-purple-200/70">
          {transactions.length > 0 
            ? `${transactions.length} ${getTranslation('transactionTypes.recent')}` 
            : getTranslation('noDataAvailable')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-3">
        {transactions.length > 0 ? (
          transactions.map(transaction => (
            <div 
              key={`recent-${transaction.id}-${language}`} 
              className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-900/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <TransactionTypeBadge type={transaction.type} language={language as LanguageCode} />
                <div className="space-y-1">
                  <p className="text-xs text-white font-medium">{transaction.id}</p>
                  <p className="text-[10px] text-purple-200/60">{formatDate(transaction.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatUSD(transaction.amount)}
                </p>
                <p className="text-[10px] text-purple-200/60">{transaction.note || '-'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-purple-200/50">
            {getTranslation('noDataAvailable')}
          </div>
        )}
      </CardContent>
    </Card>
  );
});

RecentTransactions.displayName = "RecentTransactions";

export default RecentTransactions;
