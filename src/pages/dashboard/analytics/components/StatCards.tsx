
import React from "react";
import { Users, CreditCard, Wallet, CircleDollarSign } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";
import StatCard from "@/pages/dashboard/components/StatCard";

const StatCards = () => {
  const { t } = useLanguage();
  
  // Stats card data
  const statsCards = [
    { 
      id: 1, 
      icon: <Users className="text-blue-400" size={20} />, 
      title: "userActivity", 
      value: "15,234", 
      change: "+12.5%" 
    },
    { 
      id: 2, 
      icon: <CreditCard className="text-purple-400" size={20} />, 
      title: "cardIssued", 
      value: "2,548", 
      change: "+8.2%" 
    },
    { 
      id: 3, 
      icon: <Wallet className="text-green-400" size={20} />, 
      title: "revenue", 
      value: formatUSD(1348759), 
      change: "+15.3%"
    },
    { 
      id: 4, 
      icon: <CircleDollarSign className="text-yellow-400" size={20} />, 
      title: "averageTransaction", 
      value: formatUSD(2875), 
      change: "+5.7%"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsCards.map((card) => (
        <StatCard 
          key={card.id}
          title={t(`analytics.${card.title}`)}
          value={card.value}
          change={card.change}
          compareText={t("analytics.comparedToLastMonth")}
          icon={card.icon}
          className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50"
          iconClassName="bg-blue-500/20"
        />
      ))}
    </div>
  );
};

export default StatCards;
