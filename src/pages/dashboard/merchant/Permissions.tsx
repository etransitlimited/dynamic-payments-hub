
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Lock, ShieldCheck, Info, Save } from "lucide-react";

const Permissions = () => {
  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <div className="flex items-center mb-6">
        <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">权限设置</h1>
      </div>
      
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
        </CardContent>
      </Card>
      
      <Card className="bg-[#0F2643]/90 backdrop-blur-sm border-blue-900/50 shadow-lg shadow-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-green-500/20 p-2 rounded-full mr-2">
              <ShieldCheck size={18} className="text-green-400" />
            </span>
            权限设置指南
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            系统权限配置说明
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">权限类型说明</h3>
                <ul className="space-y-2 text-blue-200/80 list-disc pl-5">
                  <li>系统管理权限：涉及系统配置和用户管理</li>
                  <li>业务管理权限：涉及日常业务操作</li>
                  <li>数据查看权限：允许用户查看但不能修改数据</li>
                  <li>操作执行权限：允许用户执行特定操作</li>
                </ul>
              </div>
            </Card>
            
            <Card className="bg-[#061428]/70 rounded-lg p-4 border border-blue-900/30">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Permissions;
