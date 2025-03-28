
import React from "react";
import { Calendar, TrendingUp, Wallet } from "lucide-react";
import StatsCard from "./StatsCard";
import { useLanguage } from "@/context/LanguageContext";

const DepositStats = () => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard 
        title={t("wallet.deposit.monthlyDeposit")} 
        icon={<Calendar className="h-4 w-4 text-blue-400" />}
      >
        <div className="text-2xl font-bold text-white">$3,700.00</div>
        <div className="flex items-center mt-1">
          <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
          <p className="text-xs text-green-400">
            {t("wallet.deposit.monthlyIncrease")}
          </p>
        </div>
      </StatsCard>
      
      <StatsCard 
        title={t("wallet.deposit.totalDeposits")} 
        icon={<Wallet className="h-4 w-4 text-green-400" />}
      >
        <div className="text-2xl font-bold text-white">$28,450.00</div>
        <p className="text-xs text-blue-200/80 mt-1">
          {t("wallet.deposit.since")} 2023-08-15
        </p>
      </StatsCard>
      
      <StatsCard 
        title={t("wallet.deposit.lastDeposit")} 
        icon={<Calendar className="h-4 w-4 text-purple-400" />}
      >
        <div className="text-2xl font-bold text-white">{t("wallet.deposit.daysAgo", { days: 2 })}</div>
        <p className="text-xs text-blue-200/80 mt-1">
          2023-11-25 14:32
        </p>
      </StatsCard>
    </div>
  );
};

export default DepositStats;
