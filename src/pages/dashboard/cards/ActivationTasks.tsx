
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { CreditCard, Search, CheckCircle2, XCircle, Clock, Filter, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

// Dummy data for the activation tasks
const dummyTasks = [
  { 
    id: "ACT-001", 
    cardNumber: "**** **** **** 4532", 
    cardType: "标准卡", 
    task: "身份验证", 
    status: "pending", 
    createdAt: "2023-11-18" 
  },
  { 
    id: "ACT-002", 
    cardNumber: "**** **** **** 7821", 
    cardType: "金卡", 
    task: "激活码验证", 
    status: "completed", 
    createdAt: "2023-11-15" 
  },
  { 
    id: "ACT-003", 
    cardNumber: "**** **** **** 9635", 
    cardType: "白金卡", 
    task: "绑定手机号", 
    status: "failed", 
    createdAt: "2023-11-14" 
  },
  { 
    id: "ACT-004", 
    cardNumber: "**** **** **** 2514", 
    cardType: "标准卡", 
    task: "设置密码", 
    status: "pending", 
    createdAt: "2023-11-12" 
  },
  { 
    id: "ACT-005", 
    cardNumber: "**** **** **** 6374", 
    cardType: "金卡", 
    task: "实名认证", 
    status: "completed", 
    createdAt: "2023-11-10" 
  }
];

const ActivationTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { t } = useLanguage();
  
  // Filter tasks based on search term and status filter
  const filteredTasks = dummyTasks.filter(task => {
    const matchesSearch = 
      task.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.task.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1">
            <CheckCircle2 size={14} />
            已完成
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1">
            <Clock size={14} />
            处理中
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1">
            <XCircle size={14} />
            失败
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">开卡任务</h1>
      </div>
      
      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <CreditCard size={18} className="text-blue-400" />
            </span>
            开卡任务列表
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            管理您的卡片激活任务
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <Input 
                placeholder="搜索任务ID或卡号" 
                className="pl-10 bg-[#061428]/70 border-blue-900/50 text-white placeholder-blue-300/40"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`flex items-center gap-1.5 border-blue-600/40 text-white ${statusFilter === 'all' ? 'bg-blue-600/20' : 'bg-transparent'}`}
                onClick={() => setStatusFilter("all")}
              >
                <Filter size={16} />
                全部
              </Button>
              <Button 
                variant="outline" 
                className={`flex items-center gap-1.5 border-green-600/40 text-white ${statusFilter === 'completed' ? 'bg-green-600/20' : 'bg-transparent'}`}
                onClick={() => setStatusFilter("completed")}
              >
                <CheckCircle2 size={16} />
                已完成
              </Button>
              <Button 
                variant="outline" 
                className={`flex items-center gap-1.5 border-yellow-600/40 text-white ${statusFilter === 'pending' ? 'bg-yellow-600/20' : 'bg-transparent'}`}
                onClick={() => setStatusFilter("pending")}
              >
                <Clock size={16} />
                处理中
              </Button>
              <Button 
                variant="outline" 
                className={`flex items-center gap-1.5 border-red-600/40 text-white ${statusFilter === 'failed' ? 'bg-red-600/20' : 'bg-transparent'}`}
                onClick={() => setStatusFilter("failed")}
              >
                <XCircle size={16} />
                失败
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border border-blue-900/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-blue-950/50">
                <TableRow className="hover:bg-blue-900/20 border-blue-900/50">
                  <TableHead className="text-blue-200 font-medium">任务ID</TableHead>
                  <TableHead className="text-blue-200 font-medium">卡号</TableHead>
                  <TableHead className="text-blue-200 font-medium">卡片类型</TableHead>
                  <TableHead className="text-blue-200 font-medium">任务</TableHead>
                  <TableHead className="text-blue-200 font-medium">状态</TableHead>
                  <TableHead className="text-blue-200 font-medium">创建日期</TableHead>
                  <TableHead className="text-blue-200 font-medium text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id} className="hover:bg-blue-900/20 border-blue-900/50">
                      <TableCell className="text-blue-100 font-medium">{task.id}</TableCell>
                      <TableCell className="text-blue-100">
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} className="text-blue-400" />
                          {task.cardNumber}
                        </div>
                      </TableCell>
                      <TableCell className="text-blue-100">{task.cardType}</TableCell>
                      <TableCell className="text-blue-100">{task.task}</TableCell>
                      <TableCell>{renderStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-blue-100">{task.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye size={16} className="text-blue-200" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-blue-200">
                      没有找到符合条件的开卡任务
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="relative z-10 border-t border-blue-900/50 pt-4 mt-2">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-blue-200">
              显示 {filteredTasks.length} 个任务 (共 {dummyTasks.length} 个)
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              创建新任务
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ActivationTasks;
