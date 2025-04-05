
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Users, Settings, Plus, Trash, Edit } from "lucide-react";
import { ComponentErrorBoundary } from "@/components/ErrorBoundary";
import { useRolesTranslation } from "../../hooks/useRolesTranslation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RolePermissions } from "../permissions/RolePermissions";

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
  access: string;
  color: string;
}

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
      accessLevel: "basic"
    }
  });
  
  // Initialize default roles
  useEffect(() => {
    setRoles([
      {
        id: "admin",
        name: t("adminRole"),
        icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
        access: t("fullAccess"),
        color: "blue"
      },
      {
        id: "manager",
        name: t("managerRole"),
        icon: <Users className="h-5 w-5 text-green-400" />,
        access: t("limitedAccess"),
        color: "green"
      },
      {
        id: "staff",
        name: t("staffRole"),
        icon: <Settings className="h-5 w-5 text-amber-400" />,
        access: t("basicAccess"),
        color: "amber"
      }
    ]);
  }, [t]);

  // Update component key when language changes to force re-render
  useEffect(() => {
    setComponentKey(`roles-tab-${language}-${Date.now()}`);
    console.log(`RolesTab language changed to: ${language}`);
  }, [language]);
  
  const handleAddRole = () => {
    const { roleName, accessLevel } = form.getValues();
    
    if (!roleName.trim()) {
      toast.error(t("roleNameRequired"));
      return;
    }
    
    const newRole: Role = {
      id: `custom-${Date.now()}`,
      name: roleName,
      icon: <Users className="h-5 w-5 text-purple-400" />,
      access: accessLevel === "full" ? t("fullAccess") : 
              accessLevel === "limited" ? t("limitedAccess") : t("basicAccess"),
      color: accessLevel === "full" ? "blue" : 
             accessLevel === "limited" ? "green" : "amber"
    };
    
    setRoles([...roles, newRole]);
    form.reset();
    setIsAddRoleDialogOpen(false);
    toast.success(t("roleAddedSuccess"));
  };
  
  const handleDeleteRole = () => {
    if (!selectedRole) return;
    
    // Don't allow deletion of default roles
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
  
  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };
  
  const openPermissionDialog = (role: Role) => {
    setSelectedRole(role);
    setIsPermissionDialogOpen(true);
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
            <Card 
              key={`${role.id}-${language}`} 
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
                      onClick={() => openPermissionDialog(role)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!["admin", "manager", "staff"].includes(role.id) && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-red-300 hover:text-white hover:bg-red-800/40"
                        onClick={() => openDeleteDialog(role)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {role.id === "admin" ? (
                    <>
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
                        <span className="text-green-400">
                          {t("adminOnly")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className="text-green-400">
                          {t("adminOnly")}
                        </span>
                      </div>
                    </>
                  ) : role.id === "manager" ? (
                    <>
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
                        <span className="text-yellow-400">
                          {t("limitedAccess")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className="text-green-400">
                          {t("adminAndManager")}
                        </span>
                      </div>
                    </>
                  ) : role.id === "staff" ? (
                    <>
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
                        <span className="text-red-400">-</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className="text-red-400">-</span>
                      </div>
                    </>
                  ) : (
                    <>
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
                        <span className={role.access === t("fullAccess") ? "text-green-400" : role.access === t("limitedAccess") ? "text-yellow-400" : "text-red-400"}>
                          {role.access === t("fullAccess") ? t("adminOnly") : role.access === t("limitedAccess") ? t("limitedAccess") : "-"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-blue-300/80">
                          {t("transactionManagement")}
                        </span>
                        <span className={role.access === t("fullAccess") ? "text-green-400" : role.access === t("limitedAccess") ? "text-yellow-400" : "text-red-400"}>
                          {role.access === t("fullAccess") ? t("adminOnly") : role.access === t("limitedAccess") ? t("adminAndManager") : "-"}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Add Role Dialog */}
        <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
          <DialogContent className="bg-blue-950 border border-blue-800/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">{t("addNewRole")}</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={(e) => { e.preventDefault(); handleAddRole(); }} className="space-y-4">
                <FormField
                  name="roleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-200">{t("roleName")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("enterRoleName")}
                          className="bg-blue-900/40 border-blue-700/50 text-white placeholder:text-blue-300/50"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <Label className="text-blue-200">{t("accessLevel")}</Label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      className={`flex-1 ${form.watch("accessLevel") === "full" ? "bg-blue-600" : "bg-blue-900/40 hover:bg-blue-800"}`}
                      onClick={() => form.setValue("accessLevel", "full")}
                    >
                      {t("fullAccess")}
                    </Button>
                    <Button
                      type="button"
                      className={`flex-1 ${form.watch("accessLevel") === "limited" ? "bg-green-600" : "bg-blue-900/40 hover:bg-blue-800"}`}
                      onClick={() => form.setValue("accessLevel", "limited")}
                    >
                      {t("limitedAccess")}
                    </Button>
                    <Button
                      type="button"
                      className={`flex-1 ${form.watch("accessLevel") === "basic" ? "bg-amber-600" : "bg-blue-900/40 hover:bg-blue-800"}`}
                      onClick={() => form.setValue("accessLevel", "basic")}
                    >
                      {t("basicAccess")}
                    </Button>
                  </div>
                </div>
                
                <DialogFooter className="pt-4 flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setIsAddRoleDialogOpen(false);
                    }}
                    className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900/30"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {t("createRole")}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Delete Role Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-blue-950 border border-blue-800/30 text-white">
            <DialogHeader>
              <DialogTitle className="text-white">{t("confirmDeleteRole")}</DialogTitle>
            </DialogHeader>
            
            <p className="text-blue-200">
              {t("deleteRoleWarning")} "{selectedRole?.name}"?
            </p>
            
            <DialogFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900/30"
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleDeleteRole}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {t("delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Permission Management Dialog */}
        {selectedRole && (
          <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
            <DialogContent className="bg-blue-950 border border-blue-800/30 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">{t("managePermissions")} - {selectedRole.name}</DialogTitle>
              </DialogHeader>
              
              <div className="max-h-[70vh] overflow-y-auto pr-2">
                <RolePermissions 
                  role={selectedRole.id.includes("custom") ? "custom" : selectedRole.id as "admin" | "finance" | "service"}
                  systemPermissions={[true, true, selectedRole.id !== "staff"]}
                  businessPermissions={[
                    selectedRole.id !== "staff",
                    selectedRole.id !== "staff",
                    true
                  ]}
                />
              </div>
              
              <DialogFooter className="flex justify-end space-x-2">
                <Button
                  onClick={() => setIsPermissionDialogOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {t("close")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </ComponentErrorBoundary>
  );
};

export default RolesTab;
