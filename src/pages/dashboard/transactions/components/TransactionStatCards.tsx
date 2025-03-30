
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DollarSign, BarChart3, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";

const TransactionStatCards = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[
        { 
          icon: DollarSign, 
          title: t("transactions.totalTransactions"), 
          description: t("transactions.allTransactions"),
          value: formatUSD(2458630)
        },
        { 
          icon: BarChart3, 
          title: t("transactions.monthlyTransactions"), 
          description: t("transactions.monthlyTransactions"),
          value: formatUSD(356720)
        },
        { 
          icon: Clock, 
          title: t("transactions.recentTransactions"), 
          description: t("transactions.last24Hours"),
          value: "68"
        }
      ].map(({ icon: Icon, title, description, value }, index) => (
        <Card 
          key={index} 
          className="relative overflow-hidden border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300" 
          style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}
        >
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10 pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <Icon className="text-purple-300" size={20} />
              </span>
              {title}
            </CardTitle>
            <CardDescription className="text-purple-300">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-white">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TransactionStatCards;
