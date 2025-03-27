
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  Filter, 
  Edit,
  Trash2,
  Copy,
  BadgePercent
} from "lucide-react";
import { Label } from "@/components/ui/label";

const DiscountsPage = () => {
  // Sample discount data
  const discounts = [
    {
      id: "DISC-001",
      code: "SUMMER2023",
      type: "百分比",
      value: "15%",
      minAmount: "¥100",
      maxAmount: "¥500",
      status: "活跃",
      usageLimit: "无限制",
      usageCount: "254",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
    },
    {
      id: "DISC-002",
      code: "WELCOME50",
      type: "固定金额",
      value: "¥50",
      minAmount: "¥200",
      maxAmount: "-",
      status: "活跃",
      usageLimit: "每用户1次",
      usageCount: "127",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: "DISC-003",
      code: "VIP20",
      type: "百分比",
      value: "20%",
      minAmount: "¥500",
      maxAmount: "¥2000",
      status: "活跃",
      usageLimit: "每用户5次",
      usageCount: "89",
      startDate: "2023-05-15",
      endDate: "2023-12-31",
    },
    {
      id: "DISC-004",
      code: "FLASH100",
      type: "固定金额",
      value: "¥100",
      minAmount: "¥300",
      maxAmount: "-",
      status: "已过期",
      usageLimit: "总计500次",
      usageCount: "500",
      startDate: "2023-04-01",
      endDate: "2023-04-07",
    },
    {
      id: "DISC-005",
      code: "NEWUSER",
      type: "百分比",
      value: "30%",
      minAmount: "-",
      maxAmount: "¥300",
      status: "活跃",
      usageLimit: "每用户1次",
      usageCount: "315",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
    },
    {
      id: "DISC-006",
      code: "HOLIDAY25",
      type: "百分比",
      value: "25%",
      minAmount: "¥200",
      maxAmount: "¥1000",
      status: "未开始",
      usageLimit: "无限制",
      usageCount: "0",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "活跃":
        return "bg-green-500/20 text-green-500";
      case "未开始":
        return "bg-yellow-500/20 text-yellow-500";
      case "已过期":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "百分比":
        return "bg-purple-500/20 text-purple-500";
      case "固定金额":
        return "bg-blue-500/20 text-blue-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">折扣管理</h1>
        <p className="text-blue-300">管理所有优惠券和折扣码</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">活跃折扣</CardTitle>
            <CardDescription className="text-blue-300">
              当前可用的折扣数量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">已使用次数</CardTitle>
            <CardDescription className="text-blue-300">
              折扣码总使用次数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,285</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">平均折扣率</CardTitle>
            <CardDescription className="text-blue-300">
              所有折扣的平均值
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">22.5%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">即将过期</CardTitle>
            <CardDescription className="text-blue-300">
              30天内过期的折扣
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="text-xl">折扣筛选</CardTitle>
          <CardDescription className="text-blue-300">
            搜索和筛选折扣码
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount-code">折扣码</Label>
              <Input
                id="discount-code"
                placeholder="输入折扣码或ID"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount-type">折扣类型</Label>
              <Input
                id="discount-type"
                placeholder="选择折扣类型"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="discount-status">折扣状态</Label>
              <Input
                id="discount-status"
                placeholder="选择折扣状态"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date-range">日期范围</Label>
              <Input
                id="date-range"
                placeholder="选择日期范围"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" className="border-blue-700 text-blue-400">
              <Filter className="mr-2 h-4 w-4" />
              重置筛选
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              搜索
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">折扣列表</CardTitle>
              <CardDescription className="text-blue-300">
                管理所有折扣码和优惠券
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> 创建折扣
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-800 hover:bg-transparent">
                  <TableHead className="text-blue-300">ID</TableHead>
                  <TableHead className="text-blue-300">折扣码</TableHead>
                  <TableHead className="text-blue-300">类型</TableHead>
                  <TableHead className="text-blue-300">折扣值</TableHead>
                  <TableHead className="text-blue-300">最低消费</TableHead>
                  <TableHead className="text-blue-300">最高抵扣</TableHead>
                  <TableHead className="text-blue-300">状态</TableHead>
                  <TableHead className="text-blue-300">使用限制</TableHead>
                  <TableHead className="text-blue-300">已使用</TableHead>
                  <TableHead className="text-blue-300">有效期</TableHead>
                  <TableHead className="text-blue-300">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discounts.map((discount) => (
                  <TableRow
                    key={discount.id}
                    className="border-blue-800/50 hover:bg-blue-900/20"
                  >
                    <TableCell>{discount.id}</TableCell>
                    <TableCell className="font-medium">
                      {discount.code}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                          discount.type
                        )}`}
                      >
                        {discount.type}
                      </span>
                    </TableCell>
                    <TableCell>{discount.value}</TableCell>
                    <TableCell>{discount.minAmount}</TableCell>
                    <TableCell>{discount.maxAmount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          discount.status
                        )}`}
                      >
                        {discount.status}
                      </span>
                    </TableCell>
                    <TableCell>{discount.usageLimit}</TableCell>
                    <TableCell>{discount.usageCount}</TableCell>
                    <TableCell>
                      {discount.startDate} 至 <br />
                      {discount.endDate}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-blue-400"
                          title="编辑折扣"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-blue-400"
                          title="复制折扣"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-red-400"
                          title="删除折扣"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-blue-300">显示 1-6 共 6 条记录</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
                disabled
              >
                上一页
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 bg-blue-800/50 text-white"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
                disabled
              >
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscountsPage;
