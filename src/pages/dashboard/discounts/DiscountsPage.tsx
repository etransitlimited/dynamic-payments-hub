
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgePercent, Search, Filter, Plus, Tag, Clock, Calendar, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DiscountsPage = () => {
  // Mock discount data
  const discounts = [
    { id: 1, name: "新用户福利", code: "NEW2023", value: "20%", type: "百分比", status: "活跃", expiry: "2023-12-31", usage: 356 },
    { id: 2, name: "夏季特惠", code: "SUMMER50", value: "￥50", type: "固定金额", status: "活跃", expiry: "2023-08-31", usage: 189 },
    { id: 3, name: "会员专享", code: "VIP100", value: "￥100", type: "固定金额", status: "已过期", expiry: "2023-05-31", usage: 452 },
    { id: 4, name: "周末限时", code: "WEEKEND15", value: "15%", type: "百分比", status: "活跃", expiry: "2023-12-31", usage: 127 },
    { id: 5, name: "节日优惠", code: "HOLIDAY25", value: "25%", type: "百分比", status: "未开始", expiry: "2023-11-20", usage: 0 },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">折扣管理</h1>
        <p className="text-blue-300">管理平台优惠券、折扣码和促销活动</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BadgePercent className="mr-2 text-blue-400" size={20} />
              活跃折扣
            </CardTitle>
            <CardDescription className="text-blue-300">
              当前有效的折扣数量
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
              折扣使用量
            </CardTitle>
            <CardDescription className="text-blue-300">
              本月折扣使用次数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 text-blue-400" size={20} />
              即将到期
            </CardTitle>
            <CardDescription className="text-blue-300">
              30天内即将到期的折扣
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <BadgePercent className="mr-2 text-blue-400" size={20} />
              折扣列表
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder="搜索折扣..."
                  className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
                />
              </div>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Filter size={18} />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={18} className="mr-2" />
                创建折扣
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            管理所有折扣码和优惠券
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">名称</th>
                  <th className="text-left p-3">折扣码</th>
                  <th className="text-left p-3">折扣值</th>
                  <th className="text-left p-3">类型</th>
                  <th className="text-left p-3">状态</th>
                  <th className="text-left p-3 hidden md:table-cell">到期日</th>
                  <th className="text-left p-3 hidden lg:table-cell">使用次数</th>
                  <th className="text-right p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                    <td className="p-3 font-medium">{discount.name}</td>
                    <td className="p-3">
                      <code className="px-2 py-1 bg-blue-950 rounded-md">{discount.code}</code>
                    </td>
                    <td className="p-3 font-semibold">{discount.value}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${discount.type === "百分比" ? "bg-purple-900/60 text-purple-200" : 
                        "bg-blue-900/60 text-blue-200"}`}>
                        {discount.type}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${discount.status === "活跃" ? "bg-green-900/60 text-green-200" : 
                          discount.status === "已过期" ? "bg-red-900/60 text-red-200" : 
                          "bg-yellow-900/60 text-yellow-200"}`}>
                        {discount.status}
                      </span>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-blue-400" />
                        {discount.expiry}
                      </div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">{discount.usage}</td>
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
            <Tag className="mr-2 text-blue-400" size={20} />
            快速创建折扣
          </CardTitle>
          <CardDescription className="text-blue-300">
            选择常用模板快速创建折扣
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <BadgePercent size={18} className="mr-2" />
              新用户折扣 (20%)
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <BadgePercent size={18} className="mr-2" />
              会员专享折扣
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <BadgePercent size={18} className="mr-2" />
              季节性促销折扣
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <BadgePercent size={18} className="mr-2" />
              限时特惠折扣
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountsPage;
