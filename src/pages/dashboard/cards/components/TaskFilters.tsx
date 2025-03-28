
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TaskFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ statusFilter, setStatusFilter }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Select
        value={statusFilter}
        onValueChange={setStatusFilter}
      >
        <SelectTrigger className="w-[180px] bg-blue-950/80 border-blue-800/50 text-white">
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-blue-400" />
            <SelectValue placeholder={t("cards.activationTasks.filterByStatus")} />
          </span>
        </SelectTrigger>
        <SelectContent className="bg-blue-900 border-blue-700 text-white">
          <SelectItem value="all">{t("common.all")}</SelectItem>
          <SelectItem value="pending">{t("cards.activationTasks.statusPending")}</SelectItem>
          <SelectItem value="completed">{t("cards.activationTasks.statusCompleted")}</SelectItem>
          <SelectItem value="failed">{t("cards.activationTasks.statusFailed")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskFilters;
