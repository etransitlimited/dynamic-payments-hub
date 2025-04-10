
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { FileText, Wallet, ArrowLeft, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const FinancialReports: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.financialTracking.reports', 'Financial Reports');
  
  // Navigation links for wallet section
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview"),
      subtitle: t("wallet.walletDashboardDesc"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/financial-calendar",
      title: t("wallet.financialTracking.calendar"),
      subtitle: t("wallet.financialTracking.calendarDesc"),
      icon: <Calendar size={16} className="mr-2 text-green-400" />
    },
    {
      path: "/dashboard/wallet/financial-reports",
      title: t("wallet.financialTracking.reports"),
      subtitle: t("wallet.financialTracking.reportsDesc"),
      icon: <FileText size={16} className="mr-2 text-indigo-400" />,
      isActive: true
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
      label: t("wallet.financialTracking.reports")
    }
  ];
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <TranslatedText keyName="common.back" />
    </Button>
  );
  
  return (
    <PageLayout
      title={t("wallet.financialTracking.reports")}
      subtitle={t("wallet.financialTracking.reportsDesc")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-indigo-400" />
            {t("wallet.financialTracking.reports")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <FileText className="h-16 w-16 mx-auto text-indigo-400 opacity-50 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              {t("wallet.comingSoon")}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {t("wallet.financialReportsComingSoonMessage")}
            </p>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default FinancialReports;
