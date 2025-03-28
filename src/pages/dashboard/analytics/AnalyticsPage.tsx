
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, LineChart, PieChart, TrendingUp, Users, CreditCard, 
  Wallet, Calendar, ArrowUpRight, CircleDollarSign 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

const AnalyticsPage = () => {
  const { t } = useLanguage();
  
  // This would be replaced with actual data in a real application
  const placeholderCards = [
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
      value: "¥1,348,759", 
      change: "+15.3%" 
    },
    { 
      id: 4, 
      icon: <CircleDollarSign className="text-yellow-400" size={20} />, 
      title: "averageTransaction", 
      value: "¥2,875", 
      change: "+5.7%" 
    }
  ];

  // Function to render a placeholder chart container
  const renderPlaceholderChart = (icon: React.ReactNode, title: string) => (
    <div className="text-center text-blue-400">
      {React.cloneElement(icon as React.ReactElement, { size: 50, className: "mx-auto mb-4 opacity-40" })}
      <p>{title}</p>
    </div>
  );

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("sidebar.analytics")}</h1>
        <p className="text-blue-300">{t("analytics.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {placeholderCards.map((card) => (
          <Card key={card.id} className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                  {card.icon}
                </span>
                {t(`analytics.${card.title}`)}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{card.value}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                <p className="text-xs text-green-400">{card.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <LineChart className="text-blue-400" size={20} />
              </span>
              {t("analytics.revenueOverTime")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.last30Days")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-80 flex items-center justify-center">
            {renderPlaceholderChart(<LineChart />, t("analytics.revenueChart"))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <BarChart3 className="text-purple-400" size={20} />
              </span>
              {t("analytics.transactionsByType")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.distributionByType")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-80 flex items-center justify-center">
            {renderPlaceholderChart(<BarChart3 />, t("analytics.transactionsChart"))}
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-green-500/20 p-2 rounded-full mr-2">
                <PieChart className="text-green-400" size={20} />
              </span>
              {t("analytics.userDistribution")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.byRegion")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-[300px] flex items-center justify-center">
            {renderPlaceholderChart(<PieChart />, t("analytics.userDistributionChart"))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-yellow-500/20 p-2 rounded-full mr-2">
                <TrendingUp className="text-yellow-400" size={20} />
              </span>
              {t("analytics.growthMetrics")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.platformGrowth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-[300px] flex items-center justify-center">
            {renderPlaceholderChart(<TrendingUp />, t("analytics.growthChart"))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Calendar className="text-blue-400" size={20} />
              </span>
              {t("analytics.reportGeneration")}
            </div>
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("analytics.generateReports")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.dailyReport")}
            </Button>
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.weeklyReport")}
            </Button>
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.monthlyReport")}
            </Button>
          </div>
          <div className="text-sm text-blue-200/80">
            {t("analytics.reportsNote")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
