
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

const MembersTab = () => {
  const { t } = useLanguage();
  
  const members = [
    {
      name: "John Smith",
      email: "john.smith@example.com",
      role: "admin",
      status: "active"
    },
    {
      name: "Emma Johnson",
      email: "emma.johnson@example.com",
      role: "manager",
      status: "active"
    },
    {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "staff",
      status: "active"
    },
    {
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "manager",
      status: "inactive"
    }
  ];
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="default" className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/30">
            {t("accountRoles.adminRole")}
          </Badge>
        );
      case "manager":
        return (
          <Badge variant="default" className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">
            {t("accountRoles.managerRole")}
          </Badge>
        );
      case "staff":
        return (
          <Badge variant="default" className="bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-amber-500/30">
            {t("accountRoles.staffRole")}
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/30">
            {t("accountManagement.activeUsers")}
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="default" className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-gray-500/30">
            {t("accountManagement.inactiveUsers")}
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6">
      <div className="rounded-md border border-blue-900/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-950/50">
            <TableRow>
              <TableHead className="text-blue-200 font-medium">{t("accountInfo.name")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("accountInfo.email")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("accountRoles.roleManagement")}</TableHead>
              <TableHead className="text-blue-200 font-medium">{t("wallet.depositRecords.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index} className="border-b border-blue-900/30">
                <TableCell className="font-medium text-blue-100">{member.name}</TableCell>
                <TableCell className="text-blue-200">{member.email}</TableCell>
                <TableCell>{getRoleBadge(member.role)}</TableCell>
                <TableCell>{getStatusBadge(member.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MembersTab;
