
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  PieChart, 
  LineChart, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">数据分析</h1>
        <p className="text-blue-300">分析平台运营和用户行为数据</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              总用户数
            </CardTitle>
            <CardDescription className="text-blue-300">
              平台注册用户总数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25,642</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +12.5% 较上月
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Activity className="mr-2 text-blue-400" size={20} />
              活跃用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              30天内活跃用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18,329</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +8.3% 较上月
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <LineChart className="mr-2 text-blue-400" size={20} />
              转化率
            </CardTitle>
            <CardDescription className="text-blue-300">
              注册至开卡转化率
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32.8%</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +2.4% 较上月
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              平均充值
            </CardTitle>
            <CardDescription className="text-blue-300">
              用户平均充值金额
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">￥1,280</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <p className="text-xs text-green-400">
                +5.7% 较上月
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 text-blue-400" size={20} />
              用户增长趋势
            </CardTitle>
            <CardDescription className="text-blue-300">
              近6个月用户注册和活跃趋势
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <LineChart size={50} className="mx-auto mb-4 opacity-40" />
              <p>用户增长趋势图表将在此处显示</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 text-blue-400" size={20} />
              用户分布
            </CardTitle>
            <CardDescription className="text-blue-300">
              按地区用户分布情况
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <PieChart size={50} className="mx-auto mb-4 opacity-40" />
              <p>用户分布图表将在此处显示</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              渠道分析
            </CardTitle>
            <CardDescription className="text-blue-300">
              不同注册渠道的用户数量
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <BarChart3 size={50} className="mx-auto mb-4 opacity-40" />
              <p>渠道分析图表将在此处显示</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 text-blue-400" size={20} />
              每日活跃用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              过去30天每日活跃用户数量
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <Calendar size={50} className="mx-auto mb-4 opacity-40" />
              <p>每日活跃用户图表将在此处显示</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="mr-2 border-blue-600 text-white hover:bg-blue-800">
          导出数据
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          生成报告
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsPage;
