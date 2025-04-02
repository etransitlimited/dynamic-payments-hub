
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const TransactionTypeChart = () => {
  const { t } = useSafeTranslation();

  // Transaction types data with translation keys
  const data = [
    { name: t("transactions.payment"), value: 45, key: "payment" },
    { name: t("transactions.transfer"), value: 30, key: "transfer" },
    { name: t("transactions.exchange"), value: 15, key: "exchange" },
    { name: t("transactions.expense"), value: 10, key: "expense" },
  ];

  const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#6366F1'];

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <PieChartIcon size={18} className="text-purple-300" />
          </div>
          <TranslatedText keyName="analytics.transactionsByType" fallback="Transaction Types" />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText keyName="analytics.percentage" fallback="Percentage" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient 
                  key={`gradient-${index}`} 
                  id={`gradient-${index}`} 
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
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
              animationDuration={1500}
              strokeWidth={3}
              stroke="rgba(20, 20, 30, 0.2)"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                  style={{
                    filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.3))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 30, 40, 0.8)',
                borderColor: '#6D28D9',
                borderRadius: '0.5rem',
                color: 'white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value) => [`${value}%`, t("analytics.percentage")]}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value, entry, index) => (
                <span className="text-gray-300">
                  {data[index].name}
                </span>
              )}
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
