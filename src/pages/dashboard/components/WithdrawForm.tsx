
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const WithdrawForm = () => {
  const { t } = useSafeTranslation();
  const [amount, setAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle withdraw submission logic
    console.log("Withdraw request", { amount, withdrawAddress });
  };
  
  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-4">
        {t('wallet.withdraw.formTitle', 'Withdraw Funds')}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-blue-100 mb-1">
            {t('wallet.withdraw.amount', 'Amount')}
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-blue-950/70 border border-blue-800/50 rounded-md text-white"
            placeholder={t('wallet.withdraw.enterAmount', 'Enter amount')}
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-blue-100 mb-1">
            {t('wallet.withdraw.address', 'Withdraw Address')}
          </label>
          <input
            type="text"
            id="address"
            value={withdrawAddress}
            onChange={(e) => setWithdrawAddress(e.target.value)}
            className="w-full p-3 bg-blue-950/70 border border-blue-800/50 rounded-md text-white"
            placeholder={t('wallet.withdraw.enterAddress', 'Enter withdraw address')}
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {t('wallet.withdraw.submitButton', 'Submit Withdrawal')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WithdrawForm;
