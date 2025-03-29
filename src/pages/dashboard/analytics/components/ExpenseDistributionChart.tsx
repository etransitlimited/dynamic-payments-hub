
import React, { useMemo } from "react";
import { PieChart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePerformance } from "@/hooks/use-performance";
import { formatUSD } from "@/utils/currencyUtils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  Legend
} from "recharts";

const ExpenseDistributionChart = () => {
  const { t } = useLanguage();
  const { performanceTier } = usePerformance();
  
  // Expense distribution data for the pie chart with correct translations and USD formatting
  const expenseDistributionData = useMemo(() => [
    { 
      name: "advertising", 
      value: 5840,
      label: t('common.expenseTypes.advertising')
    },
    { 
      name: "rent", 
      value: 3562,
      label: t('common.expenseTypes.rent')
    },
    { 
      name: "subscription", 
      value: 2753,
      label: t('common.expenseTypes.subscription')
    },
    { 
      name: "deposit", 
      value: 1893,
      label: t('common.expenseTypes.deposit')
    },
    { 
      name: "travel", 
      value: 1258,
      label: t('common.expenseTypes.travel')
    },
  ], [t]);

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Optimize rendering based on performance tier
  const renderLabels = performanceTier !== 'low';
  const outerRadius = performanceTier === 'low' ? 100 : 120;
  
  return (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center">
          <span className="bg-green-500/20 p-2 rounded-full mr-2">
            <PieChart className="text-green-400" size={20} />
          </span>
          {t("analytics.expenseDistribution")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("analytics.byExpenseType")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 h-[320px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart id="expenseDistributionPieChart">
            <Pie
              data={expenseDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey="value"
              label={renderLabels ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` : undefined}
              labelLine={renderLabels ? { stroke: '#8597b4', strokeWidth: 0.5 } : false}
              nameKey="label"
            >
              {expenseDistributionData.map((entry, index) => (
                <Cell key={`cell-expense-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {!renderLabels && (
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ fontSize: '12px', color: '#8597b4' }}
              />
            )}
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  // Ensure the value is a number before passing to formatUSD
                  const value = payload[0].value;
                  const numericValue = typeof value === 'number' ? value : 0;
                  
                  return (
                    <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                      <p className="text-blue-300">{payload[0].payload.label}</p>
                      <p className="text-white font-semibold">
                        {t("common.expense")}: {formatUSD(numericValue)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Export memoized component for better performance
export default React.memo(ExpenseDistributionChart);
