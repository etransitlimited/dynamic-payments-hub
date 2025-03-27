
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  BadgePercent, 
  Search, 
  Filter, 
  Plus, 
  Tag,
  Clock,
  Users,
  BarChart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DiscountsPage = () => {
  // Mock discount data
  const discounts = [
    { id: 1, code: "WELCOME20", discount: "20%", type: "首次充值", status: "活跃", usageCount: 128, expiryDate: "2023-12-31" },
    { id: 2, code: "SUMMER15", discount: "15%", type: "季节活动", status: "活跃", usageCount: 86, expiryDate: "2023-09-30" },
    { id: 3, code: "VIP50", discount: "￥50", type: "VIP专享", status: "活跃", usageCount: 210, expiryDate: "2023-12-15" },
    { id: 4, code: "FLASH30", discount: "30%", type: "限时活动", status: "已过期", usageCount: 342, expiryDate: "2023-08-01" },
    { id: 5, code: "NEWCARD", discount: "￥100", type: "开卡奖励", status: "活跃", usageCount: 175, expiryDate: "2023-12-31" },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">折扣管理</h1>
        <p className="text-blue-300">管理系统折扣码和促销活动</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BadgePercent className="mr-2 text-blue-400" size={20} />
              活跃折扣
            </CardTitle>
            <CardDescription className="text-blue-300">
              当前活跃折扣数量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              使用人数
            </CardTitle>
            <CardDescription className="text-blue-300">
              使用折扣的总人数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,568</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 text-blue-400" size={20} />
              即将到期
            </CardTitle>
            <CardDescription className="text-blue-300">
              30天内到期折扣
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart className="mr-2 text-blue-400" size={20} />
              折扣使用率
            </CardTitle>
            <CardDescription className="text-blue-300">
              平均折扣使用率
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23.4%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Tag className="mr-2 text-blue-400" size={20} />
              折扣列表
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder="搜索折扣码..."
                  className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
                />
              </div>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Filter size={18} />
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4" />
                <span>创建折扣</span>
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            管理所有折扣码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">折扣码</th>
                  <th className="text-left p-3">折扣</th>
                  <th className="text-left p-3">类型</th>
                  <th className="text-left p-3">状态</th>
                  <th className="text-left p-3">使用次数</th>
                  <th className="text-left p-3">到期日期</th>
                  <th className="text-right p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                    <td className="p-3 font-medium">#{discount.id.toString().padStart(3, '0')}</td>
                    <td className="p-3 font-mono">{discount.code}</td>
                    <td className="p-3 font-semibold">{discount.discount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${discount.type === "VIP专享" ? "bg-purple-900/60 text-purple-200" : 
                          discount.type === "限时活动" ? "bg-orange-900/60 text-orange-200" : 
                          discount.type === "季节活动" ? "bg-teal-900/60 text-teal-200" : 
                          "bg-blue-900/60 text-blue-200"}`}>
                        {discount.type}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${discount.status === "活跃" ? "bg-green-900/60 text-green-200" : 
                          "bg-red-900/60 text-red-200"}`}>
                        {discount.status}
                      </span>
                    </td>
                    <td className="p-3">{discount.usageCount}</td>
                    <td className="p-3">{discount.expiryDate}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white hover:bg-blue-800">
                        编辑
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 text-blue-400" size={20} />
            折扣使用分析
          </CardTitle>
          <CardDescription className="text-blue-300">
            各类折扣码使用情况分析
          </CardDescription>
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <div className="text-center text-blue-400">
            <BarChart size={50} className="mx-auto mb-4 opacity-40" />
            <p>折扣使用分析图表将在此处显示</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountsPage;
