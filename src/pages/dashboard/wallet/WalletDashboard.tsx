
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import { Link } from "react-router-dom";
import { Wallet, FileBarChart, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/dashboard/PageLayout";
import WalletStats from "./components/WalletStats";
import RecentTransactions from "./components/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/translation/TranslatedText";
import { LanguageCode } from "@/utils/languageUtils";
import { getFundDetailsTranslation } from "./i18n";
import { Transaction } from "./FundDetails";
import TransactionSummary from "./components/TransactionSummary";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import FinancialCalendar from "./components/FinancialCalendar";

// Sample transaction data for RecentTransactions
const sampleTransactions: Transaction[] = [
  {
    id: "tx-001",
    type: "deposit",
    amount: 1000.00,
    balance: 5250.00,
    timestamp: "2025-04-01T10:30:00",
    note: "transactions.monthlyDeposit"
  },
  {
    id: "tx-002",
    type: "expense",
    amount: -150.25,
    balance: 5099.75,
    timestamp: "2025-04-02T14:15:00",
    note: "transactions.officeSupplies"
  },
  {
    id: "tx-003",
    type: "transfer",
    amount: -500.00,
    balance: 4599.75,
    timestamp: "2025-04-03T09:45:00",
    note: "transactions.transferToSavings"
  }
];

const WalletDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { getTranslation } = usePageLanguage('wallet.walletManagement', 'Wallet Management');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  const { t } = useSafeTranslation();
  
  return (
    <PageLayout
      title={t('wallet.walletManagement', 'Wallet Management')}
      subtitle={t('wallet.walletDashboardDesc', 'Manage your deposits, transactions and fund details')}
    >
      {/* Stats Section */}
      <div className="mb-6">
        <WalletStats />
      </div>
      
      {/* Financial Tracking Section */}
      <div className="mb-6">
        <TransactionSummary 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>
      
      {/* Second Row: Quick Actions and Financial Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Quick Actions Card */}
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
        
        {/* Financial Calendar Preview */}
        <FinancialCalendar />
      </div>
      
      {/* Recent Transactions */}
      <div className="mt-6">
        <RecentTransactions 
          transactions={sampleTransactions} 
          currentLanguage={language as LanguageCode}
          getTranslation={(key) => {
            // Special handling for transaction note keys to properly translate them
            if (key.startsWith("transactions.")) {
              return t(key, key);
            }
            return getFundDetailsTranslation(key, language as LanguageCode);
          }}
        />
      </div>
    </PageLayout>
  );
};

export default WalletDashboard;
