
import React from "react";
import { formatUSD } from "@/utils/currencyUtils";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp
} from "lucide-react";

interface FundDetailsStatsProps {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  isLoading: boolean;
}

const FundDetailsStats: React.FC<FundDetailsStatsProps> = ({
  totalTransactions,
  totalAmount,
  averageAmount,
  isLoading
}) => {
  const { t } = useSafeTranslation();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl animate-pulse">
        <div className="h-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-800/30 p-6 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatItem 
          icon={<CreditCard className="h-5 w-5 text-indigo-300" />} 
          label={t("wallet.fundDetails.totalTransactions")}
          value={totalTransactions.toString()}
          color="blue"
        />
        <StatItem 
          icon={<DollarSign className="h-5 w-5 text-green-300" />}
          label={t("wallet.fundDetails.totalAmount")}
          value={formatUSD(totalAmount)}
          color="green"
        />
        <StatItem 
          icon={<TrendingUp className="h-5 w-5 text-purple-300" />}
          label={t("wallet.fundDetails.averageAmount")}
          value={formatUSD(averageAmount)}
          color="purple"
        />
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "blue" | "green" | "purple" | "amber";
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, color }) => {
  const getBgColor = () => {
    switch (color) {
      case "blue": return "bg-blue-900/30";
      case "green": return "bg-green-900/30";
      case "purple": return "bg-purple-900/30";
      case "amber": return "bg-amber-900/30";
    }
  };

  return (
    <div className={`${getBgColor()} p-4 rounded-lg`}>
      <div className="flex items-center mb-2">
        {icon}
        <span className="text-gray-300 text-sm ml-2">{label}</span>
      </div>
      <p className="text-xl font-semibold text-white">{value}</p>
    </div>
  );
};

export default FundDetailsStats;
