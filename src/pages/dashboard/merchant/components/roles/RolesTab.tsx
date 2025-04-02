
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import TranslatedText from "@/components/translation/TranslatedText";

const RolesTab = () => {
  const { t } = useLanguage();
  
  const roles = [
    {
      id: "admin",
      nameKey: "accountRoles.adminRole",
      icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
      accessKey: "accountRoles.fullAccess",
      color: "blue"
    },
    {
      id: "manager",
      nameKey: "accountRoles.managerRole",
      icon: <Users className="h-5 w-5 text-green-400" />,
      accessKey: "accountRoles.limitedAccess",
      color: "green"
    },
    {
      id: "staff",
      nameKey: "accountRoles.staffRole",
      icon: <Settings className="h-5 w-5 text-amber-400" />,
      accessKey: "accountRoles.basicAccess",
      color: "amber"
    }
  ];
  
  return (
    <ComponentErrorBoundary component="Roles Tab">
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
                    <h3 className="text-white font-medium">
                      <TranslatedText keyName={role.nameKey} fallback={role.nameKey.split('.')[1]} />
                    </h3>
                    <p className="text-sm text-blue-200/80">
                      <TranslatedText keyName={role.accessKey} fallback={role.accessKey.split('.')[1]} />
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {role.id === "admin" ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.dashboardAccess" fallback="Dashboard Access" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.allRoles" fallback="All roles" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.userManagement" fallback="User Management" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.adminOnly" fallback="Admin only" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.transactionManagement" fallback="Transaction Management" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.adminOnly" fallback="Admin only" />
                        </span>
                      </div>
                    </>
                  ) : role.id === "manager" ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.dashboardAccess" fallback="Dashboard Access" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.allRoles" fallback="All roles" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.userManagement" fallback="User Management" />
                        </span>
                        <span className="text-yellow-400">
                          <TranslatedText keyName="accountRoles.limitedAccess" fallback="Limited access" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.transactionManagement" fallback="Transaction Management" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.adminAndManager" fallback="Admin & Manager" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.dashboardAccess" fallback="Dashboard Access" />
                        </span>
                        <span className="text-green-400">
                          <TranslatedText keyName="accountRoles.allRoles" fallback="All roles" />
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.userManagement" fallback="User Management" />
                        </span>
                        <span className="text-red-400">-</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          <TranslatedText keyName="accountRoles.transactionManagement" fallback="Transaction Management" />
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
