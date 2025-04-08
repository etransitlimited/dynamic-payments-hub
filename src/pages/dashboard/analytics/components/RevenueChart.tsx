
import React, { useMemo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign } from "lucide-react";
import { useTranslation } from "@/context/TranslationProvider";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

// Month name translations
const monthTranslations: Record<string, Record<LanguageCode, string>> = {
  "Jan": {
    "en": "Jan",
    "zh-CN": "一月",
    "zh-TW": "一月",
    "fr": "Jan",
    "es": "Ene"
  },
  "Feb": {
    "en": "Feb",
    "zh-CN": "二月",
    "zh-TW": "二月",
    "fr": "Fév",
    "es": "Feb"
  },
  "Mar": {
    "en": "Mar",
    "zh-CN": "三月",
    "zh-TW": "三月",
    "fr": "Mar",
    "es": "Mar"
  },
  "Apr": {
    "en": "Apr",
    "zh-CN": "四月",
    "zh-TW": "四月",
    "fr": "Avr",
    "es": "Abr"
  },
  "May": {
    "en": "May",
    "zh-CN": "五月",
    "zh-TW": "五月",
    "fr": "Mai",
    "es": "May"
  },
  "Jun": {
    "en": "Jun",
    "zh-CN": "六月",
    "zh-TW": "六月",
    "fr": "Juin",
    "es": "Jun"
  },
  "Jul": {
    "en": "Jul",
    "zh-CN": "七月",
    "zh-TW": "七月",
    "fr": "Juil",
    "es": "Jul"
  }
};

// Static data
const originalData = [
  { name: "Jan", revenue: 1800 },
  { name: "Feb", revenue: 2200 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2700 },
  { name: "May", revenue: 2900 },
  { name: "Jun", revenue: 3200 },
  { name: "Jul", revenue: 3800 },
];

const RevenueChart = () => {
  const { currentLanguage } = useTranslation();
  const renderCount = useRef(0);
  
  // Log render count for debugging
  renderCount.current += 1;
  console.log(`RevenueChart render #${renderCount.current}, language: ${currentLanguage}`);

  // Use direct translation to ensure getting the latest translations
  const translations = useMemo(() => ({
    revenueOverTime: getDirectTranslation("analytics.revenueOverTime", currentLanguage, "Revenue Over Time"),
    monthlyData: getDirectTranslation("analytics.monthlyData", currentLanguage, "Monthly Data"),
    revenue: getDirectTranslation("analytics.revenue", currentLanguage, "Revenue"),
  }), [currentLanguage]);

  // Process data, translate month names
  const data = useMemo(() => {
    return originalData.map(item => ({
      ...item,
      name: monthTranslations[item.name]?.[currentLanguage] || item.name
    }));
  }, [currentLanguage]);

  // Custom tooltip with memoized translations
  const CustomTooltip = React.memo(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-dark/90 border border-purple-700 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">{label}</p>
          <p className="text-purple-300 text-xs">
            <span className="font-bold">${payload[0].value.toLocaleString()}</span>{' '}
            {translations.revenue}
          </p>
        </div>
      );
    }
    return null;
  });
  
  CustomTooltip.displayName = 'CustomTooltip';

  return (
    <Card 
      className="border-purple-900/30 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      data-language={currentLanguage}
    >
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <DollarSign size={18} className="text-purple-300" />
          </div>
          {translations.revenueOverTime}
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          {translations.monthlyData}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#333', opacity: 0.2 }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#333', opacity: 0.2 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <Bar 
              dataKey="revenue" 
              fill="url(#revenueGradient)" 
              radius={[4, 4, 0, 0]}
              barSize={40}
              animationDuration={800}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(RevenueChart);
