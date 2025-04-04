
import React from "react";
import { Transaction } from "../FundDetails";
import { formatUSD } from "@/utils/currencyUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Badge } from "@/components/ui/badge";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const { t } = useSafeTranslation();
  
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Deposit":
        return "bg-green-500/20 text-green-300";
      case "Expense":
        return "bg-red-500/20 text-red-300";
      case "Transfer":
        return "bg-blue-500/20 text-blue-300";
      default:
        return "bg-purple-500/20 text-purple-300";
    }
  };
  
  const getTranslatedType = (type: string) => {
    switch (type) {
      case "Deposit":
        return t("wallet.fundDetails.typeDeposit");
      case "Expense":
        return t("wallet.fundDetails.typeExpense");
      case "Transfer":
        return t("wallet.fundDetails.typeTransfer");
      default:
        return type;
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl">
      <h3 className="text-lg font-medium text-white mb-4">
        {t("wallet.fundDetails.recentTransactions")}
      </h3>
      
      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-indigo-950/60 border border-indigo-700/50 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getTypeBadgeColor(transaction.type)} border-0`}>
                    {getTranslatedType(transaction.type)}
                  </Badge>
                  <span className="text-white font-medium">{transaction.id}</span>
                </div>
                <span className="text-gray-400 text-sm">{transaction.timestamp}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">{t("wallet.fundDetails.amount")}</div>
                  <div className={transaction.amount < 0 ? "text-red-300 font-medium" : "text-green-300 font-medium"}>
                    {formatUSD(transaction.amount)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">{t("wallet.fundDetails.balance")}</div>
                  <div className="text-indigo-200 font-medium">{formatUSD(transaction.balance)}</div>
                </div>
              </div>
              
              {transaction.note && (
                <div className="mt-2 pt-2 border-t border-indigo-700/30">
                  <div className="text-sm text-gray-400">{t("wallet.fundDetails.note")}</div>
                  <div className="text-indigo-100">{transaction.note}</div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-6">
            {t("common.notFound")}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
