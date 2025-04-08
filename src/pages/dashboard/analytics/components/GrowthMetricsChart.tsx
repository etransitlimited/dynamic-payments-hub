
import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const GrowthMetricsChart = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const currentLanguage = language as LanguageCode;

  // Use direct translation to ensure translations are current
  const translations = useMemo(() => ({
    growthMetrics: getDirectTranslation("analytics.growthMetrics", currentLanguage, "Growth Metrics"),
    customerGrowth: getDirectTranslation("analytics.customerGrowth", currentLanguage, "Customer Growth"),
    revenueGrowth: getDirectTranslation("analytics.revenueGrowth", currentLanguage, "Revenue Growth"),
    transactionVolume: getDirectTranslation("analytics.transactionVolume", currentLanguage, "Transaction Volume"),
    trackMetrics: getDirectTranslation("analytics.trackMetrics", currentLanguage, "Track key performance indicators over time"),
  }), [currentLanguage]);

  // Time period translations
  const timePeriodText = useMemo(() => ({
    days7: getDirectTranslation("analytics.days7", currentLanguage, "7 Days"),
    days30: getDirectTranslation("analytics.days30", currentLanguage, "30 Days"),
    days90: getDirectTranslation("analytics.days90", currentLanguage, "90 Days"),
    year1: getDirectTranslation("analytics.year1", currentLanguage, "1 Year"),
  }), [currentLanguage]);

  const data = useMemo(() => [
    { name: timePeriodText.days7, customers: 40, revenue: 24, transactions: 35 },
    { name: timePeriodText.days30, customers: 60, revenue: 47, transactions: 52 },
    { name: timePeriodText.days90, customers: 79, revenue: 73, transactions: 68 },
    { name: timePeriodText.year1, customers: 100, revenue: 100, transactions: 100 },
  ], [timePeriodText]);

  // Create a stable chart key for React's reconciliation
  const chartKey = useMemo(() => 
    `growth-chart-${currentLanguage}-${refreshCounter}`, 
    [currentLanguage, refreshCounter]
  );

  // Custom tooltip with translated series names
  const CustomTooltip = useMemo(() => {
    return ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-charcoal-dark/90 border border-blue-700/40 rounded-lg p-3 shadow-lg">
            <p className="text-white text-sm font-medium mb-1">{label}</p>
            <div className="space-y-1">
              <div className="text-blue-300 text-xs">
                <span className="w-2 h-2 inline-block rounded-full bg-blue-500 mr-1.5"></span>
                {translations.customerGrowth}: <span className="font-bold">{payload[0].value}%</span>
              </div>
              <div className="text-green-300 text-xs">
                <span className="w-2 h-2 inline-block rounded-full bg-green-500 mr-1.5"></span>
                {translations.revenueGrowth}: <span className="font-bold">{payload[1].value}%</span>
              </div>
              <div className="text-purple-300 text-xs">
                <span className="w-2 h-2 inline-block rounded-full bg-purple-500 mr-1.5"></span>
                {translations.transactionVolume}: <span className="font-bold">{payload[2].value}%</span>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };
  }, [translations]);

  return (
    <Card 
      className="border-blue-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={chartKey}
      data-language={currentLanguage}
    >
      {/* Blue accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-blue-800/40 backdrop-blur-sm rounded-md mr-3 border border-blue-700/30">
            <TrendingUp size={18} className="text-blue-300" />
          </div>
          {translations.growthMetrics}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-xs text-blue-300/80 mb-4">{translations.trackMetrics}</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
              axisLine={{ stroke: '#334155' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#94A3B8', fontSize: 12 }} 
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              name={translations.customerGrowth}
              type="monotone"
              dataKey="customers"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#3B82F6', stroke: '#1D4ED8', strokeWidth: 1 }}
            />
            <Line
              name={translations.revenueGrowth}
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#10B981', stroke: '#059669', strokeWidth: 1 }}
            />
            <Line
              name={translations.transactionVolume}
              type="monotone"
              dataKey="transactions"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#8B5CF6', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#8B5CF6', stroke: '#7C3AED', strokeWidth: 1 }}
            />
            <Legend 
              formatter={(value) => <span className="text-xs text-gray-300">{value}</span>}
              iconType="circle"
              iconSize={8}
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 10 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(GrowthMetricsChart);
