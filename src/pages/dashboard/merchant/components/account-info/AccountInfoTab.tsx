
import React from "react";
import CompanyInfoSection from "./CompanyInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "@/context/AccountContext";
import TranslatedText from "@/components/translation/TranslatedText";
import { CheckCircle2, Clock, AlertTriangle, Building, User } from "lucide-react";

const AccountInfoTab: React.FC = () => {
  const { verificationStatus } = useAccount();
  const [verificationType, setVerificationType] = React.useState<"personal" | "enterprise">("enterprise");

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case "verified":
        return (
          <Badge className="bg-green-600 hover:bg-green-700 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            <TranslatedText keyName="accountInfo.verified" fallback="Verified" />
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-600 hover:bg-amber-700 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <TranslatedText keyName="accountInfo.pending" fallback="Verification Pending" />
          </Badge>
        );
      default:
        return (
          <Badge className="bg-red-600 hover:bg-red-700 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <TranslatedText keyName="accountInfo.notVerified" fallback="Not Verified" />
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-medium text-white">
            <TranslatedText keyName="accountInfo.accountStatus" fallback="Account Status" />
          </h2>
          {getStatusBadge()}
        </div>
        
        <div>
          <Tabs 
            value={verificationType} 
            onValueChange={(value) => setVerificationType(value as "personal" | "enterprise")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 gap-2">
              <TabsTrigger 
                value="personal"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <TranslatedText keyName="accountInfo.verification.personal" fallback="Personal" />
              </TabsTrigger>
              <TabsTrigger 
                value="enterprise"
                className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center gap-2"
              >
                <Building className="h-4 w-4" />
                <TranslatedText keyName="accountInfo.verification.enterprise" fallback="Enterprise" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30 p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {verificationType === "enterprise" ? (
              <Building className="h-10 w-10 text-blue-400" />
            ) : (
              <User className="h-10 w-10 text-blue-400" />
            )}
          </div>
          <div>
            <p className="text-white font-medium">
              <TranslatedText 
                keyName={`accountInfo.verification.${verificationType}Title`} 
                fallback={verificationType === "enterprise" ? "Enterprise Account" : "Personal Account"} 
              />
            </p>
            <p className="text-sm text-gray-400">
              <TranslatedText 
                keyName={`accountInfo.verification.${verificationType}Description`} 
                fallback={verificationType === "enterprise" ? "This account is registered as a business entity" : "This account is registered as an individual"} 
              />
            </p>
          </div>
        </div>
      </Card>

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
