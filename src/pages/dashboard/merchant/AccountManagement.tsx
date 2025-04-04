
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, PieChart, Activity, Users, Award, CreditCard, Clock, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import PageTitle from "./components/PageTitle";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useManagementTranslation } from "./hooks/useManagementTranslation";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { DeferredLoad } from "@/utils/progressive-loading";

const AccountManagement = () => {
  const { t: mt, language } = useManagementTranslation();
  const { t: at } = useSafeTranslation();
  const [loading, setLoading] = useState(true);

  // Mock data for the dashboard
  const [mockStats] = useState({
    activeUsers: 145,
    inactiveUsers: 28, 
    adminRoles: 5,
    activeCards: 67,
    pendingCards: 12,
    depositCompletion: 87
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
      description: "",
      color: "blue"
    },
    {
      icon: <CreditCard size={24} className="text-green-400" />,
      title: at("accountManagement.cardManagement"),
      description: at("accountManagement.cardManagementDesc"),
      color: "green"
    },
    {
      icon: <Users size={24} className="text-amber-400" />,
      title: at("accountManagement.userManagement"),
      description: at("accountManagement.userManagementDesc"),
      color: "amber"
    },
    {
      icon: <DollarSign size={24} className="text-purple-400" />,
      title: at("accountManagement.depositManagement"),
      description: at("accountManagement.depositManagementDesc"),
      color: "purple"
    },
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
      </Card>
    </motion.div>
  );

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementSections.map((section, index) => (
            <ManagementCard key={index} section={section} index={index} />
          ))}
        </div>
      </DeferredLoad>
    </motion.div>
  );
};

export default AccountManagement;
