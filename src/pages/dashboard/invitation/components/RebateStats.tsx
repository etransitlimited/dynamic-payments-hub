
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Users, CircleDollarSign, BarChart4 } from "lucide-react";
import { useRebateTranslation } from "../hooks/useRebateTranslation";

const RebateStats = () => {
  const { t, language } = useRebateTranslation();
  
  // Force re-render when language changes
  const [componentKey, setComponentKey] = useState<string>(`rebate-stats-${language}`);
  
  useEffect(() => {
    setComponentKey(`rebate-stats-${language}-${Date.now()}`);
    console.log(`RebateStats language changed to: ${language}`);
  }, [language]);
  
  // Sample data for demonstration
  const stats = [
    {
      title: "stats.totalRebate",
      value: "$3,245.50",
      change: "+12.5%",
      color: "from-green-500 to-green-700",
      indicatorClass: "bg-green-500",
      icon: <CircleDollarSign className="h-5 w-5 text-green-400" />,
      progress: 75
    },
    {
      title: "stats.invitees",
      value: "124",
      change: "+8.2%",
      color: "from-blue-500 to-blue-700",
      indicatorClass: "bg-blue-500",
      icon: <Users className="h-5 w-5 text-blue-400" />,
      progress: 62
    },
    {
      title: "stats.conversionRate",
      value: "32.4%",
      change: "+5.7%",
      color: "from-purple-500 to-purple-700",
      indicatorClass: "bg-purple-500",
      icon: <BarChart4 className="h-5 w-5 text-purple-400" />,
      progress: 45
    }
  ];
  
  return (
    <>
      {stats.map((stat, index) => (
        <Card 
          key={`${index}-${componentKey}`} 
          className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 group overflow-hidden relative"
          data-language={language}
        >
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}></div>
          
          <CardContent className="relative z-10 p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-xs mb-1 font-medium">
                  {t(stat.title)}
                </p>
                <h4 className="text-white text-2xl font-bold">{stat.value}</h4>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-neon-green" />
                  <span className="text-neon-green text-xs font-medium">{stat.change}</span>
                  <span className="text-gray-400 text-xs ml-1">vs previous</span>
                </div>
              </div>
              <div className="bg-purple-900/30 rounded-full p-2">
                {stat.icon}
              </div>
            </div>
            
            <div className="mt-4">
              <Progress value={stat.progress} className="h-1" indicatorClassName={stat.indicatorClass} />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default RebateStats;
