
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";

const ExpenseDistributionChart: React.FC = () => {
  const data = [
    { name: 'analytics.tech', nameKey: 'analytics.tech', value: 2400 },
    { name: 'analytics.office', nameKey: 'analytics.office', value: 1398 },
    { name: 'analytics.marketing', nameKey: 'analytics.marketing', value: 9800 },
    { name: 'analytics.travel', nameKey: 'analytics.travel', value: 3908 },
    { name: 'analytics.services', nameKey: 'analytics.services', value: 4800 },
  ];

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
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => {
                  // Get the nameKey for this value
                  const item = data.find(d => d.name === value);
                  // Return a short name for display, we'll use the full translation in the legend
                  return value.split('.').pop() || value;
                }}
              />
              <YAxis 
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: '#334155',
                  color: '#e2e8f0' 
                }}
                labelFormatter={(value) => {
                  const item = data.find(d => d.name === value);
                  return <TranslatedText keyName={item?.nameKey || value} fallback={value} />;
                }}
                formatter={(value) => [`$${value}`, <TranslatedText keyName="analytics.expenses" fallback="Expenses" />]}
              />
              <Legend 
                formatter={(value) => {
                  const item = data.find(d => d.name === value);
                  return <TranslatedText keyName={item?.nameKey || value} fallback={value} />;
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
