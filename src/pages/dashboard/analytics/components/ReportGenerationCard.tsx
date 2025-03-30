
import React from "react";
import { Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReportGenerationCard = () => {
  const { t } = useLanguage();

  return (
    <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden mb-6">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex justify-between items-center text-white">
          <div className="flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <Calendar className="text-purple-300" size={20} />
            </span>
            {t("analytics.reportGeneration")}
          </div>
        </CardTitle>
        <CardDescription className="text-purple-200/80">
          {t("analytics.generateReports")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="border-purple-600/60 bg-purple-950/50 text-white hover:bg-purple-700/30">
            {t("analytics.dailyReport")}
          </Button>
          <Button variant="outline" className="border-purple-600/60 bg-purple-950/50 text-white hover:bg-purple-700/30">
            {t("analytics.weeklyReport")}
          </Button>
          <Button variant="outline" className="border-purple-600/60 bg-purple-950/50 text-white hover:bg-purple-700/30">
            {t("analytics.monthlyReport")}
          </Button>
        </div>
        <div className="text-sm text-purple-200/80">
          {t("analytics.reportsNote")}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportGenerationCard;
