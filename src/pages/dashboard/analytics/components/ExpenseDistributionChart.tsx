
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CircleDollarSign } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const ExpenseDistributionChart = () => {
  const { t, language } = useSafeTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Monitor language changes and force re-render
  useEffect(() => {
    if (currentLanguage !== language) {
      console.log(`ExpenseDistributionChart language changed from ${currentLanguage} to ${language}`);
      setCurrentLanguage(language);
      setRefreshKey(prev => prev + 1);
    }
  }, [language, currentLanguage]);

  // Generate data with translations for current language
  const generateExpenseData = () => [
    { 
      name: t("dashboard.common.expenseTypes.advertising", "Marketing"), 
      value: 35,
      key: "advertising"
    },
    { 
      name: t("dashboard.common.expenseTypes.rent", "Operations"), 
      value: 25,
      key: "rent"
    },
    { 
      name: t("dashboard.common.expenseTypes.subscription", "Technology"), 
      value: 20,
      key: "subscription"
    },
    { 
      name: t("dashboard.common.expenseTypes.travel", "Admin"), 
      value: 15,
      key: "travel"
    },
    { 
      name: t("dashboard.common.expenseTypes.deposit", "Others"), 
      value: 5,
      key: "deposit"
    },
  ];

  const data = generateExpenseData();
  const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#6366F1', '#EC4899'];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-charcoal-dark/90 border border-purple-700 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-medium mb-1">
            {payload[0].name}
          </p>
          <p className="text-purple-300 text-xs">
            <span className="font-bold">{payload[0].value}%</span>{' '}
            <TranslatedText 
              keyName="analytics.percentage" 
              fallback="Percentage" 
              key={`percentage-${language}-${refreshKey}`}
            />
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend component
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    if (!payload || !Array.isArray(payload)) {
      return null;
    }
    
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-2">
        {payload.map((entry, index) => (
          <li key={`item-${index}-${language}-${refreshKey}`} className="flex items-center text-xs text-white/80">
            <div
              className="w-3 h-3 mr-2 rounded"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={`expense-distribution-chart-${language}-${refreshKey}`}
      data-language={language}
    >
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <CircleDollarSign size={18} className="text-purple-300" />
          </div>
          <TranslatedText 
            keyName="analytics.expenseDistribution" 
            fallback="Expense Distribution" 
            key={`title-${language}-${refreshKey}`}
          />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText 
            keyName="analytics.byCategory" 
            fallback="By Category" 
            key={`subtitle-${language}-${refreshKey}`}
          />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient 
                  key={`expense-gradient-${index}-${language}-${refreshKey}`} 
                  id={`expense-gradient-${index}`} 
                  x1="0" y1="0" x2="0" y2="1"
                >
                  <stop 
                    offset="0%" 
                    stopColor={color} 
                    stopOpacity={0.9}
                  />
                  <stop 
                    offset="100%" 
                    stopColor={color} 
                    stopOpacity={0.6}
                  />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={120}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              animationDuration={1500}
              strokeWidth={2}
              stroke="rgba(20, 20, 30, 0.2)"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`expense-cell-${index}-${language}-${refreshKey}`} 
                  fill={`url(#expense-gradient-${index})`}
                  style={{
                    filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              content={renderLegend}
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
