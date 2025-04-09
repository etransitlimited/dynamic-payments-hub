
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useTranslation } from "@/context/TranslationProvider";

const ExpenseDistributionChart: React.FC = () => {
  const { translate } = useTranslation();

  // Use translation keys for categories
  const data = [
    {
      name: "tech",
      nameKey: "analytics.tech",
      value: 42,
    },
    {
      name: "office",
      nameKey: "analytics.office",
      value: 28,
    },
    {
      name: "marketing",
      nameKey: "analytics.marketing",
      value: 15,
    },
    {
      name: "travel",
      nameKey: "analytics.travel",
      value: 10,
    },
    {
      name: "services",
      nameKey: "analytics.services",
      value: 5,
    }
  ];

  // Precompute translations for performance
  const translatedData = data.map(item => ({
    ...item,
    translatedName: translate(item.nameKey, item.name)
  }));

  const percentageLabel = translate("analytics.percentage", "Percentage");

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.expenseDistribution" fallback="Expense Distribution" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={translatedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                type="number" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => `${value}%`}
              />
              <YAxis 
                dataKey="translatedName" 
                type="category" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: '#334155',
                  color: '#e2e8f0' 
                }}
                formatter={(value) => [`${value}%`, percentageLabel]}
              />
              <Bar 
                dataKey="value" 
                fill="#10b981" 
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
