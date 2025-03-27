
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAccountInfo = () => {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    console.log("AccountInfo hook initialized");
    return () => {
      console.log("AccountInfo hook cleaned up");
    };
  }, []);
  
  const handleEdit = (field: string) => {
    console.log(`Editing field: ${field}`);
    setEditing((prev) => ({ ...prev, [field]: true }));
  };
  
  const handleSave = (field: string) => {
    console.log(`Saving field: ${field}`);
    setEditing((prev) => ({ ...prev, [field]: false }));
    toast({
      title: "字段已更新",
      description: `${field}已成功更新`,
      variant: "default",
    });
  };
  
  const handleCancel = (field: string) => {
    console.log(`Cancelling edit for field: ${field}`);
    setEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleSaveAll = () => {
    console.log("Saving all changes");
    toast({
      title: "更改已保存",
      description: "所有更改已成功保存到系统",
      variant: "default",
    });
  };

  return {
    editing,
    handleEdit,
    handleSave,
    handleCancel,
    handleSaveAll
  };
};
