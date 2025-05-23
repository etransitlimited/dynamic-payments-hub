
import React, { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Wallet, PieChart, Activity, CreditCard, Clock, DollarSign, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getDirectTranslation } from "@/utils/translationHelpers";
import { LanguageCode } from "@/utils/languageUtils";

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
  
  // Action cards with translation keys
  const walletActions = React.useMemo(() => [
    {
      title: "wallet.fundDetails.title",
      description: "wallet.fundDetails.transactionDetails",
      path: "/dashboard/wallet/fund-details",
      icon: <FileText className="h-6 w-6 text-blue-400" />
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
      icon: <PieChart className="h-6 w-6 text-indigo-400" />
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
    }
  ], [language]); // Depend on language for re-creation
  
  return (
    <PageLayout
      title={translateWithCache("wallet.management", "Management")}
      subtitle={translateWithCache("wallet.managementDescription", "Manage your wallet settings and preferences")}
      breadcrumbs={breadcrumbs}
      key={`${forceUpdateKey}-layout-${instanceId.current}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {walletActions.map((action, index) => (
          <Card 
            key={`wallet-action-${action.title}-${language}-${index}-${instanceId.current}`}
            className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-4">
                {action.icon}
              </div>
              <CardTitle>
                <TranslatedText 
                  keyName={action.title} 
                  fallback={action.title.split('.').pop() || action.title} 
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">
                <TranslatedText 
                  keyName={action.description} 
                  fallback={action.description.split('.').pop() || action.description} 
                />
              </p>
              <Button className="w-full bg-purple-700 hover:bg-purple-800" asChild>
                <Link to={action.path}>
                  <TranslatedText keyName="common.gotoPage" fallback="Go to Page" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default WalletManagement;
