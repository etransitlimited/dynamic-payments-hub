
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { toast } from "sonner";

interface RolePermissionsProps {
  role: "admin" | "finance" | "service" | "custom";
  systemPermissions: boolean[];
  businessPermissions: boolean[];
  onSystemPermissionChange?: (index: number, value: boolean) => void;
  onBusinessPermissionChange?: (index: number, value: boolean) => void;
}

const RolePermissions: React.FC<RolePermissionsProps> = ({
  role,
  systemPermissions: initialSystemPermissions,
  businessPermissions: initialBusinessPermissions,
  onSystemPermissionChange,
  onBusinessPermissionChange
}) => {
  const [systemPermissions, setSystemPermissions] = useState<boolean[]>(initialSystemPermissions);
  const [businessPermissions, setBusinessPermissions] = useState<boolean[]>(initialBusinessPermissions);

  useEffect(() => {
    setSystemPermissions(initialSystemPermissions);
    setBusinessPermissions(initialBusinessPermissions);
  }, [initialSystemPermissions, initialBusinessPermissions]);

  // Handler for system permission toggle
  const handleSystemPermissionChange = (index: number) => {
    const newValue = !systemPermissions[index];
    const newPermissions = [...systemPermissions];
    newPermissions[index] = newValue;
    setSystemPermissions(newPermissions);
    console.log(`System permission ${index} toggled to ${newValue}`);
    
    if (onSystemPermissionChange) {
      onSystemPermissionChange(index, newValue);
    }
  };

  // Handler for business permission toggle
  const handleBusinessPermissionChange = (index: number) => {
    const newValue = !businessPermissions[index];
    const newPermissions = [...businessPermissions];
    newPermissions[index] = newValue;
    setBusinessPermissions(newPermissions);
    console.log(`Business permission ${index} toggled to ${newValue}`);
    
    if (onBusinessPermissionChange) {
      onBusinessPermissionChange(index, newValue);
    }
  };

  // Save handler
  const handleSave = () => {
    console.log(`Saving permissions for ${role}:`, {
      systemPermissions,
      businessPermissions
    });
    toast.success(`${role} 权限设置已保存`);
  };

  // Determine if certain permissions should be locked (disabled) based on role
  const isSystemPermissionLocked = (index: number) => {
    if (role === "admin") {
      // Admin has all system permissions locked (always enabled)
      return true;
    } else if (role === "service" && index === 0) {
      // Service role always has user query permission (index 0)
      return true;
    }
    return false;
  };

  const isBusinessPermissionLocked = (index: number) => {
    if (role === "admin") {
      // Admin has all business permissions locked (always enabled)
      return true;
    } else if (role === "finance" && index === 1) {
      // Finance role always has financial operations permission (index 1)
      return true;
    }
    return false;
  };

  return (
    <Card className="bg-blue-950/70 rounded-lg border border-blue-800/30 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <div className="w-1 h-4 bg-blue-500 rounded-full mr-2"></div>
              系统管理权限
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">用户管理</Label>
                  <p className="text-sm text-blue-200/70">创建、编辑和删除系统用户</p>
                </div>
                <Switch 
                  checked={systemPermissions[0]} 
                  onCheckedChange={() => handleSystemPermissionChange(0)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isSystemPermissionLocked(0)}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">角色管理</Label>
                  <p className="text-sm text-blue-200/70">创建和管理系统角色</p>
                </div>
                <Switch 
                  checked={systemPermissions[1]} 
                  onCheckedChange={() => handleSystemPermissionChange(1)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isSystemPermissionLocked(1)}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">配置系统设置</Label>
                  <p className="text-sm text-blue-200/70">更改系统基本配置</p>
                </div>
                <Switch 
                  checked={systemPermissions[2]} 
                  onCheckedChange={() => handleSystemPermissionChange(2)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isSystemPermissionLocked(2)}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
              <div className="w-1 h-4 bg-purple-500 rounded-full mr-2"></div>
              业务管理权限
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">卡片管理</Label>
                  <p className="text-sm text-blue-200/70">管理虚拟卡的所有操作</p>
                </div>
                <Switch 
                  checked={businessPermissions[0]} 
                  onCheckedChange={() => handleBusinessPermissionChange(0)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isBusinessPermissionLocked(0)}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">财务操作</Label>
                  <p className="text-sm text-blue-200/70">执行充值、提现等财务操作</p>
                </div>
                <Switch 
                  checked={businessPermissions[1]} 
                  onCheckedChange={() => handleBusinessPermissionChange(1)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isBusinessPermissionLocked(1)}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-md bg-blue-900/20 border border-blue-800/20">
                <div className="space-y-0.5">
                  <Label className="text-white">{role === "service" ? "客户查询" : "报表查看"}</Label>
                  <p className="text-sm text-blue-200/70">
                    {role === "service" ? "查询和更新客户信息" : "查看系统报表和统计数据"}
                  </p>
                </div>
                <Switch 
                  checked={businessPermissions[2]} 
                  onCheckedChange={() => handleBusinessPermissionChange(2)}
                  className="data-[state=checked]:bg-blue-500" 
                  disabled={isBusinessPermissionLocked(2)}
                />
              </div>
            </div>
          </div>
        </div>
        
        {!onSystemPermissionChange && !onBusinessPermissionChange && (
          <div className="mt-6 flex justify-end">
            <Button 
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md shadow-blue-600/20 border border-blue-500/30"
              onClick={handleSave}
            >
              <Save className="h-4 w-4" />
              <span>保存设置</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RolePermissions;
