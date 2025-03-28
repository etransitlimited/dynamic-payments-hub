
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, User, Wallet, Store, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

const DashboardHome = () => {
  const { t, language } = useLanguage();
  
  // Use different data based on language
  const recentActivities = [
    { 
      type: language.startsWith('zh') ? "充值" : t("dashboard.activity.deposit"), 
      amount: "¥1,000.00", 
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
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">{t("sidebar.dashboard")}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{t("dashboard.totalBalance")}</CardTitle>
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Wallet className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">¥45,231.89</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +20.1% {t("dashboard.comparedToLastMonth")}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-900/90 to-purple-950/90 border-purple-800/30 shadow-lg shadow-purple-900/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{t("dashboard.activeCards")}</CardTitle>
            <div className="bg-purple-500/20 p-2 rounded-full">
              <CreditCard className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2,350</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +180.1% {t("dashboard.comparedToLastMonth")}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-900/90 to-yellow-950/90 border-yellow-800/30 shadow-lg shadow-yellow-900/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{t("dashboard.merchantCount")}</CardTitle>
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <Store className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12,234</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +19% {t("dashboard.comparedToLastMonth")}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-900/90 to-green-950/90 border-green-800/30 shadow-lg shadow-green-900/20 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">{t("dashboard.invitedUsers")}</CardTitle>
            <div className="bg-green-500/20 p-2 rounded-full">
              <User className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +201 {t("dashboard.comparedToLastMonth")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t("dashboard.recentActivities")}</CardTitle>
            <CardDescription className="text-blue-300">
              {t("dashboard.last30DaysActivities")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-900/30 rounded-lg border border-blue-800/30 hover:bg-blue-800/30 transition-colors">
                    <div className="mr-3">
                      {activity.type === (language.startsWith('zh') ? "充值" : t("dashboard.activity.deposit")) && (
                        <div className="bg-blue-500/20 p-2 rounded-full">
                          <Wallet className="h-5 w-5 text-blue-400" />
                        </div>
                      )}
                      {activity.type === (language.startsWith('zh') ? "申请卡片" : t("dashboard.activity.applyCard")) && (
                        <div className="bg-purple-500/20 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-purple-400" />
                        </div>
                      )}
                      {activity.type === (language.startsWith('zh') ? "邀请用户" : t("dashboard.activity.inviteUser")) && (
                        <div className="bg-green-500/20 p-2 rounded-full">
                          <User className="h-5 w-5 text-green-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.type}</p>
                      <div className="flex items-center text-sm text-blue-300">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">{activity.amount}</p>
                      {activity.status === (language.startsWith('zh') ? "已完成" : t("dashboard.status.completed")) ? (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-500/20">
                          {activity.status}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-500/20">
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-blue-300">
                {t("dashboard.noRecentActivities")}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">{t("dashboard.quickActions")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30 border border-blue-500/30">
              <Wallet className="mr-2 h-4 w-4" /> {t("sidebar.wallet.deposit")}
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500/30">
              <CreditCard className="mr-2 h-4 w-4" /> {t("sidebar.cards.apply")}
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-900/30 border border-green-500/30">
              <User className="mr-2 h-4 w-4" /> {t("dashboard.inviteFriends")}
            </Button>
            
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-yellow-800/30 shadow-inner">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">{t("dashboard.importantNotice")}</h4>
                  <p className="text-sm text-blue-300">
                    {t("dashboard.systemMaintenanceNotice")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
