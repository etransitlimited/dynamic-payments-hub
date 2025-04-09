
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useTranslation } from "@/context/TranslationProvider";

const mockData = [
  { month: "Jan", monthKey: "analytics.Jan", customers: 120, revenue: 15000 },
  { month: "Feb", monthKey: "analytics.Feb", customers: 132, revenue: 17000 },
  { month: "Mar", monthKey: "analytics.Mar", customers: 141, revenue: 18500 },
  { month: "Apr", monthKey: "analytics.Apr", customers: 154, revenue: 20100 },
  { month: "May", monthKey: "analytics.May", customers: 162, revenue: 21500 },
  { month: "Jun", monthKey: "analytics.Jun", customers: 175, revenue: 23400 },
];

const GrowthMetricsChart: React.FC = () => {
  const { translate } = useTranslation();
  
  // Precompute translations for performance
  const translatedMonths = mockData.map(item => ({
    ...item,
    translatedMonth: translate(item.monthKey, item.month)
  }));
  
  const customerGrowthLabel = translate("analytics.customerGrowth", "Customer Growth");
  const revenueGrowthLabel = translate("analytics.revenueGrowth", "Revenue Growth");

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.growthMetrics" fallback="Growth Metrics" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={translatedMonths}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="translatedMonth" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
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
                labelStyle={{ color: '#e2e8f0' }}
                formatter={(value, name) => {
                  if (name === "customers") {
                    return [value, customerGrowthLabel];
                  }
                  return [`$${value}`, revenueGrowthLabel];
                }}
              />
              <Legend 
                formatter={(value) => {
                  if (value === "customers") {
                    return customerGrowthLabel;
                  }
                  return revenueGrowthLabel;
                }}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="customers" 
                stroke="#8b5cf6" 
                fillOpacity={1}
                fill="url(#colorCustomers)" 
                name="customers"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorRevenue)" 
                name="revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
