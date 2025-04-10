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
import QuickActions from "../components/QuickActions";

// Sample transaction data for RecentTransactions
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
        <QuickActions 
          title={getText('quickActions')}
          depositText={getText('deposit')}
          withdrawText={getText('withdraw')} 
        />
        
        {/* Financial Calendar Preview */}
        <FinancialCalendar />
      </div>
      
      {/* Recent Transactions */}
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
