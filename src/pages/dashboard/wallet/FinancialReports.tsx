import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { FileText, Wallet, ArrowLeft, Calendar, BarChart2, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart } from "recharts";

const FinancialReports: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  const [activeTab, setActiveTab] = useState("income-expense");
  
  // Navigation links for wallet section
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview", "Overview"),
      subtitle: t("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/financial-calendar",
      title: t("wallet.financialTracking.calendar", "Financial Calendar"),
      subtitle: t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income"),
      icon: <Calendar size={16} className="mr-2 text-green-400" />
    },
    {
      path: "/dashboard/wallet/financial-reports",
      title: t("wallet.financialTracking.reports", "Financial Reports"),
      subtitle: t("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis"),
      icon: <FileText size={16} className="mr-2 text-indigo-400" />,
      isActive: true
    }
  ];
  
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard", "Dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement", "Wallet Management"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.financialTracking.reports", "Financial Reports")
    }
  ];
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <TranslatedText keyName="common.back" fallback="Back" />
    </Button>
  );
  
  // Sample financial summary data
  const financialSummary = {
    totalIncome: 6250.00,
    totalExpenses: 3750.00,
    netBalance: 2500.00,
    savingsRate: 0.4, // 40%
  };
  
  // Sample expense categories data for pie chart
  const expenseCategories = [
    { name: t("wallet.financialTracking.categories.housing", "Housing"), value: 1500, color: "#8884d8" },
    { name: t("wallet.financialTracking.categories.food", "Food"), value: 750, color: "#82ca9d" },
    { name: t("wallet.financialTracking.categories.transport", "Transport"), value: 450, color: "#ffc658" },
    { name: t("wallet.financialTracking.categories.entertainment", "Entertainment"), value: 600, color: "#ff8042" },
    { name: t("wallet.financialTracking.categories.utilities", "Utilities"), value: 300, color: "#0088fe" },
    { name: t("wallet.financialTracking.categories.other", "Other"), value: 150, color: "#00C49F" }
  ];
  
  // Sample monthly data for bar chart
  const monthlyData = [
    { name: "Jan", income: 4500, expenses: 3200 },
    { name: "Feb", income: 5200, expenses: 3500 },
    { name: "Mar", income: 4800, expenses: 3700 },
    { name: "Apr", income: 6250, expenses: 3750 }
  ];
  
  return (
    <PageLayout
      title={t("wallet.financialTracking.reports", "Financial Reports")}
      subtitle={t("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-indigo-400" />
            {t("wallet.financialTracking.reports", "Financial Reports")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <FileText className="h-16 w-16 mx-auto text-indigo-400 opacity-50 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              {t("wallet.comingSoon", "Coming Soon")}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {t("wallet.financialReportsComingSoonMessage", "The financial reports feature is coming soon. You'll be able to generate financial statements and analysis here.")}
            </p>
          </div>
          
          {/* Future Implementation Placeholder */}
          {/*
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="income-expense">
                {t("wallet.financialTracking.incomeExpense", "Income & Expense")}
              </TabsTrigger>
              <TabsTrigger value="category-analysis">
                {t("wallet.financialTracking.categoryAnalysis", "Category Analysis")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="income-expense" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">{t("wallet.financialTracking.totalIncome", "Total Income")}</p>
                    <h3 className="text-2xl font-bold text-green-400">${financialSummary.totalIncome.toFixed(2)}</h3>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">{t("wallet.financialTracking.totalExpenses", "Total Expenses")}</p>
                    <h3 className="text-2xl font-bold text-red-400">${financialSummary.totalExpenses.toFixed(2)}</h3>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">{t("wallet.financialTracking.netBalance", "Net Balance")}</p>
                    <h3 className="text-2xl font-bold text-blue-400">${financialSummary.netBalance.toFixed(2)}</h3>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-gray-400">{t("wallet.financialTracking.savingsRate", "Savings Rate")}</p>
                    <h3 className="text-2xl font-bold text-purple-400">{(financialSummary.savingsRate * 100).toFixed(1)}%</h3>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t("wallet.financialTracking.incomeExpenseAnalysis", "Income & Expense Analysis")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart data={monthlyData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" name={t("wallet.financialTracking.income", "Income")} fill="#82ca9d" />
                      <Bar dataKey="expenses" name={t("wallet.financialTracking.expense", "Expense")} fill="#ff8042" />
                    </BarChart>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="category-analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t("wallet.financialTracking.expenseCategoryAnalysis", "Expense Category Analysis")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          */}
        </CardContent>
        {/*
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="flex items-center">
            <Printer className="mr-2 h-4 w-4" />
            {t("wallet.financialTracking.print", "Print")}
          </Button>
          <Button variant="default" className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            {t("wallet.financialTracking.downloadPDF", "Download PDF")}
          </Button>
        </CardFooter>
        */}
      </Card>
    </PageLayout>
  );
};

export default FinancialReports;
