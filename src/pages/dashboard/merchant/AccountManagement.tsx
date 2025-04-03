import React, { useState, useEffect } from "react";
import { Plus, User, Users, CreditCard, BarChart4 } from "lucide-react";
import PageTitle from "./components/PageTitle";
import StatCard from "@/pages/dashboard/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const AccountManagement = () => {
  const { language } = useSafeTranslation();
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
      <PageTitle title="accountManagement" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="accountManagement.activeUsers" fallback="Active Users" />}
            value="245"
            change="+12%"
            compareText={<TranslatedText keyName="accountManagement.comparedToLastWeek" fallback="Compared to Last Week" />}
            icon={<User className="h-5 w-5 text-blue-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-blue-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="accountManagement.adminRoles" fallback="Admin Roles" />}
            value="17"
            change="+5%"
            compareText={<TranslatedText keyName="accountManagement.comparedToLastMonth" fallback="Compared to Last Month" />}
            icon={<Users className="h-5 w-5 text-purple-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-purple-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="accountManagement.activeCards" fallback="Active Cards" />}
            value="138"
            change="+8%"
            compareText={<TranslatedText keyName="accountManagement.comparedToLastWeek" fallback="Compared to Last Week" />}
            icon={<CreditCard className="h-5 w-5 text-green-400" />}
            className="bg-gradient-to-br from-charcoal-light to-charcoal-dark" 
            iconClassName="bg-green-900/30"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatCard 
            title={<TranslatedText keyName="accountManagement.depositCompletion" fallback="Deposit Completion" />}
            value="$25,845"
            change="+15%"
            compareText={<TranslatedText keyName="accountManagement.comparedToLastMonth" fallback="Compared to Last Month" />}
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
                  <TranslatedText keyName="accountManagement.userManagement" fallback="User Management" />
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
                      <TranslatedText keyName="accountManagement.userManagementDesc" fallback="Manage user accounts and access levels" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">245</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.activeUsersCount" fallback="Active Users" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">32</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.inactiveUsersCount" fallback="Inactive Users" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">18</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.newUsers" fallback="New Users" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">87</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.premiumUsers" fallback="Premium Users" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="accountManagement.manageUsers" fallback="Manage Users" />
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
                  <TranslatedText keyName="accountManagement.roleManagement" fallback="Role Management" />
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
                      <TranslatedText keyName="accountManagement.roleManagementDesc" fallback="Manage roles and permissions" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">17</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.adminRole" fallback="Admin Role" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">42</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.staffRole" fallback="Staff Role" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">8</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.permissionSettings" fallback="Permission Settings" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">3</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.adminRoles" fallback="Admin Roles" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="accountManagement.manageRoles" fallback="Manage Roles" />
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
                  <TranslatedText keyName="accountManagement.cardManagement" fallback="Card Management" />
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
                      <TranslatedText keyName="accountManagement.cardManagementDesc" fallback="Manage card accounts and settings" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">138</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.activeCards" fallback="Active Cards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">24</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.pendingCards" fallback="Pending Cards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">95</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.creditCards" fallback="Credit Cards" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">67</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.debitCards" fallback="Debit Cards" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="accountManagement.viewCards" fallback="View Cards" />
                      </button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </ComponentErrorBoundary>
        </motion.div>
        
        {/* Deposit Management Card */}
        <motion.div variants={itemVariants} className="lg:col-span-6">
          <ComponentErrorBoundary component="Deposit Management Card">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 h-full overflow-hidden relative group">
              <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
              <div className="absolute -inset-0.5 bg-purple-500/20 rounded-xl blur-xl group-hover:bg-purple-500/30 transition-all duration-700 opacity-0 group-hover:opacity-75"></div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center">
                  <BarChart4 className="h-5 w-5 mr-2 text-purple-400" />
                  <TranslatedText keyName="accountManagement.depositManagement" fallback="Deposit Management" />
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
                      <TranslatedText keyName="accountManagement.depositManagementDesc" fallback="Manage deposits and withdrawals" />
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$25,845</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.depositCompletion" fallback="Deposit Completion" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$3,450</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.pendingDeposits" fallback="Pending Deposits" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$18,720</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.thisMonth" fallback="This Month" />
                        </div>
                      </div>
                      
                      <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="text-2xl font-bold text-white mb-1">$15,890</div>
                        <div className="text-xs text-gray-400">
                          <TranslatedText keyName="accountManagement.lastMonth" fallback="Last Month" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <button className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors">
                        <Plus className="h-4 w-4 mr-1" />
                        <TranslatedText keyName="accountManagement.viewDeposits" fallback="View Deposits" />
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
