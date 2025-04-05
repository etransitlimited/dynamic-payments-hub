
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import { Link } from "react-router-dom";
import { Wallet, FileBarChart, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/dashboard/PageLayout";
import WalletStats from "./components/WalletStats";
import RecentTransactions from "./components/RecentTransactions";
import RecordCard from "./components/RecordCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/translation/TranslatedText";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";

// Sample transaction data for RecentTransactions
const sampleTransactions = [
  {
    id: "tx-001",
    type: "deposit",
    amount: "$1,000.00",
    balance: "$5,250.00",
    date: "2025-04-01T10:30:00",
    note: "Monthly deposit"
  },
  {
    id: "tx-002",
    type: "expense",
    amount: "-$150.25",
    balance: "$5,099.75",
    date: "2025-04-02T14:15:00",
    note: "Office supplies"
  },
  {
    id: "tx-003",
    type: "transfer",
    amount: "-$500.00",
    balance: "$4,599.75",
    date: "2025-04-03T09:45:00",
    note: "Transfer to savings"
  }
];

const WalletDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { getTranslation, forceUpdateKey } = usePageLanguage('wallet.walletManagement', 'Wallet Management');
  
  return (
    <PageLayout
      title={getTranslation('wallet.walletManagement')}
      subtitle={getTranslation('wallet.walletDashboardDesc')}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <WalletStats />
        </div>
        
        <div className="space-y-4">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <TranslatedText keyName="wallet.quickActions" fallback="Quick Actions" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/deposit">
                  <Wallet className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.deposit.form" fallback="Deposit Form" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/deposit-records">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.depositRecords.statistics" fallback="Deposit Statistics" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/fund-details">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.fundDetails.title" fallback="Fund Details" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                <TranslatedText keyName="wallet.financialTracking.title" fallback="Financial Tracking" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/20 to-transparent p-3 rounded-lg cursor-pointer hover:bg-purple-900/30 transition-colors">
                <Link to="/dashboard/wallet/financial-calendar" className="flex items-center flex-1">
                  <div className="bg-purple-900/40 p-2 rounded-lg mr-3 text-purple-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      <TranslatedText keyName="wallet.financialTracking.calendar" fallback="Financial Calendar" />
                    </h3>
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName="wallet.financialTracking.calendarDesc" fallback="Track scheduled payments and income" />
                    </p>
                  </div>
                </Link>
                <ArrowRight className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-900/20 to-transparent p-3 rounded-lg cursor-pointer hover:bg-purple-900/30 transition-colors">
                <Link to="/dashboard/wallet/financial-reports" className="flex items-center flex-1">
                  <div className="bg-purple-900/40 p-2 rounded-lg mr-3 text-purple-400">
                    <FileBarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      <TranslatedText keyName="wallet.financialTracking.reports" fallback="Financial Reports" />
                    </h3>
                    <p className="text-sm text-gray-400">
                      <TranslatedText keyName="wallet.financialTracking.reportsDesc" fallback="Generate financial statements and analysis" />
                    </p>
                  </div>
                </Link>
                <ArrowRight className="h-4 w-4 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-4">
        <RecentTransactions 
          transactions={sampleTransactions} 
          currentLanguage={language as LanguageCode}
          getTranslation={(key) => getFundDetailsTranslation(key, language as LanguageCode)}
        />
      </div>
    </PageLayout>
  );
};

export default WalletDashboard;
