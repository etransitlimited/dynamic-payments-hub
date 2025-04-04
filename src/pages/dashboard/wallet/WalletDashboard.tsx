
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/dashboard/PageLayout";
import PageNavigation, { NavItem } from "@/components/dashboard/PageNavigation";
import { motion } from "framer-motion";
import { Wallet, PlusCircle, ClipboardList, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import TranslatedText from "@/components/translation/TranslatedText";
import WalletStats from "./components/WalletStats";

/**
 * Wallet Dashboard
 * Central hub for all wallet-related functionality
 */
const WalletDashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Define navigation items for wallet features
  const walletNavItems: NavItem[] = [
    {
      path: "/dashboard/wallet/deposit",
      title: t("wallet.deposit.form"),
      subtitle: t("wallet.deposit.formDescription"),
      icon: <PlusCircle className="h-4 w-4 mr-2 text-green-400" />,
      isActive: false
    },
    {
      path: "/dashboard/wallet/records",
      title: t("wallet.depositRecords.statistics"),
      subtitle: t("wallet.depositRecords.viewHistory"),
      icon: <ClipboardList className="h-4 w-4 mr-2 text-blue-400" />,
      isActive: false
    },
    {
      path: "/dashboard/wallet/fund-details",
      title: t("wallet.fundDetails.title"),
      subtitle: t("wallet.fundDetails.transactionDetails"),
      icon: <BarChart3 className="h-4 w-4 mr-2 text-purple-400" />,
      isActive: false
    }
  ];
  
  const pageActions = (
    <Button 
      variant="default"
      className="bg-purple-600 hover:bg-purple-700 text-white"
      onClick={() => navigate("/dashboard/wallet/deposit")}
    >
      <PlusCircle size={16} className="mr-2" />
      <TranslatedText keyName="wallet.deposit.form" />
    </Button>
  );
  
  const breadcrumbs = [
    {
      label: t("dashboard.dashboard"),
      href: "/dashboard"
    },
    {
      label: t("wallet.walletManagement") || "Wallet Management"
    }
  ];

  return (
    <PageLayout
      title={<span className="flex items-center"><Wallet className="mr-2 text-purple-400" size={24} /> {t("wallet.walletManagement") || "Wallet Management"}</span>}
      subtitle={t("wallet.walletDashboardDesc") || "Manage your deposits, transactions and fund details"}
      actions={pageActions}
      breadcrumbs={breadcrumbs}
      animationKey="wallet-dashboard"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        {/* Wallet Stats Cards */}
        <WalletStats />
        
        {/* Navigation Cards */}
        <div className="my-6">
          <h2 className="text-lg font-medium text-white mb-3">
            <TranslatedText keyName="wallet.quickActions" fallback="Quick Actions" />
          </h2>
          <PageNavigation 
            items={walletNavItems} 
            layout="horizontal" 
          />
        </div>
        
        {/* Recent Activity */}
        <Card className="border-purple-900/30 bg-charcoal-light/50 backdrop-blur-md shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center">
              <span className="bg-purple-900/30 p-2 rounded-lg mr-3">
                <ClipboardList className="h-4 w-4 text-purple-400" />
              </span>
              <TranslatedText keyName="wallet.recentActivity" fallback="Recent Activity" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              <TranslatedText keyName="wallet.noRecentActivity" fallback="No recent activity found. Your latest transactions will appear here." />
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default WalletDashboard;
