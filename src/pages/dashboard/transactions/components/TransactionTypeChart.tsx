
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";

// Define the chart data structure
interface DataItem {
  name: string;
  value: number;
  color: string;
}

const TransactionTypeChart: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`type-chart-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionTypeChart language updated to: ${language}`);
    setUniqueKey(`type-chart-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);

  // Generate chart data with translated type names
  const data: DataItem[] = [
    {
      name: getTransactionTranslation("typeDeposit", language),
      value: 40,
      color: "#4ade80" // green-400
    },
    {
      name: getTransactionTranslation("typeWithdrawal", language),
      value: 30,
      color: "#fb923c" // orange-400
    },
    {
      name: getTransactionTranslation("typeTransfer", language),
      value: 20,
      color: "#60a5fa" // blue-400
    },
    {
      name: getTransactionTranslation("typePayment", language),
      value: 10,
      color: "#c084fc" // purple-400
    }
  ];

  // Custom tooltip formatter that uses current language
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 border border-border/40 rounded-md p-2 text-xs backdrop-blur-md shadow-md">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that uses current language
  const renderCustomizedLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-2 text-[10px]">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}-${language}`} className="flex items-center">
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

  return (
    <div className="h-full w-full" key={uniqueKey} data-language={language}>
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
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}-${language}`} 
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

export default TransactionTypeChart;
