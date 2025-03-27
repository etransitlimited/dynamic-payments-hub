
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
import { Search, Plus } from "lucide-react";

const ActivationTasks = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">开卡任务</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>新建任务</span>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>查询条件</CardTitle>
          <CardDescription>输入任务ID或状态查询开卡任务</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input placeholder="任务ID / 状态" />
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
          <CardTitle>开卡任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>开卡任务列表</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>任务ID</TableHead>
                <TableHead>卡片类型</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">AT-8973</TableCell>
                <TableCell>标准卡</TableCell>
                <TableCell>50</TableCell>
                <TableCell>2023-11-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                    已完成
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">详情</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">AT-7645</TableCell>
                <TableCell>金卡</TableCell>
                <TableCell>20</TableCell>
                <TableCell>2023-11-10</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                    处理中
                  </span>
                </TableCell>
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

export default ActivationTasks;
