
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpIcon, ArrowDownIcon, CreditCard, DollarSign, Activity, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";

const TransactionStatCards = () => {
  const { t } = useLanguage();

  // 统计卡片数据
  const stats = [
    {
      title: "transactions.totalTransactions",
      value: "12,543",
      change: "+12.5%",
      isPositive: true,
      icon: <Activity className="h-5 w-5 text-neon-green" />,
      gradientFrom: "from-purple-600/20",
      gradientTo: "to-purple-900/20"
    },
    {
      title: "transactions.monthlyTransactions",
      value: "1,874",
      change: "+5.8%",
      isPositive: true,
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
      gradientFrom: "from-blue-600/20",
      gradientTo: "to-blue-900/20"
    },
    {
      title: "common.deposit",
      value: "$84,347",
      change: "+18.2%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      gradientFrom: "from-green-600/20",
      gradientTo: "to-green-900/20",
      progressValue: 78
    },
    {
      title: "common.withdrawal",
      value: "$35,762",
      change: "-3.5%",
      isPositive: false,
      icon: <CreditCard className="h-5 w-5 text-amber-400" />,
      gradientFrom: "from-amber-600/20",
      gradientTo: "to-amber-900/20",
      progressValue: 42
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Card className={`border-purple-900/30 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} backdrop-blur-md overflow-hidden relative group transition-all duration-300 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)]`}>
            {/* 紫色渐变顶部边框 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            
            {/* 网格背景 */}
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    <TranslatedText keyName={stat.title} fallback={stat.title.split('.').pop() || ""} />
                  </p>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className={`text-xs px-1.5 py-0.5 rounded flex items-center ${stat.isPositive ? 'text-green-400 bg-green-900/30' : 'text-red-400 bg-red-900/30'}`}>
                      {stat.isPositive ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                      <TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />
                    </span>
                  </div>
                </div>
                
                <div className="p-2 rounded-lg bg-gradient-to-br from-charcoal-light to-charcoal-dark border border-purple-900/30">
                  {stat.icon}
                </div>
              </div>
              
              {/* 添加进度条 */}
              {stat.progressValue && (
                <div className="mt-4">
                  <div className="h-1.5 bg-charcoal-dark/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stat.isPositive ? 'bg-gradient-to-r from-purple-500 to-neon-green' : 'bg-gradient-to-r from-red-500 to-amber-500'} progress-glow`}
                      style={{ width: `${stat.progressValue}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400">0</span>
                    <span className="text-xs text-gray-400">100%</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionStatCards;
