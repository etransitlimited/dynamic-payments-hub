
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, UserCog } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AccountManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">账户管理</h1>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          <span>创建账户</span>
        </Button>
      </div>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">账户列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="账户名称/ID/手机号" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
              <Button variant="outline" className="gap-2 border-blue-600 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <Table>
            <TableCaption className="text-blue-200/50">商户账户列表</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">账户名称</TableHead>
                <TableHead className="text-white">类型</TableHead>
                <TableHead className="text-white">创建日期</TableHead>
                <TableHead className="text-white">状态</TableHead>
                <TableHead className="text-white">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="text-white">M1001</TableCell>
                <TableCell className="font-medium text-white">北京优卡科技有限公司</TableCell>
                <TableCell className="text-white">企业</TableCell>
                <TableCell className="text-white">2023-08-12</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    正常
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                    <UserCog className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">查看</Button>
                </TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="text-white">M1002</TableCell>
                <TableCell className="font-medium text-white">上海卡付支付科技</TableCell>
                <TableCell className="text-white">企业</TableCell>
                <TableCell className="text-white">2023-07-24</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-600/20 text-red-300">
                    已冻结
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                    <UserCog className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">查看</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManagement;
