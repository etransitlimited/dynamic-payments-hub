
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  UserPlus, 
  Users, 
  UserCheck, 
  UserX, 
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Calendar,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UsersManagementPage = () => {
  // Mock user data
  const users = [
    { id: 1, name: "张三", email: "zhang.san@example.com", role: "普通用户", status: "活跃", registerDate: "2023-05-12" },
    { id: 2, name: "李四", email: "li.si@example.com", role: "VIP用户", status: "活跃", registerDate: "2023-06-18" },
    { id: 3, name: "王五", email: "wang.wu@example.com", role: "普通用户", status: "未激活", registerDate: "2023-07-25" },
    { id: 4, name: "赵六", email: "zhao.liu@example.com", role: "普通用户", status: "禁用", registerDate: "2023-08-30" },
    { id: 5, name: "钱七", email: "qian.qi@example.com", role: "VIP用户", status: "活跃", registerDate: "2023-09-15" },
    { id: 6, name: "孙八", email: "sun.ba@example.com", role: "普通用户", status: "活跃", registerDate: "2023-10-05" },
    { id: 7, name: "周九", email: "zhou.jiu@example.com", role: "VIP用户", status: "活跃", registerDate: "2023-11-12" },
    { id: 8, name: "吴十", email: "wu.shi@example.com", role: "普通用户", status: "未激活", registerDate: "2023-12-20" },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Filter users based on search query, role, and status
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      selectedRole === "all" || 
      user.role === (selectedRole === "vip" ? "VIP用户" : "普通用户");
    
    const matchesStatus = 
      selectedStatus === "all" || 
      user.status === (
        selectedStatus === "active" ? "活跃" : 
        selectedStatus === "inactive" ? "未激活" : "禁用"
      );
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto text-white">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight">用户管理</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Users size={18} className="text-blue-400" />
              </span>
              总用户数
            </CardTitle>
            <CardDescription className="text-blue-300">
              平台所有注册用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">25,642</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <UserCheck size={18} className="text-blue-400" />
              </span>
              活跃用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              本月活跃用户数
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18,329</div>
          </CardContent>
        </Card>

        <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <UserX size={18} className="text-blue-400" />
              </span>
              新增用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              本月新增用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,243</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10 mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="bg-blue-500/20 p-2 rounded-full mr-2">
                <Users size={18} className="text-blue-400" />
              </span>
              用户列表
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            查看和管理所有平台用户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder="搜索用户名或邮箱..."
                  className="pl-10 bg-[#061428]/50 border-blue-900/50 text-white placeholder:text-blue-400/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[140px] bg-[#061428]/50 border-blue-900/50 text-white">
                  <SelectValue placeholder="用户类型" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                  <SelectItem value="all">所有类型</SelectItem>
                  <SelectItem value="regular">普通用户</SelectItem>
                  <SelectItem value="vip">VIP用户</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px] bg-[#061428]/50 border-blue-900/50 text-white">
                  <SelectValue placeholder="用户状态" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F2643] border-blue-900/50 text-white">
                  <SelectItem value="all">所有状态</SelectItem>
                  <SelectItem value="active">活跃</SelectItem>
                  <SelectItem value="inactive">未激活</SelectItem>
                  <SelectItem value="disabled">禁用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2 border-blue-800 bg-[#061428]/50 text-white hover:bg-blue-900">
                <Filter size={16} />
                <span>高级筛选</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-800 bg-[#061428]/50 text-white hover:bg-blue-900">
                <Calendar size={16} />
                <span>按日期</span>
              </Button>
              <Button variant="outline" className="gap-2 border-blue-800 bg-[#061428]/50 text-white hover:bg-blue-900">
                <RefreshCw size={16} />
                <span>刷新</span>
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus size={16} />
                <span>添加用户</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto rounded-md border border-blue-900/50">
            <Table>
              <TableHeader className="bg-[#061428]/70">
                <TableRow className="border-blue-900/50 hover:bg-transparent">
                  <TableHead className="text-left text-white">ID</TableHead>
                  <TableHead className="text-left text-white">姓名</TableHead>
                  <TableHead className="text-left text-white">邮箱</TableHead>
                  <TableHead className="text-left text-white">用户类型</TableHead>
                  <TableHead className="text-left text-white">状态</TableHead>
                  <TableHead className="text-left text-white">注册日期</TableHead>
                  <TableHead className="text-right text-white">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id} className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">#{user.id.toString().padStart(5, '0')}</TableCell>
                    <TableCell className="text-white">{user.name}</TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.role === "VIP用户" ? "bg-purple-900/60 text-purple-200" : 
                          "bg-blue-900/60 text-blue-200"}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.status === "活跃" ? "bg-green-900/60 text-green-200" : 
                          user.status === "未激活" ? "bg-yellow-900/60 text-yellow-200" : 
                          "bg-red-900/60 text-red-200"}`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-white">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-blue-400" />
                        {user.registerDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-400 hover:text-white hover:bg-blue-800">
                          <Edit size={14} />
                          编辑
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-blue-400 hover:text-white hover:bg-blue-800">
                          <Eye size={14} />
                          详情
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={`text-blue-400 hover:text-white hover:bg-blue-900/50 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} 
                  />
                </PaginationItem>
                
                {pageNumbers.map(number => (
                  <PaginationItem key={number}>
                    <PaginationLink 
                      onClick={() => handlePageChange(number)}
                      isActive={currentPage === number}
                      className={currentPage === number ? "bg-blue-600 text-white" : "text-blue-400 hover:text-white hover:bg-blue-900/50"}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                {totalPages > 5 && <PaginationEllipsis className="text-blue-400" />}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={`text-blue-400 hover:text-white hover:bg-blue-900/50 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" className="gap-2 border-blue-600/60 text-white hover:bg-blue-800">
          <Download className="h-4 w-4" />
          导出用户数据
        </Button>
      </div>
    </div>
  );
};

export default UsersManagementPage;
