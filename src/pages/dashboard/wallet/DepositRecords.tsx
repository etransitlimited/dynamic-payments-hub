
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

const DepositRecords = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">充值记录</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">查询条件</CardTitle>
          <CardDescription className="text-blue-200/80">
            输入时间范围或交易号查询充值记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="交易号 / 订单号" 
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
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-white">充值记录列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption className="text-blue-200/50">所有充值交易记录</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
                <TableHead className="text-white">交易号</TableHead>
                <TableHead className="text-white">充值金额</TableHead>
                <TableHead className="text-white">支付方式</TableHead>
                <TableHead className="text-white">充值时间</TableHead>
                <TableHead className="text-white">状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">TX-8973-4610</TableCell>
                <TableCell className="text-white">¥1,200.00</TableCell>
                <TableCell className="text-white">支付宝</TableCell>
                <TableCell className="text-white">2023-11-25 14:32</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    已完成
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">TX-7645-2198</TableCell>
                <TableCell className="text-white">¥500.00</TableCell>
                <TableCell className="text-white">微信支付</TableCell>
                <TableCell className="text-white">2023-11-20 09:45</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    已完成
                  </span>
                </TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">TX-6329-7501</TableCell>
                <TableCell className="text-white">¥2,000.00</TableCell>
                <TableCell className="text-white">银行转账</TableCell>
                <TableCell className="text-white">2023-11-18 10:22</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    已完成
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositRecords;
