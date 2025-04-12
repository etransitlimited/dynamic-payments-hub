
import React from "react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const WithdrawSummary = () => {
  const { t } = useSafeTranslation();
  
  // Mock data for account summary
  const availableBalance = "2.5 BTC";
  const pendingWithdrawals = "0.5 BTC";
  const withdrawLimit = "5.0 BTC";
  
  return (
    <div className="bg-blue-950/40 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">
        {t('wallet.withdraw.summaryTitle', 'Account Summary')}
      </h3>
      
      <div className="space-y-4">
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
          <div className="text-sm text-blue-300 mb-1">
            {t('wallet.withdraw.availableBalance', 'Available Balance')}
          </div>
          <div className="text-xl font-medium text-white">
            {availableBalance}
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
            <div className="text-sm text-blue-300 mb-1">
              {t('wallet.withdraw.pendingWithdrawals', 'Pending')}
            </div>
            <div className="text-lg font-medium text-white">
              {pendingWithdrawals}
            </div>
          </div>
          
          <div className="flex-1 bg-blue-900/20 border border-blue-800/30 rounded-md p-4">
            <div className="text-sm text-blue-300 mb-1">
              {t('wallet.withdraw.withdrawLimit', 'Limit')}
            </div>
            <div className="text-lg font-medium text-white">
              {withdrawLimit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawSummary;
