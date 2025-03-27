
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
      <h1 className="text-2xl font-bold tracking-tight text-white">邀请列表</h1>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">我的邀请码</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="bg-[#061428]/80 p-3 rounded-md font-mono text-lg flex-1 text-blue-200">
              INV-8521-4796
            </div>
            <Button variant="outline" className="gap-2 border-blue-600 text-white hover:bg-blue-900/20">
              <Copy className="h-4 w-4" />
              <span>复制</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">邀请记录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="用户名/手机号" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
              <Button variant="outline" className="gap-2 border-blue-600 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <Table>
            <TableCaption className="text-blue-200/50">邀请用户列表</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
                <TableHead className="text-white">被邀请人</TableHead>
                <TableHead className="text-white">注册时间</TableHead>
                <TableHead className="text-white">状态</TableHead>
                <TableHead className="text-white">返点金额</TableHead>
                <TableHead className="text-white">累计交易</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">王五</TableCell>
                <TableCell className="text-white">2023-11-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    已激活
                  </span>
                </TableCell>
                <TableCell className="text-white">¥132.50</TableCell>
                <TableCell className="text-white">¥2,650.00</TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">赵六</TableCell>
                <TableCell className="text-white">2023-11-02</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                    待激活
                  </span>
                </TableCell>
                <TableCell className="text-white">¥0.00</TableCell>
                <TableCell className="text-white">¥0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvitationList;
