
import React, { Suspense } from "react";
import { Calendar, TrendingUp, Wallet } from "lucide-react";
import StatsCard from "./StatsCard";
import { useLanguage } from "@/context/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformance } from "@/hooks/use-performance";

// Skeleton loader for stats card
const StatsCardSkeleton = () => (
  <div className="bg-indigo-900/20 rounded-lg p-4 h-[96px] animate-pulse">
    <div className="flex items-center mb-2">
      <div className="w-6 h-6 bg-indigo-800/30 rounded-full mr-2"></div>
      <div className="h-4 w-24 bg-indigo-800/30 rounded"></div>
    </div>
    <div className="h-6 w-20 bg-indigo-800/30 rounded mb-2"></div>
    <div className="h-3 w-32 bg-indigo-800/30 rounded"></div>
  </div>
);

const DepositStats = () => {
  const { t } = useLanguage();
  const { performanceTier } = usePerformance();
  
  // Use simplified rendering for low-performance devices
  const isLowPerformance = performanceTier === 'low';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCard 
          title={t("wallet.deposit.monthlyDeposit")} 
          icon={<Calendar className="h-4 w-4 text-cyan-400" />}
          className={`bg-gradient-to-br from-indigo-800/90 to-indigo-900/90 border-indigo-700/40 ${isLowPerformance ? "shadow-none" : "shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30"}`}
        >
          <div className="text-2xl font-bold text-white">$3,700.00</div>
          <div className="flex items-center mt-1">
            <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
            <p className="text-xs text-green-400">
              {t("wallet.deposit.monthlyIncrease")}
            </p>
          </div>
        </StatsCard>
      </Suspense>
      
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCard 
          title={t("wallet.deposit.totalDeposits")} 
          icon={<Wallet className="h-4 w-4 text-green-400" />}
          className={`bg-gradient-to-br from-emerald-800/90 to-emerald-900/90 border-emerald-700/40 ${isLowPerformance ? "shadow-none" : "shadow-lg shadow-emerald-900/20 hover:shadow-emerald-700/30"}`}
        >
          <div className="text-2xl font-bold text-white">$28,450.00</div>
          <p className="text-xs text-blue-200/80 mt-1">
            {t("wallet.deposit.since")} 2023-08-15
          </p>
        </StatsCard>
      </Suspense>
      
      <Suspense fallback={<StatsCardSkeleton />}>
        <StatsCard 
          title={t("wallet.deposit.lastDeposit")} 
          icon={<Calendar className="h-4 w-4 text-purple-400" />}
          className={`bg-gradient-to-br from-purple-800/90 to-purple-900/90 border-purple-700/40 ${isLowPerformance ? "shadow-none" : "shadow-lg shadow-purple-900/20 hover:shadow-purple-700/30"}`}
        >
          <div className="text-2xl font-bold text-white">{t("wallet.deposit.daysAgo")}</div>
          <p className="text-xs text-blue-200/80 mt-1">
            2023-11-25 14:32
          </p>
        </StatsCard>
      </Suspense>
    </div>
  );
};

export default DepositStats;
