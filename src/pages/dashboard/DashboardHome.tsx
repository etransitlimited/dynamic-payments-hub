
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, User, Wallet, Store, TrendingUp, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHome = () => {
  const recentActivities = [
    { type: "充值", amount: "¥1,000.00", date: "2023-12-15 14:30", status: "已完成" },
    { type: "申请卡片", amount: "-", date: "2023-12-10 09:45", status: "审核中" },
    { type: "邀请用户", amount: "+50积分", date: "2023-12-05 16:20", status: "已完成" },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">仪表盘</h1>
        <p className="text-blue-300">系统概览及快捷操作</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">总余额</CardTitle>
            <div className="bg-blue-500/20 p-2 rounded-full">
              <Wallet className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">¥45,231.89</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +20.1% 较上月
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">活跃卡片</CardTitle>
            <div className="bg-purple-500/20 p-2 rounded-full">
              <CreditCard className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2,350</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +180.1% 较上月
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">商户数量</CardTitle>
            <div className="bg-yellow-500/20 p-2 rounded-full">
              <Store className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12,234</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +19% 较上月
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">邀请用户</CardTitle>
            <div className="bg-green-500/20 p-2 rounded-full">
              <User className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +201 较上月
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">近期活动</CardTitle>
            <CardDescription className="text-blue-300">
              最近30天系统活动记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-900/30 rounded-lg border border-blue-900/30">
                    <div className="mr-3">
                      {activity.type === "充值" && (
                        <div className="bg-blue-500/20 p-2 rounded-full">
                          <Wallet className="h-5 w-5 text-blue-400" />
                        </div>
                      )}
                      {activity.type === "申请卡片" && (
                        <div className="bg-purple-500/20 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-purple-400" />
                        </div>
                      )}
                      {activity.type === "邀请用户" && (
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
                      {activity.status === "已完成" ? (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-600/20 text-green-300">
                          {activity.status}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-blue-300">
                暂无最近活动记录
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">快捷操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Wallet className="mr-2 h-4 w-4" /> 充值
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <CreditCard className="mr-2 h-4 w-4" /> 申请卡片
            </Button>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <User className="mr-2 h-4 w-4" /> 邀请好友
            </Button>
            
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-yellow-900/30">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">重要通知</h4>
                  <p className="text-sm text-blue-300">
                    系统将于2023年12月25日22:00-次日02:00进行升级维护，期间部分功能可能无法正常使用。
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
