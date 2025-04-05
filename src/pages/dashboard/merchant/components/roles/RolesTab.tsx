
import React, { useEffect, useState } from "react";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useRolesTranslation } from "../../hooks/useRolesTranslation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Import our new components
import RoleCard from "./RoleCard";
import AddRoleDialog from "./AddRoleDialog";
import DeleteRoleDialog from "./DeleteRoleDialog";
import RolePermissionsDialog from "../permissions/RolePermissionsDialog";
import { Role, getRoleIcon, getRoleColor, getDefaultRolePermissions } from "./roleUtils";

const RolesTab = () => {
  const { t, language } = useRolesTranslation();
  const [componentKey, setComponentKey] = useState<string>(`roles-tab-${language}`);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      roleName: "",
      accessLevel: "basic" as "basic" | "limited" | "full"
    }
  });
  
  // Initialize roles with proper permissions
  useEffect(() => {
    setRoles([
      {
        id: "admin",
        name: t("adminRole"),
        icon: getRoleIcon("admin"),
        access: t("fullAccess"),
        color: "blue",
        permissions: getDefaultRolePermissions("admin")
      },
      {
        id: "manager",
        name: t("managerRole"),
        icon: getRoleIcon("manager"),
        access: t("limitedAccess"),
        color: "green",
        permissions: getDefaultRolePermissions("manager")
      },
      {
        id: "staff",
        name: t("staffRole"),
        icon: getRoleIcon("staff"),
        access: t("basicAccess"),
        color: "amber",
        permissions: getDefaultRolePermissions("staff")
      }
    ]);
  }, [t]);

  // Update component key when language changes to force re-render
  useEffect(() => {
    setComponentKey(`roles-tab-${language}-${Date.now()}`);
    console.log(`RolesTab language changed to: ${language}`);
  }, [language]);
  
  // Handle adding a new role
  const handleAddRole = () => {
    const { roleName, accessLevel } = form.getValues();
    
    if (!roleName.trim()) {
      toast.error(t("roleNameRequired"));
      return;
    }
    
    const newRole: Role = {
      id: `custom-${Date.now()}`,
      name: roleName,
      icon: getRoleIcon("custom"),
      access: accessLevel === "full" ? t("fullAccess") : 
              accessLevel === "limited" ? t("limitedAccess") : t("basicAccess"),
      color: getRoleColor(accessLevel),
      permissions: getDefaultRolePermissions(accessLevel)
    };
    
    setRoles([...roles, newRole]);
    form.reset();
    setIsAddRoleDialogOpen(false);
    toast.success(t("roleAddedSuccess"));
  };
  
  // Handle deleting a role
  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    if (["admin", "manager", "staff"].includes(selectedRole.id)) {
      toast.error(t("cannotDeleteDefaultRole"));
      setIsDeleteDialogOpen(false);
      return;
    }
    
    const updatedRoles = roles.filter(role => role.id !== selectedRole.id);
    setRoles(updatedRoles);
    setIsDeleteDialogOpen(false);
    setSelectedRole(null);
    toast.success(t("roleDeletedSuccess"));
  };
  
  // Open the delete confirmation dialog
  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };
  
  // Open the permissions dialog
  const openPermissionDialog = (role: Role) => {
    setSelectedRole(role);
    setIsPermissionDialogOpen(true);
  };

  // Save role permissions
  const handleSavePermissions = (roleId: string, systemPermissions: boolean[], businessPermissions: boolean[]) => {
    const updatedRoles = roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            system: systemPermissions,
            business: businessPermissions
          }
        };
      }
      return role;
    });
    
    setRoles(updatedRoles);
    toast.success(t("permissionsSaved"));
  };
  
  return (
    <ComponentErrorBoundary component="Roles Tab">
      <div className="p-6 space-y-6" key={componentKey} data-language={language}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-medium">{t("availableRoles")}</h2>
          <Button 
            onClick={() => setIsAddRoleDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("addNewRole")}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <RoleCard 
              key={`${role.id}-${language}`}
              role={role}
              t={t}
              onEditPermissions={openPermissionDialog}
              onDeleteRole={openDeleteDialog}
            />
          ))}
        </div>
        
        {/* Dialogs */}
        <AddRoleDialog 
          isOpen={isAddRoleDialogOpen}
          onOpenChange={setIsAddRoleDialogOpen}
          form={form}
          onSubmit={handleAddRole}
          t={t}
        />
        
        <DeleteRoleDialog 
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          selectedRole={selectedRole}
          onDelete={handleDeleteRole}
          t={t}
        />
        
        <RolePermissionsDialog 
          isOpen={isPermissionDialogOpen}
          onOpenChange={setIsPermissionDialogOpen}
          role={selectedRole}
          onSavePermissions={handleSavePermissions}
          t={t}
        />
      </div>
    </ComponentErrorBoundary>
  );
};

export default RolesTab;
