
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { DollarSign } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const data = [
  { name: "Jan", revenue: 1800 },
  { name: "Feb", revenue: 2200 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2700 },
  { name: "May", revenue: 2900 },
  { name: "Jun", revenue: 3200 },
  { name: "Jul", revenue: 3800 },
];

const RevenueChart = () => {
  const { t } = useLanguage();

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <DollarSign size={18} className="text-purple-300" />
          </div>
          <TranslatedText keyName="analytics.revenueOverTime" fallback="Revenue Over Time" />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText keyName="analytics.monthlyData" fallback="Monthly Data" />
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
              contentStyle={{ 
                backgroundColor: 'rgba(30, 30, 40, 0.8)',
                borderColor: '#6D28D9',
                borderRadius: '0.5rem',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => [`$${value}`, 'Revenue']}
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
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
