
import React from "react";
import { motion } from "framer-motion";
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
      
      {/* Original components were not found, replacing with placeholder content */}
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="dashboard.metrics" fallback="Dashboard Metrics" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="dashboard.metricsDescription" fallback="Your key metrics will appear here." />
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              <TranslatedText keyName="dashboard.activities" fallback="Recent Activities" />
            </h2>
            <p className="text-gray-400">
              <TranslatedText keyName="dashboard.activitiesDescription" fallback="Your recent activities will appear here." />
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              <TranslatedText keyName="dashboard.quickActions" fallback="Quick Actions" />
            </h2>
            <p className="text-gray-400">
              <TranslatedText keyName="dashboard.quickActionsDescription" fallback="Your quick actions will appear here." />
            </p>
          </div>
          <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              <TranslatedText keyName="dashboard.notices" fallback="Notices" />
            </h2>
            <p className="text-gray-400">
              <TranslatedText keyName="dashboard.noticesDescription" fallback="Important notices will appear here." />
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
