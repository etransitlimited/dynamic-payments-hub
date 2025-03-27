
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
import { Search, Plus, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const ActivationTasks = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">开卡任务</h1>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Search size={18} className="text-blue-400" />
            </span>
            查询条件
          </CardTitle>
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
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Search className="h-4 w-4" />
              <span>查询</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <CheckCircle size={18} className="text-green-400" />
            </span>
            开卡任务列表
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            所有已创建的开卡任务
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              <span>新建任务</span>
            </Button>
          </div>
          
          <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
            <CardContent className="p-0">
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
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                        <CheckCircle size={12} />
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
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                        <Clock size={12} />
                        处理中
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">AT-5421</TableCell>
                    <TableCell className="text-white">黑卡</TableCell>
                    <TableCell className="text-white">10</TableCell>
                    <TableCell className="text-white">2023-11-05</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-red-600/20 text-red-300">
                        <AlertTriangle size={12} />
                        已取消
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
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <AlertTriangle size={18} className="text-blue-400" />
            </span>
            任务说明
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            开卡任务相关信息和说明
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">任务状态说明</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>已完成 - 任务中的所有卡片已开通</li>
                  <li>处理中 - 任务正在执行，请耐心等待</li>
                  <li>已取消 - 任务已被取消或执行失败</li>
                  <li>已暂停 - 任务暂时停止处理</li>
                </ul>
              </div>
            </Card>
            
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">任务处理流程</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>创建任务后，系统将分配资源进行处理</li>
                  <li>处理时间取决于任务类型和数量</li>
                  <li>可以随时查看任务进度和详情</li>
                  <li>任务完成后会通过系统消息通知</li>
                </ul>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivationTasks;
