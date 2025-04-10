
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import { Link } from "react-router-dom";
import { Wallet, FileBarChart, Calendar, ArrowDownCircle, ArrowUpCircle, BanknoteIcon, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/dashboard/PageLayout";
import WalletStats from "./components/WalletStats";
import RecentTransactions from "./components/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TranslatedText from "@/components/translation/TranslatedText";
import { LanguageCode } from "@/utils/languageUtils";
import { Transaction } from "./FundDetails";
import TransactionSummary from "./components/TransactionSummary";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import FinancialCalendar from "./components/FinancialCalendar";
import dashboardTranslations from "./i18n/dashboard";
import { getFundDetailsTranslation } from "./i18n";

const sampleTransactions: Transaction[] = [
  {
    id: "tx-001",
    type: "deposit",
    amount: 1000.00,
    balance: 5250.00,
    timestamp: "2025-04-01T10:30:00",
    note: "wallet.deposit.monthlyDeposit"
  },
  {
    id: "tx-002",
    type: "expense",
    amount: -150.25,
    balance: 5099.75,
    timestamp: "2025-04-02T14:15:00",
    note: "wallet.transactions.officeSupplies"
  },
  {
    id: "tx-003",
    type: "transfer",
    amount: -500.00,
    balance: 4599.75,
    timestamp: "2025-04-03T09:45:00",
    note: "wallet.transactions.transferToSavings"
  }
];

const WalletDashboard: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const { getTranslation } = usePageLanguage('wallet.walletManagement', 'Wallet Management');
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'quarterly'>('weekly');
  
  const currentLang = language as LanguageCode;
  const getText = (key: string) => {
    const translation = dashboardTranslations[currentLang];
    return translation ? translation[key as keyof typeof translation] || key : key;
  };
  
  const getTransactionTranslation = (key: string): string => {
    if (key.includes('.')) {
      return t(key, key);
    }
    
    return getFundDetailsTranslation(key, language as LanguageCode);
  };
  
  return (
    <PageLayout
      title={getText('title')}
      subtitle={getText('description')}
    >
      <div className="mb-6">
        <WalletStats />
      </div>
      
      <div className="mb-6">
        <TransactionSummary 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg hover:shadow-purple-900/10 transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {getText('quickActions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/wallet/deposit">
                <ArrowDownCircle className="mr-2 h-4 w-4 text-green-400" />
                {getText('deposit')}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/wallet/withdraw">
                <ArrowUpCircle className="mr-2 h-4 w-4 text-amber-400" />
                {getText('withdraw')}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/wallet/fund-details">
                <FileBarChart className="mr-2 h-4 w-4 text-blue-400" />
                {getText('fundDetails')}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/dashboard/wallet/financial-calendar">
                <Calendar className="mr-2 h-4 w-4 text-purple-400" />
                {getText('financialCalendar')}
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start col-span-2" asChild>
              <Link to="/dashboard/wallet/financial-reports">
                <FileText className="mr-2 h-4 w-4 text-indigo-400" />
                {getText('financialReports')}
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <FinancialCalendar />
      </div>
      
      <div className="mt-6">
        <RecentTransactions 
          transactions={sampleTransactions} 
          currentLanguage={language as LanguageCode}
          getTranslation={getTransactionTranslation}
        />
      </div>
    </PageLayout>
  );
};

export default WalletDashboard;
