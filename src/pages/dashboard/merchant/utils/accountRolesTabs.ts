
import React from "react";
import MembersTab from "../components/members/MembersTab";
import RolesTab from "../components/roles/RolesTab";
import PermissionTab from "../components/permissions/PermissionTab";

export interface TabItem {
  value: string;
  label: string;
  className: string;
  content: React.ReactNode;
}

export const getAccountRolesTabs = (t: (key: string) => string): TabItem[] => {
  return [
    {
      value: "roles",
      label: t("accountRoles.roleManagement"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500 text-white",
      content: <RolesTab />
    },
    {
      value: "members",
      label: t("accountRoles.userManagement"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-500 text-white",
      content: <MembersTab />
    },
    {
      value: "permissions",
      label: t("accountRoles.permissionSettings"),
      className: "data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500 text-white",
      content: <PermissionTab />
    }
  ];
};
