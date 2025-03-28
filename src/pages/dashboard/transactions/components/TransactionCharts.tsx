
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const TransactionCharts = () => {
  const { t } = useLanguage();

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <BarChart3 className="text-blue-400" size={20} />
          </span>
          {t("transactions.transactionStatistics")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("transactions.transactionAnalytics")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-60 flex items-center justify-center">
        <div className="text-center text-blue-400">
          <BarChart3 size={50} className="mx-auto mb-4 opacity-40" />
          <p>{t("transactions.transactionAnalytics")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCharts;
