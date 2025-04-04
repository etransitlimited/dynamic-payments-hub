
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Grid, PieChart, Activity, Users, Award, CreditCard, Clock, DollarSign, Calendar, Lock, Bell, Shield, Settings, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PageTitle from "./components/PageTitle";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useManagementTranslation } from "./hooks/useManagementTranslation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { DeferredLoad } from "@/utils/progressive-loading";
import { useNavigate } from "react-router-dom";
// Removed VirtualCardsStack import

const AccountManagement = () => {
  const { t: mt, language } = useManagementTranslation();
  const { t: at } = useSafeTranslation();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data for the dashboard
  const [mockStats] = useState({
    activeUsers: 145,
    inactiveUsers: 28, 
    adminRoles: 5,
    activeCards: 67,
    pendingCards: 12,
    depositCompletion: 87,
    securityLevel: "High",
    notificationCount: 3,
    lastLoginActivity: "2023-04-03T14:25:16Z",
    pendingApprovals: 7
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  // Enhanced statistics card skeleton for loading state
  const StatCardSkeleton = () => (
    <div className="animate-pulse space-y-3 p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="h-10 w-10 rounded-md bg-purple-900/50"></div>
        <div className="h-4 w-20 bg-purple-900/50 rounded"></div>
      </div>
      <div className="h-7 bg-purple-900/50 w-20 rounded mb-2"></div>
      <div className="h-4 bg-purple-900/50 w-32 rounded"></div>
    </div>
  );

  // Define management section cards data
  const managementSections = [
    {
      icon: <Settings size={24} className="text-blue-400" />,
      title: at("accountManagement.accountSettings"),
      description: at("accountManagement.accountSettingsDesc"),
      color: "blue",
      route: "/dashboard/account/settings"
    },
    {
      icon: <CreditCard size={24} className="text-green-400" />,
      title: at("accountManagement.cardManagement"),
      description: at("accountManagement.cardManagementDesc"),
      color: "green",
      route: "/dashboard/cards/search"
    },
    {
      icon: <Users size={24} className="text-amber-400" />,
      title: at("accountManagement.userManagement"),
      description: at("accountManagement.userManagementDesc"),
      color: "amber",
      route: "/dashboard/account/roles"
    },
    {
      icon: <DollarSign size={24} className="text-purple-400" />,
      title: at("accountManagement.depositManagement"),
      description: at("accountManagement.depositManagementDesc"),
      color: "purple",
      route: "/dashboard/wallet/deposit"
    },
    {
      icon: <Shield size={24} className="text-indigo-400" />,
      title: at("accountManagement.accountSecurity"),
      description: at("accountManagement.accountSecurityDesc"),
      color: "indigo",
      route: "/dashboard/account/security"
    },
    {
      icon: <Bell size={24} className="text-pink-400" />,
      title: at("accountManagement.accountNotifications"),
      description: at("accountManagement.accountNotificationsDesc"),
      color: "pink",
      route: "/dashboard/account/notifications"
    }
  ];

  // Recent Activity Data
  const recentActivity = [
    { user: "John Doe", action: "Updated user role", timestamp: "2 hours ago", icon: <Settings size={16} className="text-blue-400" /> },
    { user: "Alice Smith", action: "Added new card", timestamp: "Yesterday", icon: <CreditCard size={16} className="text-green-400" /> },
    { user: "Robert Johnson", action: "Modified permissions", timestamp: "2 days ago", icon: <Lock size={16} className="text-amber-400" /> },
  ];

  // Enhanced Management Card with improved design
  const ManagementCard = ({ section, index }: { section: any, index: number }) => (
    <motion.div 
      variants={itemVariants} 
      className="relative group h-full"
      whileHover={{
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={() => section.route && navigate(section.route)}
    >
      <Card className={`border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_20px_rgba(142,45,226,0.20)] hover:border-${section.color}-700/40 transition-all duration-300 cursor-pointer h-full overflow-hidden`}>
        <div className={`absolute top-0 left-0 w-full h-1 bg-${section.color}-500/70 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-lg flex items-center text-white">
            <span className={`p-2 rounded-md bg-${section.color}-900/30 mr-3`}>
              {section.icon}
            </span>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {section.title}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          {loading ? (
            <Skeleton className="h-4 w-full bg-purple-900/20" />
          ) : (
            <p className="text-sm text-gray-400">{section.description}</p>
          )}
          
          <div className={`absolute bottom-2 right-2 w-12 h-12 rounded-full bg-${section.color}-500/5 blur-xl opacity-70`}></div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-6 flex justify-end">
          <ChevronRight size={18} className="text-gray-400 group-hover:text-white transition-colors" />
        </CardFooter>
      </Card>
    </motion.div>
  );

  // Activity Item Component
  const ActivityItem = ({ item }: { item: any }) => (
    <motion.div 
      variants={itemVariants}
      className="flex items-start gap-3 p-3 hover:bg-charcoal-dark/40 rounded-lg transition-colors"
    >
      <div className="bg-charcoal-dark/60 p-2 rounded-full">
        {item.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium text-white">{item.user}</h4>
          <span className="text-xs text-gray-500">{item.timestamp}</span>
        </div>
        <p className="text-xs text-gray-400">{item.action}</p>
      </div>
    </motion.div>
  );

  // Core metrics for the dashboard
  const coreMetrics = [
    { 
      title: at("accountManagement.userManagement"), 
      activeValue: mockStats.activeUsers, 
      pendingValue: mockStats.inactiveUsers, 
      activeLabel: at("accountManagement.activeUsersCount"),
      pendingLabel: at("accountManagement.inactiveUsersCount"),
      icon: <Users size={24} className="text-blue-400" />,
      color: "blue",
      percent: 84,
      route: "/dashboard/account/users"
    },
    { 
      title: at("accountManagement.cardManagement"), 
      activeValue: mockStats.activeCards, 
      pendingValue: mockStats.pendingCards, 
      activeLabel: at("accountManagement.activeCards"),
      pendingLabel: at("accountManagement.pendingCards"),
      icon: <CreditCard size={24} className="text-green-400" />,
      color: "green",
      percent: 76,
      route: "/dashboard/cards/search"
    },
    { 
      title: at("accountRoles.roleManagement"), 
      activeValue: mockStats.adminRoles, 
      pendingValue: 2, 
      activeLabel: at("accountManagement.adminRole"),
      pendingLabel: at("accountManagement.staffRole"),
      icon: <Lock size={24} className="text-amber-400" />,
      color: "amber",
      percent: 62,
      route: "/dashboard/account/roles"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-8"
      key={`account-management-${language}`}
    >
      <PageTitle title={mt("title")} />

      {/* Core Metrics Section - Redesigned */}
      <ComponentErrorBoundary component="Account management metrics">
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreMetrics.map((metric, index) => (
            <motion.div 
              key={index}
              variants={itemVariants} 
              className="relative group"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              onClick={() => metric.route && navigate(metric.route)}
            >
              <Card className={`border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_20px_rgba(142,45,226,0.20)] transition-all duration-300 cursor-pointer overflow-hidden`}>
                <div className={`absolute top-0 left-0 w-full h-1 bg-${metric.color}-500/70 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center text-white">
                    <span className={`p-2 rounded-md bg-${metric.color}-900/30 mr-3`}>
                      {metric.icon}
                    </span>
                    <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {metric.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {loading ? (
                    <div className="space-y-4 py-2">
                      <Skeleton className="h-6 w-3/4 bg-purple-900/20" />
                      <Skeleton className="h-4 w-full bg-purple-900/20" />
                      <Skeleton className="h-2 w-full bg-purple-900/20" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm text-gray-400">{metric.activeLabel}</p>
                          <p className="text-2xl font-bold text-white">{metric.activeValue}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">{metric.pendingLabel}</p>
                          <p className="text-2xl font-bold text-gray-400">{metric.pendingValue}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">{at("accountManagement.accountActivity")}</span>
                          <span className="text-white">{metric.percent}%</span>
                        </div>
                        <Progress value={metric.percent} className="h-1" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </ComponentErrorBoundary>
      
      <DeferredLoad>
        {/* Activity Section - Adjusted layout to remove VirtualCardsStack */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Recent Activity */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity size={20} className="mr-2 text-purple-400" />
                  {at("accountManagement.accountActivity")}
                </CardTitle>
                <Badge variant="outline" className="bg-charcoal-dark/60">
                  {at("accountManagement.newActivity")}
                </Badge>
              </CardHeader>
              <CardContent>
                {!loading ? (
                  <div className="space-y-1">
                    {recentActivity.map((item, i) => (
                      <ActivityItem key={i} item={item} />
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-3 text-sm text-purple-400 hover:text-purple-300 hover:bg-charcoal-dark/40"
                      onClick={() => navigate('/dashboard/account/activity')}
                    >
                      {at("accountManagement.viewAllActivity")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-start gap-3 animate-pulse">
                        <div className="h-10 w-10 rounded-full bg-purple-900/40"></div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="h-4 w-24 bg-purple-900/40 rounded mb-2"></div>
                            <div className="h-3 w-16 bg-purple-900/40 rounded"></div>
                          </div>
                          <div className="h-3 w-48 bg-purple-900/40 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Cards Related Information */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark h-full">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <CreditCard size={20} className="mr-2 text-green-400" />
                  {at("accountManagement.cardManagement")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-charcoal-dark/50 p-4 rounded-lg border border-purple-900/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">{at("accountManagement.activeCards")}</span>
                    <span className="text-white font-semibold">{mockStats.activeCards}</span>
                  </div>
                  <Progress value={(mockStats.activeCards / (mockStats.activeCards + mockStats.pendingCards)) * 100} className="h-2" />
                </div>
                <Button 
                  variant="outline" 
                  className="w-full bg-charcoal-dark/40 border-purple-900/30 hover:bg-purple-800/50 transition-colors"
                  onClick={() => navigate('/dashboard/cards/search')}
                >
                  {at("accountManagement.viewCards")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Management Sections - Simplified Grid */}
        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-charcoal-dark/50 border border-purple-900/30 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-600/30">
                {at("accountManagement.allSections")}
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-purple-600/30">
                {at("accountManagement.accountSettings")}
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-purple-600/30">
                {at("accountManagement.userManagement")}
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-purple-600/30">
                {at("accountManagement.accountSecurity")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {managementSections.map((section, index) => (
                  <ManagementCard key={index} section={section} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {managementSections.filter(section => 
                  section.title === at("accountManagement.accountSettings") || 
                  section.title === at("accountManagement.accountNotifications")
                ).map((section, index) => (
                  <ManagementCard key={index} section={section} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {managementSections.filter(section => 
                  section.title === at("accountManagement.userManagement")
                ).map((section, index) => (
                  <ManagementCard key={index} section={section} index={index} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {managementSections.filter(section => 
                  section.title === at("accountManagement.accountSecurity")
                ).map((section, index) => (
                  <ManagementCard key={index} section={section} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DeferredLoad>
    </motion.div>
  );
};

export default AccountManagement;
