
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
      <h1 className="text-2xl font-bold tracking-tight">充值记录</h1>
      
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">查询条件</CardTitle>
          <CardDescription>
            输入时间范围或交易号查询充值记录
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="交易号 / 订单号" />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">充值记录列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>所有充值交易记录</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>交易号</TableHead>
                <TableHead>充值金额</TableHead>
                <TableHead>支付方式</TableHead>
                <TableHead>充值时间</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">TX-8973-4610</TableCell>
                <TableCell>¥1,200.00</TableCell>
                <TableCell>支付宝</TableCell>
                <TableCell>2023-11-25 14:32</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    已完成
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">TX-7645-2198</TableCell>
                <TableCell>¥500.00</TableCell>
                <TableCell>微信支付</TableCell>
                <TableCell>2023-11-20 09:45</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    已完成
                  </span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">TX-6329-7501</TableCell>
                <TableCell>¥2,000.00</TableCell>
                <TableCell>银行转账</TableCell>
                <TableCell>2023-11-18 10:22</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
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
