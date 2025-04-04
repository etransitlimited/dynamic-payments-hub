
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Calendar, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { getTransactionTranslation } from "../i18n";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

interface NavigationTab {
  path: string;
  key: string;
  icon: React.ReactNode;
  value: string;
}

const TransactionNavigation: React.FC = () => {
  const { language } = useSafeTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    const path = window.location.pathname;
    if (path.includes("/history")) return "history";
    if (path.includes("/wallet")) return "wallet";
    return "transactions";
  });
  
  const [uniqueKey, setUniqueKey] = useState(`nav-${language}-${Date.now()}`);
  
  // Force refresh when language changes
  useEffect(() => {
    setUniqueKey(`nav-${language}-${Date.now()}`);
  }, [language]);
  
  // Navigation tabs with proper translations
  const navigationTabs = useMemo(() => [
    {
      path: "/dashboard/transactions",
      key: "transactions",
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("title", language)
    },
    {
      path: "/dashboard/transactions/history",
      key: "history",
      icon: <Calendar className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("history", language)
    },
    {
      path: "/dashboard/wallet/funds",
      key: "wallet",
      icon: <Wallet className="h-4 w-4 mr-2" />,
      value: getTransactionTranslation("wallet", language)
    }
  ], [language]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const tab = navigationTabs.find(tab => tab.key === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <motion.div
      key={uniqueKey}
      className="mb-6"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 bg-indigo-950/20 border border-indigo-800/30 p-1 rounded-lg">
          {navigationTabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="flex items-center gap-1.5 data-[state=active]:bg-indigo-700/30 data-[state=active]:text-indigo-100 data-[state=active]:shadow-sm"
            >
              {tab.icon}
              <span className="text-xs sm:text-sm whitespace-nowrap">{tab.value}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
};

export default React.memo(TransactionNavigation);
