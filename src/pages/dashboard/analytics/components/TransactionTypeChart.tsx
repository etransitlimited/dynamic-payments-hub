
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
  
  console.log("TransactionTypeChart loaded, language:", language);
  
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
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-purple-500/20 p-2 rounded-full mr-2">
            <BarChart3 className="text-purple-400" size={20} />
          </span>
          {t("analytics.transactionsByType")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
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
            <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
            <XAxis 
              dataKey="label" 
              stroke="#8597b4" 
              tick={{ fill: '#8597b4' }}
              tickLine={{ stroke: '#8597b4' }}
              height={60}
              tickMargin={15}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              stroke="#8597b4" 
              tick={{ fill: '#8597b4' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.label}</p>
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
