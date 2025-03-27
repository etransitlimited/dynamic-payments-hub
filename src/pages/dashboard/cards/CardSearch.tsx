
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
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">卡片查询</h1>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Search size={18} className="text-blue-400" />
            </span>
            查询条件
          </CardTitle>
          <CardDescription className="text-blue-300">
            输入卡号或持卡人信息进行查询
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                placeholder="卡号 / 持卡人姓名 / 手机号" 
                className="pl-10 bg-blue-950/50 border-blue-800/50 text-white placeholder-blue-300/50 focus:ring-blue-500/50 focus:border-blue-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-900/30 border border-blue-500/30">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-purple-400" />
            </span>
            卡片列表
          </CardTitle>
          <CardDescription className="text-blue-300">
            查询结果显示
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/50">
                <Filter className="h-4 w-4" />
                <span>筛选</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/50">
                <Download className="h-4 w-4" />
                <span>导出</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-900/50">
                <RefreshCw className="h-4 w-4" />
                <span>刷新</span>
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-800/50 overflow-hidden">
            <Table>
              <TableCaption className="text-blue-300/50">卡片查询结果列表</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-800/50 hover:bg-transparent">
                  <TableHead className="text-white">卡号</TableHead>
                  <TableHead className="text-white">持卡人</TableHead>
                  <TableHead className="text-white">开卡日期</TableHead>
                  <TableHead className="text-white">状态</TableHead>
                  <TableHead className="text-white">余额</TableHead>
                  <TableHead className="text-white">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-blue-800/50 hover:bg-blue-900/30 transition-colors">
                  <TableCell className="font-medium text-white">5678 **** **** 1234</TableCell>
                  <TableCell className="text-white">张三</TableCell>
                  <TableCell className="text-white">2023-10-15</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300 border border-green-500/20">
                      正常
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥1,234.56</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="border-blue-600/60 text-white hover:bg-blue-900/50">详情</Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-blue-800/50 hover:bg-blue-900/30 transition-colors">
                  <TableCell className="font-medium text-white">4321 **** **** 5678</TableCell>
                  <TableCell className="text-white">李四</TableCell>
                  <TableCell className="text-white">2023-09-22</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300 border border-yellow-500/20">
                      待激活
                    </span>
                  </TableCell>
                  <TableCell className="text-white">¥0.00</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="border-blue-600/60 text-white hover:bg-blue-900/50">详情</Button>
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
