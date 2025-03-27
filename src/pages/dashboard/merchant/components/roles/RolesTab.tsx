
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Shield 
} from "lucide-react";

const RolesTab = () => {
  return (
    <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center">
          <span className="bg-blue-500/20 p-2 rounded-full mr-2">
            <Shield size={18} className="text-blue-400" />
          </span>
          角色管理
        </CardTitle>
        <CardDescription className="text-blue-200/80">
          管理系统中的用户角色及权限
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-white text-sm">
            当前共有 <span className="text-blue-400 font-semibold">3</span> 个角色， 
            <span className="text-blue-400 font-semibold">10</span> 个用户
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            <span>创建角色</span>
          </Button>
        </div>
        
        <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
          <CardContent className="p-0">
            <Table>
              <TableCaption className="text-blue-200/50">当前系统中的所有角色</TableCaption>
              <TableHeader>
                <TableRow className="border-blue-900/50">
                  <TableHead className="text-white">角色名称</TableHead>
                  <TableHead className="text-white">描述</TableHead>
                  <TableHead className="text-white">权限数量</TableHead>
                  <TableHead className="text-white">用户数量</TableHead>
                  <TableHead className="text-white">创建时间</TableHead>
                  <TableHead className="text-white">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">管理员</TableCell>
                  <TableCell className="text-white">拥有系统所有权限</TableCell>
                  <TableCell className="text-white">所有</TableCell>
                  <TableCell className="text-white">2</TableCell>
                  <TableCell className="text-white">2023-08-15</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">财务</TableCell>
                  <TableCell className="text-white">财务相关操作权限</TableCell>
                  <TableCell className="text-white">部分</TableCell>
                  <TableCell className="text-white">3</TableCell>
                  <TableCell className="text-white">2023-08-20</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                  <TableCell className="font-medium text-white">客服</TableCell>
                  <TableCell className="text-white">客户服务相关权限</TableCell>
                  <TableCell className="text-white">部分</TableCell>
                  <TableCell className="text-white">5</TableCell>
                  <TableCell className="text-white">2023-09-05</TableCell>
                  <TableCell className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 mt-6">
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">角色配置注意事项</h3>
            <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
              <li>新创建的角色默认没有任何权限</li>
              <li>删除角色前需要确保该角色下没有用户</li>
              <li>修改角色权限将立即对所有该角色用户生效</li>
              <li>为保证系统安全，至少保留一个管理员角色</li>
            </ul>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RolesTab;
