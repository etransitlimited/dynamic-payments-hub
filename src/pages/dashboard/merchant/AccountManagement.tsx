
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

  const renderStatCard = (
    icon: React.ReactNode, 
    title: string, 
    value: number | string,
    subValue?: string,
    subLabel?: string,
    color: string = "blue"
  ) => (
    <motion.div variants={itemVariants} className="relative group">
      <Card className={`border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_20px_rgba(142,45,226,0.25)] transition-all duration-300 overflow-hidden`}>
        {/* Animated top border */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-${color}-500/70 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
        
        {/* Subtle glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>
        
        <CardContent className="p-6 relative z-10">
          {loading ? (
            <StatCardSkeleton />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className={`p-2 rounded-md bg-${color}-900/30 text-${color}-500`}>
                  {icon}
                </div>
                {subValue && (
                  <span className={`text-xs font-medium ${subValue.includes('-') ? 'text-red-400' : 'text-green-400'} px-2 py-1 rounded-full bg-charcoal-dark/60`}>
                    {subValue} 
                    {subLabel && <span className="text-gray-400 ml-1">{subLabel}</span>}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{value}</h3>
                <p className="text-sm text-gray-400">{title}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  // Define management section cards data
  const managementSections = [
    {
      icon: <Grid size={24} className="text-blue-400" />,
      title: at("accountManagement.accountOverview"),
      description: at("accountManagement.accountSettingsDesc"),
      color: "blue",
      route: "/dashboard/account/overview"
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
        {/* Animated top border */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-${section.color}-500/70 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100`}></div>
        
        {/* Subtle grid pattern */}
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
          
          {/* Subtle corner decoration */}
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

  // Summary section data
  const summaryItems = [
    { title: at("accountManagement.userManagement"), value: `${mockStats.activeUsers + mockStats.inactiveUsers}`, icon: <Users size={18} className="text-blue-400" /> },
    { title: at("accountManagement.cardManagement"), value: `${mockStats.activeCards + mockStats.pendingCards}`, icon: <CreditCard size={18} className="text-green-400" /> },
    { title: at("accountRoles.permissionSettings"), value: `${mockStats.adminRoles}`, icon: <Lock size={18} className="text-amber-400" /> },
    { title: at("accountManagement.depositCompletion"), value: `${mockStats.depositCompletion}%`, icon: <DollarSign size={18} className="text-purple-400" /> },
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

      <ComponentErrorBoundary component="Account management grid">
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {renderStatCard(
            <Users size={24} />, 
            at("accountManagement.activeUsers"), 
            mockStats.activeUsers, 
            "+12%", 
            mt("comparedToLastWeek"),
            "green"
          )}
          
          {renderStatCard(
            <Users size={24} />, 
            at("accountManagement.inactiveUsers"), 
            mockStats.inactiveUsers, 
            "-5%", 
            mt("comparedToLastWeek"),
            "red"
          )}
          
          {renderStatCard(
            <Award size={24} />, 
            at("accountManagement.adminRoles"), 
            mockStats.adminRoles,
            undefined,
            undefined,
            "amber"
          )}
          
          {renderStatCard(
            <CreditCard size={24} />, 
            at("accountManagement.activeCards"), 
            mockStats.activeCards,
            "+8%",
            mt("comparedToLastMonth"),
            "blue"
          )}
          
          {renderStatCard(
            <Clock size={24} />, 
            at("accountManagement.pendingCards"), 
            mockStats.pendingCards,
            "-2%",
            mt("comparedToLastMonth"),
            "purple"
          )}
          
          {renderStatCard(
            <Activity size={24} />, 
            at("accountManagement.depositCompletion"), 
            `${mockStats.depositCompletion}%`,
            "+5%",
            mt("comparedToLastMonth"),
            "cyan"
          )}
        </motion.div>
      </ComponentErrorBoundary>
      
      <DeferredLoad>
        {/* Quick Access Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Left Column: Summary Card */}
          <motion.div variants={itemVariants} className="col-span-1">
            <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark h-full">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center">
                  <Grid size={20} className="mr-2 text-blue-400" />
                  {at("accountManagement.accountOverview")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!loading ? (
                  <div className="space-y-3">
                    {summaryItems.map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 bg-charcoal-dark/60 p-1.5 rounded-full">
                            {item.icon}
                          </div>
                          <span className="text-sm text-gray-300">{item.title}</span>
                        </div>
                        <div className="font-semibold text-white">{item.value}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="flex items-center justify-between animate-pulse">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-purple-900/40 mr-2"></div>
                          <div className="h-4 w-24 bg-purple-900/40 rounded"></div>
                        </div>
                        <div className="h-4 w-8 bg-purple-900/40 rounded"></div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full bg-charcoal-dark/40 border-purple-900/30 hover:bg-purple-900/20 text-white"
                    onClick={() => navigate('/dashboard/account/overview')}
                  >
                    {at("accountManagement.viewDetails")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Middle/Right Columns: Recent Activity */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
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
        </motion.div>

        {/* Main Management Sections */}
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
              <TabsTrigger value="cards" className="data-[state=active]:bg-purple-600/30">
                {at("accountManagement.cardManagement")}
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
                  section.title === at("accountManagement.accountOverview") || 
                  section.title === at("accountManagement.accountSecurity") ||
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
            
            <TabsContent value="cards" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {managementSections.filter(section => 
                  section.title === at("accountManagement.cardManagement")
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
