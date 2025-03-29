
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import StatCards from "./components/StatCards";
import RevenueChart from "./components/RevenueChart";
import TransactionTypeChart from "./components/TransactionTypeChart";
import ExpenseDistributionChart from "./components/ExpenseDistributionChart";
import GrowthMetricsChart from "./components/GrowthMetricsChart";
import ReportGenerationCard from "./components/ReportGenerationCard";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";

const AnalyticsPage = () => {
  const { t } = useLanguage();
  
  console.log("Analytics page loaded, translation function available:", !!t);

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("sidebar.analytics")}</h1>
        <p className="text-blue-300">{t("analytics.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <ComponentErrorBoundary component="Stat Cards">
        <StatCards />
      </ComponentErrorBoundary>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ComponentErrorBoundary component="Revenue Chart">
          <RevenueChart />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary component="Transaction Type Chart">
          <TransactionTypeChart />
        </ComponentErrorBoundary>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ComponentErrorBoundary component="Expense Distribution Chart">
          <ExpenseDistributionChart />
        </ComponentErrorBoundary>
        <ComponentErrorBoundary component="Growth Metrics Chart">
          <GrowthMetricsChart />
        </ComponentErrorBoundary>
      </div>

      {/* Report Generation Card */}
      <ComponentErrorBoundary component="Report Generation Card">
        <ReportGenerationCard />
      </ComponentErrorBoundary>
    </div>
  );
};

export default AnalyticsPage;
