
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, Shield, CreditCard, Wallet, ArrowUpRight, Zap, Award } from "lucide-react";
import PageTitle from "./components/PageTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

const AccountManagement = () => {
  const { t } = useSafeTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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

  // Radial progress component with fixed type issue
  const RadialProgress = ({ 
    value, 
    label, 
    icon: Icon, 
    className = "" 
  }: { 
    value: number, 
    label: React.ReactNode,
    icon: React.ElementType, 
    className?: string 
  }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div 
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(from 0deg, rgba(139, 92, 246, 0.8) ${value}%, rgba(139, 92, 246, 0.2) 0%)`
        }}
      >
        <div className="absolute inset-[3px] rounded-full bg-charcoal-dark/80 flex items-center justify-center">
          <div className="text-center">
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100">
              {value}%
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Icon size={48} className="text-neon-green" />
      </div>
      <div className="mt-2 absolute -bottom-7 text-center text-xs text-purple-300/80 font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-6 space-y-6"
    >
      <motion.div variants={itemVariants}>
        <PageTitle title="accountManagement.title" />
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title={<TranslatedText keyName="wallet.overview.activeUsers" fallback="Active Users" />}
          value="245"
          change="+12%"
          compareText={<TranslatedText keyName="common.comparedToLastWeek" fallback="Compared to Last Week" />}
          icon={<Users className="h-5 w-5 text-purple-300" />}
          className="bg-gradient-to-br from-purple-900/40 to-purple-950/60"
          iconClassName="bg-purple-800/30"
        />
        
        <StatCard
          title={<TranslatedText keyName="common.adminRoles" fallback="Admin Roles" />}
          value="17"
          change="+5%"
          compareText={<TranslatedText keyName="common.comparedToLastMonth" fallback="Compared to Last Month" />}
          icon={<Shield className="h-5 w-5 text-purple-300" />}
          className="bg-gradient-to-br from-purple-900/40 to-purple-950/60"
          iconClassName="bg-purple-800/30"
        />
        
        <StatCard
          title={<TranslatedText keyName="common.activeCards" fallback="Active Cards" />}
          value="138"
          change="+8%"
          compareText={<TranslatedText keyName="common.comparedToLastWeek" fallback="Compared to Last Week" />}
          icon={<CreditCard className="h-5 w-5 text-purple-300" />}
          className="bg-gradient-to-br from-purple-900/40 to-purple-950/60"
          iconClassName="bg-purple-800/30"
        />
        
        <StatCard
          title={<TranslatedText keyName="common.depositCompletion" fallback="Deposit Completion" />}
          value="$25,845"
          change="+15%"
          compareText={<TranslatedText keyName="common.comparedToLastMonth" fallback="Compared to Last Month" />}
          icon={<Wallet className="h-5 w-5 text-purple-300" />}
          className="bg-gradient-to-br from-purple-900/40 to-purple-950/60"
          iconClassName="bg-purple-800/30"
        />
      </motion.div>
      
      {/* Management Cards - Enhanced design */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Users size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountRoles.userManagement" fallback="User Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountRoles.userManagementDesc" fallback="Manage user accounts and access levels" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.activeUsersCount" fallback="Active Users" /></span>
                  <span className="font-medium">245/277</span>
                </div>
                <Progress value={88} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.inactiveUsersCount" fallback="Inactive Users" /></span>
                  <span className="font-medium">32/277</span>
                </div>
                <Progress value={12} className="h-2" indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.newUsers" fallback="New Users" /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-sm">18</span>
                    <span className="ml-2 bg-green-500/20 text-green-300 text-xs py-0.5 px-1.5 rounded">+12%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.premiumUsers" fallback="Premium Users" /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-sm">124</span>
                    <span className="ml-2 bg-green-500/20 text-green-300 text-xs py-0.5 px-1.5 rounded">+5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/account/roles" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountRoles.manageUsers" fallback="Manage Users" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Shield size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountRoles.roleManagement" fallback="Role Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountRoles.roleManagementDesc" fallback="Manage roles and permissions" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.adminRole" fallback="Admin Role" /></span>
                  <span className="font-medium">5/17</span>
                </div>
                <Progress value={29} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.staffRole" fallback="Staff Role" /></span>
                  <span className="font-medium">12/17</span>
                </div>
                <Progress value={71} className="h-2" indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.userManagement" fallback="User Management" /></span>
                  </div>
                  <span className="font-bold text-sm">8</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.permissionSettings" fallback="Permission Settings" /></span>
                  </div>
                  <span className="font-bold text-sm">14</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/account/roles" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountRoles.roleManagement" fallback="Role Management" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <CreditCard size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountRoles.cardManagement" fallback="Card Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountRoles.cardManagementDesc" fallback="Manage card accounts and settings" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.activeCards" fallback="Active Cards" /></span>
                  <span className="font-medium">138/165</span>
                </div>
                <Progress value={84} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.pendingCards" fallback="Pending Cards" /></span>
                  <span className="font-medium">27/165</span>
                </div>
                <Progress value={16} className="h-2" indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.creditCards" fallback="Credit Cards" /></span>
                  </div>
                  <span className="font-bold text-sm">94</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.debitCards" fallback="Debit Cards" /></span>
                  </div>
                  <span className="font-bold text-sm">71</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/cards/search" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountRoles.viewCards" fallback="View Cards" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Wallet size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountRoles.depositManagement" fallback="Deposit Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountRoles.walletManagementDesc" fallback="Manage deposits and withdrawals" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.processedDeposits" fallback="Processed Deposits" /></span>
                  <span className="font-medium">$25,845/$29,085</span>
                </div>
                <Progress value={89} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountRoles.pendingDeposits" fallback="Pending Deposits" /></span>
                  <span className="font-medium">$3,240/$29,085</span>
                </div>
                <Progress value={11} className="h-2" indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.thisMonth" fallback="This Month" /></span>
                  </div>
                  <span className="font-bold text-sm">$8,240</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountRoles.lastMonth" fallback="Last Month" /></span>
                  </div>
                  <span className="font-bold text-sm">$7,680</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/wallet/deposit-records" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountRoles.viewDeposits" fallback="View Deposits" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AccountManagement;
