
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "./components/PageHeader";
import RolesTab from "./components/roles/RolesTab";
import MembersTab from "./components/members/MembersTab";
import PermissionTab from "./components/permissions/PermissionTab";

const AccountRoles = () => {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <div className="space-y-6 container px-4 py-6 mx-auto">
      <PageHeader title="账户与权限管理" />
      
      <Tabs defaultValue="roles" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6 bg-[#061428]/70">
          <TabsTrigger value="roles" className="data-[state=active]:bg-blue-600 text-white">角色管理</TabsTrigger>
          <TabsTrigger value="members" className="data-[state=active]:bg-blue-600 text-white">团队成员</TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-blue-600 text-white">权限设置</TabsTrigger>
        </TabsList>
        
        {/* Roles Tab */}
        <TabsContent value="roles">
          <RolesTab />
        </TabsContent>
        
        {/* Team Members Tab */}
        <TabsContent value="members">
          <MembersTab />
        </TabsContent>
        
        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <PermissionTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountRoles;
