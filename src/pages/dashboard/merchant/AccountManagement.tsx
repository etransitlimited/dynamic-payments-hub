import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Grid, PieChart, Activity, Users, Award, CreditCard, Clock, DollarSign, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import PageTitle from "./components/PageTitle";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useManagementTranslation } from "./hooks/useManagementTranslation";

const AccountManagement = () => {
  const { t, language } = useManagementTranslation();
  const [loading, setLoading] = useState(true);

  // Mock data for the dashboard
  const [mockStats] = useState({
    activeUsers: 145,
    inactiveUsers: 28, // Added inactive users count
    adminRoles: 5,
    activeCards: 67,
    pendingCards: 12,
    depositCompletion: 87
  });

  // Simulate loading state
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

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

  const renderStatCard = (
    icon: React.ReactNode, 
    title: string, 
    value: number | string,
    subValue?: string,
    subLabel?: string,
    color: string = "blue"
  ) => (
    <motion.div variants={itemVariants}>
      <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300">
        <CardContent className="p-6">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-purple-900/50"></div>
                <div className="h-4 w-20 bg-purple-900/50 rounded"></div>
              </div>
              <div className="h-7 bg-purple-900/50 w-20 rounded mb-2"></div>
              <div className="h-4 bg-purple-900/50 w-32 rounded"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className={`p-2 rounded-md bg-${color}-900/30 text-${color}-500`}>
                  {icon}
                </div>
                {subValue && (
                  <span className={`text-xs text-${color}-500`}>
                    {subValue} 
                    {subLabel && <span className="text-gray-400 ml-1">{subLabel}</span>}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold text-white">{value}</h3>
                <p className="text-sm text-gray-400">{title}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
      key={`account-management-${language}`} // Force re-render on language change
    >
      <PageTitle title={t("title")} />

      <ComponentErrorBoundary component="Account management grid">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {renderStatCard(
            <Users size={24} />, 
            t("activeUsers"), 
            mockStats.activeUsers, 
            "+12%", 
            t("comparedToLastWeek"),
            "green"
          )}
          
          {renderStatCard(
            <Users size={24} />, 
            t("inactiveUsers"), 
            mockStats.inactiveUsers, 
            "-5%", 
            t("comparedToLastWeek"),
            "red"
          )}
          
          {renderStatCard(
            <Award size={24} />, 
            t("adminRoles"), 
            mockStats.adminRoles,
            undefined,
            undefined,
            "amber"
          )}
          
          {renderStatCard(
            <CreditCard size={24} />, 
            t("activeCards"), 
            mockStats.activeCards,
            "+8%",
            t("comparedToLastMonth"),
            "blue"
          )}
          
          {renderStatCard(
            <Clock size={24} />, 
            t("pendingCards"), 
            mockStats.pendingCards,
            "-2%",
            t("comparedToLastMonth"),
            "purple"
          )}
          
          {renderStatCard(
            <Activity size={24} />, 
            t("depositCompletion"), 
            `${mockStats.depositCompletion}%`,
            "+5%",
            t("comparedToLastMonth"),
            "cyan"
          )}
        </div>
      </ComponentErrorBoundary>
      
      {/* Other sections will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Account management sections */}
        {[
          {
            icon: <Grid size={24} className="text-blue-400" />,
            title: t("accountOverview"),
            description: "",
            color: "blue"
          },
          {
            icon: <CreditCard size={24} className="text-green-400" />,
            title: t("cardManagement"),
            description: t("cardManagementDesc"),
            color: "green"
          },
          {
            icon: <Users size={24} className="text-amber-400" />,
            title: t("userManagement"),
            description: t("userManagementDesc"),
            color: "amber"
          },
          {
            icon: <DollarSign size={24} className="text-purple-400" />,
            title: t("depositManagement"),
            description: t("depositManagementDesc"),
            color: "purple"
          },
        ].map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className={`border-purple-900/30 bg-gradient-to-br from-charcoal-light to-charcoal-dark hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] hover:border-${section.color}-700/40 transition-all duration-300 cursor-pointer h-full`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-white">
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{section.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AccountManagement;
