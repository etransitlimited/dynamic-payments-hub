
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, UserCog, User, Users } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getButtonClass, getCardClass, getIconContainerClass } from "@/styles/use-design-tokens";

const AccountManagement = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">账户管理</h1>
      </div>
      
      <Card className={getCardClass()}>
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className={getIconContainerClass('blue')}>
              <Users size={18} className="text-blue-400" />
            </span>
            账户列表
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            管理系统中的商户账户
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 w-full max-w-sm">
              <Input 
                placeholder="账户名称/ID/手机号" 
                className="bg-[#061428]/50 border-blue-900/50 text-white placeholder-blue-200/50"
              />
              <Button variant="outline" className={getButtonClass('outline')}>
                <Search className="h-4 w-4 mr-2" />
                <span>查询</span>
              </Button>
            </div>
            <Button className={getButtonClass('primary')}>
              <Plus className="h-4 w-4 mr-2" />
              <span>创建账户</span>
            </Button>
          </div>
          
          <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
            <CardContent className="p-0">
              <Table>
                <TableCaption className="text-blue-200/50">商户账户列表</TableCaption>
                <TableHeader>
                  <TableRow className="border-blue-900/50">
                    <TableHead className="text-white">ID</TableHead>
                    <TableHead className="text-white">账户名称</TableHead>
                    <TableHead className="text-white">类型</TableHead>
                    <TableHead className="text-white">创建日期</TableHead>
                    <TableHead className="text-white">状态</TableHead>
                    <TableHead className="text-white">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="text-white">M1001</TableCell>
                    <TableCell className="font-medium text-white">北京优卡科技有限公司</TableCell>
                    <TableCell className="text-white">企业</TableCell>
                    <TableCell className="text-white">2023-08-12</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-600/20 text-green-300">
                        正常
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">查看</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-blue-900/50 hover:bg-blue-900/20">
                    <TableCell className="text-white">M1002</TableCell>
                    <TableCell className="font-medium text-white">上海卡付支付科技</TableCell>
                    <TableCell className="text-white">企业</TableCell>
                    <TableCell className="text-white">2023-07-24</TableCell>
                    <TableCell>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-600/20 text-red-300">
                        已冻结
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-blue-600 text-white hover:bg-blue-900/20">
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-blue-600 text-white hover:bg-blue-900/20">查看</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      
      <Card className={getCardClass()}>
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <User size={18} className="text-green-400" />
            </span>
            账户管理指南
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            账户管理相关功能说明
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">账户类型</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>企业账户 - 适用于公司和组织</li>
                  <li>个人账户 - 适用于个体经营者</li>
                  <li>代理账户 - 适用于代理商和渠道商</li>
                  <li>服务商账户 - 适用于提供技术服务的合作伙伴</li>
                </ul>
              </div>
            </Card>
            
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">账户管理注意事项</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>新建账户需要通过实名认证和审核</li>
                  <li>账户冻结后将无法进行交易操作</li>
                  <li>超过90天未登录的账户将被自动锁定</li>
                  <li>账户信息变更需要提交相关证明材料</li>
                </ul>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountManagement;
