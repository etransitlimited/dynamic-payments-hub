
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, BarChart3, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatUSD } from "@/utils/currencyUtils";

const TransactionStatCards = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <DollarSign className="text-blue-400" size={20} />
            </span>
            {t("transactions.totalTransactions")}
          </CardTitle>
          <CardDescription className="text-blue-300">
            {t("transactions.allTransactions")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{formatUSD(2458630)}</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <BarChart3 className="text-blue-400" size={20} />
            </span>
            {t("transactions.monthlyTransactions")}
          </CardTitle>
          <CardDescription className="text-blue-300">
            {t("transactions.monthlyTransactions")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">{formatUSD(356720)}</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Clock className="text-blue-400" size={20} />
            </span>
            {t("transactions.recentTransactions")}
          </CardTitle>
          <CardDescription className="text-blue-300">
            {t("transactions.last24Hours")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-3xl font-bold">68</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionStatCards;
