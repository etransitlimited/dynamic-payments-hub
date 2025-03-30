
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
  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#8884d8', '#4CAF50'];

  return (
    <Card 
      className="relative overflow-hidden border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300" 
      style={{ background: "linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))" }}
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2 border border-purple-400/40 shadow-inner shadow-purple-900/20">
            <BarChart3 className="text-purple-300" size={20} />
          </span>
          {t("transactions.transactionStatistics")}
        </CardTitle>
        <CardDescription className="text-purple-200/80">
          {t("transactions.transactionAnalytics")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={transactionData} id="transactionBarChart">
            <CartesianGrid strokeDasharray="3 3" stroke="#9b87f5" vertical={false} />
            <XAxis dataKey="name" stroke="#d6bcfa" />
            <YAxis stroke="#d6bcfa" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-purple-900/90 border border-purple-700 p-2 rounded shadow-lg">
                      <p className="text-purple-300">{payload[0].payload.name}</p>
                      <p className="text-white font-semibold">{payload[0].value.toLocaleString()} {t('common.transactions')}</p>
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
                <Cell key={`cell-transaction-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionCharts;
