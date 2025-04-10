
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { usePageLanguage } from "@/hooks/use-page-language";
import PageLayout from "@/components/dashboard/PageLayout";
import { Calendar, Wallet, ArrowLeft, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TranslatedText from "@/components/translation/TranslatedText";
import PageNavigation from "@/components/dashboard/PageNavigation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const FinancialCalendar: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useSafeTranslation();
  const pageLanguage = usePageLanguage('wallet.financialTracking.calendar', 'Financial Calendar');
  
  // Navigation links for wallet section
  const walletNavItems = [
    {
      path: "/dashboard/wallet",
      title: t("wallet.overview", "Overview"),
      subtitle: t("wallet.walletDashboardDesc", "Manage your deposits, transactions and fund details"),
      icon: <Wallet size={16} className="mr-2 text-blue-400" />,
    },
    {
      path: "/dashboard/wallet/financial-calendar",
      title: t("wallet.financialTracking.calendar", "Financial Calendar"),
      subtitle: t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income"),
      icon: <Calendar size={16} className="mr-2 text-green-400" />,
      isActive: true
    },
    {
      path: "/dashboard/wallet/financial-reports",
      title: t("wallet.financialTracking.reports", "Financial Reports"),
      subtitle: t("wallet.financialTracking.reportsDesc", "Generate financial statements and analysis"),
      icon: <FileText size={16} className="mr-2 text-indigo-400" />
    }
  ];
  
  const breadcrumbs = [
    {
      label: t("sidebar.dashboard", "Dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement", "Wallet Management"),
      href: "/dashboard/wallet"
    },
    {
      label: t("wallet.financialTracking.calendar", "Financial Calendar")
    }
  ];
  
  const pageActions = (
    <Button
      variant="ghost"
      className="bg-purple-900/30 border border-purple-800/30 hover:bg-purple-800/50 text-white transition-all duration-300"
      onClick={() => window.history.back()}
    >
      <ArrowLeft size={16} className="mr-2" /> 
      <TranslatedText keyName="common.back" fallback="Back" />
    </Button>
  );
  
  return (
    <PageLayout
      title={t("wallet.financialTracking.calendar", "Financial Calendar")}
      subtitle={t("wallet.financialTracking.calendarDesc", "Track scheduled payments and income")}
      breadcrumbs={breadcrumbs}
      actions={pageActions}
    >
      <PageNavigation items={walletNavItems} className="mb-6" />
      
      <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-purple-400" />
            {t("wallet.financialTracking.calendar", "Financial Calendar")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 mx-auto text-purple-400 opacity-50 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">
              {t("wallet.comingSoon", "Coming Soon")}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {t("wallet.financialCalendarComingSoonMessage", "The financial calendar feature is coming soon. You'll be able to track your scheduled payments and income here.")}
            </p>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default FinancialCalendar;
