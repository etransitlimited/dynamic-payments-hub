
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface AddRoleFormValues {
  roleName: string;
  accessLevel: "full" | "limited" | "basic";
}

interface AddRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<AddRoleFormValues>;
  onSubmit: () => void;
  t: (key: string) => string;
}

const AddRoleDialog: React.FC<AddRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  form,
  onSubmit,
  t
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-blue-950 border border-blue-800/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{t("addNewRole")}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
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
                  onOpenChange(false);
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
  );
};

export default AddRoleDialog;
