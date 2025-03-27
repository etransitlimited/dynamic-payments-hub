
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield, 
  Users, 
  Search, 
  UserCog, 
  AtSign, 
  Settings, 
  Lock, 
  ShieldCheck, 
  Save 
} from "lucide-react";

const AccountRoles = () => {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">账户与权限管理</h1>
      </div>
      
      <Tabs defaultValue="roles" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6 bg-[#061428]/70">
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600 text-white">角色管理</TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-blue-600 text-white">团队成员</TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-blue-600 text-white">权限设置</TabsTrigger>
        </TabsList>
        
        {/* Roles Tab */}
        <TabsContent value="roles">
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
        </TabsContent>
        
        {/* Team Members Tab */}
        <TabsContent value="members">
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
              
              <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 mt-6">
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
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <span className="bg-purple-500/20 p-2 rounded-full mr-2">
                  <Settings size={18} className="text-purple-400" />
                </span>
                权限配置
              </CardTitle>
              <CardDescription className="text-blue-200/80">
                管理不同角色的系统权限
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="admin" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6 bg-[#061428]/70">
                  <TabsTrigger value="admin" className="data-[state=active]:bg-blue-600 text-white">管理员</TabsTrigger>
                  <TabsTrigger value="finance" className="data-[state=active]:bg-blue-600 text-white">财务</TabsTrigger>
                  <TabsTrigger value="service" className="data-[state=active]:bg-blue-600 text-white">客服</TabsTrigger>
                </TabsList>
                
                <TabsContent value="admin">
                  <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">系统管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">用户管理</Label>
                                <p className="text-sm text-blue-200/70">创建、编辑和删除系统用户</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">角色管理</Label>
                                <p className="text-sm text-blue-200/70">创建和管理系统角色</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">配置系统设置</Label>
                                <p className="text-sm text-blue-200/70">更改系统基本配置</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">业务管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">卡片管理</Label>
                                <p className="text-sm text-blue-200/70">管理虚拟卡的所有操作</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">财务操作</Label>
                                <p className="text-sm text-blue-200/70">执行充值、提现等财务操作</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">报表查看</Label>
                                <p className="text-sm text-blue-200/70">查看系统报表和统计数据</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                          <Save className="h-4 w-4" />
                          <span>保存设置</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="finance">
                  <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">系统管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">用户管理</Label>
                                <p className="text-sm text-blue-200/70">创建、编辑和删除系统用户</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">角色管理</Label>
                                <p className="text-sm text-blue-200/70">创建和管理系统角色</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">配置系统设置</Label>
                                <p className="text-sm text-blue-200/70">更改系统基本配置</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">业务管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">卡片管理</Label>
                                <p className="text-sm text-blue-200/70">管理虚拟卡的所有操作</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">财务操作</Label>
                                <p className="text-sm text-blue-200/70">执行充值、提现等财务操作</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">报表查看</Label>
                                <p className="text-sm text-blue-200/70">查看系统报表和统计数据</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                          <Save className="h-4 w-4" />
                          <span>保存设置</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="service">
                  <Card className="bg-[#061428]/70 rounded-lg border border-blue-900/30">
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">系统管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">用户管理</Label>
                                <p className="text-sm text-blue-200/70">创建、编辑和删除系统用户</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">角色管理</Label>
                                <p className="text-sm text-blue-200/70">创建和管理系统角色</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">配置系统设置</Label>
                                <p className="text-sm text-blue-200/70">更改系统基本配置</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-white text-lg font-semibold mb-4">业务管理权限</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">卡片管理</Label>
                                <p className="text-sm text-blue-200/70">管理虚拟卡的所有操作</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">财务操作</Label>
                                <p className="text-sm text-blue-200/70">执行充值、提现等财务操作</p>
                              </div>
                              <Switch checked={false} />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-white">客户查询</Label>
                                <p className="text-sm text-blue-200/70">查询和更新客户信息</p>
                              </div>
                              <Switch checked={true} />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                          <Save className="h-4 w-4" />
                          <span>保存设置</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30 mt-6">
                <div className="space-y-4">
                  <h3 className="text-white text-lg font-semibold">权限配置注意事项</h3>
                  <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                    <li>权限变更将实时生效</li>
                    <li>至少保留一个拥有完整权限的管理员</li>
                    <li>遵循最小权限原则，仅分配必要权限</li>
                    <li>定期审查权限设置，确保安全</li>
                  </ul>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountRoles;
