
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Wallet } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExpenseDistributionChart = () => {
  const { t } = useLanguage();

  const expenseData = [
    { 
      name: t('common.expenseTypes.advertising'), 
      value: 400,
      color: '#FF6384'
    },
    { 
      name: t('common.expenseTypes.rent'), 
      value: 300,
      color: '#36A2EB'
    },
    { 
      name: t('common.expenseTypes.subscription'), 
      value: 200,
      color: '#FFCE56'
    },
    { 
      name: t('common.expenseTypes.travel'), 
      value: 150,
      color: '#4BC0C0'
    }
  ];

  return (
    <Card 
      className="bg-gradient-to-r from-[rgb(142,45,226)] to-[rgb(74,0,224)] border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center text-white">
          <Wallet className="mr-2" /> {t("analytics.expenseDistribution")}
        </CardTitle>
        <CardDescription className="text-purple-200">
          {t("analytics.expenseAnalytics")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(142, 45, 226, 0.9)', 
                borderColor: 'rgba(74, 0, 224, 0.8)' 
              }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseDistributionChart;
