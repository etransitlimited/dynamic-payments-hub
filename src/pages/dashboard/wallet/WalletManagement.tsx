
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Wallet, ArrowDownCircle, ArrowUpCircle, FileBarChart, Calendar, FileText } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";
import PageNavigation from "@/components/dashboard/PageNavigation";
import ActionCard from "@/modules/wallet/components/ActionCard";

const WalletManagement: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const [forceUpdateKey, setForceUpdateKey] = useState(`wallet-management-${language}-${Date.now()}`);
  const pageLanguage = usePageLanguage('wallet.management', 'Wallet Management');
  const instanceId = useRef(`wallet-mgmt-${Math.random().toString(36).substring(2, 9)}`);
  
  // Force component to re-render when language changes
  useEffect(() => {
    console.log(`WalletManagement: Language changed to ${language}, updating component...`);
    setForceUpdateKey(`wallet-management-${language}-${Date.now()}`);
    
    // Force additional update after a short delay to ensure translations are applied
    const timer = setTimeout(() => {
      if (document.documentElement.lang !== language) {
        document.documentElement.lang = language as LanguageCode;
      }
      setForceUpdateKey(`wallet-management-${language}-${Date.now()}-delayed`);
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
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
      isActive: true
    },
    {
      path: "/dashboard/wallet/management",
      title: translateWithCache("wallet.management", "Management"),
      subtitle: translateWithCache("wallet.managementDescription", "Manage your wallet settings and preferences"),
      icon: <Wallet size={16} className="mr-2 text-green-400" />,
    }
  ], [language]); // Depend on language for re-creation
  
  // Wallet action cards with translation keys
  const walletActions = React.useMemo(() => [
    {
      title: "wallet.deposit.form",
      description: "wallet.deposit.formDescription",
      path: "/dashboard/wallet/deposit",
      icon: <ArrowDownCircle className="h-6 w-6 text-green-400" />
    },
    {
      title: "wallet.withdraw",
      description: "wallet.withdrawDescription",
      path: "/dashboard/wallet/withdraw",
      icon: <ArrowUpCircle className="h-6 w-6 text-amber-400" />
    },
    {
      title: "wallet.fundDetails.title",
      description: "wallet.fundDetails.transactionDetails",
      path: "/dashboard/wallet/fund-details",
      icon: <FileBarChart className="h-6 w-6 text-blue-400" />
    },
    {
      title: "wallet.financialTracking.calendar",
      description: "wallet.financialTracking.calendarDesc",
      path: "/dashboard/wallet/financial-calendar",
      icon: <Calendar className="h-6 w-6 text-purple-400" />
    },
    {
      title: "wallet.financialTracking.reports",
      description: "wallet.financialTracking.reportsDesc",
      path: "/dashboard/wallet/financial-reports",
      icon: <FileText className="h-6 w-6 text-indigo-400" />
    }
  ], []);
  
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
      label: translateWithCache("wallet.management", "Management")
    }
  ], [language]); // Depend on language for re-creation
  
  // Create a timestamp-based key for forcing re-renders on language change
  const cardsKey = `wallet-cards-${language}-${Date.now()}`;
  
  return (
    <PageLayout
      title={translateWithCache("wallet.management", "Management")}
      subtitle={translateWithCache("wallet.managementDescription", "Manage your wallet settings and preferences")}
      breadcrumbs={breadcrumbs}
      key={`${forceUpdateKey}-layout-${instanceId.current}`}
    >
      <PageNavigation items={walletNavItems} className="mb-6" key={`${forceUpdateKey}-nav-${instanceId.current}`} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={cardsKey}>
        {walletActions.map((action, index) => (
          <ActionCard
            key={`action-card-${index}-${language}-${forceUpdateKey}`}
            title={action.title}
            description={action.description}
            path={action.path}
            icon={action.icon}
            instanceId={`${instanceId.current}-${index}`}
            language={language as LanguageCode}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default WalletManagement;
