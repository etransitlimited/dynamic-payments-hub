
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
      <h1 className="text-2xl font-bold tracking-tight">资金明细</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>查询条件</CardTitle>
          <CardDescription>
            输入时间范围或交易类型查询资金流水
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="交易类型 / 交易号" />
            </div>
            <Button className="gap-2">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>资金流水明细</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>所有资金交易记录</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>交易号</TableHead>
                <TableHead>交易类型</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>余额</TableHead>
                <TableHead>交易时间</TableHead>
                <TableHead>备注</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">FD-8973-4610</TableCell>
                <TableCell>充值</TableCell>
                <TableCell className="text-green-600">+¥1,200.00</TableCell>
                <TableCell>¥3,450.00</TableCell>
                <TableCell>2023-11-25 14:32</TableCell>
                <TableCell>支付宝充值</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">FD-7645-2198</TableCell>
                <TableCell>消费</TableCell>
                <TableCell className="text-red-600">-¥350.00</TableCell>
                <TableCell>¥2,250.00</TableCell>
                <TableCell>2023-11-20 09:45</TableCell>
                <TableCell>购买服务</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundDetails;
