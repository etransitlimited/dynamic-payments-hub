
import React, { useEffect, useState, useRef } from "react";
import TransactionTypeChart from "./TransactionTypeChart";
import ExpenseDistributionChart from "./ExpenseDistributionChart";
import { useLanguage } from "@/context/LanguageContext";
import { getTransactionTranslation } from "../i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { LanguageCode } from "@/utils/languageUtils";

interface TransactionChartsSectionProps {
  className?: string;
}

const TransactionChartsSection: React.FC<TransactionChartsSectionProps> = ({ className = "" }) => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`charts-section-${language}-${Date.now()}`);
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionChartsSection language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`charts-section-${language}-${Date.now()}-${refreshCounter}`);
    }
  }, [language, refreshCounter]);

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`charts-section-${e.detail.language}-${Date.now()}`);
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Get translated titles
  const transactionsByTypeTitle = getTransactionTranslation("transactions.transactionsByType", languageRef.current);
  const expenseDistributionTitle = getTransactionTranslation("transactions.expenseDistribution", languageRef.current);
  
  return (
    <div 
      className={`transaction-charts ${className}`} 
      data-language={languageRef.current} 
      key={uniqueKey}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {transactionsByTypeTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTypeChart key={`type-chart-${language}-${refreshCounter}`} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {expenseDistributionTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseDistributionChart key={`expense-chart-${language}-${refreshCounter}`} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionChartsSection;
