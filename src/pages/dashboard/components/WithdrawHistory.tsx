
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

// Mock data for withdraw history
const mockHistory = [
  { id: 1, date: "2025-04-10", amount: "0.25 BTC", status: "completed", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" },
  { id: 2, date: "2025-04-05", amount: "1.50 ETH", status: "pending", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { id: 3, date: "2025-03-28", amount: "500 USDT", status: "completed", address: "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPjn" }
];

const WithdrawHistory = () => {
  const { t } = useSafeTranslation();
  
  return (
    <div className="bg-blue-950/40 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        {t('wallet.withdraw.historyTitle', 'Recent Withdrawals')}
      </h3>
      
      {mockHistory.length > 0 ? (
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {mockHistory.map((item) => (
            <div 
              key={item.id}
              className="flex flex-col p-3 bg-blue-900/20 border border-blue-800/30 rounded-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-blue-100">{item.amount}</span>
                <span className={`text-xs rounded-full px-2 py-0.5 ${
                  item.status === 'completed' ? 'bg-green-900/50 text-green-300' : 
                  'bg-amber-900/50 text-amber-300'
                }`}>
                  {item.status === 'completed' ? 
                    t('wallet.withdraw.statusCompleted', 'Completed') : 
                    t('wallet.withdraw.statusPending', 'Pending')
                  }
                </span>
              </div>
              <span className="text-sm text-blue-300 truncate">{item.address}</span>
              <span className="text-xs text-blue-400 mt-1">{item.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center text-blue-300">
          {t('wallet.withdraw.noHistory', 'No withdrawal history')}
        </div>
      )}
    </div>
  );
};

export default WithdrawHistory;
