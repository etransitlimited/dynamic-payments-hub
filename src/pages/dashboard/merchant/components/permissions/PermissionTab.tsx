
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard, Wallet, Key } from "lucide-react";
import { useRolesTranslation } from "../../hooks/useRolesTranslation";

const PermissionTab = () => {
  const { t, language } = useRolesTranslation();
  const [componentKey, setComponentKey] = useState<string>(`permissions-tab-${language}`);
  
  // Force re-render when language changes
  useEffect(() => {
    setComponentKey(`permissions-tab-${language}-${Date.now()}`);
    console.log(`PermissionTab language changed to: ${language}`);
  }, [language]);

  const permissionSections = [
    {
      key: "cardActivation",
      icon: <CreditCard className="h-5 w-5 text-amber-400" />,
      title: t("cardActivation"),
      roleStatuses: [
        { role: t("adminRole"), status: t("accessFullaccess") },
        { role: t("managerRole"), status: t("accessManagecontentusers") },
        { role: t("staffRole"), status: t("accessViewonly") }
      ]
    },
    {
      key: "depositManagement",
      icon: <Wallet className="h-5 w-5 text-amber-400" />,
      title: t("depositManagement"),
      roleStatuses: [
        { role: t("adminRole"), status: t("accessFullaccess") },
        { role: t("managerRole"), status: t("accessManagecontentusers") },
        { role: t("staffRole"), status: t("accessViewonly") }
      ]
    },
    {
      key: "cardSettings",
      icon: <Key className="h-5 w-5 text-amber-400" />,
      title: t("cardSettings"),
      roleStatuses: [
        { role: t("adminRole"), status: t("accessFullaccess") },
        { role: t("managerRole"), status: t("accessViewcreate") },
        { role: t("staffRole"), status: t("accessViewonly") }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6" key={componentKey} data-language={language}>
      <Card className="bg-amber-900/20 border-amber-800/30">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-amber-500/20 p-2 rounded-full">
              <Lock className="h-5 w-5 text-amber-400" />
            </span>
            <div>
              <CardTitle className="text-white text-lg">
                {t("cardAccessManagement")}
              </CardTitle>
              <CardDescription className="text-amber-200/80">
                {t("cardAccessDesc")}
              </CardDescription>
            </div>
          </div>
          
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {permissionSections.map((section) => (
                <div key={section.key} className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                  <div className="flex items-center space-x-3 mb-2">
                    {section.icon}
                    <h3 className="text-white font-medium">
                      {section.title}
                    </h3>
                  </div>
                  <div className="mt-3 space-y-2">
                    {section.roleStatuses.map((roleStatus, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-blue-200/80">
                          {roleStatus.role}
                        </span>
                        <span 
                          className={`inline-block w-3 h-3 rounded-full ${
                            roleStatus.status === t("accessFullaccess") ? 'bg-green-500' :
                            roleStatus.status === t("accessManagecontentusers") ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                        ></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionTab;

