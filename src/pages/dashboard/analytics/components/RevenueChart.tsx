
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useTranslation } from "@/context/TranslationProvider";

const mockData = [
  { month: "Jan", monthKey: "analytics.Jan", revenue: 1200, expenses: 900 },
  { month: "Feb", monthKey: "analytics.Feb", revenue: 1900, expenses: 1200 },
  { month: "Mar", monthKey: "analytics.Mar", revenue: 1800, expenses: 1400 },
  { month: "Apr", monthKey: "analytics.Apr", revenue: 2400, expenses: 1600 },
  { month: "May", monthKey: "analytics.May", revenue: 2200, expenses: 1800 },
  { month: "Jun", monthKey: "analytics.Jun", revenue: 2600, expenses: 2000 },
  { month: "Jul", monthKey: "analytics.Jul", revenue: 3100, expenses: 2100 },
  { month: "Aug", monthKey: "analytics.Aug", revenue: 3400, expenses: 2300 },
  { month: "Sep", monthKey: "analytics.Sep", revenue: 3300, expenses: 2200 },
  { month: "Oct", monthKey: "analytics.Oct", revenue: 3700, expenses: 2400 },
  { month: "Nov", monthKey: "analytics.Nov", revenue: 3900, expenses: 2600 },
  { month: "Dec", monthKey: "analytics.Dec", revenue: 4200, expenses: 3000 }
];

const RevenueChart: React.FC = () => {
  const { translate } = useTranslation();

  // Precompute translations for performance
  const translatedMonths = mockData.map(item => ({
    ...item,
    translatedMonth: translate(item.monthKey, item.month)
  }));

  // Precompute expense and revenue translations
  const revenueLabel = translate("analytics.revenue", "Revenue");
  const expensesLabel = translate("analytics.expenses", "Expenses");

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.revenueOverTime" fallback="Revenue Over Time" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <Tabs defaultValue="30days" className="w-full">
          <TabsList className="mb-4 bg-blue-950/50 border border-blue-800/30">
            <TabsTrigger value="7days" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.days7" fallback="7 Days" />
            </TabsTrigger>
            <TabsTrigger value="30days" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.days30" fallback="30 Days" />
            </TabsTrigger>
            <TabsTrigger value="90days" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.days90" fallback="90 Days" />
            </TabsTrigger>
            <TabsTrigger value="1year" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.year1" fallback="1 Year" />
            </TabsTrigger>
          </TabsList>

          {["7days", "30days", "90days", "1year"].map((period) => (
            <TabsContent key={period} value={period} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={translatedMonths.slice(-getDataPointCount(period))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="translatedMonth" 
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
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
                    labelStyle={{ color: '#e2e8f0' }}
                    formatter={(value, name) => {
                      const label = name === "revenue" ? revenueLabel : expensesLabel;
                      return [`$${value}`, label];
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ color: '#e2e8f0' }}
                    formatter={(value) => {
                      return value === "revenue" ? revenueLabel : expensesLabel;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: "#3b82f6" }}
                    name="revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    activeDot={{ r: 8, fill: "#ef4444" }}
                    name="expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to determine how many data points to show based on the period
const getDataPointCount = (period: string): number => {
  switch (period) {
    case "7days":
      return 3;
    case "30days":
      return 6;
    case "90days":
    case "1year":
      return 12;
    default:
      return 6;
  }
};

export default RevenueChart;
