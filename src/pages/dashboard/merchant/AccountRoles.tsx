import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import PageHeader from "./components/PageHeader";

const AccountRoles = () => {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <PageHeader title="Account Roles" />
      
      <Card className="bg-gradient-to-br from-purple-900 to-purple-950 border-purple-900/50 shadow-lg shadow-purple-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-purple-500/20 p-2 rounded-full mr-2">
              <Users size={18} className="text-purple-400" />
            </span>
            Role Management
          </CardTitle>
          <CardDescription className="text-purple-200/80">
            Define and manage user roles and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {/* Existing roles content */}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-900/50 shadow-lg shadow-blue-900/10 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [mask-size:24px_24px]"></div>
        <CardHeader className="relative z-10 pb-3">
          <CardTitle className="text-white flex items-center">
            <span className="bg-blue-500/20 p-2 rounded-full mr-2">
              <Shield size={18} className="text-blue-400" />
            </span>
            Permission Settings
          </CardTitle>
          <CardDescription className="text-blue-200/80">
            Configure specific permissions for each role
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {/* Existing permissions content */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRoles;
