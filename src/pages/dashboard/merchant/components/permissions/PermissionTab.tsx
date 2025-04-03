
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Lock, CreditCard, Wallet, Key } from "lucide-react";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const PermissionTab = () => {
  const { language } = useSafeTranslation();
  const [componentKey, setComponentKey] = useState<string>(`permissions-tab-${language}`);
  
  // Force re-render when language changes
  useEffect(() => {
    setComponentKey(`permissions-tab-${language}-${Date.now()}`);
  }, [language]);

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
                <TranslatedText 
                  keyName="accountRoles.cardAccessManagement" 
                  fallback="Card Access Management" 
                />
              </CardTitle>
              <CardDescription className="text-amber-200/80">
                <TranslatedText 
                  keyName="accountRoles.cardAccessDesc" 
                  fallback="Manage card access permissions" 
                />
              </CardDescription>
            </div>
          </div>
          
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <CreditCard className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">
                    <TranslatedText 
                      keyName="accountRoles.cardActivation" 
                      fallback="Card Activation" 
                    />
                  </h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.adminRole" 
                        fallback="Admin Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.managerRole" 
                        fallback="Manager Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.staffRole" 
                        fallback="Staff Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Wallet className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">
                    <TranslatedText 
                      keyName="accountRoles.depositManagement" 
                      fallback="Deposit Management" 
                    />
                  </h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.adminRole" 
                        fallback="Admin Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.managerRole" 
                        fallback="Manager Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.staffRole" 
                        fallback="Staff Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-[#232533]/70 rounded-lg border border-amber-900/30">
                <div className="flex items-center space-x-3 mb-2">
                  <Key className="h-5 w-5 text-amber-400" />
                  <h3 className="text-white font-medium">
                    <TranslatedText 
                      keyName="accountRoles.cardSettings" 
                      fallback="Card Settings" 
                    />
                  </h3>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.adminRole" 
                        fallback="Admin Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.managerRole" 
                        fallback="Manager Role" 
                      />
                    </span>
                    <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-200/80">
                      <TranslatedText 
                        keyName="accountRoles.staffRole" 
                        fallback="Staff Role" 
                      />
                    </span>
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
