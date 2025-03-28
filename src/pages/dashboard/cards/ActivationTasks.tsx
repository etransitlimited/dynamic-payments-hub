
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Task } from "./types";
import TasksTable from "./components/TasksTable";
import TaskFilters from "./components/TaskFilters";
import TaskSearchInput from "./components/TaskSearchInput";

// Dummy data for the activation tasks
const dummyTasks: Task[] = [
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
            <TaskSearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <TaskFilters statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
          </div>
          
          <TasksTable tasks={filteredTasks} />
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
