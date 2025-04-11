
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import PageLayout from "@/components/dashboard/PageLayout";
import { Wallet, ArrowDownCircle, ArrowUpCircle, FileBarChart, Calendar, FileText } from "lucide-react";
import { LanguageCode } from "@/utils/languageUtils";
import PageNavigation from "@/components/dashboard/PageNavigation";
import ActionCard from "@/modules/wallet/components/ActionCard";
import { getWalletTranslation } from "@/modules/wallet/i18n";
import { dispatchLanguageChangeEvent } from "@/utils/translationHelpers";

const WalletManagement: React.FC = () => {
  const { language } = useLanguage();
  const [forceUpdateKey, setForceUpdateKey] = useState(`wallet-management-${language}-${Date.now()}`);
  const [triggerUpdate, setTriggerUpdate] = useState(0);
  const instanceId = useRef(`wallet-mgmt-${Math.random().toString(36).substring(2, 9)}`);
  const langRef = useRef<LanguageCode>(language as LanguageCode);
  
  // Force component to re-render when language changes
  useEffect(() => {
    console.log(`WalletManagement: Language changed to ${language}, updating component...`);
    
    if (language !== langRef.current) {
      langRef.current = language as LanguageCode;
      setForceUpdateKey(`wallet-management-${language}-${Date.now()}`);
      
      // Trigger an additional update to ensure all children update
      setTimeout(() => {
        setTriggerUpdate(prev => prev + 1);
        
        // Manually dispatch language change event to force update in isolated components
        dispatchLanguageChangeEvent(language as LanguageCode);
      }, 50);
    }
  }, [language]);
  
  // Translation helper using module-specific translations
  const translate = (key: string): string => {
    return getWalletTranslation(key, language as LanguageCode);
  };
  
  // Navigation links for wallet section
  const walletNavItems = React.useMemo(() => [
    {
      path: "/dashboard/wallet",
      title: translate("wallet.overview"),
      subtitle: translate("wallet.walletDashboardDesc"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
      isActive: true
    },
    {
      path: "/dashboard/wallet/management",
      title: translate("wallet.management"),
      subtitle: translate("wallet.managementDescription"),
      icon: <Wallet size={16} className="mr-2 text-green-400" />,
    }
  ], [language, triggerUpdate]); // Re-create when language changes or forced update
  
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
      label: translate("sidebar.dashboard"),
      href: "/dashboard"
    },
    {
      label: translate("wallet.walletManagement"),
      href: "/dashboard/wallet"
    },
    {
      label: translate("wallet.management")
    }
  ], [language, triggerUpdate]); // Re-create when language changes
  
  return (
    <PageLayout
      title={translate("wallet.management")}
      subtitle={translate("wallet.managementDescription")}
      breadcrumbs={breadcrumbs}
      key={`${forceUpdateKey}-layout`}
    >
      <PageNavigation 
        items={walletNavItems} 
        className="mb-6" 
        key={`${forceUpdateKey}-nav`} 
      />
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        key={`${forceUpdateKey}-cards-${triggerUpdate}`}
      >
        {walletActions.map((action, index) => (
          <ActionCard
            key={`action-card-${index}-${language}-${triggerUpdate}`}
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
