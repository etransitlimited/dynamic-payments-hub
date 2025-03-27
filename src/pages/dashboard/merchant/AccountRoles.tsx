
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";

const AccountRoles = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">账户角色</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>创建角色</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>角色列表</CardTitle>
          <CardDescription>管理系统中的用户角色及权限</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>当前系统中的所有角色</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>角色名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>权限数量</TableHead>
                <TableHead>用户数量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">管理员</TableCell>
                <TableCell>拥有系统所有权限</TableCell>
                <TableCell>所有</TableCell>
                <TableCell>2</TableCell>
                <TableCell>2023-08-15</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">财务</TableCell>
                <TableCell>财务相关操作权限</TableCell>
                <TableCell>部分</TableCell>
                <TableCell>3</TableCell>
                <TableCell>2023-08-20</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">客服</TableCell>
                <TableCell>客户服务相关权限</TableCell>
                <TableCell>部分</TableCell>
                <TableCell>5</TableCell>
                <TableCell>2023-09-05</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRoles;
