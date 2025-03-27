
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, DollarSign, Users, Calendar, Filter, Download, RefreshCw } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RebateList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const rebateRecords = [
    {
      id: "RB-8973-4610",
      invitee: "王五",
      type: "充值",
      amount: 1000,
      rebate: 50,
      datetime: "2023-11-25 14:32"
    },
    {
      id: "RB-7645-2198",
      invitee: "赵六",
      type: "购卡",
      amount: 2500,
      rebate: 125,
      datetime: "2023-11-20 09:45"
    },
    {
      id: "RB-5321-9874",
      invitee: "张三",
      type: "交易",
      amount: 1800,
      rebate: 90,
      datetime: "2023-11-18 16:20"
    }
  ];

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">返点列表</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <TrendingUp size={18} className="text-blue-400" />
              </span>
              返点统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500/20 p-2 rounded-full mr-2">
                    <Calendar className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">本月返点金额</h3>
                </div>
                <div className="text-2xl font-bold text-white">¥1,234.56</div>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">
                    比上月增长 12.3%
                  </p>
                </div>
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500/20 p-2 rounded-full mr-2">
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">累计返点金额</h3>
                </div>
                <div className="text-2xl font-bold text-white">¥15,678.90</div>
                <p className="text-xs text-blue-200/80 mt-1">
                  自 2023-08-15 起
                </p>
              </div>
              
              <div className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-2">
                    <Users className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="text-sm font-medium text-white">邀请用户数</h3>
                </div>
                <div className="text-2xl font-bold text-white">24</div>
                <p className="text-xs text-blue-200/80 mt-1">
                  其中活跃用户 18 人
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <DollarSign size={18} className="text-green-400" />
            </span>
            返点记录
          </CardTitle>
          <CardDescription className="text-blue-200/80">查询您的邀请返点记录</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="用户名/交易号" 
                className="bg-[#061428] border-blue-900/50 text-white placeholder-blue-300/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Download className="h-4 w-4" />
                <span>导出</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <RefreshCw className="h-4 w-4" />
                <span>刷新</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-900/50 overflow-hidden">
            <Table>
              <TableCaption className="text-blue-200/50">返点收益记录</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-white">交易号</TableHead>
                  <TableHead className="text-white">被邀请人</TableHead>
                  <TableHead className="text-white">交易类型</TableHead>
                  <TableHead className="text-white">交易金额</TableHead>
                  <TableHead className="text-white">返点金额</TableHead>
                  <TableHead className="text-white">返点时间</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rebateRecords.map((record) => (
                  <TableRow key={record.id} className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">{record.id}</TableCell>
                    <TableCell className="text-white">{record.invitee}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        record.type === "充值" ? "bg-blue-600/20 text-blue-300" :
                        record.type === "购卡" ? "bg-purple-600/20 text-purple-300" :
                        "bg-green-600/20 text-green-300"
                      }`}>
                        {record.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">¥{record.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-green-400">¥{record.rebate.toFixed(2)}</TableCell>
                    <TableCell className="text-white">{record.datetime}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30">
            <div className="flex items-center mb-2">
              <span className="bg-blue-500/20 p-1 rounded-full mr-2">
                <DollarSign className="h-3 w-3 text-blue-400" />
              </span>
              <h3 className="text-white text-sm font-medium">返点规则</h3>
            </div>
            <ul className="space-y-2 text-blue-200/80 list-disc pl-5 text-sm">
              <li>邀请用户首次充值：返点比例为充值金额的5%</li>
              <li>邀请用户购卡：返点比例为购卡金额的5%</li>
              <li>邀请用户交易：返点比例为交易金额的5%</li>
              <li>返点将在交易完成后实时到账</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RebateList;
