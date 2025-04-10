
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
  const chartTitleRefs = useRef<{
    typeChart: HTMLDivElement | null;
    expenseChart: HTMLDivElement | null;
  }>({ typeChart: null, expenseChart: null });
  
  // Force refresh when language changes
  useEffect(() => {
    if (language !== languageRef.current) {
      console.log(`TransactionChartsSection language updated to: ${language}`);
      languageRef.current = language as LanguageCode;
      setUniqueKey(`charts-section-${language}-${Date.now()}-${refreshCounter}`);
      
      // Update the chart titles directly in the DOM
      updateChartTitles();
    }
  }, [language, refreshCounter]);

  // Update chart titles directly in the DOM for immediate feedback
  const updateChartTitles = () => {
    const transactionsByTypeTitle = getTransactionTranslation("transactions.transactionsByType", languageRef.current);
    const expenseDistributionTitle = getTransactionTranslation("transactions.expenseDistribution", languageRef.current);
    
    if (chartTitleRefs.current.typeChart) {
      chartTitleRefs.current.typeChart.textContent = transactionsByTypeTitle;
    }
    
    if (chartTitleRefs.current.expenseChart) {
      chartTitleRefs.current.expenseChart.textContent = expenseDistributionTitle;
    }
  };

  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      if (e.detail && e.detail.language && e.detail.language !== languageRef.current) {
        languageRef.current = e.detail.language as LanguageCode;
        setUniqueKey(`charts-section-${e.detail.language}-${Date.now()}`);
        
        // Update translations immediately when language changes
        updateChartTitles();
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    // Initialize translations
    updateChartTitles();
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Set ref callback functions to get references to the title elements
  const setTypeChartTitleRef = (element: HTMLDivElement) => {
    chartTitleRefs.current.typeChart = element;
    if (element) {
      element.textContent = getTransactionTranslation("transactions.transactionsByType", languageRef.current);
    }
  };
  
  const setExpenseChartTitleRef = (element: HTMLDivElement) => {
    chartTitleRefs.current.expenseChart = element;
    if (element) {
      element.textContent = getTransactionTranslation("transactions.expenseDistribution", languageRef.current);
    }
  };
  
  return (
    <div 
      className={`transaction-charts ${className}`} 
      data-language={languageRef.current} 
      key={uniqueKey}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle 
              ref={setTypeChartTitleRef} 
              className="text-lg font-medium"
            >
              {getTransactionTranslation("transactions.transactionsByType", languageRef.current)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTypeChart key={`type-chart-${language}-${refreshCounter}`} />
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle 
              ref={setExpenseChartTitleRef}
              className="text-lg font-medium"
            >
              {getTransactionTranslation("transactions.expenseDistribution", languageRef.current)}
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
