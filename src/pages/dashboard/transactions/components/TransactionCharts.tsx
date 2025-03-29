
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";

const TransactionCharts = () => {
  const { t } = useLanguage();

  // Transaction data for the bar chart
  const transactionData = [
    { name: t('common.months.jan'), value: 1250 },
    { name: t('common.months.feb'), value: 980 },
    { name: t('common.months.mar'), value: 1580 },
    { name: t('common.months.apr'), value: 1750 },
    { name: t('common.months.may_short'), value: 850 },
    { name: t('common.months.jun'), value: 1120 },
  ];

  // Chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#4CAF50'];

  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <BarChart3 className="text-blue-400" size={20} />
          </span>
          {t("dashboard.transactions.transactionStatistics")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("dashboard.transactions.transactionAnalytics")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
            <XAxis dataKey="name" stroke="#8597b4" />
            <YAxis stroke="#8597b4" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.name}</p>
                      <p className="text-white font-semibold">{payload[0].value.toLocaleString()} {t('dashboard.common.transactions')}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {transactionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionCharts;
