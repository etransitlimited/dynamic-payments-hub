
import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from '@/utils/languageUtils';
import { useLanguage } from "@/context/LanguageContext";

const TransactionTypeChart: React.FC = () => {
  const { language } = useLanguage();
  const { refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`transaction-type-chart-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionTypeChart language updated to: ${language}`);
    setUniqueKey(`transaction-type-chart-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);

  // Define data with translated labels
  const data = useMemo(() => [
    { 
      name: getTransactionTranslation("transactions.deposit", language as LanguageCode),
      value: 35,
      color: "#3b82f6" 
    },
    { 
      name: getTransactionTranslation("transactions.withdrawal", language as LanguageCode),
      value: 25,
      color: "#ef4444" 
    },
    { 
      name: getTransactionTranslation("transactions.transfer", language as LanguageCode),
      value: 20,
      color: "#10b981" 
    },
    { 
      name: getTransactionTranslation("transactions.payment", language as LanguageCode),
      value: 15,
      color: "#f59e0b" 
    },
    { 
      name: getTransactionTranslation("transactions.exchange", language as LanguageCode),
      value: 5,
      color: "#8b5cf6" 
    }
  ], [language, refreshCounter]);

  // Custom tooltip for better visualization
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentageText = getTransactionTranslation("transactions.percentage", language as LanguageCode);
      
      return (
        <div className="bg-background/90 border border-border/40 rounded-md p-2 text-xs backdrop-blur-md shadow-md">
          <p className="font-medium mb-1">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>{`${percentageText}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend renderer with proper translations
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-2 text-xs">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <span 
              className="inline-block w-3 h-3 mr-1.5 rounded-sm" 
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[250px] w-full" key={uniqueKey} data-language={language}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionTypeChart;
