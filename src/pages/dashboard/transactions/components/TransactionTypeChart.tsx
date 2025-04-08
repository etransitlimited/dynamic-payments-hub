
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

const TransactionTypeChart: React.FC = () => {
  const { currentLanguage } = useTranslation();
  const renderCount = useRef(0);
  const previousLanguage = useRef<LanguageCode>(currentLanguage as LanguageCode);
  const stableLanguage = useRef<LanguageCode>(currentLanguage as LanguageCode);
  
  // Use a stable key for re-renders that won't change during lifecycle
  const stableKey = useRef(`chart-${Math.random().toString(36).substr(2, 9)}`);
  
  // Log render count for debugging
  renderCount.current += 1;
  console.log(`Transaction Type Chart render #${renderCount.current}, language: ${currentLanguage}`);

  // Update stable language ref when language changes
  useEffect(() => {
    if (previousLanguage.current !== currentLanguage) {
      console.log(`TransactionTypeChart: Language changed from ${previousLanguage.current} to ${currentLanguage}`);
      previousLanguage.current = currentLanguage as LanguageCode;
      stableLanguage.current = currentLanguage as LanguageCode;
    }
  }, [currentLanguage]);
  
  // Generate chart data with translated type names - stable memoization
  const data = useMemo(() => [
    {
      name: getTransactionTranslation("deposit", stableLanguage.current),
      value: 40,
      color: "#4ade80", // green-400
      key: "deposit"
    },
    {
      name: getTransactionTranslation("withdrawal", stableLanguage.current),
      value: 30,
      color: "#fb923c", // orange-400
      key: "withdrawal"
    },
    {
      name: getTransactionTranslation("transfer", stableLanguage.current),
      value: 20,
      color: "#60a5fa", // blue-400
      key: "transfer"
    },
    {
      name: getTransactionTranslation("payment", stableLanguage.current),
      value: 10,
      color: "#c084fc", // purple-400
      key: "payment"
    }
  ], [stableLanguage.current]);

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
    const CustomLegend = (props: any) => {
      const { payload } = props;
      
      return (
        <div className="flex flex-wrap gap-2 justify-center mt-2 text-[10px]">
          {payload.map((entry: any, index: number) => (
            <div key={`legend-${index}-${entry.key}`} className="flex items-center">
              <div 
                className="w-2 h-2 rounded-full mr-1" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    };
    CustomLegend.displayName = 'CustomLegend';
    return CustomLegend;
  }, []);

  return (
    <div className="h-full w-full" data-language={stableLanguage.current} key={stableKey.current}>
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
          <Legend 
            content={renderCustomizedLegend}
            verticalAlign="bottom" 
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Use React.memo for all chart components
export default React.memo(TransactionTypeChart);
