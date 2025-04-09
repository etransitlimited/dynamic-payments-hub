
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

const TransactionTypeChart: React.FC = () => {
  const { language } = useLanguage();
  
  // Use key names that match our translation files
  const data = [
    { name: 'analytics.deposits', nameKey: 'analytics.deposits', value: 35 },
    { name: 'analytics.withdrawals', nameKey: 'analytics.withdrawals', value: 25 },
    { name: 'analytics.transfers', nameKey: 'analytics.transfers', value: 20 },
    { name: 'analytics.payments', nameKey: 'analytics.payments', value: 15 },
    { name: 'analytics.others', nameKey: 'analytics.others', value: 5 }
  ];

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.transactionsByType" fallback="Transaction Types" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, <TranslatedText keyName="analytics.percentage" fallback="Percentage" />]}
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: '#334155',
                  color: '#e2e8f0' 
                }}
                labelStyle={{ color: '#e2e8f0' }}
                labelFormatter={(value) => {
                  // This handles the translation of the tooltip label (segment name)
                  return <TranslatedText keyName={value} fallback={value.split('.').pop() || value} />;
                }}
              />
              <Legend 
                formatter={(value, entry, index) => {
                  // Use the corresponding nameKey for translation
                  const item = data.find(d => d.name === value);
                  return <TranslatedText keyName={item?.nameKey || value} fallback={value.split('.').pop() || value} />;
                }}
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ paddingLeft: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
