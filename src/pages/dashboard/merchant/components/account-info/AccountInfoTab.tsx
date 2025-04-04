
import React from "react";
import CompanyInfoSection from "./CompanyInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import TranslatedText from "@/components/translation/TranslatedText";

const AccountInfoTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-white mb-4">
          <TranslatedText keyName="accountInfo.companyDetails" fallback="Company Details" />
        </h2>
        <CompanyInfoSection />
      </div>

      <div>
        <h2 className="text-xl font-medium text-white mb-4">
          <TranslatedText keyName="accountInfo.contactDetails" fallback="Contact Details" />
        </h2>
        <ContactInfoSection />
      </div>
    </div>
  );
};

export default AccountInfoTab;
