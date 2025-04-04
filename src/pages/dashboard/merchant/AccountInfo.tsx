
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import CompanyInfoSection from "./components/account-info/CompanyInfoSection";
import ContactInfoSection from "./components/account-info/ContactInfoSection";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import { AccountProvider } from "@/context/AccountContext";
import PageLayout from "@/components/dashboard/PageLayout";

const AccountInfo: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("accountInfo.title", "Account Information");
  
  return (
    <AccountProvider>
      <PageLayout
        animationKey={`account-info-${language}`}
        title={<TranslatedText keyName="accountInfo.title" fallback="Account Information" />}
      >
        <div className="grid grid-cols-1 gap-6">
          <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
            <div className="p-6">
              <h2 className="text-xl font-medium text-white mb-4">
                <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
              </h2>
              <CompanyInfoSection />
            </div>
          </Card>

          <Card className="overflow-hidden border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
            <div className="p-6">
              <h2 className="text-xl font-medium text-white mb-4">
                <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
              </h2>
              <ContactInfoSection />
            </div>
          </Card>
        </div>
      </PageLayout>
    </AccountProvider>
  );
};

export default AccountInfo;
