
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Role } from "./roleUtils";

interface RoleCardProps {
  role: Role;
  t: (key: string) => string;
  onEditPermissions: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  t,
  onEditPermissions,
  onDeleteRole
}) => {
  const isDefaultRole = ["admin", "manager", "staff"].includes(role.id);
  
  return (
    <Card 
      className={`bg-${role.color}-900/20 border-${role.color}-800/30 hover:shadow-md hover:shadow-${role.color}-900/10 transition-all duration-300 relative`}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <span className={`bg-${role.color}-500/20 p-2 rounded-full`}>
            {role.icon}
          </span>
          <div>
            <h3 className="text-white font-medium">
              {role.name}
            </h3>
            <p className="text-sm text-blue-200/80">
              {role.access}
            </p>
          </div>
          
          <div className="ml-auto flex space-x-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-blue-300 hover:text-white hover:bg-blue-800/40"
              onClick={() => onEditPermissions(role)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            {!isDefaultRole && (
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 text-red-300 hover:text-white hover:bg-red-800/40"
                onClick={() => onDeleteRole(role)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300/80">
              {t("dashboardAccess")}
            </span>
            <span className="text-green-400">
              {t("allRoles")}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-blue-300/80">
              {t("userManagement")}
            </span>
            <span className={role.access === t("fullAccess") ? "text-green-400" : 
                   role.access === t("limitedAccess") ? "text-yellow-400" : "text-red-400"}>
              {role.access === t("fullAccess") ? t("adminOnly") : 
               role.access === t("limitedAccess") ? t("limitedAccess") : "-"}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-blue-300/80">
              {t("transactionManagement")}
            </span>
            <span className={role.access === t("fullAccess") ? "text-green-400" : 
                   role.access === t("limitedAccess") ? "text-yellow-400" : "text-red-400"}>
              {role.access === t("fullAccess") ? t("adminOnly") : 
               role.access === t("limitedAccess") ? t("adminAndManager") : "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
