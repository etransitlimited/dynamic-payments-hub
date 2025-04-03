
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, CreditCard, TrendingUp } from "lucide-react";
import { formatUSD } from "@/utils/currencyUtils";
import { Skeleton } from "@/components/ui/skeleton";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

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
  const { language } = useLanguage();
  
  // For debugging
  console.log("FundDetailsStats rendering in language:", language);
  console.log("Stats values:", { totalTransactions, totalAmount, averageAmount });
  
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
        title="wallet.fundDetails.totalTransactions"
        value={totalTransactions.toString()}
        icon={<BarChart3 className="h-5 w-5" />}
        trend={+7.4}
        color="blue"
      />
      <StatCard 
        title="wallet.fundDetails.totalAmount"
        value={formatUSD(totalAmount)}
        icon={<CreditCard className="h-5 w-5" />}
        trend={+12.5}
        color="green"
      />
      <StatCard 
        title="wallet.fundDetails.averageAmount"
        value={formatUSD(averageAmount)}
        icon={<TrendingUp className="h-5 w-5" />}
        trend={+4.2}
        color="purple"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: "blue" | "green" | "purple";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color
}) => {
  const { language } = useSafeTranslation();
  
  // Color mappings for different card elements
  const colorMappings = {
    blue: {
      gradient: "from-blue-600/20 to-blue-800/40",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
      border: "border-blue-500/20",
      highlight: "bg-blue-500/10"
    },
    green: {
      gradient: "from-emerald-600/20 to-emerald-800/40",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      border: "border-emerald-500/20",
      highlight: "bg-emerald-500/10"
    },
    purple: {
      gradient: "from-purple-600/20 to-purple-800/40",
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400", 
      border: "border-purple-500/20",
      highlight: "bg-purple-500/10"
    }
  };
  
  const { gradient, iconBg, iconColor, border, highlight } = colorMappings[color];
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
      key={`stat-card-${title}-${language}`}
    >
      <Card 
        className={`relative overflow-hidden bg-gradient-to-br ${gradient} border-0 shadow-lg hover:shadow-xl transition-shadow h-full`}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${iconBg} ${iconColor}`}>
              {icon}
            </div>
            <div className={`px-2 py-1 rounded-full ${highlight} flex items-center gap-1`}>
              <span className={`text-xs font-medium ${trend >= 0 ? "text-green-400" : "text-red-400"}`}>
                {trend >= 0 ? "+" : ""}{trend}%
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-base font-medium text-white/80">
              <TranslatedText 
                keyName={title} 
                fallback={title.split('.').pop() || title}
              />
            </h3>
            
            <p className="text-2xl font-bold text-white tracking-tight">
              {value}
            </p>
          </div>
          
          {/* Animated underline on hover */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/20 group-hover:w-full transition-all duration-300"></div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FundDetailsStats;
