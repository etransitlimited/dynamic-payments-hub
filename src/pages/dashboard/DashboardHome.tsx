
import React, { useEffect } from "react";
import { CreditCard, User, Wallet, Store, TrendingUp, Zap } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { formatUSD } from "@/utils/currencyUtils";
import StatCard from "./components/StatCard";
import RecentActivities from "./components/RecentActivities";
import QuickActions from "./components/QuickActions";
import PageHeader from "./components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Progress } from "@/components/ui/progress";
import GradientOverlay from "@/components/particles/GradientOverlay";
import ParticlesLayer from "@/components/particles/ParticlesLayer";

const DashboardHome = () => {
  const { t, language } = useSafeTranslation();
  
  // Set document title based on current language
  useEffect(() => {
    document.title = t("dashboard.title");
  }, [language, t]);
  
  // Use different data based on language
  const recentActivities = [
    { 
      type: "dashboard.activity.deposit", 
      amount: formatUSD(1000), 
      date: "2023-12-15 14:30", 
      status: "dashboard.status.completed" 
    },
    { 
      type: "dashboard.activity.applyCard", 
      amount: "-", 
      date: "2023-12-10 09:45", 
      status: "dashboard.status.pending" 
    },
    { 
      type: "dashboard.activity.inviteUser", 
      amount: "+50 " + t("dashboard.points"), 
      date: "2023-12-05 16:20", 
      status: "dashboard.status.completed" 
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-dark"></div>
        <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-600/8 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-purple-800/8 rounded-full blur-3xl animate-pulse-subtle opacity-70"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-3xl animate-pulse-subtle opacity-50"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-neon-green/8 rounded-full blur-3xl"></div>
        <GradientOverlay />
        <ParticlesLayer />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto p-6 relative z-10"
      >
        <motion.div variants={item} className="mb-6">
          <Card className="border-purple-900/30 bg-gradient-to-br from-charcoal-light/50 to-charcoal-dark/50 backdrop-blur-md overflow-hidden shadow-lg relative group transition-all duration-300 hover:shadow-[0_0_30px_rgba(142,45,226,0.25)]">
            <div className="absolute inset-0 bg-grid-white/[0.03] [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-neon-green to-purple-600"></div>
            <CardContent className="p-6 relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    <TranslatedText keyName="dashboard.title" fallback="Dashboard" />
                  </h1>
                  <p className="text-blue-300 mt-2">
                    <TranslatedText keyName="dashboard.welcomeMessage" values={{ username: "Admin" }} fallback="Welcome back, Admin!" />
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="mt-4 w-full md:w-80">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">
                        <TranslatedText keyName="dashboard.systemLoad" fallback="System Health" />
                      </span>
                      <span className="text-neon-green">92%</span>
                    </div>
                    <Progress value={92} className="h-1.5 sm:h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-purple-300 bg-purple-900/30 rounded-full px-3 py-1 flex items-center border border-purple-800/30">
                    <span className="inline-block w-2 h-2 rounded-full bg-neon-green mr-2 animate-pulse"></span>
                    <TranslatedText keyName="dashboard.realTimeUpdates" fallback="Real-time updates" />
                  </span>
                  <div className="h-8 w-8 rounded-full bg-neon-green/10 flex items-center justify-center">
                    <Zap size={16} className="text-neon-green" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title={<TranslatedText keyName="dashboard.totalBalance" fallback="Total Balance" />}
            value={formatUSD(45231.89)}
            change="+20.1%"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<Wallet className="h-4 w-4 text-blue-400" />}
            className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30"
            iconClassName="bg-blue-500/20"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.activeCards" fallback="Active Cards" />}
            value="+2,350"
            change="+180.1%"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<CreditCard className="h-4 w-4 text-purple-400" />}
            className="bg-gradient-to-br from-purple-900/90 to-purple-950/90 border-purple-800/30"
            iconClassName="bg-purple-500/20"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.merchantCount" fallback="Merchant Count" />}
            value="+12,234"
            change="+19%"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<Store className="h-4 w-4 text-yellow-400" />}
            className="bg-gradient-to-br from-yellow-900/90 to-yellow-950/90 border-yellow-800/30"
            iconClassName="bg-yellow-500/20"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.invitedUsers" fallback="Invited Users" />}
            value="+573"
            change="+201"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<User className="h-4 w-4 text-green-400" />}
            className="bg-gradient-to-br from-green-900/90 to-green-950/90 border-green-800/30"
            iconClassName="bg-green-500/20"
          />
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentActivities 
              title={<TranslatedText keyName="dashboard.recentActivities" fallback="Recent Activities" />}
              description={<TranslatedText keyName="dashboard.last30DaysActivities" fallback="Last 30 days system activity records" />}
              activities={recentActivities}
              noActivitiesText={<TranslatedText keyName="dashboard.noRecentActivities" fallback="No recent activities" />}
            />
          </div>
          
          <div>
            <QuickActions 
              title={<TranslatedText keyName="dashboard.quickActions" fallback="Quick Actions" />}
              depositText={<TranslatedText keyName="dashboard.activity.deposit" fallback="Deposit" />}
              applyCardText={<TranslatedText keyName="dashboard.activity.applyCard" fallback="Apply Card" />}
              inviteFriendsText={<TranslatedText keyName="dashboard.inviteFriends" fallback="Invite Friends" />}
              noticeTitle={<TranslatedText keyName="dashboard.importantNotice" fallback="Important Notice" />}
              noticeText={<TranslatedText keyName="dashboard.systemMaintenanceNotice" fallback="System will undergo maintenance from 22:00 to 02:00 on December 25, 2023. Some features may be unavailable during this time." />}
            />
          </div>
        </motion.div>
      </motion.div>
      
      <style>
        {`
        @keyframes pulse-subtle {
          0% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
};

export default DashboardHome;
