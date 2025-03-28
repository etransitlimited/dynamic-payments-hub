
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, CreditCard, Wallet, Settings } from "lucide-react";
import PageHeader from "./components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import TabsComponent from "@/components/common/TabsComponent";
import RolesTab from "./components/roles/RolesTab";
import PermissionTab from "./components/permissions/PermissionTab";

const AccountRoles = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("roles");
  
  // Log when component mounts and re-renders
  useEffect(() => {
    console.log("AccountRoles mounted or re-rendered with active tab:", activeTab);
  });
  
  useEffect(() => {
    console.log("AccountRoles initial mount with active tab:", activeTab);
  }, []);
  
  const handleTabChange = (value: string) => {
    console.log(`AccountRoles tab changing to: ${value}`);
    setActiveTab(value);
  };
  
  // Debug render
  console.log("AccountRoles rendering with activeTab:", activeTab);
  
  const cardAccessContent = (
    <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
      <CardHeader className="relative z-10 pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-teal-500/20 p-2 rounded-full mr-2">
            <CreditCard size={18} className="text-teal-400" />
          </span>
          {t("accountRoles.cardAccessManagement")}
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          {t("accountRoles.cardAccessDesc")}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid gap-4">
          <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-teal-400" />
              <span>{t("accountRoles.cardActivation")}</span>
            </div>
            <span className="font-bold">{t("accountRoles.adminOnly")}</span>
          </div>
          <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-teal-400" />
              <span>{t("accountRoles.depositManagement")}</span>
            </div>
            <span className="font-bold">{t("accountRoles.adminAndManager")}</span>
          </div>
          <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-teal-400" />
              <span>{t("accountRoles.cardSettings")}</span>
            </div>
            <span className="font-bold">{t("accountRoles.adminOnly")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  const tabs = [
    {
      value: "roles",
      label: t("accountRoles.roleManagement"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white",
      content: <RolesTab />
    },
    {
      value: "permissions",
      label: t("accountRoles.permissionSettings"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500 text-white",
      content: <PermissionTab />
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("accountRoles.title")} />
      
      <TabsComponent 
        defaultValue="roles"
        tabs={tabs}
        listClassName="w-full grid grid-cols-2 mb-6 bg-blue-950/70 border border-blue-800/30"
        onChange={handleTabChange}
        value={activeTab}
      />
      
      {cardAccessContent}
    </div>
  );
};

export default AccountRoles;
