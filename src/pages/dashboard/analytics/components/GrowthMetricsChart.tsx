
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranslatedText from "@/components/translation/TranslatedText";

const GrowthMetricsChart: React.FC = () => {
  const data = [
    { name: 'Jan', customers: 400, growth: 240 },
    { name: 'Feb', customers: 550, growth: 380 },
    { name: 'Mar', customers: 600, growth: 450 },
    { name: 'Apr', customers: 750, growth: 520 },
    { name: 'May', customers: 800, growth: 600 },
    { name: 'Jun', customers: 1000, growth: 700 },
    { name: 'Jul', customers: 1200, growth: 900 },
    { name: 'Aug', customers: 1300, growth: 1000 },
  ];

  return (
    <Card className="border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)]"></div>
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-lg font-semibold">
          <TranslatedText keyName="analytics.growthMetrics" fallback="Growth Metrics" />
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-6">
        <Tabs defaultValue="customers" className="w-full">
          <TabsList className="mb-4 bg-blue-950/50 border border-blue-800/30">
            <TabsTrigger value="customers" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.customerGrowth" fallback="Customer Growth" />
            </TabsTrigger>
            <TabsTrigger value="revenue" className="data-[state=active]:bg-blue-700/50">
              <TranslatedText keyName="analytics.revenueGrowth" fallback="Revenue Growth" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customers" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: '#334155',
                    color: '#e2e8f0' 
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend 
                  formatter={(value) => {
                    const translationKeys: Record<string, string> = {
                      "customers": "analytics.totalUsers",
                      "growth": "analytics.newUsers"
                    };
                    return <TranslatedText keyName={translationKeys[value] || value} fallback={value} />;
                  }}
                />
                <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="growth" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="revenue" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: '#334155',
                    color: '#e2e8f0' 
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(value) => [`$${value}`, undefined]}
                />
                <Legend 
                  formatter={(value) => {
                    const translationKeys: Record<string, string> = {
                      "customers": "analytics.totalRevenue",
                      "growth": "analytics.revenueGrowth"
                    };
                    return <TranslatedText keyName={translationKeys[value] || value} fallback={value} />;
                  }}
                />
                <Line type="monotone" dataKey="customers" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="growth" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
