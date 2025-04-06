
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/dashboard/PageLayout";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";

const FinancialReportsPage: React.FC = () => {
  const { t } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  
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
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <FileBarChart className="mr-2 h-5 w-5" />
                <TranslatedText keyName="wallet.financialTracking.reportType" fallback="Report Type" />
              </CardTitle>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  <TranslatedText keyName="wallet.financialTracking.filters" fallback="Filters" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  <TranslatedText keyName="wallet.financialTracking.downloadPDF" fallback="Download PDF" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="income-expense">
              <TabsList className="mb-4">
                <TabsTrigger value="income-expense">
                  <TranslatedText keyName="wallet.financialTracking.incomeExpense" fallback="Income & Expenses" />
                </TabsTrigger>
                <TabsTrigger value="category">
                  <TranslatedText keyName="wallet.financialTracking.categoryAnalysis" fallback="Category Analysis" />
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="income-expense">
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        <TranslatedText keyName="wallet.financialTracking.totalIncome" fallback="Total Income" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$9,580.00</div>
                      <div className="text-sm text-green-400">+12.5% from last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        <TranslatedText keyName="wallet.financialTracking.totalExpenses" fallback="Total Expenses" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4,250.75</div>
                      <div className="text-sm text-red-400">+5.3% from last month</div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        <TranslatedText keyName="wallet.financialTracking.netBalance" fallback="Net Balance" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$5,329.25</div>
                      <div className="text-sm text-green-400">+18.7% from last month</div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center p-12 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <FileBarChart className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                  <h3 className="text-lg font-medium mb-2">
                    <TranslatedText keyName="wallet.financialTracking.incomeExpenseAnalysis" fallback="Income & Expense Analysis" />
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    <TranslatedText 
                      keyName="wallet.financialTracking.reportPeriod" 
                      fallback="This report covers the period from April 1, 2025 to April 30, 2025"
                      values={{ startDate: "April 1, 2025", endDate: "April 30, 2025" }}
                    />
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="category">
                <div className="text-center p-12 bg-purple-900/20 rounded-lg border border-purple-800/30 mb-6">
                  <FileBarChart className="w-12 h-12 mx-auto mb-4 text-purple-300" />
                  <h3 className="text-lg font-medium mb-2">
                    <TranslatedText keyName="wallet.financialTracking.expenseCategoryAnalysis" fallback="Expense Category Analysis" />
                  </h3>
                </div>
                
                <Card>
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
        </Card>
      </div>
    </PageLayout>
  );
};

export default FinancialReportsPage;
