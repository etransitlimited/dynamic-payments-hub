
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, Printer, Filter, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FinancialReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  const [dateRange, setDateRange] = useState<{start: Date, end: Date}>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  });
  const [reportType, setReportType] = useState<string>("income-expense");
  
  // Sample data for income and expenses - in a real application, this would come from an API
  const incomeExpenseData = [
    { name: t("transactions.jan") || "Jan", income: 4000, expense: 2400 },
    { name: t("transactions.feb") || "Feb", income: 3000, expense: 1398 },
    { name: t("transactions.mar") || "Mar", income: 5000, expense: 3800 },
    { name: t("transactions.apr") || "Apr", income: 2780, expense: 3908 },
    { name: t("transactions.may") || "May", income: 1890, expense: 4800 },
    { name: t("transactions.jun") || "Jun", income: 2390, expense: 3800 },
    { name: t("transactions.jul") || "Jul", income: 3490, expense: 4300 },
    { name: t("transactions.aug") || "Aug", income: 4000, expense: 2400 },
    { name: t("transactions.sep") || "Sep", income: 3000, expense: 1398 },
    { name: t("transactions.oct") || "Oct", income: 2000, expense: 9800 },
    { name: t("transactions.nov") || "Nov", income: 2780, expense: 3908 },
    { name: t("transactions.dec") || "Dec", income: 1890, expense: 4800 }
  ];
  
  const categoryData = [
    { name: getTranslation("wallet.financialTracking.categories.housing", "Housing"), value: 35 },
    { name: getTranslation("wallet.financialTracking.categories.food", "Food"), value: 20 },
    { name: getTranslation("wallet.financialTracking.categories.transport", "Transport"), value: 15 },
    { name: getTranslation("wallet.financialTracking.categories.entertainment", "Entertainment"), value: 10 },
    { name: getTranslation("wallet.financialTracking.categories.utilities", "Utilities"), value: 10 },
    { name: getTranslation("wallet.financialTracking.categories.other", "Other"), value: 10 }
  ];
  
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
  
  // Format currency amount
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Calculate report summary
  const calculateSummary = () => {
    const totalIncome = incomeExpenseData.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = incomeExpenseData.reduce((sum, item) => sum + item.expense, 0);
    const balance = totalIncome - totalExpense;
    
    return {
      totalIncome,
      totalExpense,
      balance,
      savingsRate: totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : "0.0"
    };
  };
  
  const summary = calculateSummary();
  
  return (
    <PageLayout
      title={getTranslation("wallet.financialTracking.reports", "Financial Reports")}
      subtitle={getTranslation("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis")}
      breadcrumbs={[
        {
          label: getTranslation("wallet.walletManagement", "Wallet Management"),
          href: "/dashboard/wallet"
        },
        {
          label: getTranslation("wallet.financialTracking.reports", "Financial Reports")
        }
      ]}
      actions={
        <>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {format(dateRange.start, "MMM d, yyyy")} - {format(dateRange.end, "MMM d, yyyy")}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.start}
                  selected={{
                    from: dateRange.start,
                    to: dateRange.end,
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ start: range.from, end: range.to });
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            
            <Select defaultValue="income-expense" onValueChange={setReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={getTranslation("wallet.financialTracking.reportType", "Report Type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income-expense">
                  <TranslatedText keyName="wallet.financialTracking.incomeExpense" fallback="Income & Expenses" />
                </SelectItem>
                <SelectItem value="category">
                  <TranslatedText keyName="wallet.financialTracking.categoryAnalysis" fallback="Category Analysis" />
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              <TranslatedText keyName="wallet.financialTracking.filters" fallback="Filters" />
            </Button>
            
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-1" />
              <TranslatedText keyName="wallet.exportReport" fallback="Export" />
            </Button>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              <TranslatedText keyName="wallet.financialTracking.totalIncome" fallback="Total Income" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{formatCurrency(summary.totalIncome)}</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              <TranslatedText keyName="wallet.financialTracking.totalExpenses" fallback="Total Expenses" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{formatCurrency(summary.totalExpense)}</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              <TranslatedText keyName="wallet.financialTracking.netBalance" fallback="Net Balance" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(summary.balance)}
            </div>
            <div className="text-sm text-gray-400">
              <TranslatedText keyName="wallet.financialTracking.savingsRate" fallback="Savings Rate" />: {summary.savingsRate}%
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4">
        <Tabs defaultValue="charts" className="w-full">
          <TabsList>
            <TabsTrigger value="charts">
              <TranslatedText keyName="wallet.financialTracking.charts" fallback="Charts" />
            </TabsTrigger>
            <TabsTrigger value="summary">
              <TranslatedText keyName="wallet.financialTracking.summary" fallback="Summary" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {reportType === "income-expense" ? (
                    <TranslatedText keyName="wallet.financialTracking.incomeExpenseAnalysis" fallback="Income & Expense Analysis" />
                  ) : (
                    <TranslatedText keyName="wallet.financialTracking.expenseCategoryAnalysis" fallback="Expense Category Analysis" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reportType === "income-expense" ? (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={incomeExpenseData}
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
                          formatter={(value) => formatCurrency(value as number)}
                        />
                        <Bar 
                          dataKey="income" 
                          name={t("wallet.financialTracking.income") || "Income"} 
                          fill="#10B981" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          dataKey="expense" 
                          name={t("wallet.financialTracking.expense") || "Expense"} 
                          fill="#EF4444" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            borderColor: '#4B5563',
                            color: '#F9FAFB' 
                          }} 
                          itemStyle={{ color: '#F9FAFB' }}
                          formatter={(value) => `${value}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="summary" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  <TranslatedText keyName="wallet.financialTracking.reportSummary" fallback="Report Summary" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      <TranslatedText keyName="wallet.financialTracking.overview" fallback="Overview" />
                    </h3>
                    <p className="text-gray-400">
                      <TranslatedText 
                        keyName="wallet.financialTracking.reportPeriod" 
                        fallback="This report covers the period from {startDate} to {endDate}" 
                      />
                      {": "}{format(dateRange.start, "MMMM d, yyyy")} - {format(dateRange.end, "MMMM d, yyyy")}
                    </p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">
                          <TranslatedText keyName="wallet.financialTracking.totalIncome" fallback="Total Income" />
                        </p>
                        <p className="text-green-400 font-medium">{formatCurrency(summary.totalIncome)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          <TranslatedText keyName="wallet.financialTracking.totalExpenses" fallback="Total Expenses" />
                        </p>
                        <p className="text-red-400 font-medium">{formatCurrency(summary.totalExpense)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          <TranslatedText keyName="wallet.financialTracking.netBalance" fallback="Net Balance" />
                        </p>
                        <p className={`font-medium ${summary.balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {formatCurrency(summary.balance)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          <TranslatedText keyName="wallet.financialTracking.savingsRate" fallback="Savings Rate" />
                        </p>
                        <p className="text-purple-400 font-medium">{summary.savingsRate}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      <TranslatedText keyName="wallet.financialTracking.recommendations" fallback="Recommendations" />
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-400">
                      {summary.balance < 0 && (
                        <li>
                          <TranslatedText 
                            keyName="wallet.financialTracking.reduceExpenses" 
                            fallback="Consider reducing expenses to improve your balance." 
                          />
                        </li>
                      )}
                      {Number(summary.savingsRate) < 20 && (
                        <li>
                          <TranslatedText 
                            keyName="wallet.financialTracking.increaseSavings" 
                            fallback="Try to increase your savings rate to at least 20%." 
                          />
                        </li>
                      )}
                      <li>
                        <TranslatedText 
                          keyName="wallet.financialTracking.trackExpenses" 
                          fallback="Regularly track your expenses to identify areas for improvement." 
                        />
                      </li>
                      <li>
                        <TranslatedText 
                          keyName="wallet.financialTracking.setGoals" 
                          fallback="Set specific financial goals for the next period." 
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Printer className="h-4 w-4 mr-1" />
                    <TranslatedText keyName="wallet.financialTracking.print" fallback="Print" />
                  </Button>
                  <Button variant="default" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    <TranslatedText keyName="wallet.financialTracking.downloadPDF" fallback="Download PDF" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default FinancialReportsPage;
