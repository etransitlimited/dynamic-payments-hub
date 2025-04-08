
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CircleDollarSign } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

const ExpenseDistributionChart = () => {
  const { language, refreshCounter } = useSafeTranslation();
  const [animationKey, setAnimationKey] = useState(`expense-chart-${language}-${Date.now()}`);
  
  // Update the key when language changes to force re-render
  useEffect(() => {
    setAnimationKey(`expense-chart-${language}-${refreshCounter}-${Date.now()}`);
  }, [language, refreshCounter]);

  // Use direct translation to ensure we have the latest translations
  const translations = useMemo(() => ({
    title: getDirectTranslation("analytics.expenseDistribution", language as LanguageCode, "Expense Distribution"),
    byCategory: getDirectTranslation("analytics.byCategory", language as LanguageCode, "By Category"),
    percentage: getDirectTranslation("analytics.percentage", language as LanguageCode, "Percentage"),
    marketing: getDirectTranslation("common.expenseTypes.marketing", language as LanguageCode, "Marketing"),
    operations: getDirectTranslation("common.expenseTypes.operations", language as LanguageCode, "Operations"),
    technology: getDirectTranslation("common.expenseTypes.technology", language as LanguageCode, "Technology"),
    admin: getDirectTranslation("common.expenseTypes.admin", language as LanguageCode, "Admin"),
    others: getDirectTranslation("common.expenseTypes.others", language as LanguageCode, "Others")
  }), [language, refreshCounter]);

  // Generate data with translations
  const data = useMemo(() => [
    { 
      name: translations.marketing, 
      value: 35,
      key: "marketing"
    },
    { 
      name: translations.operations, 
      value: 25,
      key: "operations"
    },
    { 
      name: translations.technology, 
      value: 20,
      key: "technology"
    },
    { 
      name: translations.admin, 
      value: 15,
      key: "admin"
    },
    { 
      name: translations.others, 
      value: 5,
      key: "others"
    },
  ], [translations]);

  const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#6366F1', '#EC4899'];

  // Custom tooltip component with translated content
  const CustomTooltip = React.useCallback(({ active, payload }: any) => {
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

  // Custom legend component with improved layout
  const renderLegend = React.useCallback((props: any) => {
    const { payload } = props;
    
    if (!payload || !Array.isArray(payload)) {
      return null;
    }
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {data.map((entry, index) => (
          <div 
            key={`item-${index}-${language}-${entry.key}`} 
            className="flex items-center text-xs text-white/80 px-1"
          >
            <div
              className="w-2 h-2 mr-1 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    );
  }, [data, language]);

  return (
    <Card 
      className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full"
      key={animationKey}
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
          {translations.title}
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          {translations.byCategory}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-2 pb-4">
        <div className="flex flex-col items-center">
          {/* Fix height to ensure chart fits properly */}
          <div className="w-full h-[160px] sm:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={4}
                  dataKey="value"
                  nameKey="name"
                  animationDuration={800}
                  strokeWidth={2}
                  stroke="rgba(20, 20, 30, 0.2)"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`expense-cell-${index}-${language}-${entry.key}`} 
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Custom legend with compact layout */}
          <Legend 
            content={renderLegend}
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(ExpenseDistributionChart);
