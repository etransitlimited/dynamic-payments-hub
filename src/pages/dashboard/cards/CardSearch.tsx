
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CardSearch = () => {
  return (
    <div className="space-y-6 bg-[#061428] min-h-screen p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">卡片查询</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">查询条件</CardTitle>
          <CardDescription className="text-blue-200/80">输入卡号或持卡人信息进行查询</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="卡号 / 持卡人姓名 / 手机号" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 text-white" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">卡片列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption className="text-blue-200/50">卡片查询结果列表</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
                <TableHead className="text-white">卡号</TableHead>
                <TableHead className="text-white">持卡人</TableHead>
                <TableHead className="text-white">开卡日期</TableHead>
                <TableHead className="text-white">状态</TableHead>
                <TableHead className="text-white">余额</TableHead>
                <TableHead className="text-white">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">5678 **** **** 1234</TableCell>
                <TableCell className="text-white">张三</TableCell>
                <TableCell className="text-white">2023-10-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    正常
                  </span>
                </TableCell>
                <TableCell className="text-white">¥1,234.56</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                </TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">4321 **** **** 5678</TableCell>
                <TableCell className="text-white">李四</TableCell>
                <TableCell className="text-white">2023-09-22</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                    待激活
                  </span>
                </TableCell>
                <TableCell className="text-white">¥0.00</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardSearch;
