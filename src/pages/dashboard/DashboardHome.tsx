
import React, { useEffect, useRef, useMemo } from "react";
import { CreditCard, User, Wallet, Store, TrendingUp, Zap, ArrowRight, BarChart3, Coins } from "lucide-react";
import { useSafeTranslation } from "@/hooks/use-safe-translation";
import { formatUSD } from "@/utils/currencyUtils";
import StatCard from "./components/StatCard";
import RecentActivities from "./components/RecentActivities";
import QuickActions from "./components/QuickActions";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import TranslatedText from "@/components/translation/TranslatedText";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { LanguageCode } from "@/utils/languageUtils";
import { useAuth } from "@/hooks/use-auth";

const DashboardHome = () => {
  const { t, language, refreshCounter } = useSafeTranslation();
  const { user } = useAuth();
  const languageRef = useRef<LanguageCode>(language as LanguageCode);
  const pageRef = useRef<HTMLDivElement>(null);
  const isInitialMountRef = useRef(true);
  const pageKey = useRef(`dashboard-home-${Math.random().toString(36).substring(2, 9)}`);
  
  useEffect(() => {
    document.title = t("dashboard.title");
    
    if (language !== languageRef.current) {
      languageRef.current = language as LanguageCode;
      
      if (pageRef.current) {
        pageRef.current.setAttribute('data-language', language);
        
        if (!isInitialMountRef.current) {
          pageRef.current.setAttribute('data-refresh', Date.now().toString());
          pageKey.current = `dashboard-home-${language}-${Date.now()}`;
        }
      }
    }
    isInitialMountRef.current = false;
  }, [language, t, refreshCounter]);

  useEffect(() => {
    const handleLanguageChange = (e: CustomEvent) => {
      const { language: newLanguage } = e.detail;
      if (newLanguage && newLanguage !== languageRef.current) {
        languageRef.current = newLanguage as LanguageCode;
        
        if (pageRef.current) {
          pageRef.current.setAttribute('data-language', newLanguage as LanguageCode);
          pageRef.current.setAttribute('data-refresh', Date.now().toString());
          pageKey.current = `dashboard-home-${newLanguage}-${Date.now()}`;
        }
      }
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    document.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
      document.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const featureLinks = useMemo(() => [
    {
      title: t("dashboard.quickAccess.transactions"),
      path: "/dashboard/transactions",
      icon: <Coins className="h-4 w-4 text-purple-400" />,
      description: t("dashboard.quickAccess.transactionsDescription"),
      color: "bg-gradient-to-br from-purple-900/20 to-purple-950/30"
    },
    {
      title: t("dashboard.quickAccess.analytics"),
      path: "/dashboard/analytics",
      icon: <BarChart3 className="h-4 w-4 text-blue-400" />,
      description: t("dashboard.quickAccess.analyticsDescription"),
      color: "bg-gradient-to-br from-blue-900/20 to-blue-950/30"
    },
    {
      title: t("dashboard.quickAccess.cards"),
      path: "/dashboard/cards/search",
      icon: <CreditCard className="h-4 w-4 text-emerald-400" />,
      description: t("dashboard.quickAccess.cardsDescription"),
      color: "bg-gradient-to-br from-emerald-900/20 to-emerald-950/30"
    }
  ], [t, language, refreshCounter]);
  
  const recentActivities = useMemo(() => [
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
  ], [t]);

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
    <div className="relative min-h-screen" ref={pageRef} data-language={languageRef.current} key={pageKey.current}>
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
                    <TranslatedText 
                      keyName="dashboard.welcomeMessage" 
                      values={{ username: user?.username || user?.name || 'User' }} 
                      fallback={`Welcome back, ${user?.username || user?.name || 'User'}!`} 
                    />
                  </p>
                  
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
            className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 hover:shadow-[0_5px_20px_-5px_rgba(59,130,246,0.5)] transition-shadow duration-300"
            iconClassName="bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.activeCards" fallback="Active Cards" />}
            value="+2,350"
            change="+180.1%"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<CreditCard className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />}
            className="bg-gradient-to-br from-purple-900/90 to-purple-950/90 border-purple-800/30 hover:shadow-[0_5px_20px_-5px_rgba(147,51,234,0.5)] transition-shadow duration-300"
            iconClassName="bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.merchantCount" fallback="Merchant Count" />}
            value="+12,234"
            change="+19%"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<Store className="h-4 w-4 text-yellow-400 group-hover:text-yellow-300 transition-colors" />}
            className="bg-gradient-to-br from-yellow-900/90 to-yellow-950/90 border-yellow-800/30 hover:shadow-[0_5px_20px_-5px_rgba(202,138,4,0.5)] transition-shadow duration-300"
            iconClassName="bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors"
          />
          
          <StatCard 
            title={<TranslatedText keyName="dashboard.invitedUsers" fallback="Invited Users" />}
            value="+573"
            change="+201"
            compareText={<TranslatedText keyName="dashboard.comparedToLastMonth" fallback="compared to last month" />}
            icon={<User className="h-4 w-4 text-green-400 group-hover:text-green-300 transition-colors" />}
            className="bg-gradient-to-br from-green-900/90 to-green-950/90 border-green-800/30 hover:shadow-[0_5px_20px_-5px_rgba(34,197,94,0.5)] transition-shadow duration-300"
            iconClassName="bg-green-500/20 group-hover:bg-green-500/30 transition-colors"
          />
        </motion.div>

        <motion.div variants={item} className="mb-6">
          <h2 className="text-lg font-medium text-white mb-4">
            <TranslatedText keyName="dashboard.featureLinks" fallback="Feature Quick Links" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featureLinks.map((link, index) => (
              <Link 
                key={`feature-link-${index}-${refreshCounter}`} 
                to={link.path}
                className={`${link.color} border border-purple-900/30 rounded-xl p-4 hover:border-purple-500/50 transition-colors group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 p-2 bg-charcoal-dark/50 rounded-md border border-purple-900/20">
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">{link.title}</h3>
                      <p className="text-xs text-gray-400 mt-1">{link.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
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
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
