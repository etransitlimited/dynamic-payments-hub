
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { TrendingUp } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const data = [
  { name: "Jan", users: 1000, revenue: 1400, transactions: 700 },
  { name: "Feb", users: 1200, revenue: 1600, transactions: 800 },
  { name: "Mar", users: 1500, revenue: 1900, transactions: 1000 },
  { name: "Apr", users: 1300, revenue: 1700, transactions: 1100 },
  { name: "May", users: 1700, revenue: 2400, transactions: 1300 },
  { name: "Jun", users: 1600, revenue: 2200, transactions: 1200 },
  { name: "Jul", users: 2000, revenue: 2700, transactions: 1500 },
];

const GrowthMetricsChart = () => {
  const { t } = useLanguage();

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <TrendingUp size={18} className="text-purple-300" />
          </div>
          <TranslatedText keyName="analytics.growthMetrics" fallback="Growth Metrics" />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText keyName="analytics.yearToDate" fallback="Year to Date" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
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
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 30, 40, 0.8)',
                borderColor: '#6D28D9',
                borderRadius: '0.5rem',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              cursor={{ stroke: '#6D28D9', strokeWidth: 1 }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: "10px",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            />
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Line 
              type="monotone" 
              dataKey="users" 
              name={t("analytics.users") || "Users"}
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              name={t("analytics.revenue") || "Revenue"}
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={300}
            />
            <Line 
              type="monotone" 
              dataKey="transactions" 
              name={t("analytics.transactions") || "Transactions"}
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
