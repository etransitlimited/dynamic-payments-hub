
import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";

const TransactionCharts: React.FC = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [uniqueKey, setUniqueKey] = useState(`transaction-charts-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    console.log(`TransactionCharts language updated to: ${language}`);
    setUniqueKey(`transaction-charts-${language}-${Date.now()}-${refreshCounter}`);
  }, [language, refreshCounter]);

  // Generate monthly data with translated month names
  const data = [
    {
      name: getTransactionTranslation("transactions.jan", language),
      amount: 1200,
      rate: 40
    },
    {
      name: getTransactionTranslation("transactions.feb", language),
      amount: 900,
      rate: 30
    },
    {
      name: getTransactionTranslation("transactions.mar", language),
      amount: 1500,
      rate: 50
    },
    {
      name: getTransactionTranslation("transactions.apr", language),
      amount: 1800,
      rate: 60
    },
    {
      name: getTransactionTranslation("transactions.may", language),
      amount: 1200,
      rate: 40
    },
    {
      name: getTransactionTranslation("transactions.jun", language),
      amount: 2100,
      rate: 70
    }
  ];

  // Custom tooltip formatter based on current language
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const amountText = getTransactionTranslation("transactions.amount", language);
      const rateText = getTransactionTranslation("transactions.rate", language);
      
      return (
        <div className="bg-background/90 border border-border/40 rounded-md p-2 text-xs backdrop-blur-md shadow-md">
          <p className="font-medium mb-1">{label}</p>
          <p className="text-blue-400">{`${amountText}: $${payload[0].value}`}</p>
          <p className="text-green-400">{`${rateText}: ${payload[1].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[250px] w-full" key={uniqueKey} data-language={language}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10, fill: "currentColor" }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" fill="#60a5fa" radius={[4, 4, 0, 0]} maxBarSize={40} />
          <Bar dataKey="rate" fill="#4ade80" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionCharts;
