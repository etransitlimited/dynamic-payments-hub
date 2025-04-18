import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TabsComponent from "@/components/common/TabsComponent";
import { getAccountRolesTabs } from "./utils/accountRolesTabs";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Shield, Users, Key, AlertTriangle } from "lucide-react";
import { useRolesTranslation } from "./hooks/useRolesTranslation";
import PageLayout from "@/components/dashboard/PageLayout";
import PageTitle from "./components/PageTitle";

const AccountRoles = () => {
  const { t, language } = useRolesTranslation();
  const [activeTab, setActiveTab] = useState("roles");
  const [permissionStats, setPermissionStats] = useState({
    admins: { count: 3, percentage: 15 },
    managers: { count: 8, percentage: 40 },
    editors: { count: 6, percentage: 30 },
    viewers: { count: 3, percentage: 15 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    console.log(`AccountRoles tab changing to: ${value}`);
    setActiveTab(value);
  };

  const tabs = getAccountRolesTabs();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <PageLayout
      animationKey={`account-roles-${language}`}
      title={t("title")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
            
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-purple-400" />
                {t("permissionOverview")}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 bg-purple-900/40 rounded-md"></div>
                  <div className="h-8 bg-purple-900/40 rounded-md"></div>
                  <div className="h-8 bg-purple-900/40 rounded-md"></div>
                  <div className="h-8 bg-purple-900/40 rounded-md"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{t("adminRole")}</span>
                      <span>{permissionStats.admins.count}</span>
                    </div>
                    <Progress value={permissionStats.admins.percentage} className="h-2" indicatorClassName="bg-red-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{t("managerRole")}</span>
                      <span>{permissionStats.managers.count}</span>
                    </div>
                    <Progress value={permissionStats.managers.percentage} className="h-2" indicatorClassName="bg-amber-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{t("staffRole")}</span>
                      <span>{permissionStats.editors.count}</span>
                    </div>
                    <Progress value={permissionStats.editors.percentage} className="h-2" indicatorClassName="bg-blue-500" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>{t("viewerRole")}</span>
                      <span>{permissionStats.viewers.count}</span>
                    </div>
                    <Progress value={permissionStats.viewers.percentage} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
            
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-400" />
                {t("teamMembers")}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-purple-900/40 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-purple-900/40 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-purple-900/40 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-purple-900/40 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-purple-900/40 rounded w-28 mb-2"></div>
                      <div className="h-3 bg-purple-900/40 rounded w-36"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 bg-purple-900/40 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-purple-900/40 rounded w-20 mb-2"></div>
                      <div className="h-3 bg-purple-900/40 rounded w-28"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { name: "Alex Chen", role: "adminRole", lastActive: "2 hrs ago" },
                      { name: "Sarah Miller", role: "managerRole", lastActive: "5 mins ago" },
                      { name: "David Wang", role: "staffRole", lastActive: "Yesterday" }
                    ].map((user, index) => (
                      <div key={index} className="flex items-center p-2 rounded-lg hover:bg-purple-900/20 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/80 to-purple-700/80 flex items-center justify-center text-white font-medium text-sm mr-3">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-gray-400 flex items-center">
                            <span className="text-xs text-gray-400">{t(user.role)}</span>
                            <span className="mx-2">•</span>
                            <span>{user.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <button className="text-neon-purple text-xs hover:text-neon-green transition-colors">
                      {t("viewAllMembers")}
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-4">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
            
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-sm font-medium text-white flex items-center">
                <Key className="h-5 w-5 mr-2 text-purple-400" />
                {t("accessLevels")}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              {loading ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-10 bg-purple-900/40 rounded-md"></div>
                  <div className="h-10 bg-purple-900/40 rounded-md"></div>
                  <div className="h-10 bg-purple-900/40 rounded-md"></div>
                  <div className="h-10 bg-purple-900/40 rounded-md"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { translationKey: "accessFullaccess", count: 3, color: "bg-green-500" },
                    { translationKey: "accessManagecontentusers", count: 8, color: "bg-blue-500" },
                    { translationKey: "accessViewcreate", count: 6, color: "bg-amber-500" },
                    { translationKey: "accessViewonly", count: 3, color: "bg-purple-500" }
                  ].map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-900/20 transition-colors">
                      <div className="flex items-center">
                        <div className={`w-2 h-10 ${level.color} rounded-full mr-3`}></div>
                        <span className="text-sm text-white">
                          {t(level.translationKey)}
                        </span>
                      </div>
                      <div className={`h-6 w-6 rounded-full ${level.color} flex items-center justify-center text-xs text-white font-medium`}>
                        {level.count}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-12">
          <ComponentErrorBoundary component="Account Roles Card">
            <Card 
              className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_20px_rgba(142,45,226,0.2)]"
            >
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700"></div>
              
              <CardHeader className="relative z-10 border-b border-purple-900/20 pb-4">
                <CardTitle className="text-white text-xl flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-neon-purple" />
                  {t("roleManagement")}
                  <div className="ml-auto text-sm text-purple-200/70 font-normal flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                    {t("roleManagementDesc")}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 p-0">
                <TabsComponent 
                  tabs={tabs}
                  defaultValue="roles"
                  listClassName="w-full grid grid-cols-3 bg-purple-950/70 border-b border-purple-800/30"
                  onChange={handleTabChange}
                  value={activeTab}
                />
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default AccountRoles;
