
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import RolePermissions from "./RolePermissions";
import { Role } from "../roles/roleUtils";

interface RolePermissionsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
  onSavePermissions: (roleId: string, systemPermissions: boolean[], businessPermissions: boolean[]) => void;
  t: (key: string) => string;
}

const RolePermissionsDialog: React.FC<RolePermissionsDialogProps> = ({
  isOpen,
  onOpenChange,
  role,
  onSavePermissions,
  t
}) => {
  const [systemPermissions, setSystemPermissions] = React.useState<boolean[]>([]);
  const [businessPermissions, setBusinessPermissions] = React.useState<boolean[]>([]);

  React.useEffect(() => {
    if (role) {
      setSystemPermissions(role.permissions?.system || [true, true, role.id !== "staff"]);
      setBusinessPermissions(role.permissions?.business || [role.id !== "staff", role.id !== "staff", true]);
    }
  }, [role]);

  if (!role) {
    return null;
  }

  const handleSave = () => {
    onSavePermissions(role.id, systemPermissions, businessPermissions);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-blue-950 border border-blue-800/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">{t("managePermissions")} - {role.name}</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <RolePermissions 
            role={role.id.includes("custom") ? "custom" : role.id as "admin" | "finance" | "service"}
            systemPermissions={systemPermissions}
            businessPermissions={businessPermissions}
            onSystemPermissionChange={(index, value) => {
              const newPermissions = [...systemPermissions];
              newPermissions[index] = value;
              setSystemPermissions(newPermissions);
            }}
            onBusinessPermissionChange={(index, value) => {
              const newPermissions = [...businessPermissions];
              newPermissions[index] = value;
              setBusinessPermissions(newPermissions);
            }}
          />
        </div>
        
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900/30"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t("savePermissions")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RolePermissionsDialog;
