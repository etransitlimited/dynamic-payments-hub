
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">卡片查询</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>查询条件</CardTitle>
          <CardDescription>输入卡号或持卡人信息进行查询</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="卡号 / 持卡人姓名 / 手机号" />
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
          <CardTitle>卡片列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>卡片查询结果列表</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>卡号</TableHead>
                <TableHead>持卡人</TableHead>
                <TableHead>开卡日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>余额</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">5678 **** **** 1234</TableCell>
                <TableCell>张三</TableCell>
                <TableCell>2023-10-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    正常
                  </span>
                </TableCell>
                <TableCell>¥1,234.56</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">详情</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">4321 **** **** 5678</TableCell>
                <TableCell>李四</TableCell>
                <TableCell>2023-09-22</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                    待激活
                  </span>
                </TableCell>
                <TableCell>¥0.00</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">详情</Button>
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
