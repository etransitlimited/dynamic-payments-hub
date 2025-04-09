
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, BarChart } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

interface StatCardProps {
  title: string;
  titleKey: string;
  value: string;
  trend: number;
  trendText: string;
  trendTextKey: string;
  icon: React.ReactNode;
  trendDirection: "up" | "down" | "neutral";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  titleKey,
  value,
  trend,
  trendText,
  trendTextKey,
  icon,
  trendDirection
}) => {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-blue-950/40 to-purple-950/30 border-blue-800/20 hover:shadow-lg hover:shadow-blue-900/10 transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-900/30 p-2.5 rounded-lg">
            {icon}
          </div>
          <div className={`text-sm px-2.5 py-1 rounded-full flex items-center ${
            trendDirection === "up" ? "bg-green-900/20 text-green-400" :
            trendDirection === "down" ? "bg-red-900/20 text-red-400" :
            "bg-blue-900/20 text-blue-400"
          }`}>
            {trendDirection === "up" ? <TrendingUp size={14} className="mr-1" /> :
             trendDirection === "down" ? <TrendingDown size={14} className="mr-1" /> : null}
            <span>{trend}%</span>
          </div>
        </div>
        
        <h3 className="text-sm font-medium text-blue-300 mb-1.5">
          <TranslatedText keyName={titleKey} fallback={title} />
        </h3>
        
        <p className="text-2xl font-bold text-white mb-2">{value}</p>
        
        <p className="text-xs text-blue-400">
          <TranslatedText keyName={trendTextKey} fallback={trendText} />
        </p>
      </CardContent>
    </Card>
  );
};

const StatCards: React.FC = () => {
  const statCards = [
    {
      title: "Total Revenue",
      titleKey: "analytics.totalRevenue",
      value: "$24,980",
      trend: 12.8,
      trendText: "from last month",
      trendTextKey: "analytics.fromLastMonth",
      icon: <DollarSign size={18} className="text-blue-400" />,
      trendDirection: "up" as const
    },
    {
      title: "Active Users",
      titleKey: "analytics.activeUsers",
      value: "1,429",
      trend: 8.3,
      trendText: "from last week",
      trendTextKey: "analytics.fromLastWeek",
      icon: <Users size={18} className="text-blue-400" />,
      trendDirection: "up" as const
    },
    {
      title: "Active Cards",
      titleKey: "analytics.activeCards",
      value: "842",
      trend: 5.2,
      trendText: "from last quarter",
      trendTextKey: "analytics.fromLastQuarter",
      icon: <CreditCard size={18} className="text-blue-400" />,
      trendDirection: "up" as const
    },
    {
      title: "Transaction Volume",
      titleKey: "analytics.transactionVolume",
      value: "3,458",
      trend: 2.1,
      trendText: "from last month",
      trendTextKey: "analytics.fromLastMonth",
      icon: <BarChart size={18} className="text-blue-400" />,
      trendDirection: "down" as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
