
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard, Wallet, Key } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PermissionTab = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6 space-y-6">
      <Card className="bg-amber-900/20 border-amber-800/30">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-amber-500/20 p-2 rounded-full">
              <Lock className="h-5 w-5 text-amber-400" />
            </span>
            <div>
              <CardTitle className="text-white text-lg">{t("accountRoles.cardAccessManagement")}</CardTitle>
              <CardDescription className="text-amber-200/80">{t("accountRoles.cardAccessDesc")}</CardDescription>
            </div>
          </div>
          
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">{t("accountRoles.cardActivation")}</h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.adminRole")}</span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.managerRole")}</span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.staffRole")}</span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Wallet className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">{t("accountRoles.depositManagement")}</h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.adminRole")}</span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.managerRole")}</span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.staffRole")}</span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Key className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">{t("accountRoles.cardSettings")}</h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.adminRole")}</span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.managerRole")}</span>
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">{t("accountRoles.staffRole")}</span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionTab;
