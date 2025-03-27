
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
import { Search, Download, Filter, ArrowUpDown } from "lucide-react";
import { Label } from "@/components/ui/label";

const TransactionsPage = () => {
  // Sample transaction data
  const transactions = [
    {
      id: "TX-7829",
      date: "2023-07-25 14:32:45",
      amount: "¥2,345.00",
      user: "张三",
      status: "成功",
      type: "充值",
    },
    {
      id: "TX-7830",
      date: "2023-07-25 15:12:31",
      amount: "¥1,200.00",
      user: "李四",
      status: "成功",
      type: "提现",
    },
    {
      id: "TX-7831",
      date: "2023-07-25 16:45:22",
      amount: "¥3,500.00",
      user: "王五",
      status: "处理中",
      type: "充值",
    },
    {
      id: "TX-7832",
      date: "2023-07-26 09:12:05",
      amount: "¥500.00",
      user: "赵六",
      status: "成功",
      type: "提现",
    },
    {
      id: "TX-7833",
      date: "2023-07-26 10:34:18",
      amount: "¥1,800.00",
      user: "钱七",
      status: "失败",
      type: "充值",
    },
    {
      id: "TX-7834",
      date: "2023-07-26 11:22:45",
      amount: "¥4,200.00",
      user: "孙八",
      status: "成功",
      type: "充值",
    },
    {
      id: "TX-7835",
      date: "2023-07-27 13:11:32",
      amount: "¥2,100.00",
      user: "周九",
      status: "成功",
      type: "提现",
    },
    {
      id: "TX-7836",
      date: "2023-07-27 14:45:56",
      amount: "¥900.00",
      user: "吴十",
      status: "处理中",
      type: "提现",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "成功":
        return "bg-green-500/20 text-green-500";
      case "处理中":
        return "bg-yellow-500/20 text-yellow-500";
      case "失败":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "充值":
        return "bg-blue-500/20 text-blue-500";
      case "提现":
        return "bg-purple-500/20 text-purple-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">交易记录</h1>
        <p className="text-blue-300">管理所有交易和转账记录</p>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="text-xl">交易筛选</CardTitle>
          <CardDescription className="text-blue-300">
            根据条件筛选交易记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="transaction-id">交易ID</Label>
              <Input
                id="transaction-id"
                placeholder="输入交易ID"
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="transaction-type">交易类型</Label>
              <Input
                id="transaction-type"
                placeholder="选择交易类型"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="transaction-status">交易状态</Label>
              <Input
                id="transaction-status"
                placeholder="选择交易状态"
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
              <CardTitle className="text-xl">交易列表</CardTitle>
              <CardDescription className="text-blue-300">
                所有交易记录详情
              </CardDescription>
            </div>
            <Button variant="outline" className="border-blue-700 text-blue-400">
              <Download className="mr-2 h-4 w-4" /> 导出数据
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-800 hover:bg-transparent">
                  <TableHead className="text-blue-300">
                    <div className="flex items-center">
                      交易ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-blue-300">
                    <div className="flex items-center">
                      日期时间
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-blue-300">
                    <div className="flex items-center">
                      金额
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-blue-300">用户</TableHead>
                  <TableHead className="text-blue-300">类型</TableHead>
                  <TableHead className="text-blue-300">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="border-blue-800/50 hover:bg-blue-900/20"
                  >
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-blue-300">显示 1-8 共 234 条记录</div>
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
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
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

export default TransactionsPage;
