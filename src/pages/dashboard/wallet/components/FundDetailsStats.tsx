
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, ArrowDownToLine, CircleGauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface StatItem {
  title: string;
  value: string;
  percentage: number;
  icon: React.ReactNode;
}

const FundDetailsStats: React.FC = () => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  // Monitor language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetailsStats language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
    }
  }, [language, currentLanguage]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Example stats data
  const stats: StatItem[] = [
    { 
      title: "wallet.fundDetails.totalTransactions", 
      value: "2,845", 
      percentage: 72,
      icon: <BarChart3 size={20} />
    },
    { 
      title: "wallet.fundDetails.totalAmount", 
      value: "$147,592", 
      percentage: 84,
      icon: <ArrowDownToLine size={20} />
    },
    { 
      title: "wallet.fundDetails.averageAmount", 
      value: "$512.20", 
      percentage: 65,
      icon: <CircleGauge size={20} />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <motion.div 
          key={`${stat.title}-${currentLanguage}-${index}`}
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="bg-gradient-to-br from-[#2e1065] to-[#4c1d95] border-purple-900/30 shadow-lg hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardContent className="p-5 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-blue-100/70 mb-1">
                    <TranslatedText keyName={stat.title} fallback="Stat" />
                  </h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="bg-purple-900/40 p-2 rounded-lg text-purple-400">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-100/70">
                    <TranslatedText keyName="wallet.fundDetails.progress" fallback="Progress" />
                  </span>
                  <span className="text-[#F2FCE2]">{stat.percentage}%</span>
                </div>
                <Progress 
                  value={stat.percentage} 
                  className="h-2"
                  indicatorClassName="bg-gradient-to-r from-purple-600 via-purple-500 to-[#F2FCE2]/70" 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FundDetailsStats;
