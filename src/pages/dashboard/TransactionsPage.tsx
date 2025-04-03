
import React from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";

const TransactionsPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("transactions.title", "Transactions");
  
  // Get translations
  const pageTitle = getTranslation("transactions.title", "Transactions");
  const pageSubtitle = getTranslation("transactions.subtitle", "View and manage all transactions on the platform");
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      data-language={language}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">{pageTitle}</h1>
        <p className="text-gray-400">{pageSubtitle}</p>
      </div>
      
      {/* Original components were not found, replacing with placeholder content */}
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="transactions.overview" fallback="Transactions Overview" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="transactions.overviewDescription" fallback="Summary of your transaction activity." />
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-charcoal-light to-charcoal-dark p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          <TranslatedText keyName="transactions.list" fallback="Transactions List" />
        </h2>
        <p className="text-gray-400">
          <TranslatedText keyName="transactions.listDescription" fallback="Detailed list of all your transactions." />
        </p>
      </div>
    </motion.div>
  );
};

export default TransactionsPage;
