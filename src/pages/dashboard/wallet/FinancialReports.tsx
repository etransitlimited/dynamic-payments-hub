
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { FileText, ArrowLeft, FileBarChart, Download, Filter, Printer, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"];

const FinancialReports: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(`financial-reports-${language}-${Date.now()}`);
  const pageLanguage = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  const instanceId = useRef(`reports-${Math.random().toString(36).substring(2, 9)}`);
  const [activeTab, setActiveTab] = useState("income-expense");
  const [reportPeriod, setReportPeriod] = useState("this-month");
  
  // Force component to re-render when language changes
  useEffect(() => {
    console.log(`FinancialReports: Language changed to ${language}, updating component...`);
    setForceUpdateKey(`financial-reports-${language}-${Date.now()}`);
    
    // Force additional update after a short delay to ensure translations are applied
    const timer = setTimeout(() => {
      if (document.documentElement.lang !== language) {
        document.documentElement.lang = language as LanguageCode;
      }
      setForceUpdateKey(`financial-reports-${language}-${Date.now()}-delayed`);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [language]);
  
  // Cache translated values for consistent rendering
  const translateWithCache = (key: string, fallback: string): string => {
    return getDirectTranslation(key, language as LanguageCode, fallback);
  };
  
  // Navigation links for wallet section with direct translation access
  const walletNavItems = React.useMemo(() => [
    {
      path: "/dashboard/wallet",
      title: translateWithCache("wallet.overview", "Overview"),
      subtitle: translateWithCache("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details"),
      icon: <FileBarChart size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/financial-calendar",
      title: translateWithCache("wallet.financialTracking.calendar", "Financial Calendar"),
      subtitle: translateWithCache("wallet.financialTracking.calendarDesc", "Track scheduled payments and income"),
      icon: <Calendar size={16} className="mr-2 text-green-400" />
    },
    {
      path: "/dashboard/wallet/financial-reports",
      title: translateWithCache("wallet.financialTracking.reports", "Financial Reports"),
      subtitle: translateWithCache("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis"),
      icon: <FileText size={16} className="mr-2 text-indigo-400" />,
      isActive: true
    }
  ], [language]); // Depend on language for re-creation
  
  const breadcrumbs = React.useMemo(() => [
    {
      label: translateWithCache("sidebar.dashboard", "Dashboard"),
      href: "/dashboard"
    },
    {
      label: translateWithCache("wallet.walletManagement", "Wallet Management"),
      href: "/dashboard/wallet"
    },
    {
      label: translateWithCache("wallet.financialTracking.reports", "Financial Reports")
    }
  ], [language]); // Depend on language for re-creation
  
  // Sample financial summary data
  const financialSummary = React.useMemo(() => ({
    totalIncome: 6250.00,
    totalExpenses: 3750.00,
    netBalance: 2500.00,
    savingsRate: 0.4, // 40%
    previousMonthIncome: 5500.00,
    previousMonthExpenses: 3550.00
  }), []);
  
  // Sample expense categories data for pie chart
  const expenseCategories = React.useMemo(() => [
    { name: translateWithCache("wallet.financialTracking.categories.housing", "Housing"), value: 1500, color: "#8884d8" },
    { name: translateWithCache("wallet.financialTracking.categories.food", "Food"), value: 750, color: "#82ca9d" },
    { name: translateWithCache("wallet.financialTracking.categories.transport", "Transport"), value: 450, color: "#ffc658" },
    { name: translateWithCache("wallet.financialTracking.categories.entertainment", "Entertainment"), value: 600, color: "#ff8042" },
    { name: translateWithCache("wallet.financialTracking.categories.utilities", "Utilities"), value: 300, color: "#0088fe" },
    { name: translateWithCache("wallet.financialTracking.categories.other", "Other"), value: 150, color: "#00C49F" }
  ], [language]); // Depend on language for re-creation
  
  // Sample monthly data for bar chart
  const monthlyData = React.useMemo(() => [
    { name: "Jan", income: 4500, expenses: 3200 },
    { name: "Feb", income: 5200, expenses: 3500 },
    { name: "Mar", income: 4800, expenses: 3700 },
    { name: "Apr", income: 6250, expenses: 3750 }
  ], []);
  
  // Calculate percentage changes
  const percentChanges = React.useMemo(() => {
    const incomeChange = ((financialSummary.totalIncome - financialSummary.previousMonthIncome) / financialSummary.previousMonthIncome) * 100;
    const expensesChange = ((financialSummary.totalExpenses - financialSummary.previousMonthExpenses) / financialSummary.previousMonthExpenses) * 100;
    const netBalanceChange = (financialSummary.netBalance / (financialSummary.totalIncome - financialSummary.totalExpenses)) * 100;
    
    return {
      income: incomeChange.toFixed(1),
      expenses: expensesChange.toFixed(1),
      netBalance: netBalanceChange.toFixed(1)
    };
  }, [financialSummary]);
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      asChild
    >
      <Link to="/dashboard/wallet">
        <ArrowLeft size={16} className="mr-2" /> 
        <TranslatedText keyName="common.back" fallback="Back" />
      </Link>
    </Button>
  );
  
  return (
    <PageLayout
      title={translateWithCache("wallet.financialTracking.reports", "Financial Reports")}
      subtitle={translateWithCache("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
      key={`${forceUpdateKey}-layout-${instanceId.current}`}
    >
      <PageNavigation 
        items={walletNavItems} 
        className="mb-6" 
        key={`${forceUpdateKey}-nav-${instanceId.current}`} 
      />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-indigo-400" />
            <CardTitle>
              <TranslatedText keyName="wallet.financialTracking.reports" fallback="Financial Reports" />
            </CardTitle>
          </div>
          <div className="flex space-x-2">
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-40 bg-purple-900/30 border-purple-800/30">
                <SelectValue>
                  <TranslatedText 
                    keyName={`wallet.periods.${reportPeriod === 'this-month' ? 'monthly' : reportPeriod === 'this-quarter' ? 'quarterly' : 'yearly'}`} 
                    fallback={reportPeriod === 'this-month' ? 'Monthly' : reportPeriod === 'this-quarter' ? 'Quarterly' : 'Yearly'} 
                  />
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-charcoal-dark border-purple-800/30">
                <SelectItem value="this-month">
                  <TranslatedText keyName="wallet.periods.monthly" fallback="Monthly" />
                </SelectItem>
                <SelectItem value="this-quarter">
                  <TranslatedText keyName="wallet.periods.quarterly" fallback="Quarterly" />
                </SelectItem>
                <SelectItem value="this-year">
                  <TranslatedText keyName="wallet.periods.yearly" fallback="Yearly" />
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="border-purple-800/30 bg-purple-900/30 hover:bg-purple-800/50">
              <Filter size={16} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 bg-purple-900/30">
              <TabsTrigger 
                value="income-expense" 
                className="data-[state=active]:bg-purple-800/50 data-[state=active]:text-white"
              >
                <TranslatedText keyName="wallet.financialTracking.incomeExpense" fallback="Income & Expenses" />
              </TabsTrigger>
              <TabsTrigger 
                value="category-analysis"
                className="data-[state=active]:bg-purple-800/50 data-[state=active]:text-white"
              >
                <TranslatedText keyName="wallet.financialTracking.categoryAnalysis" fallback="Category Analysis" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="income-expense" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-purple-900/30 bg-charcoal-dark/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName="wallet.financialTracking.totalIncome" fallback="Total Income" />
                    </p>
                    <h3 className="text-2xl font-bold text-green-400">${financialSummary.totalIncome.toFixed(2)}</h3>
                    <div className={`text-xs mt-1 ${parseFloat(percentChanges.income) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(percentChanges.income) >= 0 ? '+' : ''}{percentChanges.income}% 
                      <TranslatedText keyName="wallet.financialTracking.fromLastPeriod" fallback="from last period" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-900/30 bg-charcoal-dark/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName="wallet.financialTracking.totalExpenses" fallback="Total Expenses" />
                    </p>
                    <h3 className="text-2xl font-bold text-red-400">${financialSummary.totalExpenses.toFixed(2)}</h3>
                    <div className={`text-xs mt-1 ${parseFloat(percentChanges.expenses) <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {parseFloat(percentChanges.expenses) >= 0 ? '+' : ''}{percentChanges.expenses}% 
                      <TranslatedText keyName="wallet.financialTracking.fromLastPeriod" fallback="from last period" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-900/30 bg-charcoal-dark/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName="wallet.financialTracking.netBalance" fallback="Net Balance" />
                    </p>
                    <h3 className="text-2xl font-bold text-blue-400">${financialSummary.netBalance.toFixed(2)}</h3>
                    <div className="text-xs mt-1 text-blue-400">
                      <TranslatedText 
                        keyName="wallet.financialTracking.savingsRate" 
                        fallback="Savings Rate" 
                      />: {(financialSummary.savingsRate * 100).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="border-purple-900/30 bg-charcoal-dark/50">
                <CardHeader>
                  <CardTitle className="text-md">
                    <TranslatedText keyName="wallet.financialTracking.incomeExpenseAnalysis" fallback="Income & Expense Analysis" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#555', color: '#fff' }} 
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Bar 
                          dataKey="income" 
                          name={translateWithCache("wallet.financialTracking.income", "Income")} 
                          fill="#82ca9d" 
                        />
                        <Bar 
                          dataKey="expenses" 
                          name={translateWithCache("wallet.financialTracking.expense", "Expense")} 
                          fill="#ff8042" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-purple-900/30 text-xs text-gray-400">
                  <TranslatedText 
                    keyName="wallet.financialTracking.reportPeriod" 
                    fallback="This report covers the period from {startDate} to {endDate}"
                    values={{ startDate: "April 1, 2025", endDate: "April 30, 2025" }}
                  />
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="category-analysis" className="space-y-4">
              <Card className="border-purple-900/30 bg-charcoal-dark/50">
                <CardHeader>
                  <CardTitle className="text-md">
                    <TranslatedText keyName="wallet.financialTracking.expenseCategoryAnalysis" fallback="Expense Category Analysis" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {expenseCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => `$${value}`}
                          contentStyle={{ backgroundColor: '#2a2a2a', borderColor: '#555', color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-purple-900/30 bg-charcoal-dark/50">
                <CardHeader>
                  <CardTitle className="text-md">
                    <TranslatedText keyName="wallet.financialTracking.recommendations" fallback="Recommendations" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    <span className="text-sm">
                      <TranslatedText keyName="wallet.financialTracking.reduceExpenses" fallback="Consider reducing expenses to improve your balance." />
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    <span className="text-sm">
                      <TranslatedText keyName="wallet.financialTracking.increaseSavings" fallback="Try to increase your savings rate to at least 20%." />
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    <span className="text-sm">
                      <TranslatedText keyName="wallet.financialTracking.trackExpenses" fallback="Regularly track your expenses to identify areas for improvement." />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-purple-900/30 pt-4">
          <Button variant="outline" className="flex items-center border-purple-800/30 bg-purple-900/30 hover:bg-purple-800/50">
            <Printer className="mr-2 h-4 w-4" />
            <TranslatedText keyName="wallet.financialTracking.print" fallback="Print" />
          </Button>
          <Button variant="default" className="flex items-center bg-purple-700 hover:bg-purple-600">
            <Download className="mr-2 h-4 w-4" />
            <TranslatedText keyName="wallet.financialTracking.downloadPDF" fallback="Download PDF" />
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  );
};

export default FinancialReports;
