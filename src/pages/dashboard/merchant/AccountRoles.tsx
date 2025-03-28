
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import PageHeader from "./components/PageHeader";
import { useLanguage } from "@/context/LanguageContext";

const AccountRoles = () => {
  const { t } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title={t("accountRoles.title")} />
      
      <Card className="bg-gradient-to-br from-purple-900 to-purple-950 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <Users size={18} className="text-purple-400" />
            </span>
            {t("accountRoles.roleManagement")}
          </CardTitle>
          <CardDescription className="text-purple-200/80">
            {t("accountRoles.roleManagementDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid gap-4">
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                <span>{t("accountRoles.adminRole")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.fullAccess")}</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                <span>{t("accountRoles.managerRole")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.limitedAccess")}</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/20 border border-purple-800/30 text-white">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                <span>{t("accountRoles.staffRole")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.basicAccess")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Shield size={18} className="text-blue-400" />
            </span>
            {t("accountRoles.permissionSettings")}
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("accountRoles.permissionSettingsDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid gap-4">
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t("accountRoles.dashboardAccess")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.allRoles")}</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t("accountRoles.userManagement")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.adminOnly")}</span>
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-md bg-blue-900/20 border border-blue-800/30 text-white">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-400" />
                <span>{t("accountRoles.transactionManagement")}</span>
              </div>
              <span className="font-bold">{t("accountRoles.adminAndManager")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRoles;
