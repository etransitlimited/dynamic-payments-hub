
import React from "react";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const GrowthMetricsChart = () => {
  const { t } = useLanguage();
  
  // Growth metrics data for the area chart with correct month translations and added label property
  const growthData = [
    { 
      name: t('common.months.jan'), 
      users: 1540, 
      transactions: 4200, 
      revenue: 145000,
      label: t('common.months.jan')
    },
    { 
      name: t('common.months.feb'), 
      users: 1840, 
      transactions: 4800, 
      revenue: 178000,
      label: t('common.months.feb')
    },
    { 
      name: t('common.months.mar'), 
      users: 2140, 
      transactions: 5300, 
      revenue: 215000,
      label: t('common.months.mar')
    },
    { 
      name: t('common.months.apr'), 
      users: 2350, 
      transactions: 5900, 
      revenue: 245000,
      label: t('common.months.apr')
    },
    { 
      name: t('common.months.may_short'), 
      users: 2780, 
      transactions: 6500, 
      revenue: 285000,
      label: t('common.months.may_short')
    },
    { 
      name: t('common.months.jun'), 
      users: 3150, 
      transactions: 7200, 
      revenue: 325000,
      label: t('common.months.jun')
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-yellow-500/20 p-2 rounded-full mr-2">
            <TrendingUp className="text-yellow-400" size={20} />
          </span>
          {t("analytics.growthMetrics")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("analytics.platformGrowth")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={growthData} id="growthAreaChart">
            <defs>
              <linearGradient id="growthUsersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="growthTransactionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="growthRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
            <XAxis 
              dataKey="label" 
              stroke="#8597b4"
              tickMargin={5}
            />
            <YAxis stroke="#8597b4" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.label}</p>
                      <div className="grid gap-1">
                        <p className="text-blue-400 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 mr-1 rounded-full"></span>
                          {payload[0].value.toLocaleString()} {t('common.users')}
                        </p>
                        <p className="text-purple-400 flex items-center">
                          <span className="w-2 h-2 bg-purple-500 mr-1 rounded-full"></span>
                          {payload[1].value.toLocaleString()} {t('common.transactions')}
                        </p>
                        <p className="text-green-400 flex items-center">
                          <span className="w-2 h-2 bg-green-500 mr-1 rounded-full"></span>
                          ${payload[2].value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="users" 
              strokeWidth={2}
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#growthUsersGradient)" 
              name={t('common.users')}
            />
            <Area 
              type="monotone" 
              dataKey="transactions" 
              strokeWidth={2}
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#growthTransactionsGradient)"
              name={t('common.transactions')}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              strokeWidth={2}
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#growthRevenueGradient)" 
              name={t('analytics.revenue')}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GrowthMetricsChart;
