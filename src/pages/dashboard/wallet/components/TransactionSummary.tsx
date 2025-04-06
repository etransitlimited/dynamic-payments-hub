
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import { useNavigate } from "react-router-dom";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface TransactionSummaryProps {
  selectedPeriod: 'weekly' | 'monthly' | 'quarterly';
  onPeriodChange: (period: 'weekly' | 'monthly' | 'quarterly') => void;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ 
  selectedPeriod, 
  onPeriodChange 
}) => {
  const { t } = useSafeTranslation();
  const navigate = useNavigate();
  
  // Sample data - in a real app this would come from an API based on the selected period
  const getChartData = () => {
    if (selectedPeriod === 'weekly') {
      return [
        { name: t('wallet.days.mon', 'Mon'), income: 400, expense: 240 },
        { name: t('wallet.days.tue', 'Tue'), income: 300, expense: 139 },
        { name: t('wallet.days.wed', 'Wed'), income: 200, expense: 180 },
        { name: t('wallet.days.thu', 'Thu'), income: 278, expense: 390 },
        { name: t('wallet.days.fri', 'Fri'), income: 189, expense: 480 },
        { name: t('wallet.days.sat', 'Sat'), income: 239, expense: 380 },
        { name: t('wallet.days.sun', 'Sun'), income: 349, expense: 430 }
      ];
    } else if (selectedPeriod === 'monthly') {
      return [
        { name: t('wallet.periods.week1', 'Week 1'), income: 1200, expense: 850 },
        { name: t('wallet.periods.week2', 'Week 2'), income: 940, expense: 760 },
        { name: t('wallet.periods.week3', 'Week 3'), income: 1170, expense: 1020 },
        { name: t('wallet.periods.week4', 'Week 4'), income: 1000, expense: 940 }
      ];
    } else {
      return [
        { name: t('transactions.jan', 'Jan'), income: 3200, expense: 2400 },
        { name: t('transactions.feb', 'Feb'), income: 2800, expense: 1398 },
        { name: t('transactions.mar', 'Mar'), income: 5000, expense: 3800 }
      ];
    }
  };
  
  const chartData = getChartData();
  
  return (
    <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-white text-lg flex items-center">
          <span className="bg-purple-900/30 p-2 rounded-lg mr-3">
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </span>
          <TranslatedText keyName="wallet.financialTracking.transactionSummary" fallback="Transaction Summary" />
        </CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant={selectedPeriod === 'weekly' ? "secondary" : "ghost"}
            size="sm" 
            onClick={() => onPeriodChange('weekly')}
            className={selectedPeriod === 'weekly' ? "bg-purple-600/20 text-purple-400" : "text-gray-400 hover:text-white"}
          >
            <TranslatedText keyName="wallet.periods.weekly" fallback="Weekly" />
          </Button>
          <Button 
            variant={selectedPeriod === 'monthly' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => onPeriodChange('monthly')}
            className={selectedPeriod === 'monthly' ? "bg-purple-600/20 text-purple-400" : "text-gray-400 hover:text-white"}
          >
            <TranslatedText keyName="wallet.periods.monthly" fallback="Monthly" />
          </Button>
          <Button 
            variant={selectedPeriod === 'quarterly' ? "secondary" : "ghost"} 
            size="sm" 
            onClick={() => onPeriodChange('quarterly')}
            className={selectedPeriod === 'quarterly' ? "bg-purple-600/20 text-purple-400" : "text-gray-400 hover:text-white"}
          >
            <TranslatedText keyName="wallet.periods.quarterly" fallback="Quarterly" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#4B5563',
                  color: '#F9FAFB' 
                }} 
                itemStyle={{ color: '#F9FAFB' }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar 
                dataKey="income" 
                name={t("wallet.financialTracking.income", "Income")} 
                fill="#10B981" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="expense" 
                name={t("wallet.financialTracking.expense", "Expense")} 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-sm text-gray-300">
                <TranslatedText keyName="wallet.financialTracking.income" fallback="Income" />
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm text-gray-300">
                <TranslatedText keyName="wallet.financialTracking.expense" fallback="Expense" />
              </span>
            </div>
          </div>
          <Button 
            variant="link" 
            size="sm" 
            className="text-purple-400 p-0 h-auto"
            onClick={() => navigate("/dashboard/wallet/fund-details")}
          >
            <ArrowUpDown className="h-3 w-3 mr-1" />
            <TranslatedText keyName="wallet.financialTracking.viewDetailed" fallback="View Detailed Analysis" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionSummary;
