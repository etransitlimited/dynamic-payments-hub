
import React, { useState, useEffect, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import { LanguageCode } from "@/utils/languageUtils";

// Define the chart data structure
interface DataItem {
  name: string;
  value: number;
  color: string;
}

const TransactionTypeChart: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const currentLanguage = language as LanguageCode;
  
  // Create a stable chart key that only changes when needed
  const chartKey = useMemo(() => 
    `type-chart-${currentLanguage}-${refreshCounter}`, 
    [currentLanguage, refreshCounter]
  );

  // Generate chart data with translated type names
  const data = useMemo(() => [
    {
      name: getTransactionTranslation("typeDeposit", currentLanguage),
      value: 40,
      color: "#4ade80" // green-400
    },
    {
      name: getTransactionTranslation("typeWithdrawal", currentLanguage),
      value: 30,
      color: "#fb923c" // orange-400
    },
    {
      name: getTransactionTranslation("typeTransfer", currentLanguage),
      value: 20,
      color: "#60a5fa" // blue-400
    },
    {
      name: getTransactionTranslation("typePayment", currentLanguage),
      value: 10,
      color: "#c084fc" // purple-400
    }
  ], [currentLanguage]);

  // Custom tooltip formatter that uses current language
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

  // Custom legend that uses current language
  const renderCustomizedLegend = useMemo(() => {
    const CustomLegend = (props: any) => {
      const { payload } = props;
      
      return (
        <div className="flex flex-wrap gap-2 justify-center mt-2 text-[10px]">
          {payload.map((entry: any, index: number) => (
            <div key={`legend-${index}-${currentLanguage}`} className="flex items-center">
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
  }, [currentLanguage]);

  return (
    <div className="h-full w-full" key={chartKey} data-language={currentLanguage}>
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
            isAnimationActive={false} // Disable animations to prevent flicker during language changes
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}-${currentLanguage}`} 
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

export default React.memo(TransactionTypeChart);
