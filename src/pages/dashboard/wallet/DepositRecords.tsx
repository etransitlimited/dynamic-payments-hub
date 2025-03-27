
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Wallet, Filter, Download, RefreshCw, Calendar, TrendingUp, Info } from "lucide-react";
import PageHeader from "../merchant/components/PageHeader";

const DepositRecords = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const depositRecords = [
    {
      id: "TX-8973-4610",
      amount: 1200.00,
      paymentMethod: "支付宝",
      datetime: "2023-11-25 14:32",
      status: "已完成"
    },
    {
      id: "TX-7645-2198",
      amount: 500.00,
      paymentMethod: "微信支付",
      datetime: "2023-11-20 09:45",
      status: "已完成"
    },
    {
      id: "TX-6329-7501",
      amount: 2000.00,
      paymentMethod: "银行转账",
      datetime: "2023-11-18 10:22",
      status: "已完成"
    }
  ];

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title="充值记录" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 md:col-span-3 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <TrendingUp size={18} className="text-blue-400" />
              </span>
              充值统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">本月充值金额</h3>
                </div>
                <div className="text-2xl font-bold text-white">¥3,700.00</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">
                    比上月增长 15.2%
                  </p>
                </div>
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500/20 p-2 rounded-full mr-2">
                    <Wallet className="h-4 w-4 text-green-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">累计充值金额</h3>
                </div>
                <div className="text-2xl font-bold text-white">¥28,450.00</div>
                <p className="text-xs text-blue-200/80 mt-1">
                  自 2023-08-15 起
                </p>
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 hover:border-blue-700/50 transition-colors">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-2">
                    <Calendar className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">最近充值时间</h3>
                </div>
                <div className="text-2xl font-bold text-white">2天前</div>
                <p className="text-xs text-blue-200/80 mt-1">
                  2023-11-25 14:32
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <Wallet size={18} className="text-green-400" />
            </span>
            充值记录
          </CardTitle>
          <CardDescription className="text-blue-200/80">查询您的账户充值记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 pointer-events-none" />
                <Input 
                  placeholder="交易号 / 订单号" 
                  className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40 pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Filter className="h-4 w-4" />
                <span className="sm:inline hidden">筛选</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Download className="h-4 w-4" />
                <span className="sm:inline hidden">导出</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <RefreshCw className="h-4 w-4" />
                <span className="sm:inline hidden">刷新</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-900/50 overflow-hidden bg-[#061428]/40">
            <Table>
              <TableCaption className="text-blue-200/50">所有充值交易记录</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-white font-medium">交易号</TableHead>
                  <TableHead className="text-white font-medium">充值金额</TableHead>
                  <TableHead className="text-white font-medium">支付方式</TableHead>
                  <TableHead className="text-white font-medium">充值时间</TableHead>
                  <TableHead className="text-white font-medium">状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {depositRecords.map((record) => (
                  <TableRow key={record.id} className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">{record.id}</TableCell>
                    <TableCell className="text-white">¥{record.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        record.paymentMethod === "支付宝" ? "bg-blue-600/20 text-blue-300" :
                        record.paymentMethod === "微信支付" ? "bg-green-600/20 text-green-300" :
                        "bg-purple-600/20 text-purple-300"
                      }`}>
                        {record.paymentMethod}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">{record.datetime}</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                        {record.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30 hover:border-blue-700/50 transition-colors">
            <div className="flex items-start">
              <span className="bg-blue-500/20 p-1 rounded-full mr-2 mt-0.5 flex-shrink-0">
                <Info className="h-3 w-3 text-blue-400" />
              </span>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">充值说明</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm">
                  <li>充值金额将在交易完成后立即到账</li>
                  <li>若充值未到账，请联系客服并提供交易号</li>
                  <li>充值记录将保留12个月</li>
                  <li>支持多种支付方式：支付宝、微信支付、银行转账等</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositRecords;
