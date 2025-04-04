
import React from "react";
import { motion } from "framer-motion";
import { usePageLanguage } from "@/hooks/use-page-language";
import TranslatedText from "@/components/translation/TranslatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Wallet,
  UserPlus,
  LineChart,
  Clock,
  ShieldCheck,
  Bell,
  ChevronRight,
  DollarSign,
  FileText
} from "lucide-react";

const DashboardPage: React.FC = () => {
  const { language, forceUpdateKey, getTranslation } = usePageLanguage("dashboard.title", "Dashboard");
  const navigate = useNavigate();
  
  // Feature panels configuration
  const featurePanels = [
    {
      title: "dashboard.quickAccess.wallet",
      description: "dashboard.quickAccess.walletDescription",
      icon: <Wallet size={24} className="text-purple-400" />,
      path: "/dashboard/wallet",
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-600/30",
    },
    {
      title: "dashboard.quickAccess.cards",
      description: "dashboard.quickAccess.cardsDescription",
      icon: <CreditCard size={24} className="text-green-400" />,
      path: "/dashboard/cards",
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-600/30",
    },
    {
      title: "dashboard.quickAccess.transactions",
      description: "dashboard.quickAccess.transactionsDescription",
      icon: <DollarSign size={24} className="text-blue-400" />,
      path: "/dashboard/transactions",
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-600/30",
    },
    {
      title: "dashboard.quickAccess.analytics",
      description: "dashboard.quickAccess.analyticsDescription",
      icon: <LineChart size={24} className="text-amber-400" />,
      path: "/dashboard/analytics",
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-600/30",
    },
    {
      title: "dashboard.quickAccess.invitation",
      description: "dashboard.quickAccess.invitationDescription",
      icon: <UserPlus size={24} className="text-pink-400" />,
      path: "/dashboard/invitation",
      color: "from-pink-500/20 to-pink-600/10",
      borderColor: "border-pink-600/30",
    },
  ];
  
  // Activity types with their respective icons
  const activityTypes: Record<string, React.ReactNode> = {
    deposit: <Wallet size={16} className="text-green-400" />,
    withdrawal: <Wallet size={16} className="text-red-400" />,
    applyCard: <CreditCard size={16} className="text-blue-400" />,
    inviteUser: <UserPlus size={16} className="text-purple-400" />,
    transfer: <DollarSign size={16} className="text-amber-400" />,
  };
  
  // Mock data for recent activities
  const recentActivities = [
    {
      id: "act-001",
      type: "deposit",
      amount: "$500.00",
      status: "completed",
      time: "2 hours ago"
    },
    {
      id: "act-002",
      type: "applyCard",
      cardType: "Visa Gold",
      status: "pending",
      time: "5 hours ago"
    },
    {
      id: "act-003",
      type: "inviteUser",
      user: "john@example.com",
      status: "completed",
      time: "Yesterday"
    },
  ];
  
  // Mock data for key metrics
  const keyMetrics = [
    {
      label: "dashboard.totalBalance",
      value: "$12,450.00",
      change: "+15.2%",
      positive: true,
    },
    {
      label: "dashboard.activeCards",
      value: "3",
      change: "+1",
      positive: true,
    },
    {
      label: "dashboard.invitedUsers",
      value: "12",
      change: "+3",
      positive: true,
    },
  ];
  
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };
  
  return (
    <motion.div
      key={forceUpdateKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
      data-language={language}
    >
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          <TranslatedText keyName="dashboard.welcomeMessage" fallback="Welcome back!" values={{ username: "User" }} />
        </h1>
        <p className="text-gray-400">
          <TranslatedText keyName="dashboard.subtitle" fallback="Here's what's happening with your account today." />
        </p>
      </div>
      
      {/* Key Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {keyMetrics.map((metric, index) => (
          <motion.div key={`metric-${index}`} variants={itemVariants}>
            <Card className="border-purple-900/20 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400 font-normal">
                  <TranslatedText keyName={metric.label} fallback={metric.label.split('.').pop()} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <Badge variant={metric.positive ? "default" : "destructive"} className={metric.positive ? "bg-green-600/80" : "bg-red-600/80"}>
                    {metric.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Feature Panels */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText keyName="dashboard.featureLinks" fallback="Feature Quick Links" />
        </h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featurePanels.map((panel, index) => (
            <motion.div 
              key={`panel-${index}`}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card 
                className={`cursor-pointer border-${panel.borderColor} bg-gradient-to-br ${panel.color} backdrop-blur-md shadow-lg h-full relative overflow-hidden hover:shadow-xl transition-all duration-300`}
                onClick={() => navigate(panel.path)}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                
                <CardHeader className="pb-2 relative z-10">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-charcoal-dark/60 mb-3 shadow-inner">
                    {panel.icon}
                  </div>
                  <CardTitle className="text-lg text-white">
                    <TranslatedText keyName={panel.title} fallback={panel.title.split('.').pop()} />
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-300">
                    <TranslatedText keyName={panel.description} fallback={panel.description.split('.').pop()} />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center pt-0">
                  <span></span>
                  <div className="p-1 rounded-full bg-charcoal-dark/60 shadow-inner">
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Bottom Section with Activities and Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-3">
          <Card className="border-purple-900/20 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <CardTitle className="text-lg text-white">
                  <TranslatedText keyName="dashboard.recentActivities" fallback="Recent Activities" />
                </CardTitle>
              </div>
              <Badge variant="outline" className="border-purple-600/30 text-purple-200 bg-purple-900/20">
                <TranslatedText keyName="dashboard.last30DaysActivities" fallback="Last 30 days" />
              </Badge>
            </CardHeader>
            <CardContent>
              {recentActivities.length > 0 ? (
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-charcoal-dark/30 border border-purple-900/10"
                    >
                      <div className="p-2 bg-charcoal-dark/60 rounded-lg shadow-inner">
                        {activityTypes[activity.type]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-white">
                            <TranslatedText keyName={`dashboard.activity.${activity.type}`} fallback={activity.type} />
                            {activity.amount && ` - ${activity.amount}`}
                            {activity.cardType && ` - ${activity.cardType}`}
                            {activity.user && ` - ${activity.user}`}
                          </span>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge 
                            variant="outline"
                            className={`px-2 py-0 text-xs ${
                              activity.status === 'completed' ? 'bg-green-900/20 text-green-300 border-green-600/30' :
                              activity.status === 'pending' ? 'bg-yellow-900/20 text-yellow-300 border-yellow-600/30' :
                              'bg-red-900/20 text-red-300 border-red-600/30'
                            }`}
                          >
                            <TranslatedText keyName={`dashboard.status.${activity.status}`} fallback={activity.status} />
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-purple-600/30 text-purple-200 hover:bg-purple-900/20"
                    onClick={() => navigate('/dashboard/transactions/history')}
                  >
                    <TranslatedText keyName="transactions.viewAllTransactions" fallback="View All Transactions" />
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">
                    <TranslatedText keyName="dashboard.noRecentActivities" fallback="No recent activities found" />
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Important Notice */}
          <Card className="border-purple-900/20 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-amber-400" />
                <CardTitle className="text-lg text-white">
                  <TranslatedText keyName="dashboard.importantNotice" fallback="Important Notice" />
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-gray-300">
              <p><TranslatedText keyName="dashboard.systemMaintenanceNotice" fallback="System maintenance notice" /></p>
            </CardContent>
          </Card>
          
          {/* Security Status */}
          <Card className="border-purple-900/20 bg-gradient-to-br from-charcoal-light to-charcoal-dark shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <CardTitle className="text-lg text-white">
                  <TranslatedText keyName="dashboard.systemLoad" fallback="System Health" />
                </CardTitle>
              </div>
              <Badge className="bg-green-600/80">
                <TranslatedText keyName="dashboard.realTimeUpdates" fallback="Real-time" />
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">CPU</span>
                <span className="text-sm font-medium text-white">24%</span>
              </div>
              <div className="w-full h-2 bg-charcoal-dark/60 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Memory</span>
                <span className="text-sm font-medium text-white">42%</span>
              </div>
              <div className="w-full h-2 bg-charcoal-dark/60 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Storage</span>
                <span className="text-sm font-medium text-white">68%</span>
              </div>
              <div className="w-full h-2 bg-charcoal-dark/60 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
