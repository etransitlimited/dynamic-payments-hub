
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Wallet, ArrowDownCircle, ArrowUpCircle, FileBarChart, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const WalletManagement: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.management', 'Wallet Management');
  
  // Navigation links for wallet section
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview"),
      subtitle: t("wallet.walletDashboardDesc"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/management",
      title: t("wallet.management"),
      subtitle: t("wallet.managementDescription"),
      icon: <Wallet size={16} className="mr-2 text-green-400" />,
      isActive: true
    }
  ];
  
  // Wallet action cards
  const walletActions = [
    {
      title: t("wallet.deposit.form"),
      description: t("wallet.deposit.formDescription"),
      path: "/dashboard/wallet/deposit",
      icon: <ArrowDownCircle className="h-6 w-6 text-green-400" />
    },
    {
      title: t("wallet.withdraw"),
      description: t("wallet.withdrawDescription"),
      path: "/dashboard/wallet/withdraw",
      icon: <ArrowUpCircle className="h-6 w-6 text-amber-400" />
    },
    {
      title: t("wallet.fundDetails.title"),
      description: t("wallet.fundDetails.transactionDetails"),
      path: "/dashboard/wallet/fund-details",
      icon: <FileBarChart className="h-6 w-6 text-blue-400" />
    },
    {
      title: t("wallet.financialTracking.calendar"),
      description: t("wallet.financialTracking.calendarDesc"),
      path: "/dashboard/wallet/financial-calendar",
      icon: <Calendar className="h-6 w-6 text-purple-400" />
    },
    {
      title: t("wallet.financialTracking.reports"),
      description: t("wallet.financialTracking.reportsDesc"),
      path: "/dashboard/wallet/financial-reports",
      icon: <FileText className="h-6 w-6 text-indigo-400" />
    }
  ];
  
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.management")
    }
  ];
  
  return (
    <PageLayout
      title={t("wallet.management")}
      subtitle={t("wallet.managementDescription")}
      breadcrumbs={breadcrumbs}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {walletActions.map((action, index) => (
          <Card 
            key={`wallet-action-${index}`}
            className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-900/40 flex items-center justify-center mb-4">
                {action.icon}
              </div>
              <CardTitle>{action.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">{action.description}</p>
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
