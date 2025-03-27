
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
    <div className="space-y-6 bg-[#061428] min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">开卡任务</h1>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 text-white" />
          <span>新建任务</span>
        </Button>
      </div>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">查询条件</CardTitle>
          <CardDescription className="text-blue-200/80">
            输入任务ID或状态查询开卡任务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input 
                placeholder="任务ID / 状态" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50" 
              />
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 text-white" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/80 backdrop-blur-sm border-blue-900/50 text-white">
        <CardHeader>
          <CardTitle className="text-white">开卡任务列表</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption className="text-blue-200/50">开卡任务列表</TableCaption>
            <TableHeader>
              <TableRow className="border-blue-900/50">
                <TableHead className="text-white">任务ID</TableHead>
                <TableHead className="text-white">卡片类型</TableHead>
                <TableHead className="text-white">数量</TableHead>
                <TableHead className="text-white">创建时间</TableHead>
                <TableHead className="text-white">状态</TableHead>
                <TableHead className="text-white">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">AT-8973</TableCell>
                <TableCell className="text-white">标准卡</TableCell>
                <TableCell className="text-white">50</TableCell>
                <TableCell className="text-white">2023-11-15</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                    已完成
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                </TableCell>
              </TableRow>
              <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                <TableCell className="font-medium text-white">AT-7645</TableCell>
                <TableCell className="text-white">金卡</TableCell>
                <TableCell className="text-white">20</TableCell>
                <TableCell className="text-white">2023-11-10</TableCell>
                <TableCell>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                    处理中
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
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
