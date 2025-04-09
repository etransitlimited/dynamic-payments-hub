
import React from "react";
import { Grid } from "@/components/ui/grid";
import TransactionTypeChart from "./TransactionTypeChart";
import ExpenseDistributionChart from "./ExpenseDistributionChart";
import { useLanguage } from "@/context/LanguageContext";

interface TransactionChartsSectionProps {
  className?: string;
}

const TransactionChartsSection: React.FC<TransactionChartsSectionProps> = ({ 
  className = "" 
}) => {
  const { language } = useLanguage();
  
  return (
    <div className={`transaction-charts ${className}`} data-language={language}>
      <Grid columns={2} gap={6} className="mb-6">
        <TransactionTypeChart />
        <ExpenseDistributionChart />
      </Grid>
    </div>
  );
};

export default TransactionChartsSection;
