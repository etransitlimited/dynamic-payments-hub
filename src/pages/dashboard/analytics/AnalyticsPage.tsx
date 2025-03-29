
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import StatCards from "./components/StatCards";
import RevenueChart from "./components/RevenueChart";
import TransactionTypeChart from "./components/TransactionTypeChart";
import ExpenseDistributionChart from "./components/ExpenseDistributionChart";
import GrowthMetricsChart from "./components/GrowthMetricsChart";
import ReportGenerationCard from "./components/ReportGenerationCard";

const AnalyticsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("sidebar.analytics")}</h1>
        <p className="text-blue-300">{t("analytics.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <StatCards />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <RevenueChart />
        <TransactionTypeChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ExpenseDistributionChart />
        <GrowthMetricsChart />
      </div>

      {/* Report Generation Card */}
      <ReportGenerationCard />
    </div>
  );
};

export default AnalyticsPage;
