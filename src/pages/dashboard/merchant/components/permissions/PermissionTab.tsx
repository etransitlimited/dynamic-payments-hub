import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import RolePermissions from "./RolePermissions";

const PermissionTab = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-900/90 to-blue-950/90 border-blue-800/30 shadow-lg shadow-blue-900/20 backdrop-blur-sm">
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
          <TabsList className="grid grid-cols-3 mb-6 bg-blue-950/70 border border-blue-800/30">
            <TabsTrigger 
              value="admin" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white"
            >
              管理员
            </TabsTrigger>
            <TabsTrigger 
              value="finance" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white"
            >
              财务
            </TabsTrigger>
            <TabsTrigger 
              value="service" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white"
            >
              客服
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin">
            <RolePermissions 
              role="admin"
              systemPermissions={[true, true, true]}
              businessPermissions={[true, true, true]}
            />
          </TabsContent>
          
          <TabsContent value="finance">
            <RolePermissions 
              role="finance"
              systemPermissions={[false, false, false]}
              businessPermissions={[false, true, true]}
            />
          </TabsContent>
          
          <TabsContent value="service">
            <RolePermissions 
              role="service"
              systemPermissions={[false, false, false]}
              businessPermissions={[false, false, true]}
            />
          </TabsContent>
        </Tabs>
        
        <Card className="bg-blue-950/70 rounded-lg p-4 border border-blue-800/30 mt-6 backdrop-blur-sm">
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
  );
};

export default PermissionTab;
