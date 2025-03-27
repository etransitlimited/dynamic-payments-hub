
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
        <h1 className="text-2xl font-bold tracking-tight">账户管理</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>创建账户</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>账户列表</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input placeholder="账户名称/ID/手机号" />
              <Button variant="outline" className="gap-2">
                <Search className="h-4 w-4" />
                <span>查询</span>
              </Button>
            </div>
          </div>
          
          <Table>
            <TableCaption>商户账户列表</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>账户名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>创建日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>M1001</TableCell>
                <TableCell className="font-medium">北京优卡科技有限公司</TableCell>
                <TableCell>企业</TableCell>
                <TableCell>2023-08-12</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    正常
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <UserCog className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">查看</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>M1002</TableCell>
                <TableCell className="font-medium">上海卡付支付科技</TableCell>
                <TableCell>企业</TableCell>
                <TableCell>2023-07-24</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                    已冻结
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <UserCog className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">查看</Button>
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
