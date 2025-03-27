
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
import { 
  Search, 
  Calendar, 
  Filter, 
  Download,
  RefreshCw,
  ArrowUpDown,
  Info
} from "lucide-react";

const FundDetails = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">资金明细</h1>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Search size={18} className="text-blue-400" />
            </span>
            查询条件
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            输入时间范围或交易类型查询资金流水
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                placeholder="交易类型 / 交易号" 
                className="pl-10 bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/20">
                <Calendar className="h-4 w-4" />
                <span>选择日期</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <ArrowUpDown size={18} className="text-purple-400" />
            </span>
            资金流水明细
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            显示所有资金交易记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
              <TableCaption className="text-blue-200/50">所有资金交易记录</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-white">交易号</TableHead>
                  <TableHead className="text-white">交易类型</TableHead>
                  <TableHead className="text-white">金额</TableHead>
                  <TableHead className="text-white">余额</TableHead>
                  <TableHead className="text-white">交易时间</TableHead>
                  <TableHead className="text-white">备注</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">FD-8973-4610</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                      充值
                    </span>
                  </TableCell>
                  <TableCell className="text-green-300">+¥1,200.00</TableCell>
                  <TableCell className="text-white">¥3,450.00</TableCell>
                  <TableCell className="text-white">2023-11-25 14:32</TableCell>
                  <TableCell className="text-white">支付宝充值</TableCell>
                </TableRow>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">FD-7645-2198</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-600/20 text-red-300">
                      消费
                    </span>
                  </TableCell>
                  <TableCell className="text-red-300">-¥350.00</TableCell>
                  <TableCell className="text-white">¥2,250.00</TableCell>
                  <TableCell className="text-white">2023-11-20 09:45</TableCell>
                  <TableCell className="text-white">购买服务</TableCell>
                </TableRow>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">FD-6234-9875</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-600/20 text-blue-300">
                      转账
                    </span>
                  </TableCell>
                  <TableCell className="text-red-300">-¥500.00</TableCell>
                  <TableCell className="text-white">¥2,600.00</TableCell>
                  <TableCell className="text-white">2023-11-18 11:25</TableCell>
                  <TableCell className="text-white">转账给商户</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 p-4 bg-[#061428]/70 rounded-lg border border-blue-900/30">
            <div className="flex items-start">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2 mt-0.5">
                <Info size={16} className="text-blue-400" />
              </span>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">资金流水说明</h3>
                <ul className="space-y-1 text-blue-200/80 list-disc pl-5 text-sm">
                  <li>充值交易显示为绿色，表示账户资金增加</li>
                  <li>消费和转账交易显示为红色，表示账户资金减少</li>
                  <li>交易记录保留12个月后将自动归档</li>
                  <li>如有疑问，请联系客服：400-123-4567</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetails;
