
import React from "react";
import { CreditCard, User, Wallet, Store } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import StatCard from "./components/StatCard";
import RecentActivities from "./components/RecentActivities";
import QuickActions from "./components/QuickActions";
import PageHeader from "./components/PageHeader";

const DashboardHome = () => {
  const { t, language } = useLanguage();
  
  // Use different data based on language
  const recentActivities = [
    { 
      type: language.startsWith('zh') ? "充值" : t("dashboard.activity.deposit"), 
      amount: "$1,000.00", 
      date: "2023-12-15 14:30", 
      status: language.startsWith('zh') ? "已完成" : t("dashboard.status.completed") 
    },
    { 
      type: language.startsWith('zh') ? "申请卡片" : t("dashboard.activity.applyCard"), 
      amount: "-", 
      date: "2023-12-10 09:45", 
      status: language.startsWith('zh') ? "审核中" : t("dashboard.status.pending") 
    },
    { 
      type: language.startsWith('zh') ? "邀请用户" : t("dashboard.activity.inviteUser"), 
      amount: "+50" + (language.startsWith('zh') ? "积分" : t("dashboard.points")), 
      date: "2023-12-05 16:20", 
      status: language.startsWith('zh') ? "已完成" : t("dashboard.status.completed") 
    },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <PageHeader title={t("sidebar.dashboard")} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title={t("dashboard.totalBalance")}
          value="$45,231.89"
          change="+20.1%"
          compareText={t("dashboard.comparedToLastMonth")}
          icon={<Wallet className="h-4 w-4 text-blue-400" />}
          className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30"
          iconClassName="bg-blue-500/20"
        />
        
        <StatCard 
          title={t("dashboard.activeCards")}
          value="+2,350"
          change="+180.1%"
          compareText={t("dashboard.comparedToLastMonth")}
          icon={<CreditCard className="h-4 w-4 text-purple-400" />}
          className="bg-gradient-to-br from-purple-900/90 to-purple-950/90 border-purple-800/30"
          iconClassName="bg-purple-500/20"
        />
        
        <StatCard 
          title={t("dashboard.merchantCount")}
          value="+12,234"
          change="+19%"
          compareText={t("dashboard.comparedToLastMonth")}
          icon={<Store className="h-4 w-4 text-yellow-400" />}
          className="bg-gradient-to-br from-yellow-900/90 to-yellow-950/90 border-yellow-800/30"
          iconClassName="bg-yellow-500/20"
        />
        
        <StatCard 
          title={t("dashboard.invitedUsers")}
          value="+573"
          change="+201"
          compareText={t("dashboard.comparedToLastMonth")}
          icon={<User className="h-4 w-4 text-green-400" />}
          className="bg-gradient-to-br from-green-900/90 to-green-950/90 border-green-800/30"
          iconClassName="bg-green-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivities 
          title={t("dashboard.recentActivities")}
          description={t("dashboard.last30DaysActivities")}
          activities={recentActivities}
          noActivitiesText={t("dashboard.noRecentActivities")}
          depositText={language.startsWith('zh') ? "充值" : t("dashboard.activity.deposit")}
          applyCardText={language.startsWith('zh') ? "申请卡片" : t("dashboard.activity.applyCard")}
          inviteUserText={language.startsWith('zh') ? "邀请用户" : t("dashboard.activity.inviteUser")}
          completedText={language.startsWith('zh') ? "已完成" : t("dashboard.status.completed")}
          pendingText={language.startsWith('zh') ? "审核中" : t("dashboard.status.pending")}
        />
        
        <QuickActions 
          title={t("dashboard.quickActions")}
          depositText={t("sidebar.wallet.deposit")}
          applyCardText={t("sidebar.cards.apply")}
          inviteFriendsText={t("dashboard.inviteFriends")}
          noticeTitle={t("dashboard.importantNotice")}
          noticeText={t("dashboard.systemMaintenanceNotice")}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
