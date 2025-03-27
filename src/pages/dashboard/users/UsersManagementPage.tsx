
import React from "react";
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
  Download 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UsersManagementPage = () => {
  // Mock user data
  const users = [
    { id: 1, name: "张三", email: "zhang.san@example.com", role: "普通用户", status: "活跃", registerDate: "2023-05-12" },
    { id: 2, name: "李四", email: "li.si@example.com", role: "VIP用户", status: "活跃", registerDate: "2023-06-18" },
    { id: 3, name: "王五", email: "wang.wu@example.com", role: "普通用户", status: "未激活", registerDate: "2023-07-25" },
    { id: 4, name: "赵六", email: "zhao.liu@example.com", role: "普通用户", status: "禁用", registerDate: "2023-08-30" },
    { id: 5, name: "钱七", email: "qian.qi@example.com", role: "VIP用户", status: "活跃", registerDate: "2023-09-15" },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">用户管理</h1>
        <p className="text-blue-300">管理平台所有用户账户</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
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

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <UserCheck className="mr-2 text-blue-400" size={20} />
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

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <UserX className="mr-2 text-blue-400" size={20} />
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

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              用户列表
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-400" />
                <Input
                  type="search"
                  placeholder="搜索用户..."
                  className="w-full md:w-[300px] pl-8 bg-blue-950/50 border-blue-800 text-white placeholder:text-blue-400/70"
                />
              </div>
              <Button variant="outline" size="icon" className="border-blue-800 bg-blue-950/50 text-blue-400 hover:bg-blue-800 hover:text-white">
                <Filter size={18} />
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus className="h-4 w-4" />
                <span>添加用户</span>
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            管理所有用户账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">姓名</th>
                  <th className="text-left p-3">邮箱</th>
                  <th className="text-left p-3">用户类型</th>
                  <th className="text-left p-3">状态</th>
                  <th className="text-left p-3">注册日期</th>
                  <th className="text-right p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                    <td className="p-3 font-medium">#{user.id.toString().padStart(5, '0')}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.role === "VIP用户" ? "bg-purple-900/60 text-purple-200" : 
                          "bg-blue-900/60 text-blue-200"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.status === "活跃" ? "bg-green-900/60 text-green-200" : 
                          user.status === "未激活" ? "bg-yellow-900/60 text-yellow-200" : 
                          "bg-red-900/60 text-red-200"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">{user.registerDate}</td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-white hover:bg-blue-800">
                        详情
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button variant="outline" className="gap-2 border-blue-600 text-white hover:bg-blue-800 hover:text-white">
          <Download className="h-4 w-4" />
          导出用户数据
        </Button>
      </div>
    </div>
  );
};

export default UsersManagementPage;
