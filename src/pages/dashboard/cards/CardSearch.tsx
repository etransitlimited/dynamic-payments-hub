
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, Download, RefreshCw, CreditCard } from "lucide-react";

const CardSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-blue-600 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">卡片查询</h1>
      </div>
      
      <Card className="bg-gradient-to-br from-indigo-900/90 to-blue-950/90 border-indigo-700/40 shadow-xl shadow-indigo-900/30 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="pb-3 relative z-10 bg-indigo-950/60">
          <CardTitle className="text-white flex items-center">
            <span className="bg-indigo-500/30 p-2 rounded-full mr-2">
              <Search size={18} className="text-indigo-300" />
            </span>
            查询条件
          </CardTitle>
          <CardDescription className="text-indigo-200">
            输入卡号或持卡人信息进行查询
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-indigo-950/40 py-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-400" />
              <Input 
                placeholder="卡号 / 持卡人姓名 / 手机号" 
                className="pl-10 bg-indigo-950/70 border-indigo-700/50 text-white placeholder-indigo-300/60 focus:ring-indigo-500/50 focus:border-indigo-500/50 hover:bg-indigo-900/70 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-500/30">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-950/90 border-purple-700/40 shadow-xl shadow-purple-900/30 backdrop-blur-sm hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="pb-3 relative z-10 bg-purple-950/60">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/30 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-300" />
            </span>
            卡片列表
          </CardTitle>
          <CardDescription className="text-purple-200">
            查询结果显示
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 bg-purple-950/40 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <Download className="h-4 w-4" />
                <span>导出</span>
              </Button>
              <Button variant="outline" className="gap-2 border-purple-600/60 text-white hover:bg-purple-800/50 transition-colors">
                <RefreshCw className="h-4 w-4" />
                <span>刷新</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-purple-700/50 overflow-hidden shadow-inner shadow-purple-950/50">
            <Table>
              <TableCaption className="text-purple-300/50">卡片查询结果列表</TableCaption>
              <TableHeader>
                <TableRow className="border-purple-700/50 bg-purple-900/40">
                  <TableHead className="text-white">卡号</TableHead>
                  <TableHead className="text-white">持卡人</TableHead>
                  <TableHead className="text-white">开卡日期</TableHead>
                  <TableHead className="text-white">状态</TableHead>
                  <TableHead className="text-white">余额</TableHead>
                  <TableHead className="text-white">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-medium text-white">5678 **** **** 1234</TableCell>
                  <TableCell className="text-white">张三</TableCell>
                  <TableCell className="text-white">2023-10-15</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300 border border-emerald-500/20">
                      正常
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥1,234.56</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-indigo-600/60 text-white hover:bg-indigo-800/50 transition-colors"
                    >
                      详情
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-purple-700/50 hover:bg-purple-800/50 transition-colors duration-200">
                  <TableCell className="font-medium text-white">4321 **** **** 5678</TableCell>
                  <TableCell className="text-white">李四</TableCell>
                  <TableCell className="text-white">2023-09-22</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-amber-600/20 text-amber-300 border border-amber-500/20">
                      待激活
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥0.00</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-indigo-600/60 text-white hover:bg-indigo-800/50 transition-colors"
                    >
                      详情
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardSearch;
