
import React from "react";
import { motion } from "framer-motion";
import DashboardMetrics from "@/pages/dashboard/components/dashboard/DashboardMetrics";
import DashboardActivities from "@/pages/dashboard/components/dashboard/DashboardActivities";
import DashboardNotice from "@/pages/dashboard/components/dashboard/DashboardNotice";
import QuickActions from "@/pages/dashboard/components/dashboard/QuickActions";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";

const DashboardPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("dashboard.title", "Dashboard");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          <TranslatedText keyName="dashboard.welcomeMessage" fallback="Welcome back!" values={{ username: "User" }} />
        </h1>
        <p className="text-gray-400">
          <TranslatedText keyName="dashboard.subtitle" fallback="Here's what's happening with your account today." />
        </p>
      </div>
      
      <DashboardMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardActivities />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <DashboardNotice />
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
