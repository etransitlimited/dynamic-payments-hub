
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DollarSign, BarChart3, ArrowDownToLine, CircleGauge, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getFundDetailsTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

interface StatItem {
  title: string;
  value: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const FundDetailsStats: React.FC = () => {
  const { language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(language as LanguageCode);
  const [forceUpdateKey, setForceUpdateKey] = useState(Date.now());
  
  // Function to get direct translations
  const getTranslation = useCallback((key: string): string => {
    return getFundDetailsTranslation(key, currentLanguage);
  }, [currentLanguage]);
  
  // Monitor language changes
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`FundDetailsStats language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language as LanguageCode);
      setForceUpdateKey(Date.now());
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

  // Enhanced stats data with improved visuals
  const stats: StatItem[] = [
    { 
      title: "totalTransactions", 
      value: "2,845", 
      percentage: 72,
      icon: <CreditCard size={22} />,
      color: "from-purple-600 to-purple-300",
      glowColor: "rgba(168, 85, 247, 0.4)"
    },
    { 
      title: "totalAmount", 
      value: "$147,592", 
      percentage: 84,
      icon: <Wallet size={22} />,
      color: "from-blue-600 to-blue-400",
      glowColor: "rgba(59, 130, 246, 0.4)"
    },
    { 
      title: "averageAmount", 
      value: "$512.20", 
      percentage: 65,
      icon: <TrendingUp size={22} />,
      color: "from-emerald-600 to-emerald-400",
      glowColor: "rgba(5, 150, 105, 0.4)"
    }
  ];

  // Circular progress component with improved visual effects
  const CircularProgress: React.FC<{ percentage: number, color: string, glowColor: string }> = ({ percentage, color, glowColor }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="relative h-24 w-24 flex items-center justify-center">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-lg opacity-30"
          style={{ background: glowColor }}
        ></div>
        
        <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
          />
          
          {/* Progress circle with gradient */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#gradient-${color.replace(/[\s,]/g, '-')})`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="drop-shadow-lg"
          />
          
          {/* Define gradient for the progress circle */}
          <defs>
            <linearGradient id={`gradient-${color.replace(/[\s,]/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`stop-${color.split(' ')[0]}`} />
              <stop offset="100%" className={`stop-${color.split(' ')[2]}`} />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div 
          key={`${stat.title}-${currentLanguage}-${index}-${forceUpdateKey}`}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="h-full"
        >
          <Card className="bg-gradient-to-br from-charcoal-dark to-[#1e1035] border-purple-900/30 shadow-lg hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 overflow-hidden h-full">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 opacity-70"></div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {getTranslation(stat.title)}
                  </h3>
                  <p className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <CircularProgress 
                  percentage={stat.percentage} 
                  color={stat.color} 
                  glowColor={stat.glowColor} 
                />
                
                <div className="pl-4 space-y-2 flex-1">
                  <div className="text-sm text-blue-100">
                    {getTranslation('progress')}
                  </div>
                  
                  <Progress 
                    value={stat.percentage} 
                    className="h-3 bg-charcoal-light/40 rounded-full overflow-hidden"
                    indicatorClassName={`bg-gradient-to-r ${stat.color} rounded-full`}
                    glowColor={stat.glowColor}
                  />
                  
                  <div className="flex justify-between text-xs text-blue-200/80 pt-1">
                    <span>0</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FundDetailsStats;
