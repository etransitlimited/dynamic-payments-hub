
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GrowthMetricsChart = () => {
  const { t } = useLanguage();

  const growthData = [
    { name: t('common.months.jan'), users: 400, revenue: 240 },
    { name: t('common.months.feb'), users: 300, revenue: 139 },
    { name: t('common.months.mar'), users: 200, revenue: 980 },
    { name: t('common.months.apr'), users: 278, revenue: 390 },
    { name: t('common.months.may_short'), users: 189, revenue: 480 },
    { name: t('common.months.jun'), users: 239, revenue: 380 },
  ];

  return (
    <Card 
      className="bg-gradient-to-r from-[rgb(57,106,252)] to-[rgb(41,72,255)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(57,106,252,0.15)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center text-white">
          <TrendingUp className="mr-2" /> {t("analytics.growthMetrics")}
        </CardTitle>
        <CardDescription className="text-purple-200">
          {t("analytics.platformGrowth")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#9b87f5" vertical={false} />
            <XAxis dataKey="name" stroke="#d6bcfa" />
            <YAxis stroke="#d6bcfa" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(142, 45, 226, 0.9)', 
                borderColor: 'rgba(74, 0, 224, 0.8)' 
              }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              wrapperStyle={{ color: "#fff" }}
              formatter={(value) => {
                if (value === "users") return t("common.users");
                if (value === "revenue") return t("analytics.revenue");
                return value;
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#8884d8" 
              strokeWidth={2} 
              name="users"
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#82ca9d" 
              strokeWidth={2} 
              name="revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
