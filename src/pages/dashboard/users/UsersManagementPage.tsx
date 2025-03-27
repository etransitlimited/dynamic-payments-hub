
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Filter, UserPlus, Settings, Users, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UsersManagementPage = () => {
  // Mock user data
  const users = [
    { id: 1, name: "王小明", email: "xiaoming@example.com", phone: "136****1234", role: "管理员", status: "活跃" },
    { id: 2, name: "李华", email: "lihua@example.com", phone: "139****5678", role: "商户", status: "活跃" },
    { id: 3, name: "张三", email: "zhangsan@example.com", phone: "135****2468", role: "用户", status: "停用" },
    { id: 4, name: "李四", email: "lisi@example.com", phone: "138****1357", role: "商户", status: "活跃" },
    { id: 5, name: "陈明", email: "chenming@example.com", phone: "137****9876", role: "用户", status: "活跃" },
  ];

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">用户管理</h1>
        <p className="text-blue-300">管理平台用户、权限和账户设置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Users className="mr-2 text-blue-400" size={20} />
              总用户数
            </CardTitle>
            <CardDescription className="text-blue-300">
              平台注册的所有用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,854</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <UserPlus className="mr-2 text-blue-400" size={20} />
              新增用户
            </CardTitle>
            <CardDescription className="text-blue-300">
              本月新注册用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">356</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <Settings className="mr-2 text-blue-400" size={20} />
              用户活跃度
            </CardTitle>
            <CardDescription className="text-blue-300">
              30天平均活跃用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">68%</div>
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
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <UserPlus size={18} className="mr-2" />
                添加用户
              </Button>
            </div>
          </CardTitle>
          <CardDescription className="text-blue-300">
            管理并监控平台所有用户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-800">
                  <th className="text-left p-3">用户名</th>
                  <th className="text-left p-3 hidden md:table-cell">邮箱</th>
                  <th className="text-left p-3 hidden lg:table-cell">手机号</th>
                  <th className="text-left p-3">角色</th>
                  <th className="text-left p-3">状态</th>
                  <th className="text-right p-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-blue-800/50 hover:bg-blue-900/20">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td className="p-3 hidden md:table-cell">
                      <div className="flex items-center">
                        <Mail size={14} className="mr-2 text-blue-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <div className="flex items-center">
                        <Phone size={14} className="mr-2 text-blue-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.role === "管理员" ? "bg-purple-900/60 text-purple-200" : 
                          user.role === "商户" ? "bg-blue-900/60 text-blue-200" : 
                          "bg-green-900/60 text-green-200"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${user.status === "活跃" ? "bg-green-900/60 text-green-200" : 
                        "bg-red-900/60 text-red-200"}`}>
                        {user.status}
                      </span>
                    </td>
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

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 text-blue-400" size={20} />
            用户设置
          </CardTitle>
          <CardDescription className="text-blue-300">
            管理用户权限和安全设置
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <Settings size={18} className="mr-2" />
              权限配置
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <Settings size={18} className="mr-2" />
              安全策略
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <Settings size={18} className="mr-2" />
              用户组管理
            </Button>
            <Button variant="outline" className="justify-start border-blue-800 hover:bg-blue-800 hover:text-white text-blue-300">
              <Settings size={18} className="mr-2" />
              登录设置
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementPage;
