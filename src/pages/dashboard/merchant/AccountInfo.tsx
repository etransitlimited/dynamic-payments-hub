
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import { AccountProvider } from "@/context/AccountContext";
import PageLayout from "@/components/dashboard/PageLayout";
import { Shield, Lock, Bell, User, FileText, Settings } from "lucide-react";

// Tab Components
import AccountInfoTab from "./components/account-info/AccountInfoTab";
import PasswordTab from "./components/account-info/PasswordTab";
import SecurityTab from "./components/account-info/SecurityTab";
import VerificationTab from "./components/account-info/VerificationTab";
import NotificationsTab from "./components/account-info/NotificationsTab";

const AccountInfo: React.FC = () => {
  const { language, forceUpdateKey } = usePageLanguage("accountInfo.title", "Account Settings");
  const [activeTab, setActiveTab] = useState("account-info");
  
  const tabItems = [
    { id: "account-info", label: "accountInfo.tabs.info", icon: <User className="h-4 w-4" />, fallback: "Account Information" },
    { id: "password", label: "accountInfo.tabs.password", icon: <Lock className="h-4 w-4" />, fallback: "Password" },
    { id: "security", label: "accountInfo.tabs.security", icon: <Shield className="h-4 w-4" />, fallback: "Security" },
    { id: "verification", label: "accountInfo.tabs.verification", icon: <FileText className="h-4 w-4" />, fallback: "Verification" },
    { id: "notifications", label: "accountInfo.tabs.notifications", icon: <Bell className="h-4 w-4" />, fallback: "Notifications" }
  ];
  
  return (
    <AccountProvider>
      <PageLayout
        animationKey={`account-settings-${language}-${activeTab}`}
        title={<TranslatedText keyName="accountInfo.title" fallback="Account Settings" />}
      >
        <Card className="border border-blue-800/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/30">
          <div className="p-6">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                {tabItems.map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="data-[state=active]:bg-purple-700 data-[state=active]:text-white flex items-center gap-2"
                  >
                    {tab.icon}
                    <TranslatedText keyName={tab.label} fallback={tab.fallback} />
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="account-info">
                <AccountInfoTab />
              </TabsContent>
              
              <TabsContent value="password">
                <PasswordTab />
              </TabsContent>
              
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              
              <TabsContent value="verification">
                <VerificationTab />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </PageLayout>
    </AccountProvider>
  );
};

export default AccountInfo;
