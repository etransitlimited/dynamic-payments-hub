
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { BarChart3 } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const TransactionTypeChart = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [componentKey, setComponentKey] = useState(`transaction-chart-${Date.now()}`);
  
  // Generate a stable component key for re-renders
  useEffect(() => {
    setComponentKey(`transaction-chart-${language}-${refreshCounter}-${Date.now()}`);
  }, [language, refreshCounter]);

  // Get translations using direct access for better reliability
  const translations = useMemo(() => ({
    title: getDirectTranslation("transactions.transactionsByType", language as LanguageCode, "Transactions by Type"),
    percentage: getDirectTranslation("analytics.percentage", language as LanguageCode, "Percentage"),
    payment: getDirectTranslation("transactions.payment", language as LanguageCode, "Payment"),
    transfer: getDirectTranslation("transactions.transfer", language as LanguageCode, "Transfer"),
    exchange: getDirectTranslation("transactions.exchange", language as LanguageCode, "Exchange"),
    expense: getDirectTranslation("transactions.expense", language as LanguageCode, "Expense"),
  }), [language, refreshCounter]);

  // Create data with translations
  const data = useMemo(() => [
    { 
      name: translations.payment,
      value: 45, 
      key: "payment",
    },
    { 
      name: translations.transfer,
      value: 30, 
      key: "transfer",
    },
    { 
      name: translations.exchange, 
      value: 15, 
      key: "exchange",
    },
    { 
      name: translations.expense, 
      value: 10, 
      key: "expense",
    },
  ], [translations]);

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];

  // Custom tooltip component with translation support
  const CustomTooltip = useCallback(({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-dark/90 border border-purple-700 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">
            {payload[0].name}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-bold">{payload[0].value}%</span>{' '}
            {translations.percentage}
          </p>
        </div>
      );
    }
    return null;
  }, [translations.percentage]);

  // Custom legend renderer
  const renderLegend = useCallback((props: any) => {
    const { payload } = props || {};
    
    if (!payload || !Array.isArray(payload)) {
      return null;
    }
    
    return (
      <ul className="flex flex-col items-start space-y-2 mt-2">
        {data.map((entry, index) => (
          <li key={`legend-item-${index}-${language}`} className="flex items-center text-xs text-white/80">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </li>
        ))}
      </ul>
    );
  }, [data, language]);

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={componentKey}
      data-language={language}
    >
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <BarChart3 size={18} className="text-purple-300" />
          </div>
          {translations.title}
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          {translations.percentage}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4 pb-2 px-2 sm:px-6">
        <div className="flex flex-row justify-between items-start">
          <ResponsiveContainer width="80%" height={260}>
            <BarChart 
              data={data} 
              barGap={8} 
              barSize={28} 
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                width={90}
                tickMargin={8}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}-${language}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* Legend on the right */}
          <div className="w-[20%] px-2">
            <Legend 
              content={renderLegend} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
