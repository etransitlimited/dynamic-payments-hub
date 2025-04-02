
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
      gradientFrom: "from-purple-600/30",
      gradientTo: "to-purple-800/30",
      progressValue: 85,
      glowColor: "rgba(242, 252, 226, 0.5)"
    },
    {
      title: "transactions.monthlyTransactions",
      value: "1,874",
      change: "+5.8%",
      isPositive: true,
      icon: <Calendar className="h-5 w-5 text-blue-400" />,
      gradientFrom: "from-blue-600/30",
      gradientTo: "to-blue-800/30",
      progressValue: 58,
      glowColor: "rgba(59, 130, 246, 0.5)"
    },
    {
      title: "common.deposit",
      value: "$84,347",
      change: "+18.2%",
      isPositive: true,
      icon: <DollarSign className="h-5 w-5 text-green-400" />,
      gradientFrom: "from-green-600/30",
      gradientTo: "to-green-800/30",
      progressValue: 78,
      glowColor: "rgba(34, 197, 94, 0.5)"
    },
    {
      title: "common.withdrawal",
      value: "$35,762",
      change: "-3.5%",
      isPositive: false,
      icon: <CreditCard className="h-5 w-5 text-amber-400" />,
      gradientFrom: "from-amber-600/30",
      gradientTo: "to-amber-800/30",
      progressValue: 42,
      glowColor: "rgba(245, 158, 11, 0.5)"
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
          whileHover={{ 
            y: -8, 
            transition: { duration: 0.2 },
            boxShadow: `0 15px 30px -8px ${stat.isPositive ? 'rgba(124, 58, 237, 0.3)' : 'rgba(239, 68, 68, 0.25)'}` 
          }}
          className="perspective-1000"
        >
          <Card className={`border border-purple-900/30 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} backdrop-blur-md overflow-hidden relative group transition-all duration-300 hover:shadow-[0_0_25px_rgba(142,45,226,0.25)] rounded-xl`}>
            {/* 紫色渐变顶部边框 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
            
            {/* 网格背景 */}
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            
            {/* 径向发光效果 */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 group-hover:opacity-40 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            
            {/* 呼吸灯效果 */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700 animate-pulse-subtle`} style={{ backgroundColor: stat.glowColor }}></div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm mb-1 group-hover:text-gray-300 transition-colors">
                    <TranslatedText keyName={stat.title} fallback={stat.title.split('.').pop() || ""} />
                  </p>
                  <h3 className="text-2xl font-bold text-white group-hover:text-neon-green transition-colors duration-300">{stat.value}</h3>
                  
                  <div className="flex items-center mt-2">
                    <div className={`text-xs px-1.5 py-0.5 rounded-full flex items-center ${stat.isPositive ? 'text-green-400 bg-green-900/40' : 'text-red-400 bg-red-900/40'} group-hover:brightness-110 transition-all`}>
                      {stat.isPositive ? (
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                    <span className="text-xs text-gray-400 ml-2 group-hover:text-gray-300 transition-colors">
                      <TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />
                    </span>
                  </div>
                </div>
                
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-charcoal-light to-charcoal-dark border border-purple-900/30 group-hover:border-purple-500/50 transition-all duration-300 shadow-lg">
                  {stat.icon}
                </div>
              </div>
              
              {/* 进度条 */}
              {stat.progressValue && (
                <div className="mt-4">
                  <div className="h-2 bg-charcoal-dark/70 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progressValue}%` }}
                      transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                      className={`h-full ${stat.isPositive ? 'bg-gradient-to-r from-purple-500 to-neon-green' : 'bg-gradient-to-r from-red-500 to-amber-500'}`}
                      style={{ 
                        boxShadow: `0 0 10px ${stat.glowColor}` 
                      }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">0</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">100%</span>
                  </div>
                </div>
              )}
              
              {/* 径向进度指示器 */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg viewBox="0 0 100 100" className="rotate-[150deg]">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="none" 
                    stroke={stat.isPositive ? "#F2FCE2" : "#FCA5A5"} 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (251.2 * stat.progressValue / 100)} 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TransactionStatCards;
