
import React from "react";
import { LineChart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const RevenueChart = () => {
  const { t } = useLanguage();
  
  // Revenue data for the line chart
  const revenueData = [
    { name: t('common.months.jan'), value: 212000 },
    { name: t('common.months.jan'), value: 184000 },
    { name: t('common.months.jan'), value: 226000 },
    { name: t('common.months.jan'), value: 293000 },
    { name: t('common.months.jan'), value: 258000 },
    { name: t('common.months.feb'), value: 344000 },
    { name: t('common.months.feb'), value: 398000 },
    { name: t('common.months.feb'), value: 342000 },
    { name: t('common.months.feb'), value: 377000 },
    { name: t('common.months.mar'), value: 415000 },
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <LineChart className="text-blue-400" size={20} />
          </span>
          {t("analytics.revenueOverTime")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("analytics.last30Days")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
            <XAxis dataKey="name" stroke="#8597b4" />
            <YAxis stroke="#8597b4" />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.name}</p>
                      <p className="text-white font-semibold">${payload[0].value.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#0f172a' }}
              activeDot={{ stroke: '#3b82f6', strokeWidth: 2, r: 6, fill: '#0f172a' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
