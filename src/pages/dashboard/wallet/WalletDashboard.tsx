
import React, { useState } from "react";
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
import { Transaction } from "./FundDetails";
import FinancialCalendar from "./components/FinancialCalendar";
import TransactionSummary from "./components/TransactionSummary";
import PageNavigation from "@/components/dashboard/PageNavigation";

// Sample transaction data for RecentTransactions
const sampleTransactions: Transaction[] = [
  {
    id: "tx-001",
    type: "deposit",
    amount: 1000.00,
    balance: 5250.00,
    timestamp: "2025-04-01T10:30:00",
    note: "Monthly deposit"
  },
  {
    id: "tx-002",
    type: "expense",
    amount: -150.25,
    balance: 5099.75,
    timestamp: "2025-04-02T14:15:00",
    note: "Office supplies"
  },
  {
    id: "tx-003",
    type: "transfer",
    amount: -500.00,
    balance: 4599.75,
    timestamp: "2025-04-03T09:45:00",
    note: "Transfer to savings"
  }
];

const WalletDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.walletManagement', 'Wallet Management');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  
  // Navigation items for the wallet section
  const walletNavItems = [
    {
      path: "/dashboard/wallet/deposit",
      title: getTranslation('wallet.deposit.form'),
      subtitle: getTranslation('wallet.deposit.formDescription'),
      icon: <Wallet className="mr-2 h-4 w-4" />,
      isActive: false
    },
    {
      path: "/dashboard/wallet/fund-details",
      title: getTranslation('wallet.fundDetails.title'),
      subtitle: getTranslation('wallet.fundDetails.transactionDetails'),
      icon: <FileBarChart className="mr-2 h-4 w-4" />,
      isActive: false
    },
    {
      path: "/dashboard/wallet/deposit-records",
      title: getTranslation('wallet.depositRecords.statistics'),
      subtitle: getTranslation('wallet.depositRecords.viewHistory'),
      icon: <FileBarChart className="mr-2 h-4 w-4" />,
      isActive: false
    }
  ];
  
  return (
    <PageLayout
      title={getTranslation('wallet.walletManagement')}
      subtitle={getTranslation('wallet.walletDashboardDesc')}
    >
      {/* Navigation Cards */}
      <PageNavigation items={walletNavItems} />
      
      {/* Stats and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            <CardContent className="grid gap-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/deposit">
                  <Wallet className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.deposit.form" fallback="Deposit Form" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/fund-details">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.fundDetails.title" fallback="Fund Details" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/financial-calendar">
                  <Calendar className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.financialTracking.calendar" fallback="Financial Calendar" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/dashboard/wallet/financial-reports">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  <TranslatedText keyName="wallet.financialTracking.reports" fallback="Financial Reports" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Financial Tracking Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TransactionSummary 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
        <FinancialCalendar />
      </div>
      
      {/* Recent Transactions */}
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
