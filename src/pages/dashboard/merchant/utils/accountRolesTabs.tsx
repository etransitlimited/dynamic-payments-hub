
import React from "react";
import MembersTab from "../components/members/MembersTab";
import RolesTab from "../components/roles/RolesTab";
import PermissionTab from "../components/permissions/PermissionTab";
import { useSafeTranslation } from "@/hooks/use-safe-translation";

export interface TabItem {
  value: string;
  label: string;
  className: string;
  content: React.ReactNode;
}

export const getAccountRolesTabs = (t: (key: string) => string): TabItem[] => {
  const { language } = useSafeTranslation();
  
  // Direct translations for tab labels based on language
  const getTabLabel = (key: string): string => {
    if (key === "accountRoles.roleManagement") {
      switch (language) {
        case "zh-CN": return "角色管理";
        case "zh-TW": return "角色管理";
        case "fr": return "Gestion des Rôles";
        case "es": return "Gestión de Roles";
        default: return "Role Management";
      }
    }
    
    if (key === "accountRoles.userManagement") {
      switch (language) {
        case "zh-CN": return "用户管理";
        case "zh-TW": return "用戶管理";
        case "fr": return "Gestion des Utilisateurs";
        case "es": return "Gestión de Usuarios";
        default: return "User Management";
      }
    }
    
    if (key === "accountRoles.permissionSettings") {
      switch (language) {
        case "zh-CN": return "权限设置";
        case "zh-TW": return "權限設置";
        case "fr": return "Paramètres de Permission";
        case "es": return "Configuración de Permisos";
        default: return "Permission Settings";
      }
    }
    
    return t(key);
  };
  
  return [
    {
      value: "roles",
      label: getTabLabel("accountRoles.roleManagement"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white",
      content: <RolesTab />
    },
    {
      value: "members",
      label: getTabLabel("accountRoles.userManagement"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 text-white",
      content: <MembersTab />
    },
    {
      value: "permissions",
      label: getTabLabel("accountRoles.permissionSettings"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 text-white",
      content: <PermissionTab />
    }
  ];
};
