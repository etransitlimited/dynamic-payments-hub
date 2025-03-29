
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "./components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";
import TabsComponent from "@/components/common/TabsComponent";
import { getAccountRolesTabs } from "./utils/accountRolesTabs";

const AccountRoles = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("roles");

  const handleTabChange = (value: string) => {
    console.log(`AccountRoles tab changing to: ${value}`);
    setActiveTab(value);
  };

  const tabs = getAccountRolesTabs(t);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("accountRoles.title")} />
      
      <Card className="border-blue-900/50 bg-blue-950/10 overflow-hidden shadow-lg">
        <CardHeader className="pb-4 space-y-2">
          <CardTitle className="text-blue-50 text-xl flex items-center justify-between">
            <span>{t("accountRoles.roleManagement")}</span>
            <div className="text-sm text-blue-200/70 font-normal">
              {t("accountRoles.roleManagementDesc")}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TabsComponent 
            tabs={tabs}
            defaultValue="roles"
            listClassName="w-full grid grid-cols-3 bg-blue-950/70 border-b border-blue-800/30"
            onChange={handleTabChange}
            value={activeTab}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRoles;
