
import React, { useState, useEffect } from "react";
import { Plus, User, Users, CreditCard, BarChart4, Bug } from "lucide-react";
import PageTitle from "./components/PageTitle";
import StatCard from "@/pages/dashboard/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useManagementTranslation } from "./hooks/useManagementTranslation";

const AccountManagement = () => {
  const { t, language } = useManagementTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Rerender when language changes
  useEffect(() => {
    console.log(`Language changed to: ${language} in AccountManagement`);
  }, [language]);

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
      key={`account-management-${language}`} // Force re-render on language change
    >
      <PageTitle title="management.title" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="management.activeUsers" />}
            value="245"
            change="+12%"
            compareText={<TranslatedText keyName="management.comparedToLastWeek" />}
            icon={<User className="h-5 w-5 text-blue-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-blue-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="management.adminRoles" />}
            value="17"
            change="+5%"
            compareText={<TranslatedText keyName="management.comparedToLastMonth" />}
            icon={<Users className="h-5 w-5 text-purple-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-purple-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="management.activeCards" />}
            value="138"
            change="+8%"
            compareText={<TranslatedText keyName="management.comparedToLastWeek" />}
            icon={<CreditCard className="h-5 w-5 text-green-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-green-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="management.depositCompletion" />}
            value="$25,845"
            change="+15%"
            compareText={<TranslatedText keyName="management.comparedToLastMonth" />}
            icon={<BarChart4 className="h-5 w-5 text-amber-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-amber-900/30"
          />
        </motion.div>
      </div>

      {/* Additional management cards section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Management Card */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <ComponentErrorBoundary component="User Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="management.userManagement" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-purple-900/40 rounded-md w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      <TranslatedText keyName="management.userManagementDesc" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">245</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.activeUsersCount" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">32</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.inactiveUsersCount" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">18</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.newUsers" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">87</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.premiumUsers" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="management.manageUsers" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
        
        {/* Role Management Card */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <ComponentErrorBoundary component="Role Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="management.roleManagement" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-purple-900/40 rounded-md w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      <TranslatedText keyName="management.roleManagementDesc" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">17</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.adminRole" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">42</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.staffRole" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">8</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.permissionSettings" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">3</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.adminRoles" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="management.manageRoles" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
        
        {/* Card Management Card */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <ComponentErrorBoundary component="Card Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="management.cardManagement" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-purple-900/40 rounded-md w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      <TranslatedText keyName="management.cardManagementDesc" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">138</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.activeCards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">24</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.pendingCards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">95</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.creditCards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">67</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.debitCards" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="management.viewCards" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
        
        {/* Bug Management Card - New Card */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <ComponentErrorBoundary component="Bug Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <Bug className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="management.bugManagement" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-purple-900/40 rounded-md w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      <TranslatedText keyName="management.bugManagementDesc" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">12</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.openBugs" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">48</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.resolvedBugs" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">3</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.criticalBugs" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">9</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.lowPriorityBugs" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="management.manageBugs" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
        
        {/* Deposit Management Card */}
        <motion.div variants={itemVariants} className="lg:col-span-12">
          <ComponentErrorBoundary component="Deposit Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="management.depositManagement" />
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-purple-900/40 rounded-md w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                      <div className="h-20 bg-purple-900/40 rounded-md"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-4">
                      <TranslatedText keyName="management.depositManagementDesc" />
                    </p>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$25,845</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.depositCompletion" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$3,450</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.pendingDeposits" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$18,720</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.thisMonth" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$15,890</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="management.lastMonth" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="management.viewDeposits" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AccountManagement;
