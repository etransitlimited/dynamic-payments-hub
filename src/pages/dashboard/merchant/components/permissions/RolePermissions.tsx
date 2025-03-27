
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

interface RolePermissionsProps {
  role: "admin" | "finance" | "service";
  systemPermissions: boolean[];
  businessPermissions: boolean[];
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
  role,
  systemPermissions,
  businessPermissions
}) => {
  return (
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
                <Switch checked={systemPermissions[0]} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">角色管理</Label>
                  <p className="text-sm text-blue-200/70">创建和管理系统角色</p>
                </div>
                <Switch checked={systemPermissions[1]} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">配置系统设置</Label>
                  <p className="text-sm text-blue-200/70">更改系统基本配置</p>
                </div>
                <Switch checked={systemPermissions[2]} />
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
                <Switch checked={businessPermissions[0]} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">财务操作</Label>
                  <p className="text-sm text-blue-200/70">执行充值、提现等财务操作</p>
                </div>
                <Switch checked={businessPermissions[1]} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-white">{role === "service" ? "客户查询" : "报表查看"}</Label>
                  <p className="text-sm text-blue-200/70">
                    {role === "service" ? "查询和更新客户信息" : "查看系统报表和统计数据"}
                  </p>
                </div>
                <Switch checked={businessPermissions[2]} />
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
  );
};

export default RolePermissions;
