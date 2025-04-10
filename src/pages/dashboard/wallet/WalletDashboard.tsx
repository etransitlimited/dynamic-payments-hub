
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
import { WalletQuickActions } from "@/pages/dashboard/components/QuickActions";
import PageNavigation from "@/components/dashboard/PageNavigation";

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
  
  const getTransactionTranslation = (key: string): string => {
    if (key.includes('.')) {
      return t(key, key);
    }
    
    return getFundDetailsTranslation(key, language as LanguageCode);
  };
  
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview", "Overview"),
      subtitle: t("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
      isActive: true
    },
    {
      path: "/dashboard/wallet/deposit",
      title: t("wallet.deposit.form", "Deposit"),
      subtitle: t("wallet.deposit.formDescription", "Please enter the deposit amount and select a payment method"),
      icon: <ArrowDownCircle size={16} className="mr-2 text-green-400" />,
    },
    {
      path: "/dashboard/wallet/withdraw",
      title: t("wallet.withdraw", "Withdraw"),
      subtitle: t("wallet.withdrawDescription", "Withdraw funds from your wallet"),
      icon: <ArrowUpCircle size={16} className="mr-2 text-amber-400" />,
    }
  ];
  
  return (
    <PageLayout
      title={t("wallet.walletManagement", "Wallet Management")}
      subtitle={t("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details")}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
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
        <WalletQuickActions 
          title={t("wallet.quickActions", "Quick Actions")}
          depositText={t("wallet.deposit.form", "Deposit")}
          withdrawText={t("wallet.withdraw", "Withdraw")}
          fundDetailsText={t("wallet.fundDetails.title", "Fund Details")}
          financialCalendarText={t("wallet.financialTracking.calendar", "Financial Calendar")}
          financialReportsText={t("wallet.financialTracking.reports", "Financial Reports")}
        />
        
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
