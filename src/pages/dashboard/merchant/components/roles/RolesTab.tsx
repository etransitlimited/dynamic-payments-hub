
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const RolesTab = () => {
  const { t } = useLanguage();
  
  const roles = [
    {
      id: "admin",
      name: t("accountRoles.adminRole"),
      icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
      access: t("accountRoles.fullAccess"),
      color: "blue"
    },
    {
      id: "manager",
      name: t("accountRoles.managerRole"),
      icon: <Users className="h-5 w-5 text-green-400" />,
      access: t("accountRoles.limitedAccess"),
      color: "green"
    },
    {
      id: "staff",
      name: t("accountRoles.staffRole"),
      icon: <Settings className="h-5 w-5 text-amber-400" />,
      access: t("accountRoles.basicAccess"),
      color: "amber"
    }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <Card 
            key={role.id} 
            className={`bg-${role.color}-900/20 border-${role.color}-800/30 hover:shadow-md hover:shadow-${role.color}-900/10 transition-all duration-300`}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`bg-${role.color}-500/20 p-2 rounded-full`}>
                  {role.icon}
                </span>
                <div>
                  <h3 className="text-white font-medium">{role.name}</h3>
                  <p className="text-sm text-blue-200/80">{role.access}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {role.id === "admin" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.dashboardAccess")}</span>
                      <span className="text-green-400">{t("accountRoles.allRoles")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.userManagement")}</span>
                      <span className="text-green-400">{t("accountRoles.adminOnly")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.transactionManagement")}</span>
                      <span className="text-green-400">{t("accountRoles.adminOnly")}</span>
                    </div>
                  </>
                ) : role.id === "manager" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.dashboardAccess")}</span>
                      <span className="text-green-400">{t("accountRoles.allRoles")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.userManagement")}</span>
                      <span className="text-yellow-400">{t("accountRoles.limitedAccess")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.transactionManagement")}</span>
                      <span className="text-green-400">{t("accountRoles.adminAndManager")}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.dashboardAccess")}</span>
                      <span className="text-green-400">{t("accountRoles.allRoles")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.userManagement")}</span>
                      <span className="text-red-400">-</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/80">{t("accountRoles.transactionManagement")}</span>
                      <span className="text-red-400">-</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RolesTab;
