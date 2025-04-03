
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, CreditCard, TrendingUp } from "lucide-react";
import { formatUSD } from "@/utils/currencyUtils";
import { Skeleton } from "@/components/ui/skeleton";
import TranslatedText from "@/components/translation/TranslatedText";

interface FundDetailsStatsProps {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  isLoading?: boolean;
}

const FundDetailsStats: React.FC<FundDetailsStatsProps> = ({
  totalTransactions = 0,
  totalAmount = 0,
  averageAmount = 0,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <StatCard
        title="totalTransactions"
        value={totalTransactions.toString()}
        icon={<BarChart3 className="w-5 h-5 text-blue-400" />}
        trend={+7.4}
        gradientFrom="from-blue-600/20"
        gradientTo="to-blue-800/40"
      />
      <StatCard
        title="totalAmount"
        value={formatUSD(totalAmount)}
        icon={<CreditCard className="w-5 h-5 text-green-400" />}
        trend={+12.5}
        gradientFrom="from-emerald-600/20"
        gradientTo="to-emerald-800/40"
      />
      <StatCard
        title="averageAmount"
        value={formatUSD(averageAmount)}
        icon={<TrendingUp className="w-5 h-5 text-purple-400" />}
        trend={+4.2}
        gradientFrom="from-purple-600/20"
        gradientTo="to-purple-800/40"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  gradientFrom: string;
  gradientTo: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  gradientFrom,
  gradientTo
}) => {
  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} border-0 shadow-lg hover:shadow-xl transition-shadow`}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-white/10">
            {icon}
          </div>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-medium ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
              {trend >= 0 ? "+" : ""}{trend}%
            </span>
          </div>
        </div>
        <h3 className="text-lg font-medium text-white/90 mb-1">
          <TranslatedText keyName={`wallet.fundDetails.${title}`} fallback={title} />
        </h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </CardContent>
    </Card>
  );
};

export default FundDetailsStats;
