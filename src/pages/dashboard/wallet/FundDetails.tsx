
import React from "react";
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
import { Search } from "lucide-react";

const FundDetails = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">资金明细</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">查询条件</CardTitle>
          <CardDescription className="text-blue-200/80">
            输入时间范围或交易类型查询资金流水
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="交易类型 / 交易号" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">资金流水明细</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption className="text-blue-200/50">所有资金交易记录</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
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
                <TableCell className="text-white">充值</TableCell>
                <TableCell className="text-green-300">+¥1,200.00</TableCell>
                <TableCell className="text-white">¥3,450.00</TableCell>
                <TableCell className="text-white">2023-11-25 14:32</TableCell>
                <TableCell className="text-white">支付宝充值</TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">FD-7645-2198</TableCell>
                <TableCell className="text-white">消费</TableCell>
                <TableCell className="text-red-300">-¥350.00</TableCell>
                <TableCell className="text-white">¥2,250.00</TableCell>
                <TableCell className="text-white">2023-11-20 09:45</TableCell>
                <TableCell className="text-white">购买服务</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetails;
