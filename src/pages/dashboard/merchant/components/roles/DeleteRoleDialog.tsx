
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Role } from "./roleUtils";

interface DeleteRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRole: Role | null;
  onDelete: () => void;
  t: (key: string) => string;
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedRole,
  onDelete,
  t
}) => {
  if (!selectedRole) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
            className="bg-transparent border-blue-600 text-blue-400 hover:bg-blue-900/30"
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRoleDialog;
