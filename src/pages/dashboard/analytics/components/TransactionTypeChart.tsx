
import React from "react";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const TransactionTypeChart = () => {
  const { t, language } = useLanguage();
  
  // Transaction type data for the bar chart with fully qualified paths
  const transactionTypeData = [
    { 
      name: "deposit", 
      value: 1250,
      label: t('transactions.deposit')
    },
    { 
      name: "withdrawal", 
      value: 980,
      label: t('transactions.withdrawal')
    },
    { 
      name: "transfer", 
      value: 1580,
      label: t('common.transfer')
    },
    { 
      name: "payment", 
      value: 1750,
      label: t('common.payment')
    },
    { 
      name: "exchange", 
      value: 850,
      label: t('common.exchange')
    },
  ];

  // Chart colors with unique ID
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const chartId = "transactionTypeChart";

  return (
    <Card className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center text-white">
          <BarChart3 className="mr-2" /> {t("analytics.transactionsByType")}
        </CardTitle>
        <CardDescription className="text-purple-200">
          {t("analytics.distributionByType")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={transactionTypeData} 
            id={chartId}
            margin={{
              top: 5,
              right: 30,
              left: 30,
              bottom: 70
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#9b87f5" vertical={false} />
            <XAxis 
              dataKey="label" 
              stroke="#d6bcfa" 
              tick={{ fill: '#d6bcfa' }}
              tickLine={{ stroke: '#d6bcfa' }}
              height={60}
              tickMargin={15}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              stroke="#d6bcfa" 
              tick={{ fill: '#d6bcfa' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(142, 45, 226, 0.9)', 
                borderColor: 'rgba(74, 0, 224, 0.8)' 
              }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
            >
              {transactionTypeData.map((entry, index) => (
                <Cell 
                  key={`cell-${chartId}-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionTypeChart;
