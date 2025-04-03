
import React, { memo } from "react";
import { Transaction } from "../FundDetails";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { formatUSD } from "@/utils/currencyUtils";
import TransactionTypeBadge from "./table/TransactionTypeBadge";
import { LanguageCode } from "@/utils/languageUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = memo(({ transactions }) => {
  const { t, language } = useSafeTranslation();
  
  // Format transaction date
  const formatTransactionDate = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      
      // Map language codes to valid locale strings
      let locale: string;
      switch (language) {
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
      
      return date.toLocaleString(locale, { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      // Fallback format
      const date = new Date(timestamp);
      return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-charcoal-light to-charcoal-dark border-purple-900/30 shadow-lg">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px] rounded-xl"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-800/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-70"></div>
      
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-white flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-2 text-purple-400">
            <Clock size={18} />
          </span>
          <span>{t("wallet.fundDetails.recentTransactions")}</span>
        </CardTitle>
        <CardDescription className="text-purple-200/70">
          {t("wallet.fundDetails.displayAllRecords")}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10 pt-0">
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="flex justify-between items-center p-2 rounded-lg hover:bg-purple-900/20 transition-colors"
              data-language={language}
            >
              <div className="flex items-center space-x-2">
                <TransactionTypeBadge type={transaction.type} language={language as LanguageCode} />
                <span className="text-white text-sm font-medium">{transaction.id}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {formatUSD(transaction.amount)}
                </span>
                <span className="text-xs text-white/60">
                  {formatTransactionDate(transaction.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

RecentTransactions.displayName = "RecentTransactions";

export default RecentTransactions;
