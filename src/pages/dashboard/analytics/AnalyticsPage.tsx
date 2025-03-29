
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BarChart3, LineChart, PieChart, TrendingUp, Users, CreditCard, 
  Wallet, Calendar, ArrowUpRight, CircleDollarSign 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";

const AnalyticsPage = () => {
  const { t, language } = useLanguage();
  
  // Stats card data
  const statsCards = [
    { 
      id: 1, 
      icon: <Users className="text-blue-400" size={20} />, 
      title: "userActivity", 
      value: "15,234", 
      change: "+12.5%" 
    },
    { 
      id: 2, 
      icon: <CreditCard className="text-purple-400" size={20} />, 
      title: "cardIssued", 
      value: "2,548", 
      change: "+8.2%" 
    },
    { 
      id: 3, 
      icon: <Wallet className="text-green-400" size={20} />, 
      title: "revenue", 
      value: "¥1,348,759", 
      change: "+15.3%" 
    },
    { 
      id: 4, 
      icon: <CircleDollarSign className="text-yellow-400" size={20} />, 
      title: "averageTransaction", 
      value: "¥2,875", 
      change: "+5.7%" 
    }
  ];

  // Revenue data for the line chart - now using translated date formats
  const revenueData = [
    { name: '1 ' + t('common.months.jan'), value: 212000 },
    { name: '7 ' + t('common.months.jan'), value: 184000 },
    { name: '14 ' + t('common.months.jan'), value: 226000 },
    { name: '21 ' + t('common.months.jan'), value: 293000 },
    { name: '28 ' + t('common.months.jan'), value: 258000 },
    { name: '4 ' + t('common.months.feb'), value: 344000 },
    { name: '11 ' + t('common.months.feb'), value: 398000 },
    { name: '18 ' + t('common.months.feb'), value: 342000 },
    { name: '25 ' + t('common.months.feb'), value: 377000 },
    { name: '4 ' + t('common.months.mar'), value: 415000 },
  ];

  // Transaction type data for the bar chart - using translations
  const transactionTypeData = [
    { name: t('transactions.deposit'), value: 1250 },
    { name: t('transactions.withdrawal'), value: 980 },
    { name: t('common.transfer'), value: 1580 },
    { name: t('common.payment'), value: 1750 },
    { name: t('common.exchange'), value: 850 },
  ];

  // User distribution data for the pie chart - using translations for regions
  const userDistributionData = [
    { name: t('common.regions.asia'), value: 5840 },
    { name: t('common.regions.europe'), value: 3562 },
    { name: t('common.regions.northAmerica'), value: 2753 },
    { name: t('common.regions.africa'), value: 1893 },
    { name: t('common.regions.southAmerica'), value: 1258 },
  ];

  // Growth metrics data for the area chart - using translated month names
  const growthData = [
    { name: t('common.months.jan'), users: 1540, transactions: 4200, revenue: 145000 },
    { name: t('common.months.feb'), users: 1840, transactions: 4800, revenue: 178000 },
    { name: t('common.months.mar'), users: 2140, transactions: 5300, revenue: 215000 },
    { name: t('common.months.apr'), users: 2350, transactions: 5900, revenue: 245000 },
    { name: t('common.months.may'), users: 2780, transactions: 6500, revenue: 285000 },
    { name: t('common.months.jun'), users: 3150, transactions: 7200, revenue: 325000 },
  ];

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Translate specific chart terms
  const getChartTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      users: {
        'en': 'users',
        'zh-CN': '用户',
        'zh-TW': '用戶',
        'fr': 'utilisateurs',
        'es': 'usuarios'
      },
      transactions: {
        'en': 'transactions',
        'zh-CN': '交易',
        'zh-TW': '交易',
        'fr': 'transactions',
        'es': 'transacciones'
      }
    };
    
    return translations[key]?.[language] || key;
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("sidebar.analytics")}</h1>
        <p className="text-blue-300">{t("analytics.subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card) => (
          <Card key={card.id} className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                  {card.icon}
                </span>
                {t(`analytics.${card.title}`)}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold">{card.value}</div>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                <p className="text-xs text-green-400">{card.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <LineChart className="text-blue-400" size={20} />
              </span>
              {t("analytics.revenueOverTime")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.last30Days")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
                <XAxis dataKey="name" stroke="#8597b4" />
                <YAxis stroke="#8597b4" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                          <p className="text-blue-300">{payload[0].payload.name}</p>
                          <p className="text-white font-semibold">¥{payload[0].value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#0f172a' }}
                  activeDot={{ stroke: '#3b82f6', strokeWidth: 2, r: 6, fill: '#0f172a' }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                <BarChart3 className="text-purple-400" size={20} />
              </span>
              {t("analytics.transactionsByType")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.distributionByType")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
                <XAxis dataKey="name" stroke="#8597b4" />
                <YAxis stroke="#8597b4" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                          <p className="text-blue-300">{payload[0].payload.name}</p>
                          <p className="text-white font-semibold">{payload[0].value.toLocaleString()} {t('common.transactions')}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                >
                  {transactionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-green-500/20 p-2 rounded-full mr-2">
                <PieChart className="text-green-400" size={20} />
              </span>
              {t("analytics.userDistribution")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.byRegion")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                          <p className="text-blue-300">{payload[0].payload.name}</p>
                          <p className="text-white font-semibold">{payload[0].value.toLocaleString()} {t('common.users')}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center">
              <span className="bg-yellow-500/20 p-2 rounded-full mr-2">
                <TrendingUp className="text-yellow-400" size={20} />
              </span>
              {t("analytics.growthMetrics")}
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              {t("analytics.platformGrowth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2c4163" vertical={false} />
                <XAxis dataKey="name" stroke="#8597b4" />
                <YAxis stroke="#8597b4" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-blue-900/90 border border-blue-700 p-2 rounded shadow-lg">
                          <p className="text-blue-300">{payload[0].payload.name}</p>
                          <div className="grid gap-1">
                            <p className="text-blue-400 flex items-center">
                              <span className="w-2 h-2 bg-blue-500 mr-1 rounded-full"></span>
                              {payload[0].value.toLocaleString()} {t('common.users')}
                            </p>
                            <p className="text-purple-400 flex items-center">
                              <span className="w-2 h-2 bg-purple-500 mr-1 rounded-full"></span>
                              {payload[1].value.toLocaleString()} {t('common.transactions')}
                            </p>
                            <p className="text-green-400 flex items-center">
                              <span className="w-2 h-2 bg-green-500 mr-1 rounded-full"></span>
                              ¥{payload[2].value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                  name={t('common.users')}
                />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stackId="2"
                  stroke="#8b5cf6" 
                  fillOpacity={1} 
                  fill="url(#colorTransactions)"
                  name={t('common.transactions')}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="3"
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  name={t('analytics.revenue')}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden mb-6">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Calendar className="text-blue-400" size={20} />
              </span>
              {t("analytics.reportGeneration")}
            </div>
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            {t("analytics.generateReports")}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.dailyReport")}
            </Button>
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.weeklyReport")}
            </Button>
            <Button variant="outline" className="border-blue-600/60 bg-blue-950/50 text-white hover:bg-blue-700/30">
              {t("analytics.monthlyReport")}
            </Button>
          </div>
          <div className="text-sm text-blue-200/80">
            {t("analytics.reportsNote")}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
