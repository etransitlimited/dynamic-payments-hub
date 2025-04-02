
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useLanguage } from "@/context/LanguageContext";
import { CircleDollarSign } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";

const data = [
  { name: "Marketing", value: 35 },
  { name: "Operations", value: 25 },
  { name: "Technology", value: 20 },
  { name: "Admin", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = ['#8B5CF6', '#F59E0B', '#10B981', '#6366F1', '#EC4899'];

const ExpenseDistributionChart = () => {
  const { t } = useLanguage();

  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden relative h-full">
      <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      
      {/* Purple accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-lg font-medium text-white flex items-center">
          <div className="p-1.5 bg-purple-800/40 backdrop-blur-sm rounded-md mr-3 border border-purple-700/30">
            <CircleDollarSign size={18} className="text-purple-300" />
          </div>
          <TranslatedText keyName="analytics.expenseDistribution" fallback="Expense Distribution" />
        </CardTitle>
        <div className="text-xs px-2 py-1 bg-purple-900/40 rounded-full text-purple-300 border border-purple-800/30">
          <TranslatedText keyName="analytics.byCategory" fallback="By Category" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10 pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient 
                  key={`expense-gradient-${index}`} 
                  id={`expense-gradient-${index}`} 
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
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={120}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1500}
              strokeWidth={2}
              stroke="rgba(20, 20, 30, 0.2)"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`expense-cell-${index}`} 
                  fill={`url(#expense-gradient-${index})`}
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
              formatter={(value) => [`${value}%`, 'Percentage']}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
                color: "#9CA3AF",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
