
import React, { useMemo, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "@/context/TranslationProvider";
import { getDirectTranslation } from "@/utils/translationHelpers";

// Use React.memo to prevent unnecessary re-renders
const TransactionTypeChart = React.memo(() => {
  const { currentLanguage } = useTranslation();
  const renderCount = useRef(0);
  
  // Log render count for debugging
  renderCount.current += 1;
  console.log(`TransactionTypeChart render #${renderCount.current}, language: ${currentLanguage}`);
  
  // Get translations directly and memoize to ensure they reflect current language
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.transactionsByType", currentLanguage, "Transaction Types"),
    percentage: getDirectTranslation("analytics.percentage", currentLanguage, "Percentage"),
    payment: getDirectTranslation("common.transactionTypes.payment", currentLanguage, "Payment"),
    transfer: getDirectTranslation("common.transactionTypes.transfer", currentLanguage, "Transfer"),
    exchange: getDirectTranslation("common.transactionTypes.exchange", currentLanguage, "Exchange"),
    expense: getDirectTranslation("common.transactionTypes.expense", currentLanguage, "Expense")
  }), [currentLanguage]);

  // Create data with translations
  const data = useMemo(() => [
    { 
      name: translations.payment,
      value: 45, 
      key: "payment"
    },
    { 
      name: translations.transfer,
      value: 30, 
      key: "transfer"
    },
    { 
      name: translations.exchange, 
      value: 15, 
      key: "exchange"
    },
    { 
      name: translations.expense, 
      value: 10, 
      key: "expense"
    },
  ], [translations]);

  const COLORS = useMemo(() => ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'], []);

  // Custom tooltip component
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

  // Custom legend component
  const renderLegend = useCallback(() => {
    return (
      <div className="flex flex-col gap-2 ml-2">
        {data.map((entry, index) => (
          <div 
            key={`legend-item-${index}-${entry.key}`}
            className="flex items-center text-xs text-white/80"
          >
            <div
              className="w-2.5 h-2.5 mr-1.5 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="truncate max-w-[90px]">{entry.name}</span>
          </div>
        ))}
      </div>
    );
  }, [data, COLORS]);

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      data-language={currentLanguage}
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
          <div className="w-[75%] h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                barGap={8} 
                barSize={28} 
                layout="vertical"
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
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
                  isAnimationActive={false}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}-${entry.key}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend on the right with fixed width */}
          <div className="w-[25%] pl-2">
            {renderLegend()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

// Add display name for debugging
TransactionTypeChart.displayName = 'TransactionTypeChart';

export default TransactionTypeChart;
