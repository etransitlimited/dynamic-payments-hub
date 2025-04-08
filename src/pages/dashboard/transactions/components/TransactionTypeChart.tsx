
import React, { useState, useEffect, useMemo, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";
import { useTranslation } from "@/context/TranslationProvider";

// Define the chart data structure
interface DataItem {
  name: string;
  value: number;
  color: string;
  key: string;
}

const TransactionTypeChart = React.memo(() => {
  const { currentLanguage } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const stableKey = useRef(`chart-${Math.random().toString(36).substr(2, 9)}`);
  const stableLanguageRef = useRef<LanguageCode>(currentLanguage as LanguageCode);
  
  // Update DOM directly when language changes
  useEffect(() => {
    if (currentLanguage !== stableLanguageRef.current) {
      console.log(`TransactionTypeChart: Language changed from ${stableLanguageRef.current} to ${currentLanguage}`);
      stableLanguageRef.current = currentLanguage as LanguageCode;
      
      // Update DOM directly
      if (chartRef.current) {
        // Update container language attribute
        chartRef.current.setAttribute('data-language', currentLanguage);
        
        // Update text elements that represent labels
        const textElements = chartRef.current.querySelectorAll('text');
        textElements.forEach(el => {
          const key = el.getAttribute('data-key');
          if (key) {
            const translation = getTransactionTranslation(key, currentLanguage as LanguageCode);
            if (translation) {
              el.textContent = translation;
            }
          }
        });
      }
    }
  }, [currentLanguage]);
  
  // Listen for language change events
  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== stableLanguageRef.current) {
        stableLanguageRef.current = newLanguage as LanguageCode;
        
        // Update DOM directly
        if (chartRef.current) {
          // Update container language attribute
          chartRef.current.setAttribute('data-language', newLanguage);
          
          // Update text elements that represent labels
          const textElements = chartRef.current.querySelectorAll('text');
          textElements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (key) {
              const translation = getTransactionTranslation(key, newLanguage as LanguageCode);
              if (translation) {
                el.textContent = translation;
              }
            }
          });
        }
      }
    };
    
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
    };
  }, []);
  
  // Generate chart data with translated type names - use stable references
  const data = useMemo(() => [
    {
      name: getTransactionTranslation("deposit", stableLanguageRef.current),
      value: 40,
      color: "#4ade80", // green-400
      key: "deposit"
    },
    {
      name: getTransactionTranslation("withdrawal", stableLanguageRef.current),
      value: 30,
      color: "#fb923c", // orange-400
      key: "withdrawal"
    },
    {
      name: getTransactionTranslation("transfer", stableLanguageRef.current),
      value: 20,
      color: "#60a5fa", // blue-400
      key: "transfer"
    },
    {
      name: getTransactionTranslation("payment", stableLanguageRef.current),
      value: 10,
      color: "#c084fc", // purple-400
      key: "payment"
    }
  ], []);

  // Custom tooltip formatter with stable reference
  const CustomTooltip = useMemo(() => {
    const TooltipComponent = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-background/90 border border-border/40 rounded-md p-2 text-xs backdrop-blur-md shadow-md">
            <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
          </div>
        );
      }
      return null;
    };
    TooltipComponent.displayName = 'CustomTooltip';
    return TooltipComponent;
  }, []);

  // Custom legend with stable reference
  const renderCustomizedLegend = useMemo(() => {
    return (props: any) => {
      const { payload } = props;
      
      return (
        <div className="flex flex-wrap gap-2 justify-center mt-2 text-[10px]">
          {payload.map((entry: any, index: number) => (
            <div key={`legend-${index}-${entry.key}`} className="flex items-center">
              <div 
                className="w-2 h-2 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              <span 
                className="text-xs"
                data-key={entry.key}
              >
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    };
  }, []);

  return (
    <div 
      className="h-full w-full" 
      data-language={stableLanguageRef.current} 
      ref={chartRef} 
      key={stableKey.current}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            isAnimationActive={false} // Disable animations completely
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}-${entry.key}`} 
                fill={entry.color} 
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={renderCustomizedLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

TransactionTypeChart.displayName = 'TransactionTypeChart';

export default TransactionTypeChart;
