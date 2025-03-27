
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, BarChart3, TrendingUp, Users, Activity } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">数据统计</h1>
        <p className="text-blue-300">查看平台关键指标和业务分析</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              总用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              平台总注册用户量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,854</div>
            <p className="text-sm text-blue-300 flex items-center mt-2">
              <TrendingUp className="mr-1 text-green-400" size={14} />
              比上月增长 8.5%
            </p>
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
            <div className="text-3xl font-bold">5,273</div>
            <p className="text-sm text-blue-300 flex items-center mt-2">
              <TrendingUp className="mr-1 text-green-400" size={14} />
              比上月增长 12.3%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              交易额
            </CardTitle>
            <CardDescription className="text-blue-300">
              本月总交易额
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">¥2,456,789</div>
            <p className="text-sm text-blue-300 flex items-center mt-2">
              <TrendingUp className="mr-1 text-green-400" size={14} />
              比上月增长 5.7%
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <PieChart className="mr-2 text-blue-400" size={20} />
              转化率
            </CardTitle>
            <CardDescription className="text-blue-300">
              用户转化率
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23.5%</div>
            <p className="text-sm text-blue-300 flex items-center mt-2">
              <TrendingUp className="mr-1 text-green-400" size={14} />
              比上月增长 2.1%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              用户增长趋势
            </CardTitle>
            <CardDescription className="text-blue-300">
              最近6个月的用户增长情况
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <BarChart3 size={60} className="mx-auto mb-4 opacity-40" />
              <p>用户增长图表将在此处显示</p>
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
              按区域划分的用户分布情况
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-blue-400">
              <PieChart size={60} className="mx-auto mb-4 opacity-40" />
              <p>用户分布图表将在此处显示</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
        <CardHeader>
          <CardTitle>数据详情</CardTitle>
          <CardDescription className="text-blue-300">
            平台详细数据统计
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">指标名称</th>
                  <th className="text-left p-3">本月数据</th>
                  <th className="text-left p-3">上月数据</th>
                  <th className="text-left p-3">增长率</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-800/50 hover:bg-blue-900/20">
                  <td className="p-3">新增用户</td>
                  <td className="p-3">1,245</td>
                  <td className="p-3">1,102</td>
                  <td className="p-3 text-green-400">+13%</td>
                </tr>
                <tr className="border-b border-blue-800/50 hover:bg-blue-900/20">
                  <td className="p-3">活跃用户</td>
                  <td className="p-3">5,273</td>
                  <td className="p-3">4,698</td>
                  <td className="p-3 text-green-400">+12.3%</td>
                </tr>
                <tr className="border-b border-blue-800/50 hover:bg-blue-900/20">
                  <td className="p-3">总交易额</td>
                  <td className="p-3">¥2,456,789</td>
                  <td className="p-3">¥2,324,567</td>
                  <td className="p-3 text-green-400">+5.7%</td>
                </tr>
                <tr className="border-b border-blue-800/50 hover:bg-blue-900/20">
                  <td className="p-3">交易笔数</td>
                  <td className="p-3">34,256</td>
                  <td className="p-3">32,145</td>
                  <td className="p-3 text-green-400">+6.5%</td>
                </tr>
                <tr className="hover:bg-blue-900/20">
                  <td className="p-3">平均交易金额</td>
                  <td className="p-3">¥712</td>
                  <td className="p-3">¥723</td>
                  <td className="p-3 text-red-400">-1.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
