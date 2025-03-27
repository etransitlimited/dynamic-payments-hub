
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserPlus, 
  Filter, 
  MoreHorizontal, 
  UserCog,
  Mail,
  Lock,
  UserX
} from "lucide-react";
import { Label } from "@/components/ui/label";

const UsersManagementPage = () => {
  // Sample user data
  const users = [
    {
      id: "USER-1001",
      name: "张三",
      email: "zhangsan@example.com",
      role: "管理员",
      status: "活跃",
      regDate: "2023-01-15",
      lastLogin: "2023-07-28 09:45:12",
    },
    {
      id: "USER-1002",
      name: "李四",
      email: "lisi@example.com",
      role: "用户",
      status: "活跃",
      regDate: "2023-02-22",
      lastLogin: "2023-07-27 16:32:45",
    },
    {
      id: "USER-1003",
      name: "王五",
      email: "wangwu@example.com",
      role: "用户",
      status: "未激活",
      regDate: "2023-03-10",
      lastLogin: "2023-07-25 11:28:33",
    },
    {
      id: "USER-1004",
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "商户",
      status: "活跃",
      regDate: "2023-04-05",
      lastLogin: "2023-07-28 08:15:22",
    },
    {
      id: "USER-1005",
      name: "钱七",
      email: "qianqi@example.com",
      role: "用户",
      status: "已禁用",
      regDate: "2023-05-12",
      lastLogin: "2023-07-15 14:22:51",
    },
    {
      id: "USER-1006",
      name: "孙八",
      email: "sunba@example.com",
      role: "用户",
      status: "活跃",
      regDate: "2023-06-18",
      lastLogin: "2023-07-26 19:11:05",
    },
    {
      id: "USER-1007",
      name: "周九",
      email: "zhoujiu@example.com",
      role: "用户",
      status: "活跃",
      regDate: "2023-06-30",
      lastLogin: "2023-07-27 21:43:18",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "活跃":
        return "bg-green-500/20 text-green-500";
      case "未激活":
        return "bg-yellow-500/20 text-yellow-500";
      case "已禁用":
        return "bg-red-500/20 text-red-500";
      default:
        return "bg-blue-500/20 text-blue-500";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "管理员":
        return "bg-purple-500/20 text-purple-500";
      case "商户":
        return "bg-blue-500/20 text-blue-500";
      case "用户":
        return "bg-green-500/20 text-green-500";
      default:
        return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <div className="container mx-auto p-6 text-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">用户管理</h1>
        <p className="text-blue-300">管理系统用户、角色和权限</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">总用户数</CardTitle>
            <CardDescription className="text-blue-300">
              系统中的所有用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12,854</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">活跃用户</CardTitle>
            <CardDescription className="text-blue-300">
              最近30天活跃用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,273</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">管理员</CardTitle>
            <CardDescription className="text-blue-300">
              系统管理员数量
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">新增用户</CardTitle>
            <CardDescription className="text-blue-300">
              本月新增用户
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">352</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 mb-6">
        <CardHeader>
          <CardTitle className="text-xl">用户筛选</CardTitle>
          <CardDescription className="text-blue-300">
            搜索和筛选用户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user-name">用户名称</Label>
              <Input
                id="user-name"
                placeholder="输入用户名或邮箱"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user-role">用户角色</Label>
              <Input
                id="user-role"
                placeholder="选择用户角色"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="user-status">用户状态</Label>
              <Input
                id="user-status"
                placeholder="选择用户状态"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="reg-date">注册日期</Label>
              <Input
                id="reg-date"
                placeholder="选择日期范围"
                className="bg-blue-950/50 border-blue-800"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" className="border-blue-700 text-blue-400">
              <Filter className="mr-2 h-4 w-4" />
              重置筛选
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-4 w-4" />
              搜索
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">用户列表</CardTitle>
              <CardDescription className="text-blue-300">
                管理所有系统用户
              </CardDescription>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="mr-2 h-4 w-4" /> 添加用户
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-blue-800 hover:bg-transparent">
                  <TableHead className="text-blue-300">用户ID</TableHead>
                  <TableHead className="text-blue-300">用户名</TableHead>
                  <TableHead className="text-blue-300">邮箱</TableHead>
                  <TableHead className="text-blue-300">角色</TableHead>
                  <TableHead className="text-blue-300">状态</TableHead>
                  <TableHead className="text-blue-300">注册日期</TableHead>
                  <TableHead className="text-blue-300">最后登录</TableHead>
                  <TableHead className="text-blue-300">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-blue-800/50 hover:bg-blue-900/20"
                  >
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getRoleColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.regDate}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-blue-400"
                          title="编辑用户"
                        >
                          <UserCog className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-blue-400"
                          title="发送邮件"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-blue-400"
                          title="重置密码"
                        >
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-blue-800 text-red-400"
                          title="禁用用户"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-blue-300">显示 1-7 共 354 条记录</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
                disabled
              >
                上一页
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 bg-blue-800/50 text-white"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-800 text-blue-300"
              >
                下一页
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagementPage;
