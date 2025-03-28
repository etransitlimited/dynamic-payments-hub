
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

const RebateStats = () => {
  const { t } = useLanguage();
  
  const stats = [
    {
      title: t("invitation.stats.invited"),
      value: "152",
      icon: "👥",
      bgGradient: "from-blue-600 to-blue-400"
    },
    {
      title: t("invitation.stats.activated"),
      value: "98",
      icon: "✅",
      bgGradient: "from-green-600 to-green-400"
    },
    {
      title: t("invitation.stats.totalRebate"),
      value: "5,230",
      icon: "💰",
      bgGradient: "from-amber-600 to-amber-400"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border border-blue-800/30 shadow-lg">
          <CardContent className={`p-0`}>
            <div className={`flex items-center bg-gradient-to-r ${stat.bgGradient} p-4`}>
              <div className="bg-white/20 p-2 rounded-lg mr-4">
                <span className="text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default RebateStats;
