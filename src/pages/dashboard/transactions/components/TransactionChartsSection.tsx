
import React from "react";
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TransactionTypeChart />
        <ExpenseDistributionChart />
      </div>
    </div>
  );
};

export default TransactionChartsSection;
