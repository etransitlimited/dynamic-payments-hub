
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
  
  // Revenue data for the line chart with correct month translations and added label property
  const revenueData = [
    { name: `1 ${t('common.months.jan')}`, value: 212000, label: `1 ${t('common.months.jan')}` },
    { name: `7 ${t('common.months.jan')}`, value: 184000, label: `7 ${t('common.months.jan')}` },
    { name: `14 ${t('common.months.jan')}`, value: 226000, label: `14 ${t('common.months.jan')}` },
    { name: `21 ${t('common.months.jan')}`, value: 293000, label: `21 ${t('common.months.jan')}` },
    { name: `28 ${t('common.months.jan')}`, value: 258000, label: `28 ${t('common.months.jan')}` },
    { name: `4 ${t('common.months.feb')}`, value: 344000, label: `4 ${t('common.months.feb')}` },
    { name: `11 ${t('common.months.feb')}`, value: 398000, label: `11 ${t('common.months.feb')}` },
    { name: `18 ${t('common.months.feb')}`, value: 342000, label: `18 ${t('common.months.feb')}` },
    { name: `25 ${t('common.months.feb')}`, value: 377000, label: `25 ${t('common.months.feb')}` },
    { name: `4 ${t('common.months.mar')}`, value: 415000, label: `4 ${t('common.months.mar')}` },
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
          <RechartsLineChart data={revenueData} id="revenueLineChart">
            <defs>
              <linearGradient id="revenueLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
            <XAxis 
              dataKey="label" 
              stroke="#8597b4"
              height={50}
              tickMargin={10}
              angle={-30}
              textAnchor="end"
            />
            <YAxis stroke="#8597b4" />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.label}</p>
                      <p className="text-white font-semibold">
                        {t("analytics.revenue")}: ${payload[0].value.toLocaleString()}
                      </p>
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
              fill="url(#revenueLineGradient)"
              name={t("analytics.revenue")}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
