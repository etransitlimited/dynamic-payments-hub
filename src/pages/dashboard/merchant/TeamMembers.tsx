
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Users, UserCog, AtSign } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeamMembers = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">团队成员</h1>
      </div>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Users size={18} className="text-blue-400" />
            </span>
            团队成员管理
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            管理您的团队成员和访问权限
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="搜索成员名称或邮箱" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
              <Button variant="outline" className="gap-2 border-blue-600 text-white hover:bg-blue-900/20">
                <Search className="h-4 w-4" />
                <span>搜索</span>
              </Button>
            </div>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4" />
              <span>添加成员</span>
            </Button>
          </div>
          
          <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
            <CardContent className="p-0">
              <Table>
                <TableCaption className="text-blue-200/50">团队成员列表</TableCaption>
                <TableHeader>
                  <TableRow className="border-blue-900/50">
                    <TableHead className="text-white">成员姓名</TableHead>
                    <TableHead className="text-white">邮箱</TableHead>
                    <TableHead className="text-white">角色</TableHead>
                    <TableHead className="text-white">加入时间</TableHead>
                    <TableHead className="text-white">状态</TableHead>
                    <TableHead className="text-white">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">张三</TableCell>
                    <TableCell className="text-white">zhang.san@example.com</TableCell>
                    <TableCell className="text-white">管理员</TableCell>
                    <TableCell className="text-white">2023-09-12</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                        活跃
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">李四</TableCell>
                    <TableCell className="text-white">li.si@example.com</TableCell>
                    <TableCell className="text-white">财务</TableCell>
                    <TableCell className="text-white">2023-10-05</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                        活跃
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">详情</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="font-medium text-white">王五</TableCell>
                    <TableCell className="text-white">wang.wu@example.com</TableCell>
                    <TableCell className="text-white">客服</TableCell>
                    <TableCell className="text-white">2023-11-18</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-600/20 text-yellow-300">
                        闲置
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                        <UserCog className="h-4 w-4" />
                      </Button>
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
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <AtSign size={18} className="text-green-400" />
            </span>
            团队管理指南
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            团队成员管理相关说明
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">成员权限说明</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>管理员可以管理所有系统功能和用户</li>
                  <li>财务角色可以查看和处理财务相关事项</li>
                  <li>客服角色可以处理客户问题和查询</li>
                  <li>每个成员可以被分配不同的角色</li>
                </ul>
              </div>
            </Card>
            
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">团队成员管理须知</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>新成员添加后需要邮箱验证</li>
                  <li>删除成员前请确保其工作已交接</li>
                  <li>角色权限更改将立即生效</li>
                  <li>团队成员闲置状态超过90天将自动锁定</li>
                </ul>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamMembers;
