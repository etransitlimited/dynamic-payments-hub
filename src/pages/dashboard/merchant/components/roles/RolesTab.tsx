
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Settings } from "lucide-react";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useRolesTranslation } from "../../hooks/useRolesTranslation";

const RolesTab = () => {
  const { t, language } = useRolesTranslation();
  const [componentKey, setComponentKey] = useState<string>(`roles-tab-${language}`);
  
  // Update component key when language changes to force re-render
  useEffect(() => {
    setComponentKey(`roles-tab-${language}-${Date.now()}`);
    console.log(`RolesTab language changed to: ${language}`);
  }, [language]);
  
  const roles = [
    {
      id: "admin",
      name: t("adminRole"),
      icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
      access: t("fullAccess"),
      color: "blue"
    },
    {
      id: "manager",
      name: t("managerRole"),
      icon: <Users className="h-5 w-5 text-green-400" />,
      access: t("limitedAccess"),
      color: "green"
    },
    {
      id: "staff",
      name: t("staffRole"),
      icon: <Settings className="h-5 w-5 text-amber-400" />,
      access: t("basicAccess"),
      color: "amber"
    }
  ];
  
  return (
    <ComponentErrorBoundary component="Roles Tab">
      <div className="p-6 space-y-6" key={componentKey} data-language={language}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <Card 
              key={`${role.id}-${language}`} 
              className={`bg-${role.color}-900/20 border-${role.color}-800/30 hover:shadow-md hover:shadow-${role.color}-900/10 transition-all duration-300`}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`bg-${role.color}-500/20 p-2 rounded-full`}>
                    {role.icon}
                  </span>
                  <div>
                    <h3 className="text-white font-medium">
                      {role.name}
                    </h3>
                    <p className="text-sm text-blue-200/80">
                      {role.access}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {role.id === "admin" ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("dashboardAccess")}
                        </span>
                        <span className="text-green-400">
                          {t("allRoles")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("userManagement")}
                        </span>
                        <span className="text-green-400">
                          {t("adminOnly")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className="text-green-400">
                          {t("adminOnly")}
                        </span>
                      </div>
                    </>
                  ) : role.id === "manager" ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("dashboardAccess")}
                        </span>
                        <span className="text-green-400">
                          {t("allRoles")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("userManagement")}
                        </span>
                        <span className="text-yellow-400">
                          {t("limitedAccess")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className="text-green-400">
                          {t("adminAndManager")}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("dashboardAccess")}
                        </span>
                        <span className="text-green-400">
                          {t("allRoles")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("userManagement")}
                        </span>
                        <span className="text-red-400">-</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
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
    </ComponentErrorBoundary>
  );
};

export default RolesTab;
