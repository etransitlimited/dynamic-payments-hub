
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, User, Wallet, Store } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">欢迎使用卡台管理系统</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">总余额</CardTitle>
            <Wallet className="h-4 w-4 text-blue-300/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">¥45,231.89</div>
            <p className="text-xs text-blue-300/80">
              +20.1% 较上月
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">活跃卡片</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-300/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+2,350</div>
            <p className="text-xs text-blue-300/80">
              +180.1% 较上月
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">商户数量</CardTitle>
            <Store className="h-4 w-4 text-blue-300/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+12,234</div>
            <p className="text-xs text-blue-300/80">
              +19% 较上月
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">邀请用户</CardTitle>
            <User className="h-4 w-4 text-blue-300/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+573</div>
            <p className="text-xs text-blue-300/80">
              +201 较上月
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4 bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50">
        <CardHeader>
          <CardTitle className="text-white">近期活动</CardTitle>
          <CardDescription className="text-blue-200/80">
            最近30天系统活动记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10 text-blue-200/50">
            暂无最近活动记录
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
