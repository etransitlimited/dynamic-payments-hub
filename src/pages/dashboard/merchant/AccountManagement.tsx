
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Users, Shield, CreditCard, Wallet, ArrowUpRight, Zap, Award } from "lucide-react";
import PageTitle from "../cards/components/PageTitle";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import TranslatedText from "@/components/translation/TranslatedText";
import { motion } from "framer-motion";

const AccountManagement = () => {
  const { t } = useLanguage();

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

  // Radial progress component
  const RadialProgress = ({ value, label, icon: Icon, className = "" }: { value: number, label: string, icon: React.ElementType, className?: string }) => (
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
        <PageTitle title={<TranslatedText keyName="accountManagement.title" fallback="Account Management" />} />
      </motion.div>
      
      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark border-purple-900/20 shadow-lg shadow-purple-900/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardContent className="pt-6 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <RadialProgress 
                value={72} 
                label={<TranslatedText keyName="accountManagement.activeUsers" fallback="Active Users" />} 
                icon={Users} 
              />
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">245</span>
                <span className="text-xs text-purple-300/70">
                  <TranslatedText keyName="accountManagement.totalUsers" fallback="Total Users" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark border-purple-900/20 shadow-lg shadow-purple-900/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardContent className="pt-6 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <RadialProgress 
                value={85} 
                label={<TranslatedText keyName="accountManagement.adminRoles" fallback="Admin Roles" />}
                icon={Shield} 
              />
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">17</span>
                <span className="text-xs text-purple-300/70">
                  <TranslatedText keyName="accountManagement.totalRoles" fallback="Total Roles" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark border-purple-900/20 shadow-lg shadow-purple-900/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardContent className="pt-6 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <RadialProgress 
                value={63} 
                label={<TranslatedText keyName="cards.search.activeCards" fallback="Active Cards" />}
                icon={CreditCard} 
              />
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">138</span>
                <span className="text-xs text-purple-300/70">
                  <TranslatedText keyName="cards.search.totalCards" fallback="Total Cards" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-charcoal-light/80 to-charcoal-dark border-purple-900/20 shadow-lg shadow-purple-900/5 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardContent className="pt-6 pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <RadialProgress 
                value={92} 
                label={<TranslatedText keyName="accountManagement.depositCompletion" fallback="Completion" />}
                icon={Wallet} 
              />
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">$25,845</span>
                <span className="text-xs text-purple-300/70">
                  <TranslatedText keyName="accountManagement.totalDeposits" fallback="Total Deposits" />
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Management Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Users size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountManagement.userManagement" fallback="User Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountManagement.userManagementDesc" fallback="Manage user accounts and access levels" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.activeUsers" fallback="Active Users" /></span>
                  <span className="font-medium">245/277</span>
                </div>
                <Progress value={88} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.inactiveUsers" fallback="Inactive Users" /></span>
                  <span className="font-medium">32/277</span>
                </div>
                <Progress value={12} className="h-2" indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.newUsers" fallback="New Users" /></span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-sm">18</span>
                    <span className="ml-2 bg-green-500/20 text-green-300 text-xs py-0.5 px-1.5 rounded">+12%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.premiumUsers" fallback="Premium Users" /></span>
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
              <Link to="/dashboard/merchant/account-roles" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountManagement.manageUsers" fallback="Manage Users" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Shield size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountManagement.rolePermissions" fallback="Role Permissions" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountManagement.rolePermissionsDesc" fallback="Configure access controls and permissions" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.adminRoles" fallback="Admin Roles" /></span>
                  <span className="font-medium">5/17</span>
                </div>
                <Progress value={29} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.editorRoles" fallback="Editor Roles" /></span>
                  <span className="font-medium">12/17</span>
                </div>
                <Progress value={71} className="h-2" indicatorClassName="bg-gradient-to-r from-purple-400 to-purple-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.customRoles" fallback="Custom Roles" /></span>
                  </div>
                  <span className="font-bold text-sm">8</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.permissionGroups" fallback="Permission Groups" /></span>
                  </div>
                  <span className="font-bold text-sm">14</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/merchant/account-roles" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountManagement.manageRoles" fallback="Manage Roles" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <CreditCard size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountManagement.cardManagement" fallback="Card Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountManagement.cardManagementDesc" fallback="Manage card issuance and activation" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="cards.search.activeCards" fallback="Active Cards" /></span>
                  <span className="font-medium">138/165</span>
                </div>
                <Progress value={84} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="cards.search.pendingCards" fallback="Pending Cards" /></span>
                  <span className="font-medium">27/165</span>
                </div>
                <Progress value={16} className="h-2" indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="cards.apply.cardTypeCredit" fallback="Credit Cards" /></span>
                  </div>
                  <span className="font-bold text-sm">94</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="cards.apply.cardTypeDebit" fallback="Debit Cards" /></span>
                  </div>
                  <span className="font-bold text-sm">71</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/cards/search" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountManagement.viewCards" fallback="View Cards" /></span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-[#2E1065]/90 to-[#3A0080]/90 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(142,45,226,0.15)] transition-all duration-300 overflow-hidden group h-full">
          <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-purple-500/20 p-2.5 rounded-lg">
                <Wallet size={18} className="text-purple-300" />
              </span>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <TranslatedText keyName="accountManagement.depositManagement" fallback="Deposit Management" />
              </CardTitle>
            </div>
            <CardDescription className="text-purple-200/80">
              <TranslatedText keyName="accountManagement.depositManagementDesc" fallback="Track and manage deposits" />
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10 pt-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.processedDeposits" fallback="Processed Deposits" /></span>
                  <span className="font-medium">$25,845/$29,085</span>
                </div>
                <Progress value={89} className="h-2" indicatorClassName="bg-gradient-to-r from-green-400 to-emerald-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-purple-200/90">
                  <span><TranslatedText keyName="accountManagement.pendingDeposits" fallback="Pending Deposits" /></span>
                  <span className="font-medium">$3,240/$29,085</span>
                </div>
                <Progress value={11} className="h-2" indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-500" />
              </div>
              
              <div className="flex flex-col space-y-3 mt-4">
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.thisMonth" fallback="This Month" /></span>
                  </div>
                  <span className="font-bold text-sm">$8,240</span>
                </div>
                
                <div className="flex items-center justify-between py-3 px-4 rounded-md bg-purple-900/30 border border-purple-600/20 group-hover:border-purple-600/30 transition-colors text-white">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm"><TranslatedText keyName="accountManagement.lastMonth" fallback="Last Month" /></span>
                  </div>
                  <span className="font-bold text-sm">$7,680</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="relative z-10 pt-2">
            <Button asChild variant="outline" className="w-full border-purple-600/60 text-white hover:bg-purple-900/50 transition-colors">
              <Link to="/dashboard/wallet/deposit-records" className="flex items-center justify-center">
                <span><TranslatedText keyName="accountManagement.viewDeposits" fallback="View Deposits" /></span>
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
