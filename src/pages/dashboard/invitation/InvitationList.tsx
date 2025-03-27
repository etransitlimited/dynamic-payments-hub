
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Copy } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InvitationList = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">邀请列表</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>我的邀请码</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-muted p-3 rounded-md font-mono text-lg flex-1">
              INV-8521-4796
            </div>
            <Button variant="outline" className="gap-2">
              <Copy className="h-4 w-4" />
              <span>复制</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>邀请记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input placeholder="用户名/手机号" />
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <Table>
            <TableCaption>邀请用户列表</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>被邀请人</TableHead>
                <TableHead>注册时间</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>返点金额</TableHead>
                <TableHead>累计交易</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">王五</TableCell>
                <TableCell>2023-11-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    已激活
                  </span>
                </TableCell>
                <TableCell>¥132.50</TableCell>
                <TableCell>¥2,650.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">赵六</TableCell>
                <TableCell>2023-11-02</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                    待激活
                  </span>
                </TableCell>
                <TableCell>¥0.00</TableCell>
                <TableCell>¥0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationList;
