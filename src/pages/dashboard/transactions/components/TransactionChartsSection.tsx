
import React, { useEffect, useState } from "react";
import TransactionTypeChart from "./TransactionTypeChart";
import ExpenseDistributionChart from "./ExpenseDistributionChart";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "../i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionChartsSectionProps {
  className?: string;
}

const TransactionChartsSection: React.FC<TransactionChartsSectionProps> = ({ className = "" }) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`charts-section-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionChartsSection language updated to: ${language}`);
    setUniqueKey(`charts-section-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);
  
  return (
    <div className={`transaction-charts ${className}`} data-language={language} key={uniqueKey}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {getTransactionTranslation("transactions.transactionsByType", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTypeChart />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {getTransactionTranslation("transactions.expenseDistribution", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseDistributionChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionChartsSection;
