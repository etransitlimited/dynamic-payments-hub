
import React from "react";
import {
  GlassCard as Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, ArrowDownUp, DollarSign, BarChart3, Clock, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TransactionsPage = () => {
  // Mock transaction data
  const transactions = [
    { id: 1, user: "王小明", amount: "￥3,500.00", type: "充值", status: "成功", date: "2023-06-12" },
    { id: 2, user: "李华", amount: "￥1,200.00", type: "提现", status: "处理中", date: "2023-06-11" },
    { id: 3, user: "张三", amount: "￥8,650.00", type: "充值", status: "成功", date: "2023-06-10" },
    { id: 4, user: "李四", amount: "￥2,300.00", type: "提现", status: "失败", date: "2023-06-09" },
    { id: 5, user: "陈明", amount: "￥5,150.00", type: "充值", status: "成功", date: "2023-06-08" },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">交易记录</h1>
        <p className="text-blue-300">查看和管理平台所有交易记录</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <DollarSign className="mr-2 text-blue-400" size={20} />
              总交易额
            </CardTitle>
            <CardDescription className="text-blue-300">
              平台所有交易总额
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">￥2,458,630</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <BarChart3 className="mr-2 text-blue-400" size={20} />
              本月交易额
            </CardTitle>
            <CardDescription className="text-blue-300">
              当月交易总额
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">￥356,720</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Clock className="mr-2 text-blue-400" size={20} />
              最近交易
            </CardTitle>
            <CardDescription className="text-blue-300">
              最近24小时交易量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68笔</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <ArrowDownUp className="mr-2 text-blue-400" size={20} />
              交易列表
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder="搜索交易..."
                  className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
                />
              </div>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Filter size={18} />
              </Button>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Calendar size={18} />
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            平台所有交易记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">交易ID</th>
                  <th className="text-left p-3">用户</th>
                  <th className="text-left p-3">金额</th>
                  <th className="text-left p-3">类型</th>
                  <th className="text-left p-3">状态</th>
                  <th className="text-left p-3">日期</th>
                  <th className="text-right p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                    <td className="p-3 font-medium">#{transaction.id.toString().padStart(6, '0')}</td>
                    <td className="p-3">{transaction.user}</td>
                    <td className="p-3 font-semibold">{transaction.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${transaction.type === "充值" ? "bg-green-900/60 text-green-200" : 
                          "bg-blue-900/60 text-blue-200"}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${transaction.status === "成功" ? "bg-green-900/60 text-green-200" : 
                          transaction.status === "处理中" ? "bg-yellow-900/60 text-yellow-200" : 
                          "bg-red-900/60 text-red-200"}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-blue-400" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white hover:bg-blue-800">
                        详情
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 text-blue-400" size={20} />
            交易统计
          </CardTitle>
          <CardDescription className="text-blue-300">
            交易数据分析和趋势
          </CardDescription>
        </CardHeader>
        <CardContent className="h-60 flex items-center justify-center">
          <div className="text-center text-blue-400">
            <BarChart3 size={50} className="mx-auto mb-4 opacity-40" />
            <p>交易统计图表将在此处显示</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
