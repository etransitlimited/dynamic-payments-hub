import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Coins, History } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import TranslatedText from "@/components/translation/TranslatedText";

// Add missing component
const TransactionStatCards = () => {
  const { language } = useSafeTranslation();
  
  // Determine text size based on language to prevent overflow
  const getTitleSize = () => {
    if (['fr', 'es'].includes(language)) {
      return 'text-sm sm:text-base';
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'text-sm sm:text-base';
    }
    return 'text-sm sm:text-base';
  };
  
  // Determine value size based on language
  const getValueSize = () => {
    if (['fr', 'es'].includes(language)) {
      return 'text-xl sm:text-2xl';
    } else if (['zh-CN', 'zh-TW'].includes(language)) {
      return 'text-xl sm:text-2xl';
    }
    return 'text-xl sm:text-2xl';
  };
  
  // Animation variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Card data
  const cards = [
    {
      title: "transactions.totalTransactions",
      titleFallback: "Total Transactions",
      value: "1,893",
      icon: <History className="h-5 w-5 text-blue-400" />,
      change: "+12.5%",
      isPositive: true,
      color: "from-blue-900/30 to-blue-600/10",
      borderColor: "border-blue-500/20",
      iconBg: "bg-blue-900/30",
    },
    {
      title: "transactions.monthlyTransactions",
      titleFallback: "Monthly Transactions",
      value: "438",
      icon: <Coins className="h-5 w-5 text-purple-400" />,
      change: "+8.2%",
      isPositive: true,
      color: "from-purple-900/30 to-purple-600/10",
      borderColor: "border-purple-500/20",
      iconBg: "bg-purple-900/30",
    },
    {
      title: "transactions.systemLoad",
      titleFallback: "System Load",
      value: "42%",
      icon: <Coins className="h-5 w-5 text-emerald-400" />,
      change: "-3.1%",
      isPositive: false,
      color: "from-emerald-900/30 to-emerald-600/10",
      borderColor: "border-emerald-500/20",
      iconBg: "bg-emerald-900/30",
    }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card, index) => (
        <motion.div key={index} variants={item}>
          <Card className={`border ${card.borderColor} bg-gradient-to-br ${card.color} backdrop-blur-md overflow-hidden shadow-lg relative group hover:shadow-lg transition-all duration-300`}>
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardContent className="p-3 sm:p-4 relative z-10 h-full">
              <div className="flex justify-between items-start">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className={`${getTitleSize()} font-medium text-gray-300 mb-1`}>
                    <TranslatedText 
                      keyName={card.title} 
                      fallback={card.titleFallback}
                      truncate
                      maxLines={1}
                    />
                  </h3>
                  <div className={`${getValueSize()} font-bold text-white`}>
                    {card.value}
                  </div>
                  <div className="flex items-center mt-1 text-xs">
                    {card.isPositive ? (
                      <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-400 mr-1" />
                    )}
                    <span
                      className={`font-medium ${
                        card.isPositive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {card.change}
                    </span>
                    <span className="text-gray-400 ml-1">
                      <TranslatedText 
                        keyName="transactions.comparedToLastMonth" 
                        fallback="compared to last month"
                        truncate
                        maxLines={1}
                      />
                    </span>
                  </div>
                </div>
                <div className={`${card.iconBg} p-2 rounded-lg border ${card.borderColor}`}>
                  {card.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TransactionStatCards;
