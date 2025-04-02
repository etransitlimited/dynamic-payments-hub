
import React from "react";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

interface PageHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  const { t } = useSafeTranslation();
  
  // Get specific translations for common titles
  const getTitleTranslation = (titleKey: string) => {
    // These are specific fallbacks for common page titles
    const titleFallbacks: Record<string, string> = {
      "sidebar.analytics": "Analytics Dashboard",
      "sidebar.transactions": "Transactions",
      "sidebar.wallet.deposit": "Wallet Deposit",
      "sidebar.wallet.depositRecords": "Deposit Records",
      "sidebar.wallet.fundDetails": "Fund Details",
      "sidebar.cards.search": "Card Search",
      "sidebar.cards.activationTasks": "Activation Tasks",
      "sidebar.cards.apply": "Apply Card",
      "sidebar.merchant.accountManagement": "Account Management",
      "sidebar.merchant.accountInfo": "Account Information",
      "sidebar.merchant.accountRoles": "Account Roles",
      "sidebar.invitation.list": "Invitation List",
      "sidebar.invitation.rebateList": "Rebate List",
      "analytics.subtitle": "Track your business performance and metrics",
      "transactions.subtitle": "View and manage all transactions in the platform"
    };

    return titleFallbacks[titleKey] || t(titleKey);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        {typeof title === 'string' ? (
          <TranslatedText keyName={title} fallback={getTitleTranslation(title)} />
        ) : title}
      </h1>
      {description && (
        <p className="mt-2 text-blue-300 max-w-2xl">
          {typeof description === 'string' ? (
            <TranslatedText keyName={description} fallback={getTitleTranslation(description)} />
          ) : description}
        </p>
      )}
    </motion.div>
  );
};

export default PageHeader;
