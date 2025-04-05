
import React, { useState } from "react";
import { FileBarChart, Download, Calendar, Filter, FileDown, PieChart, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format, subDays, subMonths } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, Legend } from "recharts";
import TranslatedText from "@/components/translation/TranslatedText";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { useToast } from "@/hooks/use-toast";

const FinancialReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  const { toast } = useToast();
  const [reportType, setReportType] = useState('income-expense');
  const [period, setPeriod] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);
  
  // Generate dates for the period selector
  const currentDate = new Date();
  const startDate = period === 'weekly' 
    ? subDays(currentDate, 7) 
    : period === 'monthly' 
      ? subMonths(currentDate, 1)
      : subMonths(currentDate, 3);
  
  // Sample data for reports - would come from API in real app
  const incomeExpenseData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 }
  ];
  
  const categoryData = [
    { name: getTranslation('wallet.financialTracking.categories.housing', 'Housing'), value: 35 },
    { name: getTranslation('wallet.financialTracking.categories.food', 'Food'), value: 20 },
    { name: getTranslation('wallet.financialTracking.categories.transport', 'Transport'), value: 15 },
    { name: getTranslation('wallet.financialTracking.categories.entertainment', 'Entertainment'), value: 10 },
    { name: getTranslation('wallet.financialTracking.categories.utilities', 'Utilities'), value: 10 },
    { name: getTranslation('wallet.financialTracking.categories.other', 'Other'), value: 10 }
  ];
  
  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#10B981', '#6366F1'];
  
  // Calculate summary data
  const totalIncome = incomeExpenseData.reduce((acc, item) => acc + item.income, 0);
  const totalExpenses = incomeExpenseData.reduce((acc, item) => acc + item.expense, 0);
  const netBalance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((netBalance / totalIncome) * 100) : 0;
  
  // Handle export button click
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate export process
    toast({
      title: getTranslation('wallet.exportStarted', 'Export Started'),
      description: getTranslation('wallet.exportInProgress', 'Your report is being generated and will be available for download soon'),
    });
    
    // Simulate download completion after 2 seconds
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger a file download
    }, 2000);
  };
  
  return (
    <PageLayout
      title={getTranslation('wallet.financialTracking.reports', 'Financial Reports')}
      subtitle={getTranslation('wallet.financialTracking.reportsDesc', 'Generate financial statements and analysis')}
      breadcrumbs={[
        {
          label: getTranslation('wallet.walletManagement', 'Wallet Management'),
          href: "/dashboard/wallet"
        },
        {
          label: getTranslation('wallet.financialTracking.reports', 'Financial Reports')
        }
      ]}
    >
      <div className="space-y-6">
        {/* Filter Section */}
        <Card className="border-purple-900/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              <TranslatedText keyName="wallet.financialTracking.filters" fallback="Filters" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-full sm:w-1/3">
              <label className="text-sm text-muted-foreground block mb-2">
                <TranslatedText keyName="wallet.financialTracking.reportType" fallback="Report Type" />
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income-expense">
                    <TranslatedText keyName="wallet.financialTracking.incomeExpense" fallback="Income & Expenses" />
                  </SelectItem>
                  <SelectItem value="category-analysis">
                    <TranslatedText keyName="wallet.financialTracking.categoryAnalysis" fallback="Category Analysis" />
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/3">
              <label className="text-sm text-muted-foreground block mb-2">
                <TranslatedText keyName="wallet.periods.period" fallback="Period" />
              </label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">
                    <TranslatedText keyName="wallet.periods.weekly" fallback="Weekly" />
                  </SelectItem>
                  <SelectItem value="monthly">
                    <TranslatedText keyName="wallet.periods.monthly" fallback="Monthly" />
                  </SelectItem>
                  <SelectItem value="quarterly">
                    <TranslatedText keyName="wallet.periods.quarterly" fallback="Quarterly" />
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-1/3 mt-6 sm:mt-0">
              <Button 
                variant="outline"
                className="w-full"
                onClick={handleExport}
                disabled={isExporting}
              >
                <FileDown className="mr-2 h-4 w-4" />
                <TranslatedText keyName="wallet.exportReport" fallback="Export Report" />
                {isExporting && <span className="ml-2">...</span>}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Reports Section */}
        <Tabs defaultValue="charts" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="charts">
                <BarChart3 className="mr-2 h-4 w-4" />
                <TranslatedText keyName="wallet.financialTracking.charts" fallback="Charts" />
              </TabsTrigger>
              <TabsTrigger value="summary">
                <FileBarChart className="mr-2 h-4 w-4" />
                <TranslatedText keyName="wallet.financialTracking.summary" fallback="Summary" />
              </TabsTrigger>
            </TabsList>
            
            <Badge variant="outline" className="bg-purple-900/20 text-purple-400">
              {format(startDate, 'MMM dd, yyyy')} - {format(currentDate, 'MMM dd, yyyy')}
            </Badge>
          </div>
          
          <TabsContent value="charts" className="mt-6">
            {reportType === 'income-expense' ? (
              <Card className="border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <TranslatedText keyName="wallet.financialTracking.incomeExpenseAnalysis" fallback="Income & Expense Analysis" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
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
                        />
                        <Legend />
                        <Bar dataKey="income" name={getTranslation('wallet.financialTracking.income', 'Income')} fill="#10B981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expense" name={getTranslation('wallet.financialTracking.expense', 'Expense')} fill="#EF4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-purple-900/30">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <TranslatedText keyName="wallet.financialTracking.expenseCategoryAnalysis" fallback="Expense Category Analysis" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
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
                          formatter={(value) => [`${value}%`, ""]}
                        />
                        <Legend />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="summary">
            <Card className="border-purple-900/30">
              <CardHeader>
                <CardTitle className="text-lg">
                  <TranslatedText keyName="wallet.financialTracking.reportSummary" fallback="Report Summary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-md font-medium mb-2">
                    <TranslatedText keyName="wallet.financialTracking.overview" fallback="Overview" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    <TranslatedText 
                      keyName="wallet.financialTracking.reportPeriod" 
                      fallback={`This report covers the period from ${format(startDate, 'MMM dd, yyyy')} to ${format(currentDate, 'MMM dd, yyyy')}`}
                      values={{
                        startDate: format(startDate, 'MMM dd, yyyy'),
                        endDate: format(currentDate, 'MMM dd, yyyy')
                      }}
                    />
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-charcoal-dark/40 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        <TranslatedText keyName="wallet.financialTracking.totalIncome" fallback="Total Income" />
                      </div>
                      <div className="text-xl font-medium text-green-400">${totalIncome.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-charcoal-dark/40 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        <TranslatedText keyName="wallet.financialTracking.totalExpenses" fallback="Total Expenses" />
                      </div>
                      <div className="text-xl font-medium text-red-400">${totalExpenses.toLocaleString()}</div>
                    </div>
                    
                    <div className="bg-charcoal-dark/40 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        <TranslatedText keyName="wallet.financialTracking.netBalance" fallback="Net Balance" />
                      </div>
                      <div className={`text-xl font-medium ${netBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${netBalance.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="bg-charcoal-dark/40 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        <TranslatedText keyName="wallet.financialTracking.savingsRate" fallback="Savings Rate" />
                      </div>
                      <div className={`text-xl font-medium ${savingsRate >= 15 ? 'text-green-400' : 'text-orange-400'}`}>
                        {savingsRate}%
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">
                    <TranslatedText keyName="wallet.financialTracking.recommendations" fallback="Recommendations" />
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    <li>
                      <TranslatedText keyName="wallet.financialTracking.reduceExpenses" fallback="Consider reducing expenses to improve your balance." />
                    </li>
                    <li>
                      <TranslatedText keyName="wallet.financialTracking.increaseSavings" fallback="Try to increase your savings rate to at least 20%." />
                    </li>
                    <li>
                      <TranslatedText keyName="wallet.financialTracking.trackExpenses" fallback="Regularly track your expenses to identify areas for improvement." />
                    </li>
                    <li>
                      <TranslatedText keyName="wallet.financialTracking.setGoals" fallback="Set specific financial goals for the next period." />
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={handleExport} disabled={isExporting}>
                    <Download className="mr-2 h-4 w-4" />
                    <TranslatedText keyName="wallet.financialTracking.downloadPDF" fallback="Download PDF" />
                  </Button>
                  <Button variant="secondary">
                    <Calendar className="mr-2 h-4 w-4" />
                    <TranslatedText keyName="wallet.financialTracking.print" fallback="Print" />
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
